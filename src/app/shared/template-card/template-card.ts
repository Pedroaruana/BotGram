import { Component, input } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  select() {
    this.router.navigate(['/wizard', this.template().id]);
  }
}
