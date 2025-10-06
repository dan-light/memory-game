import { useState } from "react";
import { useEffect } from "react";

export default function Card({ id, isFlipped, onFlip }) {
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
    <div className={`card ${isFlipped ? "flipped" : ""}`} onClick={onFlip}>
      {isFlipped ? (
        <div className="card-front">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <h2>{pokemonData.name}</h2>
              <img
                src={pokemonData.sprites.front_default}
                alt={`Pokemon ${id}`}
              />
            </>
          )}
        </div>
      ) : (
        <div className="card-back">?</div>
      )}
    </div>
  );
}
