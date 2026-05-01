import { and, desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertGameHistory,
  InsertUser,
  InsertUserJourneyProgress,
  InsertUserProfile,
  categories,
  gameHistory,
  journeys,
  leaderboard,
  questions,
  userJourneyProgress,
  userProfiles,
  users,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Jornadas
 */
export async function getJourneys() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(journeys).orderBy(journeys.order);
}

export async function getJourneyById(journeyId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(journeys).where(eq(journeys.id, journeyId)).limit(1);
  return result[0];
}

/**
 * Questões
 */
export async function getQuestionsByJourneyAndGameType(
  journeyId: number,
  gameType: string,
  difficulty: string,
  limit: number = 1
) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(questions)
    .where(
      and(
        eq(questions.journeyId, journeyId),
        eq(questions.gameType, gameType),
        eq(questions.difficulty, difficulty as any)
      )
    )
    .limit(limit);
}

/**
 * Progresso do Usuário
 */
export async function getUserJourneyProgress(userId: number, journeyId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db
    .select()
    .from(userJourneyProgress)
    .where(and(eq(userJourneyProgress.userId, userId), eq(userJourneyProgress.journeyId, journeyId)))
    .limit(1);
  return result[0];
}

export async function createOrUpdateUserJourneyProgress(
  userId: number,
  journeyId: number,
  data: Partial<InsertUserJourneyProgress>
) {
  const db = await getDb();
  if (!db) return;
  await db
    .insert(userJourneyProgress)
    .values({
      userId,
      journeyId,
      isUnlocked: 0,
      completedQuestions: 0,
      totalXP: 0,
      level: 1,
      ...data,
    })
    .onDuplicateKeyUpdate({
      set: data,
    });
}

/**
 * Histórico de Partidas
 */
export async function createGameHistory(data: InsertGameHistory) {
  const db = await getDb();
  if (!db) return;
  return db.insert(gameHistory).values(data);
}

export async function getUserGameHistory(userId: number, limit: number = 10) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(gameHistory)
    .where(eq(gameHistory.userId, userId))
    .orderBy(desc(gameHistory.createdAt))
    .limit(limit);
}

/**
 * Perfil do Usuário
 */
export async function getUserProfile(userId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(userProfiles).where(eq(userProfiles.userId, userId)).limit(1);
  return result[0];
}

export async function createOrUpdateUserProfile(userId: number, data: Partial<InsertUserProfile>) {
  const db = await getDb();
  if (!db) return;
  await db
    .insert(userProfiles)
    .values({
      userId,
      totalXP: 0,
      level: 1,
      totalScore: 0,
      gamesPlayed: 0,
      isPremium: 0,
      ...data,
    })
    .onDuplicateKeyUpdate({
      set: data,
    });
}

/**
 * Ranking
 */
export async function getLeaderboard(limit: number = 100) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(leaderboard).orderBy(leaderboard.rank).limit(limit);
}

export async function updateLeaderboard() {
  const db = await getDb();
  if (!db) return;
  // Lógica para atualizar o ranking baseado no perfil do usuário
  // Isso seria chamado após cada partida
}
