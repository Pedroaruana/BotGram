import { describe, it, expect } from 'vitest';
import { Hono } from 'hono';
import { templatesRoutes } from '../src/routes/templates';
import { botsRoutes } from '../src/routes/bots';
import { validateRoutes } from '../src/routes/validate';

function makeApp() {
  const app = new Hono();
  templatesRoutes(app);
  botsRoutes(app);
  validateRoutes(app);
  return app;
}

const app = makeApp();

// ── Templates ──

describe('GET /api/templates', () => {
  it('retorna lista de templates', async () => {
    const res = await app.request('/api/templates');
    expect(res.status).toBe(200);
    const body = await res.json() as { data: unknown[] };
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBe(9);
  });

  it('cada template tem os campos obrigatórios', async () => {
    const res = await app.request('/api/templates');
    const { data } = await res.json() as { data: Record<string, unknown>[] };
    for (const t of data) {
      expect(t).toHaveProperty('id');
      expect(t).toHaveProperty('name');
      expect(t).toHaveProperty('free');
    }
  });
});

describe('GET /api/templates/:id', () => {
  it('retorna template existente', async () => {
    const res = await app.request('/api/templates/1');
    expect(res.status).toBe(200);
    const body = await res.json() as { data: { name: string } };
    expect(body.data.name).toBe('Filmes & Séries');
  });

  it('retorna 404 para template inexistente', async () => {
    const res = await app.request('/api/templates/999');
    expect(res.status).toBe(404);
  });
});

// ── Bots ──

describe('POST /api/bots', () => {
  it('cria bot com dados válidos', async () => {
    const res = await app.request('/api/bots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        templateId: 1,
        botName: 'Meu Bot Teste',
        welcomeMsg: 'Olá!',
        menuTitle: 'Menu',
        products: [{ name: 'Plano Mensal', price: 'R$ 29,90' }],
        pixKey: 'teste@pix.com',
        paymentNote: 'Envie o comprovante.',
      }),
    });
    expect(res.status).toBe(201);
    const body = await res.json() as { data: { id: string; botName: string } };
    expect(body.data.id).toBeDefined();
    expect(body.data.botName).toBe('Meu Bot Teste');
  });

  it('rejeita bot sem botName', async () => {
    const res = await app.request('/api/bots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ products: [{ name: 'x', price: 'y' }], pixKey: 'k' }),
    });
    expect(res.status).toBe(400);
  });

  it('rejeita bot sem produtos', async () => {
    const res = await app.request('/api/bots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ botName: 'Bot', products: [], pixKey: 'k' }),
    });
    expect(res.status).toBe(400);
  });
});

describe('DELETE /api/bots/:id', () => {
  it('deleta bot existente', async () => {
    const create = await app.request('/api/bots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        botName: 'Para deletar',
        products: [{ name: 'x', price: 'y' }],
        pixKey: 'k',
      }),
    });
    const { data } = await create.json() as { data: { id: string } };
    const del = await app.request(`/api/bots/${data.id}`, { method: 'DELETE' });
    expect(del.status).toBe(204);
  });

  it('retorna 404 ao deletar bot inexistente', async () => {
    const res = await app.request('/api/bots/id-falso', { method: 'DELETE' });
    expect(res.status).toBe(404);
  });
});

// ── Validate Token ──

describe('POST /api/validate-token', () => {
  it('rejeita token vazio', async () => {
    const res = await app.request('/api/validate-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: '' }),
    });
    expect(res.status).toBe(400);
  });

  it('rejeita token com formato inválido', async () => {
    const res = await app.request('/api/validate-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: 'token-invalido' }),
    });
    expect(res.status).toBe(422);
    const body = await res.json() as { valid: boolean };
    expect(body.valid).toBe(false);
  });
});
