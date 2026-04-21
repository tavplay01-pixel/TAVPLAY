import React, { useState, useEffect, useCallback, useRef } from "react";
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
import { QUIZ_QUESTIONS } from "@/lib/game-data";

const TIMER_SECONDS = 20;
const QUESTIONS_PER_GAME = 10;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type GamePhase = "playing" | "answered" | "finished";

export default function QuizScreen() {
  const colors = useColors();
  const router = useRouter();
  const { recordGame } = useGame();

  const [questions] = useState(() => shuffle(QUIZ_QUESTIONS).slice(0, QUESTIONS_PER_GAME));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [phase, setPhase] = useState<GamePhase>("playing");
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timerAnim = useRef(new Animated.Value(1)).current;

  const currentQ = questions[currentIdx];
  const isLastQuestion = currentIdx === questions.length - 1;

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const { playCorrectSound, playWrongSound } = useAudioContext();

  const handleAnswer = useCallback(
    (optionIdx: number) => {
      if (phase !== "playing") return;
      stopTimer();
      setSelectedOption(optionIdx);
      setPhase("answered");

      const isCorrect = optionIdx === currentQ.correct;
      if (Platform.OS !== "web") {
        Haptics.notificationAsync(
          isCorrect
            ? Haptics.NotificationFeedbackType.Success
            : Haptics.NotificationFeedbackType.Error
        );
      }
      if (isCorrect) {
        playCorrectSound();
        const timeBonus = Math.round(timeLeft * 2);
        setScore((s) => s + 10 + timeBonus);
        setCorrectCount((c) => c + 1);
      } else {
        playWrongSound();
      }
    },
    [phase, currentQ, timeLeft, stopTimer, playCorrectSound, playWrongSound]
  );

  // Auto-advance on timeout
  useEffect(() => {
    if (phase !== "playing") return;
    setTimeLeft(TIMER_SECONDS);
    Animated.timing(timerAnim, { toValue: 1, duration: 0, useNativeDriver: false }).start();
    Animated.timing(timerAnim, {
      toValue: 0,
      duration: TIMER_SECONDS * 1000,
      useNativeDriver: false,
    }).start();

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          stopTimer();
          setPhase("answered");
          setSelectedOption(-1); // timeout
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => stopTimer();
  }, [currentIdx, phase]);

  const handleNext = () => {
    if (isLastQuestion) {
      recordGame("quiz", score, correctCount >= Math.ceil(QUESTIONS_PER_GAME / 2));
      setPhase("finished");
    } else {
      setCurrentIdx((i) => i + 1);
      setSelectedOption(null);
      setPhase("playing");
    }
  };

  const timerColor = timerAnim.interpolate({
    inputRange: [0, 0.3, 1],
    outputRange: [colors.error, colors.warning, colors.success],
  });

  if (phase === "finished") {
    const pct = Math.round((correctCount / QUESTIONS_PER_GAME) * 100);
    return (
      <ScreenContainer style={{ backgroundColor: colors.background }}>
        <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Text style={[styles.backText, { color: colors.primary }]}>‹ Voltar</Text>
          </Pressable>
          <Text style={[styles.headerTitle, { color: colors.foreground }]}>Quiz Bíblico</Text>
          <View style={{ width: 70 }} />
        </View>
        <ScrollView contentContainerStyle={styles.resultContainer}>
          <Text style={styles.resultEmoji}>{pct >= 70 ? "🏆" : pct >= 50 ? "📖" : "📚"}</Text>
          <Text style={[styles.resultTitle, { color: colors.foreground }]}>
            {pct >= 70 ? "Excelente!" : pct >= 50 ? "Bom trabalho!" : "Continue estudando!"}
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
          <Pressable
            onPress={() => router.back()}
            style={[styles.doneBtn, { backgroundColor: colors.primary }]}
          >
            <Text style={styles.doneBtnText}>Voltar ao Início</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setCurrentIdx(0);
              setScore(0);
              setCorrectCount(0);
              setSelectedOption(null);
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

  return (
    <ScreenContainer style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={[styles.backText, { color: colors.primary }]}>‹ Sair</Text>
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>Quiz Bíblico</Text>
        <View style={[styles.scorePill, { backgroundColor: colors.primary + "22" }]}>
          <Text style={[styles.scoreText, { color: colors.primary }]}>{score} pts</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        {/* Progress */}
        <View style={styles.progressRow}>
          <Text style={[styles.progressText, { color: colors.muted }]}>
            Pergunta {currentIdx + 1} de {QUESTIONS_PER_GAME}
          </Text>
          <Text style={[styles.timerText, { color: timeLeft <= 5 ? colors.error : colors.muted }]}>
            ⏱ {timeLeft}s
          </Text>
        </View>
        <View style={[styles.progressBarBg, { backgroundColor: colors.border }]}>
          <View
            style={[
              styles.progressBarFill,
              {
                backgroundColor: colors.primary,
                width: `${((currentIdx) / QUESTIONS_PER_GAME) * 100}%` as any,
              },
            ]}
          />
        </View>
        {/* Timer bar */}
        <Animated.View style={[styles.timerBarBg, { backgroundColor: colors.border }]}>
          <Animated.View
            style={[
              styles.timerBarFill,
              { backgroundColor: timerColor, width: timerAnim.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] }) },
            ]}
          />
        </Animated.View>

        {/* Question */}
        <View style={[styles.questionCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.questionText, { color: colors.foreground }]}>{currentQ.question}</Text>
          {currentQ.reference && (
            <Text style={[styles.referenceText, { color: colors.muted }]}>📖 {currentQ.reference}</Text>
          )}
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correct;
            const showResult = phase === "answered";

            let bg = colors.surface;
            let border = colors.border;
            let textColor = colors.foreground;

            if (showResult) {
              if (isCorrect) { bg = colors.success + "33"; border = colors.success; textColor = colors.success; }
              else if (isSelected && !isCorrect) { bg = colors.error + "33"; border = colors.error; textColor = colors.error; }
            } else if (isSelected) {
              bg = colors.primary + "22"; border = colors.primary;
            }

            return (
              <Pressable
                key={idx}
                onPress={() => handleAnswer(idx)}
                disabled={phase !== "playing"}
                style={({ pressed }) => [
                  styles.optionBtn,
                  { backgroundColor: bg, borderColor: border, opacity: pressed && phase === "playing" ? 0.8 : 1 },
                ]}
              >
                <View style={[styles.optionLetter, { backgroundColor: border + "44" }]}>
                  <Text style={[styles.optionLetterText, { color: textColor }]}>
                    {["A", "B", "C", "D"][idx]}
                  </Text>
                </View>
                <Text style={[styles.optionText, { color: textColor }]}>{opt}</Text>
                {showResult && isCorrect && <Text style={styles.checkmark}>✓</Text>}
                {showResult && isSelected && !isCorrect && <Text style={styles.xmark}>✗</Text>}
              </Pressable>
            );
          })}
        </View>

        {/* Explanation on timeout */}
        {phase === "answered" && selectedOption === -1 && (
          <View style={[styles.explanationCard, { backgroundColor: colors.warning + "22", borderColor: colors.warning }]}>
            <Text style={[styles.explanationText, { color: colors.foreground }]}>
              ⏱ Tempo esgotado! A resposta correta era:{" "}
              <Text style={{ fontWeight: "700", color: colors.success }}>
                {currentQ.options[currentQ.correct]}
              </Text>
            </Text>
          </View>
        )}

        {/* Next button */}
        {phase === "answered" && (
          <Pressable
            onPress={handleNext}
            style={({ pressed }) => [
              styles.nextBtn,
              { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 },
            ]}
          >
            <Text style={styles.nextBtnText}>
              {isLastQuestion ? "Ver Resultado" : "Próxima →"}
            </Text>
          </Pressable>
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
  timerText: { fontSize: 13, fontWeight: "700" },
  progressBarBg: { height: 6, borderRadius: 3, overflow: "hidden" },
  progressBarFill: { height: "100%", borderRadius: 3 },
  timerBarBg: { height: 4, borderRadius: 2, overflow: "hidden" },
  timerBarFill: { height: "100%", borderRadius: 2 },
  questionCard: {
    borderRadius: 14,
    padding: 18,
    borderWidth: 1.5,
    gap: 8,
  },
  questionText: { fontSize: 17, fontWeight: "600", lineHeight: 24 },
  referenceText: { fontSize: 12 },
  optionsContainer: { gap: 10 },
  optionBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1.5,
    gap: 12,
  },
  optionLetter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  optionLetterText: { fontSize: 14, fontWeight: "700" },
  optionText: { flex: 1, fontSize: 15, lineHeight: 20 },
  checkmark: { fontSize: 18, color: "#4A7C3F" },
  xmark: { fontSize: 18, color: "#8B2020" },
  explanationCard: {
    borderRadius: 10,
    padding: 12,
    borderWidth: 1.5,
  },
  explanationText: { fontSize: 14, lineHeight: 20 },
  nextBtn: {
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  nextBtnText: { fontSize: 16, fontWeight: "700", color: "#F5E6C8" },
  resultContainer: {
    padding: 24,
    alignItems: "center",
    gap: 16,
  },
  resultEmoji: { fontSize: 64 },
  resultTitle: { fontSize: 26, fontWeight: "700" },
  resultScore: { fontSize: 36, fontWeight: "700" },
  resultCard: {
    borderRadius: 14,
    padding: 16,
    borderWidth: 1.5,
    width: "100%",
    gap: 8,
  },
  resultStat: { fontSize: 16, lineHeight: 24 },
  doneBtn: {
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    width: "100%",
  },
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
