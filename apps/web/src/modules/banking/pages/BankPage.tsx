import { ArrowLeft, Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import LoanSimulator from '../components/LoanSimulator';

export default function BankPage() {
  const handleTakeLoan = (amount: number, rate: number, months: number) => {
    // Aquí invocaremos la API de Backend para registrar el préstamo en BD
    alert(`Préstamo solicitado: Bs ${amount} al ${rate*100}% por ${months} meses.`);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <Link to="/game/map" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-medium">
          <ArrowLeft size={20} />
          Volver al Mapa
        </Link>

        <header className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
            <Landmark size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Banco Central</h1>
            <p className="text-slate-500">Préstamos, cuentas y simulación de créditos.</p>
          </div>
        </header>

        <LoanSimulator onTakeLoan={handleTakeLoan} />

      </div>
    </div>
  );
}
