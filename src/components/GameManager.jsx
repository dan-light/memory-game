import { useState } from "react";
import { useEffect } from "react";
import Card from "./Card";

export default function GameManager() {
  const [score, setScore] = useState(0);
  const [cards, setCards] = useState([]);
  const [board, setBoard] = useState([]);
  const [guessedCards, setGuessedCards] = useState([]);

  useEffect(() => {
    // Initialize cards
    const min = 1;
    const max = 500;
    const arr = Array.from(
      { length: 8 },
      () => Math.floor(Math.random() * (max - min + 1)) + min,
    );
    // arr now contains 16 random integers between 1 and 500 (inclusive)
    const newCards = arr.map((index) => ({
      id: index,
      flipped: false,
      found: false,
      key: crypto.randomUUID(),
    }));
    setCards(newCards);
    makeBoard(newCards);
  }, []);

  useEffect(() => {
    // need to implement guessing logic here!!
  }, [guessedCards]);

  function makeBoard(c) {
    // make a board array out of 8 unique cards
    let b = [];
    c.forEach((card) => {
      b.push({ ...card });
      b.push({ ...card, key: crypto.randomUUID() });
    });
    let currentIndex = b.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [b[currentIndex], b[randomIndex]] = [b[randomIndex], b[currentIndex]];
    }
    setBoard(b);
  }

  // Handler to flip a card by id
  function handleFlip(id) {
    setBoard((prevCards) =>
      prevCards.map((card) =>
        card.key === id ? { ...card, flipped: !card.flipped } : card,
      ),
    );
  }

  return (
    <div>
      <h1>PokeMatch</h1>
      <div className="card-container">
        {board.map((card) => (
          <Card
            id={card.id}
            isFlipped={card.flipped}
            onFlip={() => handleFlip(card.key)}
          />
        ))}
      </div>
      <div>
        <p>Score: {score}</p>
      </div>
    </div>
  );
}
