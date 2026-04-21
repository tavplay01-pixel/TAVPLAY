import {
  ScrollView,
  Text,
  View,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

export default function ForgotPasswordScreen() {
  const colors = useColors();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("error");
  const [step, setStep] = useState<"email" | "reset">("email");

  const handleCheckEmail = async () => {
    if (isSubmitting) return;
    setMessage("");

    if (!email || !email.includes("@")) {
      setMessage("Por favor, insira um email válido.");
      setMessageType("error");
      return;
    }

    try {
      setIsSubmitting(true);

      // Verificar se o email existe no localStorage
      const savedUsers = await AsyncStorage.getItem("tavplay_users");
      const users = savedUsers ? JSON.parse(savedUsers) : [];
      const userExists = users.some((u: any) => u.email === email);

      if (userExists) {
        // Email encontrado - permitir redefinir senha
        setStep("reset");
        setMessage("");
      } else {
        setMessage("Nenhuma conta encontrada com este email. Verifique o email ou crie uma nova conta.");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Erro ao verificar email. Tente novamente.");
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async () => {
    if (isSubmitting) return;
    setMessage("");

    if (!newPassword || newPassword.length < 6) {
      setMessage("A nova senha deve ter pelo menos 6 caracteres.");
      setMessageType("error");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("As senhas não coincidem.");
      setMessageType("error");
      return;
    }

    try {
      setIsSubmitting(true);

      // Atualizar a senha no localStorage
      const savedUsers = await AsyncStorage.getItem("tavplay_users");
      const users = savedUsers ? JSON.parse(savedUsers) : [];
      const userIndex = users.findIndex((u: any) => u.email === email);

      if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        await AsyncStorage.setItem("tavplay_users", JSON.stringify(users));

        setMessage("Senha redefinida com sucesso! Você já pode fazer login.");
        setMessageType("success");

        // Redirecionar para login após 2 segundos
        setTimeout(() => {
          router.replace("/auth/login" as any);
        }, 2000);
      } else {
        setMessage("Erro ao redefinir senha. Tente novamente.");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Erro ao redefinir senha. Tente novamente.");
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToLogin = () => {
    router.back();
  };

  return (
    <ScreenContainer style={{ backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Pressable onPress={handleBackToLogin} style={styles.backBtn}>
              <Text style={[styles.backText, { color: colors.primary }]}>‹ Voltar</Text>
            </Pressable>
            <Text style={[styles.title, { color: colors.foreground }]}>
              {step === "email" ? "Recuperar Senha" : "Nova Senha"}
            </Text>
            <Text style={[styles.subtitle, { color: colors.muted }]}>
              {step === "email"
                ? "Digite o email da sua conta para redefinir a senha."
                : `Defina uma nova senha para ${email}`}
            </Text>
          </View>

          {/* Icon */}
          <View style={[styles.logoContainer, { backgroundColor: colors.surface, borderColor: colors.primary }]}>
            <Text style={styles.logoText}>{step === "email" ? "🔑" : "🔒"}</Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            {/* Message */}
            {message !== "" && (
              <View
                style={[
                  styles.messageBox,
                  {
                    backgroundColor: messageType === "success" ? colors.success + "18" : colors.error + "18",
                    borderColor: messageType === "success" ? colors.success + "44" : colors.error + "44",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    { color: messageType === "success" ? colors.success : colors.error },
                  ]}
                >
                  {message}
                </Text>
              </View>
            )}

            {step === "email" ? (
              <>
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
                    onChangeText={(text) => { setEmail(text); setMessage(""); }}
                    editable={!isSubmitting}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                {/* Submit Button */}
                <Pressable
                  onPress={handleCheckEmail}
                  disabled={isSubmitting}
                  style={({ pressed }) => [
                    styles.submitBtn,
                    {
                      backgroundColor: colors.primary,
                      opacity: pressed || isSubmitting ? 0.8 : 1,
                    },
                  ]}
                >
                  <Text style={styles.submitBtnText}>
                    {isSubmitting ? "Verificando..." : "Verificar Email"}
                  </Text>
                </Pressable>
              </>
            ) : (
              <>
                {/* New Password Input */}
                <View style={styles.inputGroup}>
                  <Text style={[styles.label, { color: colors.foreground }]}>Nova Senha</Text>
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
                    value={newPassword}
                    onChangeText={(text) => { setNewPassword(text); setMessage(""); }}
                    editable={!isSubmitting}
                    secureTextEntry
                  />
                </View>

                {/* Confirm Password Input */}
                <View style={styles.inputGroup}>
                  <Text style={[styles.label, { color: colors.foreground }]}>Confirmar Nova Senha</Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: colors.surface,
                        borderColor: colors.border,
                        color: colors.foreground,
                      },
                    ]}
                    placeholder="Confirme sua nova senha"
                    placeholderTextColor={colors.muted}
                    value={confirmPassword}
                    onChangeText={(text) => { setConfirmPassword(text); setMessage(""); }}
                    editable={!isSubmitting}
                    secureTextEntry
                  />
                </View>

                {/* Reset Button */}
                <Pressable
                  onPress={handleResetPassword}
                  disabled={isSubmitting}
                  style={({ pressed }) => [
                    styles.submitBtn,
                    {
                      backgroundColor: colors.primary,
                      opacity: pressed || isSubmitting ? 0.8 : 1,
                    },
                  ]}
                >
                  <Text style={styles.submitBtnText}>
                    {isSubmitting ? "Redefinindo..." : "Redefinir Senha"}
                  </Text>
                </Pressable>

                {/* Back to email step */}
                <Pressable
                  onPress={() => { setStep("email"); setMessage(""); }}
                  style={({ pressed }) => [
                    styles.secondaryBtn,
                    {
                      borderColor: colors.primary,
                      opacity: pressed ? 0.8 : 1,
                    },
                  ]}
                >
                  <Text style={[styles.secondaryBtnText, { color: colors.primary }]}>
                    Usar outro email
                  </Text>
                </Pressable>
              </>
            )}
          </View>

          {/* Info text */}
          <View style={styles.infoContainer}>
            <Text style={[styles.infoText, { color: colors.muted }]}>
              Nota: Os dados da sua conta ficam salvos apenas neste navegador/dispositivo. Se você criou sua conta em outro dispositivo, precisará criar uma nova conta aqui.
            </Text>
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
    marginBottom: 24,
  },
  backBtn: {
    paddingVertical: 8,
    marginBottom: 12,
  },
  backText: {
    fontSize: 16,
    fontWeight: "600",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 13,
    marginTop: 6,
    fontStyle: "italic",
    lineHeight: 18,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 32,
  },
  logoText: {
    fontSize: 40,
  },
  formContainer: {
    gap: 16,
  },
  messageBox: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 12,
    alignItems: "center",
  },
  messageText: {
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 18,
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
  submitBtn: {
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  submitBtnText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#F5E6C8",
  },
  secondaryBtn: {
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  secondaryBtnText: {
    fontSize: 15,
    fontWeight: "700",
  },
  infoContainer: {
    marginTop: 24,
    paddingHorizontal: 8,
  },
  infoText: {
    fontSize: 11,
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 16,
    fontStyle: "italic",
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
