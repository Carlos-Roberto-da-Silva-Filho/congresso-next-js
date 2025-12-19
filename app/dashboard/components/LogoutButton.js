'use client';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    try {
      await fetch('/api/logout', { method: 'POST' });
      router.refresh(); // Limpa caches do servidor
      router.push('/login');
    } catch (err) {
      console.error("Erro ao sair:", err);
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="px-6 py-2 rounded-xl bg-red-600/10 border border-red-600/20 text-red-500 text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all"
    >
      Sair
    </button>
  );
}
