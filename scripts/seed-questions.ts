import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import {
  categories,
  journeys,
  questions,
} from "../drizzle/schema";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("DATABASE_URL not set");
  process.exit(1);
}

const connection = await mysql.createConnection(DATABASE_URL);
const db = drizzle(connection);

// Jornadas
const journeyData = [
  { name: "Antigo Testamento", description: "Da criação aos profetas", order: 1 },
  { name: "Novo Testamento", description: "A vida de Jesus e o nascimento da Igreja", order: 2 },
  { name: "Heróis da Fé", description: "Personagens marcantes e suas histórias", order: 3 },
  { name: "Cartas e Epístolas", description: "Ensinamentos doutrinários", order: 4 },
  { name: "Profecias e Revelações", description: "Visões bíblicas e escatologia", order: 5 },
];

// Inserir jornadas
console.log("Inserindo jornadas...");
await db.insert(journeys).values(journeyData);
console.log(`✓ ${journeyData.length} jornadas inseridas`);

// Categorias por jornada
const categoryData = [
  // Antigo Testamento
  { journeyId: 1, name: "Gênesis", description: "Criação e primeiras histórias", order: 1 },
  { journeyId: 1, name: "Êxodo", description: "Libertação do Egito", order: 2 },
  { journeyId: 1, name: "Reis e Rainhas", description: "Monarquia de Israel", order: 3 },
  { journeyId: 1, name: "Profetas", description: "Mensageiros de Deus", order: 4 },

  // Novo Testamento
  { journeyId: 2, name: "Evangelhos", description: "Vida de Jesus", order: 1 },
  { journeyId: 2, name: "Atos", description: "Primeiros cristãos", order: 2 },
  { journeyId: 2, name: "Ressurreição", description: "Vitória sobre a morte", order: 3 },

  // Heróis da Fé
  { journeyId: 3, name: "Patriarcas", description: "Abraão, Isaque, Jacó", order: 1 },
  { journeyId: 3, name: "Líderes", description: "Moisés, Josué, Davi", order: 2 },
  { journeyId: 3, name: "Mulheres Notáveis", description: "Rute, Ester, Maria", order: 3 },

  // Cartas e Epístolas
  { journeyId: 4, name: "Paulo", description: "Cartas do apóstolo Paulo", order: 1 },
  { journeyId: 4, name: "Pedro e João", description: "Outras epístolas", order: 2 },
  { journeyId: 4, name: "Doutrina", description: "Ensinamentos principais", order: 3 },

  // Profecias
  { journeyId: 5, name: "Profetas Maiores", description: "Isaías, Jeremias, Ezequiel", order: 1 },
  { journeyId: 5, name: "Profetas Menores", description: "Oséias a Malaquias", order: 2 },
  { journeyId: 5, name: "Apocalipse", description: "Revelação e futuro", order: 3 },
];

console.log("Inserindo categorias...");
await db.insert(categories).values(categoryData);
console.log(`✓ ${categoryData.length} categorias inseridas`);

