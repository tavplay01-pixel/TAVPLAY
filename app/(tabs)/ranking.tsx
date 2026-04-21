import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Pressable,
  StyleSheet,
  FlatList,
} from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useGame } from "@/lib/game-context";

// Mock leaderboard data
const MOCK_LEADERBOARD = [
  { rank: 1, name: "Irmão Elias", score: 4850, level: 12, badge: "🏆" },
  { rank: 2, name: "Irmã Débora", score: 4200, level: 10, badge: "🥈" },
  { rank: 3, name: "Pastor João", score: 3750, level: 9, badge: "🥉" },
  { rank: 4, name: "Missionária Ana", score: 3100, level: 8, badge: "⭐" },
  { rank: 5, name: "Diácono Pedro", score: 2800, level: 7, badge: "⭐" },
  { rank: 6, name: "Irmão Mateus", score: 2450, level: 6, badge: "⭐" },
  { rank: 7, name: "Irmã Rute", score: 2100, level: 5, badge: "⭐" },
  { rank: 8, name: "Pr. Samuel", score: 1900, level: 5, badge: "⭐" },
  { rank: 9, name: "Irmã Ester", score: 1650, level: 4, badge: "⭐" },
  { rank: 10, name: "Irmão Tiago", score: 1400, level: 4, badge: "⭐" },
];

const GAME_TABS = ["Geral", "Quiz", "Forca", "Memória"];

