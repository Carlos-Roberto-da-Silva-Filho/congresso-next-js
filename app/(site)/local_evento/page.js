'use client';

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function LocalEventoPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="pt-40 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[3px]">
            Como chegar
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-6 uppercase italic">
            O LOCAL DO <span className="text-blue-600 not-italic">EVENTO</span>
          </h1>
          <p className="max-w-2xl text-white/40 text-lg leading-relaxed font-bold uppercase tracking-tight">
            Nos encontraremos na bela cidade de <span className="text-white">Tijucas</span>, em Santa Catarina.
          </p>
        </div>
      </section>

      {/* Grid de Conteúdo */}
      <section className="max-w-6xl mx-auto px-6 pb-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* --- CARD DA IMAGEM (Visual Moderno) --- */}
          <div className="relative group">
            <div className="aspect-square w-full bg-white/5 rounded-[3rem] border border-white/10 relative overflow-hidden shadow-2xl shadow-blue-900/10">
              <img 
                src="/images/tijucas.png" 
                alt="Vista de Tijucas, Santa Catarina"
                className="absolute inset-0 w-full h-full object-cover opacity-60 brightness-75 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
              />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12 z-10 bg-gradient-to-t from-black via-transparent to-transparent">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                  <span className="material-symbols-outlined text-white text-3xl">location_on</span>
                </div>
                <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-1">Tijucas / SC</h3>
                <p className="text-white/60 text-sm font-black uppercase tracking-[3px]">Santa Catarina, Brasil</p>
              </div>
            </div>
            {/* Elemento decorativo atrás */}
            <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full border border-blue-600/20 rounded-[3rem]"></div>
          </div>

          {/* --- INFRAESTRUTURA & INFOS --- */}
          <div className="space-y-12 py-4">
            <div>
              <h3 className="text-2xl font-black tracking-tighter uppercase mb-8 italic text-blue-500">
                Infraestrutura & Acesso
              </h3>
              
              <ul className="space-y-8">
                <li className="flex items-start gap-5">
                  <div className="p-3 bg-white/5 border border-white/10 rounded-2xl">
                    <span className="material-symbols-outlined text-blue-500">flight_land</span>
                  </div>
                  <div>
                    <strong className="block text-white uppercase font-black italic tracking-tight text-lg leading-none mb-1">Aeroportos Próximos</strong>
                    <span className="text-white/40 text-sm leading-relaxed">Fácil acesso via Aeroporto de Florianópolis (FLN) ou Navegantes (NVT).</span>
                  </div>
                </li>

                <li className="flex items-start gap-5">
                  <div className="p-3 bg-white/5 border border-white/10 rounded-2xl">
                    <span className="material-symbols-outlined text-blue-500">directions_car</span>
                  </div>
                  <div>
                    <strong className="block text-white uppercase font-black italic tracking-tight text-lg leading-none mb-1">Rodovia BR-101</strong>
                    <span className="text-white/40 text-sm leading-relaxed">Localização estratégica com acesso duplicado pela principal rodovia do litoral.</span>
                  </div>
                </li>

                <li className="flex items-start gap-5">
                  <div className="p-3 bg-white/5 border border-white/10 rounded-2xl">
                    <span className="material-symbols-outlined text-blue-500">wifi_tethering</span>
                  </div>
                  <div>
                    <strong className="block text-white uppercase font-black italic tracking-tight text-lg leading-none mb-1">Conectividade Total</strong>
                    <span className="text-white/40 text-sm leading-relaxed">O centro de eventos conta com infraestrutura de rede de última geração.</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Dica Local (Estilo Glassmorphism) */}
            <div className="p-8 bg-blue-600/5 border border-blue-600/20 rounded-[2.5rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 -mt-8 -mr-8 text-blue-600/10 text-9xl font-black italic z-0 pointer-events-none">SC</div>
              <div className="relative z-10">
                <h4 className="text-lg font-black uppercase italic tracking-widest mb-3 text-blue-400">Dica Local</h4>
                <p className="text-sm leading-relaxed text-white/60 font-medium">
                  Aproveite para conhecer a gastronomia local e as belas praias da região da <span className="text-white">Costa Esmeralda</span> nos momentos livres do congresso.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}