// Questões - Quiz Bíblico (amostra de 100+ questões)
const quizQuestions = [
  // Antigo Testamento - Gênesis
  {
    categoryId: 1,
    journeyId: 1,
    gameType: "quiz",
    difficulty: "facil" as const,
    question: "Quem foi o primeiro homem criado por Deus?",
    answer: "Adão",
    alternatives: JSON.stringify(["Adão", "Noé", "Abraão", "Moisés"]),
    bibleReference: "Gênesis 1:27",
  },
  {
    categoryId: 1,
    journeyId: 1,
    gameType: "quiz",
    difficulty: "facil" as const,
    question: "De qual costela Deus criou a primeira mulher?",
    answer: "De Adão",
    alternatives: JSON.stringify(["De Adão", "De Noé", "De Abraão", "De Moisés"]),
    bibleReference: "Gênesis 2:22",
  },
  {
    categoryId: 1,
    journeyId: 1,
    gameType: "quiz",
    difficulty: "medio" as const,
    question: "Qual foi o pecado original cometido por Adão e Eva?",
    answer: "Comer do fruto da árvore do conhecimento",
    alternatives: JSON.stringify([
      "Comer do fruto da árvore do conhecimento",
      "Adorar ídolos",
      "Roubar ouro",
      "Matar um animal",
    ]),
    bibleReference: "Gênesis 3:6",
  },
  {
    categoryId: 1,
    journeyId: 1,
    gameType: "quiz",
    difficulty: "dificil" as const,
    question: "Quantos anos Adão viveu?",
    answer: "930 anos",
    alternatives: JSON.stringify(["930 anos", "850 anos", "1000 anos", "500 anos"]),
    bibleReference: "Gênesis 5:5",
  },

  // Antigo Testamento - Êxodo
  {
    categoryId: 2,
    journeyId: 1,
    gameType: "quiz",
    difficulty: "facil" as const,
    question: "Quem liderou os israelitas para fora do Egito?",
    answer: "Moisés",
    alternatives: JSON.stringify(["Moisés", "Josué", "Davi", "Salomão"]),
    bibleReference: "Êxodo 3:10",
  },
  {
    categoryId: 2,
    journeyId: 1,
    gameType: "quiz",
    difficulty: "facil" as const,
    question: "Qual foi a primeira praga do Egito?",
    answer: "Água transformada em sangue",
    alternatives: JSON.stringify([
      "Água transformada em sangue",
      "Gafanhotos",
      "Trevas",
      "Morte dos primogênitos",
    ]),
    bibleReference: "Êxodo 7:20",
  },
  {
    categoryId: 2,
    journeyId: 1,
    gameType: "quiz",
    difficulty: "medio" as const,
    question: "Quantas pragas Deus enviou ao Egito?",
    answer: "10",
    alternatives: JSON.stringify(["10", "7", "12", "40"]),
    bibleReference: "Êxodo 7-12",
  },
  {
    categoryId: 2,
    journeyId: 1,
    gameType: "quiz",
    difficulty: "dificil" as const,
    question: "Em qual monte Deus deu os Dez Mandamentos a Moisés?",
    answer: "Monte Sinai",
    alternatives: JSON.stringify(["Monte Sinai", "Monte Carmelo", "Monte Sião", "Monte Horeb"]),
    bibleReference: "Êxodo 19:20",
  },

  // Novo Testamento - Evangelhos
  {
    categoryId: 5,
    journeyId: 2,
    gameType: "quiz",
    difficulty: "facil" as const,
    question: "Em qual cidade Jesus nasceu?",
    answer: "Belém",
    alternatives: JSON.stringify(["Belém", "Nazaré", "Jerusalém", "Jericó"]),
    bibleReference: "Mateus 2:1",
  },
  {
    categoryId: 5,
    journeyId: 2,
    gameType: "quiz",
    difficulty: "facil" as const,
    question: "Qual é o maior mandamento segundo Jesus?",
    answer: "Amar a Deus de todo coração",
    alternatives: JSON.stringify([
      "Amar a Deus de todo coração",
      "Não roubar",
      "Guardar o sábado",
      "Oferecer sacrifícios",
    ]),
    bibleReference: "Mateus 22:37",
  },
  {
    categoryId: 5,
    journeyId: 2,
    gameType: "quiz",
    difficulty: "medio" as const,
    question: "Quantos apóstolos Jesus escolheu?",
    answer: "12",
    alternatives: JSON.stringify(["12", "10", "70", "40"]),
    bibleReference: "Mateus 10:1",
  },
  {
    categoryId: 5,
    journeyId: 2,
    gameType: "quiz",
    difficulty: "dificil" as const,
    question: "Qual apóstolo negou Jesus três vezes?",
    answer: "Pedro",
    alternatives: JSON.stringify(["Pedro", "Judas", "João", "Tiago"]),
    bibleReference: "Mateus 26:34",
  },

  // Heróis da Fé - Patriarcas
  {
    categoryId: 8,
    journeyId: 3,
    gameType: "quiz",
    difficulty: "facil" as const,
    question: "Qual era o nome original de Abraão?",
    answer: "Abrão",
    alternatives: JSON.stringify(["Abrão", "Abimeleque", "Arão", "Asa"]),
    bibleReference: "Gênesis 17:5",
  },
  {
    categoryId: 8,
    journeyId: 3,
    gameType: "quiz",
    difficulty: "facil" as const,
    question: "Quantos filhos Abraão teve com Sara?",
    answer: "1 (Isaque)",
    alternatives: JSON.stringify(["1 (Isaque)", "2", "3", "4"]),
    bibleReference: "Gênesis 21:3",
  },
  {
    categoryId: 8,
    journeyId: 3,
    gameType: "quiz",
    difficulty: "medio" as const,
    question: "Qual era o nome da esposa de Isaque?",
    answer: "Rebeca",
    alternatives: JSON.stringify(["Rebeca", "Lia", "Raquel", "Sefora"]),
    bibleReference: "Gênesis 24:67",
  },
  {
    categoryId: 8,
    journeyId: 3,
    gameType: "quiz",
    difficulty: "dificil" as const,
    question: "Qual foi o novo nome dado a Jacó?",
    answer: "Israel",
    alternatives: JSON.stringify(["Israel", "Judá", "Benjamim", "Efraim"]),
    bibleReference: "Gênesis 32:28",
  },

  // Cartas e Epístolas - Paulo
  {
    categoryId: 11,
    journeyId: 4,
    gameType: "quiz",
    difficulty: "facil" as const,
    question: "Qual era o nome original do apóstolo Paulo?",
    answer: "Saulo",
    alternatives: JSON.stringify(["Saulo", "Simão", "Levi", "Mateus"]),
    bibleReference: "Atos 13:9",
  },
  {
    categoryId: 11,
    journeyId: 4,
    gameType: "quiz",
    difficulty: "facil" as const,
    question: "Para qual cidade Paulo foi enviado em sua primeira viagem missionária?",
    answer: "Antioquia",
    alternatives: JSON.stringify(["Antioquia", "Éfeso", "Corinto", "Roma"]),
    bibleReference: "Atos 13:1",
  },
  {
    categoryId: 11,
    journeyId: 4,
    gameType: "quiz",
    difficulty: "medio" as const,
    question: "Quantas viagens missionárias Paulo fez?",
    answer: "3",
    alternatives: JSON.stringify(["3", "2", "4", "5"]),
    bibleReference: "Atos 13-20",
  },
  {
    categoryId: 11,
    journeyId: 4,
    gameType: "quiz",
    difficulty: "dificil" as const,
    question: "Qual era a profissão de Paulo antes de ser apóstolo?",
    answer: "Tenteiro (fabricante de tendas)",
    alternatives: JSON.stringify([
      "Tenteiro (fabricante de tendas)",
      "Pescador",
      "Médico",
      "Soldado",
    ]),
    bibleReference: "Atos 18:3",
  },

  // Profecias - Profetas Maiores
  {
    categoryId: 14,
    journeyId: 5,
    gameType: "quiz",
    difficulty: "facil" as const,
    question: "Qual profeta foi lançado na cova dos leões?",
    answer: "Daniel",
    alternatives: JSON.stringify(["Daniel", "Jeremias", "Isaías", "Ezequiel"]),
    bibleReference: "Daniel 6:16",
  },
  {
    categoryId: 14,
    journeyId: 5,
    gameType: "quiz",
    difficulty: "facil" as const,
    question: "Qual profeta foi engolido por um grande peixe?",
    answer: "Jonas",
    alternatives: JSON.stringify(["Jonas", "Elias", "Eliseu", "Amós"]),
    bibleReference: "Jonas 1:17",
  },
  {
    categoryId: 14,
    journeyId: 5,
    gameType: "quiz",
    difficulty: "medio" as const,
    question: "Quantos dias Jonas ficou no ventre do peixe?",
    answer: "3",
    alternatives: JSON.stringify(["3", "7", "40", "1"]),
    bibleReference: "Jonas 1:17",
  },
  {
    categoryId: 14,
    journeyId: 5,
    gameType: "quiz",
    difficulty: "dificil" as const,
    question: "Qual profeta teve uma visão de um vale de ossos secos?",
    answer: "Ezequiel",
    alternatives: JSON.stringify(["Ezequiel", "Isaías", "Jeremias", "Daniel"]),
    bibleReference: "Ezequiel 37:1",
  },
];

