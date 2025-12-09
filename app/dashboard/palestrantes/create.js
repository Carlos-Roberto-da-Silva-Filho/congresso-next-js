"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PalestranteForm({ existingData }) {
  const router = useRouter();
  const [form, setForm] = useState({
    nome: "",
    bio: "",
    fotoURL: "",
    especialidade: "",
    palestrasIds: [],
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
    let url = "/api/palestrantes";
    let body = { ...form };

    if (existingData?.id) {
      body.id = existingData.id;
      // Se todos os campos preenchidos, PUT, senão PATCH
      const allFieldsPresent =
        form.nome && form.bio && form.fotoURL && form.especialidade;
      method = allFieldsPresent ? "PUT" : "PATCH";
    }

    await fetch(url, {
      method,
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    router.push("/dashboard/palestrantes");
  }

  return (
    <div className="p-6 min-h-screen flex flex-col items-center bg-dashboard-bg">
      <h1 className="text-2xl font-bold mb-6 text-white text-center">
        {existingData ? "Editar" : "Cadastrar"} Palestrante
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 shadow-md flex flex-col gap-4"
      >
        <div className="flex flex-col sm:flex-row sm:gap-4">
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={form.nome}
            onChange={handleChange}
            required
            className="input flex-1"
          />
          <input
            type="text"
            name="especialidade"
            placeholder="Especialidade"
            value={form.especialidade}
            onChange={handleChange}
            required
            className="input flex-1 mt-2 sm:mt-0"
          />
        </div>

        <textarea
          name="bio"
          placeholder="Mini biografia"
          value={form.bio}
          onChange={handleChange}
          className="input h-32 resize-none"
        />

        <input
          type="text"
          name="fotoURL"
          placeholder="URL da foto"
          value={form.fotoURL}
          onChange={handleChange}
          className="input"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-color-primary text-white rounded-lg hover:bg-color-primary-light transition mt-2"
        >
          {existingData ? "Atualizar" : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}
