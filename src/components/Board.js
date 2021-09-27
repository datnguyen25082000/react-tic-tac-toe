import React from "react";
import { Square } from "./Square";

export const Board = (props) => {
  const renderSquare = (i) => {
    return (
      <Square
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
        key={i}
        isActive={i === props.currentPosition}
        isWin={
          props.positionWin && props.positionWin.length
            ? props.positionWin.includes(i)
            : false
        }
      />
    );
  };

  const numCol = parseInt(props.numCol);

  return (
    <div>
      {Array.from(Array(numCol).keys()).map((item, i) => {
        return (
          <div className="board-row" key={i}>
            {Array.from(Array(numCol).keys()).map((item, j) => {
              return renderSquare(i * numCol + j);
            })}
          </div>
        );
      })}
    </div>
  );
};
