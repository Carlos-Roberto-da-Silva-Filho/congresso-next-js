import { db } from "@/lib/firebaseAdmin";
import { verifySession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 1. Usa o método seguro que descriptografa o cookie do Firebase
    const decodedClaims = await verifySession();

    if (!decodedClaims) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    // 2. O UID do Firebase Auth agora é a chave para buscar no Firestore
    // Note: Certifique-se que o ID do documento no Firestore seja o mesmo UID do Auth
    const userDoc = await db.collection("usuarios").doc(decodedClaims.uid).get();

    if (!userDoc.exists) {
      return NextResponse.json({ error: "Dados do usuário não encontrados" }, { status: 404 });
    }

    // 3. Busca palestras para a programação
    const palestrasSnap = await db.collection("palestras").get();
    const palestras = palestrasSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ 
      user: { id: userDoc.id, ...userDoc.data() },
      palestras 
    });

  } catch (error) {
    console.error("Erro na API /me:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
