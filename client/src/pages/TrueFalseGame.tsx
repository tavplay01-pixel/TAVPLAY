import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation, useRoute } from "wouter";
import { ArrowLeft, CheckCircle, XCircle, Clock } from "lucide-react";
import { trpc } from "@/lib/trpc";
import GameChatbot from "@/components/GameChatbot";

export default function TrueFalseGame() {
  const [, params] = useRoute("/true-false/:journeyId/:categoryId");
  const [, setLocation] = useLocation();

  const journeyId = params?.journeyId ? parseInt(params.journeyId) : 0;
  const categoryId = params?.categoryId ? parseInt(params.categoryId) : 0;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [showChatbot, setShowChatbot] = useState(false);
  const [lastQuestion, setLastQuestion] = useState<any>(null);

  const { data: questions, isLoading } = trpc.games.getQuestions.useQuery({
    gameType: "verdadeiro_ou_falso",
    journeyId,
    categoryId,
  });

  useEffect(() => {
    if (!answered && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (timeLeft === 0 && !answered) {
      handleAnswer(null);
    }
  }, [timeLeft, answered]);

  const currentQuestion = questions?.[currentQuestionIndex];

  const handleAnswer = (answer: boolean | null) => {
    if (answered) return;

    setAnswered(true);
    setSelectedAnswer(answer);

    const isCorrect = answer === (currentQuestion?.answer === "true" || currentQuestion?.answer === "true");
    if (isCorrect) {
      setScore(score + 10);
    }

    setLastQuestion({
      question: currentQuestion?.question,
      userAnswer: answer === null ? "Não respondeu" : answer ? "Verdadeiro" : "Falso",
      correctAnswer: currentQuestion?.answer === "true" ? "Verdadeiro" : "Falso",
      isCorrect,
      score: isCorrect ? 10 : 0,
      totalQuestions: questions?.length || 10,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < (questions?.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswered(false);
      setSelectedAnswer(null);
      setTimeLeft(15);
    } else {
      setShowChatbot(true);
    }
  };

  const handleShowChatbot = () => {
    setShowChatbot(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-parchment to-parchment-dark">
        <Card className="p-8 border-4 border-gold bg-parchment-light">
          <p className="text-leather-dark font-serif">Carregando questões...</p>
        </Card>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-parchment to-parchment-dark">
        <Card className="p-8 border-4 border-gold bg-parchment-light">
          <p className="text-leather-dark font-serif mb-4">Nenhuma questão disponível</p>
          <Button onClick={() => setLocation("/journeys")} className="bg-gold text-leather-dark">
            Voltar
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-parchment via-parchment-light to-parchment-dark">
      {/* Header */}
      <div className="border-b-4 border-gold bg-parchment-light/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container py-6">
          <div className="flex items-center justify-between mb-4">
            <Button
              onClick={() => setLocation("/journeys")}
              variant="outline"
              className="border-gold text-gold hover:bg-gold/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
            </Button>
            <div className="text-right">
              <p className="text-sm text-leather-medium font-serif">Pontuação</p>
              <p className="text-2xl font-serif font-bold text-gold">{score}</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-serif font-bold text-leather-dark">
              Verdadeiro ou Falso
            </h1>
            <div className="flex items-center gap-2 text-gold font-serif font-bold">
              <Clock className="w-5 h-5" />
              {timeLeft}s
            </div>
          </div>
        </div>
      </div>

      {/* Progresso */}
      <div className="container py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-serif text-leather-dark">
            Questão {currentQuestionIndex + 1} de {questions.length}
          </span>
          <span className="text-sm font-serif text-leather-medium">
            {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%
          </span>
        </div>
        <div className="w-full h-2 bg-gold/20 border border-gold rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-gold to-gold-dark transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Questão */}
      <div className="container py-12">
        <Card className="p-12 border-4 border-gold bg-parchment-light mb-8">
          <div className="mb-8">
            <p className="text-xl font-serif text-leather-dark text-center leading-relaxed">
              {currentQuestion?.question}
            </p>
            {currentQuestion?.bibleReference && (
              <p className="text-sm text-leather-medium font-serif text-center mt-4">
                📖 {currentQuestion.bibleReference}
              </p>
            )}
          </div>

          {/* Botões de Resposta */}
          <div className="grid grid-cols-2 gap-6">
            <Button
              onClick={() => handleAnswer(true)}
              disabled={answered}
              className={`py-8 text-lg font-serif font-bold transition-all ${
                selectedAnswer === true && answered
                  ? currentQuestion?.answer === "true"
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                  : selectedAnswer === true
                    ? "bg-gold text-leather-dark"
                    : "bg-leather-dark text-parchment hover:bg-leather"
              }`}
            >
              {selectedAnswer === true && answered && (
                <CheckCircle className="w-6 h-6 mr-2" />
              )}
              Verdadeiro
            </Button>

            <Button
              onClick={() => handleAnswer(false)}
              disabled={answered}
              className={`py-8 text-lg font-serif font-bold transition-all ${
                selectedAnswer === false && answered
                  ? currentQuestion?.answer === "false"
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                  : selectedAnswer === false
                    ? "bg-gold text-leather-dark"
                    : "bg-leather-dark text-parchment hover:bg-leather"
              }`}
            >
              {selectedAnswer === false && answered && (
                <CheckCircle className="w-6 h-6 mr-2" />
              )}
              Falso
            </Button>
          </div>

          {/* Resposta Correta */}
          {answered && (
            <div className={`mt-8 p-4 rounded-lg border-2 ${
              selectedAnswer === (currentQuestion?.answer === "true")
                ? "bg-green-100 border-green-500"
                : "bg-red-100 border-red-500"
            }`}>
              <p className="font-serif font-bold text-sm">
                {selectedAnswer === (currentQuestion?.answer === "true")
                  ? "✅ Correto!"
                  : "❌ Incorreto"}
              </p>
              <p className="text-xs text-leather-medium font-serif mt-2">
                Resposta correta: {currentQuestion?.answer === "true" ? "Verdadeiro" : "Falso"}
              </p>
            </div>
          )}
        </Card>

        {/* Botões de Ação */}
        {answered && (
          <div className="flex gap-4">
            <Button
              onClick={handleNext}
              className="flex-1 bg-gold text-leather-dark hover:bg-gold-dark font-serif py-6 text-lg"
            >
              {currentQuestionIndex < (questions.length - 1) ? "Próxima" : "Finalizar"}
            </Button>
            <Button
              onClick={handleShowChatbot}
              variant="outline"
              className="flex-1 border-gold text-gold hover:bg-gold/10 font-serif py-6 text-lg"
            >
              💬 Assistente
            </Button>
          </div>
        )}
      </div>

      {/* Chatbot Modal */}
      {showChatbot && lastQuestion && (
        <GameChatbot
          gameType="Verdadeiro ou Falso"
          question={lastQuestion.question}
          userAnswer={lastQuestion.userAnswer}
          correctAnswer={lastQuestion.correctAnswer}
          isCorrect={lastQuestion.isCorrect}
          score={score}
          totalQuestions={lastQuestion.totalQuestions}
          onClose={() => setShowChatbot(false)}
        />
      )}
    </div>
  );
}
