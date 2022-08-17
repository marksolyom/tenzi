import {useState} from 'react';
import Die from "./components/Die"

export default function App() {

  const [dice, setDice] = useState(newDice())

  function newDice() {
    const diceArr = [];
    for(let i=0; i<10; i++) {
      diceArr.push(Math.floor(Math.random()*6+1));
    }
    return diceArr;
  }

  function rollDice() {
    setDice(newDice())
  }

  return (
    <div className="App">
      <main>
        <div className="dice-container">
          {dice.map(die => <Die value={die} />)}
        </div>
        <button className="roll-btn" onClick={rollDice}>Roll</button>
      </main>
    </div>
  );
}