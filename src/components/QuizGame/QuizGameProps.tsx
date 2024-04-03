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
