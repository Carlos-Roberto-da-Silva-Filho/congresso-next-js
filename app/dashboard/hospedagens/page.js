"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function HospedagensPage() {
  const [hospedagens, setHospedagens] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchHospedagens() {
    setLoading(true);
    const res = await fetch("/api/hospedagens");
    const data = await res.json();
    setHospedagens(data);
    setLoading(false);
  }

  async function handleDelete(id) {
    if (!confirm("Deseja excluir esta hospedagem?")) return;
    await fetch("/api/hospedagens", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });
    fetchHospedagens();
  }

  useEffect(() => { fetchHospedagens(); }, []);

  if (loading) return <div className="p-8 text-white">Carregando opções de estadia...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Hospedagens</h1>
          <p className="text-blue-300/80 text-sm">Hotéis e parceiros recomendados</p>
        </div>
        <Link
          href="/dashboard/hospedagens/create"
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg flex items-center gap-2"
        >
          <span className="material-symbols-outlined">hotel</span>
          Nova Hospedagem
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hospedagens.map((h) => (
          <div key={h.id} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 flex flex-col transition-all hover:border-white/40">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-white">{h.nome}</h2>
              <div className="flex gap-2">
                <Link href={`/dashboard/hospedagens/${h.id}`} className="text-yellow-500 hover:bg-yellow-500/20 p-2 rounded-lg transition">
                  <span className="material-symbols-outlined text-sm">edit</span>
                </Link>
                <button onClick={() => handleDelete(h.id)} className="text-red-500 hover:bg-red-500/20 p-2 rounded-lg transition">
                  <span className="material-symbols-outlined text-sm">delete</span>
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2 text-gray-300 text-sm mb-6 flex-grow">
              <span className="material-symbols-outlined text-blue-400 text-lg">location_on</span>
              <p>{h.endereco}</p>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/50 uppercase font-bold tracking-tighter">Distância</span>
                <span className="text-blue-300 font-medium">{h.distanciaDoEvento} km</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/50 uppercase font-bold tracking-tighter">Preço Médio</span>
                <span className="text-green-400 font-bold">{h.precoMedio}</span>
              </div>
            </div>

            {h.site && (
              <a href={h.site} target="_blank" className="mt-4 text-center text-xs py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white transition">
                Visitar Site Oficial
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

