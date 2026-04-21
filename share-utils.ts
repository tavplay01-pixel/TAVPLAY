import * as Sharing from "expo-sharing";
import { Platform } from "react-native";

export interface Achievement {
  name: string;
  description: string;
  icon: string;
  date: Date;
}

export interface GameResult {
  gameName: string;
  score: number;
  maxScore: number;
  level: number;
  date: Date;
}

export function generateShareMessage(achievement: Achievement): string {
  const date = achievement.date.toLocaleDateString("pt-BR");
  return `🎉 Desbloqueei a conquista "${achievement.name}" no TAV Play!\n\n${achievement.description}\n\n${achievement.icon}\n\nData: ${date}\n\nBaxa o TAV Play - O Selo do Conhecimento Bíblico e teste seus conhecimentos bíblicos! 📖`;
}

export function generateGameShareMessage(result: GameResult): string {
  const percentage = Math.round((result.score / result.maxScore) * 100);
  const date = result.date.toLocaleDateString("pt-BR");
  return `📊 Completei "${result.gameName}" no TAV Play!\n\nPontuação: ${result.score}/${result.maxScore} (${percentage}%)\nNível: ${result.level}\nData: ${date}\n\nVenha jogar comigo! 🎮 TAV Play - O Selo do Conhecimento Bíblico`;
}

export async function shareAchievement(achievement: Achievement): Promise<void> {
  try {
    const message = generateShareMessage(achievement);

    if (Platform.OS === "web") {
      // Para web, copiar para clipboard
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(message);
        console.log("Mensagem copiada para clipboard");
      }
    } else {
      // Para iOS e Android, usar share nativo
      await Sharing.shareAsync(message, {
        dialogTitle: "Compartilhar Conquista",
        mimeType: "text/plain",
      });
    }
  } catch (error) {
    console.error("Erro ao compartilhar conquista:", error);
    throw error;
  }
}

export async function shareGameResult(result: GameResult): Promise<void> {
  try {
    const message = generateGameShareMessage(result);

    if (Platform.OS === "web") {
      // Para web, copiar para clipboard
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(message);
        console.log("Mensagem copiada para clipboard");
      }
    } else {
      // Para iOS e Android, usar share nativo
      await Sharing.shareAsync(message, {
        dialogTitle: "Compartilhar Resultado",
        mimeType: "text/plain",
      });
    }
  } catch (error) {
    console.error("Erro ao compartilhar resultado:", error);
    throw error;
  }
}

export function getShareableAchievements(): Achievement[] {
  return [
    {
      name: "Iniciante Bíblico",
      description: "Completou seu primeiro jogo",
      icon: "📖",
      date: new Date(),
    },
    {
      name: "Conhecedor da Palavra",
      description: "Acertou 10 perguntas seguidas no Quiz",
      icon: "🎯",
      date: new Date(),
    },
    {
      name: "Mestre das Palavras",
      description: "Completou a Forca Bíblica sem erros",
      icon: "✨",
      date: new Date(),
    },
    {
      name: "Caçador de Palavras",
      description: "Encontrou todas as palavras no Caça-Palavras",
      icon: "🔍",
      date: new Date(),
    },
    {
      name: "Memória Divina",
      description: "Completou a Memória Bíblica em tempo recorde",
      icon: "🧠",
      date: new Date(),
    },
    {
      name: "Sábio em Ordem",
      description: "Ordenou corretamente todos os eventos cronológicos",
      icon: "📅",
      date: new Date(),
    },
    {
      name: "Conhecedor Perfeito",
      description: "Atingiu 100% de acerto em Verdadeiro ou Falso",
      icon: "✅",
      date: new Date(),
    },
    {
      name: "Identificador de Personagens",
      description: "Adivinhou todos os personagens em Quem Sou Eu?",
      icon: "🎭",
      date: new Date(),
    },
  ];
}
