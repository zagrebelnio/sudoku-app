/* eslint-disable react/prop-types */
import { useState, createContext, useEffect, useCallback } from "react";
import SudokuGenerator from "../utils/sudokuGenerator.js";
import useTimer from "../hooks/useTimer.js";
import Modal from "../components/UI/Modal.jsx";

export default function SudokuContextProvider({children}) {
  const [sudoku, setSudoku] = useState(new SudokuGenerator(9, 40));
  const [selectedCell, setSelectedCell] = useState(null);
  const {timer, startTimer, resetTimer, stopTimer} = useTimer();
  const [mistakes, setMistakes] = useState(0);
  const [result, setResult] = useState(undefined);
  const [notes, setNotes] = useState([]);
  const [notesState, setNotesState] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    startTimer();
  }, [startTimer]);

  function handleToggleNotesState() {
    setNotesState(prev => !prev);
  }

  const getIndexesFromId = useCallback(function getIndexesFromId(id) {
    const cellIndexes = id.split('-');
    return {
      i: cellIndexes[0],
      j: cellIndexes[1]
    }
  }, []);

  const determineResult = useCallback(function determineResult(sudoku, mistakes) {
    if (mistakes > 2) {
      setResult('loss');
      stopTimer();
    }
    if (sudoku.matrix.every((row, i) => row.every((cell, j) => cell === sudoku.solution[i][j]))) {
      setResult('win');
      stopTimer();
    }
  }, [stopTimer]);

  const handleEnterCell = useCallback(function handleEnterCell(number) {
    const cellIndexes = getIndexesFromId(selectedCell);
    
    if (notesState) {
      if (sudoku.matrix[cellIndexes.i][cellIndexes.j] !== 0) {
        return;
      }

      if (notes.filter(note => note.id === selectedCell).length === 0) {
        const values = Array(9).fill(0);
        values[number - 1] = number;
        const newNotes = [...notes, { id: selectedCell, values }];
        setNotes(newNotes);
      } else {
        [...notes].map(note => {
          if (note.id === selectedCell) {
            const values = note.values;
            values[number - 1] === 0 ? values[number - 1] = number : values[number - 1] = 0;
            if (values.every(value => value === 0)) {
              setNotes(notes.filter(note => note.id !== selectedCell));
            } else {
              setNotes(prevNotes => (
                prevNotes.map(prevNote => {
                  if (prevNote.id === selectedCell) {
                    return { ...prevNote, values };
                  } else {
                    return { ...prevNote };
                  }
                })
              ));
            }
          }
        });
      }
      return;
    }

    setNotes(notes.filter(note => note.id !== selectedCell));

    if (
      sudoku.matrix[cellIndexes.i][cellIndexes.j] !== 0 &&
      sudoku.matrix[cellIndexes.i][cellIndexes.j] === sudoku.solution[cellIndexes.i][cellIndexes.j]
    ) {
      return;
    }

    const newSudoku = {...sudoku}
    newSudoku.matrix[cellIndexes.i][cellIndexes.j] = number;

    setSudoku(newSudoku);

    let newMistakes = mistakes;
    if (sudoku.solution[cellIndexes.i][cellIndexes.j] !== number) {
      newMistakes++;
      setMistakes(newMistakes);
      setScore(prev => prev - 30);
    } else {
      setScore(prev => prev + 10);
    }

    determineResult(newSudoku, newMistakes);
  }, [mistakes, getIndexesFromId, selectedCell, sudoku, determineResult, notes, notesState]);

  const handleErase = useCallback(function handleErase() {
    let newNotes = notes.filter(note => note.id !== selectedCell);
    setNotes(newNotes);
  }, [notes, selectedCell]);
  
  const handleKeyDown = useCallback(function handleKeyDown(event) {
    if (event.keyCode >= 49 && event.keyCode <= 57) {
      const number = event.keyCode - 48;
      handleEnterCell(number);
    } else if (event.keyCode === 27) {
      setSelectedCell(null);
    } else if (event.keyCode === 78) {
      handleToggleNotesState();
    } else if (event.keyCode === 69) {
      handleErase();
    }
  }, [handleEnterCell, handleErase]);
  
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [handleKeyDown]); 

  function handleNewGame() {
    resetTimer();
    setSudoku(new SudokuGenerator(9, 40));
    setSelectedCell(null);
    setMistakes(0);
    setResult(undefined);
    setNotes([]);
    setNotesState(false);
    setScore(0);
    startTimer();
  }

  function handleSelectCell(event) {
    setSelectedCell(event.target.id);
  }

  function determineCellStatus(id) {
    const cellIndexes = getIndexesFromId(id);
    const selectedCellIndexes = selectedCell ? getIndexesFromId(selectedCell) : null; 

    let types = '';

    if (selectedCell === id) {
      return 'selected';
    }

    if (
      sudoku.matrix[cellIndexes.i][cellIndexes.j] !== 0 && 
      sudoku.matrix[cellIndexes.i][cellIndexes.j] !== sudoku.solution[cellIndexes.i][cellIndexes.j]
    ) {
      return 'wrong';
    }

    if (  
      selectedCellIndexes && 
      sudoku.matrix[cellIndexes.i][cellIndexes.j] === sudoku.matrix[selectedCellIndexes.i][selectedCellIndexes.j] &&
      sudoku.matrix[cellIndexes.i][cellIndexes.j] !== 0
    ) {
      types += 'highlighted';
    } else if 
    (
      selectedCellIndexes && 
      (cellIndexes.i === selectedCellIndexes.i || cellIndexes.j === selectedCellIndexes.j)
    ) {
      types += 'illuminated';
    }
    
    if (
      sudoku.matrixStart[cellIndexes.i][cellIndexes.j] === 0 &&
      sudoku.matrix[cellIndexes.i][cellIndexes.j] === sudoku.solution[cellIndexes.i][cellIndexes.j]
    ) {
      types += ' correct';
    }

    return types;
  }

  const contextValue = {
    sudoku,
    selectedCell,
    setSelectedCell,
    handleSelectCell,
    determineCellStatus,
    handleNewGame,
    handleEnterCell,
    timer,
    mistakes,
    notes,
    handleToggleNotesState,
    handleErase,
    notesState,
    score
  };

  return <SudokuCtx.Provider value={contextValue}>
    <Modal result={result} onClose={handleNewGame}/>
    {children}
  </SudokuCtx.Provider>
}

export const SudokuCtx = createContext();

