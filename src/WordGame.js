import React, { useState, useEffect } from 'react';
import { Data, wordsList } from "./Data";
import { Button } from "./Button";
import "./NumberDisplay.css";
import Confetti from "react-confetti";
import { Prizes } from "./Prizes";

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

const WordGame = () => {
  const [proverbsSet, setProverbsSet] = useState(Data);
  const [proverbIndex, setProverbIndex] = useState(0);
  const [proverbWithBlanks, setProverbWithBlanks] = useState('');
  const [wrongProverbs, setWrongProverbs] = useState([]);
  const[indices, setIndices] = useState([])
  const[currentProverbCounter, setCurrentProverbCounter] = useState(0)
  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);
  const [isOver, setIsOver] = useState(false);
  const [gameIsOver, setGameIsOver] = useState(true);
  const [proverbRetry, setProverbRetry] = useState('');
  const [attempts, setAttempts] = useState([]);
  const [prize, setPrize] = useState(
    () => Prizes[Math.floor(Math.random() * Prizes.length + 1)]
  );
  const [questionCount, setQuestionCount] = useState(1);

  useEffect(() => {
    setProverbWithBlanks(generateProverbWithBlanks(proverbsSet[proverbIndex]));
  }, [proverbsSet, proverbIndex]);

  const generateProverbWithBlanks = (proverb) => {
    let words = proverb.label.split(' ');
    const blanksCount = Math.floor(words.length / 2);
    const selectedIndices = new Set();
    const indicesList = [];
    let counter = 0;

    while (selectedIndices.size < blanksCount) {
      const randomIndex = Math.floor(Math.random() * words.length);
      selectedIndices.add(randomIndex);
    }
    
    words = words.map((word, index) => {
      if (selectedIndices.has(index)) {
        counter += 1;
        indicesList.push(counter)
        return `(${counter})____`;
      }
      return word;
    });

    setIndices(indicesList)
    words.push(`Proverb ${proverb.value}`)
    setProverbRetry(words.join(' '));
    return words.join(' ');
  };

  const handleWordClick = (word, index) => {

    const updatedProverb = proverbWithBlanks.replace(`(${indices[currentProverbCounter]})____`, word);
    setProverbWithBlanks(updatedProverb);
    setCurrentProverbCounter((prevCounter) => prevCounter + 1);
  };

  const submitHandler = () => {
    setQuestionCount((prevQuestionCount) => prevQuestionCount + 1);
    setAttempts((prevAttempts) => {
      const isCorrect = proverbWithBlanks === currentProverb;
      const updatedAttempts = [...prevAttempts, { currentProverb, isCorrect }];
      return updatedAttempts;
    });

    if (proverbWithBlanks === currentProverb) {
      setResult(`✅ Correct!`);
      setScore((prevScore) => prevScore + 1);
    } else {
      setResult(
      `❌ The correct answer is: ""${currentProverb}".`
      );
      setWrongProverbs((prevWrongProverbs) => [
        ...prevWrongProverbs,
        proverbsSet[proverbIndex],
      ]);
    }
    setIsOver(true);
    setGameIsOver(false)
    if (questionCount === proverbsSet.length) {
      setGameIsOver(true);
      return;
    }
  }

  const handleNextProverb = () => {
    setProverbIndex(proverbIndex + 1);
    setCurrentProverbCounter(0);
    setResult("");
    setIsOver(false);
    setGameIsOver(true);
  };

  const currentProverb = `${proverbsSet[proverbIndex].label} Proverb ${proverbsSet[proverbIndex].value}`;

  const handleClearButtonClick = () => {
    setProverbWithBlanks(proverbRetry);
    setCurrentProverbCounter(0);
    setResult("");
  };

  const restartHandler = () => {
    setResult("");
    setAttempts([]);
    setIsOver(false);
    setGameIsOver(true);
    setPrize(Prizes[Math.floor(Math.random() * Prizes.length + 1)]);
    setScore(0);
    setProverbIndex(0);
    setCurrentProverbCounter(0);
    setQuestionCount(1);
    setProverbsSet(Data);
    setProverbWithBlanks(generateProverbWithBlanks(proverbsSet[proverbIndex]));
  };

  const startNewGameWithWrongProverbs = () => {
    setResult("");
    setAttempts([]);
    setIsOver(false);
    setGameIsOver(true);
    setPrize(Prizes[Math.floor(Math.random() * Prizes.length + 1)]);
    setScore(0);
    setProverbIndex(0);
    setCurrentProverbCounter(0);
    setQuestionCount(1);
    setProverbsSet(wrongProverbs);
    setWrongProverbs([]);
  }

  const handleSecretButtonClick = () => {
    setProverbWithBlanks(currentProverb);
  };

  return (
    <div style={styles}>
      <h1>Let's Play "Fill in the missing words"</h1>
      <p>
        <button class="round-button">Q{proverbIndex + 1}</button>
        {` `}
        {proverbWithBlanks}
        {` `}
        <button onClick={handleClearButtonClick} className="clear-button" disabled={isOver}>
          Clear
        </button>
      </p>

      <div>
        {wordsList.map((word, index) => {
          return (
            <button key={index} onClick={() => handleWordClick(word, index)} className="number-button" disabled={isOver} >
              {word}
            </button>
          );
        })}
      </div>
      <p></p>
      
      <div style={{ display: "flex", gap: 20 }}>
        <Button onClick={submitHandler} label="Submit!" disabled={isOver} />
        <Button onClick={handleNextProverb} label="Next Proverb" disabled={gameIsOver} />
        <Button onClick={restartHandler} label="New Game" />
        {isOver && gameIsOver && wrongProverbs.length !== 0 && <Button
          onClick={startNewGameWithWrongProverbs}
          label="Try again (Wrong Proverbs)"
          disabled={wrongProverbs.length === 0 || !gameIsOver}
        />}
        <button onClick={handleSecretButtonClick} className="secret-button" disabled={isOver}>
          Secret
        </button>
      </div>

      <div style={results}>
        {result.split(" \"").map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </div>

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
            {index + 1}. {proverb.currentProverb}
          </div>
        ))}
      </div>

    </div>
  );
};

export default WordGame;
