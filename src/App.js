import React from 'react';
import './App.css';
import GameFunc from './components/Game/Game.js';
import BoardFunc from './components/Board/Board.js';
import Square from './components/Square/Square.js';

const Board = BoardFunc(Square);
const Game = GameFunc(Board);

function App() {
  return (
    <div className="Tik Tak Toe">
      <Game />
    </div>
  );
}

export default App;
