import React from 'react';
import { Flame, LayoutDashboard, Zap } from 'lucide-react';

interface HeaderProps {
  registeredSeats: number;
  totalSeats: number;
  onOpenForm: () => void;
  onToggleAdmin: () => void;
  isAdminOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  registeredSeats,
  totalSeats,
  onOpenForm,
  onToggleAdmin,
  isAdminOpen,
}) => {
  const percentage = Math.round((registeredSeats / totalSeats) * 100);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-[#00071a]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-3 sm:px-6">
        
        {/* Brand / Title badge */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#0071b6] text-white font-display font-extrabold text-xs tracking-wider shadow-sm">
            IA
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-xs tracking-wider uppercase text-white">
                SISTEMA IA 2026
              </span>
              <span className="hidden rounded bg-[#0b1f3f] px-2 py-0.5 text-[10px] font-bold text-[#69b6ff] border border-[#0071b6]/30 uppercase tracking-widest sm:inline-block">
                SORTEO OFICIAL
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-body">CapCut & Marketing con IA</p>
          </div>
        </div>

        {/* Counter Scarcity Badge */}
        <div className="hidden md:flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2.5 rounded-md border border-zinc-800 bg-[#0b172a] px-3.5 py-1.5">
            <Flame className="h-3.5 w-3.5 text-[#0071b6] animate-pulse" />
            <span className="text-zinc-300 font-body text-xs">
              <strong className="text-[#69b6ff]">{registeredSeats}</strong> / {totalSeats} Cupos
            </span>
            <div className="h-1.5 w-16 overflow-hidden rounded bg-zinc-900 border border-zinc-800">
              <div 
                className="h-full bg-gradient-to-r from-[#0071b6] to-[#69b6ff] transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleAdmin}
            className={`flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-semibold tracking-wide transition-all ${
              isAdminOpen
                ? 'border-[#0071b6] bg-[#0071b6]/20 text-[#69b6ff]'
                : 'border-zinc-800 bg-[#0b172a] text-zinc-300 hover:border-zinc-700 hover:text-white'
            }`}
            title="Estrategia Backend & Gestión de Leads"
          >
            <LayoutDashboard className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Modo CRM</span>
          </button>

          <button
            onClick={onOpenForm}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-[#0071b6] hover:bg-[#00629f] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-all shadow-md active:scale-95"
          >
            <Zap className="mr-1.5 h-3.5 w-3.5 fill-current text-white" />
            <span>Aplica a Beca</span>
          </button>
        </div>

      </div>
    </header>
  );
};
