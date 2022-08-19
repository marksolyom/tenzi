import { useState, useEffect } from 'react';
import Die from "./components/Die";
import Counter from "./components/Counter";
import { nanoid } from "nanoid";
import Confetti from 'react-confetti'

export default function App() {

  const [dice, setDice] = useState(allNewDice());
  const [tenzi, setTenzi] = useState(false);
  const [rollCounter, setRollCounter] = useState(1);
  const [record, setRecord] = useState(JSON.parse(localStorage.getItem("record") || [1000]))

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every(die => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzi(true);
      saveRecord();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dice])

  function saveRecord() {
    if (rollCounter < record) {
      localStorage.setItem("record", JSON.stringify(rollCounter))
      setRecord((JSON.parse(localStorage.getItem("record"))))
    }

  }

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
    setRollCounter(prevRollCounter => prevRollCounter + 1);
    if (!tenzi) {
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ? die : genNewDie();
      }));
    } else {
      setTenzi(false);
      setRollCounter(1);
      setDice(allNewDice);
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
        <p className="instructions">Roll until all dice are the same. Click each die to hold it between rolls.</p>
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
        <Counter counter={rollCounter} record={record} />
      </main>
    </div>
  );
}