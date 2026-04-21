# TAV Play - Design System & Interface Plan

## Brand Identity

**Nome:** TAV Play — O Selo do Conhecimento Bíblico
**Símbolo:** ת (Tav) — última letra do alfabeto hebraico, forma de cruz, representa o selo de Deus
**Créditos:** Dorismar R Lima

---

## Color Palette

### Light Mode (Pergaminho Diurno)
| Token | Hex | Uso |
|-------|-----|-----|
| `background` | `#F5E6C8` | Fundo principal (pergaminho claro) |
| `surface` | `#EDD9A3` | Cards, modais (pergaminho médio) |
| `surface2` | `#E2C97E` | Cards elevados |
| `foreground` | `#2C1810` | Texto principal (tinta escura) |
| `muted` | `#6B4C2A` | Texto secundário (sépia) |
| `primary` | `#8B6914` | Dourado principal |
| `primaryLight` | `#C9A84C` | Dourado claro |
| `accent` | `#5C3D1E` | Marrom escuro |
| `border` | `#C4A35A` | Bordas douradas |
| `gold` | `#D4AF37` | Ouro real |
| `parchment` | `#F5E6C8` | Pergaminho base |

### Dark Mode (Pergaminho Noturno)
| Token | Hex | Uso |
|-------|-----|-----|
| `background` | `#1A0F07` | Fundo escuro (couro antigo) |
| `surface` | `#2D1B0E` | Cards escuros |
| `surface2` | `#3D2512` | Cards elevados escuros |
| `foreground` | `#F5E6C8` | Texto claro (pergaminho) |
| `muted` | `#C4A35A` | Texto secundário dourado |
| `primary` | `#D4AF37` | Dourado brilhante |
| `primaryLight` | `#E8C547` | Dourado claro |
| `accent` | `#8B6914` | Dourado escuro |
| `border` | `#5C3D1E` | Bordas marrom |
| `gold` | `#D4AF37` | Ouro real |

---

## Typography

- **Display:** Serif bold — títulos principais, nome do app
- **Heading:** Serif semibold — títulos de seção
- **Body:** Serif regular — texto de conteúdo
- **Caption:** Sans-serif — labels, badges, pontuação

---

## Screen List

1. **Splash / Loading** — Logo TAV animado, fundo pergaminho
2. **Home** — Saudação, grid de jogos, stats rápidas
3. **Games Hub** — Lista completa de jogos com cards
4. **Quiz Bíblico** — Pergunta + 4 opções + timer + pontuação
5. **Verdadeiro ou Falso** — Afirmação + botões V/F + explicação
6. **Quem Sou Eu?** — Dicas progressivas + input de resposta
7. **Forca Bíblica** — Palavra oculta + teclado virtual + boneco
8. **Memória Bíblica** — Grid de pares de cartas
9. **Caça-Palavras** — Grade de letras + lista de palavras
10. **Palavras Cruzadas** — Grade cruzada + dicas de versículos
11. **Ordem Cronológica** — Drag & drop de eventos bíblicos
12. **Perfil** — Avatar, stats, conquistas, histórico
13. **Ranking** — Leaderboard global e por jogo
14. **Conquistas** — Lista de badges desbloqueados/bloqueados
15. **Configurações** — Tema, som, notificações, conta

---

## Key User Flows

### Jogar um Jogo
Home → Tap card do jogo → Tela do jogo → Resultado → Voltar ao Home

### Ver Ranking
Tab Ranking → Ver top 10 → Filtrar por jogo → Ver posição própria

### Ver Perfil
Tab Perfil → Ver stats → Ver conquistas → Compartilhar resultado

---

## Visual Language

- **Texturas:** Fundo com padrão de pergaminho envelhecido (via gradientes e sombras)
- **Bordas:** Arredondadas com borda dourada dupla nos cards principais
- **Sombras:** Sombras sépia (não cinza) para profundidade
- **Ícones:** Estilo manuscrito/medieval
- **Animações:** Suaves, como virar páginas ou revelar pergaminho
- **Botões:** Estilo de selos/carimbos com bordas ornamentadas

---

## Tab Bar

| Tab | Ícone | Tela |
|-----|-------|------|
| Início | house.fill | Home |
| Jogos | gamecontroller.fill | Games Hub |
| Ranking | trophy.fill | Ranking |
| Perfil | person.fill | Perfil |
