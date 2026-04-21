// ─── QUIZ BÍBLICO ──────────────────────────────────────────────────────────────
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number; // index
  reference?: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  { id: 1, question: "Qual foi o primeiro livro da Bíblia?", options: ["Êxodo", "Gênesis", "Levítico", "Números"], correct: 1, reference: "Gênesis 1:1" },
  { id: 2, question: "Quantos dias Deus levou para criar o mundo?", options: ["5", "6", "7", "10"], correct: 1, reference: "Gênesis 1" },
  { id: 3, question: "Quem construiu a arca?", options: ["Moisés", "Abraão", "Noé", "Davi"], correct: 2, reference: "Gênesis 6:14" },
  { id: 4, question: "Qual era o nome da esposa de Abraão?", options: ["Rebeca", "Sara", "Raquel", "Lea"], correct: 1, reference: "Gênesis 11:29" },
  { id: 5, question: "Quantos filhos Jacó teve?", options: ["10", "11", "12", "13"], correct: 2, reference: "Gênesis 35:22" },
  { id: 6, question: "Quem foi vendido como escravo pelos seus irmãos?", options: ["Benjamim", "Ruben", "José", "Simeão"], correct: 2, reference: "Gênesis 37:28" },
  { id: 7, question: "Qual praga não foi enviada ao Egito?", options: ["Gafanhotos", "Trevas", "Neve", "Sapos"], correct: 2, reference: "Êxodo 7-12" },
  { id: 8, question: "Quantos mandamentos Deus deu a Moisés?", options: ["5", "7", "10", "12"], correct: 2, reference: "Êxodo 20" },
  { id: 9, question: "Qual rio Moisés foi colocado quando bebê?", options: ["Jordão", "Nilo", "Eufrates", "Tigre"], correct: 1, reference: "Êxodo 2:3" },
  { id: 10, question: "Quem era o pai de Davi?", options: ["Jessé", "Saul", "Samuel", "Boaz"], correct: 0, reference: "1 Samuel 16:1" },
  { id: 11, question: "Com o que Davi matou Golias?", options: ["Espada", "Lança", "Pedra e funda", "Arco e flecha"], correct: 2, reference: "1 Samuel 17:49" },
  { id: 12, question: "Qual foi o rei mais sábio de Israel?", options: ["Davi", "Salomão", "Saul", "Josias"], correct: 1, reference: "1 Reis 3:12" },
  { id: 13, question: "Quantos livros tem o Novo Testamento?", options: ["25", "27", "29", "31"], correct: 1, reference: "Cânon bíblico" },
  { id: 14, question: "Quem batizou Jesus?", options: ["Pedro", "Paulo", "João Batista", "Tiago"], correct: 2, reference: "Mateus 3:13" },
  { id: 15, question: "Em qual cidade Jesus nasceu?", options: ["Nazaré", "Jerusalém", "Belém", "Cafarnaum"], correct: 2, reference: "Lucas 2:4" },
  { id: 16, question: "Quantos discípulos Jesus escolheu?", options: ["7", "10", "12", "70"], correct: 2, reference: "Lucas 6:13" },
  { id: 17, question: "Qual foi o primeiro milagre de Jesus?", options: ["Cura de cego", "Ressurreição de Lázaro", "Água em vinho", "Multiplicação de pães"], correct: 2, reference: "João 2:1-11" },
  { id: 18, question: "Quem traiu Jesus por 30 moedas de prata?", options: ["Pedro", "Tomé", "Judas", "Filipe"], correct: 2, reference: "Mateus 26:15" },
  { id: 19, question: "Quantos dias Jesus ficou no sepulcro?", options: ["1", "2", "3", "7"], correct: 2, reference: "Mateus 12:40" },
  { id: 20, question: "Quem escreveu a maior parte das epístolas do NT?", options: ["Pedro", "João", "Paulo", "Tiago"], correct: 2, reference: "Novo Testamento" },
  { id: 21, question: "Qual é o versículo mais curto da Bíblia?", options: ["João 3:16", "João 11:35", "Salmos 23:1", "Provérbios 3:5"], correct: 1, reference: "João 11:35" },
  { id: 22, question: "Qual profeta foi engolido por um grande peixe?", options: ["Elias", "Eliseu", "Jonas", "Amós"], correct: 2, reference: "Jonas 1:17" },
  { id: 23, question: "Quantos livros tem a Bíblia no total?", options: ["60", "63", "66", "70"], correct: 2, reference: "Cânon bíblico" },
  { id: 24, question: "Quem foi o primeiro mártir cristão?", options: ["Pedro", "Paulo", "Estêvão", "Tiago"], correct: 2, reference: "Atos 7:59" },
  { id: 25, question: "Em qual monte Moisés recebeu os Dez Mandamentos?", options: ["Monte Sião", "Monte Carmelo", "Monte Sinai", "Monte das Oliveiras"], correct: 2, reference: "Êxodo 19:20" },
  { id: 26, question: "Qual era a profissão de Pedro antes de seguir Jesus?", options: ["Carpinteiro", "Pescador", "Cobrador de impostos", "Pastor"], correct: 1, reference: "Mateus 4:18" },
  { id: 27, question: "Qual era a profissão de Mateus antes de seguir Jesus?", options: ["Carpinteiro", "Pescador", "Cobrador de impostos", "Médico"], correct: 2, reference: "Mateus 9:9" },
  { id: 28, question: "Quem foi o primeiro rei de Israel?", options: ["Davi", "Salomão", "Saul", "Samuel"], correct: 2, reference: "1 Samuel 10:24" },
  { id: 29, question: "Qual é o livro mais longo da Bíblia?", options: ["Gênesis", "Isaías", "Salmos", "Jeremias"], correct: 2, reference: "Salmos - 150 capítulos" },
  { id: 30, question: "Quem escreveu o Apocalipse?", options: ["Paulo", "Pedro", "João", "Tiago"], correct: 2, reference: "Apocalipse 1:1" },
  { id: 31, question: "Qual mulher escondeu os espias de Josué em Jericó?", options: ["Débora", "Raabe", "Rute", "Ana"], correct: 1, reference: "Josué 2:1" },
  { id: 32, question: "Quem foi o juiz mais forte de Israel?", options: ["Gedeão", "Sansão", "Jefté", "Baraque"], correct: 1, reference: "Juízes 13-16" },
  { id: 33, question: "De qual tribo era o apóstolo Paulo?", options: ["Judá", "Levi", "Benjamim", "Efraim"], correct: 2, reference: "Filipenses 3:5" },
  { id: 34, question: "Qual é o primeiro mandamento?", options: ["Não matar", "Não roubar", "Não ter outros deuses", "Honrar pai e mãe"], correct: 2, reference: "Êxodo 20:3" },
  { id: 35, question: "Quem interpretou os sonhos do Faraó?", options: ["Moisés", "Abraão", "José", "Jacó"], correct: 2, reference: "Gênesis 41" },
  { id: 36, question: "Qual é o rio que Josué e os israelitas atravessaram a pé?", options: ["Nilo", "Eufrates", "Jordão", "Tigre"], correct: 2, reference: "Josué 3:17" },
  { id: 37, question: "Quem foi a mãe de Samuel?", options: ["Débora", "Ana", "Rute", "Noemi"], correct: 1, reference: "1 Samuel 1:20" },
  { id: 38, question: "Qual profeta desafiou os profetas de Baal no Monte Carmelo?", options: ["Eliseu", "Isaías", "Elias", "Jeremias"], correct: 2, reference: "1 Reis 18:19" },
  { id: 39, question: "Qual rei mandou construir o Templo de Jerusalém?", options: ["Davi", "Salomão", "Josias", "Ezequias"], correct: 1, reference: "1 Reis 6:1" },
  { id: 40, question: "Quem foi lançado na cova dos leões?", options: ["Elias", "Ezequiel", "Daniel", "Jeremias"], correct: 2, reference: "Daniel 6:16" },
  { id: 41, question: "Qual era o nome do monte onde Jesus foi crucificado?", options: ["Monte Sião", "Calvário", "Monte das Oliveiras", "Monte Carmelo"], correct: 1, reference: "Marcos 15:22" },
  { id: 42, question: "Quantas vezes Pedro negou Jesus?", options: ["Uma", "Duas", "Três", "Quatro"], correct: 2, reference: "Mateus 26:34" },
  { id: 43, question: "Qual era a profissão de Zaqueu?", options: ["Pescador", "Cobrador de impostos", "Soldado", "Carpinteiro"], correct: 1, reference: "Lucas 19:2" },
  { id: 44, question: "Quantos pães e peixes Jesus usou para alimentar a multidão?", options: ["2 pães e 3 peixes", "3 pães e 5 peixes", "5 pães e 2 peixes", "7 pães e 4 peixes"], correct: 2, reference: "Mateus 14:17" },
  { id: 45, question: "Qual apóstolo era gêmeo?", options: ["Tiago", "Tomé", "Simão", "Filipe"], correct: 1, reference: "João 11:16" },
  { id: 46, question: "Quem foi a primeira pessoa a ver Jesus ressuscitado?", options: ["Maria Madalena", "Pedro", "João", "Tiago"], correct: 0, reference: "João 20:14" },
  { id: 47, question: "Qual era o nome do demônio que possuía o homem de Gerasa?", options: ["Belzebu", "Legião", "Satã", "Abadão"], correct: 1, reference: "Marcos 5:9" },
  { id: 48, question: "Quantos anos Metusalém viveu?", options: ["800", "900", "969", "1000"], correct: 2, reference: "Gênesis 5:27" },
  { id: 49, question: "Qual era o nome da mãe de Jesus?", options: ["Maria Madalena", "Maria de Betânia", "Maria", "Joana"], correct: 2, reference: "Lucas 1:27" },
  { id: 50, question: "Quantos livros tem o Antigo Testamento?", options: ["36", "37", "38", "39"], correct: 3, reference: "Cânon bíblico" },
  { id: 51, question: "Qual profeta foi alimentado por corvos no deserto?", options: ["Eliseu", "Elias", "Amós", "Obadias"], correct: 1, reference: "1 Reis 17:4" },
  { id: 52, question: "Qual era o nome do servo de Abraão que foi enviado para encontrar esposa para Isaque?", options: ["Eleazar", "Eliezer", "Enoque", "Esaú"], correct: 1, reference: "Gênesis 24:2" },
  { id: 53, question: "Quantos anos Noé tinha quando começou a chover?", options: ["500", "550", "600", "650"], correct: 2, reference: "Gênesis 7:6" },
  { id: 54, question: "Qual era o nome do rei que tentou matar Jesus quando bebê?", options: ["Herodes", "Pilatos", "Caifás", "Arquelau"], correct: 0, reference: "Mateus 2:13" },
  { id: 55, question: "Quantos dias levou para reconstruir a muralha de Jerusalém?", options: ["30", "40", "52", "60"], correct: 2, reference: "Neemias 6:15" },
  { id: 56, question: "Qual era o nome da mulher que ungiu os pés de Jesus com perfume?", options: ["Maria de Betânia", "Maria Madalena", "Joana", "Susana"], correct: 0, reference: "João 11:2" },
  { id: 57, question: "Quantos filhos Abraão teve?", options: ["Um", "Dois", "Três", "Quatro"], correct: 1, reference: "Gênesis 21:2-3, 16:15" },
  { id: 58, question: "Qual era o nome do anjo que anunciou o nascimento de Jesus?", options: ["Miguel", "Gabriel", "Rafael", "Uriel"], correct: 1, reference: "Lucas 1:26" },
  { id: 59, question: "Quantos salmos tem o livro de Salmos?", options: ["100", "120", "150", "200"], correct: 2, reference: "Salmos 150:6" },
  { id: 60, question: "Qual era o nome do discípulo que traiu Jesus?", options: ["Judas Tadeu", "Judas Iscariotes", "Judas Barsabás", "Judas de Damasco"], correct: 1, reference: "Mateus 10:4" },
  { id: 61, question: "Quantos milagres Jesus realizou segundo os Evangelhos?", options: ["Cerca de 20", "Cerca de 35", "Cerca de 50", "Mais de 100"], correct: 2, reference: "João 21:25" },
  { id: 62, question: "Qual era o nome do lago onde Jesus acalmou a tempestade?", options: ["Mar Morto", "Mar Mediterrâneo", "Mar da Galileia", "Rio Jordão"], correct: 2, reference: "Marcos 4:35" },
  { id: 63, question: "Quantas cartas Paulo escreveu que estão na Bíblia?", options: ["10", "12", "14", "16"], correct: 2, reference: "Novo Testamento" },
  { id: 64, question: "Qual era o nome do centurião que reconheceu Jesus como Filho de Deus?", options: ["Cornélio", "Longino", "Gaio", "Marcos"], correct: 1, reference: "Marcos 15:39" },
  { id: 65, question: "Quantos anos Jesus tinha quando começou seu ministério?", options: ["25", "30", "35", "40"], correct: 1, reference: "Lucas 3:23" },
  { id: 66, question: "Qual era o nome da cidade onde Paulo nasceu?", options: ["Jerusalém", "Tarso", "Antioquia", "Éfeso"], correct: 1, reference: "Atos 21:39" },
  { id: 67, question: "Quantos livros tem o Novo Testamento?", options: ["25", "27", "29", "31"], correct: 1, reference: "Cânon bíblico" },
  { id: 68, question: "Qual era o nome do rei que se arrependeu após a repreensão do profeta Natã?", options: ["Saul", "Davi", "Salomão", "Josias"], correct: 1, reference: "2 Samuel 12" },
  { id: 69, question: "Quantas vezes Jesus disse para perdoar?", options: ["Sete", "Setenta vezes sete", "Cem", "Mil"], correct: 1, reference: "Mateus 18:22" },
  { id: 70, question: "Qual era o nome do homem que foi ressuscitado por Jesus?", options: ["Lázaro", "Jairo", "Simão", "Zaqueu"], correct: 0, reference: "João 11:43" },
  { id: 71, question: "Quantos anos Israel perambulou no deserto?", options: ["30", "35", "40", "50"], correct: 2, reference: "Números 14:33" },
  { id: 72, question: "Qual era o nome do monte onde Deus falou com Moisés?", options: ["Monte Carmelo", "Monte Sinai", "Monte Sião", "Monte das Oliveiras"], correct: 1, reference: "Êxodo 19:20" },
  { id: 73, question: "Quantas pragas Deus enviou ao Egito?", options: ["7", "8", "9", "10"], correct: 3, reference: "Êxodo 7-12" },
  { id: 74, question: "Qual era o nome da mulher que foi transformada em estátua de sal?", options: ["Eva", "Lot", "A esposa de Lot", "Noemi"], correct: 2, reference: "Gênesis 19:26" },
  { id: 75, question: "Quantos anos Adão viveu?", options: ["800", "900", "930", "1000"], correct: 2, reference: "Gênesis 5:5" },
  { id: 76, question: "Qual era o nome do profeta que foi levado ao céu sem morrer?", options: ["Elias", "Enoque", "Moisés", "Ambos A e B"], correct: 3, reference: "2 Reis 2:11, Gênesis 5:24" },
  { id: 77, question: "Quantas tribos de Israel havia?", options: ["10", "11", "12", "13"], correct: 2, reference: "Gênesis 49" },
  { id: 78, question: "Qual era o nome do rei que construiu o Templo?", options: ["Davi", "Salomão", "Ezequias", "Josias"], correct: 1, reference: "1 Reis 6:1" },
  { id: 79, question: "Quantas vezes Jesus apareceu após sua ressurreição?", options: ["5", "10", "Mais de 10", "Não está registrado"], correct: 2, reference: "1 Coríntios 15:5-8" },
  { id: 80, question: "Qual era o nome do discípulo que duvidou da ressurreição?", options: ["Pedro", "Tomé", "Tiago", "João"], correct: 1, reference: "João 20:24-25" },
];

