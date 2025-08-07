
import React, { useState, useEffect } from 'react';
import { TriviaQuestion } from '../types';

interface GameScreenProps {
  question: TriviaQuestion;
  onAnswer: (isCorrect: boolean) => void;
  questionNumber: number;
  totalQuestions: number;
  category: string;
}

const GameScreen: React.FC<GameScreenProps> = ({ question, onAnswer, questionNumber, totalQuestions, category }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  useEffect(() => {
    // Reset state when a new question is loaded
    setSelectedAnswer(null);
    setFeedback(null);
  }, [question]);

  const handleAnswerClick = (option: string) => {
    if (selectedAnswer) return; // Prevent changing answer

    const isCorrect = option === question.answer;
    setSelectedAnswer(option);
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    onAnswer(isCorrect);
  };

  const getButtonClass = (option: string) => {
    if (!selectedAnswer) {
      return 'bg-slate-700/50 hover:bg-purple-600/50 border-slate-600';
    }
    if (option === selectedAnswer) {
      return feedback === 'correct' ? 'bg-green-500 border-green-400' : 'bg-red-500 border-red-400';
    }
    if (option === question.answer) {
      return 'bg-green-500/70 border-green-400/70';
    }
    return 'bg-slate-700/50 border-slate-600 opacity-60';
  };

  if (!question) {
    return <div className="text-center">Loading question...</div>;
  }

  return (
    <div className="w-full animate-fade-in">
      <div className="text-center mb-6">
        <p className="text-purple-400 font-semibold">{category}</p>
        <h2 className="text-2xl md:text-3xl font-bold leading-tight my-4" dangerouslySetInnerHTML={{ __html: question.question }} />
        <p className="text-slate-400">Question {questionNumber} of {totalQuestions}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(option)}
            disabled={!!selectedAnswer}
            className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-300 transform ${getButtonClass(option)} ${!selectedAnswer ? 'hover:scale-105' : 'cursor-not-allowed'}`}
          >
            <span className="font-semibold text-lg" dangerouslySetInnerHTML={{ __html: option }} />
          </button>
        ))}
      </div>
       {feedback && (
         <div className="mt-6 text-center text-2xl font-bold animate-fade-in">
           {feedback === 'correct' ? (
             <p className="text-green-400">Correct!</p>
           ) : (
             <div>
                <p className="text-red-400">Incorrect!</p>
                <p className="text-slate-300 text-lg mt-2">The correct answer was: <span className="text-green-400" dangerouslySetInnerHTML={{ __html: question.answer }}/></p>
             </div>
           )}
         </div>
       )}
    </div>
  );
};

export default GameScreen;
