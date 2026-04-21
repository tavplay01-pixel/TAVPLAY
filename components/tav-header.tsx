import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useColors } from "@/hooks/use-colors";

interface TAVHeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  rightElement?: React.ReactNode;
}

export function TAVHeader({
  title,
  subtitle,
  showBack = false,
  rightElement,
}: TAVHeaderProps) {
  const colors = useColors();
  const router = useRouter();

  return (
    <View style={[styles.container, { borderBottomColor: colors.border }]}>
      <View style={styles.left}>
        {showBack && (
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [styles.backBtn, { opacity: pressed ? 0.6 : 1 }]}
          >
            <Text style={[styles.backIcon, { color: colors.primary }]}>‹</Text>
          </Pressable>
        )}
      </View>

      <View style={styles.center}>
        {title ? (
          <>
            <Text style={[styles.title, { color: colors.foreground }]}>{title}</Text>
            {subtitle && (
              <Text style={[styles.subtitle, { color: colors.muted }]}>{subtitle}</Text>
            )}
          </>
        ) : (
          <View style={styles.brandRow}>
            <Text style={[styles.brandTav, { color: colors.primary }]}>ת</Text>
            <View style={styles.brandTextCol}>
              <Text style={[styles.brandName, { color: colors.foreground }]}>TAV Play</Text>
              <Text style={[styles.brandTagline, { color: colors.muted }]}>
                O Selo do Conhecimento Bíblico
              </Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.right}>{rightElement}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  left: { width: 44, alignItems: "flex-start" },
  center: { flex: 1, alignItems: "center" },
  right: { width: 44, alignItems: "flex-end" },
  backBtn: { padding: 4 },
  backIcon: { fontSize: 32, fontWeight: "300", lineHeight: 36 },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  brandTav: { fontSize: 32, fontWeight: "700", lineHeight: 36 },
  brandTextCol: { alignItems: "flex-start" },
  brandName: { fontSize: 18, fontWeight: "700", letterSpacing: 1 },
  brandTagline: { fontSize: 10, letterSpacing: 0.3 },
  title: { fontSize: 18, fontWeight: "700", letterSpacing: 0.5 },
  subtitle: { fontSize: 12, marginTop: 2 },
});
