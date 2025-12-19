import { db } from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";
import { hospedagemSchema } from "@/lib/schemas/hospedagens";

export async function GET() {
  try {
    const snap = await db.collection("hospedagens").orderBy("nome").get();
    const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    
    // Validação Centralizada
    const validation = hospedagemSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ errors: validation.error.format() }, { status: 400 });
    }

    const docRef = await db.collection("hospedagens").add({
      ...validation.data,
      createdAt: new Date().toISOString()
    });
    
    return NextResponse.json({ id: docRef.id }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, ...dataToValidate } = body;

    if (!id) return NextResponse.json({ error: "ID obrigatório" }, { status: 400 });

    // Validação Centralizada
    const validation = hospedagemSchema.safeParse(dataToValidate);
    if (!validation.success) {
      return NextResponse.json({ errors: validation.error.format() }, { status: 400 });
    }

    await db.collection("hospedagens").doc(id).set(validation.data, { merge: true });
    return NextResponse.json({ message: "Atualizado com sucesso" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "ID obrigatório" }, { status: 400 });

    await db.collection("hospedagens").doc(id).delete();
    return NextResponse.json({ message: "Excluído com sucesso" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
