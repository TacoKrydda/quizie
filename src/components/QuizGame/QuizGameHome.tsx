import style from "./QuizGameHome.module.css";
import { Link } from "react-router-dom";

const QuizGameHome = () => {
  return (
    <div className={style.flexContainer}>
      <div className={style.item1}>
        <h2>Hello and welcome to QuizE!!!</h2>
      </div>
      <div className={style.item2}>
        <Link to="/game">
          <button>Start The Game</button>
        </Link>
      </div>
    </div>
  );
};

export default QuizGameHome;
