// components/CardPalestrante.js
import Image from "next/image";
import DetalhesBio from "./DetalhesBio"; // client component para interatividade

/**
 * CardPalestrante - Server Component híbrido
 * - Renderizado no servidor (ISR)
 * - Parte interativa (mostrar/ocultar bio) é client component
 */
export default function CardPalestrante({ palestrante }) {
  const bgBase = "bg-[rgba(8,38,73,0.7)]";
  const hoverBg = "hover:bg-[rgba(6,76,142,0.8)]";
  const borderRadius = "rounded-xl";

  return (
    <div
      className={`flex flex-col p-4 ${bgBase} ${hoverBg} text-white ${borderRadius} transition cursor-pointer w-[320px]`}
    >
      {/* Foto do palestrante */}
      <div className="relative w-full h-[240px] mb-4 rounded-xl overflow-hidden">
        <Image
          src={`${palestrante.fotoURL}`}
          alt={palestrante.nome}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Nome e Especialidade */}
      <h3 className="text-xl font-bold">{palestrante.nome}</h3>
      <p className="text-sm opacity-80 mb-2">{palestrante.especialidade}</p>

      {/* Botão Detalhes -> Client Component */}
      <div className="transition-all duration-300">
        <DetalhesBio bio={palestrante.bio} />
      </div>
    </div>
  );
}
