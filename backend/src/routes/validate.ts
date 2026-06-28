import type { FastifyInstance } from 'fastify';

export async function validateRoutes(app: FastifyInstance) {
  app.post<{ Body: { token: string } }>('/api/validate-token', async (req, reply) => {
    const { token } = req.body;

    if (!token?.trim()) return reply.status(400).send({ error: 'Token é obrigatório' });

    if (!/^\d{8,10}:[A-Za-z0-9_-]{35}$/.test(token)) {
      return reply.status(422).send({ valid: false, error: 'Formato de token inválido' });
    }

    try {
      const res = await fetch(`https://api.telegram.org/bot${token}/getMe`);
      const json = await res.json() as { ok: boolean; result?: { username: string; first_name: string } };

      if (!json.ok) return reply.status(422).send({ valid: false, error: 'Token inválido ou bot não encontrado' });

      return { valid: true, bot: { username: json.result!.username, name: json.result!.first_name } };
    } catch {
      return reply.status(502).send({ error: 'Não foi possível contactar a API do Telegram' });
    }
  });
}
