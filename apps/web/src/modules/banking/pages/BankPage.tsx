import { ArrowLeft, Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import LoanSimulator from '../components/LoanSimulator';

export default function BankPage() {
  const handleTakeLoan = async (amount: number, rate: number, months: number) => {
    try {
      const userId = localStorage.getItem('financity_user_id');
      if (!userId) {
        alert("Usuario no autenticado");
        return;
      }

      const res = await fetch(`http://localhost:3000/api/profiles/${userId}/loans`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, rate, months })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      alert(`¡Felicidades! ${data.message}`);
    } catch (error: any) {
      alert(`Error bancario: ${error.message}`);
    }
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
