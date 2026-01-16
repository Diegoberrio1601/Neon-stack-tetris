"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GameBoard } from "./GameBoard";
import { useTetris } from "@/hooks/useTetris";
import { NextPieceDisplay } from "./NextPieceDisplay";
import { PauseMenu } from "./PauseMenu";
import { GameOverScreen } from "./GameOverScreen";
import { InstructionsModal } from "./InstructionsModal";
import { SocialLinks } from "./SocialLinks";
import { Dictionary } from "@/types/game";

interface GameScreenProps {
  onQuit: () => void;
  dict: Dictionary;
}

export const GameScreen = ({ onQuit, dict }: GameScreenProps) => {
  const [hasStarted, setHasStarted] = useState(false);

  // Inicialización de récords
  const [highScore, setHighScore] = useState<number>(() => {
    if (typeof window !== "undefined") {
      return Number(localStorage.getItem("tetrisHighScore")) || 0;
    }
    return 0;
  });

  const [maxLines, setMaxLines] = useState<number>(() => {
    if (typeof window !== "undefined") {
      return Number(localStorage.getItem("tetrisMaxLines")) || 0;
    }
    return 0;
  });

  const g = dict.game;
  
  const { 
    board, activePiece, score, rowsCleared, nextPiece, 
    isPaused, isShaking, gameOver, restartGame, clearingLines 
  } = useTetris(onQuit, hasStarted);

  // 1. Sincronización con LocalStorage (Sin actualizar estados de React aquí para evitar cascadas)
  useEffect(() => {
    if (gameOver) {
      const savedScore = Number(localStorage.getItem("tetrisHighScore")) || 0;
      const savedLines = Number(localStorage.getItem("tetrisMaxLines")) || 0;

      if (score > savedScore) {
        localStorage.setItem("tetrisHighScore", score.toString());
      }
      if (rowsCleared > savedLines) {
        localStorage.setItem("tetrisMaxLines", rowsCleared.toString());
      }
    }
  }, [gameOver, score, rowsCleared]);

  // Valores derivados para la UI
  const displayHighScore = Math.max(score, highScore);
  const displayMaxLines = Math.max(rowsCleared, maxLines);

  useEffect(() => {
    const handleStart = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !hasStarted) setHasStarted(true);
    };
    window.addEventListener("keydown", handleStart);
    return () => window.removeEventListener("keydown", handleStart);
  }, [hasStarted]);

  // Actualizar estados locales solo al reiniciar
  const handleRestart = () => {
    if (score > highScore) setHighScore(score);
    if (rowsCleared > maxLines) setMaxLines(rowsCleared);
    restartGame();
  };

  // Estilos base
  const labelStyle = "text-cyan-400 font-bold uppercase tracking-[0.25em] text-[12px] mb-1 pixel-text drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]";
  const pixelValueStyle = "text-4xl text-white tracking-tighter pixel-text drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]";
  const containerStyle = "bg-[#0f0f1a]/80 border-2 border-white/10 p-6 backdrop-blur-sm shadow-xl";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-20 bg-[#05050a] p-6 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-[60] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />

      <AnimatePresence mode="wait">
        {!hasStarted && <InstructionsModal onStart={() => setHasStarted(true)} dict={dict} />}
        {hasStarted && isPaused && !gameOver && <PauseMenu key="pause-menu" dict={dict} />}
        {gameOver && (
          <GameOverScreen 
            key="game-over" 
            score={score} 
            lines={rowsCleared} 
            onRestart={handleRestart} 
            dict={dict} 
          />
        )}
      </AnimatePresence>

      {/* PANEL IZQUIERDO: RECORDS (Ajustado para simetría) */}
      <div className="flex flex-col gap-10 order-2 md:order-1 w-full md:w-64">
        <div className={`${containerStyle} flex flex-col items-center md:items-start`}>
          <p className={`${labelStyle} w-full text-center md:text-left`}>{g.highScore}</p>
          <p className={`${pixelValueStyle} text-yellow-400`}>
            {displayHighScore.toLocaleString()}
          </p>
        </div>
        <div className={`${containerStyle} flex flex-col items-center md:items-start`}>
          <p className={`${labelStyle} w-full text-center md:text-left`}>{g.maxLines}</p>
          <p className={`${pixelValueStyle} text-blue-400`}>
            {displayMaxLines.toLocaleString()}
          </p>
        </div>
        <div className="mt-auto hidden md:block opacity-30 hover:opacity-100 transition-opacity">
          <SocialLinks variant="game" />
        </div>
      </div>

      {/* CENTRO: TABLERO */}
      <motion.div 
        animate={isShaking ? { x: [-5, 5, -5, 5, 0] } : {}}
        transition={{ duration: 0.15 }}
        className={`relative order-1 md:order-2 transition-all duration-500 ${
          (!hasStarted || isPaused || gameOver) ? 'scale-95 blur-md grayscale' : 'scale-100'
        }`}
      >
        <div className="absolute -inset-4 border-[6px] border-white/5 pointer-events-none" />
        <div className="absolute -inset-1 border-2 border-cyan-500/20 animate-pulse pointer-events-none" />
        <GameBoard board={board} activePiece={activePiece} clearingLines={clearingLines} />
      </motion.div>

      {/* PANEL DERECHO: STATUS ACTUAL (Arreglado el problema de la foto) */}
      <div className="flex flex-col gap-6 order-3 w-full md:w-64">
        <div className={`${containerStyle} flex flex-col items-center md:items-end`}>
          <p className={`${labelStyle} w-full text-center md:text-right`}>{g.nextPiece}</p>
          <div className="h-28 flex items-center justify-center">
             <NextPieceDisplay nextPiece={nextPiece} /> 
          </div>
        </div>

        <div className={`${containerStyle} flex flex-col gap-8`}>
          <div className="w-full flex flex-col items-center md:items-end text-center md:text-right">
            <p className={`${labelStyle} w-full`}>{g.currentLines}</p>
            <p className="text-4xl text-white pixel-text leading-none">{rowsCleared}</p>
          </div>
          <div className="w-full flex flex-col items-center md:items-end text-center md:text-right">
            <p className={`${labelStyle} w-full`}>{g.currentPoints}</p>
            <p className="text-4xl text-emerald-400 pixel-text leading-none">{score.toLocaleString()}</p>
          </div>
        </div>

        <button 
          onClick={onQuit} 
          className="w-full py-4 bg-red-950/20 border-2 border-red-500/40 text-red-500 hover:bg-red-600 hover:text-white transition-all pixel-text text-[10px] cursor-pointer uppercase tracking-widest"
        >
          {g.quit}
        </button>
      </div>
    </motion.div>
  );
};