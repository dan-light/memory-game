import { useState } from "react";
import { useEffect } from "react";

export default function Card({ id, isFlipped, onFlip, found }) {
  //const [isFlipped, setIsFlipped] = useState(false);
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemonData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Pokémon:", error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div
      className={`card ${isFlipped ? "flipped" : ""} ${found ? "found" : ""}`}
      onClick={onFlip}
    >
      {isFlipped ? (
        <div className="card-inner">
          <div className="card-front">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <>
                <h3>{pokemonData.name}</h3>
                <img
                  src={pokemonData.sprites.front_default}
                  alt={`Pokemon ${id}`}
                />
                <p className="type">type: {pokemonData.types[0].type.name}</p>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="card-back">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
            className="cardBack"
            alt="Pokeball"
          />
        </div>
      )}
    </div>
  );
}
