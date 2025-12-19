'use client';

import { useEffect, useState } from 'react';

export default function RelatorioAdminPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGraphQL() {
      const query = `
        query GetAdminReport {
          adminReport {
            nome
            especialidade
            fotoURL
            bio
            palestras {
              titulo
              local
              dataHora
            }
          }
        }
      `;

      try {
        const res = await fetch('/api/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query }),
        });
        const json = await res.json();
        setData(json.data.adminReport);
      } catch (error) {
        console.error("Erro ao buscar dados GraphQL:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchGraphQL();
  }, []);

  if (loading) return <div className="text-white p-8">Carregando relatório seguro...</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Relatório Consolidado (GraphQL)</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {data.map((palestrante, idx) => (
          <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-xl">
            <div className="flex items-center p-6 border-b border-white/10 gap-4">
              <img 
                src={palestrante.fotoURL} 
                alt={palestrante.nome} 
                className="w-20 h-20 rounded-full object-cover border-2 border-blue-400"
              />
              <div>
                <h2 className="text-xl font-bold text-white">{palestrante.nome}</h2>
                <p className="text-blue-300 text-sm">{palestrante.especialidade}</p>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-300 text-sm mb-4 italic">"{palestrante.bio}"</p>
              
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Palestras Agendadas:
              </h3>
              
              <ul className="space-y-3">
                {palestrante.palestras.map((pal, pIdx) => (
                  <li key={pIdx} className="bg-white/5 p-3 rounded-lg border border-white/5">
                    <p className="text-white text-sm font-medium">{pal.titulo}</p>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-400">📍 {pal.local}</span>
                      <span className="text-xs text-gray-400">
                        📅 {new Date(pal.dataHora).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </li>
                ))}
                {palestrante.palestras.length === 0 && (
                  <p className="text-gray-500 text-xs">Nenhuma palestra vinculada.</p>
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
