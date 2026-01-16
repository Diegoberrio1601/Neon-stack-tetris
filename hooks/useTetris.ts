"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { 
  ActivePiece, 
  GameBoardGrid, 
  PieceType,
  TetrominoData 
} from "@/types/game";

export const TETROMINOS: Record<PieceType, TetrominoData> = {
  S: { shape: [[0, 1, 1], [1, 1, 0]], color: "#4ade80", type: 'S' },
  J: { shape: [[1, 0, 0], [1, 1, 1]], color: "#3b82f6", type: 'J' },
  T: { shape: [[0, 1, 0], [1, 1, 1]], color: "#a855f7", type: 'T' },
  I: { shape: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]], color: "#22d3ee", type: 'I' },
  O: { shape: [[1, 1], [1, 1]], color: "#facc15", type: 'O' },
  L: { shape: [[0, 0, 1], [1, 1, 1]], color: "#fb923c", type: 'L' },
  Z: { shape: [[1, 1, 0], [0, 1, 1]], color: "#ef4444", type: 'Z' },
};

const getRandomTetromino = (): TetrominoData => {
  const keys = Object.keys(TETROMINOS) as PieceType[];
  const randKey = keys[Math.floor(Math.random() * keys.length)];
  return TETROMINOS[randKey];
};

