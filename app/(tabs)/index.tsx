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
import { getDailyVerse } from "@/lib/verses";

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
  { id: "quiz", title: "Quiz Bíblico", description: "80+ perguntas com timer", color: "#8B6914", route: "/games/quiz" },
  { id: "verdadeiro-falso", title: "Verdadeiro ou Falso", description: "Teste seus conhecimentos", color: "#5C3D1E", route: "/games/verdadeiro-falso" },
  { id: "quem-sou-eu", title: "Quem Sou Eu?", description: "Adivinhe o personagem", color: "#4A7C3F", route: "/games/quem-sou-eu" },
  { id: "forca", title: "Forca Bíblica", description: "100 palavras sagradas", color: "#8B2020", route: "/games/forca" },
  { id: "memoria", title: "Memória Bíblica", description: "Pares de personagens", color: "#1A5276", route: "/games/memoria" },
  { id: "caca-palavras", title: "Caça-Palavras", description: "6 temas bíblicos", color: "#6B4C2A", route: "/games/caca-palavras" },
  { id: "palavras-cruzadas", title: "Palavras Cruzadas", description: "Dicas de versículos", color: "#5B2C6F", route: "/games/palavras-cruzadas" },
  { id: "ordem-cronologica", title: "Ordem Cronológica", description: "Organize os eventos", color: "#1A5276", route: "/games/ordem-cronologica" },
];

