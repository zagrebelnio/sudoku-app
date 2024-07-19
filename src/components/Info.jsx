import './Info.css';

import { formatTime } from "../utils/formatTime.js";
import { useContext } from "react";
import { SudokuCtx } from "../store/SudokuCtx.jsx";

export default function Info() {
  const {timer, mistakes, score} = useContext(SudokuCtx);

  return (
    <div className="info">
      <p className="info__mistakes">Mistakes: {mistakes}/3</p>
      <p className="info__score">Score: {score}</p>
      <p className="info__timer">Timer: {formatTime(timer)}</p>
    </div>
  );
}