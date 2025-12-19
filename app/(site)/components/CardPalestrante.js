// app/(site)/components/CardPalestrante.js
import Image from "next/image";
import DetalhesBio from "./DetalhesBio";

export default function CardPalestrante({ palestrante }) {
  return (
    <div className="group flex flex-col p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] hover:bg-white/[0.07] transition-all duration-500">
      
      {/* Container da Imagem com Aspect Ratio */}
      <div className="relative w-full aspect-square mb-6 rounded-[1.5rem] overflow-hidden border border-white/5">
        <Image
          src={palestrante.fotoURL || "/images/palestrantes/default.png"}
          alt={palestrante.nome}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
          sizes="(max-w-768px) 100vw, 300px"
        />
        {/* Overlay Gradiente na imagem */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Identificação */}
      <div className="px-2">
        <h3 className="text-2xl font-black tracking-tighter text-white group-hover:text-blue-400 transition-colors">
          {palestrante.nome}
        </h3>
        <p className="text-sm font-bold text-emerald-400/80 uppercase tracking-widest mb-4">
          {palestrante.especialidade}
        </p>

        {/* Componente de Bio Interativo */}
        <div className="mt-2 py-3 border-t border-white/10">
          <DetalhesBio bio={palestrante.bio} />
        </div>
      </div>
    </div>
  );
}
