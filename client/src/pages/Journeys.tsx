import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Lock, Unlock } from "lucide-react";

export default function Journeys() {
  const [, setLocation] = useLocation();
  const { data: journeys, isLoading, error } = trpc.games.getJourneys.useQuery();
  const [selectedJourney, setSelectedJourney] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-parchment to-parchment-dark">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-gold" />
          <p className="text-leather-dark text-lg font-serif">Carregando Jornadas...</p>
        </div>
      </div>
    );
  }

  if (error || !journeys) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-parchment to-parchment-dark">
        <Card className="p-8 border-2 border-gold bg-parchment-light">
          <p className="text-leather-dark text-center">Erro ao carregar jornadas</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-parchment via-parchment-light to-parchment-dark">
      {/* Header */}
      <div className="border-b-4 border-gold bg-parchment-light/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-6">
          <h1 className="text-4xl font-serif font-bold text-leather-dark text-center">
            As 5 Jornadas do Conhecimento
          </h1>
          <p className="text-leather-medium text-center mt-2 font-serif">
            Desbloqueie o conhecimento bíblico progressivamente
          </p>
        </div>
      </div>

      {/* Jornadas Grid */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {journeys.map((journey, index) => {
            const isLocked = index > 0; // Apenas a primeira jornada está desbloqueada
            const isSelected = selectedJourney === journey.id;

            return (
              <div
                key={journey.id}
                className={`transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                  isSelected ? "scale-105" : ""
                }`}
                onClick={() => !isLocked && setSelectedJourney(journey.id)}
              >
                <Card
                  className={`relative overflow-hidden border-4 transition-all duration-300 ${
                    isLocked
                      ? "border-gray-400 bg-gray-100 opacity-60"
                      : isSelected
                        ? "border-gold bg-parchment-light shadow-2xl shadow-gold/50"
                        : "border-gold bg-parchment-light hover:shadow-xl hover:shadow-gold/30"
                  }`}
                >
                  {/* Decoração de pergaminho */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
                  </div>

                  {/* Conteúdo */}
                  <div className="p-8 relative z-10">
                    {/* Número da jornada */}
                    <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center">
                      <span className="text-gold font-serif font-bold text-lg">{index + 1}</span>
                    </div>

                    {/* Ícone de bloqueio */}
                    {isLocked && (
                      <div className="absolute top-4 left-4">
                        <Lock className="w-6 h-6 text-gray-500" />
                      </div>
                    )}

                    {/* Título */}
                    <h2 className="text-2xl font-serif font-bold text-leather-dark mb-2">
                      {journey.name}
                    </h2>

                    {/* Descrição */}
                    <p className="text-leather-medium font-serif mb-6 text-sm">
                      {journey.description}
                    </p>

                    {/* Status */}
                    <div className="flex items-center gap-2 mb-6">
                      {isLocked ? (
                        <span className="text-sm text-gray-600 font-serif">
                          🔒 Desbloqueie a jornada anterior para acessar
                        </span>
                      ) : (
                        <span className="text-sm text-green-600 font-serif flex items-center gap-1">
                          <Unlock className="w-4 h-4" /> Desbloqueado
                        </span>
                      )}
                    </div>

                    {/* Botão de ação */}
                    <Button
                      onClick={() => {
                        if (!isLocked) {
                          setLocation(`/journey/${journey.id}`);
                        }
                      }}
                      disabled={isLocked}
                      className={`w-full font-serif font-bold transition-all duration-300 ${
                        isLocked
                          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                          : "bg-gold hover:bg-gold-dark text-leather-dark hover:shadow-lg hover:shadow-gold/50"
                      }`}
                    >
                      {isLocked ? "Bloqueado" : "Explorar"}
                    </Button>
                  </div>

                  {/* Decoração inferior */}
                  <div className="h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dica */}
      <div className="container py-8">
        <Card className="p-6 bg-gold/10 border-2 border-gold">
          <p className="text-leather-dark text-center font-serif">
            💡 <strong>Dica:</strong> Complete todas as categorias de uma jornada para desbloquear a próxima!
          </p>
        </Card>
      </div>
    </div>
  );
}
