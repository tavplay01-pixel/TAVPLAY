import React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  type PressableProps,
} from "react-native";
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";
import { useColors } from "@/hooks/use-colors";

interface GoldButtonProps extends PressableProps {
  title: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export function GoldButton({
  title,
  variant = "primary",
  size = "md",
  loading = false,
  onPress,
  disabled,
  style,
  ...props
}: GoldButtonProps) {
  const colors = useColors();

  const handlePress = (e: any) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress?.(e);
  };

  const bgColor =
    variant === "primary"
      ? colors.primary
      : variant === "secondary"
      ? colors.surface2
      : "transparent";

  const textColor =
    variant === "primary"
      ? "#F5E6C8"
      : variant === "secondary"
      ? colors.primary
      : colors.primary;

  const borderColor =
    variant === "ghost" ? colors.border : "transparent";

  const paddingV = size === "sm" ? 8 : size === "lg" ? 16 : 12;
  const paddingH = size === "sm" ? 16 : size === "lg" ? 32 : 24;
  const fontSize = size === "sm" ? 13 : size === "lg" ? 18 : 15;

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: bgColor,
          borderColor,
          borderWidth: variant === "ghost" ? 1.5 : 0,
          paddingVertical: paddingV,
          paddingHorizontal: paddingH,
          opacity: pressed ? 0.82 : disabled ? 0.5 : 1,
          transform: [{ scale: pressed ? 0.97 : 1 }],
        },
        style as any,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <Text style={[styles.text, { color: textColor, fontSize }]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  text: {
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