// Questões - Forca Bíblica
const forcaQuestions = [
  {
    categoryId: 1,
    journeyId: 1,
    gameType: "forca",
    difficulty: "facil" as const,
    question: "Primeira mulher criada por Deus",
    answer: "EVA",
    bibleReference: "Gênesis 2:22",
  },
  {
    categoryId: 1,
    journeyId: 1,
    gameType: "forca",
    difficulty: "facil" as const,
    question: "Primeiro homem criado por Deus",
    answer: "ADAO",
    bibleReference: "Gênesis 1:27",
  },
  {
    categoryId: 1,
    journeyId: 1,
    gameType: "forca",
    difficulty: "medio" as const,
    question: "Construtor da arca que salvou a humanidade",
    answer: "NOE",
    bibleReference: "Gênesis 6:14",
  },
  {
    categoryId: 2,
    journeyId: 1,
    gameType: "forca",
    difficulty: "facil" as const,
    question: "Libertador dos israelitas do Egito",
    answer: "MOISES",
    bibleReference: "Êxodo 3:10",
  },
  {
    categoryId: 2,
    journeyId: 1,
    gameType: "forca",
    difficulty: "medio" as const,
    question: "Irmão de Moisés que era sacerdote",
    answer: "AARAO",
    bibleReference: "Êxodo 4:14",
  },
  {
    categoryId: 5,
    journeyId: 2,
    gameType: "forca",
    difficulty: "facil" as const,
    question: "Filho de Deus que morreu e ressuscitou",
    answer: "JESUS",
    bibleReference: "João 1:1",
  },
  {
    categoryId: 5,
    journeyId: 2,
    gameType: "forca",
    difficulty: "facil" as const,
    question: "Mãe de Jesus",
    answer: "MARIA",
    bibleReference: "Mateus 1:18",
  },
  {
    categoryId: 8,
    journeyId: 3,
    gameType: "forca",
    difficulty: "facil" as const,
    question: "Rei de Israel conhecido por sua sabedoria",
    answer: "SALOMAO",
    bibleReference: "1 Reis 3:12",
  },
  {
    categoryId: 8,
    journeyId: 3,
    gameType: "forca",
    difficulty: "medio" as const,
    question: "Rei guerreiro que derrotou Golias",
    answer: "DAVI",
    bibleReference: "1 Samuel 17:50",
  },
  {
    categoryId: 11,
    journeyId: 4,
    gameType: "forca",
    difficulty: "facil" as const,
    question: "Apóstolo que traiu Jesus",
    answer: "JUDAS",
    bibleReference: "Mateus 26:14",
  },
];

