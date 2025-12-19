import { db } from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";
import { palestraSchema } from "@/lib/schemas/palestras";

export async function GET() {
  try {
    const snap = await db.collection("palestras").orderBy("horario").get();
    const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    
    // Validação Zod
    const validation = palestraSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ errors: validation.error.format() }, { status: 400 });
    }

    const docRef = await db.collection("palestras").add({
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

    const validation = palestraSchema.safeParse(dataToValidate);
    if (!validation.success) {
      return NextResponse.json({ errors: validation.error.format() }, { status: 400 });
    }

    await db.collection("palestras").doc(id).set(validation.data, { merge: true });
    return NextResponse.json({ message: "Atualizado com sucesso" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    await db.collection("palestras").doc(id).delete();
    return NextResponse.json({ message: "Removido" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
