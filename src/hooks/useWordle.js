import { useState } from "react";

const useWordle = () => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState(0);
  const [guesses, setGuesses] = useState([]); // array of objects created in formatGuesses function
  const [history, setHistory] = useState([]); // array os strings used to avoid duplication on the board
  const [isCorrect, setIsCorrect] = useState(false);

  // format guesses into array of objects
  // eg. [{ key: "a", color: "green" }]
  const formatGuesses = () => {};

  // add new guess into the guesses state
  // check and update the isCorrect flag state
  // update the count of number of turns
  const addGuesses = () => {};

  // handle keyup events
  const handleKeyup = () => {};

  return { turn, currentGuess, guesses, isCorrect, handleKeyup };
};

export default useWordle;
