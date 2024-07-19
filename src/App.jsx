import './App.css'
import GamePanel from './components/GamePanel.jsx';
import Header from './components/Header.jsx';
import Sudoku from './components/Sudoku.jsx';
import SudokuContextProvider from './store/SudokuCtx.jsx';

function App() {
  return (
    <SudokuContextProvider>
      <Header/>
      <main className="main">
        <Sudoku/>
        <GamePanel/>
      </main>
    </SudokuContextProvider>
  );
}

export default App;
