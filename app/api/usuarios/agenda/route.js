import { db } from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;

    // Proteção: Apenas sessões que começam com "user_" podem salvar agenda
    if (!session || !session.startsWith("user_")) {
      return NextResponse.json({ error: "Sessão inválida para esta operação" }, { status: 401 });
    }

    const userId = session.replace("user_", "");
    const { palestrasIds } = await req.json();

    // Validação básica: palestrasIds deve ser um array
    if (!Array.isArray(palestrasIds)) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    // Atualiza o array no Firestore
    await db.collection("usuarios").doc(userId).update({
      palestrasIds: palestrasIds
    });

    return NextResponse.json({ message: "Agenda atualizada com sucesso!" });

  } catch (error) {
    console.error("Erro em /api/usuarios/agenda:", error);
    return NextResponse.json({ error: "Erro ao salvar agenda" }, { status: 500 });
  }
}
