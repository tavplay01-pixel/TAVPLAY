import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform as RNPlatform,
} from "react-native";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useGame } from "@/lib/game-context";
import { useAudioContext } from "@/lib/audio-context";
import { WHO_AM_I_QUESTIONS } from "@/lib/game-data";

const QUESTIONS_PER_GAME = 5;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Phase = "playing" | "answered" | "finished";

export default function QuemSouEuScreen() {
  const colors = useColors();
  const router = useRouter();
  const { recordGame } = useGame();
  const { playCorrectSound, playWrongSound } = useAudioContext();

  const [questions] = useState(() => shuffle(WHO_AM_I_QUESTIONS).slice(0, QUESTIONS_PER_GAME));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [hintsRevealed, setHintsRevealed] = useState(1);
  const [guess, setGuess] = useState("");
  const [phase, setPhase] = useState<Phase>("playing");
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);

  const currentQ = questions[currentIdx];
  const isLast = currentIdx === questions.length - 1;
  const maxHints = currentQ.hints.length;

  const handleRevealHint = () => {
    if (hintsRevealed < maxHints) {
      setHintsRevealed((h) => h + 1);
    }
  };

  const normalizeStr = (s: string) =>
    s
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

  const handleGuess = useCallback(() => {
    if (!guess.trim() || phase !== "playing") return;

    const isCorrect = normalizeStr(guess) === normalizeStr(currentQ.answer);
    if (Platform.OS !== "web") {
      Haptics.notificationAsync(
        isCorrect
          ? Haptics.NotificationFeedbackType.Success
          : Haptics.NotificationFeedbackType.Error
      );
    }

    if (isCorrect) {
      playCorrectSound();
      const hintBonus = Math.max(0, maxHints - hintsRevealed + 1);
      const pts = 20 + hintBonus * 10;
      setScore((s) => s + pts);
      setCorrectCount((c) => c + 1);
      setPhase("answered");
    } else {
      playWrongSound();
      setWrongAttempts((w) => w + 1);
      setGuess("");
      if (wrongAttempts + 1 >= 3) {
        // Auto-reveal next hint
        if (hintsRevealed < maxHints) {
          setHintsRevealed((h) => h + 1);
        }
      }
    }
  }, [guess, phase, currentQ, hintsRevealed, maxHints, wrongAttempts]);

  const handleGiveUp = () => {
    setPhase("answered");
    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const handleNext = () => {
    if (isLast) {
      recordGame("quem-sou-eu", score, correctCount >= Math.ceil(QUESTIONS_PER_GAME / 2));
      setPhase("finished");
    } else {
      setCurrentIdx((i) => i + 1);
      setHintsRevealed(1);
      setGuess("");
      setPhase("playing");
      setWrongAttempts(0);
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
          <Text style={[styles.headerTitle, { color: colors.foreground }]}>Quem Sou Eu?</Text>
          <View style={{ width: 70 }} />
        </View>
        <ScrollView contentContainerStyle={styles.resultContainer}>
          <Text style={styles.resultEmoji}>❓</Text>
          <Text style={[styles.resultTitle, { color: colors.foreground }]}>
            {pct >= 80 ? "Detetive Bíblico!" : pct >= 50 ? "Bom trabalho!" : "Continue estudando!"}
          </Text>
          <Text style={[styles.resultScore, { color: colors.primary }]}>{score} pontos</Text>
          <View style={[styles.resultCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.resultStat, { color: colors.foreground }]}>
              ✅ Acertos: <Text style={{ color: colors.success }}>{correctCount}/{QUESTIONS_PER_GAME}</Text>
            </Text>
          </View>
          <Pressable onPress={() => router.back()} style={[styles.doneBtn, { backgroundColor: colors.primary }]}>
            <Text style={styles.doneBtnText}>Voltar ao Início</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setCurrentIdx(0);
              setHintsRevealed(1);
              setGuess("");
              setPhase("playing");
              setScore(0);
              setCorrectCount(0);
              setWrongAttempts(0);
            }}
            style={[styles.retryBtn, { borderColor: colors.primary }]}
          >
            <Text style={[styles.retryBtnText, { color: colors.primary }]}>Jogar Novamente</Text>
          </Pressable>
        </ScrollView>
      </ScreenContainer>
    );
  }

  const isCorrectlyAnswered = phase === "answered" && correctCount > 0;

  return (
    <ScreenContainer style={{ backgroundColor: colors.background }}>
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={[styles.backText, { color: colors.primary }]}>‹ Sair</Text>
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>Quem Sou Eu?</Text>
        <View style={[styles.scorePill, { backgroundColor: colors.primary + "22" }]}>
          <Text style={[styles.scoreText, { color: colors.primary }]}>{score} pts</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={RNPlatform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ padding: 16, gap: 14 }}>
          {/* Progress */}
          <View style={styles.progressRow}>
            <Text style={[styles.progressText, { color: colors.muted }]}>
              Personagem {currentIdx + 1} de {QUESTIONS_PER_GAME}
            </Text>
            <Text style={[styles.progressText, { color: colors.muted }]}>
              💡 {hintsRevealed}/{maxHints} dicas
            </Text>
          </View>

          {/* Mystery character */}
          <View style={[styles.mysteryCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={styles.mysteryEmoji}>❓</Text>
            <Text style={[styles.mysteryTitle, { color: colors.foreground }]}>Quem sou eu?</Text>
            {currentQ.reference && (
              <Text style={[styles.referenceText, { color: colors.muted }]}>📖 {currentQ.reference}</Text>
            )}
          </View>

          {/* Hints */}
          <View style={{ gap: 8 }}>
            {currentQ.hints.slice(0, hintsRevealed).map((hint, i) => (
              <View
                key={i}
                style={[
                  styles.hintCard,
                  { backgroundColor: colors.surface, borderColor: colors.border },
                ]}
              >
                <View style={[styles.hintNumber, { backgroundColor: colors.primary }]}>
                  <Text style={styles.hintNumberText}>{i + 1}</Text>
                </View>
                <Text style={[styles.hintText, { color: colors.foreground }]}>{hint}</Text>
              </View>
            ))}
            {hintsRevealed < maxHints && phase === "playing" && (
              <Pressable
                onPress={handleRevealHint}
                style={({ pressed }) => [
                  styles.revealBtn,
                  { borderColor: colors.border, opacity: pressed ? 0.7 : 1 },
                ]}
              >
                <Text style={[styles.revealBtnText, { color: colors.muted }]}>
                  💡 Revelar dica {hintsRevealed + 1}
                </Text>
              </Pressable>
            )}
          </View>

          {/* Answer revealed */}
          {phase === "answered" && (
            <View
              style={[
                styles.answerReveal,
                {
                  backgroundColor: isCorrectlyAnswered ? colors.success + "22" : colors.error + "22",
                  borderColor: isCorrectlyAnswered ? colors.success : colors.error,
                },
              ]}
            >
              <Text
                style={[
                  styles.answerRevealText,
                  { color: isCorrectlyAnswered ? colors.success : colors.error },
                ]}
              >
                {isCorrectlyAnswered ? "✅ Correto!" : "❌ A resposta era:"}
              </Text>
              <Text style={[styles.answerName, { color: colors.foreground }]}>
                {currentQ.answer}
              </Text>
            </View>
          )}

          {/* Input */}
          {phase === "playing" && (
            <View style={styles.inputSection}>
              {wrongAttempts > 0 && (
                <Text style={[styles.wrongText, { color: colors.error }]}>
                  ❌ {wrongAttempts} tentativa(s) errada(s)
                </Text>
              )}
              <View style={styles.inputRow}>
                <TextInput
                  value={guess}
                  onChangeText={setGuess}
                  placeholder="Digite o nome do personagem..."
                  placeholderTextColor={colors.muted}
                  style={[
                    styles.input,
                    {
                      color: colors.foreground,
                      borderColor: colors.border,
                      backgroundColor: colors.background,
                    },
                  ]}
                  returnKeyType="done"
                  onSubmitEditing={handleGuess}
                  autoCapitalize="words"
                />
                <Pressable
                  onPress={handleGuess}
                  style={[styles.guessBtn, { backgroundColor: colors.primary }]}
                >
                  <Text style={styles.guessBtnText}>→</Text>
                </Pressable>
              </View>
              <Pressable onPress={handleGiveUp} style={styles.giveUpBtn}>
                <Text style={[styles.giveUpText, { color: colors.muted }]}>Desistir e ver resposta</Text>
              </Pressable>
            </View>
          )}

          {/* Next */}
          {phase === "answered" && (
            <Pressable
              onPress={handleNext}
              style={({ pressed }) => [
                styles.nextBtn,
                { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 },
              ]}
            >
              <Text style={styles.nextBtnText}>
                {isLast ? "Ver Resultado" : "Próximo →"}
              </Text>
            </Pressable>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
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
  mysteryCard: {
    borderRadius: 14,
    padding: 20,
    borderWidth: 1.5,
    alignItems: "center",
    gap: 8,
  },
  mysteryEmoji: { fontSize: 48 },
  mysteryTitle: { fontSize: 20, fontWeight: "700" },
  referenceText: { fontSize: 12 },
  hintCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1.5,
    gap: 10,
  },
  hintNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  hintNumberText: { fontSize: 13, fontWeight: "700", color: "#F5E6C8" },
  hintText: { flex: 1, fontSize: 15, lineHeight: 22 },
  revealBtn: {
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
    borderWidth: 1.5,
    borderStyle: "dashed",
  },
  revealBtnText: { fontSize: 14 },
  answerReveal: {
    borderRadius: 12,
    padding: 14,
    borderWidth: 1.5,
    gap: 4,
  },
  answerRevealText: { fontSize: 15, fontWeight: "700" },
  answerName: { fontSize: 22, fontWeight: "700" },
  inputSection: { gap: 8 },
  wrongText: { fontSize: 13 },
  inputRow: { flexDirection: "row", gap: 8 },
  input: {
    flex: 1,
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  guessBtn: {
    width: 48,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  guessBtnText: { fontSize: 20, color: "#F5E6C8", fontWeight: "700" },
  giveUpBtn: { alignItems: "center", padding: 8 },
  giveUpText: { fontSize: 13 },
  nextBtn: { borderRadius: 12, padding: 16, alignItems: "center" },
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
