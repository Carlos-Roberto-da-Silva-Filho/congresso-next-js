"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function HospedagensPage() {
  const [hospedagens, setHospedagens] = useState([]);

  async function fetchHospedagens() {
    const res = await fetch("/api/hospedagens");
    const data = await res.json();
    setHospedagens(data);
  }

  async function handleDelete(id) {
    if (!confirm("Deseja realmente excluir esta hospedagem?")) return;

    await fetch("/api/hospedagens", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });

    fetchHospedagens();
  }

  useEffect(() => {
    fetchHospedagens();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-[var(--background)] text-[var(--text-dashboard)]">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h1 className="text-2xl font-bold">Hospedagens</h1>
        <Link
          href="/dashboard/hospedagens/create"
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
              <th className="p-3 text-left text-xl font-bold text-white">Endereço</th>
              <th className="p-3 text-left text-xl font-bold text-white">Preço Médio</th>
              <th className="p-3 text-center text-xl font-bold text-white">Ações</th>
            </tr>
          </thead>
          <tbody>
            {hospedagens.map((h, idx) => (
              <tr
                key={h.id}
                className={`border-2 border-white/20 ${
                  idx % 2 === 0
                    ? "bg-[rgba(8,38,73,0.7)]"
                    : "bg-[rgba(6,76,142,0.7)]"
                }`}
              >
                <td className="p-2 border-2 border-white/20">{h.nome}</td>
                <td className="p-2 border-2 border-white/20">{h.endereco}</td>
                <td className="p-2 border-2 border-white/20">{h.precoMedio}</td>
                <td className="p-2 border-2 border-white/20 flex justify-center gap-2">
                  <Link
                    href={`/dashboard/hospedagens/${h.id}`}
                    className="material-symbols-outlined text-white hover:text-yellow-400 cursor-pointer"
                    title="Editar"
                  >
                    edit
                  </Link>
                  <button
                    onClick={() => handleDelete(h.id)}
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
        {hospedagens.map((h) => (
          <div
            key={h.id}
            className="bg-[rgba(255,255,255,0.05)] shadow rounded p-4 border border-white/20 flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <span className="font-bold">{h.nome}</span>
              <div className="flex gap-2">
                <Link
                  href={`/dashboard/hospedagens/${h.id}`}
                  className="material-symbols-outlined text-white hover:text-yellow-400 cursor-pointer"
                  title="Editar"
                >
                  edit
                </Link>
                <button
                  onClick={() => handleDelete(h.id)}
                  className="material-symbols-outlined text-white hover:text-red-400 cursor-pointer"
                  title="Deletar"
                >
                  delete
                </button>
              </div>
            </div>
            <span className="text-sm opacity-80">{h.endereco}</span>
            <span className="text-sm opacity-80">{h.precoMedio}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