// ─── VERDADEIRO OU FALSO ───────────────────────────────────────────────────────
export interface TrueFalseQuestion {
  id: number;
  statement: string;
  answer: boolean;
  explanation: string;
  reference?: string;
}

export const TRUE_FALSE_QUESTIONS: TrueFalseQuestion[] = [
  { id: 1, statement: "Adão e Eva foram criados no sexto dia.", answer: true, explanation: "Deus criou o homem e a mulher no sexto dia da criação.", reference: "Gênesis 1:27-31" },
  { id: 2, statement: "Noé tinha 500 anos quando construiu a arca.", answer: false, explanation: "Noé tinha 600 anos quando o dilúvio começou. A arca foi construída antes disso.", reference: "Gênesis 7:6" },
  { id: 3, statement: "Jesus nasceu em Nazaré.", answer: false, explanation: "Jesus nasceu em Belém, mas foi criado em Nazaré.", reference: "Lucas 2:4-7" },
  { id: 4, statement: "O Salmo 23 foi escrito por Davi.", answer: true, explanation: "O Salmo 23 é um dos mais famosos salmos de Davi, começando com 'O Senhor é o meu pastor'.", reference: "Salmos 23:1" },
  { id: 5, statement: "Paulo foi um dos 12 apóstolos originais de Jesus.", answer: false, explanation: "Paulo não foi um dos 12 apóstolos originais. Ele se tornou apóstolo após a ressurreição de Jesus.", reference: "Atos 9:1-19" },
  { id: 6, statement: "Jonas ficou 3 dias e 3 noites dentro do peixe.", answer: true, explanation: "Jonas ficou três dias e três noites no ventre do grande peixe.", reference: "Jonas 1:17" },
  { id: 7, statement: "Moisés entrou na Terra Prometida.", answer: false, explanation: "Moisés viu a Terra Prometida do Monte Nebo, mas não entrou nela. Josué liderou o povo para dentro.", reference: "Deuteronômio 34:4-5" },
  { id: 8, statement: "O livro de Apocalipse foi escrito por João.", answer: true, explanation: "O Apocalipse foi escrito pelo apóstolo João enquanto estava exilado na ilha de Patmos.", reference: "Apocalipse 1:9" },
  { id: 9, statement: "Salomão tinha 700 esposas.", answer: true, explanation: "Salomão tinha 700 esposas princesas e 300 concubinas.", reference: "1 Reis 11:3" },
  { id: 10, statement: "Elias foi levado ao céu em um carro de fogo.", answer: true, explanation: "Elias foi arrebatado ao céu em um redemoinho, com um carro de fogo e cavalos de fogo.", reference: "2 Reis 2:11" },
  { id: 11, statement: "A Última Ceia foi uma celebração da Páscoa judaica.", answer: true, explanation: "A Última Ceia foi uma refeição pascal (Seder) que Jesus celebrou com seus discípulos.", reference: "Lucas 22:15" },
  { id: 12, statement: "Pedro negou Jesus duas vezes.", answer: false, explanation: "Pedro negou Jesus três vezes, conforme Jesus havia profetizado.", reference: "Mateus 26:75" },
  { id: 13, statement: "O Espírito Santo desceu sobre os discípulos no dia de Pentecostes.", answer: true, explanation: "No dia de Pentecostes, o Espírito Santo desceu sobre os discípulos como línguas de fogo.", reference: "Atos 2:1-4" },
  { id: 14, statement: "Abraão tinha 75 anos quando saiu de Harã.", answer: true, explanation: "Abraão tinha 75 anos quando partiu de Harã para a terra que Deus lhe mostraria.", reference: "Gênesis 12:4" },
  { id: 15, statement: "Davi era o filho mais velho de Jessé.", answer: false, explanation: "Davi era o filho mais novo de Jessé, o oitavo filho.", reference: "1 Samuel 16:10-11" },
  { id: 16, statement: "A Bíblia menciona que a maçã foi o fruto proibido.", answer: false, explanation: "A Bíblia não especifica qual era o fruto proibido. Apenas diz 'fruto da árvore'.", reference: "Gênesis 3:3" },
  { id: 17, statement: "Jesus realizou seu primeiro milagre em Caná da Galileia.", answer: true, explanation: "O primeiro milagre de Jesus foi transformar água em vinho em uma festa de casamento em Caná.", reference: "João 2:1-11" },
  { id: 18, statement: "Rute era israelita.", answer: false, explanation: "Rute era moabita, não israelita. Ela escolheu seguir sua sogra Noemi para Israel.", reference: "Rute 1:4" },
  { id: 19, statement: "Paulo escreveu o livro de Hebreus.", answer: false, explanation: "A autoria de Hebreus é incerta. Embora alguns atribuam a Paulo, isso é debatido entre estudiosos.", reference: "Hebreus 1:1" },
  { id: 20, statement: "Jesus foi tentado no deserto por 40 dias.", answer: true, explanation: "Após seu batismo, Jesus foi levado pelo Espírito ao deserto, onde foi tentado por 40 dias.", reference: "Mateus 4:1-2" },
];

