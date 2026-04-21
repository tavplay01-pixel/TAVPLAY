import React, { useState, useCallback, useEffect } from "react";
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
import { MEMORY_PAIRS } from "@/lib/game-data";

interface Card {
  uid: string;
  id: string;
  name: string;
  emoji: string;
}

function buildCards(): Card[] {
  const cards: Card[] = [];
  MEMORY_PAIRS.forEach((p) => {
    cards.push({ uid: p.id + "_a", id: p.id, name: p.name, emoji: p.emoji });
    cards.push({ uid: p.id + "_b", id: p.id, name: p.name, emoji: p.emoji });
  });
  // Shuffle
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

export default function MemoriaScreen() {
  const colors = useColors();
  const router = useRouter();
  const { recordGame } = useGame();
  const { playCorrectSound, playWrongSound } = useAudioContext();

  const [cards] = useState(() => buildCards());
  const [flipped, setFlipped] = useState<Set<string>>(new Set());
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<Card[]>([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [locked, setLocked] = useState(false);
  const [startTime] = useState(Date.now());

  const totalPairs = MEMORY_PAIRS.length;

  const handleCardPress = useCallback(
    (card: Card) => {
      if (locked || flipped.has(card.uid) || matched.has(card.id)) return;

      if (Platform.OS !== "web") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }

      const newFlipped = new Set(flipped);
      newFlipped.add(card.uid);
      setFlipped(newFlipped);

      const newSelected = [...selected, card];
      setSelected(newSelected);

      if (newSelected.length === 2) {
        setMoves((m) => m + 1);
        setLocked(true);

        const [a, b] = newSelected;
        if (a.id === b.id && a.uid !== b.uid) {
          // Match!
          setTimeout(() => {
            const newMatched = new Set(matched);
            newMatched.add(a.id);
            setMatched(newMatched);
            setSelected([]);
            setLocked(false);

            const pts = Math.max(5, 20 - moves);
            setScore((s) => s + pts);

            playCorrectSound();
            if (Platform.OS !== "web") {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            }

            if (newMatched.size === totalPairs) {
              const elapsed = Math.round((Date.now() - startTime) / 1000);
              const timeBonus = Math.max(0, 60 - elapsed);
              setScore((s) => s + timeBonus);
              setFinished(true);
              recordGame("memoria", score + pts + timeBonus, true);
            }
          }, 600);
        } else {
          // No match — flip back
          setTimeout(() => {
            const resetFlipped = new Set(flipped);
            resetFlipped.delete(a.uid);
            resetFlipped.delete(b.uid);
            setFlipped(resetFlipped);
            setSelected([]);
            setLocked(false);

            playWrongSound();
            if (Platform.OS !== "web") {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            }
          }, 900);
        }
      }
    },
    [locked, flipped, matched, selected, moves, score, totalPairs, startTime, recordGame]
  );

  if (finished) {
    return (
      <ScreenContainer style={{ backgroundColor: colors.background }}>
        <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Text style={[styles.backText, { color: colors.primary }]}>‹ Voltar</Text>
          </Pressable>
          <Text style={[styles.headerTitle, { color: colors.foreground }]}>Memória Bíblica</Text>
          <View style={{ width: 70 }} />
        </View>
        <ScrollView contentContainerStyle={styles.resultContainer}>
          <Text style={styles.resultEmoji}>🎉</Text>
          <Text style={[styles.resultTitle, { color: colors.foreground }]}>Parabéns!</Text>
          <Text style={[styles.resultSubtitle, { color: colors.muted }]}>Você encontrou todos os pares!</Text>
          <Text style={[styles.resultScore, { color: colors.primary }]}>{score} pontos</Text>
          <View style={[styles.resultCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.resultStat, { color: colors.foreground }]}>
              🃏 Movimentos: <Text style={{ color: colors.primary }}>{moves}</Text>
            </Text>
            <Text style={[styles.resultStat, { color: colors.foreground }]}>
              ✅ Pares: <Text style={{ color: colors.success }}>{totalPairs}/{totalPairs}</Text>
            </Text>
          </View>
          <Pressable onPress={() => router.back()} style={[styles.doneBtn, { backgroundColor: colors.primary }]}>
            <Text style={styles.doneBtnText}>Voltar ao Início</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setFlipped(new Set());
              setMatched(new Set());
              setSelected([]);
              setMoves(0);
              setScore(0);
              setFinished(false);
              setLocked(false);
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
        <Pressable onPress={() => { recordGame("memoria", score, false); router.back(); }} style={styles.backBtn}>
          <Text style={[styles.backText, { color: colors.primary }]}>‹ Sair</Text>
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>Memória Bíblica</Text>
        <View style={[styles.scorePill, { backgroundColor: colors.primary + "22" }]}>
          <Text style={[styles.scoreText, { color: colors.primary }]}>{score} pts</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
        {/* Stats */}
        <View style={styles.statsRow}>
          <Text style={[styles.statText, { color: colors.muted }]}>
            🃏 Movimentos: {moves}
          </Text>
          <Text style={[styles.statText, { color: colors.muted }]}>
            ✅ {matched.size}/{totalPairs} pares
          </Text>
        </View>

        {/* Progress bar */}
        <View style={[styles.progressBarBg, { backgroundColor: colors.border }]}>
          <View
            style={[
              styles.progressBarFill,
              { backgroundColor: colors.primary, width: `${(matched.size / totalPairs) * 100}%` as any },
            ]}
          />
        </View>

        {/* Cards grid */}
        <View style={styles.grid}>
          {cards.map((card) => {
            const isFlipped = flipped.has(card.uid);
            const isMatched = matched.has(card.id);
            const isVisible = isFlipped || isMatched;

            return (
              <Pressable
                key={card.uid}
                onPress={() => handleCardPress(card)}
                style={({ pressed }) => [
                  styles.card,
                  {
                    backgroundColor: isMatched
                      ? colors.success + "22"
                      : isFlipped
                      ? colors.surface
                      : colors.background,
                    borderColor: isMatched
                      ? colors.success
                      : isFlipped
                      ? colors.primary
                      : colors.border,
                    opacity: pressed ? 0.85 : 1,
                    transform: [{ scale: pressed ? 0.95 : 1 }],
                  },
                ]}
              >
                {isVisible ? (
                  <>
                    <Text style={styles.cardEmoji}>{card.emoji}</Text>
                    <Text
                      style={[
                        styles.cardName,
                        { color: isMatched ? colors.success : colors.foreground },
                      ]}
                      numberOfLines={2}
                    >
                      {card.name}
                    </Text>
                  </>
                ) : (
                  <Text style={[styles.cardBack, { color: colors.primary }]}>ת</Text>
                )}
              </Pressable>
            );
          })}
        </View>
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
  statText: { fontSize: 13 },
  progressBarBg: { height: 6, borderRadius: 3, overflow: "hidden" },
  progressBarFill: { height: "100%", borderRadius: 3 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
  },
  card: {
    width: "22%",
    aspectRatio: 0.75,
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    gap: 4,
  },
  cardEmoji: { fontSize: 22 },
  cardName: { fontSize: 9, textAlign: "center", fontWeight: "600", lineHeight: 12 },
  cardBack: { fontSize: 28, fontWeight: "700" },
  resultContainer: { padding: 24, alignItems: "center", gap: 16 },
  resultEmoji: { fontSize: 64 },
  resultTitle: { fontSize: 26, fontWeight: "700" },
  resultSubtitle: { fontSize: 15 },
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
