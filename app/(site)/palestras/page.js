import Header from "../components/Header";
import CardPalestra from "../components/CardPalestra";
import Footer from "../components/Footer";
import { db } from "@/lib/firebaseAdmin";

// ISR: Revalida a cada 18 horas
export const revalidate = 64800;

async function getPalestras() {
  try {
    // Ordenação direta pelo campo dataHora (ISO String)
    const snapshot = await db.collection("palestras")
      .orderBy("dataHora", "asc")
      .get();

    return snapshot.docs.map(doc => {
      const dados = doc.data();
      
      // Extraímos apenas a hora (HH:mm) da string ISO para o Card exibir
      // "2025-12-17T06:26" -> split('T')[1] vira "06:26"
      const horarioFormatado = dados.dataHora ? dados.dataHora.split('T')[1] : "--:--";

      return {
        id: doc.id,
        ...dados,
        horario: horarioFormatado // Passamos formatado para o componente visual
      };
    });
  } catch (error) {
    console.error("Erro ao buscar palestras (dataHora):", error);
    return [];
  }
}

export default async function PalestrasPage() {
  const palestras = await getPalestras();

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
      <Header />

      <section className="pt-40 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[3px]">
            Cronograma Oficial
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6">
            AGENDA DE <span className="text-blue-600">DEZEMBRO</span>
          </h1>
          <p className="max-w-2xl text-white/40 text-lg leading-relaxed">
            Palestras organizadas cronologicamente para você não perder nenhum detalhe do congresso.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-32">
        {palestras.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 border border-dashed border-white/10 rounded-[3rem] bg-white/[0.02]">
            <span className="material-symbols-outlined text-6xl text-white/5 mb-4 font-light">calendar_today</span>
            <p className="text-white/20 font-bold uppercase tracking-[4px] text-xs">Nenhum evento agendado</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {palestras.map((p) => (
              <CardPalestra key={p.id} palestra={p} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
