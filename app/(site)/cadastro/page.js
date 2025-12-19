'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function CadastroPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleCadastro(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const dados = Object.fromEntries(formData);

    try {
      const res = await fetch('/api/usuarios/cadastro', {
        method: 'POST',
        body: JSON.stringify(dados),
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await res.json();

      if (res.ok) {
        // Redireciona para o login com um parâmetro de sucesso
        router.push('/login?success=true');
      } else {
        setError(data.error || 'Erro ao criar conta.');
        setLoading(false);
      }
    } catch (err) {
      setError('Erro de conexão com o servidor.');
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col">
      <Header />
      
      <section className="flex-grow pt-40 pb-20 px-6 flex justify-center items-center">
        <div className="w-full max-w-xl">
          <form 
            onSubmit={handleCadastro} 
            className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-xl relative overflow-hidden shadow-2xl"
          >
            {/* Efeito de luz de fundo */}
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-600/10 rounded-full blur-[80px]" />

            <div className="relative z-10">
              <div className="text-center mb-10">
                <h1 className="text-4xl font-black uppercase italic tracking-tighter mb-2">
                  CRIAR <span className="text-blue-600 not-italic">CONTA</span>
                </h1>
                <p className="text-white/40 text-[10px] uppercase tracking-[3px] font-bold">
                  Junte-se ao Tijucas Tech Summit 2025
                </p>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl text-xs mb-8 text-center font-bold">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* NOME */}
                <div className="md:col-span-2">
                  <label className="block mb-2 text-[10px] uppercase tracking-widest font-black text-white/30 ml-2">Nome Completo</label>
                  <input name="nome" type="text" placeholder="Ex: João Silva" required className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none transition-all placeholder:text-white/10" />
                </div>

                {/* EMAIL */}
                <div className="md:col-span-2">
                  <label className="block mb-2 text-[10px] uppercase tracking-widest font-black text-white/30 ml-2">E-mail</label>
                  <input name="email" type="email" placeholder="seu@email.com" required className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none transition-all placeholder:text-white/10" />
                </div>

                {/* TELEFONE */}
                <div>
                  <label className="block mb-2 text-[10px] uppercase tracking-widest font-black text-white/30 ml-2">Telefone</label>
                  <input name="telefone" type="text" placeholder="(00) 00000-0000" required className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none transition-all placeholder:text-white/10" />
                </div>

                {/* EMPRESA */}
                <div>
                  <label className="block mb-2 text-[10px] uppercase tracking-widest font-black text-white/30 ml-2">Empresa / Cargo</label>
                  <input name="empresa" type="text" placeholder="Empresa LTDA" required className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none transition-all placeholder:text-white/10" />
                </div>

                {/* SENHA */}
                <div className="md:col-span-2">
                  <label className="block mb-2 text-[10px] uppercase tracking-widest font-black text-white/30 ml-2">Criar Senha</label>
                  <input name="password" type="password" placeholder="••••••••" required className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none transition-all placeholder:text-white/10" />
                </div>
              </div>

              <button 
                disabled={loading} 
                className="w-full mt-10 p-5 rounded-2xl bg-blue-600 text-white font-black uppercase tracking-[2px] text-[11px] hover:bg-blue-500 transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-blue-600/20"
              >
                {loading ? 'PROCESSANDO...' : 'FINALIZAR INSCRIÇÃO'}
              </button>

              <p className="text-center mt-8 text-[10px] text-white/30 uppercase font-bold tracking-widest">
                Já tem uma conta? <a href="/login" className="text-blue-500 hover:underline">Fazer Login</a>
              </p>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
