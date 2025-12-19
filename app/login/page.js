'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebaseClient';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      // Login universal no Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();

      // Envia o token para criar o Session Cookie
      const res = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ idToken }),
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await res.json();

      if (res.ok) {
        router.refresh();
        setTimeout(() => router.push(data.redirectTo), 100);
      } else {
        setError(data.error);
        setLoading(false);
      }
    } catch (err) {
      setError("E-mail ou senha inválidos.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center p-6 text-white">
      <div className="w-full max-w-[400px] space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">
            Acesso <span className="text-blue-600">Restrito</span>
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[4px] opacity-40 mt-2">
            Identifique-se para continuar
          </p>
        </header>

        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] shadow-2xl space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase p-4 rounded-2xl text-center tracking-widest">
              {error}
            </div>
          )}

          <div>
            <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-4 mb-2 block">E-mail</label>
            <input 
              name="email" 
              type="email" 
              required 
              className="w-full bg-black border border-white/10 p-4 rounded-2xl focus:border-blue-600 outline-none transition-all font-bold"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-4 mb-2 block">Senha</label>
            <input 
              name="password" 
              type="password" 
              required 
              className="w-full bg-black border border-white/10 p-4 rounded-2xl focus:border-blue-600 outline-none transition-all font-bold"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-5 rounded-2xl font-black uppercase italic tracking-widest transition-all ${
              loading 
                ? 'bg-white/10 text-white/20 cursor-not-allowed' 
                : 'bg-white text-black hover:bg-blue-600 hover:text-white active:scale-95'
            }`}
          >
            {loading ? 'Validando...' : 'Entrar no Sistema'}
          </button>
        </form>

        <footer className="text-center">
          <button 
            type="button"
            onClick={() => router.push('/')}
            className="text-[10px] font-black uppercase tracking-widest opacity-20 hover:opacity-100 transition-all"
          >
            ← Voltar para a Home
          </button>
        </footer>
      </div>
    </main>
  );
}