export default function RankingScreen() {
  const colors = useColors();
  const { player } = useGame();
  const [activeTab, setActiveTab] = useState(0);

  const myRank = 11; // mock
  const topThree = MOCK_LEADERBOARD.slice(0, 3);
  const rest = MOCK_LEADERBOARD.slice(3);

  return (
    <ScreenContainer style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTav, { color: colors.primary }]}>ת</Text>
        <View>
          <Text style={[styles.headerTitle, { color: colors.foreground }]}>Ranking</Text>
          <Text style={[styles.headerSub, { color: colors.muted }]}>Os melhores conhecedores da Bíblia</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={[styles.tabRow, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        {GAME_TABS.map((tab, i) => (
          <Pressable
            key={tab}
            onPress={() => setActiveTab(i)}
            style={[
              styles.tab,
              activeTab === i && { borderBottomColor: colors.primary, borderBottomWidth: 2.5 },
            ]}
          >
            <Text
              style={[
                styles.tabText,
                { color: activeTab === i ? colors.primary : colors.muted },
              ]}
            >
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        {/* Podium */}
        <View style={[styles.podiumSection, { backgroundColor: colors.surface }]}>
          <Text style={[styles.podiumTitle, { color: colors.foreground }]}>🏆 Pódio dos Sábios</Text>
          <View style={styles.podium}>
            {/* 2nd */}
            <View style={[styles.podiumItem, { marginTop: 20 }]}>
              <Text style={styles.podiumEmoji}>{topThree[1].badge}</Text>
              <View style={[styles.podiumBar, { backgroundColor: "#C0C0C0", height: 60 }]}>
                <Text style={styles.podiumRank}>2</Text>
              </View>
              <Text style={[styles.podiumName, { color: colors.foreground }]} numberOfLines={2}>
                {topThree[1].name}
              </Text>
              <Text style={[styles.podiumScore, { color: colors.primary }]}>{topThree[1].score}</Text>
            </View>
            {/* 1st */}
            <View style={styles.podiumItem}>
              <Text style={styles.podiumEmoji}>{topThree[0].badge}</Text>
              <View style={[styles.podiumBar, { backgroundColor: colors.primary, height: 90 }]}>
                <Text style={styles.podiumRank}>1</Text>
              </View>
              <Text style={[styles.podiumName, { color: colors.foreground }]} numberOfLines={2}>
                {topThree[0].name}
              </Text>
              <Text style={[styles.podiumScore, { color: colors.primary }]}>{topThree[0].score}</Text>
            </View>
            {/* 3rd */}
            <View style={[styles.podiumItem, { marginTop: 36 }]}>
              <Text style={styles.podiumEmoji}>{topThree[2].badge}</Text>
              <View style={[styles.podiumBar, { backgroundColor: "#CD7F32", height: 44 }]}>
                <Text style={styles.podiumRank}>3</Text>
              </View>
              <Text style={[styles.podiumName, { color: colors.foreground }]} numberOfLines={2}>
                {topThree[2].name}
              </Text>
              <Text style={[styles.podiumScore, { color: colors.primary }]}>{topThree[2].score}</Text>
            </View>
          </View>
        </View>

        {/* My Position */}
        <View style={[styles.myPosition, { backgroundColor: colors.primary + "22", borderColor: colors.primary }]}>
          <Text style={[styles.myPosLabel, { color: colors.muted }]}>Sua posição</Text>
          <View style={styles.myPosRow}>
            <Text style={[styles.myPosRank, { color: colors.primary }]}>#{myRank}</Text>
            <View style={styles.myPosInfo}>
              <Text style={[styles.myPosName, { color: colors.foreground }]}>{player.name}</Text>
              <Text style={[styles.myPosScore, { color: colors.muted }]}>
                {player.totalScore} pts · Nível {player.level}
              </Text>
            </View>
          </View>
        </View>

        {/* Rest of leaderboard */}
        <View style={{ paddingHorizontal: 16, gap: 8, marginTop: 8 }}>
          {rest.map((item) => (
            <View
              key={item.rank}
              style={[styles.rankRow, { backgroundColor: colors.surface, borderColor: colors.border }]}
            >
              <Text style={[styles.rankNum, { color: colors.muted }]}>#{item.rank}</Text>
              <View style={[styles.rankAvatar, { backgroundColor: colors.primary + "33" }]}>
                <Text style={[styles.rankAvatarText, { color: colors.primary }]}>
                  {item.name[0]}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.rankName, { color: colors.foreground }]}>{item.name}</Text>
                <Text style={[styles.rankLevel, { color: colors.muted }]}>Nível {item.level}</Text>
              </View>
              <Text style={[styles.rankScore, { color: colors.primary }]}>{item.score} pts</Text>
            </View>
          ))}
        </View>

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
  tabRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  tabText: { fontSize: 13, fontWeight: "600" },
  podiumSection: {
    margin: 16,
    borderRadius: 14,
    padding: 16,
  },
  podiumTitle: { fontSize: 16, fontWeight: "700", textAlign: "center", marginBottom: 16 },
  podium: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    gap: 12,
  },
  podiumItem: { alignItems: "center", width: 90 },
  podiumEmoji: { fontSize: 28, marginBottom: 4 },
  podiumBar: {
    width: 70,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  podiumRank: { fontSize: 22, fontWeight: "700", color: "#fff" },
  podiumName: { fontSize: 11, fontWeight: "600", textAlign: "center", marginTop: 6 },
  podiumScore: { fontSize: 13, fontWeight: "700", marginTop: 2 },
  myPosition: {
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1.5,
  },
  myPosLabel: { fontSize: 11, marginBottom: 6 },
  myPosRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  myPosRank: { fontSize: 28, fontWeight: "700", width: 56 },
  myPosInfo: { flex: 1 },
  myPosName: { fontSize: 15, fontWeight: "700" },
  myPosScore: { fontSize: 12, marginTop: 2 },
  rankRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    gap: 10,
  },
  rankNum: { fontSize: 13, fontWeight: "700", width: 28 },
  rankAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  rankAvatarText: { fontSize: 16, fontWeight: "700" },
  rankName: { fontSize: 14, fontWeight: "600" },
  rankLevel: { fontSize: 11, marginTop: 1 },
  rankScore: { fontSize: 14, fontWeight: "700" },
  footer: { paddingVertical: 20, alignItems: "center" },
  footerText: { fontSize: 11 },
});
