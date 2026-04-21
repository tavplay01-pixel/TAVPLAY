import { Pressable, Text, View } from "react-native";
import { useColors } from "@/hooks/use-colors";
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

interface ShareButtonProps {
  onPress: () => void;
  title?: string;
  disabled?: boolean;
}

export function ShareButton({ onPress, title = "Compartilhar", disabled = false }: ShareButtonProps) {
  const colors = useColors();

  const handlePress = async () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={({ pressed }) => [
        {
          backgroundColor: disabled ? colors.border : colors.primary,
          paddingHorizontal: 16,
          paddingVertical: 10,
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center",
          opacity: pressed && !disabled ? 0.8 : 1,
          transform: [{ scale: pressed && !disabled ? 0.97 : 1 }],
        },
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
        <Text style={{ fontSize: 16 }}>📤</Text>
        <Text
          style={{
            color: "#F5E6C8",
            fontWeight: "600",
            fontSize: 14,
          }}
        >
          {title}
        </Text>
      </View>
    </Pressable>
  );
}
