import PalestranteForm from "../create";
import { db } from "@/lib/firebaseAdmin";

async function fetchPalestranteById(id) {
  if (!id) return null;

  const doc = await db.collection("palestrantes").doc(id).get();

  if (!doc.exists) return null;

  return { id: doc.id, ...doc.data() };
}

export default async function EditPalestrante({ params }) {
  const { id } = await params; // ✅ ISSO É O QUE FALTAVA
  const data = await fetchPalestranteById(id);

  return <PalestranteForm existingData={data} />;
}
