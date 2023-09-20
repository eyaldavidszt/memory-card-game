/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
const seen = [];
const updateDisplay = (data) => {
  //make array until it's a good one and then return it.
  // a good array is one that has AT LEAST 1 novel card and 5 different pokemon
  //first, pick 5 different pokemon. write the code:
  for (;;) {
    const indeces = [];
    const display = [];
    let count = 0;
    while (count < 5) {
      const randIndex = Math.floor(Math.random() * 1021);
      if (!indeces.includes(randIndex)) {
        indeces.push(randIndex);
        display.push(data[randIndex]);
        count += 1;
      }
    }
    if (display.some((item) => !seen.includes(item))) return display;
  }
};
async function expandPoke(array) {}
export default function App() {
  const [pokeDisplay, setPokeDisplay] = useState([]);
  const [pokeData, setPokeData] = useState([]);

  useEffect(() => {
    (async function fetchPokemon() {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=1021&offset=0",
        { mode: "cors" }
      );
      const pokeDataRaw = await response.json();
      const pokeData = pokeDataRaw.results;

      setPokeData(pokeData);
    })();
  }, []);

  useEffect(() => {
    if (pokeData.length === 0) return;
    setPokeDisplay(updateDisplay(pokeData));
  }, [pokeData]);

  return (
    <>
      {pokeDisplay.map((poke) => (
        <h1 key={poke.name}>{poke.name}</h1>
      ))}
    </>
  );
}
