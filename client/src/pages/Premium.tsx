import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { ArrowLeft, Check, Zap, Crown, Heart } from "lucide-react";

export default function Premium() {
  const [, setLocation] = useLocation();

  const plans = [
    {
      name: "Gratuito",
      price: "R$ 0",
      period: "para sempre",
      description: "Comece sua jornada bíblica",
      features: [
        "5 questões grátis por dia",
        "1 Jornada desbloqueada (Novo Testamento)",
        "Ranking global",
        "Conquistas básicas",
      ],
      cta: "Você está aqui",
      ctaVariant: "outline",
      disabled: true,
      icon: "🎮",
    },
    {
      name: "Premium Mensal",
      price: "R$ 9,90",
      period: "por mês",
      description: "Acesso ilimitado durante 1 mês",
      features: [
        "Questões ilimitadas",
        "Todas as 5 Jornadas desbloqueadas",
        "Sem anúncios",
        "Chatbot ilimitado",
        "Conquistas premium",
        "Suporte prioritário",
      ],
      cta: "Assinar Agora",
      ctaVariant: "default",
      disabled: false,
      icon: "⚡",
      popular: true,
    },
    {
      name: "Premium Anual",
      price: "R$ 79,90",
      period: "por ano",
      description: "Acesso ilimitado durante 1 ano (33% de desconto)",
      features: [
        "Questões ilimitadas",
        "Todas as 5 Jornadas desbloqueadas",
        "Sem anúncios",
        "Chatbot ilimitado",
        "Conquistas premium",
        "Suporte prioritário",
        "Acesso antecipado a novos conteúdos",
      ],
      cta: "Assinar Agora",
      ctaVariant: "default",
      disabled: false,
      icon: "👑",
    },
  ];

  const handleSubscribe = (planName: string) => {
    // TODO: Integrar com Kiwify
    alert(`Redirecionando para Kiwify - Plano: ${planName}`);
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
            <Crown className="w-8 h-8 text-gold" />
            <h1 className="text-3xl font-serif font-bold text-leather-dark">
              Planos Premium
            </h1>
          </div>
          <p className="text-leather-medium font-serif mt-2">
            Desbloqueie todo o potencial do TAV PLAY
          </p>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="container py-12">
        {/* Missão Camboja */}
        <Card className="mb-12 p-8 bg-gold/10 border-2 border-gold">
          <div className="flex items-center gap-4">
            <Heart className="w-8 h-8 text-red-600 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-serif font-bold text-leather-dark mb-2">
                Missão Camboja
              </h3>
              <p className="text-leather-medium font-serif">
                30% de toda arrecadação do TAV PLAY é doada para o projeto social com crianças no Camboja. Ao assinar um plano premium, você está ajudando a transformar vidas! ❤️
              </p>
            </div>
          </div>
        </Card>

        {/* Planos */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, idx) => (
            <Card
              key={idx}
              className={`relative border-4 transition-all duration-300 overflow-hidden ${
                plan.popular
                  ? "border-gold bg-gold/5 shadow-2xl shadow-gold/50 scale-105 md:scale-110"
                  : "border-gold bg-parchment-light hover:shadow-xl hover:shadow-gold/30"
              }`}
            >
              {/* Badge Popular */}
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gold text-leather-dark py-2 text-center font-serif font-bold">
                  ⭐ MAIS POPULAR
                </div>
              )}

              <div className={`p-8 ${plan.popular ? "pt-16" : ""}`}>
                {/* Ícone e Nome */}
                <div className="text-center mb-6">
                  <div className="text-5xl mb-3">{plan.icon}</div>
                  <h3 className="text-2xl font-serif font-bold text-leather-dark">
                    {plan.name}
                  </h3>
                </div>

                {/* Preço */}
                <div className="text-center mb-6 border-b-2 border-gold pb-6">
                  <div className="text-4xl font-serif font-bold text-gold mb-2">
                    {plan.price}
                  </div>
                  <p className="text-leather-medium font-serif text-sm">
                    {plan.period}
                  </p>
                  <p className="text-leather-dark font-serif text-sm mt-2">
                    {plan.description}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIdx) => (
                    <div key={featureIdx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                      <span className="text-leather-dark font-serif text-sm">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Button
                  onClick={() => handleSubscribe(plan.name)}
                  disabled={plan.disabled}
                  className={`w-full font-serif font-bold py-6 text-lg transition-all duration-300 ${
                    plan.disabled
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : plan.popular
                        ? "bg-gold hover:bg-gold-dark text-leather-dark shadow-lg shadow-gold/50"
                        : "bg-leather-dark text-parchment hover:bg-leather"
                  }`}
                >
                  {plan.cta}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* FAQ */}
        <Card className="p-8 border-4 border-gold bg-parchment-light">
          <h2 className="text-2xl font-serif font-bold text-leather-dark mb-6">
            Perguntas Frequentes
          </h2>

          <div className="space-y-6">
            <div>
              <h4 className="font-serif font-bold text-leather-dark mb-2">
                Posso cancelar minha assinatura a qualquer momento?
              </h4>
              <p className="text-leather-medium font-serif">
                Sim! Você pode cancelar sua assinatura a qualquer momento sem penalidades. O acesso premium será mantido até o final do período de cobrança.
              </p>
            </div>

            <div>
              <h4 className="font-serif font-bold text-leather-dark mb-2">
                Qual é a diferença entre os planos mensal e anual?
              </h4>
              <p className="text-leather-medium font-serif">
                Ambos oferecem os mesmos recursos. O plano anual oferece 33% de desconto em comparação com o pagamento mensal.
              </p>
            </div>

            <div>
              <h4 className="font-serif font-bold text-leather-dark mb-2">
                Como funciona a integração com Kiwify?
              </h4>
              <p className="text-leather-medium font-serif">
                Usamos Kiwify como plataforma de pagamento segura. Você será redirecionado para completar o pagamento de forma segura e protegida.
              </p>
            </div>

            <div>
              <h4 className="font-serif font-bold text-leather-dark mb-2">
                Meus dados de pagamento são seguros?
              </h4>
              <p className="text-leather-medium font-serif">
                Sim! Todos os pagamentos são processados pela Kiwify com criptografia SSL de ponta a ponta. Nunca armazenamos dados de cartão.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
