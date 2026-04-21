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

export default function MemoryGame() {
  const router = useRouter();
  const colors = useColors();
  const { addPoints } = useGame();
  const { playSound } = useAudioContext();

  const [level, setLevel] = useState(1);
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [steps, setSteps] = useState(0);
  const [won, setWon] = useState(false);

  // Função que cria as cartas baseada no nível
  const buildCards = useCallback((currentLevel: number) => {
    // Sorteia personagens da lista original para não ser sempre igual
    const shuffledPairs = [...MEMORY_PAIRS].sort(() => Math.random() - 0.5);
    
    // Define quantos pares teremos (começa com 4 e aumenta a cada 2 níveis)
    const pairsCount = Math.min(4 + Math.floor(currentLevel / 2), 12);
    const selectedPairs = shuffledPairs.slice(0, pairsCount);

    const newCards: Card[] = [];
    selectedPairs.forEach((p) => {
      newCards.push({ uid: p.id + "_a", id: p.id, name: p.name, emoji: p.emoji });
      newCards.push({ uid: p.id + "_b", id: p.id, name: p.name, emoji: p.emoji });
    });

    return newCards.sort(() => Math.random() - 0.5);
  }, []);

  useEffect(() => {
    setCards(buildCards(level));
  }, [level, buildCards]);

  const handleCardPress = (index: number) => {
    if (flippedCards.length === 2 || flippedCards.includes(index) || matchedPairs.includes(cards[index].id) || won) return;

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setSteps(s => s + 1);
      const [first, second] = newFlipped;

      if (cards[first].id === cards[second].id) {
        setMatchedPairs([...matchedPairs, cards[first].id]);
        setFlippedCards([]);
        playSound('correct');
        
        if (matchedPairs.length + 1 === cards.length / 2) {
          setWon(true);
          addPoints(50 * level);
          playSound('victory');
        }
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  const nextLevel = () => {
    setLevel(prev => prev + 1);
    setMatchedPairs([]);
    setFlippedCards([]);
    setSteps(0);
    setWon(false);
  };

  const resetGame = () => {
    setLevel(1);
    setMatchedPairs([]);
    setFlippedCards([]);
    setSteps(0);
    setWon(false);
  };

  return (
    <ScreenContainer title={`Memória - Nível ${level}`} withBack>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.infoText, { color: colors.foreground }]}>Passos: {steps}</Text>
          <Text style={[styles.infoText, { color: colors.foreground }]}>Pares: {matchedPairs.length}/{cards.length / 2}</Text>
        </View>

        <View style={styles.grid}>
          {cards.map((card, index) => {
            const isFlipped = flippedCards.includes(index) || matchedPairs.includes(card.id);
            return (
              <Pressable
                key={card.uid}
                style={[
                  styles.card,
                  { backgroundColor: isFlipped ? colors.surface : colors.primary },
                  isFlipped && styles.cardFlipped
                ]}
                onPress={() => handleCardPress(index)}
              >
                {isFlipped ? (
                  <Text style={styles.cardEmoji}>{card.emoji}</Text>
                ) : (
                  <Text style={styles.cardBack}>?</Text>
                )}
              </Pressable>
            );
          })}
        </View>

        {won && (
          <View style={[styles.winContainer, { backgroundColor: colors.surface }]}>
            <Text style={[styles.winTitle, { color: colors.primary }]}>Parabéns!</Text>
            <Text style={[styles.winSub, { color: colors.foreground }]}>Você completou o nível {level}!</Text>
            
            <View style={styles.buttonRow}>
              <Pressable style={[styles.button, { backgroundColor: colors.primary }]} onPress={nextLevel}>
                <Text style={styles.buttonText}>Próxima Fase</Text>
              </Pressable>
              
              <Pressable style={[styles.button, { backgroundColor: colors.border }]} onPress={resetGame}>
                <Text style={styles.buttonText}>Reiniciar Tudo</Text>
              </Pressable>
            </View>
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 20 },
  infoText: { fontSize: 18, fontWeight: 'bold' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 10 },
  card: { width: 80, height: 80, borderRadius: 10, justifyContent: 'center', alignItems: 'center', elevation: 3 },
  cardFlipped: { borderWidth: 2, borderColor: '#D4AF37' },
  cardEmoji: { fontSize: 40 },
  cardBack: { fontSize: 40, color: 'white', fontWeight: 'bold' },
  winContainer: { marginTop: 30, padding: 20, borderRadius: 20, alignItems: 'center', width: '100%' },
  winTitle: { fontSize: 32, fontWeight: 'bold', marginBottom: 10 },
  winSub: { fontSize: 18, marginBottom: 20 },
  buttonRow: { flexDirection: 'column', gap: 10, width: '100%' },
  button: { padding: 15, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});
