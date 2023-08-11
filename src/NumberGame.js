import { useState, useEffect } from "react";
import { Button } from "./Button";
import { Prizes } from "./Prizes";
import { Data } from "./Data";
import "./NumberDisplay.css";
import Confetti from "react-confetti";

const styles = {
  marginLeft: 20,
  marginBottom: 20,
  fontSize: 20,
};

const results = {
  display: "inline-block",
  textAlign: "left",
  marginTop: 20,
  marginBottom: 20,
  fontSize: 20,
};

function NumberGame() {
  const [proverbsSet, setProverbsSet] = useState(Data);
  const [result, setResult] = useState("");
  const [attempts, setAttempts] = useState([]);
  const [isOver, setIsOver] = useState(false);
  const [prize, setPrize] = useState(
    () => Prizes[Math.floor(Math.random() * Prizes.length + 1)]
  );
  const [questionCount, setQuestionCount] = useState(1);
  const [proverbCount, setProverbCount] = useState(0);
  const [score, setScore] = useState(0);
  const [number, setNumber] = useState("");
  const [wrongProverbs, setWrongProverbs] = useState([]);

  useEffect(() => {
    const shuffledProverbs = [...Data];
    shuffleArray(shuffledProverbs);
    setProverbsSet(shuffledProverbs);
  }, []);

  const submitHandler = () => {
    setQuestionCount((prevQuestionCount) => prevQuestionCount + 1);
    
    const currentProverb = proverbsSet[proverbCount];
    setAttempts((prevAttempts) => {
      const isCorrect = number === currentProverb.value;
      const updatedAttempts = [...prevAttempts, { ...currentProverb, isCorrect }];
      return updatedAttempts;
    });

    if (number === currentProverb.value) {
      setResult(`✅ Correct!`);
      setScore((prevScore) => prevScore + 1);
    } else if (number !== currentProverb.value) {
      setResult(
        `❌ The correct answer is ${currentProverb.value}.`
      );
      setWrongProverbs((prevWrongProverbs) => [
        ...prevWrongProverbs,
        currentProverb,
      ]);
    }
    
    setNumber("");

    if (questionCount === proverbsSet.length) {
      setIsOver(true);
      return;
    }
    setProverbCount((prevProverbCount) => prevProverbCount + 1);
  };

  const restartHandler = () => {
    setNumber("");
    setResult("");
    setAttempts([]);
    setIsOver(false);
    setPrize(Prizes[Math.floor(Math.random() * Prizes.length + 1)]);
    setQuestionCount(1);
    setProverbCount(0);
    setScore(0);
    shuffleArray(Data);
    setProverbsSet(Data)
  };

  const startNewGameWithWrongProverbs = () => {
    // Shuffle the wrong proverbs
    shuffleArray(wrongProverbs);
  
    // Set the proverbsSet state to the wrong proverbs and reset other game-related states
    setNumber("");
    setResult("");
    setAttempts([]);
    setIsOver(false);
    setPrize(Prizes[Math.floor(Math.random() * Prizes.length + 1)]);
    setQuestionCount(1);
    setProverbCount(0);
    setScore(0);
    setProverbsSet(wrongProverbs);
    setWrongProverbs([]);
  };
  
  const handleButtonClick = (buttonNumber) => {
    setNumber((prevNumber) => prevNumber + buttonNumber);
  };

  const handleColonButtonClick = () => {
    setNumber((prevNumber) => prevNumber + ":");
  };

  const handleClearButtonClick = () => {
    setNumber("");
  };

  const handleSecretButtonClick = () => {
    setNumber(proverbsSet[questionCount - 1].value);
  };
  
  return (
    <div style={styles}>
      <h1>Let's Play "What's the Proverb Number?"</h1>

      {proverbCount + 1}. {proverbsSet[proverbCount].label}

      <div className="button-container">
        {[...Array(10)].map((_, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(index)}
            className="number-button"
            disabled={isOver}
          >
            {index}
          </button>
        ))}
        <button
          onClick={handleColonButtonClick}
          className="colon-button"
          disabled={isOver}
        >
          :
        </button>
        <button onClick={handleClearButtonClick} className="clear-button" disabled={isOver}>
          Clear
        </button>
        <button onClick={handleSecretButtonClick} className="secret-button" disabled={isOver}>
          Secret
        </button>
      </div>

      <div className="input-container">
        <input type="text" value={number} readOnly className="input-field" />
      </div>

      <div style={{ display: "flex", gap: 20 }}>
        <Button onClick={submitHandler} label="Submit!" disabled={isOver} />
        <Button onClick={restartHandler} label="New Game" />
        {isOver && wrongProverbs.length !== 0 && <Button
          onClick={startNewGameWithWrongProverbs}
          label="Try again (Wrong Proverbs)"
          disabled={wrongProverbs.length === 0 || !isOver}
        />}
      </div>

      <div style={results}>{result}</div>

      <div>Score: {score} out of {proverbsSet.length}</div>

      {questionCount - 1 === proverbsSet.length &&
        score === proverbsSet.length && (
          <div>Congratulations! You won a {prize}!</div>
        )}

      {questionCount - 1 === proverbsSet.length &&
        score === proverbsSet.length && <Confetti />}

      {((questionCount - 1) === proverbsSet.length) && 
        (score !== proverbsSet.length) &&
        <div>Game Over. Better luck next time.</div>
      }

      <hr />
      <div>
        {attempts.map((proverb, index) => (
          <div
            key={index}
            style={{ color: proverb.isCorrect ? "black" : "red" }}
          >
            {index + 1}. {proverb.label} Proverb {proverb.value}
          </div>
        ))}
      </div>
    </div>
  );
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export default NumberGame;
