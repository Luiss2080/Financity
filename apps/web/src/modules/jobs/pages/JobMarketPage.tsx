import { ArrowLeft, Briefcase, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const JOBS = [
  { id: 'j1', title: 'Ayudante de Tienda', salary: 2500, requiredSkill: 0 },
  { id: 'j2', title: 'Técnico Junior', salary: 4500, requiredSkill: 15 },
  { id: 'j3', title: 'Analista de Datos', salary: 8000, requiredSkill: 35 },
  { id: 'j4', title: 'Gerente Regional', salary: 15000, requiredSkill: 75 },
];

export default function JobMarketPage() {

  const handleApply = async (job: any) => {
    try {
      const userId = localStorage.getItem('financity_user_id');
      if (!userId) { alert("Inicia sesión primero"); return; }

      const res = await fetch(`http://localhost:3000/api/profiles/${userId}/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId: job.id, ...job })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      alert(data.message);
    } catch (err: any) {
      alert(`Rechazado: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <Link to="/game/map" className="inline-flex items-center gap-2 text-slate-500 hover:text-amber-600 transition-colors font-medium">
          <ArrowLeft size={20} />
          Volver al Mapa
        </Link>

        <header className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center">
            <Briefcase size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Bolsa de Empleo</h1>
            <p className="text-slate-500">Busca ofertas laborales acordes a tu nivel de experiencia (XP).</p>
          </div>
        </header>

        <div className="space-y-4">
          {JOBS.map(job => (
            <div key={job.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex-1">
                <h3 className="font-bold text-xl text-slate-800 mb-1">{job.title}</h3>
                <div className="flex gap-4 text-sm">
                  <span className="text-slate-500">Salario: <strong className="text-emerald-600 font-bold">Bs {job.salary}/mes</strong></span>
                  <span className="text-slate-500">Requisito: <strong className="text-purple-600 font-bold">{job.requiredSkill} XP</strong></span>
                </div>
              </div>

              <button 
                onClick={() => handleApply(job)}
                className="w-full md:w-auto px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors flex justify-center items-center gap-2"
              >
                <CheckCircle size={18} />
                Postularse
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
