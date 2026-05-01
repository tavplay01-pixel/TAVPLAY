import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import {
  getJourneys,
  getCategoriesByJourney,
  getQuestionsByGameType,
  getRandomQuestion,
} from "../games";

export const gamesRouter = router({
  // Obter todas as jornadas
  getJourneys: publicProcedure.query(async () => {
    return await getJourneys();
  }),

  // Obter categorias de uma jornada
  getCategoriesByJourney: publicProcedure
    .input(z.object({ journeyId: z.number() }))
    .query(async ({ input }) => {
      return await getCategoriesByJourney(input.journeyId);
    }),

  // Obter questões para um jogo específico
  getQuestions: publicProcedure
    .input(
      z.object({
        gameType: z.string(),
        journeyId: z.number().optional(),
        categoryId: z.number().optional(),
        difficulty: z.enum(["facil", "medio", "dificil"]).optional(),
        limit: z.number().default(10),
      })
    )
    .query(async ({ input }) => {
      return await getQuestionsByGameType(
        input.gameType,
        input.journeyId,
        input.categoryId,
        input.difficulty,
        input.limit
      );
    }),

  // Obter uma questão aleatória
  getRandomQuestion: publicProcedure
    .input(
      z.object({
        gameType: z.string(),
        journeyId: z.number().optional(),
        categoryId: z.number().optional(),
        difficulty: z.enum(["facil", "medio", "dificil"]).optional(),
      })
    )
    .query(async ({ input }) => {
      return await getRandomQuestion(
        input.gameType,
        input.journeyId,
        input.categoryId,
        input.difficulty
      );
    }),

  // Validar resposta de um quiz
  validateAnswer: publicProcedure
    .input(
      z.object({
        questionId: z.number(),
        answer: z.string(),
      })
    )
    .query(async ({ input }) => {
      // TODO: Implementar validação de resposta
      return {
        correct: false,
        message: "Resposta incorreta",
      };
    }),
});
