import { useState } from 'react';
import { motion } from 'framer-motion';

interface PlayerCreationModalProps {
  onComplete: () => void;
}

export default function PlayerCreationModal({ onComplete }: PlayerCreationModalProps) {
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !goal) return;
    
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: `${name.replace(/\s+/g, '').toLowerCase()}@financity.app`, 
          password: 'Password123!', 
          name 
        })
      });

      if (!res.ok) throw new Error('Error al crear perfil');
      
      const data = await res.json();
      // Guardar el token/ID en el state (por ahora localStorage para el MVP)
      localStorage.setItem('financity_user_id', data.user.id);
      onComplete();
    } catch (error) {
      console.error(error);
      alert("Hubo un error al conectarse con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-slate-900 border border-slate-700 rounded-3xl p-8 max-w-md w-full shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-white mb-2">Crea tu jugador</h2>
        <p className="text-slate-400 mb-8">El primer paso hacia tu libertad financiera.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              ¿Cuál es tu nombre?
            </label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej. Edwin"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Selecciona tu objetivo principal
            </label>
            <div className="grid grid-cols-1 gap-3">
              {['🏠 Comprar una casa', '🎓 Estudiar', '🏪 Crear un negocio', '📈 Invertir'].map((g) => (
                <button
                  type="button"
                  key={g}
                  onClick={() => setGoal(g)}
                  className={`px-4 py-3 rounded-xl border text-left transition-colors ${
                    goal === g 
                      ? 'border-brand bg-brand/10 text-brand' 
                      : 'border-slate-700 hover:border-slate-500 text-slate-300'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading || !name || !goal}
            className="w-full bg-brand hover:bg-brand/90 text-slate-900 font-bold py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? 'Creando perfil...' : 'Empezar el juego (Bs 1.500)'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
