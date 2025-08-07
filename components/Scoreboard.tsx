
import React from 'react';
import { Player } from '../types';

interface ScoreboardProps {
  scores: { player1: number; player2: number };
  currentPlayer: Player;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ scores, currentPlayer }) => {
  const player1Classes = `px-6 py-2 rounded-lg transition-all duration-300 ${currentPlayer === 1 ? 'bg-purple-600 shadow-lg shadow-purple-600/30' : 'bg-slate-700'}`;
  const player2Classes = `px-6 py-2 rounded-lg transition-all duration-300 ${currentPlayer === 2 ? 'bg-pink-600 shadow-lg shadow-pink-600/30' : 'bg-slate-700'}`;

  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 px-4 py-2 rounded-full border-2 border-slate-700 flex items-center gap-4 md:gap-8 text-white">
      <div className={player1Classes}>
        <span className="text-sm font-medium text-slate-300">Player 1: </span>
        <span className="font-bold text-lg">{scores.player1}</span>
      </div>
      <div className={player2Classes}>
        <span className="text-sm font-medium text-slate-300">Player 2: </span>
        <span className="font-bold text-lg">{scores.player2}</span>
      </div>
    </div>
  );
};

export default Scoreboard;
