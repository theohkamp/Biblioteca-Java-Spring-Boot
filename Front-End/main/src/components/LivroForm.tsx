import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Livro } from "@/types/livro";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

const livroSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório").max(200, "Nome muito longo"),
  paginas: z.coerce.number().min(1, "Número de páginas deve ser maior que 0"),
  genero: z.string().min(1, "Gênero é obrigatório").max(100, "Gênero muito longo"),
  foto: z.string().url("URL inválida").or(z.literal("")),
});

type LivroFormData = z.infer<typeof livroSchema>;

interface LivroFormProps {
  livro?: Livro;
  onSubmit: (data: Livro) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const LivroForm = ({ livro, onSubmit, onCancel, isLoading }: LivroFormProps) => {
  const form = useForm<LivroFormData>({
    resolver: zodResolver(livroSchema),
    defaultValues: {
      nome: livro?.nome || "",
      paginas: livro?.paginas || 0,
      genero: livro?.genero || "",
      foto: livro?.foto || "",
    },
  });

  const handleSubmit = (data: LivroFormData) => {
    const livroData: Livro = {
      nome: data.nome,
      paginas: data.paginas,
      genero: data.genero,
      foto: data.foto,
      id: livro?.id,
    };
    onSubmit(livroData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Livro</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Dom Casmurro" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="genero"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gênero</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Romance" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="paginas"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de Páginas</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Ex: 256" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="foto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL da Foto (opcional)</FormLabel>
              <FormControl>
                <Input placeholder="https://exemplo.com/capa.jpg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Salvando..." : livro ? "Atualizar" : "Cadastrar"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
