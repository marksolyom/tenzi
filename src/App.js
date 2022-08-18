import { useState } from 'react';
import Die from "./components/Die";
import { nanoid } from "nanoid";

export default function App() {

  const [dice, setDice] = useState(AllNewDice())

  function genNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function AllNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(genNewDie())
    }
    return newDice;
  }

  function rollDice() {
    setDice(prevDice => prevDice.map(die => {
      return die.isHeld ? die : genNewDie()
    }));
  }

  function holdDice(id) {
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ?
        { ...die, isHeld: !die.isHeld } :
        die
    }))
  }

  return (
    <div className="App">
      <main>
        <h1 className="title">Tenzies</h1>
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
          onClick={rollDice}>Roll
        </button>
      </main>
    </div>
  );
}