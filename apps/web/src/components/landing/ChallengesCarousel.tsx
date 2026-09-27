import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const challenges = [
  {
    title: "Sobrevive al Mes",
    desc: "Ingresos bajos, emergencias altas. Termina el mes sin pedir deudas malas.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Sal de las Deudas",
    desc: "Tienes Bs 15,000 en deudas con alto interés. Diseña tu estrategia de pago.",
    color: "from-red-500 to-orange-500"
  },
  {
    title: "El Primer Emprendimiento",
    desc: "Invierte tu pequeño capital inicial en una tienda. No quedes en bancarrota.",
    color: "from-emerald-500 to-teal-500"
  }
];

export default function ChallengesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % challenges.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + challenges.length) % challenges.length);

  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Desafíos Financieros</h2>
        
        <div className="relative max-w-3xl mx-auto h-64">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className={`absolute inset-0 rounded-3xl bg-gradient-to-tr ${challenges[currentIndex].color} p-1`}
            >
              <div className="bg-slate-900 w-full h-full rounded-[23px] flex flex-col justify-center items-center text-center p-8">
                <h3 className="text-2xl font-bold text-white mb-4">{challenges[currentIndex].title}</h3>
                <p className="text-slate-300 text-lg">{challenges[currentIndex].desc}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <button onClick={prev} className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md transition-colors">
            <ChevronLeft size={24} />
          </button>
          <button onClick={next} className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md transition-colors">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
