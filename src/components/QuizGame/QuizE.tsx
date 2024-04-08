import React, { useState } from "react";

import QuizGameHome from "./QuizGameHome";
import QuizGame from "./QuizGame";
import QuizGameEnd from "./QuizGameEnd";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const QuizE = () => {
  const [totalScore, setTotalScore] = useState<number>(0);
  const [refreshed, setRefreshed] = useState(false);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <QuizGameHome refreshed={refreshed} setRefreshed={setRefreshed} />
            }
          />
          <Route
            path="/game"
            element={
              <QuizGame setTotalScore={setTotalScore} totalScore={totalScore} />
            }
          />
          <Route
            path="/end"
            element={<QuizGameEnd totalScore={totalScore} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default QuizE;
