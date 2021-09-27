import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Board } from "./components/Board";
import { EMatrix } from "./constant";
import { calculateWinner } from "./helpers";
import "./index.css";

const Game = () => {
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const [history, setHistory] = useState([
    {
      squares: Array(EMatrix.num_col * EMatrix.num_row).fill(null),
      position: -1,
      index: 0,
    },
  ]);
  const [positionWin, setPositionWin] = useState([]);
  const [isAscending, setIsAscending] = useState(true);

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    } else {
      squares[i] = xIsNext ? "X" : "O";
      setHistory(
        newHistory.concat([
          {
            squares: squares,
            position: i,
            index: stepNumber + 1,
          },
        ])
      );

      setStepNumber(newHistory.length);
      setXIsNext(!xIsNext);
    }
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const renderMove = () => {
    const listMove = isAscending ? [...history] : [...history].reverse();
    return listMove.map((step, move) => {
      const desc = step.index
        ? "Go to move #" +
          step.index +
          ` - (${Math.floor(step.position / EMatrix.num_col)}, ${
            step.position % EMatrix.num_col
          })`
        : "Go to game start";
      return (
        <li
          key={step.index}
          style={step.index === stepNumber ? { fontWeight: "bold" } : {}}
        >
          <button
            style={step.index === stepNumber ? { fontWeight: "bold" } : {}}
            onClick={() => jumpTo(step.index)}
          >
            {desc}
          </button>
        </li>
      );
    });
  };

  const renderStatus = () => {
    const current = history[stepNumber];
    const winner = calculateWinner(current?.squares) || 0;
    let status;
    if (history.length === 10 && stepNumber === history.length - 1 && !winner) {
      status = "Draw";
    } else if (winner) {
      status = "Winner: " + winner.typeWin;
    } else {
      status = "Next player: " + (xIsNext ? "X" : "O");
    }
    return status;
  };

  useEffect(() => {
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);

    if (winner && stepNumber === history.length - 1)
      setPositionWin(winner.positionWin);
    else setPositionWin([]);
  }, [history, stepNumber]);

  return (
    <>
      <div className="game">
        <h1>NTD Game - React Tic-Tac-Toe</h1>
        <div className="game-container">
          <div className="game-board">
            {history && history[stepNumber] ? (
              <Board
                squares={
                  history[stepNumber] ? history[stepNumber].squares : null
                }
                onClick={(i) => handleClick(i)}
                currentPosition={history[stepNumber].position}
                positionWin={positionWin}
              />
            ) : (
              <></>
            )}
            <button
              className={`game-order-btn ${
                isAscending ? "game-order-btn--ascending" : ""
              }`}
              onClick={() => setIsAscending(!isAscending)}
            >
              {isAscending ? "Ascending " : "Descending"}
            </button>
          </div>
          <div className="game-info">
            <div className="game-status">{renderStatus()}</div>
            <ol>{renderMove()}</ol>
          </div>
        </div>{" "}
      </div>
    </>
  );
};

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
