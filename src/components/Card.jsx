import { useState } from "react";
import { useEffect } from "react";
import pokeballIcon from "../assets/Poke_Ball_icon.svg";

function cacheKey(id) {
  return `pokemon_${id}`;
}

function checkCache(id) {
  const cached = localStorage.getItem(cacheKey(id));
  return cached ? JSON.parse(cached) : null;
}

function addToCache(id, data) {
  localStorage.setItem(cacheKey(id), JSON.stringify(data));
}

export default function Card({ id, isFlipped, onFlip, found, cardBack }) {
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemonData() {
      setLoading(true);

      // Check cache first
      const cachedData = checkCache(id);
      if (cachedData) {
        setPokemonData(cachedData);
        setLoading(false);
        return;
      }

      // If not in cache, fetch from API
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();

        // Cache the data
        try {
          addToCache(id, data);
        } catch (error) {
          if (error.name === "QuotaExceededError") {
            localStorage.clear();
          }
        }
        setPokemonData(data);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
      setLoading(false);
    }

    fetchPokemonData();
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
                  style={{
                    width: "auto",
                    height: "auto",
                    maxWidth: "80%",
                    maxHeight: "40%",
                    objectFit: "contain",
                  }}
                />
                <p className="type">type: {pokemonData.types[0].type.name}</p>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="card-back">
          <img
            src={cardBack || pokeballIcon}
            className="cardBack"
            alt="Card Back"
            style={{
              width: "auto",
              height: "auto",
              maxWidth: "60%",
              maxHeight: "60%",
              objectFit: "contain",
            }}
          />
        </div>
      )}
    </div>
  );
}
