"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function LocalEventoDashboardPage() {
  const [local, setLocal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLocal() {
      try {
        const res = await fetch("/api/local-evento");
        const data = await res.json();
        setLocal(data);
      } catch (error) {
        console.error("Erro ao carregar local:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchLocal();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white font-black italic uppercase tracking-widest">
        Carregando Dados...
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen bg-[#050505] text-white">
      {/* HEADER DO DASHBOARD */}
      <div className="max-w-4xl mx-auto flex justify-between items-end mb-10 border-b border-white/10 pb-8">
        <div>
          <p className="text-blue-500 text-[10px] font-black uppercase tracking-[4px] mb-2">Configurações Gerais</p>
          <h1 className="text-4xl font-black uppercase italic tracking-tighter">
            Local do <span className="text-blue-600 not-italic">Evento</span>
          </h1>
        </div>
        
        <Link
          href="/dashboard/local-evento/edit"
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]"
        >
          <span className="material-symbols-outlined text-sm">edit</span>
          Editar Informações
        </Link>
      </div>

      {/* CARD DE INFORMAÇÕES */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 grid grid-cols-1 md:grid-cols-2 gap-8 relative overflow-hidden">
          
          {/* Detalhe Decorativo */}
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <span className="material-symbols-outlined text-9xl">map</span>
          </div>

          <div className="space-y-6 relative z-10">
            <div className="group">
              <label className="text-blue-500 text-[9px] font-black uppercase tracking-widest block mb-1">Nome do Local</label>
              <p className="text-xl font-bold uppercase">{local?.nome || "Não definido"}</p>
            </div>

            <div className="group">
              <label className="text-blue-500 text-[9px] font-black uppercase tracking-widest block mb-1">Endereço Completo</label>
              <p className="text-white/80">{local?.endereco || "Não definido"}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-blue-500 text-[9px] font-black uppercase tracking-widest block mb-1">Cidade</label>
                <p className="font-bold uppercase italic">{local?.cidade || "---"}</p>
              </div>
              <div>
                <label className="text-blue-500 text-[9px] font-black uppercase tracking-widest block mb-1">Estado</label>
                <p className="font-bold uppercase italic">{local?.estado || "---"}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6 border-l border-white/5 md:pl-8 relative z-10">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-blue-500 text-[9px] font-black uppercase tracking-widest block mb-1">Latitude</label>
                <code className="text-xs text-white/40">{local?.latitude || "0.0000"}</code>
              </div>
              <div>
                <label className="text-blue-500 text-[9px] font-black uppercase tracking-widest block mb-1">Longitude</label>
                <code className="text-xs text-white/40">{local?.longitude || "0.0000"}</code>
              </div>
            </div>

            <div>
              <label className="text-blue-500 text-[9px] font-black uppercase tracking-widest block mb-1">Informações Adicionais</label>
              <p className="text-sm text-white/60 leading-relaxed italic">
                {local?.informacoesAdicionais || "Nenhuma informação extra cadastrada."}
              </p>
            </div>

            {/* Status Visual */}
            <div className="pt-4">
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-green-500">Ativo no Site</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}