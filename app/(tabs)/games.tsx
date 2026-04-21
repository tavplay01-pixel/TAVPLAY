import React from "react";
import {
  ScrollView,
  Text,
  View,
  Pressable,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from "react-native";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useGame } from "@/lib/game-context";
import type { GameId } from "@/lib/game-context";

const GAME_ICONS: Record<string, ImageSourcePropType> = {
  quiz: require("@/assets/images/icon-quiz-pergaminho.png"),
  "verdadeiro-falso": require("@/assets/images/icon-verdadeiro-falso-pergaminho.png"),
  "quem-sou-eu": require("@/assets/images/icon-quem-sou-eu-pergaminho.png"),
  forca: require("@/assets/images/icon-forca-pergaminho.png"),
  memoria: require("@/assets/images/icon-memoria-pergaminho.png"),
  "caca-palavras": require("@/assets/images/icon-caca-palavras-pergaminho.png"),
  "palavras-cruzadas": require("@/assets/images/icon-palavras-cruzadas-pergaminho.png"),
  "ordem-cronologica": require("@/assets/images/icon-ordem-cronologica-pergaminho.png"),
};

const GAMES = [
  {
    id: "quiz" as GameId,
    title: "Quiz Bíblico",
    description: "Responda perguntas sobre a Bíblia com timer e pontuação. Mais de 80 questões sobre Antigo e Novo Testamento.",
    difficulty: "Médio",
    players: "1 jogador",
    color: "#8B6914",
    route: "/games/quiz",
  },
  {
    id: "verdadeiro-falso" as GameId,
    title: "Verdadeiro ou Falso",
    description: "Teste seus conhecimentos com afirmações bíblicas. Cada resposta vem com explicação detalhada.",
    difficulty: "Fácil",
    players: "1 jogador",
    color: "#5C3D1E",
    route: "/games/verdadeiro-falso",
  },
  {
    id: "quem-sou-eu" as GameId,
    title: "Quem Sou Eu?",
    description: "Descubra o personagem bíblico através de dicas progressivas. Quanto menos dicas usar, mais pontos!",
    difficulty: "Difícil",
    players: "1 jogador",
    color: "#4A7C3F",
    route: "/games/quem-sou-eu",
  },
  {
    id: "forca" as GameId,
    title: "Forca Bíblica",
    description: "Adivinhe palavras bíblicas letra por letra. 100 palavras de personagens, lugares e conceitos sagrados.",
    difficulty: "Médio",
    players: "1 jogador",
    color: "#8B2020",
    route: "/games/forca",
  },
  {
    id: "memoria" as GameId,
    title: "Memória Bíblica",
    description: "Encontre os pares de personagens bíblicos. Treine sua memória com cartas ilustradas.",
    difficulty: "Fácil",
    players: "1 jogador",
    color: "#1A5276",
    route: "/games/memoria",
  },
  {
    id: "caca-palavras" as GameId,
    title: "Caça-Palavras",
    description: "Encontre palavras bíblicas escondidas na grade. 6 temas diferentes com timer de 5 minutos.",
    difficulty: "Médio",
    players: "1 jogador",
    color: "#6B4C2A",
    route: "/games/caca-palavras",
  },
  {
    id: "palavras-cruzadas" as GameId,
    title: "Palavras Cruzadas",
    description: "Complete o crucigrama com dicas baseadas em versículos bíblicos.",
    difficulty: "Difícil",
    players: "1 jogador",
    color: "#5B2C6F",
    route: "/games/palavras-cruzadas",
  },
  {
    id: "ordem-cronologica" as GameId,
    title: "Ordem Cronológica",
    description: "Organize eventos bíblicos na ordem correta. 4 conjuntos de eventos históricos.",
    difficulty: "Difícil",
    players: "1 jogador",
    color: "#1A5276",
    route: "/games/ordem-cronologica",
  },
];

const DIFFICULTY_COLORS: Record<string, string> = {
  "Fácil": "#4A7C3F",
  "Médio": "#C17F24",
  "Difícil": "#8B2020",
};

export default function GamesScreen() {
  const colors = useColors();
  const router = useRouter();
  const { getGameStats } = useGame();

  const handlePress = (route: string) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    router.push(route as any);
  };

  return (
    <ScreenContainer style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTav, { color: colors.primary }]}>ת</Text>
        <View>
          <Text style={[styles.headerTitle, { color: colors.foreground }]}>Jogos Bíblicos</Text>
          <Text style={[styles.headerSub, { color: colors.muted }]}>Escolha seu desafio sagrado</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }} showsVerticalScrollIndicator={false}>
        {GAMES.map((game) => {
          const stats = getGameStats(game.id);
          return (
            <Pressable
              key={game.id}
              onPress={() => handlePress(game.route)}
              style={({ pressed }) => [
                styles.card,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  opacity: pressed ? 0.88 : 1,
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                },
              ]}
            >
              <View style={styles.cardTop}>
                <View style={[styles.iconCircle, { backgroundColor: game.color + "22" }]}>
                  <Image
                    source={GAME_ICONS[game.id]}
                    style={styles.iconImage}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.cardInfo}>
                  <Text style={[styles.cardTitle, { color: colors.foreground }]}>{game.title}</Text>
                  <View style={styles.badgeRow}>
                    <View style={[styles.diffBadge, { backgroundColor: DIFFICULTY_COLORS[game.difficulty] + "33" }]}>
                      <Text style={[styles.diffText, { color: DIFFICULTY_COLORS[game.difficulty] }]}>
                        {game.difficulty}
                      </Text>
                    </View>
                    {stats.gamesPlayed > 0 && (
                      <View style={[styles.statsBadge, { backgroundColor: colors.primary + "22" }]}>
                        <Text style={[styles.statsText, { color: colors.primary }]}>
                          {stats.gamesPlayed}x jogado
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
                <View style={[styles.playBtn, { backgroundColor: colors.primary }]}>
                  <Text style={{ fontSize: 18, color: "#F5E6C8" }}>▶</Text>
                </View>
              </View>
              <Text style={[styles.cardDesc, { color: colors.muted }]}>{game.description}</Text>
              {stats.bestScore > 0 && (
                <View style={[styles.bestScore, { borderTopColor: colors.border }]}>
                  <Text style={[styles.bestScoreText, { color: colors.muted }]}>
                    🏆 Melhor pontuação: <Text style={{ color: colors.primary, fontWeight: "700" }}>{stats.bestScore} pts</Text>
                  </Text>
                </View>
              )}
            </Pressable>
          );
        })}

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.muted }]}>
            Desenvolvido por Dorismar R Lima
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1.5,
  },
  headerTav: { fontSize: 36, fontWeight: "700" },
  headerTitle: { fontSize: 20, fontWeight: "700" },
  headerSub: { fontSize: 12, marginTop: 1 },
  card: {
    borderRadius: 14,
    padding: 14,
    borderWidth: 1.5,
    gap: 8,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  iconImage: {
    width: 48,
    height: 48,
  },
  cardInfo: { flex: 1, gap: 4 },
  cardTitle: { fontSize: 15, fontWeight: "700" },
  badgeRow: { flexDirection: "row", gap: 6 },
  diffBadge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  diffText: { fontSize: 11, fontWeight: "600" },
  statsBadge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  statsText: { fontSize: 11, fontWeight: "600" },
  playBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  cardDesc: { fontSize: 13, lineHeight: 18 },
  bestScore: {
    borderTopWidth: 1,
    paddingTop: 8,
  },
  bestScoreText: { fontSize: 12 },
  footer: { paddingVertical: 16, alignItems: "center" },
  footerText: { fontSize: 11 },
});
