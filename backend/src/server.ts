import Fastify from 'fastify';
import { registerCors } from './plugins/cors.js';
import { templatesRoutes } from './routes/templates.js';
import { botsRoutes } from './routes/bots.js';
import { validateRoutes } from './routes/validate.js';

const app = Fastify({ logger: true });

await registerCors(app);
await app.register(templatesRoutes);
await app.register(botsRoutes);
await app.register(validateRoutes);

app.get('/health', async () => ({ status: 'ok' }));

const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST ?? '0.0.0.0';

try {
  await app.listen({ port, host });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
