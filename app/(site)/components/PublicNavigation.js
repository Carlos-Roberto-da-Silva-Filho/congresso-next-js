'use client';

import { useState } from "react";
import Link from "next/link";

export default function PublicNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  // ADICIONADO: Hospedagens incluída na lista
  const links = [
    { name: "Início", href: "/" },
    { name: "Palestras", href: "/palestras" },
    { name: "Palestrantes", href: "/palestrantes" },
    { name: "Hospedagens", href: "/hospedagens" }, // <-- Novo Link
    { name: "Local", href: "/local_evento" },
  ];

  return (
    <div className="flex items-center justify-end">
      {/* --- MENU DESKTOP --- */}
      <nav className="hidden md:flex items-center gap-8 mr-10">
        {links.map((link) => (
          <Link 
            key={link.href} 
            href={link.href} 
            className="group relative text-[11px] font-black uppercase tracking-[2px] text-white/50 hover:text-white transition-colors"
          >
            {link.name}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
          </Link>
        ))}
      </nav>

      {/* --- BOTÃO LOGIN --- */}
      <Link 
        href="/login" 
        className="hidden md:flex px-6 py-2.5 rounded-xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all active:scale-95 items-center justify-center"
      >
        Acessar Login
      </Link>

      {/* --- BOTÃO MOBILE --- */}
      <div className="md:hidden flex items-center justify-center w-10 h-10">
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="text-white hover:text-blue-500 transition-colors focus:outline-none"
        >
          <span className="material-symbols-outlined text-3xl flex items-center justify-center">
            {isOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* --- MENU MOBILE DROPDOWN --- */}
      {isOpen && (
        <div className="fixed inset-0 top-20 z-[60] md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <nav className="relative w-full bg-[#0a0a0a] border-b border-white/10 p-8 flex flex-col gap-6 animate-in slide-in-from-top-5 duration-300 shadow-2xl">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}
                className="text-3xl font-black tracking-tighter text-white hover:text-blue-500"
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px bg-white/10 my-2" />
            <Link href="/login" onClick={() => setIsOpen(false)}
              className="w-full py-5 bg-blue-600 rounded-2xl text-center text-white font-black uppercase tracking-widest text-sm"
            >
              Entrar no Perfil
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
