import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-terms',
  imports: [RouterLink],
  templateUrl: './terms.html',
  styleUrl: '../legal.scss',
})
export class Terms {
  updatedAt = '08 de setembro de 2026';
}
