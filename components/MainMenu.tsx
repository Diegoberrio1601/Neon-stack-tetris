"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { BatteryIndicator } from "./BatteryIndicator";
import { SocialLinks } from "./SocialLinks";

// --- INTERFACES PARA CORREGIR TS ---
interface BatteryManager extends EventTarget {
  level: number;
  addEventListener(type: "levelchange", listener: () => void): void;
}

interface NavigatorWithBattery extends Navigator {
  getBattery?: () => Promise<BatteryManager>;
}

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const itemVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1, opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

interface MainMenuProps {
  onStart: () => void;
  dict: {
    lets: string;
    play: string;
    together: string;
    start: string;
    devBy: string;
    language?: string;
  };
}

export const MainMenu = ({ onStart, dict }: MainMenuProps) => {
  const [batteryLevel, setBatteryLevel] = useState<number>(() => {
    return Math.floor(Math.random() * (98 - 85 + 1)) + 85;
  });

  const router = useRouter();
  const pathname = usePathname();
  const currentLang = pathname.split("/")[1] || "en";

  const toggleLanguage = () => {
    const newLang = currentLang === "en" ? "es" : "en";
    const newPath = pathname.replace(`/${currentLang}`, `/${newLang}`);
    router.push(newPath);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === "Enter") onStart(); };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onStart]);

  useEffect(() => {
    let isMounted = true;
    const nav = navigator as NavigatorWithBattery;
    if (typeof window !== "undefined" && nav.getBattery) {
      nav.getBattery().then((batt) => {
        if (!isMounted) return;
        setBatteryLevel(Math.round(batt.level * 100));
        batt.addEventListener("levelchange", () => {
          if (isMounted) setBatteryLevel(Math.round(batt.level * 100));
        });
      });
    }
    return () => { isMounted = false; };
  }, []);

  return (
    <motion.div
      key="menu"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      // REINSTAURADO: bg-[#3b82f6] (Azul Tetris)
      className="z-10 flex flex-col items-center justify-center w-full h-screen font-mono relative overflow-hidden bg-[#3b82f6]"
    >
      <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
      <style jsx global>{`
        .pixel-text { font-family: 'Press Start 2P', cursive; }
        .retro-grid {
          background-image: radial-gradient(rgba(0,0,0,0.2) 2px, transparent 0);
          background-size: 40px 40px;
          background-position: -19px -19px;
        }
      `}</style>

      {/* EFECTO DE PUNTOS RETRO (OVERLAY) */}
      <div className="absolute inset-0 retro-grid pointer-events-none" />

      {/* HUD SUPERIOR */}
      <nav className="absolute top-10 flex w-full max-w-6xl justify-between px-10 items-start z-20">
        <div className="flex flex-col gap-2 pixel-text">
          <p className="text-[10px] text-black/40 uppercase mb-1">
            {dict.language || (currentLang === "es" ? "Idioma" : "Language")}
          </p>
          <div className="flex gap-4">
            {(['en', 'es'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => { if (currentLang !== lang) toggleLanguage(); }}
                className={`text-[12px] md:text-sm font-bold transition-all px-2 py-1 cursor-pointer ${
                  currentLang === lang 
                  ? "bg-black text-[#facc15] shadow-[4px_4px_0px_rgba(0,0,0,0.2)]" 
                  : "text-black/30 hover:text-black"
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-end gap-4">
          <div className="pixel-text">
            <BatteryIndicator level={batteryLevel} />
          </div>
          <SocialLinks variant="menu" />
        </div>
      </nav>

      {/* TITULO CENTRAL */}
      <div className="flex flex-col items-start gap-8 scale-[0.75] md:scale-100 pixel-text z-20">
        <div className="flex items-center gap-6">
          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-black uppercase text-black">
            {dict.lets}
          </motion.h1>
          <motion.div variants={itemVariants} whileHover={{ scale: 1.05, rotate: -2 }} className="bg-[#facc15] border-[4px] border-black px-6 py-4 shadow-[6px_6px_0px_rgba(0,0,0,1)]">
            <h1 className="text-4xl md:text-6xl font-black uppercase text-black">
              {dict.play}
            </h1>
          </motion.div>
        </div>
        <motion.div variants={itemVariants} whileHover={{ scale: 1.02, rotate: 1 }} className="w-full bg-[#fb923c] border-[4px] border-black py-5 px-10 text-center shadow-[6px_6px_0px_rgba(0,0,0,1)]">
          <h1 className="text-4xl md:text-6xl font-black uppercase text-black">
            {dict.together}
          </h1>
        </motion.div>
      </div>

      {/* FOOTER */}
      <footer className="absolute bottom-10 flex w-full max-w-6xl items-end justify-between px-10 pixel-text z-20">
        <motion.span animate={{ opacity: 0.4 }} className="text-[10px] md:text-sm text-black uppercase tracking-widest">
          {dict.devBy} @DiegoBerrio1601
        </motion.span>
        <motion.button 
          whileTap={{ scale: 0.9 }} 
          whileHover={{ scale: 1.05 }} 
          className="group flex items-center gap-6 text-2xl md:text-4xl font-black text-black cursor-pointer focus:outline-none" 
          onClick={onStart}
        >
          <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }}>
            {dict.start}
          </motion.span>
          <span className="text-4xl md:text-6xl">➔</span>
        </motion.button>
      </footer>
    </motion.div>
  );
};