// ─── QUEM SOU EU? ──────────────────────────────────────────────────────────────
export interface WhoAmIQuestion {
  id: number;
  hints: string[];
  answer: string;
  reference?: string;
}

export const WHO_AM_I_QUESTIONS: WhoAmIQuestion[] = [
  {
    id: 1,
    hints: [
      "Fui o primeiro homem criado por Deus.",
      "Vivi no Jardim do Éden.",
      "Minha companheira foi criada de uma das minhas costelas.",
      "Desobedeci a Deus comendo o fruto proibido.",
    ],
    answer: "Adão",
    reference: "Gênesis 2-3",
  },
  {
    id: 2,
    hints: [
      "Construí uma grande embarcação por ordem de Deus.",
      "Salvei minha família e animais de um grande dilúvio.",
      "Tinha 600 anos quando as águas vieram sobre a terra.",
      "Após o dilúvio, Deus fez uma aliança comigo usando um arco-íris.",
    ],
    answer: "Noé",
    reference: "Gênesis 6-9",
  },
  {
    id: 3,
    hints: [
      "Fui chamado 'o pai da fé'.",
      "Deus me pediu para sacrificar meu filho.",
      "Saí de Ur dos Caldeus por ordem de Deus.",
      "Meu nome original era Abrão.",
    ],
    answer: "Abraão",
    reference: "Gênesis 12-22",
  },
  {
    id: 4,
    hints: [
      "Fui vendido como escravo pelos meus irmãos.",
      "Interpretei sonhos no Egito.",
      "Me tornei o segundo homem mais poderoso do Egito.",
      "Meu pai me deu uma túnica de muitas cores.",
    ],
    answer: "José",
    reference: "Gênesis 37-50",
  },
  {
    id: 5,
    hints: [
      "Fui encontrado em um cesto no rio Nilo.",
      "Liderei o povo de Israel para fora do Egito.",
      "Recebi os Dez Mandamentos no Monte Sinai.",
      "Deus falou comigo através de uma sarça ardente.",
    ],
    answer: "Moisés",
    reference: "Êxodo 2-40",
  },
  {
    id: 6,
    hints: [
      "Era pastor de ovelhas antes de ser ungido rei.",
      "Matei um gigante com uma pedra e uma funda.",
      "Escrevi muitos salmos.",
      "Fui chamado 'homem segundo o coração de Deus'.",
    ],
    answer: "Davi",
    reference: "1 Samuel 16 - 1 Reis 2",
  },
  {
    id: 7,
    hints: [
      "Fui o rei mais sábio que já existiu.",
      "Construí o primeiro Templo de Jerusalém.",
      "Pedi a Deus sabedoria em vez de riquezas.",
      "Escrevi Provérbios, Eclesiastes e Cantares.",
    ],
    answer: "Salomão",
    reference: "1 Reis 1-11",
  },
  {
    id: 8,
    hints: [
      "Fui um profeta que desafiou os profetas de Baal.",
      "Fui alimentado por corvos no deserto.",
      "Fui levado ao céu em um carro de fogo.",
      "Meu discípulo foi Eliseu.",
    ],
    answer: "Elias",
    reference: "1 Reis 17-2 Reis 2",
  },
  {
    id: 9,
    hints: [
      "Fui lançado na cova dos leões por orar a Deus.",
      "Deus fechou a boca dos leões e não fui ferido.",
      "Servi como conselheiro de vários reis babilônicos.",
      "Interpretei sonhos e visões proféticas.",
    ],
    answer: "Daniel",
    reference: "Daniel 6",
  },
  {
    id: 10,
    hints: [
      "Fui um pescador antes de seguir Jesus.",
      "Jesus me chamou de 'rocha'.",
      "Neguei Jesus três vezes.",
      "Fui o primeiro a pregar no dia de Pentecostes.",
    ],
    answer: "Pedro",
    reference: "Mateus 4:18; Atos 2",
  },
];

