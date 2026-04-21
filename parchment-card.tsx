import React from "react";
import { View, StyleSheet, type ViewProps } from "react-native";
import { useColors } from "@/hooks/use-colors";

interface ParchmentCardProps extends ViewProps {
  elevated?: boolean;
  bordered?: boolean;
}

export function ParchmentCard({
  children,
  elevated = false,
  bordered = true,
  style,
  ...props
}: ParchmentCardProps) {
  const colors = useColors();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: elevated ? colors.surface2 : colors.surface,
          borderColor: colors.border,
          borderWidth: bordered ? 1.5 : 0,
          shadowColor: colors.accent,
        },
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
});
