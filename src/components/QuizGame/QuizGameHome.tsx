import { useEffect } from "react";
import style from "./QuizGameHome.module.css";
import { Link } from "react-router-dom";
import { QuizGameHomeProps } from "./QuizGameProps";

const QuizGameHome: React.FC<QuizGameHomeProps> = ({
  refreshed,
  setRefreshed,
}) => {
  useEffect(() => {
    if (refreshed) {
      window.location.reload();
      setRefreshed(false);
    }
  }, [refreshed, setRefreshed]);

  const refresh = () => {
    setRefreshed(true);
  };

  return (
    <div className={style.flexContainer}>
      <div className={style.item1}>
        <h2>Hello and welcome to QuizE!!!</h2>
      </div>
      <div className={style.item2}>
        <Link to="./game">
          <button onClick={refresh}>Start The Game</button>
        </Link>
      </div>
    </div>
  );
};

export default QuizGameHome;
