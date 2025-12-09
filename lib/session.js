import "server-only";
import { cookies } from "next/headers";
import { admin } from "./firebaseAdmin";

export async function createSession(idToken) {
  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  const sessionCookie = await admin
    .auth()
    .createSessionCookie(idToken, { expiresIn });

  const cookieStore = await cookies();
  cookieStore.set("session", sessionCookie, {
    maxAge: expiresIn,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}

export async function removeSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export async function verifySession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) return null;

  try {
    const decodeClaims = await admin
      .auth()
      .verifySessionCookie(sessionCookie, true);
    return decodeClaims;
  } catch (error) {
    return null;
  }
}
