import { useState } from "react";
import Card from "./components/Card.jsx";
import GameManager from "./components/GameManager.jsx";
import "./App.css";
import PrefPane from "./components/PrefPane.jsx";

function App() {
  return (
    <div className="App">
      <GameManager />
    </div>
  );
}

export default App;
