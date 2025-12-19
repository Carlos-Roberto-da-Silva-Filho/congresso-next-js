export default function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-[#050505] py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <div className="text-white font-black tracking-tighter text-lg mb-2">
              CONGRESSO<span className="text-blue-500">2025</span>
            </div>
            <p className="text-[10px] uppercase tracking-[3px] text-white/20">
              Inovação & Conhecimento
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-sm text-white/40">
              © {new Date().getFullYear()} — Todos os direitos reservados.
            </p>
            <p className="text-[10px] text-white/10 uppercase tracking-widest font-bold">
              Projeto Acadêmico • Next.js + Tailwind + Firebase
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
