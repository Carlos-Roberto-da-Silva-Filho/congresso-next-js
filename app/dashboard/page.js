export default function DashboardPage() {
  return (
    <div className="p-6 min-h-screen max-w-5xl mx-auto space-y-8" style={{ backgroundColor: "var(--background)", color: "var(--text-dashboard)" }}>

      {/* Título principal */}
      <h1 className="text-4xl font-bold mb-4" style={{ color: "var(--text-dashboard)" }}>
        Visão Geral do Sistema
      </h1>

      {/* Boas-vindas */}
      <div className="p-5 rounded-xl border" style={{ backgroundColor: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.2)", color: "var(--text-dashboard)" }}>
        <p>Bem-vindo ao painel administrativo do Congresso.</p>
      </div>

      {/* Cards de status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Status da sessão */}
        <div className="p-6 rounded-xl shadow border" style={{ backgroundColor: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.2)" }}>
          <h3 className="text-sm font-medium mb-2" style={{ color: "var(--text-dashboard-muted)" }}>Status da Sessão</h3>
          <p className="text-2xl font-bold" style={{ color: "var(--text-success)" }}>Ativa & Segura</p>
        </div>

        {/* Palestrantes */}
        <div className="p-6 rounded-xl shadow border" style={{ backgroundColor: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.2)" }}>
          <h3 className="text-sm font-medium mb-2" style={{ color: "var(--text-dashboard-muted)" }}>Palestrantes</h3>
          <p className="text-2xl font-bold" style={{ color: "var(--text-success)" }}>12</p>
        </div>

        {/* Palestras */}
        <div className="p-6 rounded-xl shadow border" style={{ backgroundColor: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.2)" }}>
          <h3 className="text-sm font-medium mb-2" style={{ color: "var(--text-dashboard-muted)" }}>Palestras</h3>
          <p className="text-2xl font-bold" style={{ color: "var(--text-success)" }}>8</p>
        </div>
      </div>

    </div>
  );
}