export default function HomeScreen() {
  const colors = useColors();
  const router = useRouter();
  const { player, levelProgress } = useGame();

  const handleGamePress = (route: string) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    router.push(route as any);
  };

  const xpNeeded = player.level * 100;
  const verse = getDailyVerse();

  return (
    <ScreenContainer containerClassName="" style={{ backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
          <View style={styles.brandRow}>
            <Text style={[styles.brandTav, { color: colors.primary }]}>ת</Text>
            <View>
              <Text style={[styles.brandName, { color: colors.foreground }]}>TAV Play</Text>
              <Text style={[styles.brandTagline, { color: colors.muted }]}>O Selo do Conhecimento Bíblico</Text>
            </View>
          </View>
        </View>

        {/* Saudação */}
        <View style={styles.greetingContainer}>
          <Text style={[styles.greetingText, { color: colors.foreground }]}>
            Shalom, {player.name}! ✨
          </Text>
          <Text style={[styles.greetingSub, { color: colors.muted }]}>
            Que a sabedoria divina guie seu caminho hoje.
          </Text>
        </View>

        {/* Player Card */}
        <View style={[styles.playerCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.playerRow}>
            <View style={[styles.avatarCircle, { backgroundColor: colors.primary }]}>
              <Text style={styles.avatarText}>{player.name[0]?.toUpperCase() ?? "P"}</Text>
            </View>
            <View style={styles.playerInfo}>
              <Text style={[styles.playerName, { color: colors.foreground }]}>{player.name}</Text>
              <Text style={[styles.playerLevel, { color: colors.muted }]}>
                Nível {player.level} · {player.totalScore} pts
              </Text>
            </View>
            <View style={[styles.scoreBadge, { backgroundColor: colors.primary }]}>
              <Text style={styles.scoreBadgeText}>{player.totalScore}</Text>
              <Text style={styles.scoreBadgeLabel}>pts</Text>
            </View>
          </View>
          {/* XP Bar */}
          <View style={styles.xpBarContainer}>
            <View style={[styles.xpBarBg, { backgroundColor: colors.border }]}>
              <View
                style={[
                  styles.xpBarFill,
                  { backgroundColor: colors.primary, width: `${Math.round(levelProgress * 100)}%` as any },
                ]}
              />
            </View>
            <Text style={[styles.xpText, { color: colors.muted }]}>
              {player.xp}/{xpNeeded} XP para Nível {player.level + 1}
            </Text>
          </View>
        </View>

        {/* Daily Verse Card */}
        <Pressable
          onPress={() => router.push("/(tabs)/daily-verse" as any)}
          style={({ pressed }) => [
            styles.dailyVerseCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.primary,
              opacity: pressed ? 0.9 : 1,
            },
          ]}
        >
          <View style={styles.dailyVerseHeader}>
            <Text style={{ fontSize: 18 }}>📖</Text>
            <Text style={[styles.dailyVerseLabel, { color: colors.primary }]}>Versículo do Dia</Text>
          </View>
          <Text style={[styles.dailyVerseText, { color: colors.foreground }]} numberOfLines={3}>
            "{verse.text}"
          </Text>
          <Text style={[styles.dailyVerseRef, { color: colors.muted }]}>
            {verse.reference}
          </Text>
        </Pressable>

        {/* Quick Stats */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={{ fontSize: 22 }}>🎮</Text>
            <Text style={[styles.statValue, { color: colors.foreground }]}>
              {Object.values(player.gameStats).reduce((sum, s) => sum + s.gamesPlayed, 0)}
            </Text>
            <Text style={[styles.statLabel, { color: colors.muted }]}>Partidas</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={{ fontSize: 22 }}>🏆</Text>
            <Text style={[styles.statValue, { color: colors.foreground }]}>
              {Object.values(player.gameStats).reduce((sum, s) => sum + s.gamesWon, 0)}
            </Text>
            <Text style={[styles.statLabel, { color: colors.muted }]}>Vitórias</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={{ fontSize: 22 }}>⭐</Text>
            <Text style={[styles.statValue, { color: colors.foreground }]}>
              {Math.max(...Object.values(player.gameStats).map(s => s.bestScore), 0)}
            </Text>
            <Text style={[styles.statLabel, { color: colors.muted }]}>Recorde</Text>
          </View>
        </View>

        {/* Section Title */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Acesso Rápido</Text>
          <Text style={[styles.sectionSubtitle, { color: colors.muted }]}>Escolha seu desafio</Text>
        </View>

        {/* Games Grid */}
        <View style={styles.gamesGrid}>
          {GAMES.map((game) => (
            <Pressable
              key={game.id}
              onPress={() => handleGamePress(game.route)}
              style={({ pressed }) => [
                styles.gameCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  opacity: pressed ? 0.85 : 1,
                  transform: [{ scale: pressed ? 0.97 : 1 }],
                },
              ]}
            >
              <View style={[styles.gameIconCircle, { backgroundColor: game.color + "22" }]}>
                <Image
                  source={GAME_ICONS[game.id]}
                  style={styles.gameIconImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={[styles.gameTitle, { color: colors.foreground }]} numberOfLines={2}>
                {game.title}
              </Text>
              <Text style={[styles.gameDesc, { color: colors.muted }]} numberOfLines={1}>
                {game.description}
              </Text>
              <View style={[styles.playBadge, { backgroundColor: colors.primary }]}>
                <Text style={styles.playBadgeText}>Jogar</Text>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.muted }]}>
            ת TAV Play — O Selo do Conhecimento Bíblico
          </Text>
          <Text style={[styles.footerCredit, { color: colors.muted }]}>
            Desenvolvido por Dorismar R Lima
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1.5,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  brandTav: {
    fontSize: 40,
    fontWeight: "700",
    lineHeight: 44,
  },
  brandName: {
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 1,
  },
  brandTagline: {
    fontSize: 11,
    letterSpacing: 0.3,
    marginTop: 1,
  },
  greetingContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 4,
  },
  greetingText: {
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  greetingSub: {
    fontSize: 13,
    marginTop: 4,
    lineHeight: 18,
  },
  playerCard: {
    margin: 16,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1.5,
  },
  playerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#F5E6C8",
  },
  playerInfo: { flex: 1 },
  playerName: { fontSize: 16, fontWeight: "700" },
  playerLevel: { fontSize: 12, marginTop: 2 },
  scoreBadge: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: "center",
  },
  scoreBadgeText: { fontSize: 18, fontWeight: "700", color: "#F5E6C8" },
  scoreBadgeLabel: { fontSize: 10, color: "#F5E6C8CC" },
  xpBarContainer: { gap: 4 },
  xpBarBg: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  xpBarFill: {
    height: "100%",
    borderRadius: 4,
  },
  xpText: { fontSize: 11, textAlign: "right" },
  dailyVerseCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 14,
    padding: 16,
    borderWidth: 2,
  },
  dailyVerseHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 10,
  },
  dailyVerseLabel: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  dailyVerseText: {
    fontSize: 15,
    fontStyle: "italic",
    lineHeight: 22,
    marginBottom: 12,
  },
  dailyVerseRef: {
    fontSize: 12,
    fontWeight: "600",
  },
  statsRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 8,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1.5,
    alignItems: "center",
    gap: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
  },
  statLabel: {
    fontSize: 10,
    fontWeight: "600",
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
  sectionTitle: { fontSize: 20, fontWeight: "700" },
  sectionSubtitle: { fontSize: 13, marginTop: 2 },
  gamesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    gap: 10,
  },
  gameCard: {
    width: "47%",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1.5,
    alignItems: "center",
    gap: 6,
  },
  gameIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  gameIconImage: {
    width: 48,
    height: 48,
  },
  gameTitle: {
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 18,
  },
  gameDesc: {
    fontSize: 11,
    textAlign: "center",
  },
  playBadge: {
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 5,
    marginTop: 2,
  },
  playBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#F5E6C8",
    letterSpacing: 0.5,
  },
  footer: {
    marginTop: 24,
    paddingHorizontal: 20,
    alignItems: "center",
    gap: 4,
  },
  footerText: { fontSize: 12, textAlign: "center" },
  footerCredit: { fontSize: 11, textAlign: "center" },
});
