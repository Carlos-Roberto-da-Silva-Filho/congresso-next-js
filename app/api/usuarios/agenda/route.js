import { db } from "@/lib/firebaseAdmin";
import { verifySession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // 1. Valida a sessão do congressista
    const decodedClaims = await verifySession();
    if (!decodedClaims) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { palestrasIds } = await req.json();

    if (!Array.isArray(palestrasIds)) {
      return NextResponse.json({ error: "Formato de dados inválido" }, { status: 400 });
    }

    // 2. Atualiza o array de IDs dentro do documento do usuário
    // Usamos o UID que vem do token da sessão
    await db.collection("usuarios").doc(decodedClaims.uid).update({
      palestrasIds: palestrasIds,
      ultimaAtualizacao: new Date().toISOString()
    });

    return NextResponse.json({ 
      success: true, 
      message: "Agenda sincronizada com sucesso!" 
    });

  } catch (error) {
    console.error("ERRO CRÍTICO NA AGENDA:", error);
    return NextResponse.json({ 
      error: "Erro ao salvar agenda", 
      details: error.message 
    }, { status: 500 });
  }
}
