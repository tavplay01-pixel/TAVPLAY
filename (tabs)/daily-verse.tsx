import React from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { getDailyVerse } from "@/lib/verses";

export default function DailyVerseScreen() {
  const colors = useColors();
  const verse = getDailyVerse();

  return (
    <ScreenContainer style={{ backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Header */}
          <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
            <Text style={{ fontSize: 28 }}>📖</Text>
            <Text style={[styles.headerTitle, { color: colors.foreground }]}>Versículo do Dia</Text>
          </View>

          {/* Card do Versículo */}
          <View
            style={[
              styles.verseCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.primary,
              },
            ]}
          >
            {/* Decoração superior */}
            <View style={styles.decorRow}>
              <View style={[styles.decorLine, { backgroundColor: colors.primary }]} />
              <Text style={{ fontSize: 20 }}>✨</Text>
              <View style={[styles.decorLine, { backgroundColor: colors.primary }]} />
            </View>

            {/* Texto do Versículo - cores explícitas para garantir contraste */}
            <Text
              style={[
                styles.verseText,
                { color: colors.foreground },
              ]}
            >
              &ldquo;{verse.text}&rdquo;
            </Text>

            {/* Separador */}
            <View style={[styles.separator, { backgroundColor: colors.border }]} />

            {/* Referência */}
            <Text style={[styles.verseReference, { color: colors.primary }]}>
              {verse.reference}
            </Text>

            {/* Categoria */}
            <View style={[styles.categoryBadge, { backgroundColor: colors.primary + "22" }]}>
              <Text style={[styles.categoryText, { color: colors.primary }]}>
                {verse.category}
              </Text>
            </View>
          </View>

          {/* Mensagem de encorajamento */}
          <View style={styles.encouragement}>
            <Text style={[styles.encourageText, { color: colors.muted }]}>
              &ldquo;A palavra de Deus é viva e eficaz&rdquo;
            </Text>
            <Text style={[styles.encourageRef, { color: colors.muted }]}>
              Hebreus 4:12
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1.5,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  verseCard: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 24,
    borderWidth: 2,
    gap: 16,
    alignItems: "center",
  },
  decorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "100%",
  },
  decorLine: {
    flex: 1,
    height: 1,
  },
  verseText: {
    fontSize: 18,
    fontStyle: "italic",
    lineHeight: 28,
    textAlign: "center",
    fontWeight: "500",
  },
  separator: {
    width: "60%",
    height: 1,
  },
  verseReference: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  categoryBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "600",
  },
  encouragement: {
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  encourageText: {
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
  },
  encourageRef: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
});
