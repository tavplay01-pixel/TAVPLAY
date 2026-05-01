import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { invokeLLM } from "../_core/llm";
import { notifyOwner } from "../_core/notification";

export const chatbotRouter = router({
  // Obter resposta do chatbot após um jogo
  getGameResponse: publicProcedure
    .input(
      z.object({
        gameType: z.string(),
        question: z.string(),
        userAnswer: z.string(),
        correctAnswer: z.string(),
        isCorrect: z.boolean(),
        score: z.number(),
        totalQuestions: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const prompt = `Você é um assistente bíblico especializado no TAV PLAY. Um jogador acabou de responder uma questão de ${input.gameType}.

Questão: ${input.question}
Resposta do jogador: ${input.userAnswer}
Resposta correta: ${input.correctAnswer}
Acertou: ${input.isCorrect ? "Sim" : "Não"}
Pontuação: ${input.score}/${input.totalQuestions}

Por favor, forneça:
1. Um feedback personalizado sobre a resposta (elogio se acertou, encorajamento se errou)
2. Uma explicação breve da resposta correta
3. Um contexto histórico ou cultural relevante
4. Uma dica para próximas questões

Mantenha a resposta concisa, amigável e educativa. Use português brasileiro.`;

        const response = await invokeLLM({
          messages: [
            {
              role: "system",
              content:
                "Você é um assistente bíblico especializado em educação religiosa. Forneça respostas educativas, encorajadoras e contextualmente ricas.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        });

        const content = response.choices[0]?.message.content || "";

        return {
          success: true,
          response: content,
          timestamp: new Date(),
        };
      } catch (error) {
        console.error("Erro ao gerar resposta do chatbot:", error);
        return {
          success: false,
          response:
            "Desculpe, não consegui gerar uma resposta no momento. Tente novamente mais tarde.",
          timestamp: new Date(),
        };
      }
    }),

  // Notificar novo usuário
  notifyNewUser: protectedProcedure
    .input(
      z.object({
        userName: z.string(),
        userEmail: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const result = await notifyOwner({
          title: "🎮 Novo Usuário no TAV PLAY!",
          content: `Um novo jogador se cadastrou no TAV PLAY!\n\nNome: ${input.userName}\nEmail: ${input.userEmail}\n\nBem-vindo ao crescimento da comunidade!`,
        });

        return {
          success: result,
          message: result ? "Notificação enviada" : "Erro ao enviar notificação",
        };
      } catch (error) {
        console.error("Erro ao notificar novo usuário:", error);
        return {
          success: false,
          message: "Erro ao enviar notificação",
        };
      }
    }),

  // Notificar recorde quebrado
  notifyRecordBroken: protectedProcedure
    .input(
      z.object({
        playerName: z.string(),
        recordType: z.string(),
        newScore: z.number(),
        previousScore: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const result = await notifyOwner({
          title: "🏆 Recorde Quebrado no TAV PLAY!",
          content: `Um jogador quebrou um recorde!\n\nJogador: ${input.playerName}\nTipo de Recorde: ${input.recordType}\nNova Pontuação: ${input.newScore}\nPontuação Anterior: ${input.previousScore}\n\nParabéns ao nosso campeão!`,
        });

        return {
          success: result,
          message: result ? "Notificação enviada" : "Erro ao enviar notificação",
        };
      } catch (error) {
        console.error("Erro ao notificar recorde quebrado:", error);
        return {
          success: false,
          message: "Erro ao enviar notificação",
        };
      }
    }),

  // Notificar meta de monetização atingida
  notifyMonetizationGoal: protectedProcedure
    .input(
      z.object({
        goalName: z.string(),
        currentValue: z.number(),
        goalValue: z.number(),
        percentage: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const result = await notifyOwner({
          title: "💰 Meta de Monetização Atingida!",
          content: `Uma meta de monetização foi atingida!\n\nMeta: ${input.goalName}\nValor Atual: R$ ${input.currentValue.toFixed(2)}\nValor da Meta: R$ ${input.goalValue.toFixed(2)}\nProgresso: ${input.percentage.toFixed(1)}%\n\nContinue crescendo!`,
        });

        return {
          success: result,
          message: result ? "Notificação enviada" : "Erro ao enviar notificação",
        };
      } catch (error) {
        console.error("Erro ao notificar meta de monetização:", error);
        return {
          success: false,
          message: "Erro ao enviar notificação",
        };
      }
    }),

  // Responder pergunta bíblica geral
  askBibleQuestion: publicProcedure
    .input(
      z.object({
        question: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const response = await invokeLLM({
          messages: [
            {
              role: "system",
              content:
                "Você é um especialista em Bíblia King James. Responda perguntas sobre a Bíblia de forma educativa, precisa e contextual. Sempre cite as referências bíblicas relevantes.",
            },
            {
              role: "user",
              content: input.question,
            },
          ],
        });

        const content = response.choices[0]?.message.content || "";

        return {
          success: true,
          response: content,
          timestamp: new Date(),
        };
      } catch (error) {
        console.error("Erro ao responder pergunta bíblica:", error);
        return {
          success: false,
          response:
            "Desculpe, não consegui responder sua pergunta no momento. Tente novamente mais tarde.",
          timestamp: new Date(),
        };
      }
    }),
});
