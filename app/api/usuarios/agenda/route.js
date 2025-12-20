import { db } from "@/lib/firebaseAdmin";
import { verifySession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const decodedClaims = await verifySession();
    if (!decodedClaims) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { palestrasIds } = await req.json();

    if (!Array.isArray(palestrasIds)) {
      return NextResponse.json({ error: "Formato de dados inválido" }, { status: 400 });
    }

    // Atualiza o documento do Pedro usando o UID da sessão
    await db.collection("usuarios").doc(decodedClaims.uid).update({
      palestrasIds: palestrasIds
    });

    return NextResponse.json({ message: "Agenda sincronizada com sucesso!" });
  } catch (error) {
    console.error("Erro ao salvar agenda:", error);
    return NextResponse.json({ error: "Erro ao salvar agenda" }, { status: 500 });
  }
}
