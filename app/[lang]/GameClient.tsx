"use client";

import React, { useState } from "react";
import { MainMenu } from "@/components/MainMenu";
import { GameScreen } from "@/components/GameScreen";
import { Dictionary, GameState } from "@/types/game"; 

interface GameClientProps {
  dict: Dictionary; 
  lang: string;
}

export default function GameClient({ dict }: GameClientProps) {
  const [gameState, setGameState] = useState<GameState>("MENU");

  return (
    <>
      {gameState === "MENU" ? (
        <MainMenu 
          dict={dict.menu} 
          onStart={() => setGameState("GAME")} 
        />
      ) : (
        <GameScreen 
          dict={dict} 
          onQuit={() => setGameState("MENU")} 
        />
      )}
    </>
  );
}