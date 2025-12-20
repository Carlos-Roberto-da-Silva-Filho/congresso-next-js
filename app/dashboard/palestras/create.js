"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// Supondo que você tenha um schema para palestras, se não, remova a validação Zod
// import { palestraSchema } from "@/lib/schemas/palestras";

export default function PalestraForm({ existingData }) {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [palestrantes, setPalestrantes] = useState([]);
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    dataHora: "",
    local: "",
    palestranteId: "",
  });

  useEffect(() => {
    // Busca palestrantes para o Select
    async function loadPalestrantes() {
      const res = await fetch("/api/palestrantes");
      const data = await res.json();
      setPalestrantes(data);
    }
    loadPalestrantes();

    if (existingData) setForm(existingData);
  }, [existingData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    
    // Validação simples (ou use o Zod aqui)
    if (!form.titulo || !form.palestranteId) {
      alert("Título e Palestrante são obrigatórios");
      return;
    }

    const method = existingData?.id ? "PUT" : "POST";
    const body = existingData?.id ? { ...form, id: existingData.id } : form;

    const res = await fetch("/api/palestras", {
      method,
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/dashboard/palestras");
      router.refresh();
    }
  }

  const inputClass = (field) => `w-full p-3 rounded-xl bg-black/40 border ${errors[field] ? 'border-red-500/60' : 'border-white/10'} text-white outline-none transition-all`;

  return (
    <div className="p-4 md:p-10 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <Link href="/dashboard/palestras" className="text-blue-400 text-sm flex items-center gap-1 mb-6">
          <span className="material-symbols-outlined text-sm">arrow_back</span> Voltar
        </Link>

        <h1 className="text-3xl font-bold mb-8 text-white">
          {existingData ? "Editar Palestra" : "Agendar Palestra"}
        </h1>

        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col gap-6">
          
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-blue-200/60 uppercase tracking-widest mb-2">Título da Palestra</label>
            <input type="text" name="titulo" value={form.titulo} onChange={handleChange} className={inputClass('titulo')} placeholder="Ex: O Futuro da IA" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-blue-200/60 uppercase tracking-widest mb-2">Data e Hora</label>
              <input type="datetime-local" name="dataHora" value={form.dataHora} onChange={handleChange} className={inputClass('dataHora')} />
            </div>

            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-blue-200/60 uppercase tracking-widest mb-2">Local / Sala</label>
              <input type="text" name="local" value={form.local} onChange={handleChange} className={inputClass('local')} placeholder="Ex: Auditório A" />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-blue-200/60 uppercase tracking-widest mb-2">Palestrante Responsável</label>
            <select 
              name="palestranteId" 
              value={form.palestranteId} 
              onChange={handleChange} 
              className={inputClass('palestranteId')}
            >
              <option value="">Selecione um palestrante</option>
              {palestrantes.map(p => (
                <option key={p.id} value={p.id}>{p.nome}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-blue-200/60 uppercase tracking-widest mb-2">Descrição / Resumo</label>
            <textarea name="descricao" value={form.descricao} onChange={handleChange} rows="4" className={inputClass('descricao')} placeholder="Sobre o que será a palestra..." />
          </div>

          <button type="submit" className="w-full py-4 mt-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest transition-all shadow-lg">
            {existingData ? "Atualizar Palestra" : "Confirmar Agendamento"}
          </button>
        </form>
      </div>
    </div>
  );
}
