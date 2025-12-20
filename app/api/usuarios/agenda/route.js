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

    // Usamos .set com { merge: true } para garantir que grave mesmo se o doc for novo
    await db.collection("usuarios").doc(decodedClaims.uid).set({
      palestrasIds: palestrasIds,
      atualizadoEm: new Date().toISOString()
    }, { merge: true });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao gravar no banco:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
