"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PalestrantesPage() {
  const [palestrantes, setPalestrantes] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchPalestrantes() {
    setLoading(true);
    try {
      const res = await fetch("/api/palestrantes");
      const data = await res.json();
      setPalestrantes(data);
    } catch (error) {
      console.error("Erro ao carregar palestrantes:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Deseja realmente excluir este palestrante?")) return;

    await fetch("/api/palestrantes", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });

    fetchPalestrantes();
  }

  useEffect(() => {
    fetchPalestrantes();
  }, []);

  if (loading) return <div className="text-white p-8">A carregar palestrantes...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Palestrantes</h1>
          <p className="text-blue-300/80 text-sm">Gestão de especialistas e convidados do evento</p>
        </div>

        <Link
          href="/dashboard/palestrantes/create"
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg flex items-center gap-2 w-fit"
        >
          <span className="material-symbols-outlined">add</span>
          Novo Palestrante
        </Link>
      </div>

      {/* Grid de Cards Refinado */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {palestrantes.map((p) => (
          <div 
            key={p.id} // O ID continua aqui apenas para o React (não visível)
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-xl flex flex-col transition-all hover:border-white/40"
          >
            {/* Topo do Card */}
            <div className="flex items-center p-6 border-b border-white/10 gap-4">
              <img 
                src={p.fotoURL || "/images/placeholder-user.png"} 
                alt={p.nome} 
                className="w-20 h-20 rounded-full object-cover border-2 border-blue-400 shadow-md"
              />
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-white">{p.nome}</h2>
                <p className="text-blue-300 text-sm font-medium">{p.especialidade}</p>
              </div>
              
              {/* Ações Rápidas */}
              <div className="flex flex-col gap-2">
                <Link
                  href={`/dashboard/palestrantes/${p.id}`} // O ID é usado na rota mas não é exibido texto
                  className="p-2 bg-yellow-500/20 text-yellow-500 rounded-lg hover:bg-yellow-500 hover:text-white transition-colors"
                  title="Editar"
                >
                  <span className="material-symbols-outlined text-sm">edit</span>
                </Link>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                  title="Eliminar"
                >
                  <span className="material-symbols-outlined text-sm">delete</span>
                </button>
              </div>
            </div>
            
            {/* Biografia */}
            <div className="p-6 flex-grow">
              <h3 className="text-white/40 text-[10px] uppercase tracking-widest font-bold mb-2">Resumo Profissional</h3>
              <p className="text-gray-200 text-sm leading-relaxed italic">
                {p.bio ? `"${p.bio}"` : "Sem biografia registada."}
              </p>
            </div>

            {/* Rodapé Clean */}
            <div className="px-6 py-3 bg-black/10 flex justify-end items-center border-t border-white/5">
              <div className="flex items-center gap-1.5 text-blue-400 text-[11px] font-semibold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                Especialista Verificado
              </div>
            </div>
          </div>
        ))}
      </div>

      {palestrantes.length === 0 && (
        <div className="text-center py-20 bg-white/5 rounded-2xl border border-dashed border-white/20">
          <p className="text-gray-400 italic">Ainda não foram adicionados palestrantes à base de dados.</p>
        </div>
      )}
    </div>
  );
}
