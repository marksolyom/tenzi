import { useState, useEffect } from 'react';
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from 'react-confetti'

export default function App() {

  const [dice, setDice] = useState(allNewDice());
  const [tenzi, setTenzi] = useState(false);

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every(die => die.value === firstValue);
    if (allHeld && allSameValue) {
        setTenzi(true)
        console.log("You won!")
    }
}, [dice])

  function genNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(genNewDie());
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzi) {
    setDice(prevDice => prevDice.map(die => {
      return die.isHeld ? die : genNewDie();
    }));
  } else {
    setTenzi(false);
    setDice(allNewDice)
  }
  }

  function holdDice(id) {
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ?
        { ...die, isHeld: !die.isHeld } :
        die;
    }))
  }

  return (
    <div className="App">
      <main>
        {tenzi && <Confetti />}
        <h1 className="title">Tenzi</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">
          {dice.map(die =>
            <Die
              key={die.id}
              value={die.value}
              isHeld={die.isHeld}
              holdDice={() => holdDice(die.id)}
            />)}
        </div>
        <button
          className="roll-btn"
          onClick={rollDice}>{tenzi ? "New Game" : "Roll"}
        </button>
      </main>
    </div>
  );
}