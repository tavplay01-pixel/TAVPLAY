import { ScrollView, Text, View, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useGame } from "@/lib/game-context";
import { SEALS } from "@/lib/rewards-system";

export default function SealsScreen() {
  const colors = useColors();
  const router = useRouter();
  const { player } = useGame();

  const unlockedCount = player.seals.length;
  const totalCount = SEALS.length;
  const percentage = Math.round((unlockedCount / totalCount) * 100);

  return (
    <ScreenContainer style={{ backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Text style={[styles.backText, { color: colors.primary }]}>‹ Voltar</Text>
          </Pressable>
          <Text style={[styles.headerTitle, { color: colors.foreground }]}>Selos</Text>
          <View style={{ width: 70 }} />
        </View>

        {/* Progress */}
        <View style={[styles.progressCard, { backgroundColor: colors.surface, borderColor: colors.primary }]}>
          <View style={styles.progressRow}>
            <View>
              <Text style={[styles.progressLabel, { color: colors.muted }]}>Selos Desbloqueados</Text>
              <Text style={[styles.progressValue, { color: colors.primary }]}>
                {unlockedCount} / {totalCount}
              </Text>
            </View>
            <View style={[styles.percentBadge, { backgroundColor: colors.primary }]}>
              <Text style={styles.percentText}>{percentage}%</Text>
            </View>
          </View>
          <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
            <View
              style={[
                styles.progressFill,
                { backgroundColor: colors.primary, width: `${percentage}%` },
              ]}
            />
          </View>
        </View>

        {/* Seals Grid */}
        <View style={styles.sealsGrid}>
          {SEALS.map((seal) => {
            const isUnlocked = player.seals.includes(seal.id);
            return (
              <Pressable
                key={seal.id}
                style={[
                  styles.sealCard,
                  {
                    backgroundColor: isUnlocked ? colors.surface : colors.border,
                    borderColor: isUnlocked ? colors.primary : colors.border,
                    opacity: isUnlocked ? 1 : 0.5,
                  },
                ]}
              >
                <Text style={styles.sealIcon}>{seal.icon}</Text>
                <Text style={[styles.sealName, { color: colors.foreground }]} numberOfLines={2}>
                  {seal.name}
                </Text>
                <Text style={[styles.sealDesc, { color: colors.muted }]} numberOfLines={2}>
                  {seal.description}
                </Text>
                {!isUnlocked && (
                  <Text style={[styles.sealReq, { color: colors.muted }]} numberOfLines={1}>
                    {seal.requirement}
                  </Text>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  backText: {
    fontSize: 18,
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  progressCard: {
    margin: 16,
    borderRadius: 14,
    padding: 16,
    borderWidth: 2,
    gap: 12,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
  progressValue: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 4,
  },
  percentBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  percentText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#F5E6C8",
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  sealsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    gap: 10,
  },
  sealCard: {
    width: "31%",
    borderRadius: 12,
    padding: 12,
    borderWidth: 2,
    alignItems: "center",
    gap: 8,
  },
  sealIcon: {
    fontSize: 28,
  },
  sealName: {
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 16,
  },
  sealDesc: {
    fontSize: 10,
    textAlign: "center",
    lineHeight: 14,
  },
  sealReq: {
    fontSize: 9,
    textAlign: "center",
    fontStyle: "italic",
    lineHeight: 12,
  },
});
