import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  { q: "¿Es realmente gratis?", a: "Sí, el juego base es 100% gratuito. Nuestro objetivo es la educación financiera." },
  { q: "¿Necesito conocimientos previos?", a: "En absoluto. Empezarás desde cero y el juego te enseñará progresivamente a través de micro-lecciones." },
  { q: "¿Puedo jugar sin conexión a internet?", a: "Sí, la versión instalada (Desktop o PWA) permite jugar offline. Se sincronizará cuando vuelvas a conectarte." }
];

export default function FAQSection() {
  return (
    <section className="py-24 bg-slate-900 border-t border-white/5">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Preguntas Frecuentes</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-700 bg-slate-800/50 rounded-2xl overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left font-bold text-lg hover:bg-slate-800 transition-colors"
      >
        {question}
        {isOpen ? <Minus className="text-brand" /> : <Plus className="text-slate-500" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-6 pb-6 text-slate-400"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
