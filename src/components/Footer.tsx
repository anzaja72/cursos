import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-white/10 bg-black py-10 px-4 sm:px-6 text-gray-400 text-xs">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-500/20 text-orange-400 font-mono font-black text-xs border border-orange-500/30">
            IA
          </div>
          <div>
            <p className="font-bold text-white uppercase tracking-wider text-xs">
              Subdominio 3: Cursos y Capacitación (CapCut / Marketing con IA 2026)
            </p>
            <p className="text-[10px] text-gray-500 font-light mt-0.5">
              © {new Date().getFullYear()} Sistema de Marketing Digital con Inteligencia Artificial. Todos los derechos reservados.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-[10px] font-mono uppercase tracking-widest text-gray-400">
          <span className="hover:text-orange-400 cursor-pointer transition-colors">Términos del Sorteo</span>
          <span className="hover:text-orange-400 cursor-pointer transition-colors">Política de Privacidad</span>
          <span className="hover:text-orange-400 cursor-pointer transition-colors">Reglamento Becas IA</span>
        </div>

      </div>
    </footer>
  );
};
