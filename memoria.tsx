import React, { useState, useCallback, useEffect } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView, Platform } from "react-native";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";

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

// Função que cria as cartas baseada no nível (aumenta a quantidade)
function buildCards(level: number): Card[] {
  const cards: Card[] = [];
  // Sorteia personagens da lista original para não ser sempre igual
  const shuffledPairs = [...MEMORY_PAIRS].sort(() => Math.random() - 0.5);
  
  // Define quantos pares teremos (começa com 4 pares e aumenta até o limite)
  const pairsCount = Math.min(4 + Math.floor(level / 2), MEMORY_PAIRS.length);
  const selectedPairs = shuffledPairs.slice(0, pairsCount);

  selectedPairs.forEach((p) => {
    cards.push({ uid: p.id + "_a", id: p.id, name: p.name, emoji: p.emoji });
    cards.push({ uid: p.id + "_b", id: p.id, name: p.name, emoji: p.emoji });
  });

  // Embaralha final
  return cards.sort(() => Math.random() - 0.5);
}

export default function MemoriaScreen() {
  const colors = useColors();
  const router = useRouter();
  const { recordGame } = useGame();
  const { playCorrectSound, playWrongSound } = useAudioContext();

  const [level, setLevel] = useState(1);
  const [cards, setCards] = useState(() => buildCards(1));
  const [flipped, setFlipped] = useState<Set<string>>(new Set());
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<Card[]>([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [locked, setLocked] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());

  const totalPairs = cards.length / 2;

  // Função para avançar de fase
  const startNextLevel = () => {
    const nextLvl = level + 1;
    setLevel(nextLvl);
    setCards(buildCards(nextLvl));
    setFlipped(new Set());
    setMatched(new Set());
    setSelected([]);
    setMoves(0);
    setFinished(false);
    setLocked(false);
    setStartTime(Date.now());
  };

  const handleCardPress = useCallback((card: Card) => {
    if (locked || flipped.has(card.uid) || matched.has(card.id)) return;

    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

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
        setTimeout(() => {
          const newMatched = new Set(matched);
          newMatched.add(a.id);
          setMatched(newMatched);
          setSelected([]);
          setLocked(false);

          const pts = Math.max(5, 20 - moves) * level;
          setScore((s) => s + pts);
          playCorrectSound();

          if (newMatched.size === totalPairs) {
            setFinished(true);
            recordGame("memoria", score + pts, true);
          }
        }, 600);
      } else {
        setTimeout(() => {
          const resetFlipped = new Set(flipped);
          resetFlipped.delete(a.uid);
          resetFlipped.delete(b.uid);
          setFlipped(resetFlipped);
          setSelected([]);
          setLocked(false);
          playWrongSound();
        }, 900);
      }
    }
  }, [locked, flipped, matched, selected, moves, score, totalPairs, level]);

  if (finished) {
    return (
      <ScreenContainer style={{ backgroundColor: colors.background }}>
        <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}><Text style={[styles.backText, { color: colors.primary }]}>‹ Sair</Text></Pressable>
          <Text style={[styles.headerTitle, { color: colors.foreground }]}>Vitória!</Text>
          <View style={{ width: 70 }} />
        </View>
        <ScrollView contentContainerStyle={styles.resultContainer}>
          <Text style={styles.resultEmoji}>⭐</Text>
          <Text style={[styles.resultTitle, { color: colors.foreground }]}>Nível {level} Concluído!</Text>
          <Text style={[styles.resultScore, { color: colors.primary }]}>{score} pts</Text>
          
          <Pressable onPress={startNextLevel} style={[styles.doneBtn, { backgroundColor: colors.primary }]}>
            <Text style={styles.doneBtnText}>PRÓXIMA FASE</Text>
          </Pressable>

          <Pressable onPress={() => router.back()} style={[styles.retryBtn, { borderColor: colors.border }]}>
            <Text style={[styles.retryBtnText, { color: colors.muted }]}>Voltar ao Menu</Text>
          </Pressable>
        </ScrollView>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer style={{ backgroundColor: colors.background }}>
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}><Text style={[styles.backText, { color: colors.primary }]}>‹ Sair</Text></Pressable>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>Nível {level}</Text>
        <View style={[styles.scorePill, { backgroundColor: colors.primary + "22" }]}><Text style={[styles.scoreText, { color: colors.primary }]}>{score} pts</Text></View>
      </View>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
        <View style={styles.statsRow}>
          <Text style={[styles.statText, { color: colors.muted }]}>🃏 Movimentos: {moves}</Text>
          <Text style={[styles.statText, { color: colors.muted }]}>✅ {matched.size}/{totalPairs} pares</Text>
        </View>
        <View style={styles.grid}>
          {cards.map((card) => (
            <Pressable key={card.uid} onPress={() => handleCardPress(card)} style={[styles.card, { backgroundColor: matched.has(card.id) ? colors.success + "22" : flipped.has(card.uid) ? colors.surface : colors.background, borderColor: matched.has(card.id) ? colors.success : flipped.has(card.uid) ? colors.primary : colors.border }]}>
              {flipped.has(card.uid) || matched.has(card.id) ? (
                <><Text style={styles.cardEmoji}>{card.emoji}</Text><Text style={[styles.cardName, { color: colors.foreground }]}>{card.name}</Text></>
              ) : (
                <Text style={[styles.cardBack, { color: colors.primary }]}>?</Text>
              )}
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1.5 },
  backBtn: { padding: 4 }, backText: { fontSize: 16, fontWeight: "600" }, headerTitle: { fontSize: 17, fontWeight: "700" },
  scorePill: { borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4 }, scoreText: { fontSize: 13, fontWeight: "700" },
  statsRow: { flexDirection: "row", justifyContent: "space-between" }, statText: { fontSize: 13 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 8, justifyContent: "center", marginTop: 10 },
  card: { width: "22%", aspectRatio: 0.75, borderRadius: 10, borderWidth: 1.5, alignItems: "center", justifyContent: "center", padding: 4 },
  cardEmoji: { fontSize: 22 }, cardName: { fontSize: 8, textAlign: "center", fontWeight: "600" }, cardBack: { fontSize: 24, fontWeight: "700" },
  resultContainer: { padding: 24, alignItems: "center", gap: 20 }, resultEmoji: { fontSize: 64 }, resultTitle: { fontSize: 24, fontWeight: "800" },
  resultScore: { fontSize: 48, fontWeight: "800" }, doneBtn: { borderRadius: 15, padding: 20, alignItems: "center", width: "100%", elevation: 5 },
  doneBtnText: { fontSize: 18, fontWeight: "900", color: "#FFF", letterSpacing: 1 },
  retryBtn: { borderRadius: 12, padding: 14, alignItems: "center", width: "100%", borderWidth: 1.5, marginTop: 10 },
  retryBtnText: { fontSize: 15, fontWeight: "700" },
});
