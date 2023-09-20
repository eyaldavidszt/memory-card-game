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
        <h1>Memory Game!</h1>
        <h2>dont click the same pokémon twice!</h2>
      </header>
      <button onClick={handleStart}>Start</button>
    </>
  );
}
