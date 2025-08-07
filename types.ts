
export interface TriviaQuestion {
  question: string;
  options: string[];
  answer: string;
}

export enum GameState {
  Start = 'START',
  Playing = 'PLAYING',
  GameOver = 'GAMEOVER',
}

export type Player = 1 | 2;
