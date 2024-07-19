import './GamePanel.css';
import Button from "./UI/Button";
import Info from "./Info.jsx";
import eraseIcon from "../assets/Erase.svg";
import pencilIcon from "../assets/Pencil.svg";
import { useContext } from 'react';
import { SudokuCtx } from '../store/SudokuCtx.jsx';

export default function GamePanel() {
  const {handleNewGame, handleEnterCell, handleToggleNotesState, handleErase, notesState } = useContext(SudokuCtx);
  
  return (
    <div className="game-panel">
      <Info/>
      <div className="control-buttons">
        <Button btnType="icon" icon={eraseIcon} onClick={handleErase}>Erase</Button>
        <Button btnType="icon" icon={pencilIcon} onClick={handleToggleNotesState} selected={notesState}>Notes</Button>
      </div>
      <div className="number-buttons">
        <div className="number-buttons__row">
          <Button btnType="number" onClick={(event) => handleEnterCell(+event.target.innerText)}>1</Button>
          <Button btnType="number" onClick={(event) => handleEnterCell(+event.target.innerText)}>2</Button>
          <Button btnType="number" onClick={(event) => handleEnterCell(+event.target.innerText)}>3</Button>
        </div>
        <div className="number-buttons__row">
          <Button btnType="number" onClick={(event) => handleEnterCell(+event.target.innerText)}>4</Button>
          <Button btnType="number" onClick={(event) => handleEnterCell(+event.target.innerText)}>5</Button>
          <Button btnType="number" onClick={(event) => handleEnterCell(+event.target.innerText)}>6</Button>
        </div>
        <div className="number-buttons__row">
          <Button btnType="number" onClick={(event) => handleEnterCell(+event.target.innerText)}>7</Button>
          <Button btnType="number" onClick={(event) => handleEnterCell(+event.target.innerText)}>8</Button>
          <Button btnType="number" onClick={(event) => handleEnterCell(+event.target.innerText)}>9</Button>
        </div>
      </div>
      <Button btnType="default" onClick={handleNewGame}>New Game</Button>
    </div>
  );
}