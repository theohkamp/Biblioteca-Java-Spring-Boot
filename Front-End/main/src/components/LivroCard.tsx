import { Livro } from "@/types/livro";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, BookOpen } from "lucide-react";

interface LivroCardProps {
  livro: Livro;
  onEdit: (livro: Livro) => void;
  onDelete: (id: number) => void;
}

export const LivroCard = ({ livro, onEdit, onDelete }: LivroCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-[3/4] relative overflow-hidden bg-muted">
        {livro.foto ? (
          <img
            src={livro.foto}
            alt={livro.nome}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen className="w-16 h-16 text-muted-foreground" />
          </div>
        )}
      </div>
      <CardContent className="pt-4">
        <h3 className="font-semibold text-lg mb-2 truncate">{livro.nome}</h3>
        <div className="space-y-1 text-sm text-muted-foreground">
          <p>
            <span className="font-medium">Gênero:</span> {livro.genero}
          </p>
          <p>
            <span className="font-medium">Páginas:</span> {livro.paginas}
          </p>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => onEdit(livro)}
        >
          <Pencil className="w-4 h-4 mr-2" />
          Editar
        </Button>
        <Button
          variant="destructive"
          size="sm"
          className="flex-1"
          onClick={() => livro.id && onDelete(livro.id)}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Excluir
        </Button>
      </CardFooter>
    </Card>
  );
};
