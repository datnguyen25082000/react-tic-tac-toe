import React from "react";
import { Square } from "./Square";
import { EMatrix } from "../constant";

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

  return (
    <div>
      {Array.from(Array(EMatrix.num_row).keys()).map((item, i) => {
        return (
          <div className="board-row" key={i}>
            {Array.from(Array(EMatrix.num_row).keys()).map((item, j) => {
              return renderSquare(i * EMatrix.num_col + j);
            })}
          </div>
        );
      })}
    </div>
  );
};
