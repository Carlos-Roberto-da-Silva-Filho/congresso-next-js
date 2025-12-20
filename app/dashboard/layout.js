import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";
import { db } from "@/lib/firebaseAdmin";
import AdminNavigation from "@/app/dashboard/components/AdminNavigation"; 

export default async function DashboardLayout({ children }) {
  const session = await verifySession();

  if (!session) redirect('/login');

  const userDoc = await db.collection("usuarios").doc(session.uid).get();
  const userData = userDoc.data();

  // Garante que só admin entra aqui
  if (userData?.role !== 'admin') {
    redirect('/area_usuario');
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-white">
      {/* Passando os dados necessários para o componente */}
      <AdminNavigation user={userData} isAdmin={true} />
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 lg:p-12 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
