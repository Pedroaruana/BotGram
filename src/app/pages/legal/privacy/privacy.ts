import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-privacy',
  imports: [RouterLink],
  templateUrl: './privacy.html',
  styleUrl: '../legal.scss',
})
export class Privacy {
  updatedAt = '08 de setembro de 2026';
}
