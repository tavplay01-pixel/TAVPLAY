import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, MessageCircle, X } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface GameChatbotProps {
  gameType: string;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  score: number;
  totalQuestions: number;
  onClose: () => void;
}

export default function GameChatbot({
  gameType,
  question,
  userAnswer,
  correctAnswer,
  isCorrect,
  score,
  totalQuestions,
  onClose,
}: GameChatbotProps) {
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const getGameResponseMutation = trpc.chatbot.getGameResponse.useMutation();

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const result = await getGameResponseMutation.mutateAsync({
          gameType,
          question,
          userAnswer,
          correctAnswer,
          isCorrect,
          score,
          totalQuestions,
        });

        if (result.success) {
          const responseText = typeof result.response === 'string' 
            ? result.response 
            : JSON.stringify(result.response);
          setResponse(responseText);
        } else {
          setResponse(
            "Desculpe, não consegui gerar uma resposta no momento. Tente novamente mais tarde."
          );
        }
      } catch (error) {
        console.error("Erro ao obter resposta do chatbot:", error);
        setResponse(
          "Erro ao conectar com o chatbot. Tente novamente mais tarde."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchResponse();
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-2xl w-full max-h-96 border-4 border-gold bg-parchment-light flex flex-col">
        {/* Header */}
        <div className="p-6 border-b-2 border-gold flex items-center justify-between bg-gold/10">
          <div className="flex items-center gap-3">
            <MessageCircle className="w-6 h-6 text-gold" />
            <h3 className="text-xl font-serif font-bold text-leather-dark">
              Assistente Bíblico
            </h3>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-leather-dark hover:bg-gold/20"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-gold" />
              <p className="text-leather-dark font-serif">
                Gerando resposta personalizada...
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Resultado */}
              <div className={`p-4 rounded-lg border-2 ${
                isCorrect
                  ? "bg-green-100 border-green-500"
                  : "bg-red-100 border-red-500"
              }`}>
                <p className="font-serif font-bold text-sm">
                  {isCorrect ? "✅ Resposta Correta!" : "❌ Resposta Incorreta"}
                </p>
                <p className="text-xs text-leather-medium font-serif mt-1">
                  Sua resposta: {userAnswer}
                </p>
                {!isCorrect && (
                  <p className="text-xs text-leather-medium font-serif">
                    Resposta correta: {correctAnswer}
                  </p>
                )}
              </div>

              {/* Resposta do Chatbot */}
              <div className="bg-gold/10 p-4 rounded-lg border-2 border-gold">
                <p className="text-leather-dark font-serif text-sm whitespace-pre-wrap">
                  {response}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t-2 border-gold bg-gold/10">
          <Button
            onClick={onClose}
            className="w-full bg-gold text-leather-dark hover:bg-gold-dark font-serif"
          >
            Continuar Jogando
          </Button>
        </div>
      </Card>
    </div>
  );
}
