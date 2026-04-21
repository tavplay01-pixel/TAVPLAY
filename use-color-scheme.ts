import { useThemeContext } from "@/lib/theme-provider";

export function useColorScheme(): "light" | "dark" {
  try {
    return useThemeContext().colorScheme;
  } catch {
    return "dark";
  }
}
