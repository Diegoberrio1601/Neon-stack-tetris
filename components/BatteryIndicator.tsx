"use client";

import React, { useSyncExternalStore } from "react";
import { motion } from "framer-motion";

interface BatteryProps {
  level: number;
}

// Suscriptor simple para saber si estamos en el cliente
const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export const BatteryIndicator = ({ level }: BatteryProps) => {
  // Esta es la forma moderna de evitar problemas de hidratación sin causar renders en cascada
  const isMounted = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const getBatteryColor = () => {
    if (level > 60) return "#4ade80"; 
    if (level > 25) return "#facc15"; 
    return "#ef4444"; 
  };

  const blocks = Math.floor(level / 10);

  // Si no está montado (SSR), devolvemos el placeholder
  if (!isMounted) {
    return (
      <div className="flex items-center gap-4 bg-black/40 p-3 border-b-4 border-r-4 border-black/60 rounded-sm backdrop-blur-sm opacity-0">
        <span className="text-[10px] pixel-text">PWR:--%</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 bg-black/40 p-3 border-b-4 border-r-4 border-black/60 rounded-sm backdrop-blur-sm">
      <span 
        className="text-[10px] font-bold text-white tracking-widest pixel-text"
        style={{ textShadow: "2px 2px 0px #000" }}
      >
        PWR:{level}%
      </span>
      
      <div className="relative flex items-center">
        <div className="relative h-7 w-16 border-[3px] border-black bg-[#1a1a1a] p-[2px] shadow-[2px_2px_0px_rgba(255,255,255,0.1)]">
          <div className="flex h-full w-full gap-[1px]">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: i < blocks ? 1 : 0.2 }}
                transition={{ delay: i * 0.05 }}
                className="h-full w-full"
                style={{ 
                  backgroundColor: i < blocks ? getBatteryColor() : "#333",
                  boxShadow: i < blocks ? `inset 1px 1px 0px rgba(255,255,255,0.5)` : "none"
                }}
              />
            ))}
          </div>
        </div>
        <div className="w-1.5 h-3 bg-black border-y-[1px] border-r-[3px] border-black" />
      </div>

      <motion.div 
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="w-2 h-2 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.5)]"
        style={{ backgroundColor: getBatteryColor() }}
      />
    </div>
  );
};