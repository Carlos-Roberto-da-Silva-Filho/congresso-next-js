import { z } from "zod";

export const usuarioSchema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  telefone: z.string().min(10, "Telefone inválido (mínimo 10 dígitos)"),
  empresa: z.string().min(2, "Informe a empresa ou 'Autônomo'"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});
