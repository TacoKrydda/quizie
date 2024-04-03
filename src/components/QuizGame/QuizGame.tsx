import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuestionProps, QuizGameProps } from "./QuizGameProps";
import QuizGameData from "./QuizGameData.json";
import ShuffleQuestions from "./ShuffleQuestions";

import style from "./QuizGame.module.css";

import backgroundMusic from "./sounds/BgMusic.mp3";
import correctAnswerSound from "./sounds/siu.mp3";
import wrongAnswerSound from "./sounds/wrong.mp3";
import wrongAnserSound2 from "./sounds/StreakWrong3.mp3";

const QuizGame: React.FC<QuizGameProps> = ({ setTotalScore, totalScore }) => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [shuffledQuestions, setShuffledQuestions] = useState<QuestionProps[]>(
    []
  );
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answered, setAnswered] = useState<boolean>(false);
  const [consecutiveWrongAnswers, setConsecutiveWrongAnswers] =
    useState<number>(0);

  // Ladda rätt ljudeffekter
  const correctAnswerAudio = new Audio(correctAnswerSound);
  const wrongAnswerAudio = new Audio(wrongAnswerSound);
  const wrongAnswerAudio2 = new Audio(wrongAnserSound2);

  // Slumpa frågorna när komponenten monteras
  useEffect(() => {
    const shuffled = ShuffleQuestions(QuizGameData);
    setShuffledQuestions(shuffled);

    const backgroundAudio = new Audio(backgroundMusic);

    // Ladda musiken när komponenten monteras
    backgroundAudio.loop = true;
    backgroundAudio.volume = 0.8;
    backgroundAudio.addEventListener("canplaythrough", () => {
      backgroundAudio.play(); // Spela musiken när ljudet är klart att spelas
    });

    return () => {
      console.log("puase the music");
      backgroundAudio.pause();
    };
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

  // När användaren svarar på sista frågan, navigera till slutsidan
  useEffect(() => {
    if (currentQuestionIndex === shuffledQuestions.length - 1 && answered) {
      navigate("/end");
    }
  }, [currentQuestionIndex, answered, shuffledQuestions.length, navigate]);

  const handleOptionSelect = (option: string) => {
    if (!answered) {
      setSelectedOption(option);
      setAnswered(true);
      if (option === shuffledQuestions[currentQuestionIndex].correctAnswer) {
        handleScoreUpdate(totalScore + 1);
        correctAnswerAudio.play();
        setConsecutiveWrongAnswers(0);
      } else {
        setConsecutiveWrongAnswers(consecutiveWrongAnswers + 1);
        if (consecutiveWrongAnswers < 2) {
          wrongAnswerAudio.play();
        } else if (consecutiveWrongAnswers >= 2) {
          wrongAnswerAudio2.play();
        }
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
