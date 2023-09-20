/* eslint-disable no-unused-vars */
import { useState, useEffect, Fragment } from "react";
import "../styles/app.css";
const clicked = [];
let count = 0;
const updateDisplay = (data) => {
  while (count < 1) {
    const indeces = [];
    let display = [];
    let count = 0;
    while (count < 5) {
      const randIndex = Math.floor(Math.random() * 1021);
      if (!indeces.includes(randIndex)) {
        indeces.push(randIndex);
        display.push(data[randIndex]);
        count += 1;
      }
    }
    if (display.some((item) => !clicked.includes(item.name))) {
      return display;
    }
  }
};

async function expandPoke(array) {
  const newArr = [];
  for (let poke of array) {
    const response = await fetch(`${poke.url}`, { mode: "cors" });
    const pokeDataRaw = await response.json();
    newArr.push(pokeDataRaw);
  }
  return newArr;
}
export default function App() {
  const [pokeDisplay, setPokeDisplay] = useState([]);
  const [pokeData, setPokeData] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  useEffect(() => {
    (async function fetchPokemon() {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=1021&offset=0",
        { mode: "cors" }
      );
      const pokeDataRaw = await response.json();
      let pokeDataNew = pokeDataRaw.results;
      setPokeData(pokeDataNew);
    })();
  }, []);

  useEffect(() => {
    (async function () {
      if (pokeData.length === 0) return;
      const myArr = await expandPoke(updateDisplay(pokeData));
      setPokeDisplay(myArr);
    })();
  }, [pokeData]);
  console.log(pokeDisplay);
  function handleClick({ currentTarget }) {
    console.log(currentTarget.id);
    if (clicked.includes(currentTarget.id)) setGameOver(true);
    clicked.push(currentTarget.id);
    if (clicked.length === 1021) {
      setGameOver(true);
      return;
    }
    (async function () {
      if (pokeData.length === 0) return;
      const myArr = await expandPoke(updateDisplay(pokeData));
      setPokeDisplay(myArr);
    })();
  }
  if (gameOver)
    return (
      <>
        <div>Game Over!</div>
        <button>Play Again</button>
      </>
    );

  return (
    <div className="card-wrapper">
      {pokeDisplay.map((poke) => (
        <button key={poke.name} onClick={handleClick} id={poke.name}>
          <h2>{poke.name}</h2>
          <img src={poke.sprites.front_default} alt="" />
        </button>
      ))}
    </div>
  );
}
