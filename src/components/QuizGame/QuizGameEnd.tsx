import React from "react";
import style from "./QuizGameEnd.module.css";

interface QuizGameEndProps {
  totalScore: number;
}

const QuizGameEnd: React.FC<QuizGameEndProps> = ({ totalScore }) => {
  return (
    <div className={style.parent}>
      <div className={style.div1}>Thank you for playing.</div>
      <div className={style.div2}>
        <img
          src="/QuizPics/greatjob.jpg"
          alt="Question"
          className={style.questionImage}
        />
      </div>
      <div className={style.div3}>
        You got {totalScore} quiz questions correct
      </div>
      <div className={style.div4}>
        <button>Starta om</button>
      </div>
    </div>
  );
};

export default QuizGameEnd;
