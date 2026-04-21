import {
  ScrollView,
  Text,
  View,
  Pressable,
  StyleSheet,
  TextInput,
  Alert,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";
import { useState } from "react";

import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useAuthContext } from "@/lib/auth-context";

export default function LoginScreen() {
  const colors = useColors();
  const router = useRouter();
  const { login, isLoading } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    if (isSubmitting || isLoading) return;
    setErrorMessage("");

    try {
      setIsSubmitting(true);

      if (Platform.OS !== "web") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }

      await login(email, password);

      // Redirecionar para home após login bem-sucedido
      router.replace("/(tabs)");
    } catch (error: any) {
      const msg = error.message || "Falha ao fazer login";
      setErrorMessage(msg);
      if (Platform.OS !== "web") {
        Alert.alert("Erro no Login", msg);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignup = () => {
    router.push("/auth/signup");
  };

  const handleForgotPassword = () => {
    router.push("/auth/forgot-password" as any);
  };

  return (
    <ScreenContainer style={{ backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.foreground }]}>TAV Play</Text>
            <Text style={[styles.subtitle, { color: colors.muted }]}>O Selo do Conhecimento Bíblico</Text>
          </View>

          {/* Logo/Icon */}
          <View style={[styles.logoContainer, { backgroundColor: colors.surface, borderColor: colors.primary }]}>
            <Image
              source={require('@/assets/images/icon.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            {/* Error Message */}
            {errorMessage !== "" && (
              <View style={[styles.errorBox, { backgroundColor: colors.error + "18", borderColor: colors.error + "44" }]}>
                <Text style={[styles.errorText, { color: colors.error }]}>
                  {errorMessage}
                </Text>
              </View>
            )}

            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.foreground }]}>Email</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    color: colors.foreground,
                  },
                ]}
                placeholder="seu@email.com"
                placeholderTextColor={colors.muted}
                value={email}
                onChangeText={(text) => { setEmail(text); setErrorMessage(""); }}
                editable={!isSubmitting}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.foreground }]}>Senha</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    color: colors.foreground,
                  },
                ]}
                placeholder="Mínimo 6 caracteres"
                placeholderTextColor={colors.muted}
                value={password}
                onChangeText={(text) => { setPassword(text); setErrorMessage(""); }}
                editable={!isSubmitting}
                secureTextEntry
              />
            </View>

            {/* Login Button */}
            <Pressable
              onPress={handleLogin}
              disabled={isSubmitting || isLoading}
              style={({ pressed }) => [
                styles.loginBtn,
                {
                  backgroundColor: colors.primary,
                  opacity: pressed || isSubmitting ? 0.8 : 1,
                },
              ]}
            >
              <Text style={styles.loginBtnText}>
                {isSubmitting ? "Entrando..." : "Entrar"}
              </Text>
            </Pressable>

            {/* Forgot Password Link */}
            <Pressable
              onPress={handleForgotPassword}
              style={({ pressed }) => [
                styles.forgotPasswordBtn,
                { opacity: pressed ? 0.6 : 1 },
              ]}
            >
              <Text style={[styles.forgotPasswordText, { color: colors.primary }]}>
                Esqueceu sua senha?
              </Text>
            </Pressable>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
              <Text style={[styles.dividerText, { color: colors.muted }]}>ou</Text>
              <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
            </View>

            {/* Signup Button */}
            <Pressable
              onPress={handleSignup}
              disabled={isSubmitting}
              style={({ pressed }) => [
                styles.signupBtn,
                {
                  borderColor: colors.primary,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <Text style={[styles.signupBtnText, { color: colors.primary }]}>
                Criar Conta
              </Text>
            </Pressable>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.muted }]}>
              Criado por Dorismar R Lima
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
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  header: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 13,
    marginTop: 4,
    fontStyle: "italic",
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 32,
    overflow: "hidden",
  },
  logoImage: {
    width: 100,
    height: 100,
  },
  formContainer: {
    gap: 16,
  },
  errorBox: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 12,
    alignItems: "center",
  },
  errorText: {
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    fontWeight: "500",
  },
  loginBtn: {
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  loginBtnText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#F5E6C8",
  },
  forgotPasswordBtn: {
    alignItems: "center",
    paddingVertical: 4,
  },
  forgotPasswordText: {
    fontSize: 13,
    fontWeight: "600",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: 12,
    fontWeight: "600",
  },
  signupBtn: {
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  signupBtnText: {
    fontSize: 15,
    fontWeight: "700",
  },
  footer: {
    alignItems: "center",
    marginTop: 24,
  },
  footerText: {
    fontSize: 11,
    fontWeight: "500",
  },
});
