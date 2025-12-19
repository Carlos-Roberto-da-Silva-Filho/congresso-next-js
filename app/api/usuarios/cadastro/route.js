import { admin, db } from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";
import { usuarioSchema } from "@/lib/schemas/usuarioSchema";

export async function POST(req) {
  try {
    const body = await req.json();
    const validacao = usuarioSchema.safeParse(body);

    if (!validacao.success) {
      return NextResponse.json({ error: validacao.error.errors[0].message }, { status: 400 });
    }

    const { nome, email, password, telefone, empresa } = validacao.data;

    // 1. Criar no Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email: email.toLowerCase(),
      password: password,
      displayName: nome,
    });

    // 2. Criar no Firestore usando o UID retornado pelo Auth
    await db.collection("usuarios").doc(userRecord.uid).set({
      nome,
      email: email.toLowerCase(),
      telefone,
      empresa,
      role: "user", // Padrão para congressistas
      palestrasIds: [],
      createdAt: new Date().toISOString()
    });

    return NextResponse.json({ message: "Usuário criado com sucesso!" }, { status: 201 });

  } catch (error) {
    console.error("Erro no cadastro:", error);
    // Trata erro de e-mail já existente no Auth
    if (error.code === 'auth/email-already-exists') {
      return NextResponse.json({ error: "Este e-mail já está em uso." }, { status: 400 });
    }
    return NextResponse.json({ error: "Erro interno ao cadastrar." }, { status: 500 });
  }
}
