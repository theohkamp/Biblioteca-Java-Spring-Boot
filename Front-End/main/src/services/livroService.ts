import { Livro } from "@/types/livro";

const API_BASE_URL = "http://localhost:8080/api/livros"; // Ajuste conforme sua configuração

export const livroService = {
  // Listar todos os livros
  async listarLivros(): Promise<Livro[]> {
    const response = await fetch(`${API_BASE_URL}/listarLivros`);
    if (!response.ok) throw new Error("Erro ao buscar livros");
    return response.json();
  },

  // Criar novo livro
  async criarLivro(livro: Livro): Promise<Livro> {
    const response = await fetch(`${API_BASE_URL}/cadastrarLivro`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(livro),
    });
    if (!response.ok) throw new Error("Erro ao criar livro");
    return response.json();
  },

  // Atualizar livro existente
  async atualizarLivro(id: number, livro: Livro): Promise<Livro> {
    const response = await fetch(`${API_BASE_URL}/atualizarLivro/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(livro),
    });
    if (!response.ok) throw new Error("Erro ao atualizar livro");
    return response.json();
  },

  // Deletar livro
  async deletarLivro(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/deletarLivro/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Erro ao deletar livro");
  },
};
