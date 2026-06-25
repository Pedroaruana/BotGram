import { Component, input, output } from '@angular/core';

export interface BotTemplate {
  id: number;
  icon: string;
  name: string;
  desc: string;
  category: string;
  free: boolean;
  preview: string[];
}

@Component({
  selector: 'app-template-card',
  imports: [],
  templateUrl: './template-card.html',
  styleUrl: './template-card.scss',
})
export class TemplateCard {
  template = input.required<BotTemplate>();
  preview = output<BotTemplate>();

  open() {
    this.preview.emit(this.template());
  }
}
