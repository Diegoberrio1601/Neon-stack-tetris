// "use client";

// import React from "react";
// import { motion } from "framer-motion";

// const TETROMINOS = [
//   { shape: [[0, 1, 1], [1, 1, 0]], color: "#4ade80" }, // Verde S
//   { shape: [[1, 0, 0], [1, 1, 1]], color: "#3b82f6" }, // Azul J
//   { shape: [[0, 1, 0], [1, 1, 1]], color: "#a855f7" }, // Morado T
//   { shape: [[1, 1, 1, 1]], color: "#22d3ee" },         // Cian I
//   { shape: [[1, 1], [1, 1]], color: "#facc15" },      // Amarillo O
//   { shape: [[0, 0, 1], [1, 1, 1]], color: "#fb923c" }, // Naranja L
//   { shape: [[1, 1, 0], [0, 1, 1]], color: "#ef4444" }, // Rojo Z
// ];

// // Sub-componente definido como función estándar
// const FallingPiece = ({ delay, x }: { delay: number; x: string }) => {
//   // Usamos el delay para elegir una pieza de forma consistente
//   const pieceIndex = Math.abs(Math.floor(delay)) % TETROMINOS.length;
//   const piece = TETROMINOS[pieceIndex];

//   return (
//     <motion.div
//       initial={{ y: "-20vh", opacity: 0, rotate: 0 }}
//       animate={{ 
//         y: "110vh", 
//         opacity: [0, 1, 1, 0], 
//         rotate: [0, 90, 180, 270, 360] 
//       }}
//       transition={{ 
//         duration: 15 + (delay % 5), 
//         repeat: Infinity, 
//         delay: delay, 
//         ease: "linear" 
//       }}
//       className="absolute pointer-events-none select-none"
//       style={{ left: x }}
//     >
//       <div 
//         className="grid gap-0.5" 
//         style={{ 
//           gridTemplateColumns: `repeat(${piece.shape[0].length}, 1fr)`,
//           filter: "drop-shadow(2px 2px 0px rgba(0,0,0,0.5))"
//         }}
//       >
//         {piece.shape.flat().map((cell, i) => (
//           <div
//             key={`cell-${i}`}
//             className={`w-4 h-4 md:w-6 md:h-6 ${
//               cell ? "border-[1.5px] border-black/30" : "bg-transparent"
//             }`}
//             style={{ 
//               backgroundColor: cell ? piece.color : "transparent",
//               boxShadow: cell ? "inset 2px 2px 0px rgba(255,255,255,0.3)" : "none"
//             }}
//           />
//         ))}
//       </div>
//     </motion.div>
//   );
// };

// // Exportación directa sin HOCs complicados para Turbopack
// export function TetrisBackground() {
//   const positions = ["5%", "15%", "25%", "35%", "50%", "65%", "75%", "85%", "95%"];

//   return (
//     <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20" style={{ zIndex: 0 }}>
//       {positions.map((pos, index) => (
//         <FallingPiece key={`bg-piece-${index}`} x={pos} delay={index * 2.5} />
//       ))}
//     </div>
//   );
// }