import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { Loader2, Trophy, Zap, Target, ArrowLeft } from "lucide-react";

export default function Profile() {
  const { user, loading, logout } = useAuth();
  const [, setLocation] = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-parchment to-parchment-dark">
        <Loader2 className="w-12 h-12 animate-spin text-gold" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-parchment to-parchment-dark">
        <Card className="p-8 border-2 border-gold bg-parchment-light">
          <p className="text-leather-dark text-center mb-4">Você precisa estar autenticado</p>
          <Button onClick={() => setLocation("/")} className="w-full bg-gold text-leather-dark">
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
              onClick={() => setLocation("/")}
              variant="outline"
              className="border-gold text-gold hover:bg-gold/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
            </Button>
          </div>
          <h1 className="text-3xl font-serif font-bold text-leather-dark">Meu Perfil</h1>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="container py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Coluna Esquerda - Informações do Usuário */}
          <div className="md:col-span-1">
            <Card className="p-8 border-4 border-gold bg-parchment-light">
              {/* Avatar */}
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center border-4 border-gold">
                  <span className="text-4xl font-serif font-bold text-parchment">
                    {user.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Nome */}
              <h2 className="text-2xl font-serif font-bold text-leather-dark text-center mb-2">
                {user.name}
              </h2>
              <p className="text-leather-medium font-serif text-center text-sm mb-6">
                {user.email}
              </p>

              {/* Estatísticas Rápidas */}
              <div className="space-y-4 border-t-2 border-gold pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-leather-dark font-serif">XP Total</span>
                  <span className="text-xl font-serif font-bold text-gold">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-leather-dark font-serif">Nível</span>
                  <span className="text-xl font-serif font-bold text-gold">1</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-leather-dark font-serif">Partidas</span>
                  <span className="text-xl font-serif font-bold text-gold">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-leather-dark font-serif">Taxa de Acerto</span>
                  <span className="text-xl font-serif font-bold text-gold">0%</span>
                </div>
              </div>

              {/* Botão Logout */}
              <Button
                onClick={logout}
                className="w-full mt-8 bg-leather-dark text-parchment hover:bg-leather font-serif"
              >
                Sair
              </Button>
            </Card>
          </div>

          {/* Coluna Direita - Conquistas e Progresso */}
          <div className="md:col-span-2 space-y-8">
            {/* Progresso por Jornada */}
            <Card className="p-8 border-4 border-gold bg-parchment-light">
              <h3 className="text-2xl font-serif font-bold text-leather-dark mb-6 flex items-center gap-2">
                <Target className="w-6 h-6 text-gold" /> Progresso por Jornada
              </h3>

              <div className="space-y-4">
                {["Antigo Testamento", "Novo Testamento", "Heróis da Fé", "Cartas e Epístolas", "Profecias"].map(
                  (journey, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-leather-dark font-serif">{journey}</span>
                        <span className="text-gold font-serif font-bold">{idx * 20}%</span>
                      </div>
                      <div className="w-full h-3 bg-gold/20 border-2 border-gold rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-gold to-gold-dark transition-all duration-500"
                          style={{ width: `${idx * 20}%` }}
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
            </Card>

            {/* Conquistas */}
            <Card className="p-8 border-4 border-gold bg-parchment-light">
              <h3 className="text-2xl font-serif font-bold text-leather-dark mb-6 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-gold" /> Conquistas
              </h3>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: "🏆", name: "Primeiro Passo", desc: "Complete seu primeiro jogo" },
                  { icon: "⚡", name: "Raio Rápido", desc: "Acerte 5 questões em 1 minuto" },
                  { icon: "🎯", name: "Atirador de Elite", desc: "Acerte 10 questões seguidas" },
                  { icon: "📚", name: "Erudito", desc: "Complete uma jornada inteira" },
                  { icon: "👑", name: "Rei do Conhecimento", desc: "Chegue ao topo do ranking" },
                  { icon: "🌟", name: "Estrela Brilhante", desc: "Ganhe 1000 XP" },
                ].map((achievement, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg border-2 border-gold/30 bg-gold/5 hover:bg-gold/10 transition-colors text-center cursor-pointer"
                  >
                    <div className="text-3xl mb-2">{achievement.icon}</div>
                    <p className="text-sm font-serif font-bold text-leather-dark">{achievement.name}</p>
                    <p className="text-xs text-leather-medium font-serif">{achievement.desc}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Histórico Recente */}
            <Card className="p-8 border-4 border-gold bg-parchment-light">
              <h3 className="text-2xl font-serif font-bold text-leather-dark mb-6 flex items-center gap-2">
                <Zap className="w-6 h-6 text-gold" /> Histórico Recente
              </h3>

              <div className="space-y-3">
                <p className="text-leather-medium font-serif text-center py-8">
                  Nenhuma partida registrada ainda. Comece a jogar!
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
