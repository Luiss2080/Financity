import { motion } from 'framer-motion';

interface BudgetChartProps {
  income: number;
  expenses: { name: string; amount: number }[];
  loanInstallments: number;
}

export default function BudgetChart({ income, expenses, loanInstallments }: BudgetChartProps) {
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalDebt = loanInstallments;
  const totalOut = totalExpenses + totalDebt;
  const savings = Math.max(0, income - totalOut);

  // Calcular porcentajes
  const base = Math.max(income, totalOut, 1);
  const expensesPct = (totalExpenses / base) * 100;
  const debtPct = (totalDebt / base) * 100;
  const savingsPct = (savings / base) * 100;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl w-full">
      <h3 className="text-xl font-bold text-white mb-6">Distribución Mensual</h3>
      
      {/* Barra compuesta */}
      <div className="h-6 w-full flex rounded-full overflow-hidden mb-6 bg-slate-800">
        <motion.div 
          initial={{ width: 0 }} animate={{ width: `${expensesPct}%` }} transition={{ duration: 1 }}
          className="h-full bg-rose-500" title={`Gastos Fijos: ${expensesPct.toFixed(1)}%`} 
        />
        <motion.div 
          initial={{ width: 0 }} animate={{ width: `${debtPct}%` }} transition={{ duration: 1, delay: 0.2 }}
          className="h-full bg-amber-500" title={`Deudas Bancarias: ${debtPct.toFixed(1)}%`} 
        />
        <motion.div 
          initial={{ width: 0 }} animate={{ width: `${savingsPct}%` }} transition={{ duration: 1, delay: 0.4 }}
          className="h-full bg-emerald-500" title={`Ahorro / Disponible: ${savingsPct.toFixed(1)}%`} 
        />
      </div>

      {/* Leyenda */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full bg-rose-500" />
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Gastos Fijos</span>
          </div>
          <p className="text-lg font-bold text-white">Bs {totalExpenses.toLocaleString()}</p>
        </div>
        
        <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Cuotas Bancarias</span>
          </div>
          <p className="text-lg font-bold text-white">Bs {totalDebt.toLocaleString()}</p>
        </div>
        
        <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Flujo de Caja Libre</span>
          </div>
          <p className="text-lg font-bold text-emerald-400">Bs {savings.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
