import { eq, and } from "drizzle-orm";
import { getDb } from "./db";
import { journeys, categories, questions } from "../drizzle/schema";

export async function getJourneys() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(journeys).orderBy(journeys.order);
}

export async function getJourneyById(journeyId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(journeys).where(eq(journeys.id, journeyId)).limit(1);
}

export async function getCategoriesByJourney(journeyId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db
    .select()
    .from(categories)
    .where(eq(categories.journeyId, journeyId))
    .orderBy(categories.order);
}

export async function getQuestionsByGameType(
  gameType: string,
  journeyId?: number,
  categoryId?: number,
  difficulty?: string,
  limit: number = 1
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const conditions: any[] = [eq(questions.gameType, gameType)];

  if (journeyId) conditions.push(eq(questions.journeyId, journeyId));
  if (categoryId) conditions.push(eq(questions.categoryId, categoryId));
  if (difficulty) conditions.push(eq(questions.difficulty, difficulty as any));

  return db
    .select()
    .from(questions)
    .where(and(...conditions))
    .limit(limit);
}

export async function getRandomQuestion(
  gameType: string,
  journeyId?: number,
  categoryId?: number,
  difficulty?: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const conditions: any[] = [eq(questions.gameType, gameType)];

  if (journeyId) conditions.push(eq(questions.journeyId, journeyId));
  if (categoryId) conditions.push(eq(questions.categoryId, categoryId));
  if (difficulty) conditions.push(eq(questions.difficulty, difficulty as any));

  const result = await db
    .select()
    .from(questions)
    .where(and(...conditions))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function getUserProgress(userId: number, journeyId: number) {
  // TODO: Implementar quando a tabela userProgress for criada
  return null;
}

export async function saveGameResult(
  userId: number,
  journeyId: number,
  categoryId: number,
  gameType: string,
  score: number,
  totalQuestions: number,
  correctAnswers: number,
  timeSpent: number
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Aqui você pode salvar o resultado do jogo na tabela gameHistory
  // Por enquanto, apenas retornamos o resultado
  return {
    userId,
    journeyId,
    categoryId,
    gameType,
    score,
    totalQuestions,
    correctAnswers,
    timeSpent,
    accuracy: (correctAnswers / totalQuestions) * 100,
  };
}
