import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

interface EventOption {
  label: string;
  cost: number;
  effect: string; // Ej: "Ahorros", "Gasto corriente"
}

interface RandomEventModalProps {
  title: string;
  description: string;
  options: EventOption[];
  onSelectOption: (option: EventOption) => void;
  isOpen: boolean;
}

export default function RandomEventModal({ title, description, options, onSelectOption, isOpen }: RandomEventModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-slate-900 border border-slate-700 rounded-3xl p-8 max-w-lg w-full shadow-2xl relative overflow-hidden"
        >
          {/* Decals */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-full -z-10" />

          <div className="flex items-center gap-3 text-amber-500 mb-4">
            <AlertTriangle size={32} />
            <h2 className="text-2xl font-bold text-white uppercase tracking-wider">¡Evento Inesperado!</h2>
          </div>
          
          <h3 className="text-xl font-bold text-slate-200 mb-2">{title}</h3>
          <p className="text-slate-400 mb-8">{description}</p>
          
          <div className="space-y-3">
            {options.map((opt, i) => (
              <button 
                key={i}
                onClick={() => onSelectOption(opt)}
                className="w-full flex items-center justify-between p-4 bg-slate-800 border border-slate-700 hover:border-amber-500 hover:bg-slate-800/80 rounded-xl transition-colors group"
              >
                <div className="text-left">
                  <p className="font-bold text-white group-hover:text-amber-500 transition-colors">{opt.label}</p>
                  <p className="text-xs text-slate-500">Afecta: {opt.effect}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-red-400">Bs {opt.cost.toLocaleString()}</p>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
