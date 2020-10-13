import React from "react";
import Square from "./Square";

class Board extends React.Component {
  renderSquare(i) {
    const { currentSquares, winLine } = this.props;
    return (
      <Square
        value={currentSquares[i]}
        onClick={() => this.props.onClickSquare(i)}
        hightlight={winLine && winLine.includes(i)}
      />
    );
  }

  render() {
    const board = [];
    const boardSize = 3;
    for (let i = 0; i < boardSize; i++) {
      let row = [];
      for (let j = 0; j < boardSize; j++) {
        row.push(this.renderSquare(i * boardSize + j));
      }
      board.push(
        <div key={i} className="board-row">
          {row}
        </div>
      );
    }
    return <div>{board}</div>;
  }
}

export default Board;
