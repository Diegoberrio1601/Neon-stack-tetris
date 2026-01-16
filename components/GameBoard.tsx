"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GameBoardGrid, ActivePiece, BoardCell } from "@/types/game";

interface GameBoardProps {
  board: GameBoardGrid;
  activePiece: ActivePiece;
  clearingLines?: number[];
}

export const GameBoard = ({ board, activePiece, clearingLines = [] }: GameBoardProps) => {
  // 1. Clonamos el tablero
  const displayBoard: GameBoardGrid = board.map(row => [...row]);
  
  // 2. IMPORTANTE: Solo dibujamos la pieza activa si NO hay una animación de limpieza activa
  // Esto evita puntos fantasma y deformaciones.
  const isAnimatingClear = clearingLines.length > 0;

  if (activePiece && activePiece.tetromino && !isAnimatingClear) {
    activePiece.tetromino.shape.forEach((row: number[], y: number) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          const boardY = y + activePiece.pos.y;
          const boardX = x + activePiece.pos.x;
          if (boardY >= 0 && boardY < 20 && boardX >= 0 && boardX < 10) {
            displayBoard[boardY][boardX] = activePiece.tetromino.color;
          }
        }
      });
    });
  }

  return (
    <div className="relative border-[4px] border-white/10 bg-[#05050a] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
      
      <div className="relative grid grid-cols-10 grid-rows-20 w-[300px] h-[600px]">
        {displayBoard.map((row: BoardCell[], y: number) => {
          const isRowClearing = clearingLines.includes(y);

          return row.map((cell: BoardCell, x: number) => (
            <div key={`${x}-${y}`} className="w-full h-full border-[0.5px] border-white/5 flex items-center justify-center relative">
              {cell !== 0 && typeof cell === "string" && (
                <motion.div 
                  initial={false}
                  // Simplificamos la animación para que sea limpia y no deforme el grid
                  animate={isRowClearing ? { 
                    scale: [1, 1.2, 0],
                    opacity: [1, 1, 0],
                    backgroundColor: "#ffffff",
                  } : {
                    scale: 1,
                    opacity: 1,
                    backgroundColor: cell,
                  }}
                  transition={{ duration: isRowClearing ? 0.25 : 0.1 }}
                  className="w-[85%] h-[85%] rounded-sm z-10 border-t border-l border-white/30"
                  style={{ boxShadow: isRowClearing ? "0 0 20px #fff" : `0 0 15px ${cell}88` }}
                />
              )}
            </div>
          ));
        })}
      </div>
    </div>
  );
};