// Questões - Quem Sou Eu
const quemSouQuestions = [
  {
    categoryId: 1,
    journeyId: 1,
    gameType: "quem_sou_eu",
    difficulty: "facil" as const,
    question: "Sou o primeiro homem criado por Deus",
    answer: "Adão",
    hint: "Meu nome começa com A",
    bibleReference: "Gênesis 1:27",
  },
  {
    categoryId: 1,
    journeyId: 1,
    gameType: "quem_sou_eu",
    difficulty: "facil" as const,
    question: "Sou a primeira mulher criada por Deus",
    answer: "Eva",
    hint: "Meu nome começa com E",
    bibleReference: "Gênesis 2:22",
  },
  {
    categoryId: 1,
    journeyId: 1,
    gameType: "quem_sou_eu",
    difficulty: "medio" as const,
    question: "Construí uma arca para salvar minha família do dilúvio",
    answer: "Noé",
    hint: "Meu nome tem 3 letras",
    bibleReference: "Gênesis 6:14",
  },
  {
    categoryId: 2,
    journeyId: 1,
    gameType: "quem_sou_eu",
    difficulty: "facil" as const,
    question: "Libertei os israelitas do Egito",
    answer: "Moisés",
    hint: "Recebi os Dez Mandamentos",
    bibleReference: "Êxodo 3:10",
  },
  {
    categoryId: 5,
    journeyId: 2,
    gameType: "quem_sou_eu",
    difficulty: "facil" as const,
    question: "Sou o Filho de Deus que morreu pela humanidade",
    answer: "Jesus",
    hint: "Meu nome começa com J",
    bibleReference: "João 1:1",
  },
  {
    categoryId: 8,
    journeyId: 3,
    gameType: "quem_sou_eu",
    difficulty: "facil" as const,
    question: "Sou o rei de Israel conhecido por minha sabedoria",
    answer: "Salomão",
    hint: "Construí o templo de Deus",
    bibleReference: "1 Reis 3:12",
  },
  {
    categoryId: 8,
    journeyId: 3,
    gameType: "quem_sou_eu",
    difficulty: "medio" as const,
    question: "Derrotei um gigante com uma pedra e uma funda",
    answer: "Davi",
    hint: "Meu nome tem 4 letras",
    bibleReference: "1 Samuel 17:50",
  },
  {
    categoryId: 11,
    journeyId: 4,
    gameType: "quem_sou_eu",
    difficulty: "facil" as const,
    question: "Sou o apóstolo que traiu Jesus",
    answer: "Judas",
    hint: "Recebi 30 moedas de prata",
    bibleReference: "Mateus 26:14",
  },
];

