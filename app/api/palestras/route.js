// app/api/palestras/route.js
import { db } from "@/lib/firebaseAdmin";

export async function GET() {
  try {
    const snapshot = await db.collection("palestras").get();
    const data = [];

    for (const doc of snapshot.docs) {
      const palestra = doc.data();
      // buscar o nome do palestrante para exibir na listagem
      let palestranteNome = "";
      if (palestra.palestranteId) {
        const pDoc = await db.collection("palestrantes").doc(palestra.palestranteId).get();
        if (pDoc.exists) palestranteNome = pDoc.data().nome;
      }

      data.push({ id: doc.id, ...palestra, palestranteNome });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const docRef = db.collection("palestras").doc();
    await docRef.set(body);
    return new Response(JSON.stringify({ id: docRef.id }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    if (!body.id) throw new Error("ID é obrigatório para PUT");

    await db.collection("palestras").doc(body.id).set(body);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const body = await req.json();
    if (!body.id) throw new Error("ID é obrigatório para PATCH");

    await db.collection("palestras").doc(body.id).update(body);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const body = await req.json();
    if (!body.id) throw new Error("ID é obrigatório para DELETE");

    await db.collection("palestras").doc(body.id).delete();
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
