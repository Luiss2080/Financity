import { Link } from 'react-router-dom';
import { Home, Briefcase, GraduationCap, Building2, TrendingUp, ShoppingCart } from 'lucide-react';

export default function GameMapPage() {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <header className="bg-white p-6 shadow-sm border-b border-slate-200 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Mapa de la Ciudad</h1>
        <Link to="/" className="text-slate-500 hover:text-brand font-medium">Volver a Inicio</Link>
      </header>

      <div className="flex-1 p-6 md:p-12 relative overflow-hidden flex items-center justify-center">
        {/* Un mapa muy sencillo con grid visual */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
          <MapLocation 
            icon={<Home size={40} className="text-blue-500" />}
            title="Mi Casa"
            to="/game/house"
            desc="Revisa tu presupuesto, ahorros y patrimonio."
          />
          <MapLocation 
            icon={<Briefcase size={40} className="text-amber-600" />}
            title="Trabajo"
            to="#"
            desc="Busca empleo y cobra tu salario."
          />
          <MapLocation 
            icon={<Building2 size={40} className="text-slate-600" />}
            title="Banco"
            to="#"
            desc="Solicita préstamos y paga deudas."
          />
          <MapLocation 
            icon={<GraduationCap size={40} className="text-purple-500" />}
            title="Universidad"
            to="#"
            desc="Estudia para mejorar tus ingresos."
          />
          <MapLocation 
            icon={<TrendingUp size={40} className="text-emerald-500" />}
            title="Inversiones"
            to="#"
            desc="Haz crecer tu dinero."
          />
          <MapLocation 
            icon={<ShoppingCart size={40} className="text-rose-500" />}
            title="Tienda"
            to="#"
            desc="Compra bienes y aumenta tus gastos."
          />
        </div>
      </div>
    </div>
  );
}

function MapLocation({ icon, title, desc, to }: any) {
  return (
    <Link to={to} className="group bg-white p-6 rounded-3xl shadow-sm border border-slate-200 hover:border-brand hover:shadow-xl hover:shadow-brand/10 transition-all hover:-translate-y-1 text-center flex flex-col items-center">
      <div className="bg-slate-50 w-20 h-20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-500 text-sm">{desc}</p>
    </Link>
  );
}
