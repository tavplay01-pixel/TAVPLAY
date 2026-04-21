import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useGame } from "@/lib/game-context";
import { useAudioContext } from "@/lib/audio-context";
import { TRUE_FALSE_QUESTIONS } from "@/lib/game-data";

const QUESTIONS_PER_GAME = 10;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Phase = "playing" | "answered" | "finished";

export default function VerdadeiroFalsoScreen() {
  const colors = useColors();
  const router = useRouter();
  const { recordGame } = useGame();
  const { playCorrectSound, playWrongSound } = useAudioContext();

  const [questions] = useState(() => shuffle(TRUE_FALSE_QUESTIONS).slice(0, QUESTIONS_PER_GAME));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<boolean | null>(null);
  const [phase, setPhase] = useState<Phase>("playing");
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const currentQ = questions[currentIdx];
  const isLast = currentIdx === questions.length - 1;

  const handleAnswer = useCallback(
    (answer: boolean) => {
      if (phase !== "playing") return;
      setSelected(answer);
      setPhase("answered");

      const isCorrect = answer === currentQ.answer;
      if (Platform.OS !== "web") {
        Haptics.notificationAsync(
          isCorrect
            ? Haptics.NotificationFeedbackType.Success
            : Haptics.NotificationFeedbackType.Error
        );
      }
      if (isCorrect) {
        playCorrectSound();
        setScore((s) => s + 15);
        setCorrectCount((c) => c + 1);
      } else {
        playWrongSound();
      }
    },
    [phase, currentQ, playCorrectSound, playWrongSound]
  );

  const handleNext = () => {
    if (isLast) {
      recordGame("verdadeiro-falso", score, correctCount >= Math.ceil(QUESTIONS_PER_GAME / 2));
      setPhase("finished");
    } else {
      setCurrentIdx((i) => i + 1);
      setSelected(null);
      setPhase("playing");
    }
  };

  if (phase === "finished") {
    const pct = Math.round((correctCount / QUESTIONS_PER_GAME) * 100);
    return (
      <ScreenContainer style={{ backgroundColor: colors.background }}>
        <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Text style={[styles.backText, { color: colors.primary }]}>‹ Voltar</Text>
          </Pressable>
          <Text style={[styles.headerTitle, { color: colors.foreground }]}>Verdadeiro ou Falso</Text>
          <View style={{ width: 70 }} />
        </View>
        <ScrollView contentContainerStyle={styles.resultContainer}>
          <Text style={styles.resultEmoji}>{pct >= 70 ? "⚖️" : "📚"}</Text>
          <Text style={[styles.resultTitle, { color: colors.foreground }]}>
            {pct >= 70 ? "Muito bem!" : "Continue estudando!"}
          </Text>
          <Text style={[styles.resultScore, { color: colors.primary }]}>{score} pontos</Text>
          <View style={[styles.resultCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.resultStat, { color: colors.foreground }]}>
              ✅ Acertos: <Text style={{ color: colors.success }}>{correctCount}/{QUESTIONS_PER_GAME}</Text>
            </Text>
            <Text style={[styles.resultStat, { color: colors.foreground }]}>
              📊 Aproveitamento: <Text style={{ color: colors.primary }}>{pct}%</Text>
            </Text>
          </View>
          <Pressable onPress={() => router.back()} style={[styles.doneBtn, { backgroundColor: colors.primary }]}>
            <Text style={styles.doneBtnText}>Voltar ao Início</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setCurrentIdx(0);
              setScore(0);
              setCorrectCount(0);
              setSelected(null);
              setPhase("playing");
            }}
            style={[styles.retryBtn, { borderColor: colors.primary }]}
          >
            <Text style={[styles.retryBtnText, { color: colors.primary }]}>Jogar Novamente</Text>
          </Pressable>
        </ScrollView>
      </ScreenContainer>
    );
  }

  const isCorrect = selected === currentQ.answer;

  return (
    <ScreenContainer style={{ backgroundColor: colors.background }}>
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={[styles.backText, { color: colors.primary }]}>‹ Sair</Text>
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>Verdadeiro ou Falso</Text>
        <View style={[styles.scorePill, { backgroundColor: colors.primary + "22" }]}>
          <Text style={[styles.scoreText, { color: colors.primary }]}>{score} pts</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        {/* Progress */}
        <View style={styles.progressRow}>
          <Text style={[styles.progressText, { color: colors.muted }]}>
            {currentIdx + 1} / {QUESTIONS_PER_GAME}
          </Text>
          <Text style={[styles.progressText, { color: colors.muted }]}>
            ✅ {correctCount} acertos
          </Text>
        </View>
        <View style={[styles.progressBarBg, { backgroundColor: colors.border }]}>
          <View
            style={[
              styles.progressBarFill,
              { backgroundColor: colors.primary, width: `${(currentIdx / QUESTIONS_PER_GAME) * 100}%` as any },
            ]}
          />
        </View>

        {/* Statement Card */}
        <View style={[styles.statementCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.statementLabel, { color: colors.muted }]}>Afirmação:</Text>
          <Text style={[styles.statementText, { color: colors.foreground }]}>
            "{currentQ.statement}"
          </Text>
          {currentQ.reference && (
            <Text style={[styles.referenceText, { color: colors.muted }]}>📖 {currentQ.reference}</Text>
          )}
        </View>

        {/* Buttons */}
        {phase === "playing" && (
          <View style={styles.buttonRow}>
            <Pressable
              onPress={() => handleAnswer(true)}
              style={({ pressed }) => [
                styles.answerBtn,
                { backgroundColor: colors.success + "22", borderColor: colors.success, opacity: pressed ? 0.8 : 1 },
              ]}
            >
              <Text style={styles.answerBtnEmoji}>✅</Text>
              <Text style={[styles.answerBtnText, { color: colors.success }]}>VERDADEIRO</Text>
            </Pressable>
            <Pressable
              onPress={() => handleAnswer(false)}
              style={({ pressed }) => [
                styles.answerBtn,
                { backgroundColor: colors.error + "22", borderColor: colors.error, opacity: pressed ? 0.8 : 1 },
              ]}
            >
              <Text style={styles.answerBtnEmoji}>❌</Text>
              <Text style={[styles.answerBtnText, { color: colors.error }]}>FALSO</Text>
            </Pressable>
          </View>
        )}

        {/* Result + Explanation */}
        {phase === "answered" && (
          <>
            <View
              style={[
                styles.resultBanner,
                {
                  backgroundColor: isCorrect ? colors.success + "22" : colors.error + "22",
                  borderColor: isCorrect ? colors.success : colors.error,
                },
              ]}
            >
              <Text style={[styles.resultBannerText, { color: isCorrect ? colors.success : colors.error }]}>
                {isCorrect ? "✅ Correto! +15 pontos" : "❌ Incorreto!"}
              </Text>
              <Text style={[styles.correctAnswer, { color: colors.foreground }]}>
                A afirmação é{" "}
                <Text style={{ fontWeight: "700", color: currentQ.answer ? colors.success : colors.error }}>
                  {currentQ.answer ? "VERDADEIRA" : "FALSA"}
                </Text>
              </Text>
            </View>

            <View style={[styles.explanationCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Text style={[styles.explanationTitle, { color: colors.primary }]}>💡 Explicação</Text>
              <Text style={[styles.explanationText, { color: colors.foreground }]}>
                {currentQ.explanation}
              </Text>
            </View>

            <Pressable
              onPress={handleNext}
              style={({ pressed }) => [
                styles.nextBtn,
                { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 },
              ]}
            >
              <Text style={styles.nextBtnText}>
                {isLast ? "Ver Resultado" : "Próxima →"}
              </Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1.5,
  },
  backBtn: { padding: 4 },
  backText: { fontSize: 16, fontWeight: "600" },
  headerTitle: { fontSize: 17, fontWeight: "700" },
  scorePill: { borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4 },
  scoreText: { fontSize: 13, fontWeight: "700" },
  progressRow: { flexDirection: "row", justifyContent: "space-between" },
  progressText: { fontSize: 13 },
  progressBarBg: { height: 6, borderRadius: 3, overflow: "hidden" },
  progressBarFill: { height: "100%", borderRadius: 3 },
  statementCard: {
    borderRadius: 14,
    padding: 20,
    borderWidth: 1.5,
    gap: 10,
    minHeight: 140,
    justifyContent: "center",
  },
  statementLabel: { fontSize: 12, fontWeight: "600", textTransform: "uppercase", letterSpacing: 1 },
  statementText: { fontSize: 18, fontWeight: "600", lineHeight: 26, fontStyle: "italic" },
  referenceText: { fontSize: 12 },
  buttonRow: { flexDirection: "row", gap: 12 },
  answerBtn: {
    flex: 1,
    borderRadius: 14,
    padding: 20,
    alignItems: "center",
    borderWidth: 2,
    gap: 8,
  },
  answerBtnEmoji: { fontSize: 32 },
  answerBtnText: { fontSize: 14, fontWeight: "700", letterSpacing: 0.5 },
  resultBanner: {
    borderRadius: 12,
    padding: 14,
    borderWidth: 1.5,
    gap: 4,
  },
  resultBannerText: { fontSize: 16, fontWeight: "700" },
  correctAnswer: { fontSize: 14 },
  explanationCard: {
    borderRadius: 12,
    padding: 14,
    borderWidth: 1.5,
    gap: 8,
  },
  explanationTitle: { fontSize: 14, fontWeight: "700" },
  explanationText: { fontSize: 14, lineHeight: 20 },
  nextBtn: {
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  nextBtnText: { fontSize: 16, fontWeight: "700", color: "#F5E6C8" },
  resultContainer: { padding: 24, alignItems: "center", gap: 16 },
  resultEmoji: { fontSize: 64 },
  resultTitle: { fontSize: 26, fontWeight: "700" },
  resultScore: { fontSize: 36, fontWeight: "700" },
  resultCard: { borderRadius: 14, padding: 16, borderWidth: 1.5, width: "100%", gap: 8 },
  resultStat: { fontSize: 16, lineHeight: 24 },
  doneBtn: { borderRadius: 12, padding: 16, alignItems: "center", width: "100%" },
  doneBtnText: { fontSize: 16, fontWeight: "700", color: "#F5E6C8" },
  retryBtn: {
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    width: "100%",
    borderWidth: 1.5,
  },
  retryBtnText: { fontSize: 15, fontWeight: "700" },
});
