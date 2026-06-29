import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ApiTemplate {
  id: number;
  icon: string;
  name: string;
  desc: string;
  category: string;
  free: boolean;
}

export interface BotPayload {
  templateId?: number;
  botName: string;
  welcomeMsg: string;
  menuTitle: string;
  products: { name: string; price: string; desc?: string }[];
  pixKey: string;
  paymentNote: string;
}

export interface SavedBot extends BotPayload {
  id: string;
  createdAt: string;
}

export interface TokenValidation {
  valid: boolean;
  bot?: { username: string; name: string };
  error?: string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;

  getTemplates(): Observable<{ data: ApiTemplate[] }> {
    return this.http.get<{ data: ApiTemplate[] }>(`${this.base}/api/templates`);
  }

  saveBot(bot: BotPayload): Observable<{ data: SavedBot }> {
    return this.http.post<{ data: SavedBot }>(`${this.base}/api/bots`, bot);
  }

  validateToken(token: string): Observable<TokenValidation> {
    return this.http.post<TokenValidation>(`${this.base}/api/validate-token`, { token });
  }
}
