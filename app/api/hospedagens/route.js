// /app/api/hospedagens/route.js
import { db } from "@/lib/firebaseAdmin";
console.log(db);

export async function GET() {
  const snap = await db.collection("hospedagens").get();
  const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return new Response(JSON.stringify(data), { status: 200 });
}

export async function POST(req) {
  const data = await req.json();
  const docRef = await db.collection("hospedagens").add(data);
  return new Response(JSON.stringify({ id: docRef.id, ...data }), { status: 201 });
}

export async function PUT(req) {
  const data = await req.json();
  if (!data.id) return new Response("ID obrigatório", { status: 400 });

  await db.collection("hospedagens").doc(data.id).set(data);
  return new Response(JSON.stringify(data), { status: 200 });
}

export async function PATCH(req) {
  const data = await req.json();
  if (!data.id) return new Response("ID obrigatório", { status: 400 });

  const docRef = db.collection("hospedagens").doc(data.id);
  await docRef.update(data);
  const updated = await docRef.get();
  return new Response(JSON.stringify({ id: docRef.id, ...updated.data() }), { status: 200 });
}

export async function DELETE(req) {
  const { id } = await req.json();
  if (!id) return new Response("ID obrigatório", { status: 400 });

  await db.collection("hospedagens").doc(id).delete();
  return new Response("Deletado com sucesso", { status: 200 });
}
