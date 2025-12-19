import Header from "../components/Header";
import Footer from "../components/Footer";

export default function HospedagensPage() {
  const hoteis = [
    {
      nome: "Grand Hotel Central",
      distancia: "500m do evento",
      preco: "R$ 450,00",
      telefone: "(48) 99999-0001",
      imagem: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"
    },
    {
      nome: "Pousada da Inovação",
      distancia: "1.2km do evento",
      preco: "R$ 280,00",
      telefone: "(48) 99999-0002",
      imagem: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800"
    },
    {
      nome: "Tech Loft Shared",
      distancia: "2km do evento",
      preco: "R$ 150,00",
      telefone: "(48) 99999-0003",
      imagem: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"
    }
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Header />
      
      <section className="pt-40 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[3px]">
            Hospedagem
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6 italic uppercase">
            ONDE <span className="text-blue-600 not-italic">FICAR</span>
          </h1>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {hoteis.map((hotel, index) => (
            <div key={index} className="group bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden hover:bg-white/[0.08] transition-all duration-500">
              <div className="relative h-56 w-full overflow-hidden bg-blue-900/20"> 
                <img src={hotel.imagem} alt={hotel.nome} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>

              <div className="p-8">
                <h3 className="text-xl font-bold tracking-tight mb-1">{hotel.nome}</h3>
                <p className="text-xs text-blue-400 font-bold uppercase tracking-widest mb-6">
                  {hotel.distancia}
                </p>
                
                <div className="flex flex-col gap-2 border-t border-white/5 pt-6">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase text-white/30 font-bold tracking-tighter">Diária</span>
                      <span className="text-lg font-black text-white">{hotel.preco}</span>
                    </div>
                    
                    {/* Telefone em verdinho como solicitado */}
                    <div className="flex flex-col items-end">
                      <span className="text-[9px] uppercase text-emerald-500/50 font-black tracking-widest mb-1">Contato</span>
                      <span className="text-emerald-400 font-mono font-bold text-sm">
                        {hotel.telefone}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
