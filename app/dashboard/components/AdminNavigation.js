'use client';

import { useState } from "react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function AdminNavigation({ user }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-dashboard-nav text-white shadow-md">
      <div className="px-4 py-4 flex justify-between items-center md:px-8">
        <span className="font-bold text-lg tracking-wide">Painel do Congresso</span>

        {/* Botão Hamburger para mobile */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Links do menu */}
        <div className={`flex-col md:flex md:flex-row md:items-center gap-6 md:gap-8 ${menuOpen ? "flex" : "hidden md:flex"}`}>
          <div className="flex flex-col md:flex-row gap-6 md:gap-6 text-sm font-medium">
            <Link href="/dashboard" className="hover:opacity-80 focus:opacity-80">Início</Link>
            <Link href="/dashboard/palestrantes" className="hover:opacity-80 focus:opacity-80">Palestrantes</Link>
            <Link href="/dashboard/palestras" className="hover:opacity-80 focus:opacity-80">Palestras</Link>
            <Link href="/dashboard/local-evento" className="hover:opacity-80 focus:opacity-80">Local do Evento</Link>
            <Link href="/dashboard/hospedagens" className="hover:opacity-80 focus:opacity-80">Hospedagens</Link>
            <Link href="/dashboard/inscricoes" className="hover:opacity-80 focus:opacity-80">Inscrições</Link>
            <Link href="/dashboard/config" className="hover:opacity-80 focus:opacity-80">Configurações</Link>
          </div>

          <span className="text-sm opacity-90 mt-2 md:mt-0">{user.email}</span>
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
}
