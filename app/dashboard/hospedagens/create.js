"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { hospedagemSchema } from "@/lib/schemas/hospedagens";

export default function HospedagemForm({ existingData }) {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    nome: "", endereco: "", site: "", telefone: "", distanciaDoEvento: "", precoMedio: "",
  });

  useEffect(() => {
    if (existingData) setForm(existingData);
  }, [existingData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    
    // Validação no Cliente
    const result = hospedagemSchema.safeParse(form);
    if (!result.success) {
      setErrors(result.error.format());
      return;
    }

    const method = existingData?.id ? "PUT" : "POST";
    const res = await fetch("/api/hospedagens", {
      method,
      body: JSON.stringify(existingData?.id ? { ...form, id: existingData.id } : form),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/dashboard/hospedagens");
      router.refresh();
    } else {
      const errorData = await res.json();
      if (errorData.errors) setErrors(errorData.errors);
    }
  }

  // Componente interno para mensagens de erro
  const ErrorMsg = ({ field }) => (
    errors[field] && <span className="text-red-400 text-[10px] mt-1 italic font-medium tracking-wide">{errors[field]._errors[0]}</span>
  );

  const inputClass = (field) => `w-full p-3 rounded-xl bg-black/40 border ${errors[field] ? 'border-red-500/60' : 'border-white/10'} text-white placeholder-white/20 focus:border-blue-500/50 outline-none transition-all`;

  return (
    <div className="p-4 md:p-10 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <Link href="/dashboard/hospedagens" className="text-blue-400 text-sm flex items-center gap-1 mb-6 hover:text-blue-300 transition-colors">
          <span className="material-symbols-outlined text-sm">arrow_back</span> Voltar para lista
        </Link>
        
        <h1 className="text-3xl font-bold mb-8 text-white">
          {existingData ? "Editar Hospedagem" : "Nova Hospedagem"}
        </h1>

        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col gap-5">
          
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-blue-200/60 uppercase tracking-[2px] mb-2 ml-1">Nome do Local</label>
            <input type="text" name="nome" value={form.nome} onChange={handleChange} placeholder="Ex: Hotel Copacabana" className={inputClass('nome')} />
            <ErrorMsg field="nome" />
          </div>

          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-blue-200/60 uppercase tracking-[2px] mb-2 ml-1">Endereço</label>
            <input type="text" name="endereco" value={form.endereco} onChange={handleChange} placeholder="Rua, número e bairro" className={inputClass('endereco')} />
            <ErrorMsg field="endereco" />
          </div>

          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-blue-200/60 uppercase tracking-[2px] mb-2 ml-1">Link do Site (Opcional)</label>
            <input type="text" name="site" value={form.site} onChange={handleChange} placeholder="https://..." className={inputClass('site')} />
            <ErrorMsg field="site" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-blue-200/60 uppercase tracking-[2px] mb-2 ml-1">Distância do Evento</label>
              <input type="text" name="distanciaDoEvento" value={form.distanciaDoEvento} onChange={handleChange} placeholder="Ex: 500m ou 2km" className={inputClass('distanciaDoEvento')} />
              <ErrorMsg field="distanciaDoEvento" />
            </div>
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-blue-200/60 uppercase tracking-[2px] mb-2 ml-1">Preço Médio</label>
              <input type="text" name="precoMedio" value={form.precoMedio} onChange={handleChange} placeholder="Ex: R$ 300,00" className={inputClass('precoMedio')} />
              <ErrorMsg field="precoMedio" />
            </div>
          </div>

          <div className="pt-4">
            <button type="submit" className="w-full md:w-auto px-12 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest transition-all shadow-lg active:scale-95">
              {existingData ? "Salvar Alterações" : "Confirmar Cadastro"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