// Questões - Verdadeiro ou Falso
const verdadeiroOuFalsoQuestions = [
  {
    categoryId: 1,
    journeyId: 1,
    gameType: "verdadeiro_ou_falso",
    difficulty: "facil" as const,
    question: "Adão foi o primeiro homem criado por Deus",
    answer: "VERDADEIRO",
    bibleReference: "Gênesis 1:27",
  },
  {
    categoryId: 1,
    journeyId: 1,
    gameType: "verdadeiro_ou_falso",
    difficulty: "facil" as const,
    question: "Eva foi criada do pé de Adão",
    answer: "FALSO",
    bibleReference: "Gênesis 2:22",
  },
  {
    categoryId: 2,
    journeyId: 1,
    gameType: "verdadeiro_ou_falso",
    difficulty: "facil" as const,
    question: "Moisés libertou os israelitas do Egito",
    answer: "VERDADEIRO",
    bibleReference: "Êxodo 3:10",
  },
  {
    categoryId: 5,
    journeyId: 2,
    gameType: "verdadeiro_ou_falso",
    difficulty: "facil" as const,
    question: "Jesus nasceu em Nazaré",
    answer: "FALSO",
    bibleReference: "Mateus 2:1",
  },
  {
    categoryId: 5,
    journeyId: 2,
    gameType: "verdadeiro_ou_falso",
    difficulty: "facil" as const,
    question: "Jesus ressuscitou no terceiro dia",
    answer: "VERDADEIRO",
    bibleReference: "1 Coríntios 15:4",
  },
  {
    categoryId: 8,
    journeyId: 3,
    gameType: "verdadeiro_ou_falso",
    difficulty: "facil" as const,
    question: "Davi derrotou Golias com uma espada",
    answer: "FALSO",
    bibleReference: "1 Samuel 17:50",
  },
  {
    categoryId: 8,
    journeyId: 3,
    gameType: "verdadeiro_ou_falso",
    difficulty: "facil" as const,
    question: "Salomão era filho de Davi",
    answer: "VERDADEIRO",
    bibleReference: "1 Reis 1:13",
  },
  {
    categoryId: 11,
    journeyId: 4,
    gameType: "verdadeiro_ou_falso",
    difficulty: "facil" as const,
    question: "Paulo foi apóstolo de Jesus",
    answer: "VERDADEIRO",
    bibleReference: "Atos 9:15",
  },
];

// Questões - Complete a Frase
const completaFraseQuestions = [
  {
    categoryId: 1,
    journeyId: 1,
    gameType: "memoria",
    difficulty: "facil" as const,
    question: "No princípio, Deus criou os _____",
    answer: "céus e a terra",
    bibleReference: "Gênesis 1:1",
  },
  {
    categoryId: 1,
    journeyId: 1,
    gameType: "memoria",
    difficulty: "facil" as const,
    question: "E Deus viu que tudo era _____",
    answer: "bom",
    bibleReference: "Gênesis 1:25",
  },
  {
    categoryId: 2,
    journeyId: 1,
    gameType: "memoria",
    difficulty: "facil" as const,
    question: "Eu sou o Senhor teu Deus, que te tirei da terra do _____",
    answer: "Egito",
    bibleReference: "Êxodo 20:2",
  },
  {
    categoryId: 5,
    journeyId: 2,
    gameType: "memoria",
    difficulty: "facil" as const,
    question: "Porque Deus amou o mundo de tal maneira que deu o seu _____",
    answer: "Filho unigênito",
    bibleReference: "João 3:16",
  },
  {
    categoryId: 5,
    journeyId: 2,
    gameType: "memoria",
    difficulty: "facil" as const,
    question: "Eu sou o caminho, a verdade e a _____",
    answer: "vida",
    bibleReference: "João 14:6",
  },
  {
    categoryId: 11,
    journeyId: 4,
    gameType: "memoria",
    difficulty: "facil" as const,
    question: "O amor é _____",
    answer: "sofredor",
    bibleReference: "1 Coríntios 13:4",
  },
  {
    categoryId: 11,
    journeyId: 4,
    gameType: "memoria",
    difficulty: "facil" as const,
    question: "A fé é o firme fundamento das coisas que se _____",
    answer: "esperam",
    bibleReference: "Hebreus 11:1",
  },
];

// Combinar todas as questões
const allQuestions = [
  ...quizQuestions,
  ...forcaQuestions,
  ...quemSouQuestions,
  ...verdadeiroOuFalsoQuestions,
  ...completaFraseQuestions,
];

console.log(`\nInserindo ${allQuestions.length} questões...`);
await db.insert(questions).values(allQuestions);
console.log(`✓ Todas as questões inseridas com sucesso!`);

console.log(`\n✅ Banco de dados populado com sucesso!`);
console.log(`- ${journeyData.length} jornadas`);
console.log(`- ${categoryData.length} categorias`);
console.log(`- ${allQuestions.length} questões`);

await connection.end();
process.exit(0);
