// congresso/app/(site)/palestras/page.js
import CardPalestra from "../components/CardPalestra";
import palestrasMock from "../../../scripts-admin/palestras-mock.json";

export const revalidate = 300;

export default function PalestrasPage() {
  return (
    <div className="p-6 min-h-screen bg-[var(--background)] flex flex-col items-center">
      <h1 className="text-3xl font-bold text-white mb-6">Palestras</h1>

      {palestrasMock.length === 0 ? (
        <p className="text-white">Nenhuma palestra encontrada.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3 justify-center">
          {palestrasMock.map((p) => (
            <CardPalestra key={p.id} palestra={p} />
          ))}
        </div>
      )}
    </div>
  );
}
