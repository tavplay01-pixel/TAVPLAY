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

// Simplified crossword data — 5x7 grid
interface CrosswordEntry {
  number: number;
  direction: "across" | "down";
  clue: string;
  answer: string;
  row: number;
  col: number;
}

const ENTRIES: CrosswordEntry[] = [
  { number: 1, direction: "across", clue: "Primeiro livro da Bíblia (Gn 1:1)", answer: "GENESIS", row: 0, col: 0 },
  { number: 2, direction: "down",   clue: "Rei que matou Golias (1Sm 17)", answer: "DAVI", row: 0, col: 3 },
  { number: 3, direction: "across", clue: "Profeta engolido por peixe (Jn 1:17)", answer: "JONAS", row: 2, col: 0 },
  { number: 4, direction: "down",   clue: "Mãe de Jesus (Lc 1:31)", answer: "MARIA", row: 2, col: 4 },
  { number: 5, direction: "across", clue: "Apóstolo dos gentios (At 9)", answer: "PAULO", row: 4, col: 0 },
  { number: 6, direction: "down",   clue: "Construiu a arca (Gn 6:14)", answer: "NOE", row: 0, col: 6 },
];

const GRID_ROWS = 6;
const GRID_COLS = 8;

function buildCrosswordGrid(entries: CrosswordEntry[]) {
  const grid: Array<Array<{ letter: string; number?: number; entryIds: number[] } | null>> =
    Array.from({ length: GRID_ROWS }, () => Array(GRID_COLS).fill(null));

  entries.forEach((entry) => {
    entry.answer.split("").forEach((letter, i) => {
      const r = entry.direction === "across" ? entry.row : entry.row + i;
      const c = entry.direction === "across" ? entry.col + i : entry.col;
      if (r < GRID_ROWS && c < GRID_COLS) {
        const existing = grid[r][c];
        if (existing) {
          existing.entryIds.push(entry.number);
        } else {
          grid[r][c] = {
            letter,
            number: i === 0 ? entry.number : undefined,
            entryIds: [entry.number],
          };
        }
      }
    });
  });

  return grid;
}

