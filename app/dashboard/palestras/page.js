"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PalestrasPage() {
  const [palestras, setPalestras] = useState([]);

  async function fetchPalestras() {
    const res = await fetch("/api/palestras");
    const data = await res.json();
    setPalestras(data);
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

  useEffect(() => {
    fetchPalestras();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-[var(--background)] text-[var(--text-dashboard)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h1 className="text-2xl font-bold">Palestras</h1>
        <Link
          href="/dashboard/palestras/create"
          className="px-4 py-2 rounded bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white transition"
        >
          + Cadastrar
        </Link>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-lg border-2 border-white/20">
        <table className="min-w-full rounded-lg border-collapse">
          <thead className="bg-[var(--color-primary-light)]">
            <tr className="border-2 border-white/20">
              <th className="p-3 text-left text-xl font-bold text-white">Título</th>
              <th className="p-3 text-left text-xl font-bold text-white">Palestrante</th>
              <th className="p-3 text-center text-xl font-bold text-white">Ações</th>
            </tr>
          </thead>
          <tbody>
            {palestras.map((p, idx) => (
              <tr 
                key={p.id}
                className={`border-2 border-white/20 ${
                  idx % 2 === 0
                    ? "bg-[rgba(8, 38, 73, 0.7)]"
                    : "bg-[rgba(6, 76, 142, 0.7)]"
                }`}
              >
                <td className="p-2">{p.titulo}</td>
                <td className="p-2">{p.palestranteNome}</td>
                <td className="p-2 flex justify-center gap-2">
                  <Link
                    href={`/dashboard/palestras/${p.id}`}
                    className="material-symbols-outlined text-white hover:text-yellow-400 cursor-pointer"
                    title="Editar"
                  >
                    edit
                  </Link>

                  <button
                    onClick={() => handleDelete(p.id)}
                    className="material-symbols-outlined text-white hover:text-red-400 cursor-pointer"
                    title="Deletar"
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-4 mt-4">
        {palestras.map((p) => (
          <div
            key={p.id}
            className="bg-[rgba(255,255,255,0.05)] shadow rounded p-4 border border-white/20 flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <span className="font-bold">{p.titulo}</span>
              <div className="flex gap-2">
                <Link
                  href={`/dashboard/palestras/${p.id}`}
                  className="material-symbols-outlined text-white hover:text-green-400 cursor-pointer"
                  title="Editar"
                >
                  edit
                </Link>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="material-symbols-outlined text-white hover:text-red-400 cursor-pointer"
                  title="Deletar"
                >
                  delete
                </button>
              </div>
            </div>
            <span className="text-sm opacity-80">{p.palestranteNome}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
