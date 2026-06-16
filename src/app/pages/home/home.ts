import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  freeTemplates = [
    { icon: '🎬', name: 'Filmes & Séries', desc: 'Venda acesso a catálogos de streaming com planos mensais.' },
    { icon: '📺', name: 'IPTV', desc: 'Gerencie planos de IPTV com renovação pelo bot.' },
    { icon: '📖', name: 'Mangás', desc: 'Venda capítulos, volumes e assinaturas de mangá.' },
  ];

  paidTemplates = [
    { icon: '📚', name: 'E-books & Cursos' },
    { icon: '🎮', name: 'Jogos & Contas' },
    { icon: '👗', name: 'Produtos Físicos' },
    { icon: '🎵', name: 'Música & Arte' },
    { icon: '💻', name: 'Software & Licenças' },
    { icon: '🎓', name: 'Mentorias' },
  ];

  plans = [
    {
      name: 'Grátis',
      price: 'R$ 0',
      period: 'para sempre',
      highlight: false,
      features: [
        '3 templates incluídos',
        '1 bot ativo',
        'Gerador de código',
        'Suporte da comunidade',
      ],
      cta: 'Começar grátis',
      note: null,
    },
    {
      name: 'Mensal',
      price: 'R$ 52,90',
      period: 'por mês',
      highlight: true,
      features: [
        'Todos os templates',
        'Bots ilimitados',
        'Flow builder visual',
        'Preview em tempo real',
        'Suporte prioritário',
      ],
      cta: 'Assinar agora',
      note: null,
    },
    {
      name: 'Semestral',
      price: 'R$ 250,00',
      period: '6 meses',
      highlight: false,
      features: [
        'Tudo do plano Mensal',
        'Economia de R$ 67,40',
        'Bots ilimitados',
        'Suporte prioritário',
      ],
      cta: 'Assinar semestral',
      note: 'R$ 41,66/mês',
    },
    {
      name: 'Anual',
      price: 'R$ 400,00',
      period: 'por ano',
      highlight: false,
      features: [
        'Tudo do plano Mensal',
        'Economia de R$ 234,80',
        'Bots ilimitados',
        'Suporte VIP',
      ],
      cta: 'Assinar anual',
      note: 'R$ 33,33/mês',
    },
  ];
}
