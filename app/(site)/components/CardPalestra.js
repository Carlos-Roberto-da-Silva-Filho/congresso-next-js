export default function CardPalestra({ palestra }) {
  return (
    <div className="group relative bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 hover:bg-white/[0.06] transition-all duration-500">
      <div className="flex flex-col h-full">
        {/* Horário e Sala */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-500 text-sm">schedule</span>
            <span className="text-lg font-black text-white">{palestra.horario}</span>
          </div>
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-white/40">
            {palestra.sala || "Auditório"}
          </span>
        </div>

        {/* Título com quebra de linha correta para não vazar */}
        <div className="mb-6">
          <h3 className="text-2xl font-black tracking-tighter leading-tight uppercase italic break-words overflow-hidden">
            {palestra.titulo}
          </h3>
          <p className="text-white/40 text-xs font-bold uppercase tracking-[2px] mt-2">
            {palestra.palestrante}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-6 border-t border-white/5">
          <span className="text-[10px] font-black uppercase tracking-[2px] text-blue-500/60">
            # {palestra.categoria || "Geral"}
          </span>
        </div>
      </div>
    </div>
  );
}
