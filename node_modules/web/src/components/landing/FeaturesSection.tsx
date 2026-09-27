import { ShieldCheck, TrendingUp, BookOpen } from 'lucide-react';

export default function FeaturesSection() {
  return (
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
