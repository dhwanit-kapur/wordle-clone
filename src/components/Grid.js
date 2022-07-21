import React from "react";
import Row from "./Row";

const Grid = ({ currentGuess, guesses, turn }) => {
  return (
    <div className="grid">
      {guesses.map((g, i) => {
        return <Row key={i} guess={g} />;
      })}
    </div>
  );
};

export default Grid;
