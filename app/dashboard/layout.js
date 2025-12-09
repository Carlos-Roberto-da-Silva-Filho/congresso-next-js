import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";
import AdminNavigation from "./components/AdminNavigation";

export default async function DashboardLayout({ children }) {
  const user = await verifySession();
  if (!user) redirect("/login");
  
  return (
    <div className="min-h-screen bg-dashboard-bg">
      <AdminNavigation user={user} />
      <main className="p-8">{children}</main>
    </div>
  );
}
