import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TemplateCard, BotTemplate } from '../../shared/template-card/template-card';

@Component({
  selector: 'app-templates',
  imports: [RouterLink, TemplateCard],
  templateUrl: './templates.html',
  styleUrl: './templates.scss',
})
export class Templates {
  templates: BotTemplate[] = [
    {
      id: 1,
      icon: '🎬',
      name: 'Filmes & Séries',
      desc: 'Venda acesso a catálogos de streaming com planos mensais e anuais.',
      category: 'Entretenimento',
      free: true,
      preview: ['👋 Olá! Bem-vindo ao catálogo.', '🎬 Plano mensal: R$ 29,90', '✅ Acesso a +5000 títulos em 4K'],
    },
    {
      id: 2,
      icon: '📺',
      name: 'IPTV',
      desc: 'Gerencie planos de IPTV com ativação e renovação direto pelo bot.',
      category: 'Entretenimento',
      free: true,
      preview: ['📺 Planos disponíveis:', '• Mensal — R$ 35,00', '• Trimestral — R$ 90,00'],
    },
    {
      id: 3,
      icon: '📖',
      name: 'Mangás',
      desc: 'Venda capítulos, volumes e assinaturas de mangá para seus clientes.',
      category: 'Entretenimento',
      free: true,
      preview: ['📖 Catálogo de mangás', '• Assinatura mensal: R$ 19,90', '• Acesso a +300 títulos'],
    },
    {
      id: 4,
      icon: '📚',
      name: 'E-books & Cursos',
      desc: 'Entregue materiais digitais e cursos com link automático após pagamento.',
      category: 'Digital',
      free: false,
      preview: ['📚 Qual curso você quer?', '• Marketing Digital — R$ 97', '• Design Gráfico — R$ 147'],
    },
    {
      id: 5,
      icon: '🎮',
      name: 'Jogos & Contas',
      desc: 'Venda contas, créditos e itens de jogos com entrega automática.',
      category: 'Games',
      free: false,
      preview: ['🎮 O que você procura?', '• Conta Netflix — R$ 15,00', '• Robux 800 — R$ 25,00'],
    },
    {
      id: 6,
      icon: '👗',
      name: 'Produtos Físicos',
      desc: 'Catálogo de produtos com fotos, preços e link de pagamento integrado.',
      category: 'Loja',
      free: false,
      preview: ['🛍️ Nosso catálogo:', '• Camiseta básica — R$ 49,90', '• Envio para todo Brasil'],
    },
    {
      id: 7,
      icon: '🎵',
      name: 'Música & Beats',
      desc: 'Venda beats, samples e assinaturas de conteúdo exclusivo.',
      category: 'Arte',
      free: false,
      preview: ['🎵 Beats disponíveis:', '• Licença básica — R$ 49,90', '• Licença exclusiva — R$ 299'],
    },
    {
      id: 8,
      icon: '💻',
      name: 'Software & Licenças',
      desc: 'Venda chaves de ativação e licenças de softwares com entrega imediata.',
      category: 'Digital',
      free: false,
      preview: ['💻 Softwares disponíveis:', '• Windows 11 — R$ 49,90', '• Office 2024 — R$ 79,90'],
    },
    {
      id: 9,
      icon: '🎓',
      name: 'Mentorias',
      desc: 'Agende sessões de mentoria e receba pagamentos pelo próprio bot.',
      category: 'Serviços',
      free: false,
      preview: ['🎓 Agendar mentoria:', '• 1 sessão — R$ 150,00', '• Pacote 4 sessões — R$ 500,00'],
    },
  ];

  selected: BotTemplate | null = null;

  onTemplateSelect(template: BotTemplate) {
    this.selected = template;
  }
}
