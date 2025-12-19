import { z } from "zod";

export const hospedagemSchema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  endereco: z.string().min(5, "O endereço deve ser mais detalhado"),
  site: z.string().url("Insira um link válido (ex: https://...)").optional().or(z.literal("")),
  telefone: z.string().optional(),
  distanciaDoEvento: z.string().min(1, "Informe a distância (ex: 1.5km)"),
  precoMedio: z.string().min(1, "Informe a média de preço"),
});
