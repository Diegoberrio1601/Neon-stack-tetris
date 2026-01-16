export const TETROMINOS = {
  S: { shape: [[0, 1, 1], [1, 1, 0]], color: "#4ade80" }, // Verde
  J: { shape: [[1, 0, 0], [1, 1, 1]], color: "#3b82f6" }, // Azul
  T: { shape: [[0, 1, 0], [1, 1, 1]], color: "#a855f7" }, // Morado
  I: { shape: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]], color: "#22d3ee" }, // Cian
  O: { shape: [[1, 1], [1, 1]], color: "#facc15" },      // Amarillo
  L: { shape: [[0, 0, 1], [1, 1, 1]], color: "#fb923c" }, // Naranja
  Z: { shape: [[1, 1, 0], [0, 1, 1]], color: "#ef4444" }, // Rojo
};

export const randomTetromino = () => {
  const keys = Object.keys(TETROMINOS) as (keyof typeof TETROMINOS)[];
  const randKey = keys[Math.floor(Math.random() * keys.length)];
  return TETROMINOS[randKey];
};