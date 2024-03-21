export interface QuizGameProps {
  question: string;
  image: string;
  options: string[];
  correctAnswer: string;
  totalScore: number;
  updateScore: (score: number) => void;
  onNextQuestion: () => void;
}

export interface QuestionProps {
  question: string;
  image: string;
  options: string[];
  correctAnswer: string;
}
