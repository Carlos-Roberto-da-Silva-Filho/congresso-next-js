import CardPalestrante from "../components/CardPalestrante";
import palestrantesMock from "../../../scripts-admin/palestrantes-mock.json";

// ISR: revalidate a cada 300 segundos (5 minutos)
export const revalidate = 300;

/**
 * Busca os palestrantes usando mock JSON
 */
async function fetchPalestrantes() {
  return palestrantesMock;
}

export default async function PalestrantesPage() {
  const palestrantes = await fetchPalestrantes();

  return (
    <div className="p-6 min-h-screen bg-[var(--background)] flex flex-col items-center">
      <h1 className="text-3xl font-bold text-white mb-6">Palestrantes</h1>

      {palestrantes.length === 0 ? (
        <p className="text-white">Nenhum palestrante encontrado.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3 justify-center">
          {palestrantes.map((p) => (
            <CardPalestrante key={p.id} palestrante={p} />
          ))}
        </div>
      )}
    </div>
  );
}
