import type { Hono } from 'hono';

interface Product {
  name: string;
  price: string;
  desc?: string;
}

interface BotConfig {
  id: string;
  templateId?: number;
  botName: string;
  welcomeMsg: string;
  menuTitle: string;
  products: Product[];
  pixKey: string;
  paymentNote: string;
  createdAt: string;
}

const bots = new Map<string, BotConfig>();

export function botsRoutes(app: Hono) {
  app.post('/api/bots', async c => {
    const body = await c.req.json<Omit<BotConfig, 'id' | 'createdAt'>>();
    const { botName, products, pixKey } = body;

    if (!botName?.trim()) return c.json({ error: 'botName é obrigatório' }, 400);
    if (!products?.length) return c.json({ error: 'Pelo menos um produto é obrigatório' }, 400);
    if (!pixKey?.trim()) return c.json({ error: 'pixKey é obrigatória' }, 400);

    const id = crypto.randomUUID();
    const bot: BotConfig = { ...body, id, createdAt: new Date().toISOString() };
    bots.set(id, bot);

    return c.json({ data: bot }, 201);
  });

  app.get('/api/bots', c => c.json({ data: Array.from(bots.values()) }));

  app.get('/api/bots/:id', c => {
    const bot = bots.get(c.req.param('id'));
    if (!bot) return c.json({ error: 'Bot não encontrado' }, 404);
    return c.json({ data: bot });
  });

  app.delete('/api/bots/:id', c => {
    const id = c.req.param('id');
    if (!bots.has(id)) return c.json({ error: 'Bot não encontrado' }, 404);
    bots.delete(id);
    return c.body(null, 204);
  });
}
