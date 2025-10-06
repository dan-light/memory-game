import { useState } from "react";
import { useEffect } from "react";
import Card from "./Card";

export default function GameManager() {
  const [score, setScore] = useState(0);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Initialize cards
    const min = 1;
    const max = 500;
    const arr = Array.from(
      { length: 16 },
      () => Math.floor(Math.random() * (max - min + 1)) + min,
    );
    // arr now contains 16 random integers between 1 and 500 (inclusive)
    const newCards = arr;
    setCards(newCards);
  }, []);

  return (
    <div>
      <h1>Memory Game</h1>
      <div className="card-container">
        {cards.map((index) => (
          <Card id={index} />
        ))}
      </div>
      <div>
        <p>Score: {score}</p>
      </div>
    </div>
  );
}
