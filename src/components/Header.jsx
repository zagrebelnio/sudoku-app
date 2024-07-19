import sudokuIcon from '/sudoku.svg';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="title-container">
        <img className="title-icon" src={sudokuIcon} alt="Sudoku icon" />
        <h1 className="title">Sudoku</h1>
      </div>
    </header>
  );
}