export const useTetris = (onQuit?: () => void, isEnabled: boolean = false) => {
  const [score, setScore] = useState(0);
  const [rowsCleared, setRowsCleared] = useState(0);
  const [board, setBoard] = useState<GameBoardGrid>(
    Array.from({ length: 20 }, () => Array(10).fill(0))
  );
  const [nextPiece, setNextPiece] = useState<TetrominoData>(getRandomTetromino());
  const [isPaused, setIsPaused] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isDropping, setIsDropping] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [clearingLines, setClearingLines] = useState<number[]>([]);

  const [activePiece, setActivePiece] = useState<ActivePiece>({
    pos: { x: 3, y: 0 },
    tetromino: getRandomTetromino(),
  });

  const pieceRef = useRef(activePiece);
  const boardRef = useRef(board);
  const isPausedRef = useRef(isPaused);
  const isDroppingRef = useRef(isDropping);
  const gameOverRef = useRef(false);
  const isEnabledRef = useRef(isEnabled);

  useEffect(() => { pieceRef.current = activePiece; }, [activePiece]);
  useEffect(() => { boardRef.current = board; }, [board]);
  useEffect(() => { isPausedRef.current = isPaused; }, [isPaused]);
  useEffect(() => { isDroppingRef.current = isDropping; }, [isDropping]);
  useEffect(() => { gameOverRef.current = gameOver; }, [gameOver]);
  useEffect(() => { isEnabledRef.current = isEnabled; }, [isEnabled]);

  const checkCollision = useCallback((
    pos: { x: number; y: number }, 
    shape: number[][], 
    currentBoard: GameBoardGrid
  ): boolean => {
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x] !== 0) {
          const nextY = y + pos.y;
          const nextX = x + pos.x;
          if (
            nextY >= 20 || 
            nextX < 0 || 
            nextX >= 10 || 
            (currentBoard[nextY] && currentBoard[nextY][nextX] !== 0)
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }, []);

  const resetPiece = useCallback((next: TetrominoData) => {
    if (checkCollision({ x: 3, y: 0 }, next.shape, boardRef.current)) {
      setGameOver(true);
      gameOverRef.current = true;
      return;
    }
    const newPiece: ActivePiece = { pos: { x: 3, y: 0 }, tetromino: next };
    setActivePiece(newPiece);
    pieceRef.current = newPiece;
    setNextPiece(getRandomTetromino());
    setIsDropping(false);
  }, [checkCollision]);

  const lockPiece = useCallback(() => {
    const currentPiece = pieceRef.current;
    const currentBoard = boardRef.current;
    const newBoard: GameBoardGrid = currentBoard.map(row => [...row]);

    currentPiece.tetromino.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          const boardY = y + currentPiece.pos.y;
          const boardX = x + currentPiece.pos.x;
          if (boardY >= 0 && boardY < 20) {
            newBoard[boardY][boardX] = currentPiece.tetromino.color;
          }
        }
      });
    });

    const completedRows: number[] = [];
    newBoard.forEach((row, y) => {
      if (row.every(cell => cell !== 0)) completedRows.push(y);
    });

    if (completedRows.length > 0) {
      setClearingLines(completedRows);
      setIsDropping(true);

      setTimeout(() => {
        let lines = 0;
        const filtered = newBoard.reduce((acc, row) => {
          if (row.every(cell => cell !== 0)) {
            lines++;
            acc.unshift(Array(10).fill(0));
            return acc;
          }
          acc.push(row);
          return acc;
        }, [] as GameBoardGrid);

        setScore(s => s + (lines * 100));
        setRowsCleared(r => r + lines);
        setBoard(filtered);
        setClearingLines([]);
        setIsDropping(false);
        resetPiece(nextPiece);
      }, 250);
    } else {
      setBoard(newBoard);
      resetPiece(nextPiece);
    }
  }, [nextPiece, resetPiece]);

  const movePiece = useCallback((dir: { x: number; y: number }): boolean => {
    if (!isEnabledRef.current || isPausedRef.current || isDroppingRef.current || gameOverRef.current) return false;
    
    if (!checkCollision(
      { x: pieceRef.current.pos.x + dir.x, y: pieceRef.current.pos.y + dir.y }, 
      pieceRef.current.tetromino.shape,
      boardRef.current
    )) {
      setActivePiece(prev => ({ ...prev, pos: { x: prev.pos.x + dir.x, y: prev.pos.y + dir.y } }));
      return true;
    } else {
      if (dir.y > 0) lockPiece();
      return false;
    }
  }, [checkCollision, lockPiece]);

  const hardDrop = useCallback(() => {
    if (!isEnabledRef.current || isPausedRef.current || isDroppingRef.current || gameOverRef.current) return;
    setIsDropping(true);
    let currentY = pieceRef.current.pos.y;
    const fastInterval = setInterval(() => {
      if (!checkCollision({ x: pieceRef.current.pos.x, y: currentY + 1 }, pieceRef.current.tetromino.shape, boardRef.current)) {
        currentY++;
        setActivePiece(prev => ({ ...prev, pos: { ...prev.pos, y: currentY } }));
      } else {
        clearInterval(fastInterval);
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 150);
        lockPiece();
      }
    }, 15);
  }, [checkCollision, lockPiece]);

  const rotatePiece = useCallback(() => {
    if (!isEnabledRef.current || isPausedRef.current || isDroppingRef.current || gameOverRef.current) return;
    const shape = pieceRef.current.tetromino.shape;
    const rotated = shape[0].map((_, i) => shape.map(col => col[i])).map(row => row.reverse());
    let offset = 0;
    if (checkCollision(pieceRef.current.pos, rotated, boardRef.current)) {
      offset = 1;
      if (checkCollision({ x: pieceRef.current.pos.x + offset, y: pieceRef.current.pos.y }, rotated, boardRef.current)) {
        offset = -1;
        if (checkCollision({ x: pieceRef.current.pos.x + offset, y: pieceRef.current.pos.y }, rotated, boardRef.current)) return;
      }
    }
    setActivePiece(prev => ({ 
      ...prev, 
      pos: { x: prev.pos.x + offset, y: prev.pos.y }, 
      tetromino: { ...prev.tetromino, shape: rotated } 
    }));
  }, [checkCollision]);

  const restartGame = useCallback(() => {
    const emptyBoard: GameBoardGrid = Array.from({ length: 20 }, () => Array(10).fill(0));
    setBoard(emptyBoard);
    boardRef.current = emptyBoard;
    setScore(0);
    setRowsCleared(0);
    setGameOver(false);
    gameOverRef.current = false;
    setIsPaused(false);
    isPausedRef.current = false;
    const firstPiece = getRandomTetromino();
    setActivePiece({ pos: { x: 3, y: 0 }, tetromino: firstPiece });
    setNextPiece(getRandomTetromino());
    setIsDropping(false);
    setClearingLines([]);
  }, []);

  useEffect(() => {
    const dropInterval = setInterval(() => {
      if (isEnabledRef.current && !isPausedRef.current && !isDroppingRef.current && !gameOverRef.current) {
        movePiece({ x: 0, y: 1 });
      }
    }, 800);
    return () => clearInterval(dropInterval);
  }, [movePiece]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isEnabledRef.current) return;
      if (e.key === "Enter") { 
        if (gameOverRef.current) restartGame(); else setIsPaused(p => !p); 
        return; 
      }
      if (e.key === "Escape") { restartGame(); return; }
      if (e.key.toLowerCase() === "q") { if (onQuit) onQuit(); return; }
      if (isPausedRef.current || gameOverRef.current) return;
      if (e.key === "ArrowLeft") movePiece({ x: -1, y: 0 });
      if (e.key === "ArrowRight") movePiece({ x: 1, y: 0 });
      if (e.key === "ArrowDown") movePiece({ x: 0, y: 1 });
      if (e.key === " ") { e.preventDefault(); hardDrop(); }
      if (e.key.toLowerCase() === "r") rotatePiece();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [movePiece, hardDrop, rotatePiece, restartGame, onQuit]);

  return { board, activePiece, score, rowsCleared, nextPiece, isPaused, isShaking, gameOver, restartGame, clearingLines };
};