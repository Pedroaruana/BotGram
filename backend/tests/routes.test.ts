import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import Fastify from 'fastify';
import { templatesRoutes } from '../src/routes/templates.js';
import { botsRoutes } from '../src/routes/bots.js';
import { validateRoutes } from '../src/routes/validate.js';

const app = Fastify();
beforeAll(async () => {
  await app.register(templatesRoutes);
  await app.register(botsRoutes);
  await app.register(validateRoutes);
  await app.ready();
});
afterAll(() => app.close());

// ── Templates ──

describe('GET /api/templates', () => {
  it('retorna lista de templates', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/templates' });
    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBe(9);
  });

  it('cada template tem os campos obrigatórios', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/templates' });
    const { data } = res.json();
    for (const t of data) {
      expect(t).toHaveProperty('id');
      expect(t).toHaveProperty('name');
      expect(t).toHaveProperty('free');
    }
  });
});

describe('GET /api/templates/:id', () => {
  it('retorna template existente', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/templates/1' });
    expect(res.statusCode).toBe(200);
    expect(res.json().data.name).toBe('Filmes & Séries');
  });

  it('retorna 404 para template inexistente', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/templates/999' });
    expect(res.statusCode).toBe(404);
  });
});

// ── Bots ──

describe('POST /api/bots', () => {
  it('cria bot com dados válidos', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/api/bots',
      payload: {
        templateId: 1,
        botName: 'Meu Bot Teste',
        welcomeMsg: 'Olá!',
        menuTitle: 'Menu',
        products: [{ name: 'Plano Mensal', price: 'R$ 29,90' }],
        pixKey: 'teste@pix.com',
        paymentNote: 'Envie o comprovante.',
      },
    });
    expect(res.statusCode).toBe(201);
    const { data } = res.json();
    expect(data.id).toBeDefined();
    expect(data.botName).toBe('Meu Bot Teste');
  });

  it('rejeita bot sem botName', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/api/bots',
      payload: { products: [{ name: 'x', price: 'y' }], pixKey: 'k' },
    });
    expect(res.statusCode).toBe(400);
  });

  it('rejeita bot sem produtos', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/api/bots',
      payload: { botName: 'Bot', products: [], pixKey: 'k' },
    });
    expect(res.statusCode).toBe(400);
  });
});

describe('DELETE /api/bots/:id', () => {
  it('deleta bot existente', async () => {
    const create = await app.inject({
      method: 'POST',
      url: '/api/bots',
      payload: {
        botName: 'Para deletar',
        products: [{ name: 'x', price: 'y' }],
        pixKey: 'k',
      },
    });
    const { id } = create.json().data;
    const del = await app.inject({ method: 'DELETE', url: `/api/bots/${id}` });
    expect(del.statusCode).toBe(204);
  });

  it('retorna 404 ao deletar bot inexistente', async () => {
    const res = await app.inject({ method: 'DELETE', url: '/api/bots/id-falso' });
    expect(res.statusCode).toBe(404);
  });
});

// ── Validate Token ──

describe('POST /api/validate-token', () => {
  it('rejeita token vazio', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/api/validate-token',
      payload: { token: '' },
    });
    expect(res.statusCode).toBe(400);
  });

  it('rejeita token com formato inválido', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/api/validate-token',
      payload: { token: 'token-invalido' },
    });
    expect(res.statusCode).toBe(422);
    expect(res.json().valid).toBe(false);
  });
});
