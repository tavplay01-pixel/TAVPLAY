// Sistema de dificuldade para os jogos do TAV Play

export type Difficulty = "easy" | "medium" | "hard" | "expert";

export interface DifficultyConfig {
  level: Difficulty;
  timeMultiplier: number; // 1 = normal, 0.5 = metade do tempo
  questionCount: number;
  hintCount: number;
  scoreMultiplier: number; // multiplicador de pontos
  description: string;
}

export const DIFFICULTY_CONFIGS: Record<Difficulty, DifficultyConfig> = {
  easy: {
    level: "easy",
    timeMultiplier: 1.5,
    questionCount: 5,
    hintCount: 3,
    scoreMultiplier: 1,
    description: "Perfeito para iniciantes. Mais tempo e dicas disponíveis.",
  },
  medium: {
    level: "medium",
    timeMultiplier: 1,
    questionCount: 10,
    hintCount: 2,
    scoreMultiplier: 1.5,
    description: "Desafio moderado. Tempo normal e menos dicas.",
  },
  hard: {
    level: "hard",
    timeMultiplier: 0.75,
    questionCount: 15,
    hintCount: 1,
    scoreMultiplier: 2,
    description: "Muito desafiador. Pouco tempo e poucas dicas.",
  },
  expert: {
    level: "expert",
    timeMultiplier: 0.5,
    questionCount: 20,
    hintCount: 0,
    scoreMultiplier: 3,
    description: "Para mestres bíblicos. Sem dicas e tempo mínimo.",
  },
};

// Perguntas do Quiz divididas por dificuldade
export const QUIZ_BY_DIFFICULTY = {
  easy: [
    { question: "Qual é o primeiro livro da Bíblia?", options: ["Gênesis", "Êxodo", "Levítico", "Números"], correct: 0 },
    { question: "Quantos mandamentos Deus deu a Moisés?", options: ["5", "10", "15", "20"], correct: 1 },
    { question: "Quem construiu a Arca?", options: ["Noé", "Abraão", "Moisés", "Davi"], correct: 0 },
    { question: "Qual é o maior livro da Bíblia?", options: ["Salmos", "Gênesis", "Mateus", "Romanos"], correct: 0 },
    { question: "Quantos apóstolos Jesus tinha?", options: ["10", "11", "12", "13"], correct: 2 },
  ],
  medium: [
    { question: "Em que monte Moisés recebeu os Dez Mandamentos?", options: ["Sinai", "Sião", "Carmelo", "Gileade"], correct: 0 },
    { question: "Qual profeta foi engolido por um peixe grande?", options: ["Elias", "Jonas", "Amós", "Obadias"], correct: 1 },
    { question: "Quantos dias Jesus ficou no túmulo?", options: ["1", "2", "3", "4"], correct: 2 },
    { question: "Qual é o livro mais curto da Bíblia?", options: ["Filemon", "Obadias", "Jó", "Rute"], correct: 0 },
    { question: "Quem foi o rei mais sábio de Israel?", options: ["Davi", "Salomão", "Josafá", "Ezequias"], correct: 1 },
  ],
  hard: [
    { question: "Qual é o nome hebraico do Pentateuco?", options: ["Tanakh", "Torá", "Nevi'im", "Ketuvim"], correct: 1 },
    { question: "Em que cidade Jesus nasceu?", options: ["Nazaré", "Belém", "Jerusalém", "Jericó"], correct: 1 },
    { question: "Quantos filhos teve Jacó?", options: ["10", "11", "12", "13"], correct: 2 },
    { question: "Qual apóstolo era coletor de impostos?", options: ["Pedro", "João", "Mateus", "Tiago"], correct: 2 },
    { question: "Em que livro está o Sermão da Montanha?", options: ["Marcos", "Lucas", "João", "Mateus"], correct: 3 },
  ],
  expert: [
    { question: "Qual é o significado de 'Getsêmani'?", options: ["Prensa de azeite", "Jardim do Rei", "Vale das lágrimas", "Porta da cidade"], correct: 0 },
    { question: "Quantos salmos existem na Bíblia?", options: ["100", "120", "150", "200"], correct: 2 },
    { question: "Qual é a letra hebraica que significa 'selo de Deus'?", options: ["Alef", "Tav", "Shin", "Mem"], correct: 1 },
    { question: "Quem foi o pai de Abraão?", options: ["Terah", "Nacor", "Haran", "Lot"], correct: 0 },
    { question: "Qual é o nome aramaico de Pedro?", options: ["Simão", "Cefas", "Pedra", "Rocha"], correct: 1 },
  ],
};

// Palavras da Forca divididas por dificuldade
export const HANGMAN_BY_DIFFICULTY = {
  easy: ["JESUS", "DEUS", "AMOR", "PAZ", "FÉ", "ESPERANÇA", "GRAÇA", "SALVAÇÃO"],
  medium: ["REDENÇÃO", "ALIANÇA", "PROFETA", "APÓSTOLO", "EVANGELHO", "RESSURREIÇÃO", "PERDÃO", "BATISMO"],
  hard: ["TRANSFIGURAÇÃO", "ASCENSÃO", "PENTECOSTES", "ENCARNAÇÃO", "EXPIAÇÃO", "JUSTIFICAÇÃO", "SANTIFICAÇÃO", "ESCATOLOGIA"],
  expert: ["HERMENÊUTICA", "SOTERIOLOGIA", "CRISTOLOGIA", "PNEUMATOLOGIA", "ECLESIOLOGIA", "ESCATOLOGIA", "TEOLOGIA", "EXEGESE"],
};

// Temas do Caça-Palavras divididos por dificuldade
export const WORD_SEARCH_BY_DIFFICULTY = {
  easy: ["CRIAÇÃO", "NOÉ", "ABRAÃO", "MOISÉS", "DAVI"],
  medium: ["PROFETAS", "APÓSTOLOS", "MILAGRES", "PARÁBOLAS", "MANDAMENTOS"],
  hard: ["LIVROS BÍBLICOS", "PERSONAGENS", "EVENTOS", "LUGARES SAGRADOS", "CONCEITOS TEOLÓGICOS"],
  expert: ["HEBRAICO", "GREGO", "ARAMAICO", "TEOLOGIA SISTEMÁTICA", "EXEGESE BÍBLICA"],
};

// Função para obter configuração de dificuldade
export function getDifficultyConfig(difficulty: Difficulty): DifficultyConfig {
  return DIFFICULTY_CONFIGS[difficulty];
}

// Função para obter perguntas de acordo com dificuldade
export function getQuestionsByDifficulty(difficulty: Difficulty) {
  return (QUIZ_BY_DIFFICULTY as any)[difficulty] || QUIZ_BY_DIFFICULTY.easy;
}

// Função para obter palavras da Forca de acordo com dificuldade
export function getHangmanWordsByDifficulty(difficulty: Difficulty) {
  return (HANGMAN_BY_DIFFICULTY as any)[difficulty] || HANGMAN_BY_DIFFICULTY.easy;
}

// Função para calcular pontos com multiplicador de dificuldade
export function calculateScoreWithDifficulty(baseScore: number, difficulty: Difficulty): number {
  const multiplier = getDifficultyConfig(difficulty).scoreMultiplier;
  return Math.round(baseScore * multiplier);
}
