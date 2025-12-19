"use client";

import { useState } from "react";

export default function DetalhesBio({ bio }) {
  const [aberto, setAberto] = useState(false);

  return (
    <div className="mt-2">
      <button
        onClick={() => setAberto(!aberto)}
        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-colors group"
      >
        <span className="material-symbols-outlined text-sm transition-transform duration-300" 
              style={{ transform: aberto ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          expand_more
        </span>
        {aberto ? "Ocultar Bio" : "Ver Biografia"}
      </button>

      {aberto && (
        <div className="mt-4 p-4 bg-white/5 border border-white/5 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-300">
          <p className="text-sm leading-relaxed text-white/70 italic">
            "{bio}"
          </p>
        </div>
      )}
    </div>
  );
}
