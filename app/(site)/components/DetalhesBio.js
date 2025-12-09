"use client"; // necessário porque usa useState

import { useState } from "react";

/**
 * Componente responsável apenas pela interatividade
 * de mostrar/ocultar a bio do palestrante.
 */
export default function DetalhesBio({ bio }) {
  const [aberto, setAberto] = useState(false);

  return (
    <div>
      <button
        onClick={() => setAberto(!aberto)}
        className="mt-2 px-3 py-1 bg-white/10 rounded hover:bg-white/20 transition text-sm"
      >
        {aberto ? "Ocultar detalhes" : "Ver detalhes"}
      </button>

      {aberto && <p className="mt-2 text-sm opacity-90">{bio}</p>}
    </div>
  );
}
