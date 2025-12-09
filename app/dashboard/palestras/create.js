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

    if (existingData) setForm(existingData);
  }, [existingData]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let method = "POST";
    let url = "/api/palestras";
    let body = { ...form };

    if (existingData?.id) {
      body.id = existingData.id;
      const allFieldsPresent =
        form.titulo &&
        form.descricao &&
        form.dataHora &&
        form.local &&
        form.palestranteId;
      method = allFieldsPresent ? "PUT" : "PATCH";
    }

    await fetch(url, {
      method,
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    router.push("/dashboard/palestras");
  }

  return (
    <div className="p-6 max-w-lg mx-auto bg-dashboard-bg min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center text-white">
        {existingData ? "Editar" : "Cadastrar"} Palestra
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="titulo"
          placeholder="Título"
          value={form.titulo}
          onChange={handleChange}
          required
          className="input bg-white/10 text-white border border-white/30 placeholder-white/50 focus:ring-2 focus:ring-white/50"
        />

        <textarea
          name="descricao"
          placeholder="Descrição"
          value={form.descricao}
          onChange={handleChange}
          className="input h-32 resize-none bg-white/10 text-white border border-white/30 placeholder-white/50 focus:ring-2 focus:ring-white/50"
        />

        <div className="flex flex-col sm:flex-row sm:gap-4">
          <input
            type="datetime-local"
            name="dataHora"
            value={form.dataHora}
            onChange={handleChange}
            required
            className="input flex-1 bg-white/10 text-white border border-white/30 placeholder-white/50 focus:ring-2 focus:ring-white/50"
          />
          <input
            type="text"
            name="local"
            placeholder="Local"
            value={form.local}
            onChange={handleChange}
            className="input flex-1 mt-2 sm:mt-0 bg-white/10 text-white border border-white/30 placeholder-white/50 focus:ring-2 focus:ring-white/50"
          />
        </div>

        <select
          name="palestranteId"
          value={form.palestranteId}
          onChange={handleChange}
          required
          className="input bg-white/10 text-white border border-white/30 placeholder-white/50 focus:ring-2 focus:ring-white/50"
        >
          <option value="">Selecione o palestrante</option>
          {palestrantes.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nome}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="px-4 py-2 mt-2 bg-color-primary text-white rounded-lg hover:bg-color-primary-light transition"
        >
          {existingData ? "Atualizar" : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}
