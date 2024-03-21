import React, { useEffect, useState } from "react";
import style from "./QuizGame.module.css";
import { QuestionProps } from "./QuizGameProps";
import QuizGameData from "./QuizGameData.json";
import ShuffleQuestions from "./ShuffleQuestions";
import QuizGameEnd from "./QuizGameEnd";

const QuizGame = () => {
  const [shuffledQuestions, setShuffledQuestions] = useState<QuestionProps[]>(
    []
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answered, setAnswered] = useState<boolean>(false);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  // Slumpa frågorna när komponenten monteras
  useEffect(() => {
    const shuffled = ShuffleQuestions(QuizGameData);
    setShuffledQuestions(shuffled);
  }, []);

  useEffect(() => {
    setAnswered(false); // Återställ answered när en ny fråga visas

    // Slumpa om svarsalternativen varje gång en ny fråga visas
    if (shuffledQuestions[currentQuestionIndex]?.options) {
      const shuffled = ShuffleQuestions(
        shuffledQuestions[currentQuestionIndex]?.options
      );
      setShuffledOptions(shuffled);
    }
  }, [shuffledQuestions, currentQuestionIndex]);

  // När användaren svarar på sista frågan, markera quizen som avslutad
  useEffect(() => {
    if (currentQuestionIndex === shuffledQuestions.length - 1 && answered) {
      setQuizCompleted(true);
    }
  }, [currentQuestionIndex, answered, shuffledQuestions.length]);

  const handleOptionSelect = (option: string) => {
    if (!answered) {
      setSelectedOption(option);
      setAnswered(true);
      if (option === shuffledQuestions[currentQuestionIndex].correctAnswer) {
        handleScoreUpdate(totalScore + 1);
      }
    }
  };

  const isCorrect = (option: string) => {
    return option === shuffledQuestions[currentQuestionIndex].correctAnswer;
  };

  const handleScoreUpdate = (score: number) => {
    setTotalScore(score);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  if (quizCompleted) {
    return <QuizGameEnd totalScore={totalScore} />;
  }

  return (
    <>
      {shuffledQuestions.length > 0 &&
        currentQuestionIndex < shuffledQuestions.length && (
          <div className={style.parent}>
            <div className={style.div1}>
              <h3>Score: {totalScore}</h3>
            </div>
            <div className={style.div2}>
              <img
                src={shuffledQuestions[currentQuestionIndex].image}
                alt="Question"
                className={style.questionImage}
              />
            </div>
            <div className={style.div3}>
              <div className={style.rubrikText}>
                <h2>{shuffledQuestions[currentQuestionIndex].question}</h2>
              </div>
              <div className={style.options}>
                {shuffledOptions.map((option, index) => (
                  <div
                    key={index}
                    className={`${style.option} ${
                      selectedOption === option ? style.selected : ""
                    } ${answered && isCorrect(option) ? style.correct : ""}`}
                    onClick={() => handleOptionSelect(option)}
                  >
                    <p>{option}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={style.div4}>
              <button disabled={!answered} onClick={handleNextQuestion}>
                Nästa
              </button>
            </div>
          </div>
        )}
    </>
  );
};

export default QuizGame;
