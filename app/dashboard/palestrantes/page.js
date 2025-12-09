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
    <div className="p-6 bg-[var(--background)] min-h-screen text-[var(--text-dashboard)]">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
        <h1 className="text-2xl font-bold">Palestrantes</h1>
        <Link
          href="/dashboard/palestrantes/create"
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
              <th className="p-3 text-left text-xl font-bold text-white">Nome</th>
              <th className="p-3 text-left text-xl font-bold text-white">Especialidade</th>
              <th className="p-3 text-center text-xl font-bold text-white">Ações</th>
            </tr>
          </thead>
          <tbody>
            {palestrantes.map((p, idx) => (
              <tr
                key={p.id}
                className={`border-2 border-white/20 ${
                  idx % 2 === 0
                    ? "bg-[rgba(8,38,73,0.7)]"
                    : "bg-[rgba(6,76,142,0.7)]"
                }`}
              >
                <td className="p-2 border-2 border-white/20">{p.nome}</td>
                <td className="p-2 border-2 border-white/20">{p.especialidade}</td>
                <td className="p-2 border-2 border-white/20 flex justify-center gap-2">
                  <Link
                    href={`/dashboard/palestrantes/${p.id}`}
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
        {palestrantes.map((p) => (
          <div
            key={p.id}
            className="bg-[rgba(255,255,255,0.05)] shadow rounded p-4 border border-white/20 flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <span className="font-bold">{p.nome}</span>
              <div className="flex gap-2">
                <Link
                  href={`/dashboard/palestrantes/${p.id}`}
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
              </div>
            </div>
            <span className="text-sm opacity-80">{p.especialidade}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
