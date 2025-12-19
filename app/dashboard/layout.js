import { verifySession } from "@/lib/session";
import AdminNavigation from "./components/AdminNavigation";

export default async function DashboardLayout({ children }) {
  // O Middleware já garantiu que há um cookie, aqui apenas pegamos os dados do usuário
  const user = await verifySession();

  // Se por algum erro extremo o verifySession falhar (ex: banco fora do ar), 
  // evitamos o loop retornando apenas uma mensagem limpa
  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Sessão inválida. Por favor, faça <a href="/login" className="text-blue-500 ml-1">login novamente</a>.
      </div>
    );
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const isAdmin = user.email === adminEmail;

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* O menu fica aqui, renderizado UMA ÚNICA VEZ para todas as sub-páginas */}
      <AdminNavigation user={user} isAdmin={isAdmin} />
      
      <main className="p-6 md:p-12 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}
