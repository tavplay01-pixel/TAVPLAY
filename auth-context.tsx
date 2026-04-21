"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar usuário ao iniciar
  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem("tavplay_user");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Validar email e senha
      if (!email || !password) {
        throw new Error("Email e senha são obrigatórios");
      }

      if (!email.includes("@")) {
        throw new Error("Email inválido");
      }

      if (password.length < 6) {
        throw new Error("Senha deve ter pelo menos 6 caracteres");
      }

      // Buscar usuário salvo
      const savedUsers = await AsyncStorage.getItem("tavplay_users");
      const users = savedUsers ? JSON.parse(savedUsers) : [];

      const foundEmail = users.find((u: any) => u.email === email);

      if (!foundEmail) {
        throw new Error("Nenhuma conta encontrada com este email. Crie uma conta primeiro ou verifique se digitou o email corretamente.");
      }

      if (foundEmail.password !== password) {
        throw new Error("Senha incorreta. Tente novamente ou use 'Esqueceu sua senha?' para redefinir.");
      }

      const foundUser = foundEmail;

      // Salvar usuário autenticado
      const authUser: AuthUser = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        createdAt: foundUser.createdAt,
      };

      await AsyncStorage.setItem("tavplay_user", JSON.stringify(authUser));
      setUser(authUser);
    } catch (error) {
      throw error;
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      // Validar dados
      if (!email || !password || !name) {
        throw new Error("Todos os campos são obrigatórios");
      }

      if (!email.includes("@")) {
        throw new Error("Email inválido");
      }

      if (password.length < 6) {
        throw new Error("Senha deve ter pelo menos 6 caracteres");
      }

      if (name.length < 2) {
        throw new Error("Nome deve ter pelo menos 2 caracteres");
      }

      // Verificar se email já existe
      const savedUsers = await AsyncStorage.getItem("tavplay_users");
      const users = savedUsers ? JSON.parse(savedUsers) : [];

      if (users.some((u: any) => u.email === email)) {
        throw new Error("Email já cadastrado");
      }

      // Criar novo usuário
      const newUser = {
        id: Date.now().toString(),
        email,
        password,
        name,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      await AsyncStorage.setItem("tavplay_users", JSON.stringify(users));

      // Fazer login automaticamente
      const authUser: AuthUser = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        createdAt: newUser.createdAt,
      };

      await AsyncStorage.setItem("tavplay_user", JSON.stringify(authUser));
      setUser(authUser);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("tavplay_user");
      setUser(null);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext deve ser usado dentro de AuthProvider");
  }
  return context;
}
