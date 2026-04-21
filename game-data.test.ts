import { describe, it, expect } from "vitest";
import {
  QUIZ_QUESTIONS,
  TRUE_FALSE_QUESTIONS,
  WHO_AM_I_QUESTIONS,
  HANGMAN_WORDS,
  MEMORY_PAIRS,
  CHRONOLOGICAL_SETS,
  WORD_SEARCH_THEMES,
  CROSSWORD_CLUES,
} from "../lib/game-data";

describe("Quiz Bíblico", () => {
  it("deve ter ao menos 40 perguntas", () => {
    expect(QUIZ_QUESTIONS.length).toBeGreaterThanOrEqual(40);
  });

  it("cada pergunta deve ter 4 opções", () => {
    QUIZ_QUESTIONS.forEach((q) => {
      expect(q.options).toHaveLength(4);
    });
  });

  it("o índice correto deve ser válido (0-3)", () => {
    QUIZ_QUESTIONS.forEach((q) => {
      expect(q.correct).toBeGreaterThanOrEqual(0);
      expect(q.correct).toBeLessThanOrEqual(3);
    });
  });

  it("cada pergunta deve ter id único", () => {
    const ids = QUIZ_QUESTIONS.map((q) => q.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});

describe("Verdadeiro ou Falso", () => {
  it("deve ter ao menos 20 questões", () => {
    expect(TRUE_FALSE_QUESTIONS.length).toBeGreaterThanOrEqual(20);
  });

  it("cada questão deve ter explicação", () => {
    TRUE_FALSE_QUESTIONS.forEach((q) => {
      expect(q.explanation).toBeTruthy();
      expect(q.explanation.length).toBeGreaterThan(10);
    });
  });

  it("resposta deve ser booleana", () => {
    TRUE_FALSE_QUESTIONS.forEach((q) => {
      expect(typeof q.answer).toBe("boolean");
    });
  });
});

describe("Quem Sou Eu?", () => {
  it("deve ter ao menos 10 personagens", () => {
    expect(WHO_AM_I_QUESTIONS.length).toBeGreaterThanOrEqual(10);
  });

  it("cada personagem deve ter ao menos 3 dicas", () => {
    WHO_AM_I_QUESTIONS.forEach((q) => {
      expect(q.hints.length).toBeGreaterThanOrEqual(3);
    });
  });

  it("cada personagem deve ter uma resposta", () => {
    WHO_AM_I_QUESTIONS.forEach((q) => {
      expect(q.answer).toBeTruthy();
    });
  });
});

describe("Forca Bíblica", () => {
  it("deve ter ao menos 40 palavras", () => {
    expect(HANGMAN_WORDS.length).toBeGreaterThanOrEqual(40);
  });

  it("cada palavra deve ter dica e categoria", () => {
    HANGMAN_WORDS.forEach((w) => {
      expect(w.hint).toBeTruthy();
      expect(w.category).toBeTruthy();
    });
  });

  it("palavras devem ser em maiúsculas", () => {
    HANGMAN_WORDS.forEach((w) => {
      expect(w.word).toBe(w.word.toUpperCase());
    });
  });
});

describe("Memória Bíblica", () => {
  it("deve ter ao menos 6 pares", () => {
    expect(MEMORY_PAIRS.length).toBeGreaterThanOrEqual(6);
  });

  it("cada par deve ter id, name, emoji e pair", () => {
    MEMORY_PAIRS.forEach((p) => {
      expect(p.id).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.emoji).toBeTruthy();
      expect(p.pair).toBeTruthy();
    });
  });
});

describe("Ordem Cronológica", () => {
  it("deve ter 4 conjuntos", () => {
    expect(CHRONOLOGICAL_SETS).toHaveLength(4);
  });

  it("cada conjunto deve ter ao menos 4 eventos", () => {
    CHRONOLOGICAL_SETS.forEach((s) => {
      expect(s.events.length).toBeGreaterThanOrEqual(4);
    });
  });

  it("cada conjunto deve ter título", () => {
    CHRONOLOGICAL_SETS.forEach((s) => {
      expect(s.title).toBeTruthy();
    });
  });
});

describe("Caça-Palavras", () => {
  it("deve ter 6 temas", () => {
    expect(WORD_SEARCH_THEMES).toHaveLength(6);
  });

  it("cada tema deve ter ao menos 6 palavras", () => {
    WORD_SEARCH_THEMES.forEach((t) => {
      expect(t.words.length).toBeGreaterThanOrEqual(6);
    });
  });

  it("palavras devem ser em maiúsculas", () => {
    WORD_SEARCH_THEMES.forEach((t) => {
      t.words.forEach((w) => {
        expect(w).toBe(w.toUpperCase());
      });
    });
  });
});

describe("Palavras Cruzadas", () => {
  it("deve ter ao menos 5 dicas", () => {
    expect(CROSSWORD_CLUES.length).toBeGreaterThanOrEqual(5);
  });

  it("cada dica deve ter direção válida", () => {
    CROSSWORD_CLUES.forEach((c) => {
      expect(["across", "down"]).toContain(c.direction);
    });
  });

  it("cada resposta deve ser em maiúsculas", () => {
    CROSSWORD_CLUES.forEach((c) => {
      expect(c.answer).toBe(c.answer.toUpperCase());
    });
  });
});
