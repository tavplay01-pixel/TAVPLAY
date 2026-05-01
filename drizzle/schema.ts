import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Jornadas do Conhecimento Bíblico
 */
export const journeys = mysqlTable("journeys", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(), // Antigo Testamento, Novo Testamento, etc
  description: text("description"),
  order: int("order").notNull(),
  icon: varchar("icon", { length: 255 }), // URL do ícone
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Journey = typeof journeys.$inferSelect;
export type InsertJourney = typeof journeys.$inferInsert;

/**
 * Categorias de Questões
 */
export const categories = mysqlTable("categories", {
  id: int("id").autoincrement().primaryKey(),
  journeyId: int("journeyId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  order: int("order").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Category = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;

/**
 * Questões Bíblicas
 */
export const questions = mysqlTable("questions", {
  id: int("id").autoincrement().primaryKey(),
  categoryId: int("categoryId").notNull(),
  journeyId: int("journeyId").notNull(),
  gameType: varchar("gameType", { length: 50 }).notNull(), // quiz, forca, quem_sou_eu, caca_palavras, palavras_cruzadas, ordem_cronologica, memoria
  difficulty: mysqlEnum("difficulty", ["facil", "medio", "dificil"]).notNull(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  alternatives: text("alternatives"), // JSON array para quiz
  hint: text("hint"), // Dica para quem sou eu
  bibleReference: varchar("bibleReference", { length: 255 }), // Referência bíblica (ex: Gênesis 1:1)
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Question = typeof questions.$inferSelect;
export type InsertQuestion = typeof questions.$inferInsert;

/**
 * Progresso do Usuário por Jornada
 */
export const userJourneyProgress = mysqlTable("userJourneyProgress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  journeyId: int("journeyId").notNull(),
  isUnlocked: int("isUnlocked").default(0).notNull(), // 0 ou 1
  completedQuestions: int("completedQuestions").default(0).notNull(),
  totalXP: int("totalXP").default(0).notNull(),
  level: int("level").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserJourneyProgress = typeof userJourneyProgress.$inferSelect;
export type InsertUserJourneyProgress = typeof userJourneyProgress.$inferInsert;

/**
 * Histórico de Partidas
 */
export const gameHistory = mysqlTable("gameHistory", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  journeyId: int("journeyId").notNull(),
  gameType: varchar("gameType", { length: 50 }).notNull(),
  difficulty: varchar("difficulty", { length: 50 }).notNull(),
  score: int("score").notNull(),
  xpEarned: int("xpEarned").notNull(),
  correctAnswers: int("correctAnswers").notNull(),
  totalQuestions: int("totalQuestions").notNull(),
  timeTaken: int("timeTaken"), // em segundos
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type GameHistory = typeof gameHistory.$inferSelect;
export type InsertGameHistory = typeof gameHistory.$inferInsert;

/**
 * Perfil do Usuário (extensão da tabela users)
 */
export const userProfiles = mysqlTable("userProfiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  avatarUrl: varchar("avatarUrl", { length: 255 }),
  totalXP: int("totalXP").default(0).notNull(),
  level: int("level").default(1).notNull(),
  totalScore: int("totalScore").default(0).notNull(),
  gamesPlayed: int("gamesPlayed").default(0).notNull(),
  isPremium: int("isPremium").default(0).notNull(), // 0 ou 1
  premiumExpires: timestamp("premiumExpires"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserProfile = typeof userProfiles.$inferSelect;
export type InsertUserProfile = typeof userProfiles.$inferInsert;

/**
 * Conquistas e Badges
 */
export const achievements = mysqlTable("achievements", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  icon: varchar("icon", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Achievement = typeof achievements.$inferSelect;
export type InsertAchievement = typeof achievements.$inferInsert;

/**
 * Conquistas do Usuário
 */
export const userAchievements = mysqlTable("userAchievements", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  achievementId: int("achievementId").notNull(),
  unlockedAt: timestamp("unlockedAt").defaultNow().notNull(),
});

export type UserAchievement = typeof userAchievements.$inferSelect;
export type InsertUserAchievement = typeof userAchievements.$inferInsert;

/**
 * Ranking Global
 */
export const leaderboard = mysqlTable("leaderboard", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  rank: int("rank").notNull(),
  totalXP: int("totalXP").notNull(),
  totalScore: int("totalScore").notNull(),
  gamesPlayed: int("gamesPlayed").notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Leaderboard = typeof leaderboard.$inferSelect;
export type InsertLeaderboard = typeof leaderboard.$inferInsert;