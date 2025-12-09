"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HospedagemForm({ existingData }) {
  const router = useRouter();
  const [form, setForm] = useState({
    nome: "",
    endereco: "",
    site: "",
    telefone: "",
    distanciaDoEvento: "",
    precoMedio: "",
  });

  useEffect(() => {
    if (existingData) setForm(existingData);
  }, [existingData]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let method = "POST";
    let url = "/api/hospedagens";
    let body = { ...form };

    if (existingData?.id) {
      body.id = existingData.id;

      const allFieldsPresent =
        form.nome &&
        form.endereco &&
        form.site &&
        form.telefone &&
        form.distanciaDoEvento &&
        form.precoMedio;

      method = allFieldsPresent ? "PUT" : "PATCH";
    }

    await fetch(url, {
      method,
      body: JSON.stringify(body),
    });

    router.push("/dashboard/hospedagens");
  }

  return (
    <div className="p-6 min-h-screen bg-dashboard-bg flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          {existingData ? "Editar" : "Cadastrar"} Hospedagem
        </h1>

        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
          required
          className="input bg-white/10 text-white border border-white/30 placeholder-white/70 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-color-primary"
        />
        <input
          type="text"
          name="endereco"
          placeholder="Endereço"
          value={form.endereco}
          onChange={handleChange}
          required
          className="input bg-white/10 text-white border border-white/30 placeholder-white/70 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-color-primary"
        />
        <input
          type="text"
          name="site"
          placeholder="Site"
          value={form.site}
          onChange={handleChange}
          className="input bg-white/10 text-white border border-white/30 placeholder-white/70 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-color-primary"
        />
        <input
          type="text"
          name="telefone"
          placeholder="Telefone"
          value={form.telefone}
          onChange={handleChange}
          className="input bg-white/10 text-white border border-white/30 placeholder-white/70 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-color-primary"
        />
        <input
          type="text"
          name="distanciaDoEvento"
          placeholder="Distância do evento (km)"
          value={form.distanciaDoEvento}
          onChange={handleChange}
          className="input bg-white/10 text-white border border-white/30 placeholder-white/70 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-color-primary"
        />
        <input
          type="text"
          name="precoMedio"
          placeholder="Preço médio"
          value={form.precoMedio}
          onChange={handleChange}
          className="input bg-white/10 text-white border border-white/30 placeholder-white/70 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-color-primary"
        />

        <button
          type="submit"
          className="w-full p-3 rounded-lg bg-color-primary text-white font-bold hover:bg-color-primary-light transition"
        >
          {existingData ? "Atualizar" : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}