// ─── FORCA BÍBLICA ─────────────────────────────────────────────────────────────
export interface HangmanWord {
  word: string;
  hint: string;
  category: string;
}

export const HANGMAN_WORDS: HangmanWord[] = [
  { word: "GENESIS", hint: "Primeiro livro da Bíblia", category: "Livros" },
  { word: "EXODO", hint: "Livro da saída do Egito", category: "Livros" },
  { word: "LEVITICO", hint: "Livro sobre leis de Israel", category: "Livros" },
  { word: "NUMEROS", hint: "Livro do censo de Israel", category: "Livros" },
  { word: "DEUTERONOMIO", hint: "Livro da segunda lei", category: "Livros" },
  { word: "JOSUE", hint: "Livro da conquista de Canaã", category: "Livros" },
  { word: "JUIZES", hint: "Livro dos juízes de Israel", category: "Livros" },
  { word: "RUTE", hint: "Livro de amor e redenção", category: "Livros" },
  { word: "SAMUEL", hint: "Livro sobre o profeta Samuel", category: "Livros" },
  { word: "REIS", hint: "Livro dos reis de Israel", category: "Livros" },
  { word: "CRONICAS", hint: "Livro de história de Israel", category: "Livros" },
  { word: "ESDRAS", hint: "Livro do retorno do exílio", category: "Livros" },
  { word: "NEEMIAS", hint: "Livro da reconstrução de Jerusalém", category: "Livros" },
  { word: "JO", hint: "Livro sobre sofrimento e fé", category: "Livros" },
  { word: "SALMOS", hint: "Livro de louvores e orações", category: "Livros" },
  { word: "PROVERBIOS", hint: "Livro da sabedoria de Salomão", category: "Livros" },
  { word: "ECLESIASTES", hint: "Livro sobre a vida sob o sol", category: "Livros" },
  { word: "CANTARES", hint: "Livro de poesia de amor", category: "Livros" },
  { word: "ISAIAS", hint: "Profeta que profetizou sobre Jesus", category: "Livros" },
  { word: "JEREMIAS", hint: "Profeta do choro", category: "Livros" },
  { word: "LAMENTACOES", hint: "Livro de lamentos de Jeremias", category: "Livros" },
  { word: "EZEQUIEL", hint: "Profeta das visões", category: "Livros" },
  { word: "DANIEL", hint: "Profeta no exílio babilônico", category: "Livros" },
  { word: "OSEIAS", hint: "Profeta do amor de Deus", category: "Livros" },
  { word: "JOEL", hint: "Profeta do derramamento do Espírito", category: "Livros" },
  { word: "AMOS", hint: "Profeta da justiça", category: "Livros" },
  { word: "OBADIAS", hint: "Profeta mais curto da Bíblia", category: "Livros" },
  { word: "JONAS", hint: "Profeta engolido por peixe", category: "Livros" },
  { word: "MIQUEIAS", hint: "Profeta sobre o julgamento", category: "Livros" },
  { word: "NAUM", hint: "Profeta sobre Nínive", category: "Livros" },
  { word: "HABACUQUE", hint: "Profeta que questionou Deus", category: "Livros" },
  { word: "SOFONIAS", hint: "Profeta do dia do Senhor", category: "Livros" },
  { word: "AGEU", hint: "Profeta da reconstrução do Templo", category: "Livros" },
  { word: "ZACARIAS", hint: "Profeta de esperança", category: "Livros" },
  { word: "MALAQUIAS", hint: "Último profeta do Antigo Testamento", category: "Livros" },
  { word: "MATEUS", hint: "Evangelho para os judeus", category: "Livros" },
  { word: "MARCOS", hint: "Evangelho mais curto", category: "Livros" },
  { word: "LUCAS", hint: "Evangelho detalhado", category: "Livros" },
  { word: "JOAO", hint: "Evangelho espiritual", category: "Livros" },
  { word: "ATOS", hint: "Livro dos apóstolos", category: "Livros" },
  { word: "ROMANOS", hint: "Carta sobre a fé", category: "Livros" },
  { word: "CORINTIOS", hint: "Cartas sobre problemas da igreja", category: "Livros" },
  { word: "GALATAS", hint: "Carta sobre a liberdade cristã", category: "Livros" },
  { word: "EFESIOS", hint: "Carta sobre a Igreja", category: "Livros" },
  { word: "FILIPENSES", hint: "Carta de alegria", category: "Livros" },
  { word: "COLOSSENSES", hint: "Carta sobre Cristo", category: "Livros" },
  { word: "TESSALONICENSES", hint: "Cartas sobre a volta de Cristo", category: "Livros" },
  { word: "TIMOTEO", hint: "Cartas pastorais", category: "Livros" },
  { word: "TITO", hint: "Carta pastoral", category: "Livros" },
  { word: "FILEMOM", hint: "Carta pessoal", category: "Livros" },
  { word: "HEBREUS", hint: "Carta sobre Cristo e a Lei", category: "Livros" },
  { word: "TIAGO", hint: "Carta sobre a fé e obras", category: "Livros" },
  { word: "PEDRO", hint: "Cartas sobre sofrimento", category: "Livros" },
  { word: "APOCALIPSE", hint: "Último livro da Bíblia", category: "Livros" },
  { word: "ABRAAO", hint: "Pai da fé", category: "Personagens" },
  { word: "SARA", hint: "Esposa de Abraão", category: "Personagens" },
  { word: "ISAQUE", hint: "Filho de Abraão", category: "Personagens" },
  { word: "JACO", hint: "Pai das doze tribos", category: "Personagens" },
  { word: "RAQUEL", hint: "Esposa de Jacó", category: "Personagens" },
  { word: "LEA", hint: "Primeira esposa de Jacó", category: "Personagens" },
  { word: "JOSE", hint: "Vendido pelos irmãos", category: "Personagens" },
  { word: "BENJAMIN", hint: "Filho mais novo de Jacó", category: "Personagens" },
  { word: "MOISES", hint: "Libertador de Israel", category: "Personagens" },
  { word: "ARAO", hint: "Irmão de Moisés", category: "Personagens" },
  { word: "MIRIAM", hint: "Irmã de Moisés", category: "Personagens" },
  { word: "DAVI", hint: "Rei pastor que matou Golias", category: "Personagens" },
  { word: "SALOMAO", hint: "Rei mais sábio de Israel", category: "Personagens" },
  { word: "ELIAS", hint: "Profeta levado ao céu em carro de fogo", category: "Personagens" },
  { word: "ELISEU", hint: "Discípulo de Elias", category: "Personagens" },
  { word: "SANSAO", hint: "Juiz conhecido por sua força", category: "Personagens" },
  { word: "DALILA", hint: "Mulher que traiu Sansão", category: "Personagens" },
  { word: "DEBORA", hint: "Juíza e profetisa de Israel", category: "Personagens" },
  { word: "GIDEAO", hint: "Juiz que derrotou os midianitas", category: "Personagens" },
  { word: "SAMUEL", hint: "Profeta que ungiu Davi", category: "Personagens" },
  { word: "SAUL", hint: "Primeiro rei de Israel", category: "Personagens" },
  { word: "RAABE", hint: "Prostituta que escondeu os espias", category: "Personagens" },
  { word: "NOEMI", hint: "Sogra de Rute", category: "Personagens" },
  { word: "BOAZ", hint: "Marido de Rute", category: "Personagens" },
  { word: "MARIA", hint: "Mãe de Jesus", category: "Personagens" },
  { word: "JESUS", hint: "Salvador do mundo", category: "Personagens" },
  { word: "PAULO", hint: "Apóstolo dos gentios", category: "Personagens" },
  { word: "JUDAS", hint: "Traiu Jesus por 30 moedas", category: "Personagens" },
  { word: "TIAGO", hint: "Apóstolo e irmão de João", category: "Personagens" },
  { word: "ANDRE", hint: "Apóstolo e irmão de Pedro", category: "Personagens" },
  { word: "FILIPE", hint: "Um dos 12 apóstolos", category: "Personagens" },
  { word: "BARTOLOMEU", hint: "Apóstolo também chamado Natanael", category: "Personagens" },
  { word: "TOME", hint: "Apóstolo que duvidou", category: "Personagens" },
  { word: "JOAO", hint: "Discípulo amado de Jesus", category: "Personagens" },
  { word: "JERUSALEM", hint: "Cidade santa de Israel", category: "Lugares" },
  { word: "BELEM", hint: "Cidade onde Jesus nasceu", category: "Lugares" },
  { word: "NAZARE", hint: "Cidade onde Jesus cresceu", category: "Lugares" },
  { word: "EGITO", hint: "País onde Israel foi escravo", category: "Lugares" },
  { word: "JORDAO", hint: "Rio onde Jesus foi batizado", category: "Lugares" },
  { word: "SINAI", hint: "Monte onde Moisés recebeu os mandamentos", category: "Lugares" },
  { word: "CALVARIO", hint: "Local onde Jesus foi crucificado", category: "Lugares" },
  { word: "EDEN", hint: "Jardim onde Adão e Eva viviam", category: "Lugares" },
  { word: "BABILONIA", hint: "Império que levou Israel ao cativeiro", category: "Lugares" },
  { word: "GALILEIA", hint: "Região onde Jesus realizou muitos milagres", category: "Lugares" },
  { word: "JERICO", hint: "Cidade cuja muralha caiu", category: "Lugares" },
  { word: "ANTIOQUIA", hint: "Cidade onde os discípulos foram chamados cristãos", category: "Lugares" },
  { word: "CORINTO", hint: "Cidade onde Paulo pregou", category: "Lugares" },
  { word: "EFESO", hint: "Cidade onde Paulo passou tempo", category: "Lugares" },
  { word: "ROMA", hint: "Capital do Império Romano", category: "Lugares" },
  { word: "ATENAS", hint: "Cidade onde Paulo pregou no Areópago", category: "Lugares" },
  { word: "PATMOS", hint: "Ilha onde João recebeu o Apocalipse", category: "Lugares" },
  { word: "CAFARNAUM", hint: "Cidade onde Jesus baseou seu ministério", category: "Lugares" },
  { word: "SAMARIA", hint: "Região entre Judeia e Galileia", category: "Lugares" },
  { word: "BATISMO", hint: "Sacramento de iniciação cristã", category: "Conceitos" },
  { word: "RESSURREICAO", hint: "Jesus voltou à vida no terceiro dia", category: "Conceitos" },
  { word: "PENTECOSTES", hint: "Dia em que o Espírito Santo desceu", category: "Conceitos" },
  { word: "ALIANCA", hint: "Pacto entre Deus e seu povo", category: "Conceitos" },
  { word: "PROFECIA", hint: "Mensagem divina sobre o futuro", category: "Conceitos" },
  { word: "TABERNACULO", hint: "Santuário portátil de Israel no deserto", category: "Conceitos" },
  { word: "MILAGRE", hint: "Ato sobrenatural de Deus", category: "Conceitos" },
  { word: "EVANGELHO", hint: "Boas novas de Jesus Cristo", category: "Conceitos" },
  { word: "APOSTOLO", hint: "Enviado por Jesus para pregar", category: "Conceitos" },
  { word: "PROFETA", hint: "Mensageiro de Deus", category: "Conceitos" },
  { word: "TEMPLO", hint: "Casa de Deus em Jerusalém", category: "Conceitos" },
  { word: "SINAGOGA", hint: "Lugar de adoração judaica", category: "Conceitos" },
  { word: "SACRIFICIO", hint: "Oferenda a Deus no Templo", category: "Conceitos" },
  { word: "REDENÇÃO", hint: "Salvação através de Jesus", category: "Conceitos" },
  { word: "GRAÇA", hint: "Favor imerecido de Deus", category: "Conceitos" },
  { word: "AMOR", hint: "Maior mandamento de Jesus", category: "Conceitos" },
  { word: "PERDÃO", hint: "Libertação da culpa", category: "Conceitos" },
  { word: "ARREPENDIMENTO", hint: "Mudança de mente e coração", category: "Conceitos" },
  { word: "ORAÇÃO", hint: "Comunicação com Deus", category: "Conceitos" },
  { word: "JEJUM", hint: "Abstinência de comida por devoção", category: "Conceitos" },
  { word: "ADORAÇÃO", hint: "Reverência a Deus", category: "Conceitos" },
];

