import React from "react";
import { useEffect } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Keypad from "./Keypad";

const Wordle = ({ solution }) => {
  const { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup } =
    useWordle(solution);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);

    if (isCorrect) {
      console.log("Congrats!, You've guessed it right");
      window.removeEventListener("keyup", handleKeyup);
    }

    if (turn > 5) {
      console.log("Unlucky!, You're out of turns");
      window.removeEventListener("keyup", handleKeyup);
    }

    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup, turn, isCorrect]);

  return (
    <div className="worlde">
      <div>current guess - {currentGuess} </div>
      <div>solution - {solution} </div>
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <Keypad usedKeys={usedKeys} />
    </div>
  );
};

export default Wordle;
