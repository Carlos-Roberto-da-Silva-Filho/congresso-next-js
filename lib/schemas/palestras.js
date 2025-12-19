import { z } from "zod";

export const palestraSchema = z.object({
  titulo: z.string().min(5, "O título deve ter pelo menos 5 caracteres"),
  descricao: z.string().min(10, "A descrição deve ser mais detalhada"),
  data: z.string().min(1, "Selecione a data da palestra"),
  horario: z.string().min(1, "Informe o horário"),
  palestranteId: z.string().min(1, "Selecione um palestrante"),
  local: z.string().optional(), // Caso já tenha o nome do local/sala
});
