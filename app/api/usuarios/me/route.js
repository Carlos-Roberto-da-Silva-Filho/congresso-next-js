import { db } from "@/lib/firebaseAdmin";
import { verifySession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const decodedClaims = await verifySession();
    if (!decodedClaims) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const userDoc = await db.collection("usuarios").doc(decodedClaims.uid).get();
    if (!userDoc.exists) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    const palestrasSnap = await db.collection("palestras").get();
    const palestras = palestrasSnap.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // Garante que o front sempre tenha o campo 'horario' vindo do 'dataHora'
        horario: data.horario || (data.dataHora ? data.dataHora.split('T')[1].substring(0, 5) : "00:00")
      };
    });

    return NextResponse.json({ 
      user: { id: userDoc.id, ...userDoc.data() },
      palestras 
    });

  } catch (error) {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
