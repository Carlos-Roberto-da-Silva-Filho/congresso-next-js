"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function LocalEventoPage() {
  const [local, setLocal] = useState(null);

  useEffect(() => {
    async function fetchLocal() {
      const res = await fetch("/api/local-evento");
      const data = await res.json();
      setLocal(data);
    }
    fetchLocal();
  }, []);

  if (!local)
    return (
      <div className="p-6 flex justify-center items-center min-h-screen text-white">
        Carregando...
      </div>
    );

  return (
    <div className="p-6 min-h-screen bg-dashboard-bg flex flex-col items-center">
      <div className="w-full max-w-lg flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Local do Evento</h1>
        <Link
          href="/dashboard/local-evento/edit"
          className="px-4 py-2 bg-color-primary text-white rounded-lg hover:bg-color-primary-light transition"
        >
          ✏️ Editar
        </Link>
      </div>

      <div className="w-full max-w-lg bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 shadow-md flex flex-col gap-3 text-white">
        <p>
          <strong>Nome:</strong> {local.nome}
        </p>
        <p>
          <strong>Endereço:</strong> {local.endereco}
        </p>
        <p>
          <strong>Cidade:</strong> {local.cidade}
        </p>
        <p>
          <strong>Estado:</strong> {local.estado}
        </p>
        <p>
          <strong>Latitude:</strong> {local.latitude}
        </p>
        <p>
          <strong>Longitude:</strong> {local.longitude}
        </p>
        <p>
          <strong>Informações Adicionais:</strong> {local.informacoesAdicionais}
        </p>
      </div>
    </div>
  );
}
