// congresso/app/(site)/palestras/page.js
import CardPalestra from "../components/CardPalestra";
import { db } from "../../../scripts-admin/firebase-admin";

// ISR: revalidate duas vezes ao dia (~12 horas)
export const revalidate = 43200; // 12h * 60min * 60s

// Função para buscar as palestras do Firestore
async function fetchPalestras() {
  try {
    const snapshot = await db.collection("palestras").get();
    const palestras = snapshot.docs.map(doc => doc.data());
    return palestras;
  } catch (error) {
    console.error("Erro ao buscar palestras:", error);
    return [];
  }
}

export default async function PalestrasPage() {
  const palestras = await fetchPalestras();

  return (
    <div className="p-6 min-h-screen bg-[var(--background)] flex flex-col items-center">
      <h1 className="text-3xl font-bold text-white mb-6">Palestras</h1>

      {palestras.length === 0 ? (
        <p className="text-white">Nenhuma palestra encontrada.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3 justify-center">
          {palestras.map((p) => (
            <CardPalestra key={p.id} palestra={p} />
          ))}
        </div>
      )}
    </div>
  );
}
