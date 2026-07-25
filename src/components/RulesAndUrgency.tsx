import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, ArrowRight, Flame } from 'lucide-react';

interface RulesAndUrgencyProps {
  totalSeats: number;
  registeredSeats: number;
  endDateMs: number;
  onOpenForm: () => void;
}

export const RulesAndUrgency: React.FC<RulesAndUrgencyProps> = ({
  totalSeats,
  registeredSeats,
  endDateMs,
  onOpenForm,
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 6,
    hours: 23,
    minutes: 58,
    seconds: 45,
  });

  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now();
      const diff = Math.max(0, endDateMs - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [endDateMs]);

  const percentage = Math.min(100, Math.round((registeredSeats / totalSeats) * 100));

  return (
    <section className="relative w-full border-b border-white/10 bg-black py-20 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block px-3 py-1 border border-orange-500/50 bg-orange-500/10 text-orange-400 text-[10px] uppercase tracking-[0.3em] font-bold mb-3">
            Condiciones Estrictas
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight italic uppercase">
            Las Reglas del Juego
          </h2>
          <p className="mt-2 text-sm text-gray-400 font-light">
            Añadimos urgencia en tres lugares exactos: para entrar, para reclamar y para ejecutar.
          </p>
        </div>

        {/* Live Countdown & Progress Box */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8 shadow-2xl mb-10">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/10 pb-8">
            
            {/* Countdown Display */}
            <div className="text-center md:text-left">
              <span className="text-[10px] font-bold uppercase tracking-widest text-orange-400 font-mono">
                ⏳ Tiempo Restante para el Cierre
              </span>
              <div className="mt-3 flex items-center justify-center md:justify-start gap-2 sm:gap-3">
                <div className="flex flex-col items-center rounded-xl bg-black/60 border border-white/10 px-3 py-2 min-w-[60px]">
                  <span className="font-mono text-2xl sm:text-3xl font-black text-white">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Días</span>
                </div>
                <span className="text-gray-600 font-bold text-xl">:</span>
                <div className="flex flex-col items-center rounded-xl bg-black/60 border border-white/10 px-3 py-2 min-w-[60px]">
                  <span className="font-mono text-2xl sm:text-3xl font-black text-white">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Horas</span>
                </div>
                <span className="text-gray-600 font-bold text-xl">:</span>
                <div className="flex flex-col items-center rounded-xl bg-black/60 border border-white/10 px-3 py-2 min-w-[60px]">
                  <span className="font-mono text-2xl sm:text-3xl font-black text-white">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Min</span>
                </div>
                <span className="text-gray-600 font-bold text-xl">:</span>
                <div className="flex flex-col items-center rounded-xl bg-black/60 border border-white/10 px-3 py-2 min-w-[60px]">
                  <span className="font-mono text-2xl sm:text-3xl font-black text-orange-400">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Seg</span>
                </div>
              </div>
            </div>

            {/* Cupos Bar */}
            <div className="w-full md:w-1/2">
              <div className="flex items-center justify-between text-xs font-bold mb-2 uppercase tracking-wide">
                <span className="text-gray-300 flex items-center gap-1.5 font-mono">
                  <Flame className="h-4 w-4 text-orange-500 animate-pulse" />
                  Cupos Solicitados
                </span>
                <span className="text-orange-400 font-mono">
                  {registeredSeats} / {totalSeats} ({percentage}%)
                </span>
              </div>
              <div className="h-3 w-full rounded-full bg-black/60 border border-white/10 p-0.5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-orange-500 transition-all duration-700"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <p className="mt-2 text-[10px] text-gray-400 text-right italic font-light">
                Cierre automático al completar los {totalSeats} inscritos
              </p>
            </div>

          </div>

          {/* Detailed Rules List */}
          <div className="mt-8 space-y-6">
            
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-orange-500/20 text-orange-400 font-mono font-black text-sm border border-orange-500/30">
                1
              </div>
              <div>
                <h4 className="font-bold text-white text-base uppercase tracking-wide">Límite de Entrada</h4>
                <p className="mt-1 text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                  El registro para el sorteo se cierra exactamente en <strong>7 días</strong> o cuando alcancemos los <strong>{totalSeats} inscritos</strong>, lo que ocurra primero. No se aceptarán registros tardíos bajo ninguna circunstancia.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-red-500/20 text-red-400 font-mono font-black text-sm border border-red-500/30">
                2
              </div>
              <div>
                <h4 className="font-bold text-white text-base uppercase tracking-wide">Límite de Reclamo (48 Horas Exactas)</h4>
                <p className="mt-1 text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                  Una vez que anunciemos al ganador, si calificas para la Beca Parcial, tendrás que poner una fecha de vencimiento a la reclamación del premio para asegurar que tomas acción. <strong>Si no lo reclamas en 48 horas, le pasamos tu descuento a la lista de espera.</strong>
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Big Bottom Action Call */}
        <div className="text-center">
          <button
            onClick={onOpenForm}
            className="group relative inline-flex w-full sm:w-auto items-center justify-center rounded-xl bg-orange-600 hover:bg-orange-500 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white shadow-xl shadow-orange-600/20 transition-all active:scale-95"
          >
            <span className="flex items-center gap-2">
              [Ingresa tus Datos y Aplica a la Beca Completa de IA Ahora]
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </button>
        </div>

      </div>
    </section>
  );
};
