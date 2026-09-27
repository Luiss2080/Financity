import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone, Monitor, Apple, Terminal, Globe } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export default function InstallModal({ onClose }: Props) {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-slate-800 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="flex justify-between items-center p-6 border-b border-slate-700">
            <h2 className="text-2xl font-bold text-white">JUEGA DONDE QUIERAS</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors bg-slate-700/50 p-2 rounded-full">
              <X size={20} />
            </button>
          </div>

          <div className="p-6">
            <p className="text-slate-400 mb-6">FinanCity se adapta a ti. Juega desde el navegador o instálalo para disfrutar de soporte Offline y notificaciones de eventos financieros.</p>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <PlatformCard 
                icon={<Globe size={28} className="text-brand" />}
                name="Navegador Web"
                desc="Juega ahora sin instalar nada."
                btnText="Jugar ahora"
                primary
              />
              <PlatformCard 
                icon={<Smartphone size={28} className="text-accent" />}
                name="Android (PWA)"
                desc="Instala desde tu navegador."
                btnText="Instalar App"
              />
              <PlatformCard 
                icon={<Monitor size={28} className="text-blue-400" />}
                name="Windows"
                desc="Versión nativa .exe"
                btnText="Descargar"
              />
              <PlatformCard 
                icon={<Apple size={28} className="text-slate-200" />}
                name="macOS"
                desc="Versión nativa .dmg"
                btnText="Descargar"
              />
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-700 flex justify-between items-center text-sm text-slate-500">
              <span>Versión 1.0 (Estable)</span>
              <a href="#" className="hover:text-white underline decoration-slate-600">Ver requisitos</a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function PlatformCard({ icon, name, desc, btnText, primary }: any) {
  return (
    <div className={`p-4 rounded-2xl border flex flex-col items-start ${primary ? 'bg-brand/10 border-brand/30' : 'bg-slate-900/50 border-slate-700 hover:border-slate-600'} transition-colors`}>
      <div className="mb-3">{icon}</div>
      <h4 className="text-white font-bold mb-1">{name}</h4>
      <p className="text-slate-400 text-sm mb-4 flex-1">{desc}</p>
      <button className={`w-full py-2 rounded-xl font-bold text-sm ${primary ? 'bg-brand text-white hover:bg-blue-600' : 'bg-slate-700 text-white hover:bg-slate-600'} transition-colors`}>
        {btnText}
      </button>
    </div>
  );
}
