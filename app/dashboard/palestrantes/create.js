"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { palestranteSchema } from "@/lib/schemas/palestrantes";

export default function PalestranteForm({ existingData }) {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    nome: "", especialidade: "", bio: "", fotoURL: "", palestrasIds: [],
  });

  useEffect(() => {
    if (existingData) setForm(existingData);
  }, [existingData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
  };

  // Lógica de Upload de Imagem
  async function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) {
        setForm({ ...form, fotoURL: data.url });
      }
    } catch (err) {
      alert("Erro ao subir imagem");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    const result = palestranteSchema.safeParse(form);
    if (!result.success) {
      setErrors(result.error.format());
      return;
    }

    const method = existingData?.id ? "PUT" : "POST";
    const body = existingData?.id ? { ...form, id: existingData.id } : form;

    const res = await fetch("/api/palestrantes", {
      method,
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/dashboard/palestrantes");
      router.refresh();
    }
  }

  const ErrorMsg = ({ field }) => (
    errors[field] && <span className="text-red-400 text-[10px] mt-1 italic">{errors[field]._errors[0]}</span>
  );

  const inputClass = (field) => `w-full p-3 rounded-xl bg-black/40 border ${errors[field] ? 'border-red-500/60' : 'border-white/10'} text-white outline-none transition-all`;

  return (
    <div className="p-4 md:p-10 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <Link href="/dashboard/palestrantes" className="text-blue-400 text-sm flex items-center gap-1 mb-6">
          <span className="material-symbols-outlined text-sm">arrow_back</span> Voltar
        </Link>

        <h1 className="text-3xl font-bold mb-8 text-white">
          {existingData ? "Editar Perfil" : "Registrar Palestrante"}
        </h1>

        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col gap-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-blue-200/60 uppercase tracking-widest mb-2">Nome</label>
              <input type="text" name="nome" value={form.nome} onChange={handleChange} className={inputClass('nome')} placeholder="Nome completo" />
              <ErrorMsg field="nome" />
            </div>

            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-blue-200/60 uppercase tracking-widest mb-2">Especialidade</label>
              <input type="text" name="especialidade" value={form.especialidade} onChange={handleChange} className={inputClass('especialidade')} placeholder="Ex: UX Design" />
              <ErrorMsg field="especialidade" />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-blue-200/60 uppercase tracking-widest mb-2">Bio</label>
            <textarea name="bio" value={form.bio} onChange={handleChange} rows="3" className={inputClass('bio')} placeholder="Conte um pouco sobre a carreira..." />
            <ErrorMsg field="bio" />
          </div>

          {/* Upload de Foto */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-blue-200/60 uppercase tracking-widest">Foto de Perfil</label>
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="w-20 h-20 rounded-full border-2 border-white/20 overflow-hidden bg-black/40">
                  {form.fotoURL ? (
                    <img src={form.fotoURL} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/20">
                      <span className="material-symbols-outlined scale-150">person</span>
                    </div>
                  )}
                </div>
                {uploading && <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-full"><div className="w-5 h-5 border-2 border-blue-500 border-t-transparent animate-spin rounded-full"></div></div>}
              </div>
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" id="fileInput" />
              <label htmlFor="fileInput" className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-bold cursor-pointer hover:bg-white/10 transition-all">
                {form.fotoURL ? "Alterar Foto" : "Escolher Foto"}
              </label>
              {form.fotoURL && <span className="text-[10px] text-green-400 font-medium italic">Imagem pronta!</span>}
            </div>
            <ErrorMsg field="fotoURL" />
          </div>

          <button type="submit" disabled={uploading} className="w-full py-4 mt-4 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-black uppercase tracking-widest transition-all shadow-lg">
            {existingData ? "Salvar Alterações" : "Finalizar Registro"}
          </button>
        </form>
      </div>
    </div>
  );
}
