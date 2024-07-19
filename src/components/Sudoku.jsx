import './Sudoku.css';
import Cell from './Cell.jsx';
import { useContext } from 'react';
import { SudokuCtx } from '../store/SudokuCtx.jsx';

export default function Sudoku() {
  const { sudoku, notes, handleSelectCell, determineCellStatus } = useContext(SudokuCtx);
  
  return (
    <div className="grid">
      {sudoku.matrix.map((row, rowIndex) => 
        <div key={rowIndex} className="row">
          {row.map((cell, cellIndex) => {
            const id = `${rowIndex}-${cellIndex}`;
            const cellNotes = notes.filter(note => id === note.id);
            
            return (
              <Cell 
                key={cellIndex} 
                value={cell} 
                id={id} 
                onClick={handleSelectCell}
                status={determineCellStatus(id)}
                notes={cellNotes.length === 0 ? null : cellNotes[0].values}
              />
            );
          }
          )}
        </div>
      )}
    </div>
  );
}