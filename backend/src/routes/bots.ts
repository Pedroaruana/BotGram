import type { FastifyInstance } from 'fastify';

interface Product {
  name: string;
  price: string;
  desc?: string;
}

interface BotConfig {
  id: string;
  templateId: number;
  botName: string;
  welcomeMsg: string;
  menuTitle: string;
  products: Product[];
  pixKey: string;
  paymentNote: string;
  createdAt: string;
}

const bots = new Map<string, BotConfig>();

export async function botsRoutes(app: FastifyInstance) {
  app.post<{ Body: Omit<BotConfig, 'id' | 'createdAt'> }>('/api/bots', async (req, reply) => {
    const { botName, products, pixKey } = req.body;

    if (!botName?.trim()) return reply.status(400).send({ error: 'botName é obrigatório' });
    if (!products?.length) return reply.status(400).send({ error: 'Pelo menos um produto é obrigatório' });
    if (!pixKey?.trim()) return reply.status(400).send({ error: 'pixKey é obrigatória' });

    const id = crypto.randomUUID();
    const bot: BotConfig = { ...req.body, id, createdAt: new Date().toISOString() };
    bots.set(id, bot);

    return reply.status(201).send({ data: bot });
  });

  app.get('/api/bots', async () => {
    return { data: Array.from(bots.values()) };
  });

  app.get<{ Params: { id: string } }>('/api/bots/:id', async (req, reply) => {
    const bot = bots.get(req.params.id);
    if (!bot) return reply.status(404).send({ error: 'Bot não encontrado' });
    return { data: bot };
  });

  app.delete<{ Params: { id: string } }>('/api/bots/:id', async (req, reply) => {
    if (!bots.has(req.params.id)) return reply.status(404).send({ error: 'Bot não encontrado' });
    bots.delete(req.params.id);
    return reply.status(204).send();
  });
}
