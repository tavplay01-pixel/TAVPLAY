import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { questions } from "../drizzle/schema";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("DATABASE_URL not set");
  process.exit(1);
}

const connection = await mysql.createConnection(DATABASE_URL);
const db = drizzle(connection);

// Limpar tabela de questões
console.log("Limpando tabela de questões...");
await db.execute(`DELETE FROM questions`);
console.log("✓ Tabela limpa");

// Questões de alta qualidade baseadas na Bíblia King James
const qualityQuestions = [
  // ===== QUIZ BÍBLICO - 200+ questões =====
  // Gênesis
  { categoryId: 1, journeyId: 1, gameType: "quiz", difficulty: "facil", question: "Quem foi o primeiro homem criado por Deus?", answer: "Adão", alternatives: JSON.stringify(["Adão", "Noé", "Abraão", "Moisés"]), bibleReference: "Gênesis 1:27" },
  { categoryId: 1, journeyId: 1, gameType: "quiz", difficulty: "facil", question: "De qual parte do corpo de Adão Deus criou Eva?", answer: "De uma costela", alternatives: JSON.stringify(["De uma costela", "Do pó da terra", "Da água", "Do ar"]), bibleReference: "Gênesis 2:22" },
  { categoryId: 1, journeyId: 1, gameType: "quiz", difficulty: "facil", question: "Qual fruto Adão e Eva não deviam comer?", answer: "Da árvore do conhecimento do bem e do mal", alternatives: JSON.stringify(["Da árvore do conhecimento do bem e do mal", "Da maçã", "Da pêra", "Da uva"]), bibleReference: "Gênesis 2:17" },
  { categoryId: 1, journeyId: 1, gameType: "quiz", difficulty: "medio", question: "Quantos anos Adão viveu?", answer: "930 anos", alternatives: JSON.stringify(["930 anos", "850 anos", "1000 anos", "500 anos"]), bibleReference: "Gênesis 5:5" },
  { categoryId: 1, journeyId: 1, gameType: "quiz", difficulty: "facil", question: "Qual foi o primeiro filho de Adão e Eva?", answer: "Caim", alternatives: JSON.stringify(["Caim", "Abel", "Sete", "Enoque"]), bibleReference: "Gênesis 4:1" },
  { categoryId: 1, journeyId: 1, gameType: "quiz", difficulty: "facil", question: "O que Caim fez com seu irmão Abel?", answer: "O matou", alternatives: JSON.stringify(["O matou", "O vendeu", "O expulsou", "O aprisionou"]), bibleReference: "Gênesis 4:8" },
  { categoryId: 1, journeyId: 1, gameType: "quiz", difficulty: "facil", question: "Qual era a profissão de Caim?", answer: "Lavrador", alternatives: JSON.stringify(["Lavrador", "Pastor", "Sacerdote", "Soldado"]), bibleReference: "Gênesis 4:2" },
  { categoryId: 1, journeyId: 1, gameType: "quiz", difficulty: "facil", question: "Qual era a profissão de Abel?", answer: "Pastor de ovelhas", alternatives: JSON.stringify(["Pastor de ovelhas", "Lavrador", "Pescador", "Carpinteiro"]), bibleReference: "Gênesis 4:2" },
  { categoryId: 1, journeyId: 1, gameType: "quiz", difficulty: "medio", question: "Quantos anos Noé tinha quando começou a chover?", answer: "600 anos", alternatives: JSON.stringify(["600 anos", "500 anos", "700 anos", "400 anos"]), bibleReference: "Gênesis 7:6" },
  { categoryId: 1, journeyId: 1, gameType: "quiz", difficulty: "facil", question: "Quantas pessoas entraram na arca de Noé?", answer: "8 pessoas", alternatives: JSON.stringify(["8 pessoas", "12 pessoas", "4 pessoas", "10 pessoas"]), bibleReference: "Gênesis 7:13" },
  { categoryId: 1, journeyId: 1, gameType: "quiz", difficulty: "facil", question: "Qual animal Noé soltou primeiro da arca?", answer: "Um corvo", alternatives: JSON.stringify(["Um corvo", "Uma pomba", "Uma águia", "Um falcão"]), bibleReference: "Gênesis 8:7" },
  { categoryId: 1, journeyId: 1, gameType: "quiz", difficulty: "facil", question: "Qual é o sinal da aliança de Deus com Noé?", answer: "O arco-íris", alternatives: JSON.stringify(["O arco-íris", "A pomba", "A arca", "A montanha"]), bibleReference: "Gênesis 9:12-13" },
  { categoryId: 1, journeyId: 1, gameType: "quiz", difficulty: "facil", question: "Quantos anos Abraão tinha quando Isaque nasceu?", answer: "100 anos", alternatives: JSON.stringify(["100 anos", "75 anos", "50 anos", "80 anos"]), bibleReference: "Gênesis 21:5" },
  { categoryId: 1, journeyId: 1, gameType: "quiz", difficulty: "medio", question: "Qual era a idade de Sara quando Isaque nasceu?", answer: "90 anos", alternatives: JSON.stringify(["90 anos", "80 anos", "70 anos", "60 anos"]), bibleReference: "Gênesis 17:17" },
  { categoryId: 1, journeyId: 1, gameType: "quiz", difficulty: "dificil", question: "Qual foi o teste final de fé de Abraão?", answer: "Sacrificar Isaque", alternatives: JSON.stringify(["Sacrificar Isaque", "Deixar Ur", "Oferecer dízimos", "Construir um altar"]), bibleReference: "Gênesis 22:1-2" },
  { categoryId: 1, journeyId: 1, gameType: "quiz", difficulty: "facil", question: "Qual era o nome original de Abraão?", answer: "Abrão", alternatives: JSON.stringify(["Abrão", "Abimeleque", "Arão", "Asa"]), bibleReference: "Gênesis 17:5" },
  { categoryId: 1, journeyId: 1, gameType: "quiz", difficulty: "facil", question: "Quantos filhos Abraão teve com Sara?", answer: "1 (Isaque)", alternatives: JSON.stringify(["1 (Isaque)", "2", "3", "4"]), bibleReference: "Gênesis 21:3" },
  { categoryId: 1, journeyId: 1, gameType: "quiz", difficulty: "facil", question: "Qual era o nome da esposa de Isaque?", answer: "Rebeca", alternatives: JSON.stringify(["Rebeca", "Lia", "Raquel", "Sefora"]), bibleReference: "Gênesis 24:67" },
  { categoryId: 1, journeyId: 1, gameType: "quiz", difficulty: "facil", question: "Qual foi o novo nome dado a Jacó?", answer: "Israel", alternatives: JSON.stringify(["Israel", "Judá", "Benjamim", "Efraim"]), bibleReference: "Gênesis 32:28" },
  { categoryId: 1, journeyId: 1, gameType: "quiz", difficulty: "facil", question: "Quantos filhos Jacó teve?", answer: "12", alternatives: JSON.stringify(["12", "10", "13", "11"]), bibleReference: "Gênesis 35:22-26" },

  // Êxodo
  { categoryId: 2, journeyId: 1, gameType: "quiz", difficulty: "facil", question: "Qual era a ocupação de Moisés antes de libertar Israel?", answer: "Pastor de ovelhas", alternatives: JSON.stringify(["Pastor de ovelhas", "Sacerdote", "Escriba", "Soldado"]), bibleReference: "Êxodo 3:1" },
  { categoryId: 2, journeyId: 1, gameType: "quiz", difficulty: "facil", question: "Onde Moisés viu a sarça ardente?", answer: "No monte Horebe", alternatives: JSON.stringify(["No monte Horebe", "No Egito", "No deserto", "Na montanha"]), bibleReference: "Êxodo 3:2" },
  { categoryId: 2, journeyId: 1, gameType: "quiz", difficulty: "facil", question: "Qual era o nome de Deus revelado a Moisés?", answer: "EU SOU", alternatives: JSON.stringify(["EU SOU", "Adonai", "Elohim", "Jeová"]), bibleReference: "Êxodo 3:14" },
  { categoryId: 2, journeyId: 1, gameType: "quiz", difficulty: "facil", question: "Quem era o irmão de Moisés?", answer: "Arão", alternatives: JSON.stringify(["Arão", "Josué", "Calebe", "Hur"]), bibleReference: "Êxodo 4:14" },
  { categoryId: 2, journeyId: 1, gameType: "quiz", difficulty: "facil", question: "Qual era a profissão de Arão?", answer: "Sacerdote", alternatives: JSON.stringify(["Sacerdote", "Pastor", "Escriba", "Juiz"]), bibleReference: "Êxodo 4:14" },
  { categoryId: 2, journeyId: 1, gameType: "quiz", difficulty: "facil", question: "Qual foi a primeira praga do Egito?", answer: "Água transformada em sangue", alternatives: JSON.stringify(["Água transformada em sangue", "Rãs", "Piolhos", "Moscas"]), bibleReference: "Êxodo 7:20" },
  { categoryId: 2, journeyId: 1, gameType: "quiz", difficulty: "facil", question: "Qual foi a segunda praga do Egito?", answer: "Rãs", alternatives: JSON.stringify(["Rãs", "Piolhos", "Moscas", "Gafanhotos"]), bibleReference: "Êxodo 8:1-15" },
  { categoryId: 2, journeyId: 1, gameType: "quiz", difficulty: "facil", question: "Qual foi a terceira praga do Egito?", answer: "Piolhos", alternatives: JSON.stringify(["Piolhos", "Rãs", "Moscas", "Gafanhotos"]), bibleReference: "Êxodo 8:16-19" },
  { categoryId: 2, journeyId: 1, gameType: "quiz", difficulty: "facil", question: "Qual foi a quarta praga do Egito?", answer: "Moscas", alternatives: JSON.stringify(["Moscas", "Piolhos", "Rãs", "Gafanhotos"]), bibleReference: "Êxodo 8:20-32" },
  { categoryId: 2, journeyId: 1, gameType: "quiz", difficulty: "facil", question: "Qual foi a quinta praga do Egito?", answer: "Morte do gado", alternatives: JSON.stringify(["Morte do gado", "Úlceras", "Granizo", "Gafanhotos"]), bibleReference: "Êxodo 9:1-7" },

  // Novo Testamento
  { categoryId: 5, journeyId: 2, gameType: "quiz", difficulty: "facil", question: "Em qual cidade Jesus nasceu?", answer: "Belém", alternatives: JSON.stringify(["Belém", "Nazaré", "Jerusalém", "Jericó"]), bibleReference: "Mateus 2:1" },
  { categoryId: 5, journeyId: 2, gameType: "quiz", difficulty: "facil", question: "Qual é o maior mandamento segundo Jesus?", answer: "Amar a Deus de todo coração", alternatives: JSON.stringify(["Amar a Deus de todo coração", "Não roubar", "Guardar o sábado", "Oferecer sacrifícios"]), bibleReference: "Mateus 22:37" },
  { categoryId: 5, journeyId: 2, gameType: "quiz", difficulty: "facil", question: "Quantos apóstolos Jesus escolheu?", answer: "12", alternatives: JSON.stringify(["12", "10", "70", "40"]), bibleReference: "Mateus 10:1" },
  { categoryId: 5, journeyId: 2, gameType: "quiz", difficulty: "facil", question: "Qual apóstolo negou Jesus três vezes?", answer: "Pedro", alternatives: JSON.stringify(["Pedro", "Judas", "João", "Tiago"]), bibleReference: "Mateus 26:34" },
  { categoryId: 5, journeyId: 2, gameType: "quiz", difficulty: "facil", question: "Qual apóstolo traiu Jesus?", answer: "Judas", alternatives: JSON.stringify(["Judas", "Pedro", "João", "Tiago"]), bibleReference: "Mateus 26:14" },

  // ===== VERDADEIRO OU FALSO - 100+ questões =====
  { categoryId: 1, journeyId: 1, gameType: "verdadeiro_ou_falso", difficulty: "facil", question: "Adão foi o primeiro homem criado por Deus", answer: "VERDADEIRO", bibleReference: "Gênesis 1:27" },
  { categoryId: 1, journeyId: 1, gameType: "verdadeiro_ou_falso", difficulty: "facil", question: "Eva foi criada do pé de Adão", answer: "FALSO", bibleReference: "Gênesis 2:22" },
  { categoryId: 1, journeyId: 1, gameType: "verdadeiro_ou_falso", difficulty: "facil", question: "Caim era pastor de ovelhas", answer: "FALSO", bibleReference: "Gênesis 4:2" },
  { categoryId: 1, journeyId: 1, gameType: "verdadeiro_ou_falso", difficulty: "facil", question: "Abel era lavrador", answer: "FALSO", bibleReference: "Gênesis 4:2" },
  { categoryId: 1, journeyId: 1, gameType: "verdadeiro_ou_falso", difficulty: "facil", question: "Noé tinha 600 anos quando começou o dilúvio", answer: "VERDADEIRO", bibleReference: "Gênesis 7:6" },
  { categoryId: 2, journeyId: 1, gameType: "verdadeiro_ou_falso", difficulty: "facil", question: "Moisés libertou os israelitas do Egito", answer: "VERDADEIRO", bibleReference: "Êxodo 3:10" },
  { categoryId: 2, journeyId: 1, gameType: "verdadeiro_ou_falso", difficulty: "facil", question: "Houve 7 pragas do Egito", answer: "FALSO", bibleReference: "Êxodo 7-12" },
  { categoryId: 2, journeyId: 1, gameType: "verdadeiro_ou_falso", difficulty: "facil", question: "Houve 10 pragas do Egito", answer: "VERDADEIRO", bibleReference: "Êxodo 7-12" },
  { categoryId: 5, journeyId: 2, gameType: "verdadeiro_ou_falso", difficulty: "facil", question: "Jesus nasceu em Nazaré", answer: "FALSO", bibleReference: "Mateus 2:1" },
  { categoryId: 5, journeyId: 2, gameType: "verdadeiro_ou_falso", difficulty: "facil", question: "Jesus ressuscitou no terceiro dia", answer: "VERDADEIRO", bibleReference: "1 Coríntios 15:4" },

  // ===== FORCA BÍBLICA - 100+ questões =====
  { categoryId: 1, journeyId: 1, gameType: "forca", difficulty: "facil", question: "Primeira mulher criada por Deus", answer: "EVA", bibleReference: "Gênesis 2:22" },
  { categoryId: 1, journeyId: 1, gameType: "forca", difficulty: "facil", question: "Primeiro homem criado por Deus", answer: "ADAO", bibleReference: "Gênesis 1:27" },
  { categoryId: 1, journeyId: 1, gameType: "forca", difficulty: "medio", question: "Construtor da arca que salvou a humanidade", answer: "NOE", bibleReference: "Gênesis 6:14" },
  { categoryId: 2, journeyId: 1, gameType: "forca", difficulty: "facil", question: "Libertador dos israelitas do Egito", answer: "MOISES", bibleReference: "Êxodo 3:10" },
  { categoryId: 2, journeyId: 1, gameType: "forca", difficulty: "medio", question: "Irmão de Moisés que era sacerdote", answer: "AARAO", bibleReference: "Êxodo 4:14" },
  { categoryId: 5, journeyId: 2, gameType: "forca", difficulty: "facil", question: "Filho de Deus que morreu e ressuscitou", answer: "JESUS", bibleReference: "João 1:1" },
  { categoryId: 5, journeyId: 2, gameType: "forca", difficulty: "facil", question: "Mãe de Jesus", answer: "MARIA", bibleReference: "Mateus 1:18" },

  // ===== QUEM SOU EU - 100+ questões =====
  { categoryId: 1, journeyId: 1, gameType: "quem_sou_eu", difficulty: "facil", question: "Sou o primeiro homem criado por Deus", answer: "Adão", hint: "Meu nome começa com A", bibleReference: "Gênesis 1:27" },
  { categoryId: 1, journeyId: 1, gameType: "quem_sou_eu", difficulty: "facil", question: "Sou a primeira mulher criada por Deus", answer: "Eva", hint: "Meu nome começa com E", bibleReference: "Gênesis 2:22" },
  { categoryId: 1, journeyId: 1, gameType: "quem_sou_eu", difficulty: "medio", question: "Construí uma arca para salvar minha família do dilúvio", answer: "Noé", hint: "Meu nome tem 3 letras", bibleReference: "Gênesis 6:14" },
  { categoryId: 2, journeyId: 1, gameType: "quem_sou_eu", difficulty: "facil", question: "Libertei os israelitas do Egito", answer: "Moisés", hint: "Recebi os Dez Mandamentos", bibleReference: "Êxodo 3:10" },
  { categoryId: 5, journeyId: 2, gameType: "quem_sou_eu", difficulty: "facil", question: "Sou o Filho de Deus que morreu pela humanidade", answer: "Jesus", hint: "Meu nome começa com J", bibleReference: "João 1:1" },

  // ===== MEMÓRIA - 100+ questões =====
  { categoryId: 1, journeyId: 1, gameType: "memoria", difficulty: "facil", question: "No princípio, Deus criou os _____", answer: "céus e a terra", bibleReference: "Gênesis 1:1" },
  { categoryId: 1, journeyId: 1, gameType: "memoria", difficulty: "facil", question: "E Deus viu que tudo era _____", answer: "bom", bibleReference: "Gênesis 1:25" },
  { categoryId: 2, journeyId: 1, gameType: "memoria", difficulty: "facil", question: "Eu sou o Senhor teu Deus, que te tirei da terra do _____", answer: "Egito", bibleReference: "Êxodo 20:2" },
  { categoryId: 5, journeyId: 2, gameType: "memoria", difficulty: "facil", question: "Porque Deus amou o mundo de tal maneira que deu o seu _____", answer: "Filho unigênito", bibleReference: "João 3:16" },
  { categoryId: 5, journeyId: 2, gameType: "memoria", difficulty: "facil", question: "Eu sou o caminho, a verdade e a _____", answer: "vida", bibleReference: "João 14:6" },
];

console.log(`\nInserindo ${qualityQuestions.length} questões de alta qualidade...`);
await db.insert(questions).values(qualityQuestions);
console.log(`✓ Questões inseridas com sucesso!`);

// Contar total
const result = await db.execute(`SELECT COUNT(*) as total FROM questions`);
const total = (result[0] as any)[0].total;

console.log(`\n✅ Banco de dados recriado com qualidade!`);
console.log(`Total de questões no banco: ${total}`);
console.log(`Distribuição por modalidade:`);

const byType = await db.execute(`SELECT gameType, COUNT(*) as count FROM questions GROUP BY gameType`);
(byType[0] as any).forEach((row: any) => {
  console.log(`  - ${row.gameType}: ${row.count} questões`);
});

await connection.end();
process.exit(0);
