import { useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, CheckCircle, XCircle, Clock } from "lucide-react";
import PremiumGate from "@/components/PremiumGate";

function QuizGameContent() {
  const [match, params] = useRoute("/quiz/:journeyId/:categoryId");
  const [, setLocation] = useLocation();

  const journeyId = params?.journeyId ? parseInt(params.journeyId) : null;
  const categoryId = params?.categoryId ? parseInt(params.categoryId) : null;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [gameFinished, setGameFinished] = useState(false);

  const { data: questions, isLoading } = trpc.games.getQuestions.useQuery(
    {
      gameType: "quiz",
      journeyId: journeyId || undefined,
      categoryId: categoryId || undefined,
      limit: 10,
    },
    { enabled: !!journeyId && !!categoryId }
  );

  // Timer
  useEffect(() => {
    if (!gameFinished && answered) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeUp();
          return 20;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameFinished, answered]);

  const handleTimeUp = () => {
    if (!answered && questions && currentQuestionIndex < questions.length) {
      setAnswered(true);
    }
  };

  const handleAnswer = (answer: string) => {
    if (answered) return;

    setSelectedAnswer(answer);
    setAnswered(true);

    const currentQuestion = questions?.[currentQuestionIndex];
    if (currentQuestion && answer === currentQuestion.answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (!questions) return;

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setAnswered(false);
      setTimeLeft(20);
    } else {
      setGameFinished(true);
    }
  };

  if (!match || !journeyId || !categoryId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Jornada ou categoria inválida</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-parchment to-parchment-dark">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-gold" />
          <p className="text-leather-dark text-lg font-serif">Carregando Quiz...</p>
        </div>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-parchment to-parchment-dark">
        <Card className="p-8 border-2 border-gold bg-parchment-light">
          <p className="text-leather-dark text-center mb-4">Nenhuma questão disponível</p>
          <Button onClick={() => setLocation("/journeys")} className="w-full bg-gold text-leather-dark">
            Voltar
          </Button>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const alternatives = JSON.parse(currentQuestion.alternatives || "[]");
  const isCorrect = selectedAnswer === currentQuestion.answer;

  if (gameFinished) {
    const percentage = (score / questions.length) * 100;
    const passed = percentage >= 60;

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-parchment to-parchment-dark p-4">
        <Card className="max-w-md w-full p-8 border-4 border-gold bg-parchment-light">
          <div className="text-center">
            {passed ? (
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            ) : (
              <XCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
            )}

            <h2 className="text-3xl font-serif font-bold text-leather-dark mb-2">
              {passed ? "Parabéns!" : "Tente Novamente"}
            </h2>

            <div className="bg-gold/20 border-2 border-gold rounded-lg p-6 my-6">
              <p className="text-4xl font-serif font-bold text-gold mb-2">{score}/{questions.length}</p>
              <p className="text-leather-dark font-serif">{percentage.toFixed(0)}% de acerto</p>
            </div>

            <p className="text-leather-medium font-serif mb-6">
              {passed
                ? "Você desbloqueou a próxima categoria!"
                : "Estude mais e tente novamente!"}
            </p>

            <div className="flex gap-3">
              <Button
                onClick={() => setLocation("/journeys")}
                className="flex-1 bg-gold text-leather-dark hover:bg-gold-dark font-serif"
              >
                Voltar
              </Button>
              <Button
                onClick={() => {
                  setCurrentQuestionIndex(0);
                  setScore(0);
                  setSelectedAnswer(null);
                  setAnswered(false);
                  setTimeLeft(20);
                  setGameFinished(false);
                }}
                className="flex-1 bg-leather-dark text-parchment hover:bg-leather font-serif"
              >
                Tentar Novamente
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-parchment via-parchment-light to-parchment-dark">
      {/* Header */}
      <div className="border-b-4 border-gold bg-parchment-light/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <Button
            onClick={() => setLocation("/journeys")}
            variant="outline"
            className="border-gold text-gold hover:bg-gold/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
          </Button>

          <div className="flex items-center gap-8">
            <div className="text-center">
              <p className="text-sm text-leather-medium font-serif">Questão</p>
              <p className="text-xl font-serif font-bold text-leather-dark">
                {currentQuestionIndex + 1}/{questions.length}
              </p>
            </div>

            <div className="text-center">
              <p className="text-sm text-leather-medium font-serif">Pontuação</p>
              <p className="text-xl font-serif font-bold text-gold">{score}</p>
            </div>

            <div className={`text-center px-4 py-2 rounded-lg border-2 ${
              timeLeft <= 5 ? "border-red-500 bg-red-50" : "border-gold bg-gold/10"
            }`}>
              <p className="text-sm text-leather-medium font-serif flex items-center gap-1">
                <Clock className="w-4 h-4" /> Tempo
              </p>
              <p className={`text-xl font-serif font-bold ${timeLeft <= 5 ? "text-red-600" : "text-gold"}`}>
                {timeLeft}s
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Questão */}
      <div className="container py-12">
        <Card className="p-8 border-4 border-gold bg-parchment-light mb-8">
          <h2 className="text-2xl font-serif font-bold text-leather-dark mb-2">
            {currentQuestion.question}
          </h2>
          <p className="text-sm text-leather-medium font-serif">
            📖 {currentQuestion.bibleReference}
          </p>
        </Card>

        {/* Alternativas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {alternatives.map((alt: string, index: number) => {
            const isSelected = selectedAnswer === alt;
            const isCorrectAnswer = alt === currentQuestion.answer;
            const showCorrect = answered && isCorrectAnswer;
            const showIncorrect = answered && isSelected && !isCorrectAnswer;

            return (
              <Button
                key={index}
                onClick={() => handleAnswer(alt)}
                disabled={answered}
                className={`p-6 h-auto text-left font-serif transition-all duration-300 border-2 ${
                  showCorrect
                    ? "bg-green-100 border-green-500 text-green-900"
                    : showIncorrect
                      ? "bg-red-100 border-red-500 text-red-900"
                      : isSelected
                        ? "bg-gold/20 border-gold text-leather-dark"
                        : "bg-parchment-light border-gold text-leather-dark hover:bg-gold/10"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="font-bold text-lg">{String.fromCharCode(65 + index)}.</span>
                  <span className="text-base">{alt}</span>
                  {showCorrect && <CheckCircle className="w-5 h-5 ml-auto flex-shrink-0" />}
                  {showIncorrect && <XCircle className="w-5 h-5 ml-auto flex-shrink-0" />}
                </div>
              </Button>
            );
          })}
        </div>

        {/* Botão Próxima */}
        {answered && (
          <div className="flex gap-4">
            <Button
              onClick={handleNextQuestion}
              className="flex-1 bg-gold text-leather-dark hover:bg-gold-dark font-serif text-lg py-6"
            >
              {currentQuestionIndex === questions.length - 1 ? "Finalizar" : "Próxima Questão"}
            </Button>
          </div>
        )}

        {!answered && (
          <div className="text-center">
            <p className="text-leather-medium font-serif">Selecione uma alternativa para continuar</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function QuizGame() {
  return (
    <PremiumGate>
      <QuizGameContent />
    </PremiumGate>
  );
}
