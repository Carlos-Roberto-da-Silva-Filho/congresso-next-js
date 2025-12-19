import { db } from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";
import { palestranteSchema } from "@/lib/schemas/palestrantes";

export async function GET() {
  try {
    const snapshot = await db.collection("palestrantes").orderBy("nome").get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const validation = palestranteSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ errors: validation.error.format() }, { status: 400 });
    }

    const docRef = await db.collection("palestrantes").add({
      ...validation.data,
      createdAt: new Date().toISOString()
    });

    return NextResponse.json({ id: docRef.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, ...dataToValidate } = body;

    if (!id) return NextResponse.json({ error: "ID obrigatório" }, { status: 400 });

    const validation = palestranteSchema.safeParse(dataToValidate);
    if (!validation.success) {
      return NextResponse.json({ errors: validation.error.format() }, { status: 400 });
    }

    await db.collection("palestrantes").doc(id).set(validation.data, { merge: true });
    return NextResponse.json({ message: "Atualizado" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    await db.collection("palestrantes").doc(id).delete();
    return NextResponse.json({ message: "Removido" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
