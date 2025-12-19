'use client';

import { useState } from "react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function AdminNavigation({ user, isAdmin }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-dashboard-nav text-white shadow-md">
      <div className="px-4 py-4 flex justify-between items-center md:px-8">
        <span className="font-bold text-lg tracking-wide uppercase italic">
          {isAdmin ? "Painel do Gestor" : "Portal do Congressista"}
        </span>

        <button className="md:hidden focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        <div className={`flex-col md:flex md:flex-row md:items-center gap-6 md:gap-8 ${menuOpen ? "flex" : "hidden md:flex"}`}>
          <div className="flex flex-col md:flex-row gap-6 md:gap-6 text-sm font-black uppercase tracking-widest">
            <Link href="/dashboard" className="hover:text-blue-400 transition-colors">Início</Link>
            
            {isAdmin && (
              <>
                <Link href="/dashboard/palestrantes" className="hover:text-blue-400 transition-colors">Palestrantes</Link>
                <Link href="/dashboard/palestras" className="hover:text-blue-400 transition-colors">Palestras</Link>
                <Link href="/dashboard/local-evento" className="hover:text-blue-400 transition-colors">Local</Link>
                <Link href="/dashboard/hospedagens" className="hover:text-blue-400 transition-colors">Hospedagens</Link>
                <Link href="/dashboard/relatorio" className="text-blue-400 hover:text-white transition-colors underline underline-offset-4">
                  Relatório Geral
                </Link>
              </>
            )}
            
            {/* Link para o Pedro (Usuário comum) */}
            {!isAdmin && (
              <Link href="/area_usuario/minhas-palestras" className="hover:text-blue-400">Minha Agenda</Link>
            )}
          </div>

          <div className="flex items-center gap-4 border-l border-white/10 pl-6">
            <span className="text-[10px] opacity-50 font-bold">{user.email}</span>
            <LogoutButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
