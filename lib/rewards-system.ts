// Sistema de recompensas do TAV Play
// Moedas, selos colecionáveis e desbloqueáveis

export interface Seal {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: string;
  unlockedAt?: number; // timestamp
}

export interface Unlockable {
  id: string;
  type: "theme" | "avatar" | "border" | "effect";
  name: string;
  description: string;
  cost: number; // moedas necessárias
  icon: string;
  unlocked: boolean;
}

export interface RewardsState {
  coins: number;
  seals: Seal[];
  unlockedItems: Unlockable[];
}

// Selos colecionáveis (achievements)
export const SEALS: Seal[] = [
  {
    id: "first-quiz",
    name: "Primeiro Quiz",
    description: "Complete o primeiro Quiz Bíblico",
    icon: "📖",
    requirement: "Jogar Quiz Bíblico 1 vez",
  },
  {
    id: "quiz-master",
    name: "Mestre do Quiz",
    description: "Acerte 80% das perguntas no Quiz",
    icon: "🎓",
    requirement: "Acertar 80% das perguntas",
  },
  {
    id: "word-finder",
    name: "Caçador de Palavras",
    description: "Complete 5 Caça-Palavras",
    icon: "🔍",
    requirement: "Jogar Caça-Palavras 5 vezes",
  },
  {
    id: "memory-champion",
    name: "Campeão da Memória",
    description: "Complete Memória Bíblica com perfeição",
    icon: "🧠",
    requirement: "Acertar todos os pares",
  },
  {
    id: "hangman-hero",
    name: "Herói da Forca",
    description: "Vença 10 rodadas da Forca Bíblica",
    icon: "✏️",
    requirement: "Jogar Forca 10 vezes",
  },
  {
    id: "truth-seeker",
    name: "Buscador da Verdade",
    description: "Acerte 15 Verdadeiro ou Falso",
    icon: "⚖️",
    requirement: "Jogar Verdadeiro ou Falso 15 vezes",
  },
  {
    id: "crossword-expert",
    name: "Especialista em Palavras Cruzadas",
    description: "Complete 5 Palavras Cruzadas",
    icon: "📝",
    requirement: "Jogar Palavras Cruzadas 5 vezes",
  },
  {
    id: "chronology-master",
    name: "Mestre da Cronologia",
    description: "Organize corretamente 20 sequências",
    icon: "📅",
    requirement: "Jogar Ordem Cronológica 20 vezes",
  },
  {
    id: "biblical-scholar",
    name: "Erudito Bíblico",
    description: "Ganhe 1000 pontos totais",
    icon: "📚",
    requirement: "Acumular 1000 pontos",
  },
  {
    id: "level-10",
    name: "Nível 10",
    description: "Atinja o nível 10",
    icon: "⭐",
    requirement: "Atingir nível 10",
  },
];

// Itens desbloqueáveis
export const UNLOCKABLES: Unlockable[] = [
  {
    id: "theme-gold",
    type: "theme",
    name: "Tema Dourado",
    description: "Tema premium com tons dourados",
    cost: 500,
    icon: "✨",
    unlocked: false,
  },
  {
    id: "theme-emerald",
    type: "theme",
    name: "Tema Esmeralda",
    description: "Tema com tons de esmeralda",
    cost: 500,
    icon: "💚",
    unlocked: false,
  },
  {
    id: "avatar-scholar",
    type: "avatar",
    name: "Avatar Erudito",
    description: "Avatar de um estudioso bíblico",
    cost: 300,
    icon: "🧑‍🎓",
    unlocked: false,
  },
  {
    id: "avatar-priest",
    type: "avatar",
    name: "Avatar Sacerdote",
    description: "Avatar de um sacerdote",
    cost: 300,
    icon: "🙏",
    unlocked: false,
  },
  {
    id: "border-gold",
    type: "border",
    name: "Borda Dourada",
    description: "Borda dourada para os cards",
    cost: 250,
    icon: "🟨",
    unlocked: false,
  },
  {
    id: "border-silver",
    type: "border",
    name: "Borda Prateada",
    description: "Borda prateada para os cards",
    cost: 250,
    icon: "⬜",
    unlocked: false,
  },
  {
    id: "effect-particles",
    type: "effect",
    name: "Efeito Partículas",
    description: "Partículas ao acertar",
    cost: 200,
    icon: "✨",
    unlocked: false,
  },
];

