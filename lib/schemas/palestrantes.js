import { z } from "zod";

export const palestranteSchema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  especialidade: z.string().min(3, "Informe a especialidade (mín. 3 letras)"),
  bio: z.string().min(10, "A bio deve ter pelo menos 10 caracteres"),
  fotoURL: z.string().optional().or(z.literal("")),
  palestrasIds: z.array(z.string()).optional().default([]),
});
