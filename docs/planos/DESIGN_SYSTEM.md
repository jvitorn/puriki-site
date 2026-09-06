# Puriki Site — Sistema Visual e de Interação

## Direção

Estilo: **editorial escuro + produto em primeiro plano**.

O site funciona como uma moldura ao redor dos screenshots do aplicativo Puriki, em vez de competir visualmente com eles.

Evitar:

- decoração genérica de "site de anime";
- papel de parede de sakura/kanji;
- paleta cyberpunk neon;
- gradientes excessivos;
- glassmorphism generalizado;
- partículas ruidosas;
- terminais de código decorativos grandes;
- dezenas de cards.

## Tema

O lançamento inicial é dark-only. Não implementar alternância para modo claro na primeira versão.

## Tipografia

Família principal: `Geist`.

Regras:

- hospedar os arquivos da fonte localmente quando a licença/distribuição permitir;
- definir fallbacks de sistema robustos;
- não buscar a fonte do Google Fonts em runtime;
- usar fallbacks compatíveis com japonês para os glifos da marca quando necessário;
- não usar fontes japonesas decorativas em corpo de texto ou headings de seção.

Escala de título:

- Hero desktop: aproximadamente 56–64px;
- Hero mobile: aproximadamente 38–44px;
- manter dimensionamento fluido e acessível;
- evitar alturas fixas amarradas a um tamanho de fonte específico.

## Tokens de cor

A implementação final usa tokens semânticos.

Base sugerida:

```text
--background
--surface
--surface-raised
--surface-hover

--border
--border-strong

--foreground
--foreground-muted
--foreground-subtle

--brand
--brand-hover
--brand-soft
--brand-foreground

--success
--warning
--danger
```

Direção de paleta inicial:

```text
background      #0B0E14
surface         #111522
surface-raised  #1A2030
border-strong   #293043
brand           #970C10
brand-highlight #D9474C
foreground      #F8FAFC
```

O contraste WCAG real de cada combinação foreground/background precisa ser testado (ver o registro da Fase 01 para os valores finais medidos). Não hardcodear `#970C10` em componentes individuais — componentes sempre referenciam o token `brand`.

## Uso da cor de marca

O vermelho da marca deve ser relativamente raro.

Usar para:

- CTA primário;
- detalhes de destaque/ativo;
- estados selecionados/ativos;
- ênfase pontual no roadmap;
- destaque do conector entre providers;
- pequenos acentos do logo.

Evitar:

- todo heading em vermelho;
- toda borda de card em vermelho;
- grandes fundos vermelhos ao longo da página.

## Superfícies

Cards:

- raio moderado;
- borda sutil de 1px;
- sombra mínima;
- sem tratamento de blur translúcido generalizado.

Hierarquia de raio sugerida:

- botão: ~8–10px;
- card: ~14–18px;
- bloco maior: ~20–24px;
- pill apenas para badges/status quando semanticamente apropriado.

## Layout

Largura máxima geral de conteúdo: ~1200–1280px.

Largura de linha legível para corpo de texto longo: ~600–700px.

Espaçamento vertical de seção no desktop: ~120–140px, dependendo do conteúdo. No mobile: ~72–96px. Esses números são uma referência de ritmo visual, não constantes fixas obrigatórias.

## Header

Desktop:

- marca à esquerda;
- navegação compacta;
- ação secundária GitHub;
- ação primária Download;
- comportamento sticky permitido;
- ao rolar, fundo levemente opaco/translúcido e borda inferior sutil, quando necessário para legibilidade.

Mobile:

- marca à esquerda;
- botão de menu acessível à direita;
- Sheet do shadcn para navegação;
- seletor de idioma dentro do menu;
- ação de Download em destaque.

## Hero

Desktop:

- composição em duas colunas;
- copy/CTA à esquerda;
- um único mockup forte do app à direita.

Ordem semântica no mobile:

1. H1
2. texto de apoio
3. grupo de CTAs
4. mockup do produto

Não usar `min-height: 100vh` como requisito rígido. A próxima seção pode entrar sutilmente na viewport para incentivar o scroll.

## Screenshots do app

Screenshots são a principal evidência visual.

Hero: moldura completa de smartphone genérico é permitida.

Showcases:

- não repetir a mesma moldura de telefone completa toda vez;
- usar painéis recortados, screenshots parcialmente cortados ou sobreposição comedida;
- manter a UI real do app legível;
- evitar marca falsa de fabricante de hardware.

Otimização de assets:

- a captura de origem pode continuar em PNG;
- derivados web devem usar WebP/AVIF quando apropriado;
- dimensões precisam ser declaradas;
- imagens abaixo da dobra devem usar lazy load;
- o visual do Hero deve ser priorizado.

## Visual da relação entre providers

Layout conceitual no desktop:

`AniList -> Puriki <- MyAnimeList`

Mobile: composição vertical que ainda comunica "os dois provedores se conectam ao Puriki".

Importante:

- não sugerir visualmente AniList -> MAL na 1.0;
- as identidades dos providers não podem dominar o Puriki;
- o layout precisa funcionar com rótulos de texto mesmo sem logos aprovados/usados.

## Motion com Anime.js

Duração de movimento deve ser comedida.

Usar para:

- revelação de seção;
- stagger pequeno;
- entrada de screenshot;
- desenho do conector entre providers;
- polimento sutil de hover/focus.

Não usar para:

- movimento em loop no hero;
- efeito que segue o cursor;
- partículas;
- flutuação contínua;
- embaralhamento decorativo de texto;
- transições que atrasam a leitura.

Reduced motion — quando `prefers-reduced-motion: reduce`:

- renderizar o conteúdo imediatamente;
- desabilitar parallax;
- minimizar/desabilitar animações de transform não essenciais;
- evitar scroll suave forçado.

## Regras responsivas

Os breakpoints principais podem seguir as faixas comuns do Tailwind.

Intenção comportamental:

- mobile-first;
- tablet como transição, não um redesign separado;
- desktop a partir de ~1024px;
- nenhuma interação depende de hover;
- alvos de toque para ações-chave com ~44x44px no mínimo.

Showcases no desktop podem alternar os lados de imagem/texto. A ordem de leitura do DOM no mobile precisa continuar sendo: título, copy, imagem — nunca reordenar a semântica só para preservar a alternância visual do desktop.

## Tratamento de fundo

Opcional:

- tratamento de grid muito sutil no Hero ou em uma área estratégica;
- glow radial de marca com baixa opacidade atrás do mockup do Hero.

Não aplicar grid ou fundo animado na página inteira.

## Iconografia

Usar Lucide React.

Diretrizes:

- peso de traço consistente;
- o ícone reforça o significado;
- não adicionar ícone a todo rótulo/botão;
- ícones significativos não substituem texto;
- ícones decorativos são escondidos de tecnologia assistiva apropriadamente.

## Estados de foco

O foco precisa ser claramente visível contra fundos escuros.

O estilo de foco deve:

- não depender só de cor quando o contraste for fraco;
- ser consistente entre links/botões/accordion/menu;
- permanecer visível tanto em superfícies padrão quanto nas com cor de marca.

## 404

Uma 404 pequena e com identidade de marca é aceitável.

Exemplo de tom:

`Página não encontrada`

Linha temática opcional:
`Parece que esse anime não está nesta lista.`

CTA:
`Voltar para o Puriki`

Manter acessível e simples.
