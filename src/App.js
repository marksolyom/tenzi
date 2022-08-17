import {useState} from 'react';
import {nanoid} from "nanoid"
import Die from "./components/Die"

export default function App() {

  const [dice, setDice] = useState(newDice())

  function newDice() {
    const diceArr = [];
    for(let i=0; i<10; i++) {
      diceArr.push({
        id: nanoid(),
        value: Math.floor(Math.random()*6+1), 
        isHeld: false,
      })
    }
    return diceArr;
  }

  function rollDice() {
    setDice(newDice())
  }

  console.log(dice)

  return (
    <div className="App">
      <main>
        <div className="dice-container">
          {dice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} />)}
        </div>
        <button className="roll-btn" onClick={rollDice}>Roll</button>
      </main>
    </div>
  );
}