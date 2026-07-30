# EDGE Palette — Variáveis e Comparativo com MUI

Arquivo: **EDGE Design System - New** (Figma)
Node analisado: `854-266627` — [link](https://www.figma.com/design/fLQNXhHQhKBZzWnJGtUcwn/EDGE-Design-System---New?node-id=854-266627&view=variables)
Data da extração: 24/07/2026

O arquivo tem 6 collections de variáveis, num total de 652 variáveis:

| Collection | Modos | Nº de variáveis | Papel |
|---|---|---|---|
| **EDGE palette** | Mode 1 (único) | 196 | Design tokens novos, semânticos, específicos da marca EDGE |
| **MUI palette** | Light / Dark | 145 | Espelha 1:1 o `theme.palette` do Material UI (o tema que o app usa hoje) |
| **material/colors** | Mode 1 (único) | 292 | Paleta bruta: as 18 famílias de cor do Material Design (grey, blue, red, green, orange, purple, indigo, lightBlue, deepPurple, pink, deepOrange, lightGreen, lime, yellow, cyan, teal, blueGrey, amber) + 3 famílias de marca (EDGE-Turquoise, EDGE-Red, EDGE-Blue) |
| breakpoints | Mode 1 | 5 | xs/sm/md/lg/xl |
| sizing | Mode 1 | 12 | escala numérica 1–12 |
| shape | Mode 1 | 2 | borderRadius |

Este documento cobre a **EDGE palette** na íntegra e depois compara com **MUI palette** e **material/colors**.

---

## 1. Todas as variáveis da collection "EDGE palette" (196)

### 1.1 Brand (paleta de marca, hardcoded — não são alias de nada)

| Variável | Hex |
|---|---|
| Brand/Primary/50 | #ECFDFE |
| Brand/Primary/100 | #BCE8E9 |
| Brand/Primary/200 | #BCE8E9 *(idêntico ao 100)* |
| Brand/Primary/300 | #07BEBE |
| Brand/Primary/400 | #26AFAD |
| Brand/Primary/500 | #009F9B |
| Brand/Primary/600 | #00918C |
| Brand/Primary/700 | #0E837D |
| Brand/Primary/800 | #00726D |
| Brand/Primary/900 | #04554E |
| Brand/Secondary/50 | #E2E1E0 |
| Brand/Secondary/100 | #C6C9CB |
| Brand/Secondary/200 | #E2E1E0 *(idêntico ao 50)* |
| Brand/Secondary/300 | #E2E1E0 *(idêntico ao 50)* |
| Brand/Secondary/400 | #75828E |
| Brand/Secondary/500 | #5E6E7D |
| Brand/Secondary/600 | #515F6C |
| Brand/Secondary/700 | #414C56 |
| Brand/Secondary/800 | #323940 |
| Brand/Secondary/900 | #21252A |
| Brand/White | #FFFFFF |

### 1.2 Semantic (tokens semânticos — quase todos alias de Brand ou de material/colors)

| Variável | Hex | Alias para |
|---|---|---|
| Semantic/Surface/Default | #FAFAFA | grey/50 (material/colors) |
| Semantic/Surface/Paper | #FFFFFF | Brand/White |
| Semantic/Surface/Subtle | #F5F5F5 | grey/100 |
| Semantic/Surface/Hover | #EEEEEE | grey/200 |
| Semantic/Surface/Disabled | #E0E0E0 | grey/300 |
| Semantic/Text/Primary | #212121 | grey/900 |
| Semantic/Text/Secondary | #616161 | grey/700 |
| Semantic/Text/Tertiary | #9E9E9E | grey/500 |
| Semantic/Text/Inverse | #FFFFFF | Brand/White |
| Semantic/Text/Disabled | #9E9E9E | grey/500 |
| Semantic/Border/Default | #E0E0E0 | grey/300 |
| Semantic/Border/Strong | #9E9E9E | grey/500 |
| Semantic/Border/Subtle | #F5F5F5 | grey/100 |
| Semantic/Border/Focus | #009F9B | Brand/Primary/500 |
| Semantic/Border/Error | #F44336 | red/500 |
| Semantic/State/Hover | #BCE8E9 | Brand/Primary/100 |
| Semantic/State/Active | #0E837D | Brand/Primary/700 |
| Semantic/State/Disabled | *(quebrado)* | ⚠️ alias aponta para um ID que não resolve (`VariableID:204:2921`) — variável órfã, precisa de correção |
| Semantic/Status/Success/Background | #C8E6C9 | green/100 |
| Semantic/Status/Success/Border | #4CAF50 | green/500 |
| Semantic/Status/Success/Icon | #2E7D32 | green/800 |
| Semantic/Status/Success/Text | #1B5E20 | green/900 |
| Semantic/Status/Error/Background | #FECDD2 | red/100 |
| Semantic/Status/Error/Border | #F44336 | red/500 |
| Semantic/Status/Error/Icon | #C62828 | red/800 |
| Semantic/Status/Error/Text | #B71C1C | red/900 |
| Semantic/Status/Warning/Background | #FFECB3 | amber/100 |
| Semantic/Status/Warning/Border | #FFC107 | amber/500 |
| Semantic/Status/Warning/Icon | #FF8F00 | amber/800 |
| Semantic/Status/Warning/Text | #FF6F00 | amber/900 |
| Semantic/Status/Info/Background | #BBDEFB | blue/100 |
| Semantic/Status/Info/Border | #2196F3 | blue/500 |
| Semantic/Status/Info/Icon | #1565C0 | blue/800 |
| Semantic/Status/Info/Text | #0D47A1 | blue/900 |
| Semantic/Status/Neutral/Background | #EEEEEE | grey/200 |
| Semantic/Status/Neutral/Border | #9E9E9E | grey/500 |
| Semantic/Status/Neutral/Icon | #424242 | grey/800 |
| Semantic/Status/Neutral/Text | #212121 | grey/900 |

### 1.3 Legacy / duplicadas (fora do namespace "Semantic/", hardcoded — parecem resquício de uma nomenclatura anterior)

| Variável | Hex | Observação |
|---|---|---|
| surface/default | #FAFAFA | Mesmo valor de Semantic/Surface/Default, mas hardcoded e com escopo restrito a FRAME_FILL/SHAPE_FILL |
| surface/disabled | #E0E0E0 | Mesmo valor de Semantic/Surface/Disabled, hardcoded |
| text/primary | #212121 | Mesmo valor de Semantic/Text/Primary, hardcoded, escopo TEXT_FILL |
| text/disabled | #9E9E9E | Mesmo valor de Semantic/Text/Disabled, hardcoded |

### 1.4 Components (Button, Alert, Chip, Status Tag, Breadcrumbs, Pagination, ButtonGroup)

| Variável | Hex | Alias para |
|---|---|---|
| Components/Button/Primary/BG/Default | #009F9B | Brand/Primary/500 |
| Components/Button/Primary/BG/Hover | #00918C | Brand/Primary/600 |
| Components/Button/Primary/BG/Active | #0E837D | Brand/Primary/700 |
| Components/Button/Primary/Text | #FFFFFF | Semantic/Text/Inverse |
| Components/Button/Secondary/Border | #009F9B | Brand/Primary/500 |
| Components/Button/Secondary/Text | #009F9B | Brand/Primary/500 |
| Components/Button/Secondary/Background | #009F9B | Brand/Primary/500 |
| Components/Button/Secondary/BG/Hover | #ECFDFE | Components/Button/Shared/Subtle |
| Components/Button/Shared/Subtle | #ECFDFE | Brand/Primary/50 |
| Components/Button/Shared/Focus | #009F9B | Semantic/Border/Focus |
| Components/Button/Disabled/BG | #E0E0E0 | Semantic/Surface/Disabled |
| Components/Button/Disabled/Text | #9E9E9E | Semantic/Text/Disabled |
| Components/Button/Tertiary/Text | #009F9B | Brand/Primary/500 |
| Components/Button/Tertiary/BG/Hover | #ECFDFE | Components/Button/Shared/Subtle |
| Components/Alert/Success/Background | #C8E6C9 | Semantic/Status/Success/Background |
| Components/Alert/Success/Border | #4CAF50 | Semantic/Status/Success/Border |
| Components/Alert/Success/Icon | #2E7D32 | Semantic/Status/Success/Icon |
| Components/Alert/Success/Text | #1B5E20 | Semantic/Status/Success/Text |
| Components/Alert/Error/Background | #FECDD2 | Semantic/Status/Error/Background |
| Components/Alert/Error/Border | #F44336 | Semantic/Status/Error/Border |
| Components/Alert/Error/Icon | #C62828 | Semantic/Status/Error/Icon |
| Components/Alert/Error/Text | #B71C1C | Semantic/Status/Error/Text |
| Components/Alert/Warning/Background | #FFECB3 | Semantic/Status/Warning/Background |
| Components/Alert/Warning/Border | #FFC107 | Semantic/Status/Warning/Border |
| Components/Alert/Warning/Icon | #FF8F00 | Semantic/Status/Warning/Icon |
| Components/Alert/Warning/Text | #FF6F00 | Semantic/Status/Warning/Text |
| Components/Alert/Info/Background | #BBDEFB | Semantic/Status/Info/Background |
| Components/Alert/Info/Border | #2196F3 | Semantic/Status/Info/Border |
| Components/Alert/Info/Icon | #1565C0 | Semantic/Status/Info/Icon |
| Components/Alert/Info/Text | #0D47A1 | Semantic/Status/Info/Text |
| Components/Alert/Neutral/Background | #EEEEEE | Semantic/Status/Neutral/Background |
| Components/Alert/Neutral/Border | #9E9E9E | Semantic/Status/Neutral/Border |
| Components/Alert/Neutral/Icon | #424242 | Semantic/Status/Neutral/Icon |
| Components/Alert/Neutral/Text | #212121 | Semantic/Status/Neutral/Text |
| Components/Status Tag/Success/Background | #C8E6C9 | Semantic/Status/Success/Background |
| Components/Status Tag/Success/Border | #4CAF50 | Semantic/Status/Success/Border |
| Components/Status Tag/Success/Icon | #2E7D32 | Semantic/Status/Success/Icon |
| Components/Status Tag/Success/Text | #1B5E20 | Semantic/Status/Success/Text |
| Components/Status Tag/Neutral/Background | #EEEEEE | Semantic/Status/Neutral/Background |
| Components/Status Tag/Neutral/Border | #9E9E9E | Semantic/Status/Neutral/Border |
| Components/Status Tag/Neutral/Icon | #424242 | Semantic/Status/Neutral/Icon |
| Components/Status Tag/Neutral/Text | #212121 | Semantic/Status/Neutral/Text |
| Components/Status Tag/Info/Background | #BBDEFB | Semantic/Status/Info/Background |
| Components/Status Tag/Info/Border | #2196F3 | Semantic/Status/Info/Border |
| Components/Status Tag/Info/Icon | #1565C0 | Semantic/Status/Info/Icon |
| Components/Status Tag/Info/Text | #0D47A1 | Semantic/Status/Info/Text |
| Components/Status Tag/Warning/Background | #FFECB3 | Semantic/Status/Warning/Background |
| Components/Status Tag/Warning/Border | #FFC107 | Semantic/Status/Warning/Border |
| Components/Status Tag/Warning/Icon | #FF8F00 | Semantic/Status/Warning/Icon |
| Components/Status Tag/Warning/Text | #FF6F00 | Semantic/Status/Warning/Text |
| Components/Status Tag/Error/Background | #FECDD2 | Semantic/Status/Error/Background |
| Components/Status Tag/Error/Border | #F44336 | Semantic/Status/Error/Border |
| Components/Status Tag/Error/Icon | #C62828 | Semantic/Status/Error/Icon |
| Components/Status Tag/Error/Text | #B71C1C | Semantic/Status/Error/Text |
| Components/Chip/Primary/Filled/BG/Default | #009F9B | Brand/Primary/500 |
| Components/Chip/Primary/Filled/BG/Hover | #00918C | Brand/Primary/600 |
| Components/Chip/Primary/Filled/Text | #FFFFFF | Semantic/Text/Inverse |
| Components/Chip/Primary/Outlined/Border | #009F9B | Brand/Primary/500 |
| Components/Chip/Primary/Outlined/Text | #009F9B | Brand/Primary/500 |
| Components/Chip/Primary/Outlined/BG/Hover | #ECFDFE | Brand/Primary/50 |
| Components/Chip/Secondary/Filled/BG/Default | #5E6E7D | Brand/Secondary/500 |
| Components/Chip/Secondary/Filled/BG/Hover | #515F6C | Brand/Secondary/600 |
| Components/Chip/Secondary/Filled/Text | #FFFFFF | Semantic/Text/Inverse |
| Components/Chip/Secondary/Outlined/Border | #5E6E7D | Brand/Secondary/500 |
| Components/Chip/Secondary/Outlined/Text | #5E6E7D | Brand/Secondary/500 |
| Components/Chip/Secondary/Outlined/BG/Hover | #E2E1E0 | Brand/Secondary/50 |
| Components/Chip/Default/Filled/BG/Default | #F5F5F5 | Semantic/Surface/Subtle |
| Components/Chip/Default/Filled/BG/Hover | #EEEEEE | Semantic/Surface/Hover |
| Components/Chip/Default/Filled/Text | #212121 | Semantic/Text/Primary |
| Components/Chip/Default/Outlined/Border | #E0E0E0 | Semantic/Border/Default |
| Components/Chip/Default/Outlined/Text | #212121 | Semantic/Text/Primary |
| Components/Chip/Default/Outlined/BG/Hover | #EEEEEE | Semantic/Surface/Hover |
| Components/Chip/Error/Filled/BG/Default | #C62828 | Semantic/Status/Error/Icon |
| Components/Chip/Error/Filled/BG/Hover | #F44336 | Semantic/Status/Error/Border |
| Components/Chip/Error/Filled/Text | #FFFFFF | Semantic/Text/Inverse |
| Components/Chip/Error/Outlined/Border | #F44336 | Semantic/Status/Error/Border |
| Components/Chip/Error/Outlined/Text | #B71C1C | Semantic/Status/Error/Text |
| Components/Chip/Error/Outlined/BG/Hover | #FECDD2 | Semantic/Status/Error/Background |
| Components/Chip/Warning/Filled/BG/Default | #FF8F00 | Semantic/Status/Warning/Icon |
| Components/Chip/Warning/Filled/BG/Hover | #FFC107 | Semantic/Status/Warning/Border |
| Components/Chip/Warning/Filled/Text | #FFFFFF | Semantic/Text/Inverse |
| Components/Chip/Warning/Outlined/Border | #FFC107 | Semantic/Status/Warning/Border |
| Components/Chip/Warning/Outlined/Text | #FF6F00 | Semantic/Status/Warning/Text |
| Components/Chip/Warning/Outlined/BG/Hover | #FFECB3 | Semantic/Status/Warning/Background |
| Components/Chip/Info/Filled/BG/Default | #1565C0 | Semantic/Status/Info/Icon |
| Components/Chip/Info/Filled/BG/Hover | #2196F3 | Semantic/Status/Info/Border |
| Components/Chip/Info/Filled/Text | #FFFFFF | Semantic/Text/Inverse |
| Components/Chip/Info/Outlined/Border | #2196F3 | Semantic/Status/Info/Border |
| Components/Chip/Info/Outlined/Text | #0D47A1 | Semantic/Status/Info/Text |
| Components/Chip/Info/Outlined/BG/Hover | #BBDEFB | Semantic/Status/Info/Background |
| Components/Chip/Success/Filled/BG/Default | #2E7D32 | Semantic/Status/Success/Icon |
| Components/Chip/Success/Filled/BG/Hover | #4CAF50 | Semantic/Status/Success/Border |
| Components/Chip/Success/Filled/Text | #FFFFFF | Semantic/Text/Inverse |
| Components/Chip/Success/Outlined/Border | #4CAF50 | Semantic/Status/Success/Border |
| Components/Chip/Success/Outlined/Text | #1B5E20 | Semantic/Status/Success/Text |
| Components/Chip/Success/Outlined/BG/Hover | #C8E6C9 | Semantic/Status/Success/Background |
| Components/Chip/Shared/Focus | #009F9B | Semantic/Border/Focus |
| Components/Chip/Disabled/BG | #E0E0E0 | Semantic/Surface/Disabled |
| Components/Chip/Disabled/Text | #9E9E9E | Semantic/Text/Disabled |
| Components/Breadcrumbs/Link/Text | #616161 | Semantic/Text/Secondary |
| Components/Breadcrumbs/CurrentPage/Text | #212121 | Semantic/Text/Primary |
| Components/Breadcrumbs/Separator/Icon | #616161 | Semantic/Text/Secondary |
| Components/Breadcrumbs/Collapse/BG | #F5F5F5 | Semantic/Surface/Subtle |
| Components/Pagination/Item/Text/Default | #212121 | Semantic/Text/Primary |
| Components/Pagination/Item/Text/Disabled | #9E9E9E | Semantic/Text/Disabled |
| Components/Pagination/Item/Standard/Selected/BG | #0E837D | Semantic/State/Active |
| Components/Pagination/Item/Standard/Selected/Text | #FFFFFF | Semantic/Text/Inverse |
| Components/Pagination/Item/Standard/Outlined/BG | #F5F5F5 | Semantic/Surface/Subtle |
| Components/Pagination/Item/Standard/Outlined/Border | #E0E0E0 | Semantic/Border/Default |
| Components/Pagination/Item/Primary/Selected/BG | #009F9B | Brand/Primary/500 |
| Components/Pagination/Item/Primary/Selected/Text | #FFFFFF | Semantic/Text/Inverse |
| Components/Pagination/Item/Primary/Outlined/BG | #ECFDFE | Brand/Primary/50 |
| Components/Pagination/Item/Primary/Outlined/Border | #009F9B | Brand/Primary/500 |
| Components/Pagination/Item/Primary/Outlined/Text | #009F9B | Brand/Primary/500 |
| Components/Pagination/Item/Secondary/Selected/BG | #5E6E7D | Brand/Secondary/500 |
| Components/Pagination/Item/Secondary/Selected/Text | #FFFFFF | Semantic/Text/Inverse |
| Components/Pagination/Item/Secondary/Outlined/BG | #E2E1E0 | Brand/Secondary/50 |
| Components/Pagination/Item/Secondary/Outlined/Border | #5E6E7D | Brand/Secondary/500 |
| Components/Pagination/Item/Secondary/Outlined/Text | #5E6E7D | Brand/Secondary/500 |
| Components/ButtonGroup/Divider/Primary/Contained | #00918C | Brand/Primary/600 |
| Components/ButtonGroup/Divider/Primary/Outlined | #07BEBE | Brand/Primary/300 |
| Components/ButtonGroup/Divider/Secondary/Contained | #515F6C | Brand/Secondary/600 |
| Components/ButtonGroup/Divider/Secondary/Outlined | #5E6E7D | Brand/Secondary/500 |
| Components/ButtonGroup/Divider/Error/Contained | #C62828 | Semantic/Status/Error/Icon |
| Components/ButtonGroup/Divider/Error/Outlined | #D32F2F | *hardcoded (não é alias)* |
| Components/ButtonGroup/Divider/Warning/Contained | #EF6C00 | *hardcoded* |
| Components/ButtonGroup/Divider/Warning/Outlined | #EF6C00 | *hardcoded* |
| Components/ButtonGroup/Divider/Info/Contained | #0D47A1 | Semantic/Status/Info/Text |
| Components/ButtonGroup/Divider/Info/Outlined | #0057B2 | *hardcoded* |
| Components/ButtonGroup/Divider/Success/Contained | #1B5E20 | Semantic/Status/Success/Text |
| Components/ButtonGroup/Divider/Success/Outlined | #2E7D32 | Semantic/Status/Success/Icon |
| Components/ButtonGroup/Divider/Inherit/Contained | #BDBDBD | *hardcoded* |
| Components/ButtonGroup/Divider/Inherit/Outlined | #000000 | *hardcoded* |

Total: **196 variáveis**, 1 modo único ("Mode 1" — não há dark mode nesta collection).

---

## 2. Comparativo: EDGE palette × MUI palette × material/colors

### 2.1 Como as três collections se encaixam hoje

`material/colors` é a paleta bruta (todas as famílias Material Design + 3 famílias de marca: EDGE-Turquoise, EDGE-Red, EDGE-Blue, cada uma com 14 tons 50→900 + A100→A700). É a única fonte de valores hexadecimais "crus" do arquivo.

`MUI palette` é o token set que hoje alimenta o tema do Material UI em produção (`theme.palette.*`). Tem 2 modos (Light/Dark) e replica a estrutura do objeto de tema do MUI: `primary`, `secondary`, `error`, `warning`, `info`, `success`, `text`, `action`, `background`, `divider`, mais sub-tokens de componente (`components/chip`, `components/input`, `components/switch`, `components/avatar`, `components/rating`, `components/tooltip`, `components/backdrop`, `components/appBar`, `components/breadcrumbs`, `components/stepper`, `components/snackbar`, `_native/scrollbar-bg`). Praticamente todo token de cor "sólida" do MUI palette é alias para algum tom de `material/colors` — por exemplo `primary/main` (light) aponta para `EDGE-Turquoise/500`, `secondary/main` (light) aponta para `EDGE-Blue/500`, `error/main` (light) aponta para `red/700`.

`EDGE palette` é a collection nova: só 1 modo, organizada em três camadas — `Brand/*` (paleta de marca), `Semantic/*` (tokens de superfície/texto/borda/estado/status) e `Components/*` (tokens por componente: Button, Alert, Chip, Status Tag, Breadcrumbs, Pagination, ButtonGroup). A maior parte de `Semantic/*` e `Components/*` são alias — mas os alias apontam só para dois lugares: (a) o próprio `Brand/*` da EDGE palette, ou (b) tons crus de `grey/red/green/blue/amber` em `material/colors`. **Nenhuma variável da EDGE palette faz alias para a collection MUI palette.** As duas collections vivem em paralelo, sem ligação direta entre si.

### 2.2 A duplicação mais importante: Brand/Primary e Brand/Secondary já existem em material/colors

`Brand/Primary/500` (#009F9B) tem exatamente o mesmo valor que `EDGE-Turquoise/500` em material/colors. `Brand/Secondary/500` (#5E6E7D) tem exatamente o mesmo valor que `EDGE-Blue/500`. Isso se repete tom a tom (50 a 900) nas duas escalas.

Ou seja: a escala de marca já existia em `material/colors` (como `EDGE-Turquoise` e `EDGE-Blue`, criada para alimentar o MUI palette) e foi **recriada do zero, com valores hardcoded**, dentro da nova `EDGE palette`, em vez de ser referenciada por alias. Isso é redundância de dado, não de conceito — os dois devem ser o mesmo azul-petróleo e o mesmo slate, mas hoje são duas fontes de verdade independentes. Se alguém atualizar um tom em `EDGE-Turquoise` (por exemplo, para um ajuste de acessibilidade), `Brand/Primary` na EDGE palette não muda junto — risco real de drift entre as duas paletas de marca.

### 2.3 Os tons de status não são equivalentes 1:1 entre EDGE palette e MUI palette

Mesmo quando os dois sistemas usam a mesma família de cor (`red`, `green`, `blue`, `orange`/`amber`), escolhem tons diferentes da escala — então "error", "success", "info" e "warning" **não são visualmente idênticos** entre uma tela feita com MUI palette e uma tela feita com EDGE palette:

| Papel | MUI palette (`*.main`, modo Light) | EDGE palette (`Semantic/Status/*/Border`) | Mesma cor? |
|---|---|---|---|
| Error | red/700 → #D32F2F | red/500 → #F44336 | Não |
| Success | green/800 → #2E7D32 | green/500 → #4CAF50 | Não |
| Info | blue/700 → #0057B2 | blue/500 → #2196F3 | Não |
| Warning | orange/800 → #EF6C00 | amber/500 → #FFC107 | Não — famílias diferentes (orange × amber) |

O warning é o caso mais chamativo: o MUI usa a família `orange`, a EDGE palette usa `amber` — são hues visivelmente diferentes (laranja queimado × dourado). Qualquer tela que misture componentes antigos (MUI palette) com componentes novos (EDGE palette) vai ter dois amarelos/laranjas de warning diferentes na mesma interface.

### 2.4 O que existe em MUI palette / material/colors e ainda não tem equivalente na EDGE palette

- **Dark mode inteiro.** MUI palette tem 2 modos (Light/Dark) para todos os 145 tokens. EDGE palette tem 1 modo só. Enquanto isso não for endereçado, qualquer superfície migrada para tokens EDGE perde suporte a dark mode.
- **Estados via opacidade (alpha).** No MUI palette, hover/selected/focus/focusVisible/outlinedBorder são calculados como a cor base + opacidade (ex.: `primary/hover` = `#07BEBE0A`, 4% de opacidade) — funcionam sobre qualquer fundo. Na EDGE palette, os estados equivalentes (`Semantic/State/Hover`, etc.) são cores sólidas fixas (ex.: `Brand/Primary/100`) — não se adaptam a fundos diferentes e não têm variante para modo escuro.
- **Sistema de elevação (`background/paper-elevation-0` a `-24`).** Usado pelo MUI para simular profundidade com overlays de branco sobre a superfície no dark mode. Sem equivalente na EDGE palette.
- **Tokens de texto via alpha sobre preto/branco.** MUI `text/primary|secondary|disabled` usam preto ou branco com opacidade (ex. `#000000DE`), o que também sustenta a troca automática de tema. A EDGE palette usa tons sólidos de cinza (`grey/900`, `grey/700`, `grey/500`) — funciona bem em modo claro, mas precisaria ser redefinido tom a tom para dark mode.
- **Tokens de componente ainda não portados**: `components/rating`, `components/avatar`, `components/input` (standard/filled/outlined), `components/switch`, `components/tooltip`, `components/backdrop`, `components/appBar`, `components/snackbar`, `components/stepper/connector`, `_native/scrollbar-bg`. Nenhum desses tem um `Components/*` correspondente na EDGE palette — esses componentes, se usados, seguem 100% dependentes do MUI palette hoje.
- **Grupo `neutral/*`** (main/dark/light/contrast/hover/selected/focusVisible/outlinedBorder) do MUI palette não tem equivalente direto — o `Semantic/Status/Neutral` da EDGE palette cobre só o caso de status/tag, não uma cor neutra de tema genérica.
- **Famílias de cor cruas não usadas pela EDGE palette**: purple, orange, indigo, deepPurple, pink, deepOrange, lightGreen, lime, yellow, cyan, teal, blueGrey — usadas em `material/colors` (e por consequência, indiretamente, por telas em MUI palette), mas sem nenhum papel na EDGE palette.

### 2.5 Inconsistências internas encontradas na própria EDGE palette

- **Alias quebrado**: `Semantic/State/Disabled` aponta para uma variável (`VariableID:204:2921`) que não resolve — token órfão, precisa de conserto ou remoção.
- **Nomenclatura legada duplicada**: `surface/default`, `surface/disabled`, `text/primary`, `text/disabled` (minúsculo, sem prefixo) coexistem com `Semantic/Surface/Default`, `Semantic/Surface/Disabled`, `Semantic/Text/Primary`, `Semantic/Text/Disabled` — mesmos valores, hardcoded em vez de alias, aparentam ser resquício de uma convenção anterior à introdução do prefixo "Semantic/".
- **Tons repetidos na escala de marca**: `Brand/Primary/100` = `Brand/Primary/200` (#BCE8E9) e `Brand/Secondary/50` = `Brand/Secondary/200` = `Brand/Secondary/300` (#E2E1E0) — a escala de 50 a 900 ainda não foi totalmente diferenciada nesses tons intermediários.
- **Hardcodes pontuais que pulam a camada semântica**: os tokens `Components/ButtonGroup/Divider/{Error,Warning,Info}/Outlined` e `Divider/Inherit/*` usam hex direto (#D32F2F, #EF6C00, #0057B2, #BDBDBD, #000000) em vez de apontar para `Semantic/Status/*` — quebra o padrão de alias seguido no resto da collection.

---

## 3. Ponto de situação: quanto ainda dependemos do MUI

A EDGE palette já cobre bem o essencial de UI de conteúdo: marca (Brand/Primary, Brand/Secondary), superfícies, texto, bordas, estados de interação simples e os 5 componentes mais usados em telas de produto (Button, Alert, Chip, Status Tag, Breadcrumbs, Pagination, ButtonGroup). Para esse universo, dá para migrar uma tela de MUI palette para EDGE palette sem perda de cobertura — mas com um cuidado: os tons de status (error/success/info/warning) mudam de valor, então a migração muda a cor visível, não é 1:1.

Fora desse universo, a dependência do MUI palette (e por consequência, do material/colors) ainda é real e concentrada em três frentes: dark mode (a EDGE palette simplesmente não tem, hoje, versão escura de nenhum token), estados de interação via opacidade (o MUI resolve hover/focus/selected como camadas translúcidas que funcionam em qualquer fundo; a EDGE palette resolve como cor sólida fixa), e um conjunto de componentes de UI mais "de sistema" — Avatar, Rating, Input, Switch, Tooltip, Backdrop, AppBar, Snackbar, Stepper, scrollbar — que ainda não têm nenhum token equivalente na EDGE palette e continuam 100% MUI.

Antes de qualquer migração em massa, vale resolver os dois pontos de higiene encontrados: o alias quebrado em `Semantic/State/Disabled`, e a duplicação de valores entre `Brand/Primary`/`Brand/Secondary` (EDGE palette) e `EDGE-Turquoise`/`EDGE-Blue` (material/colors) — o ideal seria a EDGE palette apontar por alias para essas escalas em vez de redefinir os mesmos hex, para eliminar o risco de as duas paletas de marca divergirem no futuro.
