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

// Banco de dados de questões bíblicas King James
const biblicalQuestions = {
  genesis: [
    { q: "Quem foi o primeiro homem criado por Deus?", a: "Adão", ref: "Gênesis 1:27" },
    { q: "De qual costela Deus criou a primeira mulher?", a: "De Adão", ref: "Gênesis 2:22" },
    { q: "Qual foi o pecado original?", a: "Comer do fruto da árvore do conhecimento", ref: "Gênesis 3:6" },
    { q: "Quantos anos Adão viveu?", a: "930 anos", ref: "Gênesis 5:5" },
    { q: "Quem foi o primeiro filho de Adão e Eva?", a: "Caim", ref: "Gênesis 4:1" },
    { q: "O que Caim fez com seu irmão Abel?", a: "O matou", ref: "Gênesis 4:8" },
    { q: "Qual foi a profissão de Caim?", a: "Lavrador", ref: "Gênesis 4:2" },
    { q: "Qual foi a profissão de Abel?", a: "Pastor de ovelhas", ref: "Gênesis 4:2" },
    { q: "Quantos anos Noé tinha quando começou a chover?", a: "600 anos", ref: "Gênesis 7:6" },
    { q: "Quantas pessoas entraram na arca de Noé?", a: "8", ref: "Gênesis 7:13" },
    { q: "Qual animal Noé soltou primeiro da arca?", a: "Um corvo", ref: "Gênesis 8:7" },
    { q: "Qual é o sinal da aliança de Deus com Noé?", a: "O arco-íris", ref: "Gênesis 9:12-13" },
    { q: "Quantos anos Abraão tinha quando Isaque nasceu?", a: "100 anos", ref: "Gênesis 21:5" },
    { q: "Qual era a idade de Sara quando Isaque nasceu?", a: "90 anos", ref: "Gênesis 17:17" },
    { q: "Qual foi o teste final de fé de Abraão?", a: "Sacrificar Isaque", ref: "Gênesis 22:1-2" },
    { q: "Qual era o nome original de Abraão?", a: "Abrão", ref: "Gênesis 17:5" },
    { q: "Quantos filhos Abraão teve com Sara?", a: "1 (Isaque)", ref: "Gênesis 21:3" },
    { q: "Qual era o nome da esposa de Isaque?", a: "Rebeca", ref: "Gênesis 24:67" },
    { q: "Qual foi o novo nome dado a Jacó?", a: "Israel", ref: "Gênesis 32:28" },
    { q: "Quantos filhos Jacó teve?", a: "12", ref: "Gênesis 35:22-26" },
    { q: "Qual era o filho favorito de Jacó?", a: "José", ref: "Gênesis 37:3" },
    { q: "O que seus irmãos fizeram com José?", a: "O venderam como escravo", ref: "Gênesis 37:28" },
    { q: "Para qual país José foi levado?", a: "Egito", ref: "Gênesis 37:36" },
    { q: "Qual foi a posição de José no Egito?", a: "Governador", ref: "Gênesis 41:40-41" },
    { q: "Quantos anos José tinha quando foi vendido?", a: "17 anos", ref: "Gênesis 37:2" },
  ],
  exodus: [
    { q: "Qual era a ocupação de Moisés antes de libertar Israel?", a: "Pastor de ovelhas", ref: "Êxodo 3:1" },
    { q: "Onde Moisés viu a sarça ardente?", a: "No monte Horebe", ref: "Êxodo 3:2" },
    { q: "Qual era o nome de Deus revelado a Moisés?", a: "EU SOU", ref: "Êxodo 3:14" },
    { q: "Quem era o irmão de Moisés?", a: "Arão", ref: "Êxodo 4:14" },
    { q: "Qual era a profissão de Arão?", a: "Sacerdote", ref: "Êxodo 4:14" },
    { q: "Qual era o nome do Faraó do Egito?", a: "Ramsés", ref: "Êxodo 1:11" },
    { q: "Qual foi a primeira praga do Egito?", a: "Água transformada em sangue", ref: "Êxodo 7:20" },
    { q: "Qual foi a segunda praga do Egito?", a: "Rãs", ref: "Êxodo 8:1-15" },
    { q: "Qual foi a terceira praga do Egito?", a: "Piolhos", ref: "Êxodo 8:16-19" },
    { q: "Qual foi a quarta praga do Egito?", a: "Moscas", ref: "Êxodo 8:20-32" },
    { q: "Qual foi a quinta praga do Egito?", a: "Morte do gado", ref: "Êxodo 9:1-7" },
    { q: "Qual foi a sexta praga do Egito?", a: "Úlceras", ref: "Êxodo 9:8-12" },
    { q: "Qual foi a sétima praga do Egito?", a: "Granizo", ref: "Êxodo 9:13-35" },
    { q: "Qual foi a oitava praga do Egito?", a: "Gafanhotos", ref: "Êxodo 10:1-20" },
    { q: "Qual foi a nona praga do Egito?", a: "Trevas", ref: "Êxodo 10:21-29" },
    { q: "Qual foi a décima praga do Egito?", a: "Morte dos primogênitos", ref: "Êxodo 11:1-12:36" },
    { q: "O que é a Páscoa?", a: "Celebração da libertação do Egito", ref: "Êxodo 12:1-14" },
    { q: "Qual era o sinal da Páscoa?", a: "Sangue do cordeiro nas portas", ref: "Êxodo 12:7" },
    { q: "Quantos dias os israelitas viajaram no deserto?", a: "40 anos", ref: "Números 14:33" },
    { q: "O que Deus enviou para alimentar os israelitas no deserto?", a: "Maná", ref: "Êxodo 16:4" },
    { q: "Como os israelitas conseguiram água no deserto?", a: "Moisés feriu a rocha", ref: "Êxodo 17:6" },
    { q: "Em qual monte Deus deu os Dez Mandamentos a Moisés?", a: "Monte Sinai", ref: "Êxodo 19:20" },
    { q: "Quantos mandamentos Deus deu a Moisés?", a: "10", ref: "Êxodo 20:1-17" },
    { q: "Qual era a profissão de Moisés no Egito?", a: "Príncipe", ref: "Atos 7:22" },
    { q: "Quantos anos Moisés tinha quando libertou Israel?", a: "80 anos", ref: "Êxodo 7:7" },
  ],
  jesus: [
    { q: "Em qual cidade Jesus nasceu?", a: "Belém", ref: "Mateus 2:1" },
    { q: "Qual é o maior mandamento segundo Jesus?", a: "Amar a Deus de todo coração", ref: "Mateus 22:37" },
    { q: "Quantos apóstolos Jesus escolheu?", a: "12", ref: "Mateus 10:1" },
    { q: "Qual apóstolo negou Jesus três vezes?", a: "Pedro", ref: "Mateus 26:34" },
    { q: "Qual apóstolo traiu Jesus?", a: "Judas", ref: "Mateus 26:14" },
    { q: "Quantas moedas de prata Judas recebeu por trair Jesus?", a: "30", ref: "Mateus 26:15" },
    { q: "Qual foi o primeiro milagre de Jesus?", a: "Transformar água em vinho", ref: "João 2:1-11" },
    { q: "Quantas pessoas Jesus alimentou com 5 pães e 2 peixes?", a: "5000", ref: "Mateus 14:15-21" },
    { q: "Qual foi a última ceia de Jesus?", a: "Refeição com seus apóstolos", ref: "Mateus 26:26-29" },
    { q: "Quantas vezes Jesus ressuscitou Lázaro?", a: "1", ref: "João 11:1-44" },
    { q: "Qual era a profissão de Mateus antes de ser apóstolo?", a: "Cobrador de impostos", ref: "Mateus 9:9" },
    { q: "Qual era a profissão de Pedro antes de ser apóstolo?", a: "Pescador", ref: "Mateus 4:18" },
    { q: "Qual era a profissão de João antes de ser apóstolo?", a: "Pescador", ref: "Mateus 4:21" },
    { q: "Qual era a profissão de Tiago antes de ser apóstolo?", a: "Pescador", ref: "Mateus 4:21" },
    { q: "Qual era a profissão de Simão antes de ser apóstolo?", a: "Zelota", ref: "Mateus 10:4" },
    { q: "Qual era a profissão de Filipe antes de ser apóstolo?", a: "Desconhecida", ref: "João 1:43" },
    { q: "Qual era a profissão de Bartolomeu antes de ser apóstolo?", a: "Desconhecida", ref: "Mateus 10:3" },
    { q: "Qual era a profissão de Tomé antes de ser apóstolo?", a: "Desconhecida", ref: "Mateus 10:3" },
    { q: "Qual era a profissão de Tiago (o menor) antes de ser apóstolo?", a: "Desconhecida", ref: "Mateus 10:3" },
    { q: "Qual era a profissão de Judas (não Iscariotes) antes de ser apóstolo?", a: "Desconhecida", ref: "Mateus 10:3" },
  ],
  paul: [
    { q: "Qual era o nome original do apóstolo Paulo?", a: "Saulo", ref: "Atos 13:9" },
    { q: "Para qual cidade Paulo foi enviado em sua primeira viagem missionária?", a: "Antioquia", ref: "Atos 13:1" },
    { q: "Quantas viagens missionárias Paulo fez?", a: "3", ref: "Atos 13-20" },
    { q: "Qual era a profissão de Paulo antes de ser apóstolo?", a: "Tenteiro (fabricante de tendas)", ref: "Atos 18:3" },
    { q: "Quantas cartas Paulo escreveu?", a: "13 ou 14", ref: "Novo Testamento" },
    { q: "Qual era a cidade natal de Paulo?", a: "Tarso", ref: "Atos 9:11" },
    { q: "Qual era o nome do companheiro de Paulo em suas viagens?", a: "Barnabé", ref: "Atos 13:2" },
    { q: "Quantas vezes Paulo foi aprisionado?", a: "Várias", ref: "2 Coríntios 11:23" },
    { q: "Como Paulo morreu?", a: "Decapitado", ref: "Tradição histórica" },
    { q: "Qual era a religião de Paulo antes de sua conversão?", a: "Judaísmo", ref: "Atos 22:3" },
    { q: "Qual era o nome da rua em Damasco onde Paulo foi curado?", a: "Rua Direita", ref: "Atos 9:11" },
    { q: "Quem curou Paulo em Damasco?", a: "Ananias", ref: "Atos 9:12" },
    { q: "Quantos dias Paulo ficou cego?", a: "3 dias", ref: "Atos 9:9" },
    { q: "Qual era o nome do companheiro de Paulo que o abandonou?", a: "Marcos", ref: "Atos 15:37-39" },
    { q: "Qual era o nome da jovem profetisa que Paulo encontrou em Filipos?", a: "Lídia", ref: "Atos 16:14" },
  ],
  heroes: [
    { q: "Qual era o nome original de Abraão?", a: "Abrão", ref: "Gênesis 17:5" },
    { q: "Qual era o nome original de Sarai?", a: "Sara", ref: "Gênesis 17:15" },
    { q: "Qual era o nome original de Simão?", a: "Pedro", ref: "Mateus 16:18" },
    { q: "Qual era o nome original de Saulo?", a: "Paulo", ref: "Atos 13:9" },
    { q: "Qual era o nome original de Jacó?", a: "Israel", ref: "Gênesis 32:28" },
    { q: "Qual era o nome original de Jônatas?", a: "Jônatas", ref: "1 Samuel 13:2" },
    { q: "Qual era o nome original de Davi?", a: "Davi", ref: "1 Samuel 16:13" },
    { q: "Qual era o nome original de Salomão?", a: "Salomão", ref: "1 Reis 1:13" },
    { q: "Qual era o nome original de Elias?", a: "Elias", ref: "1 Reis 17:1" },
    { q: "Qual era o nome original de Eliseu?", a: "Eliseu", ref: "1 Reis 19:16" },
    { q: "Qual era o nome original de Jonas?", a: "Jonas", ref: "Jonas 1:1" },
    { q: "Qual era o nome original de Daniel?", a: "Daniel", ref: "Daniel 1:6" },
    { q: "Qual era o nome original de Jeremias?", a: "Jeremias", ref: "Jeremias 1:1" },
    { q: "Qual era o nome original de Isaías?", a: "Isaías", ref: "Isaías 1:1" },
    { q: "Qual era o nome original de Ezequiel?", a: "Ezequiel", ref: "Ezequiel 1:3" },
  ],
};

