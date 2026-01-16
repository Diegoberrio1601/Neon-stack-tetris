"use client";

import React from "react";
import { motion } from "framer-motion";
import { Dictionary } from "@/types/game";

interface PauseMenuProps {
  dict: Dictionary; // Cambiado de any a Dictionary
}

export const PauseMenu = ({ dict }: PauseMenuProps) => {
  // Acceso seguro a la sección pause del diccionario
  const p = dict.pause;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-[#1a1a2e] border-4 border-[#facc15] p-10 rounded-lg shadow-[0_0_40px_rgba(250,204,21,0.3)] text-center max-w-2xl w-auto min-w-[450px] mx-4"
      >
        <h2 className="text-[#facc15] text-4xl font-black mb-10 animate-pulse pixel-text tracking-tighter">
          {p.title}
        </h2>
        
        <div className="text-white/80 space-y-5 text-left font-mono text-[12px] uppercase tracking-widest border-t border-white/10 pt-8 pixel-text">
          <p className="text-center text-[#4ade80] mb-6 font-bold opacity-70">
            {p.controls}
          </p>
          
          <div className="flex justify-between items-center gap-20 border-b border-white/5 pb-2 whitespace-nowrap">
            <span className="text-white/50">{p.move}</span>
            <span className="text-white">← →</span>
          </div>
          
          <div className="flex justify-between items-center gap-20 border-b border-white/5 pb-2 whitespace-nowrap">
            <span className="text-white/50">{p.softDrop}</span>
            <span className="text-white">↓</span>
          </div>
          
          <div className="flex justify-between items-center gap-20 border-b border-white/5 pb-2 whitespace-nowrap">
            <span className="text-[#facc15] font-bold">{p.hardDrop}</span>
            <span className="text-[#facc15] font-bold">[ SPACE ]</span>
          </div>
          
          <div className="flex justify-between items-center gap-20 border-b border-white/5 pb-2 whitespace-nowrap">
            <span className="text-white/50">{p.rotate}</span>
            <span className="text-[#4ade80]">[ R ]</span>
          </div>
          
          <div className="flex justify-between items-center gap-20 border-b border-white/5 pb-2 whitespace-nowrap">
            <span className="text-white/50">{p.restart}</span>
            <span className="text-red-400">[ ESC ]</span>
          </div>
          
          <div className="flex justify-between items-center gap-20 pt-6 text-red-500 whitespace-nowrap">
            <span className="font-bold">{p.quitMenu}</span>
            <span>[ Q ]</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};