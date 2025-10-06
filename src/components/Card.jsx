import { useState } from "react";
import { useEffect } from "react";

export default function Card({ id }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [spriteUrl, setSpriteUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setSpriteUrl(data.sprites.front_default);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Pokémon:", error);
        setLoading(false);
      });
  }, [id]);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`card ${isFlipped ? "flipped" : ""}`} onClick={handleClick}>
      <div className="card-front">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <img src={spriteUrl} alt={`Pokemon ${id}`} />
        )}
      </div>
      <div className="card-back">{/* Back content */}</div>
    </div>
  );
}
