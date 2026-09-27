import { motion } from 'framer-motion';
import { ArrowRight, Monitor, Smartphone, Globe, Download, Play, ShieldCheck, TrendingUp, BookOpen } from 'lucide-react';
import { useState } from 'react';
import InstallModal from '../components/InstallModal';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const [isInstallOpen, setInstallOpen] = useState(false);

  return (
    <div className="relative overflow-hidden">
      {/* Elementos de fondo decorativos */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-brand/20 blur-[120px] rounded-full pointer-events-none" />

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 pt-32 pb-24 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-accent mb-6 font-medium">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
            </span>
            Nueva actualización V1.0 disponible
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black leading-[1.1] mb-6">
            Tus decisiones.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-accent">Tu dinero.</span><br />
            Tu futuro.
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-lg leading-relaxed">
            Aprende finanzas jugando. Trabaja, administra tus gastos, ahorra, invierte y descubre cómo cada decisión puede cambiar tu futuro financiero.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/game/map" className="flex items-center justify-center gap-2 bg-gradient-to-r from-brand to-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-brand/25 hover:shadow-brand/40 transition-all hover:-translate-y-1">
              <Play fill="currentColor" size={20} />
              JUGAR GRATIS
            </Link>
            
            <button 
              onClick={() => setInstallOpen(true)}
              className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all"
            >
              <Download size={20} />
              INSTALAR
            </button>
          </div>
        </motion.div>

        {/* Hero Illustration / Dashboard Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-brand/20 to-accent/20 rounded-3xl blur-2xl transform rotate-3" />
          <div className="relative bg-slate-800 border border-slate-700 rounded-3xl p-6 shadow-2xl overflow-hidden">
            {/* Fake Dashboard Header */}
            <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
              <div>
                <h3 className="font-bold text-xl text-white">Edwin — Nivel 12</h3>
                <p className="text-slate-400 text-sm">Salud financiera: <span className="text-accent font-bold">82/100</span></p>
              </div>
              <div className="w-12 h-12 bg-slate-700 rounded-full border-2 border-brand overflow-hidden flex items-center justify-center">
                <span className="text-xl">😎</span>
              </div>
            </div>

            {/* Fake Dashboard Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700">
                <p className="text-slate-400 text-sm mb-1">Patrimonio</p>
                <p className="text-2xl font-bold text-white">Bs 48.250</p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700">
                <p className="text-slate-400 text-sm mb-1">Ahorros</p>
                <p className="text-2xl font-bold text-accent">Bs 12.500</p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700 col-span-2 flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm mb-1">Deudas activas</p>
                  <p className="text-xl font-bold text-red-400">Bs 6.200</p>
                </div>
                <div className="bg-red-400/10 text-red-400 px-3 py-1 rounded-lg text-sm font-medium">
                  Préstamo Auto
                </div>
              </div>
            </div>
            
            {/* Floating Element Animation */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -right-6 top-1/2 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="bg-accent/20 p-2 rounded-full text-accent"><TrendingUp size={20} /></div>
                <div>
                  <p className="text-xs text-slate-300">Inversión completada</p>
                  <p className="font-bold text-white">+Bs 450.00</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="bg-slate-900 py-24 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Mucho más que un juego</h2>
            <p className="text-slate-400 text-lg">Aprende conceptos financieros reales a través de simulaciones divertidas y toma el control de tu economía.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<ShieldCheck className="text-brand" size={32} />}
              title="Cero Riesgo Real"
              desc="Simula deudas, inversiones y presupuestos usando moneda virtual (Bs). Aprende equivocándote aquí, no en la vida real."
            />
            <FeatureCard 
              icon={<TrendingUp className="text-accent" size={32} />}
              title="Economía Dinámica"
              desc="Inflación, eventos inesperados, desempleo y ofertas. El juego reacciona a tus decisiones tal como pasa en el mundo real."
            />
            <FeatureCard 
              icon={<BookOpen className="text-purple-400" size={32} />}
              title="Lecciones Integradas"
              desc="Micro-lecciones de 2 minutos y Quizzes rápidos para desbloquear habilidades y aumentar tu salario en el juego."
            />
          </div>
        </div>
      </section>

      {/* Modal */}
      {isInstallOpen && <InstallModal onClose={() => setInstallOpen(false)} />}
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-slate-800/50 border border-slate-700/50 p-8 rounded-3xl hover:bg-slate-800 transition-colors">
      <div className="mb-6 bg-slate-900 w-16 h-16 rounded-2xl flex items-center justify-center border border-white/5 shadow-inner">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}
