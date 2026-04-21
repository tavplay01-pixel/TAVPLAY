import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight, SymbolViewProps } from "expo-symbols";
import { ComponentProps } from "react";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";

type IconMapping = Record<SymbolViewProps["name"], ComponentProps<typeof MaterialIcons>["name"]>;
type IconSymbolName = keyof typeof MAPPING;

const MAPPING = {
  // Navigation
  "house.fill": "home",
  "gamecontroller.fill": "sports-esports",
  "trophy.fill": "emoji-events",
  "person.fill": "person",
  "bag.fill": "store",
  "star.fill": "military-tech",
  "book.fill": "menu-book",
  "chevron.right": "chevron-right",
  "chevron.left": "chevron-left",
  "xmark": "close",
  "gear": "settings",
  // Games
  "questionmark.circle.fill": "help",
  "checkmark.circle.fill": "check-circle",
  "xmark.circle.fill": "cancel",
  "clock.fill": "timer",
  "star.fill.2": "star",
  "flame.fill": "local-fire-department",
  "bolt.fill": "bolt",
  "brain.head.profile": "psychology",
  "text.book.closed.fill": "menu-book",
  "puzzlepiece.fill": "extension",
  "grid.circle.fill": "grid-view",
  "list.number": "format-list-numbered",
  // Misc
  "paperplane.fill": "send",
  "chevron.left.forwardslash.chevron.right": "code",
  "lock.fill": "lock",
  "lock.open.fill": "lock-open",
  "medal.fill": "military-tech",
  "chart.bar.fill": "bar-chart",
  "arrow.clockwise": "refresh",
  "heart.fill": "favorite",
  "share.fill": "share",
  "info.circle": "info",
  "moon.fill": "dark-mode",
  "sun.max.fill": "light-mode",
  "speaker.wave.2.fill": "volume-up",
  "speaker.slash.fill": "volume-off",
} as unknown as IconMapping;

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  const iconName = MAPPING[name];
  if (!iconName) {
    // Fallback to a generic icon if mapping not found
    return <MaterialIcons color={color} size={size} name="help-outline" style={style} />;
  }
  return <MaterialIcons color={color} size={size} name={iconName} style={style} />;
}
