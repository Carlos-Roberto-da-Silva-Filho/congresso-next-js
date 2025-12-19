"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PalestrasPage() {
  const [palestras, setPalestras] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchPalestras() {
    setLoading(true);
    const res = await fetch("/api/palestras");
    const data = await res.json();
    setPalestras(data);
    setLoading(false);
  }

  async function handleDelete(id) {
    if (!confirm("Deseja realmente excluir esta palestra?")) return;
    await fetch("/api/palestras", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });
    fetchPalestras();
  }

  useEffect(() => { fetchPalestras(); }, []);

  if (loading) return <div className="p-8 text-white">Carregando cronograma...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Cronograma de Palestras</h1>
          <p className="text-blue-300/80 text-sm">Organize as sessões e horários do evento</p>
        </div>
        <Link
          href="/dashboard/palestras/create"
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg flex items-center gap-2"
        >
          <span className="material-symbols-outlined">add</span>
          Nova Palestra
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {palestras.map((p) => (
          <div key={p.id} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-xl flex flex-col transition-all hover:border-white/40">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-white leading-tight">{p.titulo}</h2>
                <div className="flex gap-2">
                  <Link href={`/dashboard/palestras/${p.id}`} className="p-2 bg-yellow-500/20 text-yellow-500 rounded-lg hover:bg-yellow-500 hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-sm">edit</span>
                  </Link>
                  <button onClick={() => handleDelete(p.id)} className="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6 bg-black/20 p-3 rounded-xl">
                <img src={p.palestranteFoto || "/images/placeholder-user.png"} className="w-10 h-10 rounded-full object-cover border border-blue-400" alt="" />
                <div>
                  <p className="text-xs text-blue-300 uppercase font-bold tracking-widest">Palestrante</p>
                  <p className="text-white font-medium">{p.palestranteNome}</p>
                </div>
              </div>

              <p className="text-gray-300 text-sm line-clamp-2 mb-6 italic">"{p.descricao}"</p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-white/70">
                  <span className="material-symbols-outlined text-blue-400">calendar_today</span>
                  <span className="text-xs">{new Date(p.dataHora).toLocaleString('pt-BR')}</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <span className="material-symbols-outlined text-blue-400">location_on</span>
                  <span className="text-xs">{p.local}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
