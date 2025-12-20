import "server-only";
import admin from "firebase-admin";

if (!admin.apps.length) {
  // Pegamos a chave e limpamos possíveis espaços extras
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // O segredo para Vercel: o replace corrige as quebras de linha da chave
        privateKey: privateKey ? privateKey.replace(/\\n/g, "\n") : undefined,
      }),
    });
    console.log("✅ Firebase Admin inicializado com sucesso.");
  } catch (error) {
    console.error("❌ Erro ao inicializar Firebase Admin:", error.message);
  }
}

// Exportamos o banco de dados (Firestore)
export const db = admin.firestore();

// Exportamos o admin caso precise usar Auth ou outras funções depois
export { admin };
