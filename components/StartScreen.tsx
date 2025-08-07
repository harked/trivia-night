
import React, { useState } from 'react';
import { CATEGORIES } from '../constants';
import { StartIcon } from './icons';

interface StartScreenProps {
  onStart: (category: string) => void;
  error: string | null;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart, error }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(CATEGORIES[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStart(selectedCategory);
  };

  return (
    <div className="flex flex-col items-center text-center animate-fade-in">
      <h2 className="text-3xl font-bold text-slate-100 mb-2 font-poppins">Welcome to the Arena!</h2>
      <p className="text-slate-400 mb-8 max-w-md">Choose your battleground and prove your knowledge. The AI Quizmaster awaits.</p>
      
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-6" role="alert">
          <strong className="font-bold">Oops! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-6">
          <label htmlFor="category-select" className="block text-lg font-medium text-slate-300 mb-2">Select a Category</label>
          <div className="relative">
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full px-4 py-3 text-base text-white bg-slate-700/50 border border-slate-600 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 text-lg shadow-lg shadow-purple-600/30"
        >
          <StartIcon />
          Start Game
        </button>
      </form>
    </div>
  );
};

export default StartScreen;
