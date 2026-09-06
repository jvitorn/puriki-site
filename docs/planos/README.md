# Puriki Site — Documentação de Planejamento

Esta pasta reúne o histórico de decisões e a evolução técnica da landing oficial do Puriki, organizados por fase de implementação.

## Repositórios

- Repositório do site: `jvitorn/puriki-site`
- Repositório do app: `jvitorn/puriki`
- Branch padrão do site: `main`
- Branch padrão do app: `master`
- Hospedagem: GitHub Pages
- URL pública: `https://jvitorn.github.io/puriki-site/`
- Candidato a domínio próprio futuro: `puriki.app`

## Onde encontrar cada coisa

- **`DECISIONS.md`** — as decisões de produto e arquitetura que não mudam a cada fase (posicionamento, stack, distribuição, i18n, direção visual, acessibilidade, privacidade). É o primeiro lugar para checar antes de questionar algo já definido.
- **`DESIGN_SYSTEM.md`** — a direção visual e de interação do site: tokens, tipografia, motion, iconografia.
- **`CHECKLIST-PT-BR.md`** — o checklist executivo atual do projeto, por fase.
- **`PHASE_00_FOUNDATION.md` até `PHASE_07_LAUNCH_HARDENING.md`** — o registro de cada fase de implementação, na ordem em que aconteceram.

## Como as fases contam a história do projeto

Cada arquivo `PHASE_XX_*.md` documenta uma etapa da evolução do site, do bootstrap inicial até a validação final de lançamento:

| Fase | Nome | Resultado principal |
|---|---|---|
| 00 | Foundation | Base reprodutível do projeto React/Vite/Router |
| 01 | Design System | Tokens, tipografia, shell, primitivas responsivas |
| 02 | Rotas, i18n e Conteúdo | Rotas estáticas por idioma e modelo de conteúdo tipado |
| 03 | Seções da Landing | Experiência completa da landing |
| 04 | Download e Releases | Metadados de release em build-time e UX do APK |
| 04R | Releases Multi-ABI | Revisão do contrato de release para múltiplos APKs por ABI, após a `v1.0.0` real |
| 05 | Acessibilidade, SEO e Legal | Meta WCAG, metadados, Privacy/Terms, regras de motion |
| 06 | Qualidade Automatizada, CI e Deploy | Gates de qualidade automatizados e deploy no GitHub Pages |
| 07 | Validação Final e Lançamento | Validação de produção, precisão de conteúdo, refinamento do Download |
| 08 | Limpeza e Consolidação | Documentação interna em PT-BR, remoção do sandbox Foundation, consolidação geral |

Algumas fases corrigiram decisões de fases anteriores depois que a realidade do produto mudou — por exemplo, a Fase 04R revisou o contrato de release da Fase 04 depois que o Puriki publicou sua primeira versão estável (`v1.0.0`) com um APK por arquitetura, em vez do único APK universal assumido originalmente. Esses documentos preservam a decisão original e explicam por que ela mudou; não foram reescritos para parecer que a decisão final sempre existiu.

## Convenção dos checklists

- `[x]` concluído e validado
- `[ ]` pendente
- itens que deixaram de se aplicar (ex.: um recurso removido depois) ficam marcados como tal, com uma nota explicando o histórico

Pendências que dependem de algo fora do repositório (um dispositivo Android real, um leitor de tela, revisão jurídica) ficam registradas como pendência real — nunca marcadas como concluídas sem terem sido de fato verificadas.