// ─── MEMÓRIA BÍBLICA ───────────────────────────────────────────────────────────
export interface MemoryCard {
  id: string;
  content: string;
  emoji: string;
  pair: string;
}

export const MEMORY_PAIRS = [
  { id: "abraao", name: "Abraão", emoji: "👴", pair: "Sara" },
  { id: "sara", name: "Sara", emoji: "👵", pair: "Abraão" },
  { id: "moises", name: "Moisés", emoji: "🏔️", pair: "Faraó" },
  { id: "farao", name: "Faraó", emoji: "👑", pair: "Moisés" },
  { id: "davi", name: "Davi", emoji: "🎵", pair: "Golias" },
  { id: "golias", name: "Golias", emoji: "⚔️", pair: "Davi" },
  { id: "jesus", name: "Jesus", emoji: "✝️", pair: "João Batista" },
  { id: "joao-batista", name: "João Batista", emoji: "💧", pair: "Jesus" },
  { id: "pedro", name: "Pedro", emoji: "🐟", pair: "Paulo" },
  { id: "paulo", name: "Paulo", emoji: "✉️", pair: "Pedro" },
  { id: "maria", name: "Maria", emoji: "🌹", pair: "José (pai)" },
  { id: "jose-pai", name: "José (pai)", emoji: "🔨", pair: "Maria" },
];

