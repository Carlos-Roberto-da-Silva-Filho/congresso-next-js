// congresso/app/(site)/palestrantes/page.js
import CardPalestrante from "../components/CardPalestrante";
import { db } from "../../../scripts-admin/firebase-admin";

// ISR: revalidate duas vezes ao dia (~12 horas)
export const revalidate = 43200; // 12h * 60min * 60s

async function fetchPalestrantes() {
  try {
    const snapshot = await db.collection("palestrantes").get();
    const palestrantes = snapshot.docs.map(doc => doc.data());
    return palestrantes;
  } catch (error) {
    console.error("Erro ao buscar palestrantes:", error);
    return [];
  }
}

export default async function PalestrantesPage() {
  const palestrantes = await fetchPalestrantes();

  return (
    <div className="p-6 min-h-screen bg-[var(--background)]">
      <h1 className="text-3xl font-bold text-white mb-6">Palestrantes</h1>

      {palestrantes.length === 0 ? (
        <p className="text-white">Nenhum palestrante encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 justify-center gap-x-4 gap-y-6">
          {palestrantes.map((p) => (
            <CardPalestrante key={p.id} palestrante={p} />
          ))}
        </div>
      )}
    </div>
  );
}
