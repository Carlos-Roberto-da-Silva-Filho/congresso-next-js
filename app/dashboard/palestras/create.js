"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PalestraForm({ existingData }) {
  const router = useRouter();

  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    dataHora: "",
    local: "",
    palestranteId: "",
  });

  const [palestrantes, setPalestrantes] = useState([]);

  useEffect(() => {
    async function fetchPalestrantes() {
      const res = await fetch("/api/palestrantes");
      const data = await res.json();
      setPalestrantes(data);
    }

    fetchPalestrantes();

    if (existingData) {
      setForm({
        titulo: existingData.titulo || "",
        descricao: existingData.descricao || "",
        dataHora: existingData.dataHora || "",
        local: existingData.local || "",
        palestranteId: existingData.palestranteId || "",
      });
    }
  }, [existingData]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let method = "POST";
    let body = { ...form };

    if (existingData?.id) {
      body.id = existingData.id;
      method = "PUT";
    }

    await fetch("/api/palestras", {
      method,
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    router.push("/dashboard/palestras");
  }

  const inputClass =
    "w-full rounded-lg px-3 py-2 bg-black/20 text-white " +
    "border border-white/60 placeholder-white/60 " +
    "focus:outline-none focus:ring-2 focus:ring-white/40 " +
    "hover:border-white transition";

  return (
    <div className="p-6 min-h-screen flex flex-col items-center bg-[var(--background)]">
      <h1 className="text-2xl font-bold mb-6 text-white">
        {existingData ? "Editar" : "Cadastrar"} Palestra
      </h1>

      <form className="w-full max-w-lg flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Título */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-white/80">Título</label>
          <input
            type="text"
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        {/* Descrição */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-white/80">Descrição</label>
          <textarea
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            className={`${inputClass} h-28 resize-none`}
          />
        </div>

        {/* Data e Local */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-sm text-white/80">Data e hora</label>
            <input
              type="datetime-local"
              name="dataHora"
              value={form.dataHora}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1 flex-1">
            <label className="text-sm text-white/80">Local</label>
            <input
              type="text"
              name="local"
              value={form.local}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        {/* Palestrante */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-white/80">Palestrante</label>
          <select
            name="palestranteId"
            value={form.palestranteId}
            onChange={handleChange}
            required
            className={inputClass}
          >
            <option value="">Selecione o palestrante</option>
            {palestrantes.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nome}
              </option>
            ))}
          </select>
        </div>

        {/* Botão */}
        <button
          type="submit"
          className="mt-4 px-4 py-2 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white font-medium transition"
        >
          {existingData ? "Atualizar" : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}
