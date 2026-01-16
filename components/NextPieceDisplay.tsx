"use client";

import React from "react";
import { motion } from "framer-motion";
import { PieceType } from "@/types/game";

interface NextPieceProps {
  nextPiece: {
    shape: number[][];
    color: string;
    type?: PieceType;
  } | null;
}

export const NextPieceDisplay = ({ nextPiece }: NextPieceProps) => {
  // Verificación de seguridad para evitar errores de renderizado si la data es parcial
  if (!nextPiece || !nextPiece.shape || nextPiece.shape.length === 0) {
    return (
      <div className="w-28 h-28 bg-[#1a1a2e]/50 border border-white/10 rounded-2xl mt-4 flex items-center justify-center shadow-inner">
        <motion.div 
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-8 h-8 bg-white/20 blur-[2px] rounded-sm border border-white/40"
        />
      </div>
    );
  }

  return (
    <div className="w-28 h-28 bg-[#1a1a2e]/50 border border-white/10 rounded-2xl mt-4 flex items-center justify-center shadow-inner p-4">
      <div 
        className="grid gap-1" 
        style={{ 
          // Usamos el operador de encadenamiento opcional para asegurar que shape[0] exista
          gridTemplateColumns: `repeat(${nextPiece.shape[0]?.length || 0}, minmax(0, 1fr))` 
        }}
      >
        {nextPiece.shape.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`next-${y}-${x}`}
              className="w-4 h-4 rounded-sm transition-all duration-500"
              style={{
                backgroundColor: cell ? nextPiece.color : "transparent",
                boxShadow: cell ? `0 0 10px ${nextPiece.color}aa` : "none",
                border: cell ? "1px solid rgba(255,255,255,0.2)" : "none"
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};