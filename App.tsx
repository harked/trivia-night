
import React, { useState, useCallback } from 'react';
import { GameState, TriviaQuestion, Player } from './types';
import { generateTriviaQuestions } from './services/geminiService';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import GameOverScreen from './components/GameOverScreen';
import Scoreboard from './components/Scoreboard';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Start);
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [currentPlayer, setCurrentPlayer] = useState<Player>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const startGame = useCallback(async (category: string) => {
    setLoading(true);
    setError(null);
    setScores({ player1: 0, player2: 0 });
    setCurrentQuestionIndex(0);
    setCurrentPlayer(1);
    setSelectedCategory(category);

    try {
      const newQuestions = await generateTriviaQuestions(category, 10);
      if (newQuestions.length === 0) {
        throw new Error("Failed to generate questions. The category might be too specific. Please try another one.");
      }
      setQuestions(newQuestions);
      setGameState(GameState.Playing);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setGameState(GameState.Start);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScores(prevScores => ({
        ...prevScores,
        [`player${currentPlayer}`]: prevScores[`player${currentPlayer}`] + 10,
      }));
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setCurrentPlayer(prevPlayer => (prevPlayer === 1 ? 2 : 1));
      } else {
        setGameState(GameState.GameOver);
      }
    }, 2000); // 2-second delay to show feedback
  };

  const restartGame = () => {
    setGameState(GameState.Start);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScores({ player1: 0, player2: 0 });
  };

  const renderContent = () => {
    if (loading) {
      return <LoadingSpinner message={`Generating ${selectedCategory} questions...`} />;
    }

    switch (gameState) {
      case GameState.Playing:
        return (
          <GameScreen
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            category={selectedCategory}
          />
        );
      case GameState.GameOver:
        return <GameOverScreen scores={scores} onRestart={restartGame} />;
      case GameState.Start:
      default:
        return <StartScreen onStart={startGame} error={error} />;
    }
  };

  return (
    <div className="bg-slate-900 text-white min-h-screen flex flex-col items-center justify-center p-4 font-inter">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-extrabold font-poppins text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Trivia Night
          </h1>
        </header>
        <main className="bg-slate-800 rounded-2xl shadow-2xl shadow-purple-500/10 p-6 md:p-10 relative">
          {gameState !== GameState.Start && <Scoreboard scores={scores} currentPlayer={currentPlayer} />}
          {renderContent()}
        </main>
        <footer className="text-center mt-8 text-slate-500 text-sm">
          <p>Questions are AI-generated and may not always be accurate.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
