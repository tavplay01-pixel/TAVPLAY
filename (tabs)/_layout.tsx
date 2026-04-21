import { useEffect } from "react";
import { useRouter } from "expo-router";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform, Text } from "react-native";

import { HapticTab } from "@/components/haptic-tab";
import { useColors } from "@/hooks/use-colors";
import { useAuthContext } from "@/lib/auth-context";

function EmojiIcon({ emoji, size }: { emoji: string; size?: number }) {
  return (
    <Text style={{ fontSize: size ?? 22, textAlign: "center", lineHeight: (size ?? 22) + 4 }}>
      {emoji}
    </Text>
  );
}

export default function TabLayout() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthContext();

  // Redirecionar para login se não autenticado
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return null;
  }

  const bottomPadding = Platform.OS === "web" ? 8 : Math.max(insets.bottom, 8);
  const tabBarHeight = 58 + bottomPadding;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          paddingTop: 6,
          paddingBottom: bottomPadding,
          height: tabBarHeight,
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1.5,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600",
          letterSpacing: 0.2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: () => <EmojiIcon emoji="🏠" />,
        }}
      />
      <Tabs.Screen
        name="games"
        options={{
          title: "Jogos",
          tabBarIcon: () => <EmojiIcon emoji="🎮" />,
        }}
      />
      <Tabs.Screen
        name="ranking"
        options={{
          title: "Ranking",
          tabBarIcon: () => <EmojiIcon emoji="🏆" />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: () => <EmojiIcon emoji="👤" />,
        }}
      />
      <Tabs.Screen
        name="daily-verse"
        options={{
          title: "Versículo",
          tabBarIcon: () => <EmojiIcon emoji="📖" />,
        }}
      />
      {/* Esconder abas extras da barra de navegação */}
      <Tabs.Screen
        name="shop"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="seals"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
