import { ScrollView, Text, View, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useGame } from "@/lib/game-context";
import { UNLOCKABLES } from "@/lib/rewards-system";

export default function ShopScreen() {
  const colors = useColors();
  const router = useRouter();
  const { player } = useGame();

  const handleBuyItem = (itemId: string, cost: number) => {
    if (player.coins >= cost) {
      // TODO: Implementar lógica de compra
      alert(`Item desbloqueado! Moedas restantes: ${player.coins - cost}`);
    } else {
      alert(`Moedas insuficientes! Você precisa de ${cost - player.coins} moedas a mais.`);
    }
  };

  return (
    <ScreenContainer style={{ backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Text style={[styles.backText, { color: colors.primary }]}>‹ Voltar</Text>
          </Pressable>
          <Text style={[styles.headerTitle, { color: colors.foreground }]}>Loja</Text>
          <View style={{ width: 70 }} />
        </View>

        {/* Coins Display */}
        <View style={[styles.coinsCard, { backgroundColor: colors.surface, borderColor: colors.primary }]}>
          <Text style={[styles.coinsLabel, { color: colors.muted }]}>Suas Moedas</Text>
          <Text style={[styles.coinsAmount, { color: colors.primary }]}>{player.coins}</Text>
        </View>

        {/* Shop Items */}
        <View style={styles.itemsContainer}>
          {UNLOCKABLES.map((item) => (
            <View key={item.id} style={[styles.itemCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemIcon}>{item.icon}</Text>
                <View style={styles.itemInfo}>
                  <Text style={[styles.itemName, { color: colors.foreground }]}>{item.name}</Text>
                  <Text style={[styles.itemDesc, { color: colors.muted }]} numberOfLines={1}>
                    {item.description}
                  </Text>
                </View>
              </View>
              <View style={styles.itemFooter}>
                <View style={[styles.costBadge, { backgroundColor: colors.primary }]}>
                  <Text style={styles.costText}>{item.cost}</Text>
                </View>
                <Pressable
                  onPress={() => handleBuyItem(item.id, item.cost)}
                  style={({ pressed }) => [
                    styles.buyBtn,
                    {
                      backgroundColor: player.coins >= item.cost ? colors.primary : colors.border,
                      opacity: pressed ? 0.8 : 1,
                    },
                  ]}
                >
                  <Text style={styles.buyBtnText}>{item.unlocked ? "Desbloqueado" : "Comprar"}</Text>
                </Pressable>
              </View>
            </View>
          ))}
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
  coinsCard: {
    margin: 16,
    borderRadius: 14,
    padding: 16,
    borderWidth: 2,
    alignItems: "center",
    gap: 8,
  },
  coinsLabel: {
    fontSize: 13,
    fontWeight: "600",
  },
  coinsAmount: {
    fontSize: 32,
    fontWeight: "700",
  },
  itemsContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  itemCard: {
    borderRadius: 12,
    padding: 14,
    borderWidth: 1.5,
    gap: 12,
  },
  itemHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  itemIcon: {
    fontSize: 32,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "700",
  },
  itemDesc: {
    fontSize: 12,
    marginTop: 2,
  },
  itemFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  costBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: "center",
  },
  costText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#F5E6C8",
  },
  buyBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  buyBtnText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#F5E6C8",
  },
});
