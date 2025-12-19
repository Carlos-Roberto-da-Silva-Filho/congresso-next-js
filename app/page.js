import Header from "./(site)/components/Header";
import Footer from "./(site)/components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <Header />
      
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="inline-block px-4 py-1.5 mb-8 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[3px]">
            Tijucas • 2025 • Brasil
          </div>
          
          <h1 className="text-[34px] leading-[1.1] sm:text-6xl md:text-8xl font-black tracking-tighter italic uppercase mb-8">
            CONECTANDO <br />
            <span className="text-blue-600 not-italic">GRANDES MENTES</span>
          </h1>

          <p className="max-w-xl text-white/40 text-lg md:text-xl leading-relaxed mb-12 font-medium">
            O maior encontro de tecnologia e inovação de Santa Catarina. Três dias de imersão total com os líderes do mercado.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* AJUSTE AQUI: Mudamos de /login para /cadastro */}
            <Link 
              href="/cadastro" 
              className="px-10 py-5 bg-blue-600 rounded-2xl text-[11px] font-black uppercase tracking-[2px] hover:bg-blue-500 transition-all text-center shadow-lg shadow-blue-600/20"
            >
              Garantir minha vaga
            </Link>
            
            <Link 
              href="/palestras" 
              className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl text-[11px] font-black uppercase tracking-[2px] hover:bg-white/10 transition-all text-center"
            >
              Ver Programação
            </Link>
          </div>

          {/* OPCIONAL: Um link discreto para quem já é cadastrado */}
          <div className="mt-8 ml-2">
            <Link href="/login" className="text-[10px] text-white/20 uppercase font-black tracking-widest hover:text-blue-500 transition-colors">
              Já possui inscrição? <span className="text-white/40 underline">Acessar área do congressista</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