// ─── ORDEM CRONOLÓGICA ─────────────────────────────────────────────────────────
export interface ChronologicalSet {
  id: number;
  title: string;
  events: string[];
  correctOrder: number[]; // índices na ordem correta
}

export const CHRONOLOGICAL_SETS: ChronologicalSet[] = [
  {
    id: 1,
    title: "A Criação",
    events: ["Criação da luz", "Criação do firmamento", "Criação das plantas", "Criação do homem"],
    correctOrder: [0, 1, 2, 3],
  },
  {
    id: 2,
    title: "Vida de Moisés",
    events: ["Nascimento de Moisés", "Sarça ardente", "Pragas no Egito", "Travessia do Mar Vermelho"],
    correctOrder: [0, 1, 2, 3],
  },
  {
    id: 3,
    title: "Vida de Jesus",
    events: ["Nascimento em Belém", "Batismo no Jordão", "Crucificação", "Ressurreição"],
    correctOrder: [0, 1, 2, 3],
  },
  {
    id: 4,
    title: "Igreja Primitiva",
    events: ["Ascensão de Jesus", "Pentecostes", "Morte de Estêvão", "Conversão de Paulo"],
    correctOrder: [0, 1, 2, 3],
  },
];

// ─── CAÇA-PALAVRAS ─────────────────────────────────────────────────────────────
export interface WordSearchTheme {
  id: string;
  title: string;
  words: string[];
}

