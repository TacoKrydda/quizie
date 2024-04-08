import { MutableRefObject } from "react";

export interface QuizGameHomeProps {
  refreshed: boolean;
  setRefreshed: (refresh: boolean) => void;
}

export interface QuizGameProps {
  totalScore: number;
  setTotalScore: (score: number) => void;
}

export interface QuestionProps {
  question: string;
  image: string;
  options: string[];
  correctAnswer: string;
}

export interface QuizGameEndProps {
  totalScore: number;
}
