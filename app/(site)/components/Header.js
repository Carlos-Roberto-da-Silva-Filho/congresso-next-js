'use client';

import Link from "next/link";
import PublicNavigation from "./PublicNavigation";

export default function Header() {
  return (
    // Removido bg-site-nav antigo, usando o novo padrão dark/glass
    <header className="fixed w-full z-50 top-0 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
      {/* O container abaixo garante que o conteúdo NUNCA saia do alinhamento central */}
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Lado Esquerdo: Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
            <span className="text-white font-black text-xl">C</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold leading-none tracking-tighter text-lg">
              CONGRESSO<span className="text-blue-500">2025</span>
            </span>
            <span className="text-[9px] uppercase tracking-[2px] text-white/30 font-medium hidden sm:block">
              Acadêmico & Tech
            </span>
          </div>
        </Link>

        {/* Lado Direito: Navegação (Desktop e Mobile Sandwich) */}
        <div className="flex items-center justify-end flex-1">
          <PublicNavigation />
        </div>

      </div>
    </header>
  );
}
