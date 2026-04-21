import { View, Text, StyleSheet } from "react-native";
import { useColors } from "@/hooks/use-colors";

interface ProgressionSystemProps {
  level: number;
  xp: number;
  xpNeeded: number;
  coins: number;
  sealsUnlocked: number;
  totalSeals: number;
}

export function ProgressionSystem({
  level,
  xp,
  xpNeeded,
  coins,
  sealsUnlocked,
  totalSeals,
}: ProgressionSystemProps) {
  const colors = useColors();
  const xpPercentage = Math.round((xp / xpNeeded) * 100);
  const sealsPercentage = Math.round((sealsUnlocked / totalSeals) * 100);

  // Desbloqueáveis por nível
  const unlockedByLevel = {
    1: ["Quiz Bíblico"],
    2: ["Verdadeiro ou Falso"],
    3: ["Quem Sou Eu?"],
    4: ["Forca Bíblica"],
    5: ["Memória Bíblica", "Tema Dourado"],
    6: ["Caça-Palavras"],
    7: ["Palavras Cruzadas"],
    8: ["Ordem Cronológica"],
    9: ["Avatar Erudito"],
    10: ["Avatar Sacerdote", "Borda Dourada", "Efeito Partículas"],
  };

  const currentLevelUnlocks = (unlockedByLevel as any)[level] || [];

  return (
    <View style={styles.container}>
      {/* Level Display */}
      <View style={[styles.levelCard, { backgroundColor: colors.surface, borderColor: colors.primary }]}>
        <View style={styles.levelRow}>
          <View>
            <Text style={[styles.levelLabel, { color: colors.muted }]}>Nível</Text>
            <Text style={[styles.levelNumber, { color: colors.primary }]}>{level}</Text>
          </View>
          <View style={[styles.levelBadge, { backgroundColor: colors.primary }]}>
            <Text style={styles.levelBadgeText}>Nível {level}</Text>
          </View>
        </View>

        {/* XP Bar */}
        <View style={styles.xpSection}>
          <View style={[styles.xpBar, { backgroundColor: colors.border }]}>
            <View
              style={[
                styles.xpFill,
                { backgroundColor: colors.primary, width: `${xpPercentage}%` },
              ]}
            />
          </View>
          <Text style={[styles.xpText, { color: colors.muted }]}>
            {xp} / {xpNeeded} XP
          </Text>
        </View>
      </View>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.statLabel, { color: colors.muted }]}>Moedas</Text>
          <Text style={[styles.statValue, { color: colors.primary }]}>{coins}</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.statLabel, { color: colors.muted }]}>Selos</Text>
          <Text style={[styles.statValue, { color: colors.primary }]}>
            {sealsUnlocked}/{totalSeals}
          </Text>
        </View>
      </View>

      {/* Unlocks at this Level */}
      {currentLevelUnlocks.length > 0 && (
        <View style={[styles.unlocksCard, { backgroundColor: colors.surface, borderColor: colors.primary }]}>
          <Text style={[styles.unlocksTitle, { color: colors.primary }]}>Desbloqueado no Nível {level}</Text>
          <View style={styles.unlocksList}>
            {currentLevelUnlocks.map((unlock: string, idx: number) => (
              <Text key={idx} style={[styles.unlockItem, { color: colors.foreground }]}>
                ✨ {unlock}
              </Text>
            ))}
          </View>
        </View>
      )}

      {/* Next Level Preview */}
      {level < 10 && (
        <View style={[styles.nextLevelCard, { backgroundColor: colors.border }]}>
          <Text style={[styles.nextLevelLabel, { color: colors.muted }]}>Próximo Nível</Text>
          <Text style={[styles.nextLevelNumber, { color: colors.foreground }]}>Nível {level + 1}</Text>
          <Text style={[styles.nextLevelXp, { color: colors.muted }]}>
            Faltam {xpNeeded - xp} XP
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  levelCard: {
    borderRadius: 14,
    padding: 16,
    borderWidth: 2,
    gap: 12,
  },
  levelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  levelLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
  levelNumber: {
    fontSize: 32,
    fontWeight: "700",
    marginTop: 4,
  },
  levelBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  levelBadgeText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#F5E6C8",
  },
  xpSection: {
    gap: 8,
  },
  xpBar: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  xpFill: {
    height: "100%",
    borderRadius: 4,
  },
  xpText: {
    fontSize: 12,
    textAlign: "right",
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1.5,
    alignItems: "center",
    gap: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
  },
  unlocksCard: {
    borderRadius: 12,
    padding: 12,
    borderWidth: 2,
    gap: 8,
  },
  unlocksTitle: {
    fontSize: 13,
    fontWeight: "700",
  },
  unlocksList: {
    gap: 4,
  },
  unlockItem: {
    fontSize: 12,
    fontWeight: "600",
  },
  nextLevelCard: {
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    gap: 4,
  },
  nextLevelLabel: {
    fontSize: 11,
    fontWeight: "600",
  },
  nextLevelNumber: {
    fontSize: 18,
    fontWeight: "700",
  },
  nextLevelXp: {
    fontSize: 12,
  },
});