// Gerar questões com variações de dificuldade
function generateQuestions() {
  const generated: any[] = [];
  const difficulties = ["facil", "medio", "dificil"] as const;
  const gameTypes = ["quiz", "forca", "quem_sou_eu", "verdadeiro_ou_falso", "memoria"] as const;

  let categoryId = 1;
  let journeyId = 1;

  // Para cada categoria de questões
  Object.entries(biblicalQuestions).forEach(([category, items]) => {
    items.forEach((item, index) => {
      // Gerar 3-5 variações de cada questão (fácil, médio, difícil)
      difficulties.forEach((difficulty, diffIndex) => {
        const gameType = gameTypes[diffIndex % gameTypes.length];

        // Variação 1: Quiz direto
        generated.push({
          categoryId: categoryId + (index % 4),
          journeyId: journeyId,
          gameType: "quiz",
          difficulty: difficulty,
          question: item.q,
          answer: item.a,
          alternatives: JSON.stringify([
            item.a,
            `Resposta falsa ${index * 3 + 1}`,
            `Resposta falsa ${index * 3 + 2}`,
            `Resposta falsa ${index * 3 + 3}`,
          ]),
          bibleReference: item.ref,
        });

        // Variação 2: Verdadeiro ou Falso
        if (diffIndex === 0) {
          generated.push({
            categoryId: categoryId + (index % 4),
            journeyId: journeyId,
            gameType: "verdadeiro_ou_falso",
            difficulty: difficulty,
            question: item.q,
            answer: "VERDADEIRO",
            bibleReference: item.ref,
          });
        }

        // Variação 3: Forca (apenas resposta)
        if (diffIndex === 1) {
          generated.push({
            categoryId: categoryId + (index % 4),
            journeyId: journeyId,
            gameType: "forca",
            difficulty: difficulty,
            question: item.q.split("?")[0] + "?",
            answer: item.a.toUpperCase().replace(/\s+/g, ""),
            bibleReference: item.ref,
          });
        }
      });
    });

    categoryId++;
    if (categoryId > 16) categoryId = 1;
  });

  return generated;
}

const bulkQuestions = generateQuestions();

console.log(`\nInserindo ${bulkQuestions.length} questões em larga escala...`);

// Inserir em lotes para melhor performance
const batchSize = 100;
for (let i = 0; i < bulkQuestions.length; i += batchSize) {
  const batch = bulkQuestions.slice(i, i + batchSize);
  await db.insert(questions).values(batch);
  console.log(`✓ Lote ${Math.floor(i / batchSize) + 1} inserido (${batch.length} questões)`);
}

// Contar total
const result = await db.execute(`SELECT COUNT(*) as total FROM questions`);
const total = (result[0] as any)[0].total;

console.log(`\n✅ Banco de dados expandido com sucesso!`);
console.log(`Total de questões no banco: ${total}`);

await connection.end();
process.exit(0);
