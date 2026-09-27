import { useState } from 'react';
import { Calculator } from 'lucide-react';

interface Props {
  onTakeLoan: (amount: number, rate: number, months: number) => void;
}

export default function LoanSimulator({ onTakeLoan }: Props) {
  const [amount, setAmount] = useState(10000);
  const [months, setMonths] = useState(12);
  const rate = 0.10; // 10% fijo para el simulador inicial

  const totalOwed = amount * (1 + rate);
  const monthlyPayment = totalOwed / months;

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
      <div className="flex items-center gap-3 text-blue-600 mb-6">
        <Calculator size={28} />
        <h2 className="text-2xl font-bold text-slate-800">Simulador de Créditos</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Monto a solicitar: <span className="font-bold text-slate-900">Bs {amount.toLocaleString()}</span>
            </label>
            <input 
              type="range" min="1000" max="50000" step="1000"
              value={amount} onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Plazo (meses): <span className="font-bold text-slate-900">{months}</span>
            </label>
            <input 
              type="range" min="3" max="36" step="3"
              value={months} onChange={(e) => setMonths(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>
          
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-sm text-slate-500">Tasa de interés aplicada:</p>
            <p className="font-bold text-slate-800">10%</p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <p className="text-blue-800 font-medium mb-1">Cuota mensual aproximada</p>
            <p className="text-4xl font-black text-blue-900 mb-4">Bs {monthlyPayment.toFixed(2)}</p>
            
            <div className="space-y-2 border-t border-blue-200 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-blue-700">Monto Solicitado:</span>
                <span className="font-bold text-blue-900">Bs {amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-blue-700">Intereses a pagar:</span>
                <span className="font-bold text-red-500">+ Bs {(totalOwed - amount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-blue-700">Total a devolver:</span>
                <span className="font-bold text-blue-900">Bs {totalOwed.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => onTakeLoan(amount, rate, months)}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors"
          >
            Solicitar Préstamo
          </button>
        </div>
      </div>
    </div>
  );
}
