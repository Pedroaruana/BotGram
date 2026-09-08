import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './layout/navbar/navbar';
import { Footer } from './layout/footer/footer';
import { CookieBanner } from './layout/cookie-banner/cookie-banner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, CookieBanner],
  template: `
    <app-navbar />
    <router-outlet />
    <app-footer />
    <app-cookie-banner />
  `,
  styleUrl: './app.scss',
})
export class App {}
