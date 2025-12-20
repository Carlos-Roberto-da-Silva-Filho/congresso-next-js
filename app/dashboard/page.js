import { db } from "@/lib/firebaseAdmin";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  // 1. Busca os dados reais
  const palestrasSnap = await db.collection("palestras").orderBy("dataHora", "asc").get();
  const usuariosSnap = await db.collection("usuarios").get();

  const palestras = palestrasSnap.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    // Lógica de horário que você já usa no site: "2025-12-17T06:26" -> "06:26"
    horario: doc.data().dataHora ? doc.data().dataHora.split('T')[1] : "--:--"
  }));

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
        <StatCard label="Inscrições no Banco" value={usuariosSnap.size.toString().padStart(2, '0')} color="text-blue-500" />
        <StatCard label="Palestras Cadastradas" value={palestras.length.toString().padStart(2, '0')} color="text-purple-500" />
      </div>

      {/* LISTAGEM ADICIONADA: Agora o gestor vê o que está cadastrado */}
      <div className="p-8 rounded-[2.5rem] border border-white/10 bg-white/5">
        <h2 className="text-xl font-bold uppercase mb-6 text-white italic text-center md:text-left">Cronograma Ativo</h2>
        <div className="grid gap-4">
          {palestras.map((p) => (
            <div key={p.id} className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5 hover:border-blue-600/30 transition-all">
              <div>
                <span className="text-blue-500 font-black text-[10px] uppercase tracking-widest">{p.horario} — {p.local}</span>
                <h3 className="text-white font-bold uppercase text-sm">{p.titulo}</h3>
              </div>
              <p className="text-white/30 text-[10px] font-bold uppercase mt-2 md:mt-0">{p.palestrante || p.palestranteNome}</p>
            </div>
          ))}
          {palestras.length === 0 && <p className="text-white/40 italic text-center">Nenhuma palestra no banco.</p>}
        </div>
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
