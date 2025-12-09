// app/api/palestrantes/route.js
import { db } from "@/lib/firebaseAdmin";

/**
 * GET - Lista todos os palestrantes
 */
export async function GET() {
  const snapshot = await db.collection("palestrantes").get();
  const palestrantes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return new Response(JSON.stringify(palestrantes), { status: 200 });
}

/**
 * POST - Cria um novo palestrante
 */
export async function POST(req) {
  const body = await req.json();
  const docRef = db.collection("palestrantes").doc();
  await docRef.set(body);
  return new Response(JSON.stringify({ id: docRef.id }), { status: 201 });
}

/**
 * PUT - Atualiza o palestrante inteiro (substituição completa)
 */
export async function PUT(req) {
  const body = await req.json();
  const { id, ...data } = body;
  if (!id) return new Response("ID não informado", { status: 400 });

  await db.collection("palestrantes").doc(id).set(data, { merge: false });
  return new Response("Atualizado com sucesso", { status: 200 });
}

/**
 * PATCH - Atualização parcial do palestrante
 */
export async function PATCH(req) {
  const body = await req.json();
  const { id, ...data } = body;
  if (!id) return new Response("ID não informado", { status: 400 });

  await db.collection("palestrantes").doc(id).update(data);
  return new Response("Atualização parcial realizada com sucesso", { status: 200 });
}

/**
 * DELETE - Remove o palestrante
 */
export async function DELETE(req) {
  const body = await req.json();
  const { id } = body;
  if (!id) return new Response("ID não informado", { status: 400 });

  await db.collection("palestrantes").doc(id).delete();
  return new Response("Deletado com sucesso", { status: 200 });
}
