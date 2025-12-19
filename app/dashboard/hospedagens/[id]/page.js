import HospedagemForm from "../create";
import { db } from "@/lib/firebaseAdmin";

export default async function HospedagemPage({ params }) {
  const { id } = await params;

  // 1. Verificamos se a intenção é criar um novo
  if (id === "create") {
    return <HospedagemForm />; 
  }

  // 2. Se não for "create", buscamos no banco para editar
  const doc = await db.collection("hospedagens").doc(id).get();
  
  if (!doc.exists) {
    return <div className="p-6 text-white">Hospedagem não encontrada.</div>;
  }

  const data = { id: doc.id, ...doc.data() };

  return <HospedagemForm existingData={data} />;
}

