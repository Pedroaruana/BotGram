import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

const STORAGE_KEY = 'botgram:cookie-notice';

@Component({
  selector: 'app-cookie-banner',
  imports: [RouterLink],
  templateUrl: './cookie-banner.html',
  styleUrl: './cookie-banner.scss',
})
export class CookieBanner implements OnInit {
  visible = signal(false);

  ngOnInit() {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) this.visible.set(true);
    } catch {
      // navegador com armazenamento bloqueado: nao mostra o banner
    }
  }

  accept() {
    try {
      localStorage.setItem(STORAGE_KEY, 'accepted');
    } catch {
      // ignora falha de escrita, o banner some na sessao atual mesmo assim
    }
    this.visible.set(false);
  }
}
