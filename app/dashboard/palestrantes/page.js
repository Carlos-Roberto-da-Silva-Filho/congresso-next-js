"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PalestrantesPage() {
  const [palestrantes, setPalestrantes] = useState([]);

  async function fetchPalestrantes() {
    const res = await fetch("/api/palestrantes");
    const data = await res.json();
    setPalestrantes(data);
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

  return (
    <div className="p-6 min-h-screen bg-[var(--background)] text-[var(--text-dashboard)]">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
        <h1 className="text-2xl font-semibold text-white">Palestrantes</h1>

        <Link
          href="/dashboard/palestrantes/create"
          className="px-4 py-2 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white font-medium transition"
        >
          + Cadastrar
        </Link>
      </div>

      {/* Tabela Desktop */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-white/20">
        <table className="min-w-full border-collapse">
          <thead className="bg-[var(--color-primary-light)]">
            <tr>
              <th className="p-3 text-left text-sm font-semibold text-white">
                Nome
              </th>
              <th className="p-3 text-left text-sm font-semibold text-white">
                Especialidade
              </th>
              <th className="p-3 text-center text-sm font-semibold text-white">
                Ações
              </th>
            </tr>
          </thead>

          <tbody>
            {palestrantes.map((p, idx) => (
              <tr
                key={p.id}
                className={`${
                  idx % 2 === 0
                    ? "bg-[rgba(8,38,73,0.6)]"
                    : "bg-[rgba(6,76,142,0.6)]"
                } border-t border-white/10 hover:bg-white/5 transition`}
              >
                <td className="p-3">{p.nome}</td>
                <td className="p-3">{p.especialidade}</td>
                <td className="p-3 flex justify-center gap-3">
                  <Link
                    href={`/dashboard/palestrantes/${p.id}`}
                    className="material-symbols-outlined text-white/80 hover:text-yellow-400 transition"
                    title="Editar"
                  >
                    edit
                  </Link>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="material-symbols-outlined text-white/80 hover:text-red-400 transition"
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

      {/* Cards Mobile */}
      <div className="md:hidden flex flex-col gap-4 mt-4">
        {palestrantes.map((p) => (
          <div
            key={p.id}
            className="bg-white/5 border border-white/20 rounded-xl p-4 flex flex-col gap-2 shadow-sm"
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold">{p.nome}</span>
              <div className="flex gap-2">
                <Link
                  href={`/dashboard/palestrantes/${p.id}`}
                  className="material-symbols-outlined text-white/80 hover:text-yellow-400 transition"
                >
                  edit
                </Link>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="material-symbols-outlined text-white/80 hover:text-red-400 transition"
                >
                  delete
                </button>
              </div>
            </div>
            <span className="text-sm opacity-80">{p.especialidade}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
