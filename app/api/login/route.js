import { createSession } from "@/lib/session";
import { NextResponse } from "next/server";
import { admin, db } from "@/lib/firebaseAdmin";

export async function POST(req) {
  try {
    const { idToken } = await req.json();
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    const userDoc = await db.collection("usuarios").doc(uid).get();
    
    if (!userDoc.exists) {
      return NextResponse.json({ error: "Perfil não encontrado." }, { status: 404 });
    }

    const userData = userDoc.data();
    await createSession(idToken);

    const isAdmin = userData.role === "admin";
    const redirectTo = isAdmin ? "/dashboard" : "/area_usuario";

    return NextResponse.json({ success: true, redirectTo });
  } catch (error) {
    return NextResponse.json({ error: "Erro na autenticação" }, { status: 401 });
  }
}
