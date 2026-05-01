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

// Mais questões de alta qualidade para expandir o banco
const moreQualityQuestions = [
  // Gênesis (mais questões)
  { categoryId: 1, journeyId: 1, gameType: "quiz", difficulty: "dificil", question: "Qual era o filho favorito de Jacó?", answer: "José", alternatives: JSON.stringify(["José", "Benjamim", "Judá", "Rúben"]), bibleReference: "Gênesis 37:3" },
  { categoryId: 1, journeyId: 1, gameType: "quiz", difficulty: "dificil", question: "O que seus irmãos fizeram com José?", answer: "O venderam como escravo", alternatives: JSON.stringify(["O venderam como escravo", "O mataram", "O expulsaram", "O aprisionaram"]), bibleReference: "Gênesis 37:28" },
  { categoryId: 1, journeyId: 1, gameType: "quiz", difficulty: "dificil", question: "Para qual país José foi levado?", answer: "Egito", alternatives: JSON.stringify(["Egito", "Assíria", "Babilônia", "Canaã"]), bibleReference: "Gênesis 37:36" },
  { categoryId: 1, journeyId: 1, gameType: "quiz", difficulty: "dificil", question: "Qual foi a posição de José no Egito?", answer: "Governador", alternatives: JSON.stringify(["Governador", "Sacerdote", "Soldado", "Escriba"]), bibleReference: "Gênesis 41:40-41" },
  { categoryId: 1, journeyId: 1, gameType: "verdadeiro_ou_falso", difficulty: "medio", question: "José tinha 17 anos quando foi vendido como escravo", answer: "VERDADEIRO", bibleReference: "Gênesis 37:2" },
  { categoryId: 1, journeyId: 1, gameType: "forca", difficulty: "dificil", question: "Filho favorito de Jacó que foi vendido como escravo", answer: "JOSE", bibleReference: "Gênesis 37:3" },
  { categoryId: 1, journeyId: 1, gameType: "quem_sou_eu", difficulty: "dificil", question: "Fui vendido como escravo mas me tornei governador do Egito", answer: "José", hint: "Meu nome tem 4 letras", bibleReference: "Gênesis 37:28" },
  { categoryId: 1, journeyId: 1, gameType: "memoria", difficulty: "medio", question: "A túnica de José era de _____", answer: "várias cores", bibleReference: "Gênesis 37:3" },

  // Êxodo (mais questões)
  { categoryId: 2, journeyId: 1, gameType: "quiz", difficulty: "dificil", question: "Qual foi a sexta praga do Egito?", answer: "Úlceras", alternatives: JSON.stringify(["Úlceras", "Granizo", "Gafanhotos", "Trevas"]), bibleReference: "Êxodo 9:8-12" },
  { categoryId: 2, journeyId: 1, gameType: "quiz", difficulty: "dificil", question: "Qual foi a sétima praga do Egito?", answer: "Granizo", alternatives: JSON.stringify(["Granizo", "Gafanhotos", "Trevas", "Morte dos primogênitos"]), bibleReference: "Êxodo 9:13-35" },
  { categoryId: 2, journeyId: 1, gameType: "quiz", difficulty: "dificil", question: "Qual foi a oitava praga do Egito?", answer: "Gafanhotos", alternatives: JSON.stringify(["Gafanhotos", "Granizo", "Trevas", "Morte dos primogênitos"]), bibleReference: "Êxodo 10:1-20" },
  { categoryId: 2, journeyId: 1, gameType: "quiz", difficulty: "dificil", question: "Qual foi a nona praga do Egito?", answer: "Trevas", alternatives: JSON.stringify(["Trevas", "Gafanhotos", "Granizo", "Morte dos primogênitos"]), bibleReference: "Êxodo 10:21-29" },
  { categoryId: 2, journeyId: 1, gameType: "quiz", difficulty: "dificil", question: "Qual foi a décima praga do Egito?", answer: "Morte dos primogênitos", alternatives: JSON.stringify(["Morte dos primogênitos", "Trevas", "Gafanhotos", "Granizo"]), bibleReference: "Êxodo 11:1-12:36" },
  { categoryId: 2, journeyId: 1, gameType: "verdadeiro_ou_falso", difficulty: "medio", question: "O sinal da Páscoa era sangue do cordeiro nas portas", answer: "VERDADEIRO", bibleReference: "Êxodo 12:7" },
  { categoryId: 2, journeyId: 1, gameType: "memoria", difficulty: "medio", question: "Os israelitas viajaram no deserto por _____ anos", answer: "40", bibleReference: "Números 14:33" },
  { categoryId: 2, journeyId: 1, gameType: "quiz", difficulty: "dificil", question: "Em qual monte Deus deu os Dez Mandamentos?", answer: "Monte Sinai", alternatives: JSON.stringify(["Monte Sinai", "Monte Carmelo", "Monte Sião", "Monte Horeb"]), bibleReference: "Êxodo 19:20" },

  // Reis e Rainhas
  { categoryId: 3, journeyId: 1, gameType: "quiz", difficulty: "facil", question: "Qual era o rei de Israel conhecido por sua sabedoria?", answer: "Salomão", alternatives: JSON.stringify(["Salomão", "Davi", "Saul", "Josafá"]), bibleReference: "1 Reis 3:12" },
  { categoryId: 3, journeyId: 1, gameType: "quiz", difficulty: "facil", question: "Qual rei derrotou Golias?", answer: "Davi", alternatives: JSON.stringify(["Davi", "Saul", "Salomão", "Josué"]), bibleReference: "1 Samuel 17:50" },
  { categoryId: 3, journeyId: 1, gameType: "quiz", difficulty: "facil", question: "Qual era o pai de Salomão?", answer: "Davi", alternatives: JSON.stringify(["Davi", "Saul", "Josué", "Moisés"]), bibleReference: "1 Reis 1:13" },
  { categoryId: 3, journeyId: 1, gameType: "forca", difficulty: "facil", question: "Rei de Israel conhecido por sua sabedoria", answer: "SALOMAO", bibleReference: "1 Reis 3:12" },
  { categoryId: 3, journeyId: 1, gameType: "forca", difficulty: "facil", question: "Rei guerreiro que derrotou Golias", answer: "DAVI", bibleReference: "1 Samuel 17:50" },
  { categoryId: 3, journeyId: 1, gameType: "verdadeiro_ou_falso", difficulty: "facil", question: "Davi derrotou Golias com uma espada", answer: "FALSO", bibleReference: "1 Samuel 17:50" },
  { categoryId: 3, journeyId: 1, gameType: "verdadeiro_ou_falso", difficulty: "facil", question: "Salomão era filho de Davi", answer: "VERDADEIRO", bibleReference: "1 Reis 1:13" },
  { categoryId: 3, journeyId: 1, gameType: "quem_sou_eu", difficulty: "facil", question: "Sou o rei de Israel conhecido por minha sabedoria", answer: "Salomão", hint: "Construí o templo de Deus", bibleReference: "1 Reis 3:12" },
  { categoryId: 3, journeyId: 1, gameType: "quem_sou_eu", difficulty: "medio", question: "Derrotei um gigante com uma pedra e uma funda", answer: "Davi", hint: "Meu nome tem 4 letras", bibleReference: "1 Samuel 17:50" },

  // Novo Testamento - Evangelhos (mais questões)
  { categoryId: 5, journeyId: 2, gameType: "quiz", difficulty: "facil", question: "Quantos evangelhos existem?", answer: "4", alternatives: JSON.stringify(["4", "3", "5", "6"]), bibleReference: "Mateus, Marcos, Lucas, João" },
  { categoryId: 5, journeyId: 2, gameType: "quiz", difficulty: "facil", question: "Qual evangelista era médico?", answer: "Lucas", alternatives: JSON.stringify(["Lucas", "Mateus", "Marcos", "João"]), bibleReference: "Colossenses 4:14" },
  { categoryId: 5, journeyId: 2, gameType: "quiz", difficulty: "facil", question: "Qual evangelista era cobrador de impostos?", answer: "Mateus", alternatives: JSON.stringify(["Mateus", "Lucas", "Marcos", "João"]), bibleReference: "Mateus 9:9" },
  { categoryId: 5, journeyId: 2, gameType: "quiz", difficulty: "facil", question: "Qual foi o primeiro milagre de Jesus?", answer: "Transformar água em vinho", alternatives: JSON.stringify(["Transformar água em vinho", "Curar um leproso", "Ressuscitar Lázaro", "Alimentar 5000"]), bibleReference: "João 2:1-11" },
  { categoryId: 5, journeyId: 2, gameType: "quiz", difficulty: "facil", question: "Quantas pessoas Jesus alimentou com 5 pães e 2 peixes?", answer: "5000", alternatives: JSON.stringify(["5000", "4000", "3000", "2000"]), bibleReference: "Mateus 14:15-21" },
  { categoryId: 5, journeyId: 2, gameType: "verdadeiro_ou_falso", difficulty: "facil", question: "Jesus foi batizado por João Batista", answer: "VERDADEIRO", bibleReference: "Mateus 3:13-17" },
  { categoryId: 5, journeyId: 2, gameType: "verdadeiro_ou_falso", difficulty: "facil", question: "Jesus tinha 12 apóstolos", answer: "VERDADEIRO", bibleReference: "Mateus 10:1" },
  { categoryId: 5, journeyId: 2, gameType: "memoria", difficulty: "facil", question: "Jesus disse: 'Eu sou o caminho, a verdade e a _____'", answer: "vida", bibleReference: "João 14:6" },
  { categoryId: 5, journeyId: 2, gameType: "memoria", difficulty: "facil", question: "Jesus disse: 'Porque Deus amou o mundo de tal maneira que deu o seu _____'", answer: "Filho unigênito", bibleReference: "João 3:16" },

  // Atos
  { categoryId: 6, journeyId: 2, gameType: "quiz", difficulty: "facil", question: "Qual era o nome original do apóstolo Paulo?", answer: "Saulo", alternatives: JSON.stringify(["Saulo", "Simão", "Levi", "Mateus"]), bibleReference: "Atos 13:9" },
  { categoryId: 6, journeyId: 2, gameType: "quiz", difficulty: "facil", question: "Qual era a profissão de Paulo antes de ser apóstolo?", answer: "Tenteiro (fabricante de tendas)", alternatives: JSON.stringify(["Tenteiro (fabricante de tendas)", "Pescador", "Médico", "Soldado"]), bibleReference: "Atos 18:3" },
  { categoryId: 6, journeyId: 2, gameType: "quiz", difficulty: "facil", question: "Quantas viagens missionárias Paulo fez?", answer: "3", alternatives: JSON.stringify(["3", "2", "4", "5"]), bibleReference: "Atos 13-20" },
  { categoryId: 6, journeyId: 2, gameType: "verdadeiro_ou_falso", difficulty: "facil", question: "Paulo foi apóstolo de Jesus", answer: "VERDADEIRO", bibleReference: "Atos 9:15" },
  { categoryId: 6, journeyId: 2, gameType: "forca", difficulty: "facil", question: "Apóstolo que traiu Jesus", answer: "JUDAS", bibleReference: "Mateus 26:14" },
  { categoryId: 6, journeyId: 2, gameType: "quem_sou_eu", difficulty: "facil", question: "Sou o apóstolo que traiu Jesus", answer: "Judas", hint: "Recebi 30 moedas de prata", bibleReference: "Mateus 26:14" },

  // Heróis da Fé - Patriarcas
  { categoryId: 8, journeyId: 3, gameType: "quiz", difficulty: "facil", question: "Qual era o nome original de Abraão?", answer: "Abrão", alternatives: JSON.stringify(["Abrão", "Abimeleque", "Arão", "Asa"]), bibleReference: "Gênesis 17:5" },
  { categoryId: 8, journeyId: 3, gameType: "quiz", difficulty: "facil", question: "Quantos filhos Abraão teve com Sara?", answer: "1 (Isaque)", alternatives: JSON.stringify(["1 (Isaque)", "2", "3", "4"]), bibleReference: "Gênesis 21:3" },
  { categoryId: 8, journeyId: 3, gameType: "quiz", difficulty: "facil", question: "Qual era o nome da esposa de Isaque?", answer: "Rebeca", alternatives: JSON.stringify(["Rebeca", "Lia", "Raquel", "Sefora"]), bibleReference: "Gênesis 24:67" },
  { categoryId: 8, journeyId: 3, gameType: "quiz", difficulty: "dificil", question: "Qual foi o novo nome dado a Jacó?", answer: "Israel", alternatives: JSON.stringify(["Israel", "Judá", "Benjamim", "Efraim"]), bibleReference: "Gênesis 32:28" },
  { categoryId: 8, journeyId: 3, gameType: "verdadeiro_ou_falso", difficulty: "facil", question: "Abraão tinha 100 anos quando Isaque nasceu", answer: "VERDADEIRO", bibleReference: "Gênesis 21:5" },
  { categoryId: 8, journeyId: 3, gameType: "forca", difficulty: "facil", question: "Patriarca que deixou Ur para seguir Deus", answer: "ABRAAO", bibleReference: "Gênesis 12:1" },
  { categoryId: 8, journeyId: 3, gameType: "memoria", difficulty: "facil", question: "Abraão teve fé e isso lhe foi contado como _____", answer: "justiça", bibleReference: "Gênesis 15:6" },
];

console.log(`\nInserindo ${moreQualityQuestions.length} questões adicionais de qualidade...`);
await db.insert(questions).values(moreQualityQuestions);
console.log(`✓ Questões adicionais inseridas com sucesso!`);

// Contar total
const result = await db.execute(`SELECT COUNT(*) as total FROM questions`);
const total = (result[0] as any)[0].total;

console.log(`\n✅ Banco de dados expandido com qualidade!`);
console.log(`Total de questões no banco: ${total}`);
console.log(`Distribuição por modalidade:`);

const byType = await db.execute(`SELECT gameType, COUNT(*) as count FROM questions GROUP BY gameType`);
(byType[0] as any).forEach((row: any) => {
  console.log(`  - ${row.gameType}: ${row.count} questões`);
});

console.log(`\nDistribuição por jornada:`);
const byJourney = await db.execute(`SELECT journeyId, COUNT(*) as count FROM questions GROUP BY journeyId`);
(byJourney[0] as any).forEach((row: any) => {
  console.log(`  - Jornada ${row.journeyId}: ${row.count} questões`);
});

await connection.end();
process.exit(0);
