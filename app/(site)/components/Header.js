'use client';

export default function Header() {
  return (
    <header className="w-full bg-site-nav text-white py-6 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-wide">Congresso Acadêmico</h1>

        <nav className="space-x-6 text-sm font-medium hidden md:block">
          <a href="/" className="hover:opacity-80">Home</a>
          <a href="/palestras" className="hover:opacity-80">Palestras</a>
          <a href="/palestrantes" className="hover:opacity-80">Palestrantes</a>
          <a href="/local_evento" className="hover:opacity-80">Local do Evento</a>
          <a href="/login" className="hover:opacity-80">Login</a>
        </nav>
      </div>
    </header>
  );
}
