import React from "react";
import { useState, useEffect } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Keypad from "./Keypad";
import Modal from "./Modal";

const Wordle = ({ solution }) => {
  const { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup } =
    useWordle(solution);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);

    if (isCorrect) {
      setTimeout(() => {
        setShowModal(true);
      }, 2400);
      window.removeEventListener("keyup", handleKeyup);
    }

    if (turn > 5) {
      setTimeout(() => {
        setShowModal(true);
      }, 2400);
      window.removeEventListener("keyup", handleKeyup);
    }

    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup, turn, isCorrect]);

  return (
    <div className="worlde">
      {/* <div>current guess - {currentGuess} </div>
      <div>solution - {solution} </div> */}
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <Keypad usedKeys={usedKeys} />
      {showModal && (
        <Modal isCorrect={isCorrect} solution={solution} turn={turn} />
      )}
    </div>
  );
};

export default Wordle;
