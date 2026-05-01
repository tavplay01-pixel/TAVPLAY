import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { ArrowLeft, Trophy, Medal } from "lucide-react";

export default function Ranking() {
  const [, setLocation] = useLocation();

  // Mock data - será substituído por dados reais do banco
  const topPlayers = [
    { rank: 1, name: "João da Sabedoria", xp: 5420, level: 15, accuracy: 92 },
    { rank: 2, name: "Maria Conhecedora", xp: 4890, level: 14, accuracy: 88 },
    { rank: 3, name: "Pedro Estudioso", xp: 4320, level: 13, accuracy: 85 },
    { rank: 4, name: "Ana Bíblica", xp: 3950, level: 12, accuracy: 82 },
    { rank: 5, name: "Carlos Sábio", xp: 3620, level: 11, accuracy: 80 },
    { rank: 6, name: "Lucia Erudita", xp: 3280, level: 10, accuracy: 78 },
    { rank: 7, name: "Roberto Culto", xp: 2950, level: 9, accuracy: 76 },
    { rank: 8, name: "Fernanda Letrada", xp: 2620, level: 8, accuracy: 74 },
    { rank: 9, name: "Ricardo Versado", xp: 2290, level: 7, accuracy: 72 },
    { rank: 10, name: "Beatriz Instruída", xp: 1960, level: 6, accuracy: 70 },
  ];

  const getMedalIcon = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `${rank}º`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-parchment via-parchment-light to-parchment-dark">
      {/* Header */}
      <div className="border-b-4 border-gold bg-parchment-light/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-6">
          <div className="flex items-center gap-4 mb-4">
            <Button
              onClick={() => setLocation("/")}
              variant="outline"
              className="border-gold text-gold hover:bg-gold/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-gold" />
            <h1 className="text-3xl font-serif font-bold text-leather-dark">
              Pódio dos Sábios
            </h1>
          </div>
          <p className="text-leather-medium font-serif mt-2">
            Ranking global dos melhores jogadores do TAV PLAY
          </p>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="container py-12">
        {/* Top 3 em Destaque */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {topPlayers.slice(0, 3).map((player) => (
            <Card
              key={player.rank}
              className={`p-8 border-4 text-center transition-all duration-300 ${
                player.rank === 1
                  ? "border-gold bg-gold/10 shadow-2xl shadow-gold/50 scale-105"
                  : player.rank === 2
                    ? "border-gray-400 bg-gray-100/50"
                    : "border-orange-400 bg-orange-100/50"
              }`}
            >
              <div className="text-6xl mb-4">{getMedalIcon(player.rank)}</div>
              <h3 className="text-2xl font-serif font-bold text-leather-dark mb-2">
                {player.name}
              </h3>
              <div className="space-y-2 border-t-2 border-gold/30 pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-leather-medium font-serif">XP</span>
                  <span className="text-xl font-serif font-bold text-gold">{player.xp}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-leather-medium font-serif">Nível</span>
                  <span className="text-xl font-serif font-bold text-gold">{player.level}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-leather-medium font-serif">Acerto</span>
                  <span className="text-xl font-serif font-bold text-gold">{player.accuracy}%</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Ranking Completo */}
        <Card className="border-4 border-gold bg-parchment-light overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-serif font-bold text-leather-dark mb-6">
              Ranking Completo
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gold">
                    <th className="text-left py-4 px-4 font-serif font-bold text-leather-dark">
                      Posição
                    </th>
                    <th className="text-left py-4 px-4 font-serif font-bold text-leather-dark">
                      Jogador
                    </th>
                    <th className="text-center py-4 px-4 font-serif font-bold text-leather-dark">
                      XP
                    </th>
                    <th className="text-center py-4 px-4 font-serif font-bold text-leather-dark">
                      Nível
                    </th>
                    <th className="text-center py-4 px-4 font-serif font-bold text-leather-dark">
                      Taxa de Acerto
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topPlayers.map((player, idx) => (
                    <tr
                      key={player.rank}
                      className={`border-b border-gold/20 transition-colors ${
                        idx % 2 === 0 ? "bg-gold/5" : "bg-transparent"
                      } hover:bg-gold/10`}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{getMedalIcon(player.rank)}</span>
                          <span className="font-serif font-bold text-leather-dark">
                            #{player.rank}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-serif text-leather-dark">{player.name}</span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="font-serif font-bold text-gold">{player.xp}</span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="font-serif font-bold text-leather-dark">
                          {player.level}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-24 h-2 bg-gold/20 border border-gold rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-gold to-gold-dark"
                              style={{ width: `${player.accuracy}%` }}
                            />
                          </div>
                          <span className="font-serif font-bold text-leather-dark text-sm">
                            {player.accuracy}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        {/* Dica */}
        <Card className="mt-8 p-6 bg-gold/10 border-2 border-gold">
          <p className="text-leather-dark text-center font-serif">
            💡 <strong>Dica:</strong> Ganhe XP jogando e suba no ranking! Quanto mais acertos, maior sua taxa de acerto.
          </p>
        </Card>
      </div>
    </div>
  );
}
