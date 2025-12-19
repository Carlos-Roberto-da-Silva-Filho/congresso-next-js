import { db } from "@/lib/firebaseAdmin";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  // Busca dados reais do banco
  const palestrasSnap = await db.collection("palestras").get();
  const usuariosSnap = await db.collection("usuarios").get();

  const totalPalestras = palestrasSnap.size;
  const totalInscritos = usuariosSnap.size;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">
          Visão Geral <span className="text-blue-600">do Sistema</span>
        </h1>
        <p className="text-sm opacity-50 font-bold uppercase tracking-widest mt-2">Painel de Gestão Administrativa</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Status do Sistema" value="ONLINE" color="text-green-500" />
        <StatCard label="Inscrições no Banco" value={totalInscritos.toString().padStart(2, '0')} color="text-blue-500" />
        <StatCard label="Palestras Cadastradas" value={totalPalestras.toString().padStart(2, '0')} color="text-purple-500" />
      </div>

      <div className="p-10 rounded-[2.5rem] border border-white/10 bg-white/5 shadow-2xl">
        <h2 className="text-xl font-bold uppercase mb-4 text-white">Bem-vindo, Gestor</h2>
        <p className="text-white/60 leading-relaxed">
          O sistema está sincronizado com o Firestore. Atualmente existem {totalPalestras} palestras e {totalInscritos} usuários registrados no banco de dados.
        </p>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className="p-8 rounded-[2rem] border border-white/5 bg-white/5 shadow-inner">
      <h3 className="text-[10px] font-black uppercase tracking-[3px] opacity-40 mb-3 text-white">{label}</h3>
      <p className={`text-4xl font-black italic ${color}`}>{value}</p>
    </div>
  );
}
