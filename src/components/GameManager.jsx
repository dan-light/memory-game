import { useState } from "react";
import { useEffect } from "react";
import Card from "./Card";

export default function GameManager() {
  const [score, setScore] = useState(0);
  const [board, setBoard] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]); // currently flipped cards
  const [matchedPairs, setMatchedPairs] = useState([]); // pairs that have been matched
  const [moves, setMoves] = useState(0); // track number of attempts
  const [gameOver, setGameOver] = useState(false); // is the game complete?

  useEffect(() => {
    // Initialize cards
    const min = 1;
    const max = 950;
    const arr = Array.from(
      { length: 8 },
      () => Math.floor(Math.random() * (max - min + 1)) + min,
    );
    // arr now contains 8 random integers between 1 and 950 (inclusive)
    const newCards = arr.map((index) => ({
      id: index,
      flipped: false,
      found: false,
      key: crypto.randomUUID(),
    }));
    makeBoard(newCards);
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      setTimeout(() => {
        const card1 = getCardByKey(flippedCards[0]);
        const card2 = getCardByKey(flippedCards[1]);

        if (card1.id === card2.id) {
          // It's a match!
          setBoard((prevBoard) =>
            prevBoard.map((card) =>
              card.id === card1.id
                ? { ...card, found: true, flipped: true }
                : card,
            ),
          );
          setMatchedPairs((prev) => [...prev, card1.id]);
          setScore(score + 1);

          // Check for game over
          if (matchedPairs.length + 1 === 8) {
            // 8 pairs total
            setGameOver(true);
          }
        }
        setMoves(moves + 1);
        resetBoard();
        setFlippedCards([]);
      }, 1000);
    }
  }, [flippedCards, score, moves, matchedPairs]);

  function makeBoard(cards) {
    // make a board array out of 8 unique cards
    let b = [];
    let instanceCounter = 0;
    cards.forEach((card) => {
      b.push({ ...card, instanceId: instanceCounter++ });
      b.push({
        ...card,
        key: crypto.randomUUID(),
        instanceId: instanceCounter++,
      });
    });

    // Shuffle the board
    let currentIndex = b.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [b[currentIndex], b[randomIndex]] = [b[randomIndex], b[currentIndex]];
    }
    setBoard(b);
  }

  function getCardByKey(key) {
    return board.find((card) => card.key === key);
  }

  function handleFlip(key) {
    // Prevent flipping if two cards are already flipped
    if (flippedCards.length === 2) return;

    // Prevent flipping if card is already found
    const card = getCardByKey(key);
    if (card.found) return;

    setBoard((prevCards) =>
      prevCards.map((card) =>
        card.key === key ? { ...card, flipped: true } : card,
      ),
    );
    setFlippedCards((prev) => [...prev, key]);
  }

  function resetBoard() {
    setBoard((prevCards) =>
      prevCards.map((card) =>
        card.found ? { ...card, flipped: true } : { ...card, flipped: false },
      ),
    );
  }

  return (
    <div>
      <h1>PokeMatch</h1>
      <div className="card-container">
        {board.map((card) => (
          <Card
            key={card.key}
            id={card.id}
            isFlipped={card.flipped || card.found}
            found={card.found}
            onFlip={() => handleFlip(card.key)}
          />
        ))}
      </div>
      <div className="game-stats">
        <p>Score: {score}</p>
        <p>Moves: {moves}</p>
        {gameOver && <h2>Congratulations! Game Complete!</h2>}
      </div>
    </div>
  );
}
