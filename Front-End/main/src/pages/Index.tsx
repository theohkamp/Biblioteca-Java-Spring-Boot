import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Livro } from "@/types/livro";
import { livroService } from "@/services/livroService";
import { LivroCard } from "@/components/LivroCard";
import { LivroForm } from "@/components/LivroForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, BookMarked, Loader2 } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLivro, setEditingLivro] = useState<Livro | undefined>();
  const [deletingLivroId, setDeletingLivroId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  // Buscar todos os livros
  const { data: livros = [], isLoading } = useQuery({
    queryKey: ["livros"],
    queryFn: livroService.listarLivros,
  });

  // Criar livro
  const createMutation = useMutation({
    mutationFn: livroService.criarLivro,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["livros"] });
      setIsFormOpen(false);
      toast.success("Livro cadastrado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao cadastrar livro");
    },
  });

  // Atualizar livro
  const updateMutation = useMutation({
    mutationFn: ({ id, livro }: { id: number; livro: Livro }) =>
      livroService.atualizarLivro(id, livro),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["livros"] });
      setIsFormOpen(false);
      setEditingLivro(undefined);
      toast.success("Livro atualizado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao atualizar livro");
    },
  });

  // Deletar livro
  const deleteMutation = useMutation({
    mutationFn: livroService.deletarLivro,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["livros"] });
      setDeletingLivroId(null);
      toast.success("Livro excluído com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao excluir livro");
    },
  });

  const handleSubmit = (data: Livro) => {
    if (editingLivro?.id) {
      updateMutation.mutate({ id: editingLivro.id, livro: data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (livro: Livro) => {
    setEditingLivro(livro);
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    setDeletingLivroId(id);
  };

  const confirmDelete = () => {
    if (deletingLivroId) {
      deleteMutation.mutate(deletingLivroId);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingLivro(undefined);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookMarked className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold">Biblioteca Digital</h1>
            </div>
            <Button onClick={() => setIsFormOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Livro
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : livros.length === 0 ? (
          <div className="text-center py-20">
            <BookMarked className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-semibold mb-2">Nenhum livro cadastrado</h2>
            <p className="text-muted-foreground mb-6">
              Comece adicionando seu primeiro livro à biblioteca
            </p>
            <Button onClick={() => setIsFormOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Livro
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {livros.map((livro) => (
              <LivroCard
                key={livro.id}
                livro={livro}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      {/* Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={handleCloseForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingLivro ? "Editar Livro" : "Cadastrar Novo Livro"}
            </DialogTitle>
          </DialogHeader>
          <LivroForm
            livro={editingLivro}
            onSubmit={handleSubmit}
            onCancel={handleCloseForm}
            isLoading={createMutation.isPending || updateMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={deletingLivroId !== null}
        onOpenChange={() => setDeletingLivroId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este livro? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Excluir</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;
