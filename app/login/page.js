'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (res.ok) {
      router.refresh();
      router.push('/dashboard');
    } else {
      const data = await res.json();
      setError(data.error);
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-dashboard-nav">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-8 rounded-xl shadow-xl 
                   bg-white/20 backdrop-blur-lg 
                   border border-white/30"
      >
        <h1 className="text-3xl text-white font-bold mb-6 text-center">
          Login
        </h1>

        {error && (
          <p className="text-red-300 text-sm mb-4 text-center">{error}</p>
        )}

        {/* EMAIL */}
        <label className="block mb-2 text-sm font-semibold text-white">
          Email
        </label>
        <input
          name="email"
          type="email"
          required
          className="w-full p-3 mb-4 rounded-lg bg-white/10 text-white 
                     placeholder-gray-200 border border-white/30 
                     focus:outline-none focus:ring-2 focus:ring-white/50 text-center"
          placeholder="admin@congresso.com"
        />

        {/* SENHA */}
        <label className="block mb-2 text-sm font-semibold text-white">
          Senha
        </label>
        <input
          name="password"
          type="password"
          required
          className="w-full p-3 mb-6 rounded-lg bg-white/10 text-white 
                     placeholder-gray-200 border border-white/30 
                     focus:outline-none focus:ring-2 focus:ring-white/50 text-center"
          placeholder="Sua senha"
        />

        {/* BOTÃO */}
        <button
          disabled={loading}
          className="w-full p-3 rounded-lg 
                     bg-white text-blue-900 font-bold 
                     hover:bg-blue-50 transition 
                     disabled:bg-gray-300 disabled:text-gray-500"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

    </div>
  );
}