export const WORD_SEARCH_THEMES: WordSearchTheme[] = [
  {
    id: "apostolos",
    title: "Os 12 Apóstolos",
    words: ["PEDRO", "ANDRE", "TIAGO", "JOAO", "FILIPE", "BARTOLOMEU", "MATEUS", "TOME", "TIAGOALFEU", "TADEU", "SIMAO", "JUDAS"],
  },
  {
    id: "profetas",
    title: "Profetas de Israel",
    words: ["ISAIAS", "JEREMIAS", "EZEQUIEL", "DANIEL", "OSEIAS", "JOEL", "AMOS", "JONAS", "MIQUEAS"],
  },
  {
    id: "milagres",
    title: "Milagres de Jesus",
    words: ["CURA", "RESSURREICAO", "MULTIPLICACAO", "TEMPESTADE", "CEGO", "LEPROSO", "AGUA", "VINHO"],
  },
  {
    id: "lugares",
    title: "Lugares Sagrados",
    words: ["JERUSALEM", "BELEM", "NAZARE", "JORDAO", "SINAI", "EDEN", "CALVARIO", "GALILAIA"],
  },
  {
    id: "livros-at",
    title: "Livros do Antigo Testamento",
    words: ["GENESIS", "EXODO", "LEVITICO", "NUMEROS", "DEUTERONOMIO", "JOSUE", "JUIZES", "RUTE", "SAMUEL", "REIS", "CRONICAS", "ESDRAS", "NEEMIAS", "ESTER", "JO", "SALMOS", "PROVERBIOS", "ECLESIASTES", "CANTARES", "ISAIAS", "JEREMIAS", "LAMENTACOES", "EZEQUIEL", "DANIEL", "OSEIAS", "JOEL", "AMOS", "OBADIAS", "JONAS", "MIQUEAS", "NAUM", "HABACUQUE", "SOFONIAS", "AGEU", "ZACARIAS", "MALAQUIAS"],
  },
  {
    id: "livros-nt",
    title: "Livros do Novo Testamento",
    words: ["MATEUS", "MARCOS", "LUCAS", "JOAO", "ATOS", "ROMANOS", "HEBREUS", "APOCALIPSE"],
  },
];

// ─── PALAVRAS CRUZADAS ─────────────────────────────────────────────────────────
export interface CrosswordClue {
  number: number;
  direction: "across" | "down";
  clue: string;
  answer: string;
  row: number;
  col: number;
}

export const CROSSWORD_CLUES: CrosswordClue[] = [
  { number: 1, direction: "across", clue: "Primeiro livro da Bíblia (Gn 1:1)", answer: "GENESIS", row: 0, col: 0 },
  { number: 2, direction: "down", clue: "Rei que matou Golias (1Sm 17)", answer: "DAVI", row: 0, col: 3 },
  { number: 3, direction: "across", clue: "Profeta engolido por peixe (Jn 1:17)", answer: "JONAS", row: 2, col: 1 },
  { number: 4, direction: "down", clue: "Mãe de Jesus (Lc 1:31)", answer: "MARIA", row: 1, col: 6 },
  { number: 5, direction: "across", clue: "Apóstolo dos gentios (At 9)", answer: "PAULO", row: 4, col: 0 },
];
