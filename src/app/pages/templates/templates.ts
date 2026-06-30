import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TemplateCard, BotTemplate } from '../../shared/template-card/template-card';
import { ApiService } from '../../services/api.service';

type Filter = 'todos' | 'gratis' | 'pro';

const PREVIEWS: Record<number, string[]> = {
  1: ['👋 Olá! Bem-vindo ao catálogo.', '🎬 Plano mensal: R$ 29,90', '✅ Acesso a +5000 títulos em 4K'],
  2: ['📺 Planos disponíveis:', '• Mensal — R$ 35,00', '• Trimestral — R$ 90,00'],
  3: ['📖 Catálogo de mangás', '• Assinatura mensal: R$ 19,90', '• Acesso a +300 títulos'],
  4: ['📚 Qual curso você quer?', '• Marketing Digital — R$ 97', '• Design Gráfico — R$ 147'],
  5: ['🎮 O que você procura?', '• Conta Netflix — R$ 15,00', '• Robux 800 — R$ 25,00'],
  6: ['🛍️ Nosso catálogo:', '• Camiseta básica — R$ 49,90', '• Envio para todo Brasil'],
  7: ['🎵 Beats disponíveis:', '• Licença básica — R$ 49,90', '• Licença exclusiva — R$ 299'],
  8: ['💻 Softwares disponíveis:', '• Windows 11 — R$ 49,90', '• Office 2024 — R$ 79,90'],
  9: ['🎓 Agendar mentoria:', '• 1 sessão — R$ 150,00', '• Pacote 4 sessões — R$ 500,00'],
};

const FALLBACK_TEMPLATES: BotTemplate[] = [
  { id: 1, icon: '🎬', name: 'Filmes & Séries', desc: 'Venda acesso a catálogos de streaming com planos mensais e anuais.', category: 'Entretenimento', free: true, preview: PREVIEWS[1] },
  { id: 2, icon: '📺', name: 'IPTV', desc: 'Gerencie planos de IPTV com ativação e renovação direto pelo bot.', category: 'Entretenimento', free: true, preview: PREVIEWS[2] },
  { id: 3, icon: '📖', name: 'Mangás', desc: 'Venda capítulos, volumes e assinaturas de mangá para seus clientes.', category: 'Entretenimento', free: true, preview: PREVIEWS[3] },
  { id: 4, icon: '📚', name: 'E-books & Cursos', desc: 'Entregue materiais digitais e cursos com link automático após pagamento.', category: 'Digital', free: false, preview: PREVIEWS[4] },
  { id: 5, icon: '🎮', name: 'Jogos & Contas', desc: 'Venda contas, créditos e itens de jogos com entrega automática.', category: 'Games', free: false, preview: PREVIEWS[5] },
  { id: 6, icon: '👗', name: 'Produtos Físicos', desc: 'Catálogo de produtos com fotos, preços e link de pagamento integrado.', category: 'Loja', free: false, preview: PREVIEWS[6] },
  { id: 7, icon: '🎵', name: 'Música & Beats', desc: 'Venda beats, samples e assinaturas de conteúdo exclusivo.', category: 'Arte', free: false, preview: PREVIEWS[7] },
  { id: 8, icon: '💻', name: 'Software & Licenças', desc: 'Venda chaves de ativação e licenças de softwares com entrega imediata.', category: 'Digital', free: false, preview: PREVIEWS[8] },
  { id: 9, icon: '🎓', name: 'Mentorias', desc: 'Agende sessões de mentoria e receba pagamentos pelo próprio bot.', category: 'Serviços', free: false, preview: PREVIEWS[9] },
];

@Component({
  selector: 'app-templates',
  imports: [RouterLink, TemplateCard],
  templateUrl: './templates.html',
  styleUrl: './templates.scss',
})
export class Templates implements OnInit {
  private api = inject(ApiService);
  private router = inject(Router);

  activeFilter = signal<Filter>('todos');
  selectedTemplate = signal<BotTemplate | null>(null);
  loading = signal(true);
  source = signal<'api' | 'fallback'>('fallback');
  allTemplates = signal<BotTemplate[]>(FALLBACK_TEMPLATES);

  templates = computed(() => {
    const f = this.activeFilter();
    const list = this.allTemplates();
    if (f === 'gratis') return list.filter(t => t.free);
    if (f === 'pro') return list.filter(t => !t.free);
    return list;
  });

  filters: { label: string; value: Filter }[] = [
    { label: 'Todos', value: 'todos' },
    { label: 'Grátis', value: 'gratis' },
    { label: 'Pro', value: 'pro' },
  ];

  ngOnInit() {
    this.api.getTemplates().subscribe({
      next: ({ data }) => {
        this.allTemplates.set(data.map(t => ({ ...t, preview: PREVIEWS[t.id] ?? [] })));
        this.source.set('api');
        this.loading.set(false);
      },
      error: () => {
        this.source.set('fallback');
        this.loading.set(false);
      },
    });
  }

  setFilter(f: Filter) {
    this.activeFilter.set(f);
  }

  openPreview(template: BotTemplate) {
    this.selectedTemplate.set(template);
  }

  closePreview() {
    this.selectedTemplate.set(null);
  }

  useTemplate(id: number) {
    this.router.navigate(['/wizard', id]);
  }
}
