import { useState } from "react";
import { useEffect } from "react";
import { Container, Title, Group, Text, Paper, Stack } from "@mantine/core";
import PrefPane from "./PrefPane";
import Card from "./Card";
import pokeballIcon from "../assets/Poke_Ball_icon.svg";
import gymBadgeIcon from "../assets/gymbadge.png";

const genIdRanges = {
  gen1: { start: 1, end: 151 }, // Pokémon Red/Blue/Yellow
  gen2: { start: 152, end: 251 }, // Pokémon Gold/Silver/Crystal
  gen3: { start: 252, end: 386 }, // Pokémon Ruby/Sapphire/Emerald
  gen4: { start: 387, end: 493 }, // Pokémon Diamond/Pearl/Platinum
  gen5: { start: 494, end: 649 }, // Pokémon Black/White
  gen6: { start: 650, end: 721 }, // Pokémon X/Y
  gen7: { start: 722, end: 809 }, // Pokémon Sun/Moon, Ultra Sun/Ultra Moon
  gen8: { start: 810, end: 905 }, // Pokémon Sword/Shield, Legends: Arceus
  gen9: { start: 906, end: 1025 }, // Pokémon Scarlet/Violet
};

const cardBacks = {
  pokeball: pokeballIcon,
  gymbadge: gymBadgeIcon,
};

function getRandomPokemonId(gens) {
  // Get all enabled generation ranges
  const enabledRanges = Object.entries(gens)
    .filter(([gen, isEnabled]) => isEnabled)
    .map(([gen]) => genIdRanges[gen]);

  if (enabledRanges.length === 0) {
    return 25; // Default to Pikachu if no generations selected
  }

  // Flatten ranges into one array of possible IDs
  const possibleIds = enabledRanges.flatMap((range) =>
    Array.from(
      { length: range.end - range.start + 1 },
      (_, i) => range.start + i,
    ),
  );

  // Get random ID from possible IDs
  const randomIndex = Math.floor(Math.random() * possibleIds.length);
  return possibleIds[randomIndex];
}

export default function GameManager() {
  const [score, setScore] = useState(0);
  const [board, setBoard] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]); // currently flipped cards
  const [matchedPairs, setMatchedPairs] = useState([]); // pairs that have been matched
  const [moves, setMoves] = useState(0); // track number of attempts
  const [gameOver, setGameOver] = useState(false); // is the game complete?
  const [gens, setGens] = useState({
    gen1: true,
    gen2: true,
    gen3: true,
    gen4: true,
    gen5: true,
    gen6: true,
    gen7: true,
    gen8: true,
    gen9: true,
  });
  const [selectedCardBack, setSelectedCardBack] = useState("pokeball");

  // Debug log whenever gens changes
  useEffect(() => {
    localStorage.clear();
    console.log("GameManager gens:", gens);
  }, [gens]);

  useEffect(() => {
    // Initialize cards
    const arr = Array.from({ length: 8 }, () => getRandomPokemonId(gens));
    // arr now contains 8 random integers between 1 and 950 (inclusive)
    const newCards = arr.map((index) => ({
      id: index,
      flipped: false,
      found: false,
      key: crypto.randomUUID(),
    }));
    makeBoard(newCards);
    setMoves(0);
    setFlippedCards([]);
  }, [gens]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      setTimeout(() => {
        const card1 = getCardByKey(flippedCards[0]);
        const card2 = getCardByKey(flippedCards[1]);

        if (card1.id === card2.id && card1.key !== card2.key) {
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
  }, [flippedCards, matchedPairs]);

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

    // Prevent flipping if card is already flipped
    if (card.flipped) return;

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
    <Container size="lg" p={0} px={{ base: 5, xs: "lg" }}>
      <Stack gap={5} align="center">
        <div className="hArea">
          <h1>PokeMatch</h1>
          <PrefPane
            gens={gens}
            onGenChange={setGens}
            cardBacks={cardBacks}
            onCardBackChange={setSelectedCardBack}
          />
        </div>
        <Paper p={5} radius="lg" className="card-container">
          {board.map((card) => (
            <Card
              key={card.key}
              id={card.id}
              isFlipped={card.flipped || card.found}
              found={card.found}
              onFlip={() => handleFlip(card.key)}
              cardBack={cardBacks[selectedCardBack] || pokeballIcon}
            />
          ))}
        </Paper>
        <Group gap="md" justify="center">
          <Text size="xl" fw={700}>
            Score: {score}
          </Text>
          <Text size="xl" fw={700}>
            Moves: {moves}
          </Text>
        </Group>
        {gameOver && (
          <Title order={2} c="green.6">
            Congratulations! Game Complete!
          </Title>
        )}
      </Stack>
    </Container>
  );
}
