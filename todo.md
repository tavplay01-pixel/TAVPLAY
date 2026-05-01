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
- [ ] Gerar 700+ questões baseadas na Bíblia King James
- [ ] Organizar questões por: Jornada (5), Categoria, Dificuldade (Fácil/Médio/Difícil)
- [ ] Criar questões para: Quiz, Forca, Quem Sou Eu, Caça-Palavras, Palavras Cruzadas, Ordem Cronológica, Memória
- [ ] Validar unicidade e evitar repetições

## Fase 4: Implementar Jogos Bíblicos
- [ ] Quiz Bíblico (4 alternativas, 20 segundos por questão)
- [ ] Forca Bíblica (adivinhar palavras, 20 segundos)
- [ ] Quem Sou Eu? (charadas com dicas graduais, 20 segundos)
- [ ] Caça-Palavras (encontrar termos, 5 minutos)
- [ ] Palavras Cruzadas (5 minutos)
- [ ] Ordem Cronológica (organizar eventos, 20 segundos)
- [ ] Jogo da Memória (associar conceitos, 20 segundos)
- [ ] Sistema de dificuldade (Fácil, Médio, Difícil)
- [ ] Sistema de timer e pontuação
- [ ] Botões: Avançar, Voltar, Revelar Resposta

## Fase 5: Sistema de Jornadas e Progressão
- [ ] Implementar 5 Jornadas: Antigo Testamento, Novo Testamento, Heróis da Fé, Cartas e Epístolas, Profecias e Revelações
- [ ] Sistema de desbloqueio por nível
- [ ] Mapa visual das jornadas
- [ ] Sistema de isca: 5 questões grátis na jornada Novo Testamento
- [ ] Rastreamento de progresso do usuário

## Fase 6: Perfil de Usuário e Ranking
- [ ] Página de perfil com avatar, nome e foto
- [ ] Sistema de pontuação total (XP)
- [ ] Histórico de partidas
- [ ] Conquistas e badges
- [ ] Ranking global ("Pódio dos Sábios")
- [ ] Ranking por jornada
- [ ] Placar dos melhores jogadores

## Fase 7: Autenticação e Persistência
- [ ] Integrar Manus OAuth
- [ ] Persistência de progresso no banco de dados
- [ ] Sincronização de dados entre dispositivos
- [ ] Logout seguro

## Fase 8: Monetização via Kiwify
- [ ] Integração com Kiwify
- [ ] Planos mensais e anuais
- [ ] Acesso premium a jornadas exclusivas
- [ ] Conteúdo exclusivo para assinantes
- [ ] Mensagem fixa: 30% da arrecadação doada para Missão Camboja

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
