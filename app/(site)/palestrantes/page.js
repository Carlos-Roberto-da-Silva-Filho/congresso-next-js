import Header from "../components/Header";
import CardPalestrante from "../components/CardPalestrante";
import Footer from "../components/Footer";
import { db } from "@/lib/firebaseAdmin";

export const revalidate = 64800; // 18h

async function fetchPalestrantes() {
  try {
    const snapshot = await db.collection("palestrantes").get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Erro ao buscar palestrantes:", error);
    return [];
  }
}

export default async function PalestrantesPage() {
  const palestrantes = await fetchPalestrantes();

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* O Header agora garante que o menu fique no mesmo lugar que na página de palestras */}
      <Header />

      <section className="pt-40 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[3px]">
            Speakers 2025
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6 italic uppercase">
            NOSSOS <span className="text-blue-600">PALESTRANTES</span>
          </h1>
          <p className="max-w-2xl text-white/40 text-lg leading-relaxed">
            Conheça os líderes e inovadores que estão moldando o futuro da tecnologia.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-32">
        {palestrantes.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-white/10 rounded-[2.5rem]">
            <p className="text-white/20 font-medium tracking-widest uppercase text-xs">Aguardando confirmação dos palestrantes...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {palestrantes.map((p) => (
              <CardPalestrante key={p.id} palestrante={p} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
