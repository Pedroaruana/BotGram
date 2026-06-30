import { Component, signal, computed, OnInit, inject, effect } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BotTemplate } from '../../shared/template-card/template-card';
import { ApiService } from '../../services/api.service';

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
  showCode = signal(false);
  copied = signal(false);

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

  lang = signal<'pt' | 'en'>('pt');
  showErrors = signal(false);

  tokenStatus = signal<'idle' | 'checking' | 'valid' | 'invalid'>('idle');
  tokenBotInfo = signal<{ username: string; name: string } | null>(null);
  private tokenTimer: ReturnType<typeof setTimeout> | null = null;
  private api = inject(ApiService);

  savedBotId = signal<string | null>(null);
  saveError = signal<string | null>(null);

  botName = signal('');
  botToken = signal('');
  botDesc = signal('');
  products = signal<Product[]>([{ name: '', price: '', desc: '' }]);
  welcomeMsg = signal('');
  menuTitle = signal('');
  pixKey = signal('');
  paymentNote = signal('');

  t = computed(() => this.lang() === 'pt' ? {
    welcome: 'Olá! 👋 Bem-vindo. O que você procura?',
    menu: 'Escolha uma opção:',
    productExample: 'Produto exemplo',
    price: 'R$ 00,00',
    valueLine: 'Valor',
    noteLine: 'Envie o comprovante após o pagamento.',
    defaultMsg: 'Digite /start para ver o menu. 😊',
    running: 'rodando',
    token: 'SEU_TOKEN_AQUI',
    pix: 'SUA_CHAVE_PIX',
  } : {
    welcome: 'Hello! 👋 Welcome. What are you looking for?',
    menu: 'Choose an option:',
    productExample: 'Example product',
    price: '$ 0.00',
    valueLine: 'Price',
    noteLine: 'Send the receipt after payment.',
    defaultMsg: 'Type /start to see the menu. 😊',
    running: 'running',
    token: 'YOUR_TOKEN_HERE',
    pix: 'YOUR_PIX_KEY',
  });

  previewBotName = computed(() => this.botName() || 'Meu Bot de Vendas');
  previewWelcome = computed(() => this.welcomeMsg() || this.t().welcome);
  previewMenu = computed(() => this.menuTitle() || this.t().menu);
  previewProducts = computed(() =>
    this.products().filter(p => p.name).length > 0
      ? this.products().filter(p => p.name)
      : [{ name: this.t().productExample, price: this.t().price, desc: '' }]
  );
  previewFirstProduct = computed(() => this.previewProducts()[0]);

  generatedCode = computed(() => {
    const tr = this.t();
    const name = this.botName() || 'BotGram';
    const token = this.botToken() || tr.token;
    const welcome = this.welcomeMsg() || tr.welcome;
    const menu = this.menuTitle() || tr.menu;
    const pix = this.pixKey() || tr.pix;
    const note = this.paymentNote() || tr.noteLine;
    const prods = this.products().filter(p => p.name).length > 0
      ? this.products().filter(p => p.name)
      : [{ name: tr.productExample, price: tr.price, desc: '' }];

    const menuItems = prods.map((p, i) =>
      `  bot.sendMessage(chatId, '${i + 1}. ${p.name}${p.price ? ' — ' + p.price : ''}${p.desc ? '\\n' + p.desc : ''}');`
    ).join('\n');

    const productCases = prods.map((p, i) =>
      `    case '${i + 1}':\n    case '${p.name}':\n      bot.sendMessage(chatId, '✅ ${p.name}${p.price ? '\\n' + tr.valueLine + ': ' + p.price : ''}\\n\\n💳 PIX: ${pix}\\n${note}');\n      break;`
    ).join('\n');

    return `// ${name} — gerado pelo BotGram
const TelegramBot = require('node-telegram-bot-api');

const TOKEN = '${token}';
const bot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/\\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, '${welcome}');
  bot.sendMessage(chatId, '${menu}');
${menuItems}
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text?.trim();

  if (text === '/start') return;

  switch (text) {
${productCases}
    default:
      bot.sendMessage(chatId, '${tr.defaultMsg}');
  }
});

console.log('✅ ${name} ${tr.running}...');`;
  });

  constructor(private route: ActivatedRoute) {
    effect(() => {
      const token = this.botToken().trim();
      if (this.tokenTimer) clearTimeout(this.tokenTimer);
      if (!token) { this.tokenStatus.set('idle'); this.tokenBotInfo.set(null); return; }
      this.tokenStatus.set('checking');
      this.tokenTimer = setTimeout(() => this.checkToken(token), 600);
    });
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.template = ALL_TEMPLATES.find(t => t.id === id) ?? null;
    if (this.template) this.botName.set(this.template.name);
  }

  private checkToken(token: string) {
    this.api.validateToken(token).subscribe({
      next: res => {
        if (res.valid && res.bot) {
          this.tokenStatus.set('valid');
          this.tokenBotInfo.set(res.bot);
        } else {
          this.tokenStatus.set('invalid');
          this.tokenBotInfo.set(null);
        }
      },
      error: () => { this.tokenStatus.set('idle'); this.tokenBotInfo.set(null); },
    });
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

  generate() {
    this.showCode.set(true);
    this.saveError.set(null);

    this.api.saveBot({
      templateId: this.template?.id,
      botName: this.botName(),
      welcomeMsg: this.welcomeMsg(),
      menuTitle: this.menuTitle(),
      products: this.products().filter(p => p.name.trim()),
      pixKey: this.pixKey(),
      paymentNote: this.paymentNote(),
    }).subscribe({
      next: ({ data }) => this.savedBotId.set(data.id),
      error: () => this.saveError.set('Não foi possível salvar na API.'),
    });

    setTimeout(() => document.querySelector('.code-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
  }

  async copyCode() {
    await navigator.clipboard.writeText(this.generatedCode());
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }

  downloadCode() {
    const blob = new Blob([this.generatedCode()], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bot.js';
    a.click();
    URL.revokeObjectURL(url);
  }

  stepErrors = computed(() => {
    const errs: Record<string, string> = {};
    switch (this.currentStep()) {
      case 1:
        if (!this.botName().trim()) errs['botName'] = 'Dê um nome ao seu bot.';
        if (!this.botToken().trim()) errs['botToken'] = 'Cole o token do BotFather.';
        break;
      case 2:
        const validProducts = this.products().filter(p => p.name.trim() && p.price.trim());
        if (!validProducts.length) errs['products'] = 'Adicione pelo menos um produto com nome e preço.';
        break;
      case 3:
        if (!this.welcomeMsg().trim()) errs['welcomeMsg'] = 'Escreva uma mensagem de boas-vindas.';
        if (!this.menuTitle().trim()) errs['menuTitle'] = 'Defina o título do menu.';
        break;
      case 4:
        if (!this.pixKey().trim()) errs['pixKey'] = 'Informe a chave PIX para receber pagamentos.';
        break;
    }
    return errs;
  });

  isStepValid = computed(() => Object.keys(this.stepErrors()).length === 0);

  next() {
    if (this.isLast()) return;
    if (!this.isStepValid()) {
      this.showErrors.set(true);
      return;
    }
    this.showErrors.set(false);
    this.currentStep.update(s => s + 1);
  }

  back() {
    if (this.isFirst()) return;
    this.showErrors.set(false);
    this.currentStep.update(s => s - 1);
  }

  goTo(step: number) { if (step < this.currentStep()) { this.showErrors.set(false); this.currentStep.set(step); } }

  tryGenerate() {
    if (!this.isStepValid()) { this.showErrors.set(true); return; }
    this.generate();
  }
}
