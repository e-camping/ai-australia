/**
 * Main App component - manages game state and navigation
 */

import { useState } from "react";
import ModelLoader from "./components/ModelLoader";
import Instructions from "./components/Instructions";
import GameBoard from "./components/GameBoard";
import "./App.css";

function App() {
  const [modelLoaded, setModelLoaded] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameKey, setGameKey] = useState(0);

  const handleModelLoaded = () => {
    setModelLoaded(true);
  };

  const handleStart = () => {
    setGameStarted(true);
  };

  const handleReset = () => {
    // Reset the game by incrementing the key (forces remount)
    setGameKey((prev) => prev + 1);
  };

  return (
    <div className="app">
      {!modelLoaded ? (
        <ModelLoader onLoaded={handleModelLoaded} />
      ) : !gameStarted ? (
        <Instructions onStart={handleStart} />
      ) : (
        <GameBoard key={gameKey} onReset={handleReset} />
      )}
    </div>
  );
}

export default App;
