"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditLocalEvento() {
  const router = useRouter();
  const [form, setForm] = useState({
    nome: "",
    endereco: "",
    cidade: "",
    estado: "",
    latitude: "",
    longitude: "",
    informacoesAdicionais: "",
  });

  useEffect(() => {
    async function fetchLocal() {
      const res = await fetch("/api/local-evento");
      const data = await res.json();
      setForm(data);
    }
    fetchLocal();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Sempre PATCH pois geralmente só atualizamos campos
    await fetch("/api/local-evento", {
      method: "PATCH",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });

    router.push("/dashboard/local-evento");
  }

  return (
    <div className="p-6 min-h-screen flex flex-col items-center bg-dashboard-bg">
      <h1 className="text-2xl font-bold mb-6 text-white">Editar Local do Evento</h1>

      <form className="w-full max-w-lg bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 shadow-md flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
          className="input"
          required
        />
        <input
          type="text"
          name="endereco"
          placeholder="Endereço"
          value={form.endereco}
          onChange={handleChange}
          className="input"
          required
        />
        <input
          type="text"
          name="cidade"
          placeholder="Cidade"
          value={form.cidade}
          onChange={handleChange}
          className="input"
          required
        />
        <input
          type="text"
          name="estado"
          placeholder="Estado"
          value={form.estado}
          onChange={handleChange}
          className="input"
          required
        />
        <input
          type="text"
          name="latitude"
          placeholder="Latitude"
          value={form.latitude}
          onChange={handleChange}
          className="input"
        />
        <input
          type="text"
          name="longitude"
          placeholder="Longitude"
          value={form.longitude}
          onChange={handleChange}
          className="input"
        />
        <textarea
          name="informacoesAdicionais"
          placeholder="Informações adicionais"
          value={form.informacoesAdicionais}
          onChange={handleChange}
          className="input"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-color-primary text-white rounded-lg hover:bg-color-primary-light transition"
        >
          Atualizar
        </button>
      </form>
    </div>
  );
}
