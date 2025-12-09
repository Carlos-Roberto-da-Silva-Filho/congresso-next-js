'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/logout', { method: 'POST' });
    router.refresh();
    router.push('/login');
  }

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 rounded-lg bg-white text-blue-900 font-semibold shadow hover:bg-gray-100 transition"
    >
      Sair
    </button>
  );
}
