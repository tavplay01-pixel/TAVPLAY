import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Pressable,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useGame } from "@/lib/game-context";
import { useAuthContext } from "@/lib/auth-context";
import { useRouter } from "expo-router";

const GAME_LABELS: Record<string, string> = {
  quiz: "Quiz Bíblico",
  "verdadeiro-falso": "Verdadeiro ou Falso",
  "quem-sou-eu": "Quem Sou Eu?",
  forca: "Forca Bíblica",
  memoria: "Memória Bíblica",
  "caca-palavras": "Caça-Palavras",
  "palavras-cruzadas": "Palavras Cruzadas",
  "ordem-cronologica": "Ordem Cronológica",
};

const ACHIEVEMENTS = [
  { id: "first_game", title: "Primeira Partida", description: "Jogue seu primeiro jogo", icon: "🎮", xpReq: 0 },
  { id: "quiz_master", title: "Mestre do Quiz", description: "Acerte 10 perguntas seguidas", icon: "📖", xpReq: 100 },
  { id: "bible_scholar", title: "Estudioso da Bíblia", description: "Jogue todos os 8 jogos", icon: "🎓", xpReq: 200 },
  { id: "streak_7", title: "7 Dias de Fé", description: "Jogue 7 dias seguidos", icon: "🔥", xpReq: 300 },
  { id: "level_5", title: "Discípulo Fiel", description: "Alcance o nível 5", icon: "⭐", xpReq: 400 },
  { id: "level_10", title: "Sábio das Escrituras", description: "Alcance o nível 10", icon: "👑", xpReq: 900 },
  { id: "perfect_quiz", title: "Perfeição Divina", description: "Acerte 100% no Quiz", icon: "✨", xpReq: 500 },
  { id: "hangman_100", title: "Palavras Sagradas", description: "Complete a Forca 10 vezes", icon: "✏️", xpReq: 350 },
];

