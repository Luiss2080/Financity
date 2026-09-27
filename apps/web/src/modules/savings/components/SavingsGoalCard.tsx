import { useState } from 'react';
import { Target, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface SavingsGoalProps {
  goalName: string;
  targetAmount: number;
  currentAmount: number;
  onAddSavings: (amount: number) => void;
}

export default function SavingsGoalCard({ goalName, targetAmount, currentAmount, onAddSavings }: SavingsGoalProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [addAmount, setAddAmount] = useState('');

  const progress = Math.min((currentAmount / targetAmount) * 100, 100);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(addAmount);
    if (!isNaN(amount) && amount > 0) {
      onAddSavings(amount);
      setAddAmount('');
      setShowAddModal(false);
    }
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 shadow-xl relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-bl-full -z-10" />

      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-2 text-accent mb-1">
            <Target size={18} />
            <span className="text-sm font-bold tracking-wider uppercase">Meta</span>
          </div>
          <h3 className="text-2xl font-bold text-white">{goalName}</h3>
        </div>
      </div>

      <div className="space-y-2 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Ahorrado: <strong className="text-white">Bs {currentAmount.toLocaleString()}</strong></span>
          <span className="text-slate-400">Objetivo: <strong className="text-white">Bs {targetAmount.toLocaleString()}</strong></span>
        </div>
        
        {/* Progress Bar */}
        <div className="h-3 w-full bg-slate-700 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-accent relative"
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </motion.div>
        </div>
        
        <div className="text-right">
          <span className="text-accent font-bold">{Math.floor(progress)}%</span>
        </div>
      </div>

      {!showAddModal ? (
        <button 
          onClick={() => setShowAddModal(true)}
          className="w-full py-3 rounded-xl border border-accent text-accent hover:bg-accent/10 font-bold flex items-center justify-center gap-2 transition-colors"
        >
          <Plus size={18} />
          Agregar ahorro
        </button>
      ) : (
        <form onSubmit={handleAdd} className="flex gap-2">
          <input 
            type="number"
            value={addAmount}
            onChange={(e) => setAddAmount(e.target.value)}
            placeholder="Monto Bs..."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-accent"
            autoFocus
          />
          <button type="submit" className="px-4 py-2 bg-accent text-slate-900 rounded-xl font-bold hover:bg-accent/90">
            Añadir
          </button>
          <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-slate-700 text-white rounded-xl hover:bg-slate-600">
            x
          </button>
        </form>
      )}
    </div>
  );
}
