import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useGame } from "@/lib/game-context";
import { useAudioContext } from "@/lib/audio-context";
import { HANGMAN_WORDS } from "@/lib/game-data";

const MAX_WRONG = 6;
const KEYBOARD_ROWS = [
  ["A","B","C","D","E","F","G"],
  ["H","I","J","K","L","M","N"],
  ["O","P","Q","R","S","T","U"],
  ["V","W","X","Y","Z"],
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Simple ASCII hangman stages
const HANGMAN_STAGES = [
  "  +---+\n  |   |\n      |\n      |\n      |\n      |\n=========",
  "  +---+\n  |   |\n  O   |\n      |\n      |\n      |\n=========",
  "  +---+\n  |   |\n  O   |\n  |   |\n      |\n      |\n=========",
  "  +---+\n  |   |\n  O   |\n /|   |\n      |\n      |\n=========",
  "  +---+\n  |   |\n  O   |\n /|\\  |\n      |\n      |\n=========",
  "  +---+\n  |   |\n  O   |\n /|\\  |\n /    |\n      |\n=========",
  "  +---+\n  |   |\n  O   |\n /|\\  |\n / \\  |\n      |\n=========",
];

export default function ForcaScreen() {
  const colors = useColors();
  const router = useRouter();
  const { recordGame } = useGame();
  const { playCorrectSound, playWrongSound } = useAudioContext();

  const [wordList] = useState(() => shuffle(HANGMAN_WORDS));
  const [wordIdx, setWordIdx] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [wrongCount, setWrongCount] = useState(0);
  const [score, setScore] = useState(0);
  const [gamesWon, setGamesWon] = useState(0);
  const [gameOver, setGameOver] = useState<"won" | "lost" | null>(null);
  const [totalGames, setTotalGames] = useState(0);

  const currentWord = wordList[wordIdx % wordList.length];
  const wordLetters = currentWord.word.toUpperCase().split("");
  const uniqueLetters = [...new Set(wordLetters)];
  const correctGuesses = uniqueLetters.filter((l) => guessedLetters.has(l));
  const isWordComplete = correctGuesses.length === uniqueLetters.length;

  const handleLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.has(letter) || gameOver) return;

      const newGuessed = new Set(guessedLetters);
      newGuessed.add(letter);
      setGuessedLetters(newGuessed);

      const isCorrect = wordLetters.includes(letter);
      if (Platform.OS !== "web") {
        Haptics.impactAsync(
          isCorrect ? Haptics.ImpactFeedbackStyle.Light : Haptics.ImpactFeedbackStyle.Heavy
        );
      }

      if (!isCorrect) {
        playWrongSound();
        const newWrong = wrongCount + 1;
        setWrongCount(newWrong);
        if (newWrong >= MAX_WRONG) {
          setGameOver("lost");
          setTotalGames((t) => t + 1);
        }
      } else {
        playCorrectSound();
        // Check if word complete
        const newCorrect = uniqueLetters.filter((l) => newGuessed.has(l));
        if (newCorrect.length === uniqueLetters.length) {
          const pts = Math.max(10, 50 - wrongCount * 5);
          setScore((s) => s + pts);
          setGamesWon((w) => w + 1);
          setGameOver("won");
          setTotalGames((t) => t + 1);
        }
      }
    },
    [guessedLetters, gameOver, wordLetters, wrongCount, uniqueLetters]
  );

  const handleNext = () => {
    setWordIdx((i) => i + 1);
    setGuessedLetters(new Set());
    setWrongCount(0);
    setGameOver(null);
  };

  const handleFinish = () => {
    recordGame("forca", score, gamesWon > 0);
    router.back();
  };

  return (
    <ScreenContainer style={{ backgroundColor: colors.background }}>
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <Pressable onPress={() => { recordGame("forca", score, gamesWon > 0); router.back(); }} style={styles.backBtn}>
          <Text style={[styles.backText, { color: colors.primary }]}>‹ Sair</Text>
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>Forca Bíblica</Text>
        <View style={[styles.scorePill, { backgroundColor: colors.primary + "22" }]}>
          <Text style={[styles.scoreText, { color: colors.primary }]}>{score} pts</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, gap: 14 }}>
        {/* Stats row */}
        <View style={styles.statsRow}>
          <Text style={[styles.statText, { color: colors.muted }]}>
            ✅ {gamesWon} acertos
          </Text>
          <Text style={[styles.statText, { color: colors.muted }]}>
            Categoria: {currentWord.category}
          </Text>
          <Text style={[styles.statText, { color: wrongCount >= 4 ? colors.error : colors.muted }]}>
            ❌ {wrongCount}/{MAX_WRONG}
          </Text>
        </View>

        {/* Hangman drawing */}
        <View style={[styles.hangmanCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.hangmanArt, { color: wrongCount >= MAX_WRONG ? colors.error : colors.foreground }]}>
            {HANGMAN_STAGES[wrongCount]}
          </Text>
        </View>

        {/* Hint */}
        <View style={[styles.hintCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.hintLabel, { color: colors.muted }]}>💡 Dica:</Text>
          <Text style={[styles.hintText, { color: colors.foreground }]}>{currentWord.hint}</Text>
        </View>

        {/* Word display */}
        <View style={styles.wordRow}>
          {wordLetters.map((letter, i) => {
            const isSpace = letter === " ";
            const isRevealed = guessedLetters.has(letter) || gameOver !== null;
            return (
              <View
                key={i}
                style={[
                  styles.letterBox,
                  {
                    borderBottomColor: isSpace ? "transparent" : colors.primary,
                    marginHorizontal: isSpace ? 8 : 3,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.letterText,
                    {
                      color: isRevealed
                        ? guessedLetters.has(letter)
                          ? colors.success
                          : colors.error
                        : "transparent",
                    },
                  ]}
                >
                  {letter}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Game over overlay */}
        {gameOver && (
          <View
            style={[
              styles.gameOverCard,
              {
                backgroundColor: gameOver === "won" ? colors.success + "22" : colors.error + "22",
                borderColor: gameOver === "won" ? colors.success : colors.error,
              },
            ]}
          >
            <Text style={[styles.gameOverEmoji]}>
              {gameOver === "won" ? "🎉" : "💀"}
            </Text>
            <Text
              style={[
                styles.gameOverText,
                { color: gameOver === "won" ? colors.success : colors.error },
              ]}
            >
              {gameOver === "won" ? "Parabéns! Você acertou!" : `A palavra era: ${currentWord.word}`}
            </Text>
            <View style={styles.gameOverBtns}>
              <Pressable
                onPress={handleNext}
                style={[styles.nextWordBtn, { backgroundColor: colors.primary }]}
              >
                <Text style={styles.nextWordBtnText}>Próxima Palavra</Text>
              </Pressable>
              <Pressable
                onPress={handleFinish}
                style={[styles.finishBtn, { borderColor: colors.border }]}
              >
                <Text style={[styles.finishBtnText, { color: colors.muted }]}>Encerrar</Text>
              </Pressable>
            </View>
          </View>
        )}

        {/* Keyboard */}
        {!gameOver && (
          <View style={styles.keyboard}>
            {KEYBOARD_ROWS.map((row, rowIdx) => (
              <View key={rowIdx} style={styles.keyboardRow}>
                {row.map((letter) => {
                  const isGuessed = guessedLetters.has(letter);
                  const isCorrectLetter = wordLetters.includes(letter);
                  let bg = colors.surface;
                  let textColor = colors.foreground;
                  let borderColor = colors.border;

                  if (isGuessed) {
                    if (isCorrectLetter) {
                      bg = colors.success + "33"; textColor = colors.success; borderColor = colors.success;
                    } else {
                      bg = colors.error + "22"; textColor = colors.error + "88"; borderColor = colors.error + "44";
                    }
                  }

                  return (
                    <Pressable
                      key={letter}
                      onPress={() => handleLetter(letter)}
                      disabled={isGuessed}
                      style={({ pressed }) => [
                        styles.key,
                        { backgroundColor: bg, borderColor, opacity: pressed ? 0.7 : isGuessed ? 0.6 : 1 },
                      ]}
                    >
                      <Text style={[styles.keyText, { color: textColor }]}>{letter}</Text>
                    </Pressable>
                  );
                })}
              </View>
            ))}
          </View>
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
  statsRow: { flexDirection: "row", justifyContent: "space-between" },
  statText: { fontSize: 12 },
  hangmanCard: {
    borderRadius: 14,
    padding: 16,
    borderWidth: 1.5,
    alignItems: "center",
  },
  hangmanArt: {
    fontFamily: "monospace",
    fontSize: 14,
    lineHeight: 18,
  },
  hintCard: {
    borderRadius: 12,
    padding: 12,
    borderWidth: 1.5,
    flexDirection: "row",
    gap: 8,
    alignItems: "flex-start",
  },
  hintLabel: { fontSize: 13, fontWeight: "600" },
  hintText: { flex: 1, fontSize: 14, lineHeight: 20 },
  wordRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 2,
    paddingVertical: 8,
  },
  letterBox: {
    width: 28,
    height: 36,
    borderBottomWidth: 2,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 2,
  },
  letterText: { fontSize: 18, fontWeight: "700" },
  gameOverCard: {
    borderRadius: 14,
    padding: 16,
    borderWidth: 1.5,
    alignItems: "center",
    gap: 10,
  },
  gameOverEmoji: { fontSize: 40 },
  gameOverText: { fontSize: 16, fontWeight: "700", textAlign: "center" },
  gameOverBtns: { flexDirection: "row", gap: 10, width: "100%" },
  nextWordBtn: {
    flex: 1,
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
  },
  nextWordBtnText: { fontSize: 14, fontWeight: "700", color: "#F5E6C8" },
  finishBtn: {
    flex: 1,
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
    borderWidth: 1.5,
  },
  finishBtnText: { fontSize: 14, fontWeight: "600" },
  keyboard: { gap: 6 },
  keyboardRow: { flexDirection: "row", justifyContent: "center", gap: 5 },
  key: {
    width: 40,
    height: 44,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
  },
  keyText: { fontSize: 15, fontWeight: "700" },
});
