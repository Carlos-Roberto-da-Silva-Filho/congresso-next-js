"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function PalestrasDashboard() {
  const [palestras, setPalestras] = useState([]);
  const [palestrantes, setPalestrantes] = useState({}); // Mapa de ID -> Nome
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    setLoading(true);
    try {
      // Busca palestras e palestrantes simultaneamente
      const [resPal, resPtr] = await Promise.all([
        fetch("/api/palestras"),
        fetch("/api/palestrantes")
      ]);
      
      const dataPal = await resPal.json();
      const dataPtr = await resPtr.json();

      // Cria um objeto de referência rápida { id: nome }
      const ptrMap = {};
      dataPtr.forEach(p => ptrMap[p.id] = p.nome);
      
      setPalestrantes(ptrMap);
      setPalestras(dataPal);
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Excluir esta palestra permanentemente?")) return;
    await fetch("/api/palestras", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });
    fetchData();
  }

  useEffect(() => { fetchData(); }, []);

  if (loading) return <div className="text-white p-8 italic">Carregando cronograma...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Gestão de Palestras</h1>
          <p className="text-blue-300/80 text-sm">Organize os horários e temas do evento</p>
        </div>
        <Link href="/dashboard/palestras/create" className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all flex items-center gap-2">
          <span className="material-symbols-outlined">add</span> Nova Palestra
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {palestras.map((p) => (
          <div key={p.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-blue-500/50 transition-all group">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-tighter bg-blue-400/10 px-2 py-1 rounded">
                  {p.dataHora?.split('T')[1] || "--:--"}
                </span>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link href={`/dashboard/palestras/${p.id}`} className="text-yellow-500 hover:text-white"><span className="material-symbols-outlined text-sm">edit</span></Link>
                  <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-white"><span className="material-symbols-outlined text-sm">delete</span></button>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-1 leading-tight">{p.titulo}</h3>
              <p className="text-blue-200 text-xs font-medium mb-4">
                {palestrantes[p.palestranteId] || "Palestrante não definido"}
              </p>
              
              <p className="text-white/40 text-sm line-clamp-2 italic mb-4">"{p.descricao}"</p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
               <div className="flex items-center gap-2 text-white/60 text-[10px] font-bold uppercase">
                 <span className="material-symbols-outlined text-xs">location_on</span>
                 {p.local || "A definir"}
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
