# Fase 00 — Fundação do Projeto

## Objetivo

Criar uma base limpa e reprodutível para o `puriki-site`, sem ainda implementar a landing completa. Ao final, outro desenvolvedor deveria conseguir clonar, instalar, testar e buildar o site usando comandos documentados.

## Escopo

### Gerenciamento de pacotes

- [x] Uso de `pnpm`.
- [x] `pnpm-lock.yaml` commitado.
- [x] Faixa suportada de Node.js definida no `package.json`.
- [x] Versão de Node compatível com LTS para o GitHub Actions.
- [x] Sem lockfiles de npm/yarn.

### React/Vite/TypeScript

- [x] React + TypeScript inicializados.
- [x] Vite configurado.
- [x] TypeScript estrito, adequado a um projeto pequeno de produção.
- [x] Aliases de path apenas onde melhoram os imports, sem taxonomia complexa.
- [x] Código-fonte em inglês.

### Arquitetura estática do React Router

- [x] React Router Framework Mode configurado.
- [x] `ssr: false`.
- [x] Configuração de prerender preparada.
- [x] Rota de teste gera output estático utilizável.
- [x] Rota aninhada direta é representável como um caminho de arquivo estático real.
- [x] Sem HashRouter.

### Estilo

- [x] Tailwind CSS.
- [x] Entrada de estilo base.
- [x] Configuração do shadcn/ui.
- [x] Nenhum conjunto grande de componentes instalado ainda.
- [x] Lucide React.
- [x] Anime.js.

### Testes

- [x] Vitest.
- [x] React Testing Library.
- [x] `@testing-library/jest-dom` (matchers de DOM).
- [x] Arquivo de setup de testes.
- [x] Um smoke test básico provando que o ambiente de teste funciona.

### Qualidade de código

- [x] ESLint configurado para React/TypeScript.
- [x] Convenção de formatação (Prettier).
- [x] `.editorconfig`.
- [x] Final de linha e newline final consistentes.
- [x] Output de build ignorado pelo Git.

### Scripts

- [x] `dev`, `build`, `test`, `test:watch`, `lint`, `typecheck`, `format`/`format:check` — todos funcionando a partir de um clone limpo.

### Modelo de configuração/ambiente

- [x] `SITE_URL` e `BASE_PATH` como configuração pública de build.
- [x] Nenhum segredo em variáveis de ambiente do Vite.
- [x] Nenhum placeholder falso de segredo em `.env`.
- [x] Documentado o que é configuração segura/pública.

Suposições iniciais: origem local de dev conforme apropriado; base de produção do project site `/puriki-site/`; base de um futuro domínio próprio `/`.

### Documentação do repositório

README raiz atualizado com propósito do projeto, pré-requisitos, instalação, dev, teste, build, caminho dos documentos de planejamento, aviso de que nenhum APK é hospedado neste repositório, e link para o repositório do app — sem duplicar os documentos de planejamento completos.

## Fora de escopo nesta fase

Design final, rotas completas de idioma, seções completas da landing, fetch de GitHub Release, Action de GitHub Pages, conteúdo de Privacy/Terms, schema de SEO.

## Validação

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

- [x] todos os comandos passam;
- [x] o output é compatível com deploy estático;
- [x] nenhum segredo aparece no bundle do cliente;
- [x] o dev server carrega sem erros de console;
- [x] o ambiente de teste funciona.

## Critérios de aceite

A Fase 00 está completa quando um clone limpo consegue rodar todos os comandos de validação, a arquitetura de prerender estático está comprovada (não só planejada), o projeto não depende de um runtime de servidor, a estratégia de base path está documentada, e nenhum conteúdo de produto foi construído prematuramente.
