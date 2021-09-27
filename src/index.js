import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { Board } from "./components/Board";
import { calculateWinner } from "./helpers";
import "./index.css";

const Game = () => {
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const [numCol, setNumCol] = useState(3);
  const [history, setHistory] = useState([
    {
      squares: Array(numCol * numCol).fill(null),
      position: -1,
      index: 0,
    },
  ]);
  const [positionWin, setPositionWin] = useState([]);
  const [isAscending, setIsAscending] = useState(true);
  const refInput = useRef(null);

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = current.squares.slice();

    if (
      calculateWinner(squares, numCol, history[stepNumber].position) ||
      squares[i]
    ) {
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
          ` - (${Math.floor(step.position / numCol)}, ${
            step.position % numCol
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
    const winner =
      calculateWinner(current?.squares, numCol, history[stepNumber].position) ||
      0;
    let status;
    if (
      history.length === numCol * numCol + 1 &&
      stepNumber === history.length - 1 &&
      !winner
    ) {
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
    const winner = calculateWinner(
      current.squares,
      numCol,
      history[stepNumber].position
    );

    if (winner && stepNumber === history.length - 1)
      setPositionWin(winner.positionWin);
    else setPositionWin([]);
  }, [history, stepNumber]);

  const handleChangeNumCol = (e) => {
    e.preventDefault();
    if (refInput && refInput.current) {
      setNumCol(refInput.current.value);
      setStepNumber(0);
      setHistory([
        {
          squares: Array(numCol * numCol).fill(null),
          position: -1,
          index: 0,
        },
      ]);
      setPositionWin([]);
      setIsAscending(true);
    }
  };

  const renderNumWin = () => {
    if (numCol < 5) return "Three";
    else return "Five";
  };

  return (
    <>
      <div className="game">
        <h1>NTD Game - React Tic-Tac-Toe</h1>
        <form onSubmit={(e) => handleChangeNumCol(e)}>
          <span>Enter numbers of columns - rows (3 - 10)): </span>
          <input
            type="number"
            min="3"
            max="10"
            ref={refInput}
            onkeydown={() => {
              return false;
            }}
            defaultValue={3}
          />
          <button type={"submit"}>Enter</button>
        </form>
        <p style={{ marginBottom: 20, fontStyle: "italic" }}>
          (<span style={{ fontWeight: "bold" }}>{renderNumWin()}</span> of their
          marks in a horizontal, vertical, or diagonal row to win.)
        </p>
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
                numCol={numCol}
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
        <p></p>
      </div>
    </>
  );
};

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
