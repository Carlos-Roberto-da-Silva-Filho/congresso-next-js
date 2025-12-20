import { db } from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";
// Certifique-se de criar este schema ou remover a validação se não for usar Zod agora
// import { palestraSchema } from "@/lib/schemas/palestras";

export async function GET() {
  try {
    // Ordenamos por dataHora para que o dashboard já venha na ordem do evento
    const snapshot = await db.collection("palestras").orderBy("dataHora", "asc").get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro GET Palestras:", error);
    return NextResponse.json({ error: "Erro ao buscar palestras" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    /* Se você tiver o schema Zod:
       const validation = palestraSchema.safeParse(body);
       if (!validation.success) {
         return NextResponse.json({ errors: validation.error.format() }, { status: 400 });
       }
       const dataToSave = validation.data;
    */

    // Enquanto não houver schema, usamos o body diretamente:
    const dataToSave = {
      titulo: body.titulo,
      descricao: body.descricao,
      dataHora: body.dataHora,
      local: body.local,
      palestranteId: body.palestranteId,
    };

    const docRef = await db.collection("palestras").add({
      ...dataToSave,
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
    const { id, ...data } = body;

    if (!id) return NextResponse.json({ error: "ID obrigatório" }, { status: 400 });

    /* Validação opcional com Zod:
       const validation = palestraSchema.safeParse(data);
       if (!validation.success) {
         return NextResponse.json({ errors: validation.error.format() }, { status: 400 });
       }
    */

    await db.collection("palestras").doc(id).set(data, { merge: true });
    return NextResponse.json({ message: "Palestra atualizada com sucesso" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    
    if (!id) return NextResponse.json({ error: "ID obrigatório" }, { status: 400 });

    await db.collection("palestras").doc(id).delete();
    return NextResponse.json({ message: "Palestra removida com sucesso" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