export default function ProfileScreen() {
  const colors = useColors();
  const router = useRouter();
  const { player, setName, levelProgress } = useGame();
  const { user, logout, isAuthenticated } = useAuthContext();
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(player.name);

  const xpNeeded = player.level * 100;
  const totalGamesPlayed = Object.values(player.gameStats).reduce(
    (sum, s) => sum + s.gamesPlayed,
    0
  );
  const totalGamesWon = Object.values(player.gameStats).reduce(
    (sum, s) => sum + s.gamesWon,
    0
  );

  const handleSaveName = () => {
    if (nameInput.trim()) {
      setName(nameInput.trim());
      setEditingName(false);
    }
  };

  const handleLogout = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    Alert.alert("Sair", "Deseja sair da sua conta?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/auth/login");
        },
      },
    ]);
  };

  return (
    <ScreenContainer style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTav, { color: colors.primary }]}>ת</Text>
        <View>
          <Text style={[styles.headerTitle, { color: colors.foreground }]}>Meu Perfil</Text>
          <Text style={[styles.headerSub, { color: colors.muted }]}>Sua jornada bíblica</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        {/* Avatar + Name */}
        <View style={[styles.avatarSection, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={[styles.avatarCircle, { backgroundColor: colors.primary }]}>
            <Text style={styles.avatarText}>{player.name[0]?.toUpperCase() ?? "P"}</Text>
          </View>
          {editingName ? (
            <View style={styles.nameEditRow}>
              <TextInput
                value={nameInput}
                onChangeText={setNameInput}
                style={[styles.nameInput, { color: colors.foreground, borderColor: colors.border, backgroundColor: colors.background }]}
                autoFocus
                returnKeyType="done"
                onSubmitEditing={handleSaveName}
                maxLength={24}
              />
              <Pressable
                onPress={handleSaveName}
                style={[styles.saveBtn, { backgroundColor: colors.primary }]}
              >
                <Text style={styles.saveBtnText}>✓</Text>
              </Pressable>
            </View>
          ) : (
            <Pressable onPress={() => setEditingName(true)} style={styles.nameRow}>
              <Text style={[styles.playerName, { color: colors.foreground }]}>{player.name}</Text>
              <Text style={[styles.editHint, { color: colors.muted }]}>✎ editar</Text>
            </Pressable>
          )}
          <Text style={[styles.levelText, { color: colors.primary }]}>
            Nível {player.level} — {player.totalScore} pts totais
          </Text>
          {/* XP Bar */}
          <View style={styles.xpSection}>
            <View style={[styles.xpBarBg, { backgroundColor: colors.border }]}>
              <View
                style={[
                  styles.xpBarFill,
                  { backgroundColor: colors.primary, width: `${Math.round(levelProgress * 100)}%` as any },
                ]}
              />
            </View>
            <Text style={[styles.xpLabel, { color: colors.muted }]}>
              {player.xp}/{xpNeeded} XP para Nível {player.level + 1}
            </Text>
          </View>

          {/* Auth Button */}
          <Pressable
                onPress={handleLogout}
            style={({ pressed }) => [
              styles.authBtn,
              { backgroundColor: user ? colors.error + "22" : colors.primary, opacity: pressed ? 0.8 : 1 },
            ]}
          >
            <Text style={[styles.authBtnText, { color: user ? colors.error : "#F5E6C8" }]}>
              {isAuthenticated ? "Sair da conta" : "Entrar"}
            </Text>
          </Pressable>
        </View>

        {/* Stats */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>📊 Estatísticas</Text>
        </View>
        <View style={[styles.statsGrid, { gap: 10 }]}>
          {[
            { label: "Partidas", value: totalGamesPlayed, icon: "🎮" },
            { label: "Vitórias", value: totalGamesWon, icon: "🏆" },
            { label: "Pontuação", value: player.totalScore, icon: "⭐" },
            { label: "Conquistas", value: player.achievements.length, icon: "🎖️" },
          ].map((stat) => (
            <View
              key={stat.label}
              style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
            >
              <Text style={styles.statIcon}>{stat.icon}</Text>
              <Text style={[styles.statValue, { color: colors.primary }]}>{stat.value}</Text>
              <Text style={[styles.statLabel, { color: colors.muted }]}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Per-game stats */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>🎯 Por Jogo</Text>
        </View>
        <View style={{ paddingHorizontal: 16, gap: 8 }}>
          {Object.entries(player.gameStats)
            .filter(([, s]) => s.gamesPlayed > 0)
            .map(([gameId, stats]) => (
              <View
                key={gameId}
                style={[styles.gameStatRow, { backgroundColor: colors.surface, borderColor: colors.border }]}
              >
                <Text style={[styles.gameStatName, { color: colors.foreground }]}>
                  {GAME_LABELS[gameId] ?? gameId}
                </Text>
                <View style={styles.gameStatNums}>
                  <Text style={[styles.gameStatNum, { color: colors.primary }]}>
                    {stats.bestScore} pts
                  </Text>
                  <Text style={[styles.gameStatSub, { color: colors.muted }]}>
                    {stats.gamesPlayed}x jogado
                  </Text>
                </View>
              </View>
            ))}
          {totalGamesPlayed === 0 && (
            <Text style={[styles.emptyText, { color: colors.muted }]}>
              Nenhuma partida jogada ainda. Comece a jogar!
            </Text>
          )}
        </View>

        {/* Achievements */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>🎖️ Conquistas</Text>
        </View>
        <View style={{ paddingHorizontal: 16, gap: 8 }}>
          {ACHIEVEMENTS.map((ach) => {
            const unlocked = player.achievements.some((a) => a.id === ach.id);
            return (
              <View
                key={ach.id}
                style={[
                  styles.achievementRow,
                  {
                    backgroundColor: unlocked ? colors.primary + "18" : colors.surface,
                    borderColor: unlocked ? colors.primary : colors.border,
                    opacity: unlocked ? 1 : 0.55,
                  },
                ]}
              >
                <Text style={[styles.achIcon, { opacity: unlocked ? 1 : 0.4 }]}>{ach.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.achTitle, { color: colors.foreground }]}>{ach.title}</Text>
                  <Text style={[styles.achDesc, { color: colors.muted }]}>{ach.description}</Text>
                </View>
                {unlocked && (
                  <Text style={[styles.achUnlocked, { color: colors.primary }]}>✓</Text>
                )}
              </View>
            );
          })}
        </View>

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
  avatarSection: {
    margin: 16,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    gap: 10,
    borderWidth: 1.5,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontSize: 36, fontWeight: "700", color: "#F5E6C8" },
  nameRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  playerName: { fontSize: 22, fontWeight: "700" },
  editHint: { fontSize: 12 },
  nameEditRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  nameInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 16,
    minWidth: 160,
  },
  saveBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  saveBtnText: { fontSize: 18, color: "#F5E6C8", fontWeight: "700" },
  levelText: { fontSize: 15, fontWeight: "600" },
  xpSection: { width: "100%", gap: 4 },
  xpBarBg: { height: 10, borderRadius: 5, overflow: "hidden" },
  xpBarFill: { height: "100%", borderRadius: 5 },
  xpLabel: { fontSize: 11, textAlign: "center" },
  authBtn: {
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 10,
    marginTop: 4,
  },
  authBtnText: { fontSize: 14, fontWeight: "700" },
  sectionHeader: { paddingHorizontal: 20, paddingVertical: 12 },
  sectionTitle: { fontSize: 17, fontWeight: "700" },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
  },
  statCard: {
    width: "47%",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    borderWidth: 1.5,
    margin: "1.5%",
    gap: 4,
  },
  statIcon: { fontSize: 24 },
  statValue: { fontSize: 24, fontWeight: "700" },
  statLabel: { fontSize: 12 },
  gameStatRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
  },
  gameStatName: { fontSize: 14, fontWeight: "600" },
  gameStatNums: { alignItems: "flex-end" },
  gameStatNum: { fontSize: 14, fontWeight: "700" },
  gameStatSub: { fontSize: 11 },
  emptyText: { fontSize: 13, textAlign: "center", padding: 16 },
  achievementRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1.5,
    gap: 12,
  },
  achIcon: { fontSize: 28 },
  achTitle: { fontSize: 14, fontWeight: "700" },
  achDesc: { fontSize: 12, marginTop: 2 },
  achUnlocked: { fontSize: 20, fontWeight: "700" },
  footer: { paddingVertical: 24, alignItems: "center", gap: 4 },
  footerText: { fontSize: 12 },
  footerCredit: { fontSize: 11 },
});
