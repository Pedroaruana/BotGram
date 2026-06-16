import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  templates = [
    { id: 1, icon: '🎬', name: 'Filmes & Séries', desc: 'Venda acesso a catálogos de streaming com planos mensais e anuais.', tag: 'Popular' },
    { id: 2, icon: '📺', name: 'IPTV', desc: 'Gerencie planos de IPTV com renovação automática via bot.', tag: 'Em alta' },
    { id: 3, icon: '📚', name: 'E-books & Cursos', desc: 'Entregue materiais digitais e cursos direto pelo Telegram.', tag: 'Digital' },
    { id: 4, icon: '🎮', name: 'Jogos & Contas', desc: 'Venda contas de jogos, créditos e itens digitais com segurança.', tag: 'Games' },
    { id: 5, icon: '👗', name: 'Produtos Físicos', desc: 'Catálogo de produtos com fotos, preços e link para pagamento.', tag: 'Loja' },
    { id: 6, icon: '🎵', name: 'Música & Arte', desc: 'Venda beats, artes digitais e assinaturas de conteúdo exclusivo.', tag: 'Arte' },
  ];
}
