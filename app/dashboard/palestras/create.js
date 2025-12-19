"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { palestraSchema } from "@/lib/schemas/palestras";

export default function PalestraForm({ existingData }) {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [palestrantes, setPalestrantes] = useState([]); // Lista para o Select
  const [form, setForm] = useState({
    titulo: "", descricao: "", data: "", horario: "", palestranteId: "", local: "",
  });

  useEffect(() => {
    // 1. Carrega dados se for edição
    if (existingData) setForm(existingData);

    // 2. Carrega lista de palestrantes para o dropdown
    async function loadPalestrantes() {
      const res = await fetch("/api/palestrantes");
      const data = await res.json();
      setPalestrantes(data);
    }
    loadPalestrantes();
  }, [existingData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    
    const result = palestraSchema.safeParse(form);
    if (!result.success) {
      setErrors(result.error.format());
      return;
    }

    const method = existingData?.id ? "PUT" : "POST";
    const res = await fetch("/api/palestras", {
      method,
      body: JSON.stringify(existingData?.id ? { ...form, id: existingData.id } : form),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/dashboard/palestras");
      router.refresh();
    } else {
      const errorData = await res.json();
      if (errorData.errors) setErrors(errorData.errors);
    }
  }

  const ErrorMsg = ({ field }) => (
    errors[field] && <span className="text-red-400 text-[10px] mt-1 italic">{errors[field]._errors[0]}</span>
  );

  const inputClass = (field) => `w-full p-3 rounded-xl bg-black/40 border ${errors[field] ? 'border-red-500/60' : 'border-white/10'} text-white outline-none transition-all`;

  return (
    <div className="p-4 md:p-10 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <Link href="/dashboard/palestras" className="text-blue-400 text-sm flex items-center gap-1 mb-6">
          <span className="material-symbols-outlined text-sm">arrow_back</span> Voltar
        </Link>
        
        <h1 className="text-3xl font-bold mb-8 text-white">{existingData ? "Editar Palestra" : "Nova Palestra"}</h1>

        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col gap-5">
          
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-blue-200/60 uppercase tracking-widest mb-2">Título da Palestra</label>
            <input type="text" name="titulo" value={form.titulo} onChange={handleChange} className={inputClass('titulo')} placeholder="Ex: O Futuro da IA" />
            <ErrorMsg field="titulo" />
          </div>

          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-blue-200/60 uppercase tracking-widest mb-2">Palestrante</label>
            <select name="palestranteId" value={form.palestranteId} onChange={handleChange} className={inputClass('palestranteId')}>
              <option value="">Selecione um palestrante...</option>
              {palestrantes.map(p => (
                <option key={p.id} value={p.id} className="bg-slate-800">{p.nome}</option>
              ))}
            </select>
            <ErrorMsg field="palestranteId" />
          </div>

          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-blue-200/60 uppercase tracking-widest mb-2">Descrição</label>
            <textarea name="descricao" value={form.descricao} onChange={handleChange} rows="3" className={inputClass('descricao')} placeholder="O que será abordado?" />
            <ErrorMsg field="descricao" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-blue-200/60 uppercase tracking-widest mb-2">Data</label>
              <input type="date" name="data" value={form.data} onChange={handleChange} className={inputClass('data')} />
              <ErrorMsg field="data" />
            </div>
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-blue-200/60 uppercase tracking-widest mb-2">Horário</label>
              <input type="time" name="horario" value={form.horario} onChange={handleChange} className={inputClass('horario')} />
              <ErrorMsg field="horario" />
            </div>
          </div>

          <button type="submit" className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest transition-all">
            {existingData ? "Salvar Palestra" : "Criar Palestra"}
          </button>
        </form>
      </div>
    </div>
  );
}