// Recompensas por jogo (moedas)
export const GAME_REWARDS = {
  quiz: (correctCount: number, totalQuestions: number) => {
    const percentage = (correctCount / totalQuestions) * 100;
    if (percentage >= 90) return 150;
    if (percentage >= 70) return 100;
    if (percentage >= 50) return 50;
    return 25;
  },
  verdadeiro_falso: (correctCount: number, totalQuestions: number) => {
    const percentage = (correctCount / totalQuestions) * 100;
    if (percentage >= 90) return 120;
    if (percentage >= 70) return 80;
    if (percentage >= 50) return 40;
    return 20;
  },
  quem_sou_eu: (correctCount: number, totalQuestions: number) => {
    const percentage = (correctCount / totalQuestions) * 100;
    if (percentage >= 90) return 130;
    if (percentage >= 70) return 90;
    if (percentage >= 50) return 45;
    return 22;
  },
  forca: (correctCount: number, totalQuestions: number) => {
    const percentage = (correctCount / totalQuestions) * 100;
    if (percentage >= 90) return 140;
    if (percentage >= 70) return 95;
    if (percentage >= 50) return 48;
    return 24;
  },
  memoria: (correctCount: number, totalQuestions: number) => {
    const percentage = (correctCount / totalQuestions) * 100;
    if (percentage >= 90) return 160;
    if (percentage >= 70) return 110;
    if (percentage >= 50) return 55;
    return 27;
  },
  caca_palavras: (correctCount: number, totalQuestions: number) => {
    const percentage = (correctCount / totalQuestions) * 100;
    if (percentage >= 90) return 135;
    if (percentage >= 70) return 90;
    if (percentage >= 50) return 45;
    return 22;
  },
  palavras_cruzadas: (correctCount: number, totalQuestions: number) => {
    const percentage = (correctCount / totalQuestions) * 100;
    if (percentage >= 90) return 145;
    if (percentage >= 70) return 100;
    if (percentage >= 50) return 50;
    return 25;
  },
  ordem_cronologica: (correctCount: number, totalQuestions: number) => {
    const percentage = (correctCount / totalQuestions) * 100;
    if (percentage >= 90) return 125;
    if (percentage >= 70) return 85;
    if (percentage >= 50) return 42;
    return 21;
  },
};

// Função para calcular moedas ganhas
export function calculateCoinsEarned(
  gameName: string,
  correctCount: number,
  totalQuestions: number
): number {
  const rewardFn = (GAME_REWARDS as any)[gameName];
  if (!rewardFn) return 0;
  return rewardFn(correctCount, totalQuestions);
}

// Função para verificar se um selo foi desbloqueado
export function checkSealUnlock(
  sealId: string,
  playerStats: {
    totalGames: number;
    totalScore: number;
    level: number;
    gameStats: Record<string, { played: number; won: number; avgScore: number }>;
  }
): boolean {
  switch (sealId) {
    case "first-quiz":
      return (playerStats.gameStats.quiz?.played ?? 0) >= 1;
    case "quiz-master":
      return (playerStats.gameStats.quiz?.avgScore ?? 0) >= 80;
    case "word-finder":
      return (playerStats.gameStats.caca_palavras?.played ?? 0) >= 5;
    case "memory-champion":
      return (playerStats.gameStats.memoria?.won ?? 0) >= 1;
    case "hangman-hero":
      return (playerStats.gameStats.forca?.played ?? 0) >= 10;
    case "truth-seeker":
      return (playerStats.gameStats.verdadeiro_falso?.played ?? 0) >= 15;
    case "crossword-expert":
      return (playerStats.gameStats.palavras_cruzadas?.played ?? 0) >= 5;
    case "chronology-master":
      return (playerStats.gameStats.ordem_cronologica?.played ?? 0) >= 20;
    case "biblical-scholar":
      return playerStats.totalScore >= 1000;
    case "level-10":
      return playerStats.level >= 10;
    default:
      return false;
  }
}
