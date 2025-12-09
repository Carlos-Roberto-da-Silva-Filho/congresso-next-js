// components/CardPalestra.js
import React from "react";

export default function CardPalestra({ palestra }) {
  return (
    <div className="flex flex-col p-4 bg-[rgba(8,38,73,0.7)] hover:bg-[rgba(6,76,142,0.8)] text-white rounded-xl transition cursor-pointer w-80">
      <h3 className="text-xl font-bold mb-2">{palestra.titulo}</h3>
      <p className="text-sm opacity-80 mb-2">{palestra.descricao}</p>
      <p className="text-sm opacity-60 mb-1">
        Data/Hora: {new Date(palestra.dataHora).toLocaleString("pt-BR")}
      </p>
      <p className="text-sm opacity-60">Local: {palestra.local}</p>
    </div>
  );
}
