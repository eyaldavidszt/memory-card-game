/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
const seen = [];
const updateDisplay = (data) => {
  //make array until it's a good one and then return it.
  console.log(data);
  return [];
};
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
      <div>hello</div>
    </>
  );
}
