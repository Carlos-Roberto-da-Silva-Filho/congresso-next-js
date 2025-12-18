"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PalestranteForm({ existingData }) {
  const router = useRouter();

  const [form, setForm] = useState({
    nome: "",
    especialidade: "",
    bio: "",
    fotoURL: "",
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
    let body = { ...form };

    if (existingData?.id) {
      body.id = existingData.id;
      method = "PUT";
    }

    await fetch("/api/palestrantes", {
      method,
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    router.push("/dashboard/palestrantes");
  }

  const inputClass = `
    input
    bg-black/20
    border-white/60
    hover:border-white
    focus:border-white
  `;

  return (
    <div className="p-6 min-h-screen flex flex-col items-center bg-dashboard-bg">
      <h1 className="text-2xl font-bold mb-6 text-white">
        {existingData ? "Editar" : "Cadastrar"} Palestrante
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg flex flex-col gap-5"
      >
        {/* Nome */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-white/80">Nome</label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        {/* Especialidade */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-white/80">
            Especialidade
          </label>
          <input
            type="text"
            name="especialidade"
            value={form.especialidade}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        {/* Bio */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-white/80">
            Mini biografia
          </label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            className={`${inputClass} h-32 resize-none`}
          />
        </div>

        {/* Foto */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-white/80">
            URL da foto
          </label>
          <input
            type="text"
            name="fotoURL"
            value={form.fotoURL}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

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
