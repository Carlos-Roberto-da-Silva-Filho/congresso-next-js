import { createSession } from "@/lib/session";
import { NextResponse } from "next/server";
import { admin } from "@/lib/firebaseAdmin";

export async function POST(req) {
  try {
    const { idToken } = await req.json();

    if (!idToken) {
      return NextResponse.json({ error: "Token não fornecido" }, { status: 400 });
    }

    // 1. Cria a sessão segura usando o método que o professor ensinou
    await createSession(idToken);

    // 2. Verifica se é admin para dizer ao frontend para onde ir
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const isAdmin = decodedToken.email === process.env.ADMIN_EMAIL;
    const redirectTo = isAdmin ? "/dashboard" : "/area_usuario";

    return NextResponse.json({ success: true, redirectTo });
  } catch (error) {
    console.error("Erro no servidor de login:", error);
    return NextResponse.json({ error: "Erro na autenticação" }, { status: 401 });
  }
}
