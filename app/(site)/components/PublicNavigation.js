'use client';

import Link from "next/link";

export default function PublicNavigation() {
  return (
    <nav className="flex justify-center space-x-6 py-4 bg-site-nav text-white text-sm font-medium shadow-md">
      <Link href="/" className="hover:opacity-80">Home</Link>
      <Link href="/palestras" className="hover:opacity-80">Palestras</Link>
      <Link href="/palestrantes" className="hover:opacity-80">Palestrantes</Link>
      <Link href="/local_evento" className="hover:opacity-80">Local do Evento</Link>
      <Link href="/login" className="hover:opacity-80">Login</Link>
    </nav>
  );
}
