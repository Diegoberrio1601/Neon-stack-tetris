"use client";

import React from "react";
import { motion } from "framer-motion";
// Importamos la interfaz desde tu archivo central de tipos
import { AudioControllerProps } from "@/types/game";

export const AudioController = ({ isMuted, onToggle }: AudioControllerProps) => {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-4 bg-black/40 p-3 border-b-4 border-r-4 border-black/60 rounded-sm backdrop-blur-sm hover:bg-black/50 transition-all active:translate-y-[2px] active:border-b-2 group"
    >
      <div className="flex flex-col items-start gap-1">
        <span 
          className="text-[10px] font-bold text-white tracking-widest pixel-text uppercase"
          style={{ textShadow: "2px 2px 0px #000" }}
        >
          BGM {isMuted ? "OFF" : "ON"}
        </span>
        <div className="flex gap-1">
          {/* Indicadores de nivel retro */}
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className={`w-2 h-1 ${!isMuted ? 'bg-[#4ade80]' : 'bg-white/20'}`} 
            />
          ))}
        </div>
      </div>

      {/* "Luz LED" indicadora con animación de Framer Motion */}
      <div className="relative flex items-center justify-center">
        <motion.div
          animate={!isMuted ? { opacity: [1, 0.5, 1] } : { opacity: 0.2 }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className={`w-3 h-3 rounded-full ${
            !isMuted 
              ? 'bg-[#4ade80] shadow-[0_0_8px_#4ade80]' 
              : 'bg-red-900'
          }`}
        />
      </div>
    </button>
  );
};