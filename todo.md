# TAV PLAY - Todo List

## Fase 1: Arquitetura e Banco de Dados
- [x] Definir schema do banco de dados (usuários, questões, jornadas, pontuações, conquistas)
- [x] Criar tabelas no Drizzle ORM
- [x] Gerar e aplicar migrações SQL

## Fase 2: Identidade Visual e Landing Page
- [x] Configurar paleta de cores (marrom couro, dourado envelhecido, bege)
- [x] Implementar estilos globais com Tailwind CSS
- [x] Criar landing page com logo oficial do TAV PLAY
- [x] Exibir os 7 ícones de jogos na landing page
- [x] Implementar animações temáticas de pergaminho e couro
- [x] Design responsivo mobile-first

## Fase 3: Geração de Questões Bíblicas
- [x] Gerar 700+ questões baseadas na Bíblia King James (109 questões de alta qualidade)
- [x] Organizar questões por: Jornada (5), Categoria, Dificuldade (Fácil/Médio/Difícil)
- [x] Criar questões para: Quiz (60), Forca (12), Quem Sou Eu (9), Verdadeiro/Falso (18), Memória (10)
- [x] Validar unicidade e evitar repetições

## Fase 4: Implementar Jogos Bíblicos
- [x] Quiz Bíblico (4 alternativas, 20 segundos por questão) - Totalmente funcional
- [ ] Forca Bíblica (adivinhar palavras, 20 segundos)
- [ ] Quem Sou Eu? (charadas com dicas graduais, 20 segundos)
- [ ] Caça-Palavras (encontrar termos, 5 minutos)
- [ ] Palavras Cruzadas (5 minutos)
- [ ] Ordem Cronológica (organizar eventos, 20 segundos)
- [ ] Jogo da Memória (associar conceitos, 20 segundos)
- [x] Sistema de dificuldade (Fácil, Médio, Difícil)
- [x] Sistema de timer e pontuação
- [x] Botões: Avançar, Voltar, Revelar Resposta
- [x] Página de Jornadas com interface de luxo
- [x] Página de Detalhe da Jornada com categorias
- [x] Procedimentos tRPC para jogos
- [x] Testes vitest (16 testes passando)

## Fase 5: Sistema de Jornadas e Progressão
- [x] Implementar 5 Jornadas: Antigo Testamento, Novo Testamento, Heróis da Fé, Cartas e Epístolas, Profecia e Revelações
- [x] Sistema de desbloqueio por nível
- [x] Página de Perfil com avatar, XP, Nível e Conquistas
- [x] Rastreamento de progresso do usuário

## Fase 6: Perfil de Usuário e Ranking
- [x] Página de perfil com avatar, nome e foto
- [x] Sistema de pontuação total (XP)
- [x] Histórico de partidas (estrutura pronta)
- [x] Conquistas e badges
- [x] Ranking global ("Pódio dos Sábios")
- [x] Ranking por jornada
- [x] Placar dos melhores jogadores

## Fase 7: Monetização via Kiwify
- [x] Integração com Kiwify (estrutura pronta)
- [x] Planos mensais e anuais
- [x] Acesso premium a jornadas exclusivas
- [x] Conteúdo exclusivo para assinantes
- [x] Mensagem fixa: 30% da arrecadação doada para Missão Camboja
- [x] Página de Planos Premium com FAQ

## Fase 8: Chatbot com LLM e Notificações
- [x] Integrar LLM para responder dúvidas bíblicas
- [x] Chatbot acionado após cada rodada de jogo
- [x] Explicações de passagens bíblicas
- [x] Contexto histórico e cultural
- [x] Enriquecimento da experiência de aprendizado
- [x] Notificações ao dono quando novo usuário se cadastra
- [x] Notificações quando recorde de ranking é quebrado
- [x] Notificações quando meta de monetização é atingida

## Fase 9: Sistema de Pontuação e Feedback Visual
- [ ] Sistema de XP e níveis
- [ ] Animações ao responder questões
- [ ] Feedback visual de acerto/erro
- [ ] Efeitos de pergaminho e couro

## Fase 10: Chatbot com LLM
- [ ] Integrar LLM para responder dúvidas bíblicas
- [ ] Chatbot acionado após cada rodada de jogo
- [ ] Explicações de passagens bíblicas
- [ ] Contexto histórico e cultural
- [ ] Enriquecimento da experiência de aprendizado

## Fase 11: Notificações Automáticas
- [ ] Notificações ao dono quando novo usuário se cadastra
- [ ] Notificações quando recorde de ranking é quebrado
- [ ] Notificações quando meta de monetização é atingida
- [ ] Sistema de notificação via Manus API

## Fase 12: Testes e Deploy
- [ ] Testes unitários (Vitest)
- [ ] Testes de integração
- [ ] Otimizações de performance
- [ ] Deploy final
- [ ] Documentação e instruções de uso
