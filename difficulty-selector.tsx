import { View, Text, Pressable, StyleSheet } from "react-native";
import { useColors } from "@/hooks/use-colors";
import { Difficulty, DIFFICULTY_CONFIGS } from "@/lib/difficulty-system";

interface DifficultySelectorProps {
  selected: Difficulty;
  onSelect: (difficulty: Difficulty) => void;
}

export function DifficultySelector({ selected, onSelect }: DifficultySelectorProps) {
  const colors = useColors();
  const difficulties: Difficulty[] = ["easy", "medium", "hard", "expert"];

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.foreground }]}>Escolha o Nível de Dificuldade</Text>
      <View style={styles.grid}>
        {difficulties.map((difficulty) => {
          const config = DIFFICULTY_CONFIGS[difficulty];
          const isSelected = selected === difficulty;
          return (
            <Pressable
              key={difficulty}
              onPress={() => onSelect(difficulty)}
              style={({ pressed }) => [
                styles.card,
                {
                  backgroundColor: isSelected ? colors.primary : colors.surface,
                  borderColor: isSelected ? colors.primary : colors.border,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <Text style={[styles.label, { color: isSelected ? "#F5E6C8" : colors.foreground }]}>
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </Text>
              <Text style={[styles.multiplier, { color: isSelected ? "#F5E6C8" : colors.muted }]}>
                x{config.scoreMultiplier}
              </Text>
              <Text style={[styles.desc, { color: isSelected ? "#F5E6C8" : colors.muted }]} numberOfLines={2}>
                {config.description}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  card: {
    width: "48%",
    borderRadius: 12,
    padding: 12,
    borderWidth: 2,
    alignItems: "center",
    gap: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
  },
  multiplier: {
    fontSize: 12,
    fontWeight: "600",
  },
  desc: {
    fontSize: 10,
    textAlign: "center",
    lineHeight: 13,
  },
});
