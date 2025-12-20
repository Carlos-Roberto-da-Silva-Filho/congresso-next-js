"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EditLocalEvento() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    nome: "",
    endereco: "",
    cidade: "",
    estado: "",
    latitude: "",
    longitude: "",
    informacoesAdicionais: "",
  });

  useEffect(() => {
    async function fetchLocal() {
      try {
        const res = await fetch("/api/local-evento");
        const data = await res.json();
        setForm(data);
      } catch (error) {
        console.error("Erro ao carregar dados");
      } finally {
        setLoading(false);
      }
    }
    fetchLocal();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    await fetch("/api/local-evento", {
      method: "PATCH",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });

    router.push("/dashboard/local-evento");
    router.refresh(); // Garante que a página anterior atualize os dados
  }

  if (loading) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white font-black italic uppercase tracking-widest">
      Carregando...
    </div>
  );

  // Estilo padrão para os inputs para manter o código limpo
  const inputStyle = "w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all font-medium text-white placeholder:text-white/20";

  return (
    <div className="p-8 min-h-screen bg-[#050505] text-white">
      <div className="max-w-3xl mx-auto">
        
        {/* HEADER IGUAL AO PAGE.JS */}
        <div className="flex justify-between items-end mb-10 border-b border-white/10 pb-8">
          <div>
            <p className="text-blue-500 text-[10px] font-black uppercase tracking-[4px] mb-2">Editor de Sistema</p>
            <h1 className="text-4xl font-black uppercase italic tracking-tighter">
              Editar <span className="text-blue-600 not-italic">Local</span>
            </h1>
          </div>
          <Link href="/dashboard/local-evento" className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors mb-2">
            Cancelar
          </Link>
        </div>

        {/* FORMULÁRIO COM O ESTILO DOS CARDS */}
        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="text-blue-500 text-[9px] font-black uppercase tracking-widest ml-4 mb-2 block">Nome do Local</label>
              <input type="text" name="nome" value={form.nome} onChange={handleChange} className={inputStyle} required />
            </div>

            <div className="md:col-span-2">
              <label className="text-blue-500 text-[9px] font-black uppercase tracking-widest ml-4 mb-2 block">Endereço</label>
              <input type="text" name="endereco" value={form.endereco} onChange={handleChange} className={inputStyle} required />
            </div>

            <div>
              <label className="text-blue-500 text-[9px] font-black uppercase tracking-widest ml-4 mb-2 block">Cidade</label>
              <input type="text" name="cidade" value={form.cidade} onChange={handleChange} className={inputStyle} required />
            </div>

            <div>
              <label className="text-blue-500 text-[9px] font-black uppercase tracking-widest ml-4 mb-2 block">Estado</label>
              <input type="text" name="estado" value={form.estado} onChange={handleChange} className={inputStyle} required />
            </div>

            <div>
              <label className="text-blue-500 text-[9px] font-black uppercase tracking-widest ml-4 mb-2 block">Latitude</label>
              <input type="text" name="latitude" value={form.latitude} onChange={handleChange} className={inputStyle} />
            </div>

            <div>
              <label className="text-blue-500 text-[9px] font-black uppercase tracking-widest ml-4 mb-2 block">Longitude</label>
              <input type="text" name="longitude" value={form.longitude} onChange={handleChange} className={inputStyle} />
            </div>

            <div className="md:col-span-2">
              <label className="text-blue-500 text-[9px] font-black uppercase tracking-widest ml-4 mb-2 block">Informações Adicionais</label>
              <textarea name="informacoesAdicionais" value={form.informacoesAdicionais} onChange={handleChange} className={`${inputStyle} h-32 resize-none`} />
            </div>
          </div>

          <button
            type="submit"
            className="w-full md:w-auto px-12 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-lg shadow-blue-900/20"
          >
            Atualizar Dados
          </button>
        </form>
      </div>
    </div>
  );
}