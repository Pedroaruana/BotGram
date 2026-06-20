import { Component, signal, computed, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BotTemplate } from '../../shared/template-card/template-card';

interface Step { number: number; label: string; desc: string; }
interface Product { name: string; price: string; desc: string; }

const ALL_TEMPLATES: BotTemplate[] = [
  { id: 1, icon: '🎬', name: 'Filmes & Séries', desc: '', category: 'Entretenimento', free: true, preview: [] },
  { id: 2, icon: '📺', name: 'IPTV', desc: '', category: 'Entretenimento', free: true, preview: [] },
  { id: 3, icon: '📖', name: 'Mangás', desc: '', category: 'Entretenimento', free: true, preview: [] },
  { id: 4, icon: '📚', name: 'E-books & Cursos', desc: '', category: 'Digital', free: false, preview: [] },
  { id: 5, icon: '🎮', name: 'Jogos & Contas', desc: '', category: 'Games', free: false, preview: [] },
  { id: 6, icon: '👗', name: 'Produtos Físicos', desc: '', category: 'Loja', free: false, preview: [] },
  { id: 7, icon: '🎵', name: 'Música & Beats', desc: '', category: 'Arte', free: false, preview: [] },
  { id: 8, icon: '💻', name: 'Software & Licenças', desc: '', category: 'Digital', free: false, preview: [] },
  { id: 9, icon: '🎓', name: 'Mentorias', desc: '', category: 'Serviços', free: false, preview: [] },
];

@Component({
  selector: 'app-wizard',
  imports: [RouterLink, FormsModule],
  templateUrl: './wizard.html',
  styleUrl: './wizard.scss',
})
export class Wizard implements OnInit {
  currentStep = signal(1);
  template: BotTemplate | null = null;

  steps: Step[] = [
    { number: 1, label: 'Bot', desc: 'Informações básicas' },
    { number: 2, label: 'Produtos', desc: 'O que você vende' },
    { number: 3, label: 'Mensagens', desc: 'Textos do bot' },
    { number: 4, label: 'Pagamento', desc: 'Como receber' },
  ];

  totalSteps = this.steps.length;
  progress = computed(() => (this.currentStep() / this.totalSteps) * 100);
  isFirst = computed(() => this.currentStep() === 1);
  isLast = computed(() => this.currentStep() === this.totalSteps);

  // Step 1 — signals para reatividade no preview
  botName = signal('');
  botToken = signal('');
  botDesc = signal('');

  // Step 2
  products = signal<Product[]>([{ name: '', price: '', desc: '' }]);

  // Step 3
  welcomeMsg = signal('');
  menuTitle = signal('');

  // Step 4
  pixKey = signal('');
  paymentNote = signal('');

  // Preview computed
  previewBotName = computed(() => this.botName() || 'Meu Bot de Vendas');
  previewWelcome = computed(() => this.welcomeMsg() || 'Olá! 👋 Bem-vindo. O que você procura?');
  previewMenu = computed(() => this.menuTitle() || 'Escolha uma opção:');
  previewProducts = computed(() =>
    this.products().filter(p => p.name).length > 0
      ? this.products().filter(p => p.name)
      : [{ name: 'Produto exemplo', price: 'R$ 00,00', desc: '' }]
  );
  previewFirstProduct = computed(() => this.previewProducts()[0]);

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.template = ALL_TEMPLATES.find(t => t.id === id) ?? null;
    if (this.template) this.botName.set(this.template.name);
  }

  addProduct() {
    this.products.update(list => [...list, { name: '', price: '', desc: '' }]);
  }

  removeProduct(index: number) {
    if (this.products().length === 1) return;
    this.products.update(list => list.filter((_, i) => i !== index));
  }

  updateProduct(index: number, field: keyof Product, value: string) {
    this.products.update(list =>
      list.map((p, i) => i === index ? { ...p, [field]: value } : p)
    );
  }

  next() { if (!this.isLast()) this.currentStep.update(s => s + 1); }
  back() { if (!this.isFirst()) this.currentStep.update(s => s - 1); }
  goTo(step: number) { if (step < this.currentStep()) this.currentStep.set(step); }
}
