// /app/api/local-evento/route.js
import { db } from "@/lib/firebaseAdmin";
console.log(db);

export async function GET() {
  const snap = await db.collection("local_evento").limit(1).get();
  if (snap.empty) return new Response(JSON.stringify({}), { status: 200 });

  const local = snap.docs[0].data();
  local.id = snap.docs[0].id;
  return new Response(JSON.stringify(local), { status: 200 });
}

export async function PATCH(req) {
  const data = await req.json();
  const snap = await db.collection("local_evento").limit(1).get();

  if (snap.empty) return new Response("Registro não encontrado", { status: 404 });

  const docRef = snap.docs[0].ref;
  await docRef.update(data);

  const updated = await docRef.get();
  return new Response(JSON.stringify({ id: docRef.id, ...updated.data() }), { status: 200 });
}
