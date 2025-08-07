
import React from 'react';
import { TrophyIcon, RestartIcon } from './icons';

interface GameOverScreenProps {
  scores: { player1: number; player2: number };
  onRestart: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ scores, onRestart }) => {
  const winner = scores.player1 > scores.player2 ? 'Player 1' : scores.player2 > scores.player1 ? 'Player 2' : 'It\'s a Tie!';
  const winnerScore = Math.max(scores.player1, scores.player2);

  return (
    <div className="text-center animate-fade-in">
      <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-4 font-poppins">Game Over!</h2>
      <div className="flex justify-center items-center gap-2 text-2xl text-yellow-300 mb-8">
        <TrophyIcon />
        {winner !== 'It\'s a Tie!' ? 
            <p><span className="font-bold">{winner}</span> wins with {winnerScore} points!</p> :
            <p className="font-bold">{winner}</p>
        }
      </div>
      <div className="bg-slate-700/50 rounded-lg p-6 mb-8 flex justify-around items-center">
        <div>
          <p className="text-lg text-slate-400">Player 1</p>
          <p className="text-3xl font-bold text-purple-400">{scores.player1}</p>
        </div>
        <div className="border-l-2 border-slate-600 h-16"></div>
        <div>
          <p className="text-lg text-slate-400">Player 2</p>
          <p className="text-3xl font-bold text-pink-500">{scores.player2}</p>
        </div>
      </div>
      <button
        onClick={onRestart}
        className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 text-lg shadow-lg shadow-purple-600/30"
      >
        <RestartIcon />
        Play Again
      </button>
    </div>
  );
};

export default GameOverScreen;
