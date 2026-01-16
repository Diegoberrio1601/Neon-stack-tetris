"use client";

import React from "react";
import { motion } from "framer-motion";
import { Dictionary } from "@/types/game";

interface GameOverScreenProps {
  score: number;
  lines: number;
  onRestart: () => void;
  dict: Dictionary; // Cambiado de any a Dictionary
}

export const GameOverScreen = ({ score, lines, onRestart, dict }: GameOverScreenProps) => {
  // Ahora TypeScript sabe exactamente qué propiedades tiene dict.gameOver
  const g = dict.gameOver;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-[110] flex items-center justify-center bg-red-950/90 backdrop-blur-xl"
    >
      {/* Eliminamos el link y el style jsx, ya se cargan globalmente */}

      <motion.div 
        initial={{ scale: 0.5, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        className="bg-black border-4 border-red-600 p-10 rounded-none shadow-[0_0_50px_rgba(220,38,38,0.5)] text-center min-w-[500px] max-w-2xl pixel-text"
      >
        <h2 className="text-red-600 text-4xl font-black mb-4 italic tracking-tighter uppercase whitespace-nowrap">
          {g.title}
        </h2>
        
        <div className="h-1.5 w-full bg-red-600 mb-8" />
        
        <div className="space-y-8 mb-10">
          {/* SECCIÓN PUNTOS */}
          <div>
            <p className="text-white/40 text-[9px] uppercase tracking-widest mb-3 whitespace-nowrap">
              {g.finalScore}
            </p>
            <p className="text-white text-4xl font-black tracking-tighter">
              {score.toLocaleString()}
            </p>
          </div>

          {/* SECCIÓN LÍNEAS */}
          <div>
            <p className="text-white/40 text-[9px] uppercase tracking-widest mb-3 whitespace-nowrap">
              {g.lines}
            </p>
            <p className="text-blue-400 text-4xl font-black tracking-tighter">
              {lines}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <button 
            onClick={onRestart}
            className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-5 px-8 rounded-none transition-all uppercase tracking-widest text-[11px] cursor-pointer"
          >
            {g.retryBtn}
          </button>
          
          <p className="text-red-600/50 text-[9px] uppercase font-bold tracking-widest whitespace-nowrap">
            {g.quitHint}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};