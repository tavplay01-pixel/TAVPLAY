import { describe, it, expect, beforeAll, afterAll } from "vitest";
import {
  getJourneys,
  getCategoriesByJourney,
  getQuestionsByGameType,
  getRandomQuestion,
} from "./games";

describe("Games API", () => {
  describe("getJourneys", () => {
    it("should return all journeys", async () => {
      const journeys = await getJourneys();
      expect(journeys).toBeDefined();
      expect(Array.isArray(journeys)).toBe(true);
      expect(journeys.length).toBeGreaterThan(0);
    });

    it("should have journey properties", async () => {
      const journeys = await getJourneys();
      expect(journeys[0]).toHaveProperty("id");
      expect(journeys[0]).toHaveProperty("name");
      expect(journeys[0]).toHaveProperty("description");
      expect(journeys[0]).toHaveProperty("order");
    });
  });

  describe("getCategoriesByJourney", () => {
    it("should return categories for a journey", async () => {
      const categories = await getCategoriesByJourney(1);
      expect(categories).toBeDefined();
      expect(Array.isArray(categories)).toBe(true);
    });

    it("should have category properties", async () => {
      const categories = await getCategoriesByJourney(1);
      if (categories.length > 0) {
        expect(categories[0]).toHaveProperty("id");
        expect(categories[0]).toHaveProperty("name");
        expect(categories[0]).toHaveProperty("journeyId");
      }
    });
  });

  describe("getQuestionsByGameType", () => {
    it("should return quiz questions", async () => {
      const questions = await getQuestionsByGameType("quiz", undefined, undefined, undefined, 5);
      expect(questions).toBeDefined();
      expect(Array.isArray(questions)).toBe(true);
      expect(questions.length).toBeGreaterThan(0);
    });

    it("should have question properties", async () => {
      const questions = await getQuestionsByGameType("quiz", undefined, undefined, undefined, 1);
      if (questions.length > 0) {
        const question = questions[0];
        expect(question).toHaveProperty("id");
        expect(question).toHaveProperty("question");
        expect(question).toHaveProperty("answer");
        expect(question).toHaveProperty("gameType");
        expect(question).toHaveProperty("bibleReference");
      }
    });

    it("should filter by difficulty", async () => {
      const questions = await getQuestionsByGameType("quiz", undefined, undefined, "facil", 5);
      expect(questions).toBeDefined();
      expect(Array.isArray(questions)).toBe(true);
      if (questions.length > 0) {
        expect(questions[0].difficulty).toBe("facil");
      }
    });

    it("should return different game types", async () => {
      const gameTypes = ["quiz", "forca", "verdadeiro_ou_falso", "quem_sou_eu", "memoria"];

      for (const gameType of gameTypes) {
        const questions = await getQuestionsByGameType(gameType, undefined, undefined, undefined, 1);
        expect(questions).toBeDefined();
        expect(Array.isArray(questions)).toBe(true);
      }
    });
  });

  describe("getRandomQuestion", () => {
    it("should return a random question", async () => {
      const question = await getRandomQuestion("quiz");
      expect(question).toBeDefined();
      expect(question).toHaveProperty("id");
      expect(question).toHaveProperty("question");
      expect(question).toHaveProperty("answer");
    });

    it("should return null for non-existent game type", async () => {
      const question = await getRandomQuestion("nonexistent");
      expect(question).toBeNull();
    });

    it("should filter by journey", async () => {
      const question = await getRandomQuestion("quiz", 1);
      if (question) {
        expect(question.journeyId).toBe(1);
      }
    });

    it("should filter by difficulty", async () => {
      const question = await getRandomQuestion("quiz", undefined, undefined, "dificil");
      if (question) {
        expect(question.difficulty).toBe("dificil");
      }
    });
  });

  describe("Quiz validation", () => {
    it("should have valid alternatives for quiz questions", async () => {
      const questions = await getQuestionsByGameType("quiz", undefined, undefined, undefined, 10);

      for (const question of questions) {
        if (question.alternatives) {
          const alternatives = JSON.parse(question.alternatives);
          expect(Array.isArray(alternatives)).toBe(true);
          expect(alternatives.length).toBeGreaterThan(0);
          expect(alternatives).toContain(question.answer);
        }
      }
    });

    it("should have unique alternatives", async () => {
      const questions = await getQuestionsByGameType("quiz", undefined, undefined, undefined, 5);

      for (const question of questions) {
        if (question.alternatives) {
          const alternatives = JSON.parse(question.alternatives);
          const uniqueAlternatives = new Set(alternatives);
          expect(uniqueAlternatives.size).toBe(alternatives.length);
        }
      }
    });
  });

  describe("Bible references", () => {
    it("should have valid bible references", async () => {
      const questions = await getQuestionsByGameType("quiz", undefined, undefined, undefined, 10);

      for (const question of questions) {
        expect(question.bibleReference).toBeDefined();
        expect(question.bibleReference).not.toBe("");
        expect(question.bibleReference).toMatch(/\d+:\d+/);
      }
    });
  });
});
