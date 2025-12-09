import PalestranteForm from "../create";

async function fetchPalestrante(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/palestrantes`);
  const data = await res.json();
  return data.find((p) => p.id === id);
}

export default async function EditPalestrante({ params }) {
  const data = await fetchPalestrante(params.id);

  return <PalestranteForm existingData={data} />;
}
