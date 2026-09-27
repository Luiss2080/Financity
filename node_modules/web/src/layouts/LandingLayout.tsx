import { Outlet, Link } from 'react-router-dom';
import { Wallet, Menu } from 'lucide-react';
import { useState } from 'react';

export default function LandingLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 font-sans selection:bg-brand selection:text-white">
      {/* Navbar con Glassmorphism */}
      <nav className="fixed w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-brand to-accent p-2 rounded-xl shadow-lg">
              <Wallet className="text-white" size={24} />
            </div>
            <span className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
              FINANCITY
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 font-medium">
            <Link to="#" className="text-slate-300 hover:text-white transition-colors">Aprende</Link>
            <Link to="#" className="text-slate-300 hover:text-white transition-colors">Características</Link>
            <Link to="#" className="text-slate-300 hover:text-white transition-colors">Ranking</Link>
            
            <div className="flex items-center gap-4 ml-4">
              <button className="text-slate-300 hover:text-white transition-colors">Iniciar sesión</button>
              <Link to="/game/map" className="bg-brand hover:bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-brand/30 transition-all hover:-translate-y-0.5">
                JUGAR GRATIS
              </Link>
            </div>
          </div>

          <button className="md:hidden text-slate-300" onClick={() => setMenuOpen(!menuOpen)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Page Content */}
      <main className="pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-24 py-12 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-500">
          <p>© {new Date().getFullYear()} FinanCity. Aprende finanzas jugando.</p>
        </div>
      </footer>
    </div>
  );
}
