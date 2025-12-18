import PalestraForm from "../create";
import { db } from "@/lib/firebaseAdmin";

async function fetchPalestraById(id) {
  if (!id) return null;

  const doc = await db.collection("palestras").doc(id).get();

  if (!doc.exists) return null;

  return {
    id: doc.id,
    ...doc.data(),
  };
}

export default async function EditPalestra({ params }) {
  // 🔥 AQUI ESTÁ A CORREÇÃO REAL
  const { id } = await params;

  const data = await fetchPalestraById(id);

  return <PalestraForm existingData={data} />;
}
