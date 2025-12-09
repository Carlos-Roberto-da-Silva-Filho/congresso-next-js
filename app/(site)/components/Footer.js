export default function Footer() {
  return (
    <footer className="w-full bg-site-nav text-white py-6 mt-12">
      <div className="max-w-6xl mx-auto px-4 text-center space-y-2">
        <p className="text-sm tracking-wide">
          © {new Date().getFullYear()} Congresso Acadêmico — Todos os direitos reservados.
        </p>

        <p className="text-xs opacity-80">
          Desenvolvido para fins acadêmicos — Projeto Next.js
        </p>
      </div>
    </footer>
  );
}
