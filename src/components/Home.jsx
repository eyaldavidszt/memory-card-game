import App from "./App";
import "../styles/home.css";
import { useState } from "react";
export default function Home() {
  const [started, setStarted] = useState(false);
  function handleStart() {
    setStarted(true);
  }
  if (started) return <App />;

  return (
    <>
      <header className="content">
        <h1>Pokémemory!</h1>
        <h2>dont click the same pokémon twice!</h2>
        <button onClick={handleStart}>START</button>
      </header>
    </>
  );
}
