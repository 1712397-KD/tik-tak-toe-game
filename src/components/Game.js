import React from "react";
import Board from "./Board";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          lastPositionBySquare: 0,
        },
      ],
      xIsNext: true,
      stepNumber: 0,
      isAscending: true,
    };
    this.handleToggleBtn = this.handleToggleBtnFunc.bind(this);
  }

  handleSquareClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const currentSquares = history[history.length - 1];
    const clickedSquare = currentSquares.squares.slice();
    if (calculateWinner(clickedSquare).winner || clickedSquare[i]) {
      return;
    }
    clickedSquare[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: clickedSquare,
          lastPositionBySquare: i,
        },
      ]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  jumpToFunc(stepNum) {
    return (event) => {
      this.setState({
        stepNumber: stepNum,
        xIsNext: stepNum % 2 === 0,
      });
    };
  }

  handleToggleBtnFunc() {
    this.setState({
      isAscending: !this.state.isAscending,
    });
  }
  render() {
    const { history, stepNumber, isAscending } = this.state;
    const currentSquares = history[stepNumber].squares;
    const winInfo = calculateWinner(currentSquares);
    const { winner } = winInfo;
    let status;
    if (winner) {
      status = "Winner is: " + winner;
    } else {
      if (winInfo.isDraw) {
        status = "Draw"
      } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
      }
    }

    let moveBtns = history.map((currentBoard, moveNum) => {
      const lastPositionBySquare = currentBoard.lastPositionBySquare;
      const row = Math.floor(lastPositionBySquare / 3) + 1;
      const col = (lastPositionBySquare % 3) + 1;
      const description = moveNum
        ? "Go to move #" + moveNum + " at position (" + row + "," + col + ")"
        : "Go to game start";

      return (
        <li key={moveNum}>
          <button
            className={moveNum === stepNumber ? "selected-move" : ""}
            onClick={this.jumpToFunc(moveNum)}
          >
            {description}
          </button>
        </li>
      );
    });

    if (!isAscending) {
      moveBtns.reverse();
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            currentSquares={currentSquares}
            onClickSquare={(i) => this.handleSquareClick(i)}
            winLine={winInfo.line}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={this.handleToggleBtn}>
            {isAscending ? "Desc" : "Asc"}
          </button>
          <ol>{moveBtns}</ol>
        </div>
      </div>
    );
  }
}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        line: lines[i],
        isDraw: false
      };
    }
  }
  let isDraw = true;
  for (let i = 0; i < squares.length; i++) {
    if(squares[i] === null) {
      isDraw = false;
      break;
    }
  }
  return {
    winner: null,
    line: null,
    isDraw: isDraw
  };
}

export default Game;
