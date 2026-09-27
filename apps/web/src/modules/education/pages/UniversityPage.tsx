import { ArrowLeft, GraduationCap, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const COURSES = [
  { id: 'c1', name: 'Programación Básica', cost: 800, durationMonths: 2, xpReward: 15 },
  { id: 'c2', name: 'Inglés para Negocios', cost: 1200, durationMonths: 3, xpReward: 20 },
  { id: 'c3', name: 'Master en Finanzas', cost: 3500, durationMonths: 6, xpReward: 40 },
];

export default function UniversityPage() {

  const handleEnroll = async (course: any) => {
    try {
      const userId = localStorage.getItem('financity_user_id');
      if (!userId) { alert("Inicia sesión primero"); return; }

      const res = await fetch(`http://localhost:3000/api/profiles/${userId}/courses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId: course.id, ...course })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      alert(data.message);
    } catch (err: any) {
      alert(`Error al inscribirse: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <Link to="/game/map" className="inline-flex items-center gap-2 text-slate-500 hover:text-purple-600 transition-colors font-medium">
          <ArrowLeft size={20} />
          Volver al Mapa
        </Link>

        <header className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center">
            <GraduationCap size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Universidad</h1>
            <p className="text-slate-500">Invierte en ti mismo. Aumenta tus habilidades para acceder a mejores empleos.</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COURSES.map(course => (
            <div key={course.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3 text-purple-600">
                  <BookOpen size={24} />
                  <h3 className="font-bold text-lg text-slate-800">{course.name}</h3>
                </div>
              </div>
              <p className="text-slate-500 text-sm mb-6">Duración: {course.durationMonths} meses</p>
              
              <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl mb-6">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">Costo</p>
                  <p className="font-bold text-slate-800">Bs {course.cost}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">Recompensa</p>
                  <p className="font-bold text-purple-600">+{course.xpReward} XP</p>
                </div>
              </div>

              <button 
                onClick={() => handleEnroll(course)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition-colors"
              >
                Inscribirse
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
