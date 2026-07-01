import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { templatesRoutes } from './routes/templates';
import { botsRoutes } from './routes/bots';
import { validateRoutes } from './routes/validate';

const app = new Hono();

app.use('*', cors({
  origin: ['http://localhost:4200', 'https://botgram-henna.vercel.app'],
  allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
}));

app.get('/health', c => c.json({ status: 'ok' }));

templatesRoutes(app);
botsRoutes(app);
validateRoutes(app);

export default app;
