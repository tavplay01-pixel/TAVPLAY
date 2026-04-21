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
import { CHRONOLOGICAL_SETS } from "@/lib/game-data";

type Phase = "selecting" | "playing" | "answered" | "finished";

export default function OrdemCronologicaScreen() {
  const colors = useColors();
  const router = useRouter();
  const { recordGame } = useGame();
  const { playCorrectSound, playWrongSound } = useAudioContext();

  const [setIdx, setSetIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("selecting");
  const [items, setItems] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [setsCompleted, setSetsCompleted] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const currentSet = CHRONOLOGICAL_SETS[setIdx];

  const startSet = (idx: number) => {
    const set = CHRONOLOGICAL_SETS[idx];
    const shuffled = [...set.events].sort(() => Math.random() - 0.5);
    setItems(shuffled);
    setSetIdx(idx);
    setPhase("playing");
    setSelectedItem(null);
  };

  const handleItemPress = (idx: number) => {
    if (phase !== "playing") return;
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    if (selectedItem === null) {
      setSelectedItem(idx);
    } else if (selectedItem === idx) {
      setSelectedItem(null);
    } else {
      // Swap
      const newItems = [...items];
      [newItems[selectedItem], newItems[idx]] = [newItems[idx], newItems[selectedItem]];
      setItems(newItems);
      setSelectedItem(null);
    }
  };

  const handleMoveUp = (idx: number) => {
    if (idx === 0) return;
    const newItems = [...items];
    [newItems[idx - 1], newItems[idx]] = [newItems[idx], newItems[idx - 1]];
    setItems(newItems);
  };

  const handleMoveDown = (idx: number) => {
    if (idx === items.length - 1) return;
    const newItems = [...items];
    [newItems[idx + 1], newItems[idx]] = [newItems[idx], newItems[idx + 1]];
    setItems(newItems);
  };

  const handleCheck = useCallback(() => {
    const correct = items.every((item, i) => item === currentSet.events[i]);
    setIsCorrect(correct);
    setPhase("answered");

    if (Platform.OS !== "web") {
      Haptics.notificationAsync(
        correct
          ? Haptics.NotificationFeedbackType.Success
          : Haptics.NotificationFeedbackType.Error
      );
    }

    if (correct) {
      playCorrectSound();
      setScore((s) => s + 30);
      setSetsCompleted((c) => c + 1);
    } else {
      playWrongSound();
    }
  }, [items, currentSet, playCorrectSound, playWrongSound]);

  const handleNext = () => {
    if (setIdx >= CHRONOLOGICAL_SETS.length - 1) {
      recordGame("ordem-cronologica", score, setsCompleted > 0);
      setPhase("finished");
    } else {
      startSet(setIdx + 1);
    }
  };

  if (phase === "finished") {
    return (
      <ScreenContainer style={{ backgroundColor: colors.background }}>
        <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Text style={[styles.backText, { color: colors.primary }]}>‹ Voltar</Text>
          </Pressable>
          <Text style={[styles.headerTitle, { color: colors.foreground }]}>Ordem Cronológica</Text>
          <View style={{ width: 70 }} />
        </View>
        <ScrollView contentContainerStyle={styles.resultContainer}>
          <Text style={styles.resultEmoji}>📅</Text>
          <Text style={[styles.resultTitle, { color: colors.foreground }]}>
            {setsCompleted === CHRONOLOGICAL_SETS.length ? "Historiador Bíblico!" : "Bom trabalho!"}
          </Text>
          <Text style={[styles.resultScore, { color: colors.primary }]}>{score} pontos</Text>
          <View style={[styles.resultCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.resultStat, { color: colors.foreground }]}>
              ✅ Conjuntos corretos: <Text style={{ color: colors.success }}>{setsCompleted}/{CHRONOLOGICAL_SETS.length}</Text>
            </Text>
          </View>
          <Pressable onPress={() => router.back()} style={[styles.doneBtn, { backgroundColor: colors.primary }]}>
            <Text style={styles.doneBtnText}>Voltar ao Início</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setSetIdx(0);
              setPhase("selecting");
              setScore(0);
              setSetsCompleted(0);
              setItems([]);
              setSelectedItem(null);
            }}
            style={[styles.retryBtn, { borderColor: colors.primary }]}
          >
            <Text style={[styles.retryBtnText, { color: colors.primary }]}>Jogar Novamente</Text>
          </Pressable>
        </ScrollView>
      </ScreenContainer>
    );
  }

  if (phase === "selecting") {
    return (
      <ScreenContainer style={{ backgroundColor: colors.background }}>
        <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Text style={[styles.backText, { color: colors.primary }]}>‹ Voltar</Text>
          </Pressable>
          <Text style={[styles.headerTitle, { color: colors.foreground }]}>Ordem Cronológica</Text>
          <View style={{ width: 70 }} />
        </View>
        <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
          <Text style={[styles.selectTitle, { color: colors.foreground }]}>Escolha um conjunto:</Text>
          {CHRONOLOGICAL_SETS.map((set, i) => (
            <Pressable
              key={set.id}
              onPress={() => startSet(i)}
              style={({ pressed }) => [
                styles.setCard,
                { backgroundColor: colors.surface, borderColor: colors.border, opacity: pressed ? 0.85 : 1 },
              ]}
            >
              <Text style={[styles.setTitle, { color: colors.foreground }]}>{set.title}</Text>
              <Text style={[styles.setCount, { color: colors.muted }]}>{set.events.length} eventos para ordenar</Text>
            </Pressable>
          ))}
        </ScrollView>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer style={{ backgroundColor: colors.background }}>
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <Pressable onPress={() => { recordGame("ordem-cronologica", score, setsCompleted > 0); router.back(); }} style={styles.backBtn}>
          <Text style={[styles.backText, { color: colors.primary }]}>‹ Sair</Text>
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>{currentSet.title}</Text>
        <View style={[styles.scorePill, { backgroundColor: colors.primary + "22" }]}>
          <Text style={[styles.scoreText, { color: colors.primary }]}>{score} pts</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, gap: 14 }}>
        <Text style={[styles.instructions, { color: colors.muted }]}>
          Use as setas ↑↓ para ordenar os eventos do mais antigo ao mais recente.
        </Text>

        {/* Items */}
        <View style={{ gap: 8 }}>
          {items.map((item, idx) => {
            const isSelected = selectedItem === idx;
            const isCorrectPos = phase === "answered" && item === currentSet.events[idx];
            const isWrongPos = phase === "answered" && item !== currentSet.events[idx];

            return (
              <View
                key={`${item}-${idx}`}
                style={[
                  styles.itemRow,
                  {
                    backgroundColor: isCorrectPos
                      ? colors.success + "22"
                      : isWrongPos
                      ? colors.error + "11"
                      : isSelected
                      ? colors.primary + "22"
                      : colors.surface,
                    borderColor: isCorrectPos
                      ? colors.success
                      : isWrongPos
                      ? colors.error
                      : isSelected
                      ? colors.primary
                      : colors.border,
                  },
                ]}
              >
                <View style={[styles.itemNumber, { backgroundColor: colors.primary + "33" }]}>
                  <Text style={[styles.itemNumberText, { color: colors.primary }]}>{idx + 1}</Text>
                </View>
                <Text style={[styles.itemText, { color: colors.foreground }]} numberOfLines={3}>
                  {item}
                </Text>
                {phase === "playing" && (
                  <View style={styles.arrowBtns}>
                    <Pressable
                      onPress={() => handleMoveUp(idx)}
                      disabled={idx === 0}
                      style={[styles.arrowBtn, { opacity: idx === 0 ? 0.3 : 1 }]}
                    >
                      <Text style={[styles.arrowText, { color: colors.primary }]}>↑</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => handleMoveDown(idx)}
                      disabled={idx === items.length - 1}
                      style={[styles.arrowBtn, { opacity: idx === items.length - 1 ? 0.3 : 1 }]}
                    >
                      <Text style={[styles.arrowText, { color: colors.primary }]}>↓</Text>
                    </Pressable>
                  </View>
                )}
                {phase === "answered" && (
                  <Text style={{ fontSize: 18 }}>{isCorrectPos ? "✅" : "❌"}</Text>
                )}
              </View>
            );
          })}
        </View>

        {/* Correct order on wrong */}
        {phase === "answered" && !isCorrect && (
          <View style={[styles.correctOrderCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.correctOrderTitle, { color: colors.primary }]}>📖 Ordem correta:</Text>
            {currentSet.events.map((event, i) => (
              <Text key={i} style={[styles.correctOrderItem, { color: colors.foreground }]}>
                {i + 1}. {event}
              </Text>
            ))}
          </View>
        )}

        {/* Result banner */}
        {phase === "answered" && (
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
              {isCorrect ? "✅ Correto! +30 pontos" : "❌ Ordem incorreta!"}
            </Text>
          </View>
        )}

        {/* Buttons */}
        {phase === "playing" && (
          <Pressable
            onPress={handleCheck}
            style={({ pressed }) => [
              styles.checkBtn,
              { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 },
            ]}
          >
            <Text style={styles.checkBtnText}>Verificar Ordem</Text>
          </Pressable>
        )}

        {phase === "answered" && (
          <Pressable
            onPress={handleNext}
            style={({ pressed }) => [
              styles.checkBtn,
              { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 },
            ]}
          >
            <Text style={styles.checkBtnText}>
              {setIdx >= CHRONOLOGICAL_SETS.length - 1 ? "Ver Resultado" : "Próximo Conjunto →"}
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
  headerTitle: { fontSize: 15, fontWeight: "700" },
  scorePill: { borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4 },
  scoreText: { fontSize: 13, fontWeight: "700" },
  instructions: { fontSize: 13, textAlign: "center" },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1.5,
    gap: 10,
  },
  itemNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  itemNumberText: { fontSize: 14, fontWeight: "700" },
  itemText: { flex: 1, fontSize: 14, lineHeight: 20 },
  arrowBtns: { flexDirection: "column", gap: 2 },
  arrowBtn: { padding: 4 },
  arrowText: { fontSize: 18, fontWeight: "700" },
  correctOrderCard: {
    borderRadius: 12,
    padding: 14,
    borderWidth: 1.5,
    gap: 6,
  },
  correctOrderTitle: { fontSize: 14, fontWeight: "700" },
  correctOrderItem: { fontSize: 13, lineHeight: 20 },
  resultBanner: {
    borderRadius: 12,
    padding: 14,
    borderWidth: 1.5,
  },
  resultBannerText: { fontSize: 15, fontWeight: "700" },
  checkBtn: { borderRadius: 12, padding: 16, alignItems: "center" },
  checkBtnText: { fontSize: 16, fontWeight: "700", color: "#F5E6C8" },
  selectTitle: { fontSize: 18, fontWeight: "700" },
  setCard: {
    borderRadius: 14,
    padding: 16,
    borderWidth: 1.5,
    gap: 4,
  },
  setTitle: { fontSize: 16, fontWeight: "700" },
  setCount: { fontSize: 13 },
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
