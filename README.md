# BotGram

**Demo ao vivo → [botgram-henna.vercel.app](https://botgram-henna.vercel.app)**

Construtor visual de bots de venda para o Telegram. Você configura tudo pelo site — produtos, preços e mensagens — e recebe o código do bot pronto pra rodar. Sem precisar saber programar.

---

## Sobre

O BotGram surgiu de uma observação simples: muita gente vende pelo Telegram mas não sabe criar um bot, e as alternativas existentes são ou muito técnicas ou muito caras. A ideia foi criar uma ferramenta onde qualquer pessoa consegue configurar o bot em minutos, só preenchendo um formulário.

O usuário escolhe um template (Filmes & Séries, IPTV, Mangás...), preenche as informações do negócio e vê em tempo real como o bot vai responder — tem até um preview estilo Telegram na lateral. No final, baixa um arquivo `bot.js` pronto pra rodar.

## Por que fiz

Trabalhei por 2 anos com tráfego pago no nicho de filmes e séries e usei bots do Telegram como parte da operação — tanto pra venda quanto pra entrega do produto. Nesse tempo vi como é difícil pra quem não sabe programar montar e manter um bot, mesmo sendo algo tão simples do ponto de vista técnico.

Quando comecei a estudar desenvolvimento, fez sentido construir exatamente isso. Além de ter utilidade real, foi uma forma de aprofundar em Angular com signals (que é como o framework tá caminhando) e trabalhar com um design mais elaborado do que o comum em projetos de estudo.

## Funcionalidades

- 9 templates prontos divididos em grátis e Pro
- Wizard em 4 etapas com validação e navegação entre passos
- Preview em tempo real simulando uma conversa no Telegram
- Gerador de código Node.js com botão de copiar e download do `bot.js`
- Página de pricing com toggle entre planos (Mensal, Semestral, Anual)
- Tabela de comparação de planos e FAQ
- Responsivo — funciona no celular

## Stack

- **Angular 21** — standalone components, signals, lazy loading por rota
- **Tailwind CSS v4** — via `@tailwindcss/postcss`
- **TypeScript** — tipagem em tudo
- **Node.js** — código gerado usa `node-telegram-bot-api`
- **Vercel** — deploy e hospedagem

## Arquitetura

```
src/
├── app/
│   ├── layout/
│   │   └── navbar/          # Navbar fixa com roteamento
│   ├── pages/
│   │   ├── home/            # Landing page com hero, templates e planos
│   │   ├── templates/       # Grid de templates com filtros
│   │   ├── wizard/          # Configurador de bot em 4 etapas
│   │   └── pricing/         # Página de preços com toggle de período
│   └── shared/
│       └── template-card/   # Card reutilizável + interface BotTemplate
└── styles.scss              # Variáveis CSS globais e Tailwind
```

Cada página é um standalone component carregado via lazy loading. O wizard usa signals para reatividade — todos os campos são `signal()` e o preview e o código gerado são `computed()` que derivam desses campos automaticamente.

## Rodando localmente

```bash
npm install
ng serve
```

Acesse `http://localhost:4200`

## Desafios

**Signals com formulários** — Angular signals não funcionam com `[(ngModel)]` direto. Tive que separar em `[ngModel]="campo()"` e `(ngModelChange)="campo.set($event)"` pra cada campo, o que é mais verboso mas funciona bem com reatividade.

**Preview em tempo real** — Fazer o painel do Telegram atualizar enquanto o usuário digita exigiu mapear cada campo do formulário para um `computed()` correspondente. Qualquer mudança em qualquer campo reflete imediatamente na simulação sem nenhum evento manual.

**Tailwind v4 no Angular** — A versão 4 do Tailwind mudou a forma de configurar. Não usa mais `tailwind.config.js` da mesma forma — precisei configurar via `postcss.config.mjs` com `@tailwindcss/postcss`, o que levou um tempo pra entender.

**Geração de código dinâmico** — O `bot.js` gerado é montado como uma string dentro de um `computed()`, o que significa que ele se reconstrói automaticamente sempre que qualquer dado do formulário muda. Exigiu cuidado com escaping de caracteres especiais dentro do template literal.

## Estrutura do projeto

```
src/
├── app/
│   ├── layout/
│   │   └── navbar/
│   ├── pages/
│   │   ├── home/
│   │   ├── templates/
│   │   ├── wizard/
│   │   └── pricing/
│   └── shared/
│       └── template-card/
└── styles.scss
```

---

Feito por **Pedro Aruana** — [aruanapedro@gmail.com](mailto:aruanapedro@gmail.com) · [github.com/Pedroaruana](https://github.com/Pedroaruana)

MIT License © 2026
