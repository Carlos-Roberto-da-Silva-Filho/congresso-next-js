import PalestraForm from "../create";

async function fetchPalestra(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/palestras`);
  const data = await res.json();
  return data.find((p) => p.id === id);
}

export default async function EditPalestra({ params }) {
  const data = await fetchPalestra(params.id);

  return <PalestraForm existingData={data} />;
}
