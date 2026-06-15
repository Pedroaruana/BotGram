# BotGram

Construtor visual de bots de venda para o Telegram. Escolha um template, personalize mensagens e preços, e gere o código pronto do seu bot — sem precisar saber programar.

## Sobre o projeto

O BotGram nasceu da necessidade de facilitar a criação de bots de venda no Telegram para pequenos empreendedores. A ideia é simples: o usuário preenche um formulário visual, vê um preview em tempo real de como o bot vai responder, e no final recebe o código `.js` pronto para rodar no servidor.

**Funcionalidades:**
- 6+ templates prontos (Filmes, IPTV, E-books, Jogos, Produtos Físicos, Música)
- Wizard de personalização com formulário em etapas
- Preview em tempo real simulando o Telegram
- Gerador de código com syntax highlight
- Flow builder visual para personalizar o fluxo de conversa

## Stack

- Angular 21 (standalone components + signals)
- Tailwind CSS v4
- Angular Reactive Forms
- @angular/animations
- Prism.js

## Rodando localmente

```bash
# instalar dependências
npm install

# iniciar servidor de desenvolvimento
ng serve
```

Acesse `http://localhost:4200`

## Build

```bash
ng build
```

Os arquivos de produção ficam na pasta `dist/`.

## Licença

MIT © [Pedro](mailto:aruanapedro@gmail.com)
