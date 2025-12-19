import { Inter } from "next/font/google";
import "./globals.css";

// Configura a fonte Inter e define a variável CSS que seu globals.css usa
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", 
  display: 'swap',
});

export const metadata = {
  title: "Congresso 2025 | Inovação e Tecnologia",
  description: "Plataforma oficial para congressistas e palestrantes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} scroll-smooth`}>
      <head>
        {/* Importação dos ícones usados no projeto */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      {/* O globals.css já aplica var(--background) e var(--font-inter).
          Adicionando antialiased para deixar a fonte Inter mais nítida.
      */}
      <body className="antialiased selection:bg-blue-500/30">
        {children}
      </body>
    </html>
  );
}
