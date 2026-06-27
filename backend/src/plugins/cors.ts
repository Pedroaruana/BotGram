import cors from '@fastify/cors';
import type { FastifyInstance } from 'fastify';

export async function registerCors(app: FastifyInstance) {
  await app.register(cors, {
    origin: [
      'http://localhost:4200',
      'https://botgram-henna.vercel.app',
    ],
    methods: ['GET', 'POST', 'DELETE'],
  });
}
