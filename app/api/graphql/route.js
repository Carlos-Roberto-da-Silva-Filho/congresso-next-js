import { createYoga, createSchema } from 'graphql-yoga';
import { db } from '@/lib/firebaseAdmin';

const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Palestra {
      id: ID!
      titulo: String
      descricao: String
      dataHora: String
      local: String
      palestranteId: String
    }

    type Palestrante {
      id: ID!
      nome: String!
      bio: String
      especialidade: String
      fotoURL: String
      palestras: [Palestra]
    }

    type Query {
      # Consulta personalizada para o Relatório do Admin
      adminReport: [Palestrante]
    }
  `,
  resolvers: {
    Query: {
      adminReport: async () => {
        try {
          // 1. Busca todos os palestrantes
          const palestrantesSnap = await db.collection('palestrantes').get();
          const palestrantes = palestrantesSnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));

          // 2. Busca todas as palestras
          const palestrasSnap = await db.collection('palestras').get();
          const palestras = palestrasSnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));

          // 3. Mescla os dados (Join manual no servidor)
          // Para cada palestrante, são filtradas as palestras que pertencem a ele
          return palestrantes.map(p => ({
            ...p,
            palestras: palestras.filter(pal => pal.palestranteId === p.id)
          }));
        } catch (error) {
          console.error("Erro no Resolver GraphQL:", error);
          return [];
        }
      },
    },
  },
});

const { handleRequest } = createYoga({
  schema,
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Response }
});

export { handleRequest as GET, handleRequest as POST };