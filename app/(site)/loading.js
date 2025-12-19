export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]">
      {/* Logo Pulsante */}
      <div className="relative mb-8">
        <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center animate-pulse shadow-[0_0_50px_rgba(37,99,235,0.3)]">
          <span className="text-white font-black text-4xl">C</span>
        </div>
        {/* Anel de Rotação em volta da logo */}
        <div className="absolute -inset-4 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
      </div>

      {/* Texto de Status */}
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-white font-bold tracking-widest uppercase text-xs">
          Sincronizando Dados
        </h2>
        <div className="flex gap-1">
          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></span>
        </div>
      </div>

      {/* Frase de efeito (opcional) */}
      <p className="absolute bottom-12 text-white/20 text-[10px] uppercase tracking-[4px] font-medium">
        Congresso Acadêmico 2025
      </p>
    </div>
  );
}
