import Header from "../components/Header";
import Footer from "../components/Footer";

export default function LocalEventoPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Header />

      <section className="pt-40 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[3px]">
            Como chegar
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6 uppercase italic">
            O LOCAL DO <span className="text-blue-600 text-not-italic">EVENTO</span>
          </h1>
          <p className="max-w-2xl text-white/40 text-lg leading-relaxed">
            Nos encontraremos na bela cidade de Tijucas, em Santa Catarina.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* --- ÁREA DA IMAGEM (Ajustada) --- */}
          <div className="aspect-video lg:aspect-square w-full bg-white/5 rounded-[3rem] border border-white/10 relative overflow-hidden group">
            {/* 1. A imagem local deve estar em: public/images/tijucas.png 
               2. Usamos object-cover para preencher o quadrado sem distorcer.
               3. Adicionei uma opacidade e um filtro de brilho (brightness) para o texto ficar legível.
            */}
            <img 
              src="/images/tijucas.png" 
              alt="Vista de Tijucas, Santa Catarina"
              className="absolute inset-0 w-full h-full object-cover opacity-60 brightness-75 group-hover:opacity-80 group-hover:brightness-90 transition-all duration-700 group-hover:scale-105"
            />
            
            {/* Overlay com as informações de texto por cima da imagem */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12 z-10 bg-gradient-to-t from-black/60 via-transparent to-transparent">
              <span className="material-symbols-outlined text-6xl text-blue-500 mb-4 animate-bounce drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">location_on</span>
              <h3 className="text-3xl font-black mb-2 drop-shadow-lg">Tijucas / SC</h3>
              <p className="text-white/80 text-lg font-medium drop-shadow-md">Brasil</p>
              {/* Você pode adicionar o endereço específico aqui se tiver */}
              {/* <p className="text-white/60 text-sm mt-4">Rua do Evento, 123 - Centro</p> */}
            </div>
          </div>
          {/* ---------------------------------- */}

          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-black tracking-tighter uppercase mb-6 text-blue-400">Infraestrutura & Acesso</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4 text-white/70 leading-relaxed">
                  <div className="p-2 bg-blue-600/10 rounded-lg mt-1">
                    <span className="material-symbols-outlined text-blue-500 text-sm">flight_land</span>
                  </div>
                  <div>
                    <strong className="block text-white">Aeroportos Próximos</strong>
                    Fácil acesso via Aeroporto de Florianópolis (FLN) ou Navegantes (NVT).
                  </div>
                </li>
                <li className="flex items-start gap-4 text-white/70 leading-relaxed">
                  <div className="p-2 bg-blue-600/10 rounded-lg mt-1">
                    <span className="material-symbols-outlined text-blue-500 text-sm">directions_car</span>
                  </div>
                  <div>
                    <strong className="block text-white">Rodovia BR-101</strong>
                    Localização estratégica com acesso duplicado pela principal rodovia do litoral.
                  </div>
                </li>
                <li className="flex items-start gap-4 text-white/70 leading-relaxed">
                  <div className="p-2 bg-blue-600/10 rounded-lg mt-1">
                    <span className="material-symbols-outlined text-blue-500 text-sm">wifi_tethering</span>
                  </div>
                  <div>
                    <strong className="block text-white">Conectividade Total</strong>
                    O centro de eventos conta com infraestrutura de rede de última geração.
                  </div>
                </li>
              </ul>
            </div>

            <div className="p-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-[2rem] shadow-2xl shadow-blue-900/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 text-blue-500/20 text-9xl font-black z-0">SC</div>
              <h4 className="text-xl font-black uppercase tracking-widest mb-4 relative z-10">Dica Local</h4>
              <p className="text-sm leading-relaxed text-white/90 relative z-10">
                Aproveite para conhecer a gastronomia local e as belas praias da região da Costa Esmeralda nos momentos livres do congresso.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
