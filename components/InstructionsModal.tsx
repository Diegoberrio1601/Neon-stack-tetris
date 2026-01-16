"use client";

import React from "react";
import { motion } from "framer-motion";
import { Dictionary } from "@/types/game";

interface InstructionsModalProps {
  onStart: () => void;
  dict: Dictionary; // Tipado estricto
}

export const InstructionsModal = ({ onStart, dict }: InstructionsModalProps) => {
  // Usamos las claves correctas según tu interfaz Dictionary
  const i = dict.instructions;
  const p = dict.pause; // Algunas instrucciones vienen de la sección de pausa en tu JSON

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="absolute inset-0 z-[120] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
    >
      {/* Eliminados link y style jsx: la clase pixel-text ya está en globals.css */}

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-md w-full p-8 border-[4px] border-white/20 bg-black text-center shadow-[0_0_50px_rgba(250,204,21,0.1)] pixel-text"
      >
        <h2 className="text-[#facc15] text-lg font-black mb-10 tracking-widest uppercase">
          {i.title}
        </h2>
        
        <div className="space-y-6 text-white/70 text-[8px] text-left mb-10 uppercase tracking-tighter leading-relaxed">
          <div className="flex justify-between border-b-2 border-white/5 pb-2">
            <span>{i.move}</span>
            <span className="text-white">[ ← → ]</span>
          </div>
          <div className="flex justify-between border-b-2 border-white/5 pb-2">
            <span>{p.softDrop}</span>
            <span className="text-white">[ ↓ ]</span>
          </div>
          <div className="flex justify-between border-b-2 border-white/5 pb-2">
            <span className="text-[#facc15]">{p.hardDrop}</span>
            <span className="text-[#facc15]">[ SPACE ]</span>
          </div>
          <div className="flex justify-between border-b-2 border-white/5 pb-2">
            <span className="text-[#4ade80]">{i.rotate}</span>
            <span className="text-[#4ade80]">[ R ]</span>
          </div>
          <div className="flex justify-between border-b-2 border-white/5 pb-2">
            <span className="text-red-500">{p.restart}</span>
            <span className="text-red-500">[ ESC ]</span>
          </div>
          <div className="flex justify-between border-b-2 border-white/5 pb-2">
            <span>{p.quitMenu}</span>
            <span className="text-white/30">[ Q ]</span>
          </div>
        </div>

        <motion.div
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-white font-bold tracking-widest text-[9px] border-2 border-white/20 py-4 bg-white/5"
        >
          {i.pressEnter}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};