"use client";

import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Github, Instagram } from "lucide-react";

interface SocialLinksProps {
  colorClass?: string;
  variant?: "menu" | "game"; // Añadido para mantener consistencia con tus otros componentes
}

export const SocialLinks = ({ colorClass = "text-white/50" }: SocialLinksProps) => {
  const links = [
    { url: "https://github.com/Diegoberrio1601", icon: <Github size={20} /> },
    { url: "https://www.linkedin.com/in/diegoberrio1601/", icon: <Linkedin size={20} /> },
    { url: "https://www.instagram.com/diegoberrio1601/", icon: <Instagram size={20} /> },
  ];

  return (
    <motion.div 
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ delay: 1, type: "spring" }}
      className="fixed left-0 top-1/2 -translate-y-1/2 flex flex-col gap-6 bg-[#1a1a1a] border-[4px] border-l-0 border-black p-4 rounded-r-xl shadow-[4px_4px_0px_rgba(0,0,0,0.3)] backdrop-blur-md z-[60]"
    >
      {/* Tornillos Decorativos Retro */}
      <div className="absolute top-2 right-2 w-1 h-1 bg-white/20 rounded-full shadow-[1px_1px_0px_black]" />
      <div className="absolute bottom-2 right-2 w-1 h-1 bg-white/20 rounded-full shadow-[1px_1px_0px_black]" />

      {links.map((link, index) => (
        <motion.a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ 
            scale: 1.2, 
            x: 8, 
            color: "#facc15",
            filter: "drop-shadow(0px 0px 8px #facc15)" 
          }}
          whileTap={{ scale: 0.9, x: 2 }}
          className={`${colorClass} transition-all duration-200 flex items-center justify-center`}
        >
          {/* Contenedor del icono con un ligero efecto de profundidad */}
          <div className="hover:drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            {link.icon}
          </div>
        </motion.a>
      ))}

      {/* Etiqueta lateral vertical (Estilo Cartucho) */}
      <div className="absolute -right-1 top-1/2 -translate-y-1/2 translate-x-full bg-black px-1 py-2 rounded-r-md">
        <p className="text-[6px] text-white/30 [writing-mode:vertical-lr] uppercase tracking-tighter font-mono">
          Connect
        </p>
      </div>
    </motion.div>
  );
};