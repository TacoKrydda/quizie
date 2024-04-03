import React from "react";
import style from "./QuizGameEnd.module.css";
import { Link } from "react-router-dom";

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
        <p>You got {totalScore} quiz questions correct</p>
      </div>
      <div className={style.div4}>
        <Link to="/">
          <button>Start Sida</button>
        </Link>
      </div>
    </div>
  );
};

export default QuizGameEnd;
