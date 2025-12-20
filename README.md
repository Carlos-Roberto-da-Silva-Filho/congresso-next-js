\# 🚀 Connect Eventos - Plataforma de Gestão de Congressos



Este projeto é uma aplicação full-stack desenvolvida com \*\*Next.js\*\*, integrada ao \*\*Firebase\*\* e \*\*GraphQL (Yoga)\*\*. A plataforma permite que congressistas se inscrevam em palestras, gerenciem sua agenda em tempo real e permite que administradores acessem relatórios avançados.



\## 📋 Sumário de Atendimento aos Requisitos (Rúbricas)



\### 1. Arquitetura e Performance (Next.js \& Serverless)

\- \*\*Deploy Serverless:\*\* Aplicação publicada na \[Vercel](https://vercel.com/).

\- \*\*Banco de Dados:\*\* Utilização do \*\*Google Firebase Firestore\*\* para persistência de dados (NoSQL).

\- \*\*API Routes:\*\* Implementação de endpoints em `app/api/` para CRUD de usuários, autenticação e gestão de agenda.

\- \*\*GraphQL Yoga:\*\* Implementação de um servidor GraphQL em `/api/graphql` para geração de relatórios complexos (adminReport) unindo dados de palestrantes e palestras.



\### 2. Rotas e Navegação

\- \*\*Rota Principal:\*\* Página inicial (`/`) desenvolvida com layout responsivo.

\- \*\*Rotas Dinâmicas:\*\* Implementação de slugs e IDs para gerenciamento de usuários e conteúdos específicos.

\- \*\*Server-Side Functions:\*\* Uso de \*\*Server Components\*\* e funções de servidor para busca de dados segura diretamente do Firestore.

\- \*\*Navegação:\*\* Uso do componente `next/link` para transições de página sem reload (SPA experience).



\### 3. Componentes e Design

\- \*\*Estrutura Modular:\*\* Código organizado em componentes reutilizáveis: `Header`, `Footer`, `Formulários`, `Card de Palestras`.

\- \*\*Design Responsivo:\*\* Interface adaptável para dispositivos móveis e desktop utilizando \*\*Tailwind CSS\*\*.

\- \*\*Layout:\*\* Uso de `layout.js` para manter a persistência de elementos globais (Header/Footer).



\### 4. Formulários, Validação e Segurança

\- \*\*Formulários:\*\* Criação de formulários de \*\*Cadastro de Usuário\*\* e \*\*Login\*\* com estados de carregamento e erro.

\- \*\*Autenticação de Usuários:\*\* Implementação de sistema de Login/Logout com \*\*Cookies Seguro\*\* e \*\*JWT\*\*.

\- \*\*Validação Full-Stack:\*\* - \*\*Front-end:\*\* Verificação de campos obrigatórios e feedback imediato.

&nbsp; - \*\*Back-end:\*\* Middleware e funções de verificação de sessão (`verifySession`) protegendo rotas sensíveis.

\- \*\*Segurança:\*\* 100% das chaves privadas são gerenciadas via Variáveis de Ambiente na Vercel, nunca expostas no front-end.



---



\## 🛠️ Tecnologias Principais



\- \*\*Framework:\*\* Next.js 14 (App Router)

\- \*\*Linguagem:\*\* JavaScript / React

\- \*\*Estilização:\*\* Tailwind CSS

\- \*\*API:\*\* REST (Next API Routes) \& GraphQL (Yoga)

\- \*\*Banco de Dados:\*\* Firebase Firestore

\- \*\*Autenticação:\*\* Firebase Admin SDK



---





🧑‍💻 Autor

Desenvolvido por Carlos como projeto avaliativo para a disciplina de Desenvolvimento Web com Next.js.

