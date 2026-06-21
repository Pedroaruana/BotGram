import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';

type Period = 'mensal' | 'semestral' | 'anual';

interface Plan {
  name: string;
  tag: string | null;
  price: Record<Period, string>;
  perMonth: Record<Period, string | null>;
  savings: Record<Period, string | null>;
  features: string[];
  notIncluded: string[];
  cta: string;
  highlight: boolean;
}

@Component({
  selector: 'app-pricing',
  imports: [RouterLink],
  templateUrl: './pricing.html',
  styleUrl: './pricing.scss',
})
export class Pricing {
  activePeriod = signal<Period>('mensal');

  periods: { value: Period; label: string }[] = [
    { value: 'mensal', label: 'Mensal' },
    { value: 'semestral', label: 'Semestral' },
    { value: 'anual', label: 'Anual' },
  ];

  plans: Plan[] = [
    {
      name: 'Grátis',
      tag: null,
      price: { mensal: 'R$ 0', semestral: 'R$ 0', anual: 'R$ 0' },
      perMonth: { mensal: null, semestral: null, anual: null },
      savings: { mensal: null, semestral: null, anual: null },
      features: [
        '3 templates (Filmes, IPTV, Mangás)',
        '1 bot ativo',
        'Gerador de código Node.js',
        'Download do bot.js',
        'Suporte da comunidade',
      ],
      notIncluded: [
        'Templates premium',
        'Bots ilimitados',
        'Flow builder visual',
        'Suporte prioritário',
      ],
      cta: 'Começar grátis',
      highlight: false,
    },
    {
      name: 'Pro',
      tag: 'Mais popular',
      price: { mensal: 'R$ 52,90', semestral: 'R$ 250,00', anual: 'R$ 400,00' },
      perMonth: { mensal: null, semestral: 'R$ 41,67/mês', anual: 'R$ 33,33/mês' },
      savings: { mensal: null, semestral: 'Economize R$ 67,40', anual: 'Economize R$ 234,80' },
      features: [
        'Todos os 9 templates',
        'Bots ilimitados',
        'Flow builder visual',
        'Preview em tempo real',
        'Gerador de código Node.js',
        'Download do bot.js',
        'Suporte prioritário',
      ],
      notIncluded: [],
      cta: 'Assinar agora',
      highlight: true,
    },
  ];

  currentPrice = computed(() =>
    this.plans.map(p => ({
      ...p,
      displayPrice: p.price[this.activePeriod()],
      displayPerMonth: p.perMonth[this.activePeriod()],
      displaySavings: p.savings[this.activePeriod()],
    }))
  );

  faq = [
    {
      q: 'Preciso saber programar?',
      a: 'Não. Você preenche o formulário, clica em gerar e baixa o arquivo pronto. Para rodar o bot basta ter o Node.js instalado.',
    },
    {
      q: 'O que é o token do Telegram?',
      a: 'É uma chave que o BotFather (bot oficial do Telegram) gera pra você. É gratuito e leva menos de 1 minuto.',
    },
    {
      q: 'Posso cancelar quando quiser?',
      a: 'Sim. Não tem fidelidade. Você cancela e o plano continua ativo até o fim do período pago.',
    },
    {
      q: 'Os bots gerados ficam funcionando para sempre?',
      a: 'Sim. O código gerado é seu. Mesmo cancelando o plano, seus bots continuam rodando normalmente.',
    },
  ];

  compareRows: { feature: string; free: boolean | string; pro: boolean | string }[] = [
    { feature: 'Templates incluídos', free: '3', pro: '9 (todos)' },
    { feature: 'Bots ativos', free: '1', pro: 'Ilimitados' },
    { feature: 'Gerador de código', free: true, pro: true },
    { feature: 'Download do bot.js', free: true, pro: true },
    { feature: 'Preview em tempo real', free: true, pro: true },
    { feature: 'Flow builder visual', free: false, pro: true },
    { feature: 'Templates premium', free: false, pro: true },
    { feature: 'Suporte prioritário', free: false, pro: true },
  ];

  openFaq = signal<number | null>(null);

  toggleFaq(index: number) {
    this.openFaq.update(i => (i === index ? null : index));
  }
}
