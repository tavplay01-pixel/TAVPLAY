import { useRoute, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, Gamepad2 } from "lucide-react";

export default function JourneyDetail() {
  const [match, params] = useRoute("/journey/:journeyId");
  const [, setLocation] = useLocation();

  const journeyId = params?.journeyId ? parseInt(params.journeyId) : null;

  const { data: categories, isLoading: categoriesLoading } = trpc.games.getCategoriesByJourney.useQuery(
    { journeyId: journeyId || 0 },
    { enabled: !!journeyId }
  );

  if (!match || !journeyId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Jornada inválida</p>
      </div>
    );
  }

  if (categoriesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-parchment to-parchment-dark">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-gold" />
          <p className="text-leather-dark text-lg font-serif">Carregando Categorias...</p>
        </div>
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-parchment to-parchment-dark">
        <Card className="p-8 border-2 border-gold bg-parchment-light">
          <p className="text-leather-dark text-center mb-4">Nenhuma categoria disponível</p>
          <Button onClick={() => setLocation("/journeys")} className="w-full bg-gold text-leather-dark">
            Voltar
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-parchment via-parchment-light to-parchment-dark">
      {/* Header */}
      <div className="border-b-4 border-gold bg-parchment-light/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-6">
          <div className="flex items-center gap-4 mb-4">
            <Button
              onClick={() => setLocation("/journeys")}
              variant="outline"
              className="border-gold text-gold hover:bg-gold/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
            </Button>
          </div>
          <h1 className="text-3xl font-serif font-bold text-leather-dark">
            Categorias da Jornada
          </h1>
        </div>
      </div>

      {/* Categorias */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="border-4 border-gold bg-parchment-light hover:shadow-xl hover:shadow-gold/30 transition-all duration-300 overflow-hidden group"
            >
              <div className="p-6">
                {/* Ícone */}
                <div className="w-12 h-12 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center mb-4 group-hover:bg-gold/30 transition-colors">
                  <Gamepad2 className="w-6 h-6 text-gold" />
                </div>

                {/* Título */}
                <h3 className="text-xl font-serif font-bold text-leather-dark mb-2">
                  {category.name}
                </h3>

                {/* Descrição */}
                <p className="text-leather-medium font-serif text-sm mb-6">
                  {category.description}
                </p>

                {/* Botões de Jogos */}
                <div className="space-y-2">
                  <Button
                    onClick={() => setLocation(`/quiz/${journeyId}/${category.id}`)}
                    className="w-full bg-gold text-leather-dark hover:bg-gold-dark font-serif transition-all duration-300"
                  >
                    📝 Quiz Bíblico
                  </Button>
                  <Button
                    onClick={() => alert("Em breve!")}
                    disabled
                    className="w-full bg-gray-300 text-gray-600 font-serif cursor-not-allowed"
                  >
                    🎮 Mais Jogos (em breve)
                  </Button>
                </div>
              </div>

              {/* Decoração */}
              <div className="h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
