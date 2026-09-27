import { useGameStore } from '../store/gameStore';
import { Wallet, Briefcase, Plus, AlertCircle, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SavingsGoalCard from '../modules/savings/components/SavingsGoalCard';
import BudgetChart from '../modules/analytics/components/BudgetChart';

export default function HousePage() {
  const { profile, budgetEngine, addIncome, addExpense, error, clearError } = useGameStore();
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (expenseName && expenseAmount) {
      addExpense(expenseName, Number(expenseAmount));
      if (!error) {
        setExpenseName('');
        setExpenseAmount('');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <Link to="/game/map" className="inline-flex items-center gap-2 text-slate-500 hover:text-brand transition-colors font-medium">
          <ArrowLeft size={20} />
          Volver al Mapa
        </Link>

        {/* Header RF-1 */}
        <header className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-800">Hola, {profile.name} 👋</h1>
              <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                useGameStore(s => s.healthScore) >= 80 ? 'bg-emerald-100 text-emerald-700' : 
                useGameStore(s => s.healthScore) >= 50 ? 'bg-amber-100 text-amber-700' : 
                'bg-rose-100 text-rose-700'
              }`}>
                Score: {useGameStore(s => s.healthScore)}
              </div>
            </div>
            <p className="text-slate-500">Edad: {profile.age} años</p>
          </div>
          <div className="flex items-center gap-2 bg-brand/10 text-brand px-4 py-2 rounded-lg font-semibold">
            <Wallet size={20} />
            <span>Patrimonio: Bs {profile.money}</span>
          </div>
        </header>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-3">
            <AlertCircle size={20} />
            <span className="font-medium">{error}</span>
            <button onClick={clearError} className="ml-auto underline">Entendido</button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Ingresos RF-2 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 col-span-1">
            <div className="flex items-center gap-3 text-accent mb-4">
              <Briefcase size={24} />
              <h2 className="text-lg font-bold">Mis Ingresos</h2>
            </div>
            <p className="text-3xl font-bold text-slate-800">Bs {profile.income}</p>
            
            {profile.income === 0 && (
              <button 
                onClick={() => addIncome(2500)}
                className="mt-6 w-full bg-slate-900 text-white py-3 rounded-xl font-medium hover:bg-slate-800 transition-colors"
              >
                Buscar Empleo (Ayudante)
              </button>
            )}
          </div>

          {/* Presupuesto RF-3 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 col-span-1 md:col-span-2">
            <h2 className="text-lg font-bold text-slate-800 mb-6">Presupuesto Mensual</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-sm text-slate-500 mb-1">Gastos Totales</p>
                <p className="text-2xl font-bold text-red-500">Bs {budgetEngine.getTotalExpenses()}</p>
              </div>
              <div className="p-4 bg-brand/5 rounded-xl">
                <p className="text-sm text-slate-500 mb-1">Disponible</p>
                <p className="text-2xl font-bold text-brand">Bs {budgetEngine.getAvailableMoney()}</p>
              </div>
            </div>

            <form onSubmit={handleAddExpense} className="flex gap-3">
              <input 
                type="text" 
                placeholder="Ej. Alquiler"
                value={expenseName}
                onChange={(e) => setExpenseName(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:border-brand"
              />
              <input 
                type="number" 
                placeholder="Monto"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                className="w-32 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:border-brand"
              />
              <button type="submit" className="bg-brand text-white p-3 rounded-xl hover:bg-blue-600 transition-colors">
                <Plus size={20} />
              </button>
            </form>

          </div>
        </div>

        {/* Dashboard Analítico RF-37 */}
        <div className="mt-8">
          <BudgetChart 
            income={profile.income} 
            expenses={budgetEngine.getExpenses()} 
            loanInstallments={0 /* TODO: Connect to BankEngine */} 
          />
        </div>

        {/* Metas de Ahorro RF-15 */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Mis Metas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SavingsGoalCard 
              goalName="Fondo de Emergencia"
              targetAmount={3000}
              currentAmount={0}
              onAddSavings={(amount) => {
                // TODO: En Fase 2 conectar esto al core de estado y DB. 
                // Por ahora usamos addExpense simulando mover dinero al fondo.
                addExpense('Ahorro a Fondo de Emergencia', amount);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
