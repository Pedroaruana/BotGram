import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Step {
  number: number;
  label: string;
  desc: string;
}

interface Product {
  name: string;
  price: string;
  desc: string;
}

@Component({
  selector: 'app-wizard',
  imports: [RouterLink, FormsModule],
  templateUrl: './wizard.html',
  styleUrl: './wizard.scss',
})
export class Wizard {
  currentStep = signal(1);

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

  // Step 1
  botName = '';
  botToken = '';
  botDesc = '';

  // Step 2
  products = signal<Product[]>([
    { name: '', price: '', desc: '' }
  ]);

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

  // Step 3
  welcomeMsg = '';
  menuTitle = '';

  // Step 4
  pixKey = '';
  paymentNote = '';

  next() {
    if (!this.isLast()) this.currentStep.update(s => s + 1);
  }

  back() {
    if (!this.isFirst()) this.currentStep.update(s => s - 1);
  }

  goTo(step: number) {
    if (step < this.currentStep()) this.currentStep.set(step);
  }
}
