/**
 * Interfaz principal para el sistema de internacionalización (JSON)
 */
export interface Dictionary {
  menu: {
    lets: string;
    play: string;
    together: string;
    start: string;
    devBy: string;
    title?: string;
    options?: string;
    language?: string;
  };
  game: {
    highScore: string;
    maxLines: string;
    currentLines: string;
    currentPoints: string;
    nextPiece: string;
    quit: string;
  };
  pause: {
    title: string;
    controls: string;
    move: string;
    softDrop: string;
    hardDrop: string;
    rotate: string;
    restart: string;
    quitMenu: string;
  };
  gameOver: {
    title: string;
    finalScore: string;
    lines: string;
    retryBtn: string;
    quitHint: string;
  };
  instructions: {
    title: string;
    move: string;
    rotate: string;
    pressEnter: string;
  };
}

/**
 * Estados posibles del flujo de la aplicación
 */
export type GameState = "MENU" | "GAME";

/**
 * Tipos de piezas de Tetris disponibles
 */
export type PieceType = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';

/**
 * Estructura base de un Tetromino constante
 */
export interface TetrominoData {
  shape: number[][];
  color: string;
  type: PieceType;
}

/**
 * Estructura de una pieza activa en el tablero
 */
export interface ActivePiece {
  pos: { 
    x: number; 
    y: number; 
  };
  tetromino: TetrominoData;
}

/**
 * Tipos para la cuadrícula del tablero
 * 0 = Celda vacía
 * string = Color de la pieza que ocupa la celda
 */
export type BoardCell = string | number;
export type GameBoardGrid = BoardCell[][];

/**
 * Interfaz para los componentes que solo necesitan el diccionario
 */
export interface DictComponentProps {
  dict: Dictionary;
}