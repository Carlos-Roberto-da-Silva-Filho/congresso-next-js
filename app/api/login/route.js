import { NextResponse } from "next/server";
import { createSession } from "@/lib/session";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // 1. Troca senha por ID Token (Google Identity Toolkit)
    const apiKey = process.env.FIREBASE_API_KEY;
    const authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

    const res = await fetch(authUrl, {
      method: "POST",
      body: JSON.stringify({ email, password, returnSecureToken: true }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data.error?.message || "Erro de login" },
        { status: 401 }
      );
    }

    // 2. Gera o Cookie de Sessão HTTP-Only seguro via Admin SDK
    await createSession(data.idToken);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
