import React from "react";

export const Square = (props) => {
  return (
    <button
      key={props.value}
      className={`square ${
        props.isWin ? "square--win" : props.isActive ? "square--active" : ""
      }`}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
};
