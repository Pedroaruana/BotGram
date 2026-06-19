import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Step {
  number: number;
  label: string;
  desc: string;
}

@Component({
  selector: 'app-wizard',
  imports: [RouterLink],
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
