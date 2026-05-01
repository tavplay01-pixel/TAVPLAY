import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { Loader2, Scroll, Sparkles, Trophy, Users, Zap } from "lucide-react";
import { useLocation } from "wouter";

const GAME_ICONS = [
  {
    name: "Quiz Bíblico",
    icon: "/manus-storage/quiz_biblico_15740a3f.png",
    description: "Teste seus conhecimentos com 4 alternativas",
  },
  {
    name: "Quem Sou Eu?",
    icon: "/manus-storage/quem_sou_eu_3ff8f416.png",
    description: "Descubra personagens através de charadas",
  },
  {
    name: "Forca Bíblica",
    icon: "/manus-storage/forca_biblica_1e992339.png",
    description: "Adivinhe palavras sagradas",
  },
  {
    name: "Caça Palavras",
    icon: "/manus-storage/caca_palavras_ef5654e9.png",
    description: "Encontre termos bíblicos ocultos",
  },
  {
    name: "Ordem Cronológica",
    icon: "/manus-storage/ordem_cronologica_5d2312cc.png",
    description: "Organize eventos na sequência correta",
  },
  {
    name: "Verdadeiro ou Falso",
    icon: "/manus-storage/verdadeiro_ou_falso_415e5b07.png",
    description: "Identifique fatos bíblicos verdadeiros",
  },
  {
    name: "Complete a Frase",
    icon: "/manus-storage/complete_a_frase_bb25ee4e.png",
    description: "Finalize passagens bíblicas",
  },
];

const FEATURES = [
  {
    icon: Trophy,
    title: "Ranking Global",
    description: "Compita com jogadores do mundo inteiro no Pódio dos Sábios",
  },
  {
    icon: Zap,
    title: "Sistema de XP",
    description: "Ganhe pontos, suba de nível e desbloqueie conquistas",
  },
  {
    icon: Users,
    title: "5 Jornadas",
    description: "Explore Antigo Testamento, Novo Testamento, Heróis da Fé e mais",
  },
  {
    icon: Sparkles,
    title: "Experiência Premium",
    description: "Acesso exclusivo a conteúdos e jornadas premium",
  },
];

export default function Home() {
  const { user, loading, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="animate-spin w-8 h-8 text-accent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Scroll className="w-8 h-8 text-accent" />
            <span className="text-2xl font-bold text-accent">TAV PLAY</span>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-muted-foreground">Bem-vindo, {user?.name}</span>
                <Button onClick={() => navigate("/dashboard")} variant="default">
                  Dashboard
                </Button>
              </>
            ) : (
              <Button asChild variant="default">
                <a href={getLoginUrl()}>Entrar</a>
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-b from-accent via-transparent to-transparent" />
        </div>

        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                  O Selo do <span className="text-accent">Conhecimento Bíblico</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Transforme seu conhecimento bíblico em uma experiência luxuosa, viciante e com propósito missionário real.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 fade-in-up">
                {isAuthenticated ? (
                  <Button size="lg" className="text-lg">
                    Começar Jornada
                  </Button>
                ) : (
                  <>
                    <Button size="lg" asChild className="text-lg">
                      <a href={getLoginUrl()}>Começar Agora</a>
                    </Button>
                    <Button size="lg" variant="outline" className="text-lg">
                      Saiba Mais
                    </Button>
                  </>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-8 border-t border-border">
                <div>
                  <div className="text-3xl font-bold text-accent">700+</div>
                  <div className="text-sm text-muted-foreground">Questões Bíblicas</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent">7</div>
                  <div className="text-sm text-muted-foreground">Modalidades de Jogos</div>
                </div>
              </div>
            </div>

            {/* Right - Logo */}
            <div className="flex justify-center fade-in-scale">
              <div className="relative w-full max-w-md float-animation">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-2xl blur-3xl glow-effect" />
                <img
                  src="/manus-storage/WhatsAppImage2026-04-28at21.16.33_43963444.jpeg"
                  alt="TAV PLAY Logo"
                  className="relative w-full rounded-2xl shadow-2xl border-4 border-accent/30 parchment-bg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section className="py-20 bg-card/50 border-y border-border">
        <div className="container space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">7 Modalidades de Jogos</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Escolha entre diferentes formas de aprender e testar seu conhecimento bíblico
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {GAME_ICONS.map((game, idx) => (
              <div
                key={idx}
                className="group stagger-item relative overflow-hidden rounded-xl border border-border bg-background hover:border-accent game-card-hover"
              >
                <div className="aspect-square overflow-hidden bg-muted">
                  <img
                    src={game.icon}
                    alt={game.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-lg">{game.name}</h3>
                  <p className="text-sm text-muted-foreground">{game.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">Por Que TAV PLAY?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experiência completa de aprendizado bíblico com elementos de gamificação
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {FEATURES.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="flex gap-4 p-6 rounded-lg border border-border hover:border-accent transition-colors">
                  <div className="flex-shrink-0">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-card/50 border-y border-border">
        <div className="container text-center space-y-6">
          <h2 className="text-4xl font-bold">Missão Camboja</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            30% de toda arrecadação do TAV PLAY é doada para o projeto social com crianças no Camboja. Ao jogar, você está ajudando a transformar vidas.
          </p>
          <div className="inline-block px-6 py-3 bg-accent/10 border border-accent/30 rounded-lg">
            <span className="text-accent font-bold">Sua diversão tem propósito</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">Pronto para a Jornada?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Junte-se a milhares de jogadores explorando o conhecimento bíblico de forma interativa e divertida.
          </p>
          {isAuthenticated ? (
            <Button size="lg" className="text-lg">
              Acessar Jornadas
            </Button>
          ) : (
            <Button size="lg" asChild className="text-lg">
              <a href={getLoginUrl()}>Começar Gratuitamente</a>
            </Button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-card/50">
        <div className="container text-center text-sm text-muted-foreground">
          <p>TAV PLAY © 2026 - O Selo do Conhecimento Bíblico</p>
          <p className="mt-2">Baseado na Bíblia King James</p>
        </div>
      </footer>
    </div>
  );
}
