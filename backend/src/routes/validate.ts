import type { Hono } from 'hono';

export function validateRoutes(app: Hono) {
  app.post('/api/validate-token', async c => {
    const { token } = await c.req.json<{ token: string }>();

    if (!token?.trim()) return c.json({ error: 'Token é obrigatório' }, 400);

    if (!/^\d{8,10}:[A-Za-z0-9_-]{35}$/.test(token)) {
      return c.json({ valid: false, error: 'Formato de token inválido' }, 422);
    }

    try {
      const res = await fetch(`https://api.telegram.org/bot${token}/getMe`);
      const json = await res.json() as { ok: boolean; result?: { username: string; first_name: string } };

      if (!json.ok) return c.json({ valid: false, error: 'Token inválido ou bot não encontrado' }, 422);

      return c.json({ valid: true, bot: { username: json.result!.username, name: json.result!.first_name } });
    } catch {
      return c.json({ error: 'Não foi possível contactar a API do Telegram' }, 502);
    }
  });
}
