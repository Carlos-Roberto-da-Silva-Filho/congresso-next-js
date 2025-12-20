'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AreaUsuario() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('programacao'); 
  const [userData, setUserData] = useState(null);
  const [allPalestras, setAllPalestras] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      // O 'no-store' impede que a Vercel mostre dados antigos do cache
      const res = await fetch('/api/usuarios/me', { cache: 'no-store' });
      if (!res.ok) throw new Error('Sessão expirada');
      const data = await res.json();
      
      setUserData(data.user);
      setAllPalestras(data.palestras || []);
      setSelectedIds(data.user.palestrasIds || []);
    } catch (error) {
      router.push('/login');
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await fetch('/api/logout', { method: 'POST' });
    router.refresh(); 
    router.push('/login');
  }

  async function togglePalestra(palestra) {
    if (isSaving) return; // Evita cliques múltiplos simultâneos

    let newSelection = [...selectedIds];
    const horarioAtual = palestra.horario;

    if (selectedIds.includes(palestra.id)) {
      newSelection = newSelection.filter(id => id !== palestra.id);
    } else {
      const conflito = allPalestras.find(p => 
        selectedIds.includes(p.id) && p.horario === horarioAtual
      );

      if (conflito) {
        alert(`Conflito: Você já tem uma atividade marcada para às ${horarioAtual}h.`);
        return;
      }
      newSelection.push(palestra.id);
    }

    // 1. Atualiza interface imediatamente (Otimista)
    setSelectedIds(newSelection);
    setIsSaving(true);

    // 2. Sincroniza com o banco
    try {
      const res = await fetch('/api/usuarios/agenda', {
        method: 'POST',
        body: JSON.stringify({ palestrasIds: newSelection }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (!res.ok) {
        alert("Erro ao salvar no banco. Tente novamente.");
        fetchData(); // Reverte para o estado real do banco se falhar
      } else {
        // Limpa o cache do servidor Next.js
        router.refresh();
      }
    } catch (error) {
      console.error("Erro de conexão");
      fetchData();
    } finally {
      setIsSaving(false);
    }
  }

  const minhasPalestras = allPalestras.filter(p => selectedIds.includes(p.id));

  if (loading) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white font-black italic uppercase tracking-widest">
      Carregando Agenda...
    </div>
  );

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col">
      <Header />
      
      <section className="flex-grow pt-32 pb-20 px-6 max-w-6xl mx-auto w-full">
        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 mb-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-3xl font-black uppercase italic tracking-tighter">
              Olá, <span className="text-blue-600">{userData?.nome || 'Congressista'}</span>
            </h1>
            <p className="text-white/40 text-[10px] font-black uppercase tracking-[3px] mt-1">
              {userData?.email}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex bg-black/40 p-1 rounded-2xl border border-white/5">
              <button 
                onClick={() => setActiveTab('programacao')} 
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'programacao' ? 'bg-blue-600 text-white' : 'text-white/40'}`}
              >
                Programação
              </button>
              <button 
                onClick={() => setActiveTab('agenda')} 
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'agenda' ? 'bg-blue-600 text-white' : 'text-white/40'}`}
              >
                Minha Agenda ({selectedIds.length})
              </button>
            </div>

            <button 
              onClick={handleLogout}
              className="px-6 py-3 border border-red-500/20 text-red-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
            >
              Sair
            </button>
          </div>
        </div>

        <div className="grid gap-4">
          {(activeTab === 'programacao' ? allPalestras : minhasPalestras).map((palestra) => (
            <div 
              key={palestra.id} 
              className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 hover:border-blue-500/50 transition-all group"
            >
              <div className="flex items-center gap-6 w-full">
                <div className="text-2xl font-black italic text-blue-600 min-w-[90px]">
                  {palestra.horario}
                </div>
                <div>
                  <h3 className="text-lg font-bold uppercase tracking-tight group-hover:text-blue-400 transition-colors">
                    {palestra.titulo}
                  </h3>
                  <p className="text-white/40 text-xs uppercase font-bold tracking-widest">
                    {palestra.local || 'Auditório Principal'}
                  </p>
                </div>
              </div>
              
              <button 
                disabled={isSaving}
                onClick={() => togglePalestra(palestra)}
                className={`w-full md:w-auto px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  selectedIds.includes(palestra.id) 
                    ? 'bg-green-500/10 text-green-500 border border-green-500/20 hover:bg-red-500/20 hover:text-red-500 hover:border-red-500/40' 
                    : 'bg-white text-black hover:bg-blue-600 hover:text-white'
                } ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {selectedIds.includes(palestra.id) ? (
                   <>
                     <span className="group-hover:hidden">✓ Inscrito</span>
                     <span className="hidden group-hover:inline">✕ Cancelar</span>
                   </>
                ) : '+ Participar'}
              </button>
            </div>
          ))}
          
          {activeTab === 'agenda' && minhasPalestras.length === 0 && (
            <div className="text-center py-20 border border-dashed border-white/10 rounded-[2.5rem]">
              <p className="text-white/20 uppercase font-black tracking-widest">Sua agenda está vazia.</p>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
