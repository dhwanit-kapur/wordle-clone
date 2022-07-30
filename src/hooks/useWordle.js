import { useState } from "react";

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([...Array(6)]); // array of objects created in formatGuesses function
  const [history, setHistory] = useState([]); // array of strings used to avoid duplication on the board
  const [isCorrect, setIsCorrect] = useState(false);

  // format guesses into array of objects
  // eg. [{ key: "a", color: "green" }]
  const formatGuesses = () => {
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map((l) => {
      return { key: l, color: "gray" };
    });

    // check for green letters
    formattedGuess.forEach((l, i) => {
      if (solutionArray[i] === l.key) {
        formattedGuess[i].color = "green";
        solutionArray[i] = null;
      }
    });

    // check for yellow letters
    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== "green") {
        formattedGuess[i].color = "yellow";
        solutionArray[solutionArray.indexOf(l.key)] = null;
      }
    });

    return formattedGuess;
  };

  // add new guess into the guesses state
  // check and update the isCorrect flag state
  // update the count of number of turns
  const addGuesses = (formattedGuess) => {
    if (solution === currentGuess) {
      setIsCorrect(true);
    }
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });
    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });
    setTurn((prevTurn) => {
      return prevTurn + 1;
    });
    setCurrentGuess("");
  };

  // handle keyup events
  const handleKeyup = ({ key }) => {
    if (key === "Enter") {
      // turn should be less than 5
      if (turn > 5) {
        console.log("Your limited chances are over");
        return;
      }
      // word shouldn't have been guessed earlier
      if (history.includes(currentGuess)) {
        console.log("You have already guessed that word in an earlier attempt");
        return;
      }
      // length of the guessed word should be 5 characters long
      if (currentGuess.length !== 5) {
        console.log("Length of the guess should be 5 chars long");
        return;
      }
      const formatted = formatGuesses();
      console.log(formatted);
      addGuesses(formatted);
    }
    if (key === "Backspace") {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1);
      });
      return;
    }
    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => {
          return prev + key;
        });
      }
    }
  };

  return { turn, currentGuess, guesses, isCorrect, handleKeyup };
};

export default useWordle;
