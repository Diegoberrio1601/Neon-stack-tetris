"use client";

import React, { useState, useEffect, useRef } from "react";
import { MainMenu } from "@/components/MainMenu";
import { GameScreen } from "@/components/GameScreen";

// Importamos los tipos centralizados
import { Dictionary, GameState } from "@/types/game"; 
import { AudioController } from "@/components/AudioController";


interface GameClientProps {
  dict: Dictionary; 
  lang: string;
}

export default function GameClient({ dict, lang }: GameClientProps) {
  const [gameState, setGameState] = useState<GameState>("MENU");
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Sincronización del estado de Mute con el elemento HTMLAudio
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.pause();
    } else {
      // Intentamos reproducir con manejo de errores para navegadores
      audio.play().catch((err) => {
        console.warn("Audio play blocked o no encontrado:", err);
      });
    }
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const handleStartGame = () => {
    setGameState("GAME");
    // Al hacer clic en START, aprovechamos la interacción para activar audio
    if (!isMuted && audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#05050a]">
      {/* Audio nativo apuntando a la raíz pública */}
      <audio
        ref={audioRef}
        src="/sounds/tetrisgameboy1-gameboy.mp3"
        loop
        preload="auto"
        muted={isMuted}
      />

      {/* Control de Audio con tipos vinculados */}
      <div className="absolute top-32 right-10 z-[100] pixel-text">
        <AudioController isMuted={isMuted} onToggle={toggleMute} />
      </div>

      {gameState === "MENU" ? (
        <MainMenu 
          dict={dict.menu} 
          onStart={handleStartGame} 
        />
      ) : (
        <GameScreen 
          dict={dict} 
          onQuit={() => setGameState("MENU")} 
        />
      )}
    </div>
  );
}