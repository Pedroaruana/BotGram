import type { FastifyInstance } from 'fastify';

const templates = [
  { id: 1, icon: '🎬', name: 'Filmes & Séries', desc: 'Venda acesso a catálogos de streaming com planos mensais e anuais.', category: 'Entretenimento', free: true },
  { id: 2, icon: '📺', name: 'IPTV', desc: 'Gerencie planos de IPTV com ativação e renovação direto pelo bot.', category: 'Entretenimento', free: true },
  { id: 3, icon: '📖', name: 'Mangás', desc: 'Venda capítulos, volumes e assinaturas de mangá para seus clientes.', category: 'Entretenimento', free: true },
  { id: 4, icon: '📚', name: 'E-books & Cursos', desc: 'Entregue materiais digitais e cursos com link automático após pagamento.', category: 'Digital', free: false },
  { id: 5, icon: '🎮', name: 'Jogos & Contas', desc: 'Venda contas, créditos e itens de jogos com entrega automática.', category: 'Games', free: false },
  { id: 6, icon: '👗', name: 'Produtos Físicos', desc: 'Catálogo de produtos com fotos, preços e link de pagamento integrado.', category: 'Loja', free: false },
  { id: 7, icon: '🎵', name: 'Música & Beats', desc: 'Venda beats, samples e assinaturas de conteúdo exclusivo.', category: 'Arte', free: false },
  { id: 8, icon: '💻', name: 'Software & Licenças', desc: 'Venda chaves de ativação e licenças de softwares com entrega imediata.', category: 'Digital', free: false },
  { id: 9, icon: '🎓', name: 'Mentorias', desc: 'Agende sessões de mentoria e receba pagamentos pelo próprio bot.', category: 'Serviços', free: false },
];

export async function templatesRoutes(app: FastifyInstance) {
  app.get('/api/templates', async () => {
    return { data: templates };
  });

  app.get<{ Params: { id: string } }>('/api/templates/:id', async (req, reply) => {
    const template = templates.find(t => t.id === Number(req.params.id));
    if (!template) return reply.status(404).send({ error: 'Template não encontrado' });
    return { data: template };
  });
}
