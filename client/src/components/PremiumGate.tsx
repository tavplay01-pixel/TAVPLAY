import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Lock, Zap } from "lucide-react";
import { useLocation } from "wouter";

interface PremiumGateProps {
  children: React.ReactNode;
}

export default function PremiumGate({ children }: PremiumGateProps) {
  const { user } = useAuth();
  const [, navigate] = useLocation();

  // Se o usuário é admin/owner, permite acesso. Caso contrário, bloqueia (apenas assinantes terão acesso via Kiwify)
  const hasAccess = user?.role === "admin";

  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="max-w-md p-8 border-2 border-accent text-center space-y-6">
          <div className="flex justify-center">
            <Lock className="w-16 h-16 text-accent" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Acesso Premium</h2>
            <p className="text-muted-foreground">
              Este jogo está disponível apenas para assinantes do TAV PLAY Premium.
            </p>
          </div>

          <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
            <p className="text-sm text-foreground font-semibold">
              ✨ Desbloqueie todos os jogos e jornadas com uma assinatura!
            </p>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={() => navigate("/premium")}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
            >
              <Zap className="w-4 h-4 mr-2" />
              Assinar Agora
            </Button>
            <Button 
              onClick={() => navigate("/")}
              variant="outline"
              className="w-full"
            >
              Voltar à Home
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