export default function PalavrasCruzadasScreen() {
  const colors = useColors();
  const router = useRouter();
  const { recordGame } = useGame();
  const { playCorrectSound, playWrongSound } = useAudioContext();

  const [grid] = useState(() => buildCrosswordGrid(ENTRIES));
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [checkedEntries, setCheckedEntries] = useState<Set<number>>(new Set());
  const [selectedEntry, setSelectedEntry] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const selectedEntryData = ENTRIES.find((e) => e.number === selectedEntry);

  const handleCellPress = (entryIds: number[]) => {
    if (entryIds.length > 0) {
      setSelectedEntry(entryIds[0]);
    }
  };

  const handleCheck = useCallback(() => {
    let newScore = 0;
    const newChecked = new Set<number>();

    ENTRIES.forEach((entry) => {
      const userAnswer = (userAnswers[entry.number] ?? "").toUpperCase().trim();
      if (userAnswer === entry.answer) {
        newScore += entry.answer.length * 10;
        newChecked.add(entry.number);
      }
    });

    setCheckedEntries(newChecked);
    setScore(newScore);

    if (Platform.OS !== "web") {
      Haptics.notificationAsync(
        newChecked.size === ENTRIES.length
          ? Haptics.NotificationFeedbackType.Success
          : Haptics.NotificationFeedbackType.Warning
      );
    }

    if (newChecked.size === ENTRIES.length) {
      playCorrectSound();
      setFinished(true);
      recordGame("palavras-cruzadas", newScore, true);
    } else if (newChecked.size > 0) {
      playCorrectSound();
    } else {
      playWrongSound();
    }
  }, [userAnswers, recordGame, playCorrectSound, playWrongSound]);

  const isCorrect = (entryNum: number) => checkedEntries.has(entryNum);
  const isWrong = (entryNum: number) =>
    checkedEntries.size > 0 &&
    !checkedEntries.has(entryNum) &&
    (userAnswers[entryNum] ?? "").trim().length > 0;

  if (finished) {
    return (
      <ScreenContainer style={{ backgroundColor: colors.background }}>
        <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Text style={[styles.backText, { color: colors.primary }]}>‹ Voltar</Text>
          </Pressable>
          <Text style={[styles.headerTitle, { color: colors.foreground }]}>Palavras Cruzadas</Text>
          <View style={{ width: 70 }} />
        </View>
        <ScrollView contentContainerStyle={styles.resultContainer}>
          <Text style={styles.resultEmoji}>📝</Text>
          <Text style={[styles.resultTitle, { color: colors.foreground }]}>Crucigrama Completo!</Text>
          <Text style={[styles.resultScore, { color: colors.primary }]}>{score} pontos</Text>
          <Pressable onPress={() => router.back()} style={[styles.doneBtn, { backgroundColor: colors.primary }]}>
            <Text style={styles.doneBtnText}>Voltar ao Início</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setUserAnswers({});
              setCheckedEntries(new Set());
              setSelectedEntry(null);
              setScore(0);
              setFinished(false);
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
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <Pressable onPress={() => { recordGame("palavras-cruzadas", score, false); router.back(); }} style={styles.backBtn}>
          <Text style={[styles.backText, { color: colors.primary }]}>‹ Sair</Text>
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>Palavras Cruzadas</Text>
        <View style={[styles.scorePill, { backgroundColor: colors.primary + "22" }]}>
          <Text style={[styles.scoreText, { color: colors.primary }]}>{score} pts</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={RNPlatform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ padding: 16, gap: 14 }}>
          {/* Grid */}
          <View style={[styles.gridContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            {grid.map((row, r) => (
              <View key={r} style={styles.gridRow}>
                {row.map((cell, c) => {
                  if (!cell) {
                    return (
                      <View
                        key={c}
                        style={[styles.cell, styles.blackCell, { backgroundColor: colors.accent }]}
                      />
                    );
                  }
                  const entryNum = cell.entryIds[0];
                  const isSelected = cell.entryIds.includes(selectedEntry ?? -1);
                  const correct = cell.entryIds.some((id) => isCorrect(id));
                  const wrong = cell.entryIds.some((id) => isWrong(id));

                  return (
                    <Pressable
                      key={c}
                      onPress={() => handleCellPress(cell.entryIds)}
                      style={[
                        styles.cell,
                        styles.whiteCell,
                        {
                          backgroundColor: correct
                            ? colors.success + "33"
                            : wrong
                            ? colors.error + "22"
                            : isSelected
                            ? colors.primary + "33"
                            : colors.background,
                          borderColor: isSelected ? colors.primary : colors.border,
                        },
                      ]}
                    >
                      {cell.number && (
                        <Text style={[styles.cellNumber, { color: colors.muted }]}>
                          {cell.number}
                        </Text>
                      )}
                      <Text style={[styles.cellLetter, { color: colors.foreground }]}>
                        {cell.letter}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            ))}
          </View>

          {/* Selected clue input */}
          {selectedEntryData && (
            <View style={[styles.inputSection, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Text style={[styles.clueLabel, { color: colors.muted }]}>
                {selectedEntryData.number}{selectedEntryData.direction === "across" ? " →" : " ↓"}
              </Text>
              <Text style={[styles.clueText, { color: colors.foreground }]}>
                {selectedEntryData.clue}
              </Text>
              <TextInput
                value={userAnswers[selectedEntryData.number] ?? ""}
                onChangeText={(t) =>
                  setUserAnswers((prev) => ({ ...prev, [selectedEntryData.number]: t.toUpperCase() }))
                }
                placeholder={`${selectedEntryData.answer.length} letras`}
                placeholderTextColor={colors.muted}
                style={[
                  styles.input,
                  {
                    color: colors.foreground,
                    borderColor: colors.border,
                    backgroundColor: colors.background,
                  },
                ]}
                autoCapitalize="characters"
                maxLength={selectedEntryData.answer.length}
                returnKeyType="done"
              />
            </View>
          )}

          {/* Clues */}
          <View style={[styles.cluesCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.cluesTitle, { color: colors.foreground }]}>📖 Dicas Horizontais</Text>
            {ENTRIES.filter((e) => e.direction === "across").map((e) => (
              <Pressable key={e.number} onPress={() => setSelectedEntry(e.number)}>
                <Text
                  style={[
                    styles.clueItem,
                    {
                      color: isCorrect(e.number)
                        ? colors.success
                        : selectedEntry === e.number
                        ? colors.primary
                        : colors.foreground,
                    },
                  ]}
                >
                  <Text style={{ fontWeight: "700" }}>{e.number}. </Text>
                  {e.clue}
                  {isCorrect(e.number) ? " ✓" : ""}
                </Text>
              </Pressable>
            ))}
            <Text style={[styles.cluesTitle, { color: colors.foreground, marginTop: 8 }]}>📖 Dicas Verticais</Text>
            {ENTRIES.filter((e) => e.direction === "down").map((e) => (
              <Pressable key={e.number} onPress={() => setSelectedEntry(e.number)}>
                <Text
                  style={[
                    styles.clueItem,
                    {
                      color: isCorrect(e.number)
                        ? colors.success
                        : selectedEntry === e.number
                        ? colors.primary
                        : colors.foreground,
                    },
                  ]}
                >
                  <Text style={{ fontWeight: "700" }}>{e.number}. </Text>
                  {e.clue}
                  {isCorrect(e.number) ? " ✓" : ""}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Check button */}
          <Pressable
            onPress={handleCheck}
            style={({ pressed }) => [
              styles.checkBtn,
              { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 },
            ]}
          >
            <Text style={styles.checkBtnText}>Verificar Respostas</Text>
          </Pressable>
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
  gridContainer: {
    borderRadius: 12,
    padding: 8,
    borderWidth: 1.5,
  },
  gridRow: { flexDirection: "row" },
  cell: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    margin: 1,
    borderRadius: 4,
    position: "relative",
  },
  blackCell: {},
  whiteCell: {},
  cellNumber: { position: "absolute", top: 1, left: 2, fontSize: 7, fontWeight: "700" },
  cellLetter: { fontSize: 13, fontWeight: "700" },
  inputSection: {
    borderRadius: 12,
    padding: 14,
    borderWidth: 1.5,
    gap: 8,
  },
  clueLabel: { fontSize: 12, fontWeight: "700", textTransform: "uppercase" },
  clueText: { fontSize: 15, fontWeight: "600", lineHeight: 20 },
  input: {
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 4,
  },
  cluesCard: {
    borderRadius: 12,
    padding: 14,
    borderWidth: 1.5,
    gap: 6,
  },
  cluesTitle: { fontSize: 14, fontWeight: "700" },
  clueItem: { fontSize: 13, lineHeight: 20 },
  checkBtn: {
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  checkBtnText: { fontSize: 16, fontWeight: "700", color: "#F5E6C8" },
  resultContainer: { padding: 24, alignItems: "center", gap: 16 },
  resultEmoji: { fontSize: 64 },
  resultTitle: { fontSize: 26, fontWeight: "700" },
  resultScore: { fontSize: 36, fontWeight: "700" },
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
