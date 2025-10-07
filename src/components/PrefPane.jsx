export default function PrefPane({ gens, onGenChange }) {
  // Safety check - if gens is undefined
  if (!gens) {
    console.log("PrefPane: gens is undefined!");
    return null;
  }

  function handleGenChange(genKey) {
    const newGens = {
      ...gens,
      [genKey]: !gens[genKey],
    };
    onGenChange(newGens);
  }

  return (
    <div>
      <h2>Preferences</h2>
      <div className="pref-item">
        <h3>Generations to Include</h3>
        <label>
          <input
            type="checkbox"
            checked={gens.gen1}
            onChange={() => handleGenChange("gen1")}
          />
          Gen 1
        </label>
        <label>
          <input
            type="checkbox"
            checked={gens.gen2}
            onChange={() => handleGenChange("gen2")}
          />
          Gen 2
        </label>
        <label>
          <input
            type="checkbox"
            checked={gens.gen3}
            onChange={() => handleGenChange("gen3")}
          />
          Gen 3
        </label>
        <label>
          <input
            type="checkbox"
            checked={gens.gen4}
            onChange={() => handleGenChange("gen4")}
          />
          Gen 4
        </label>
        <label>
          <input
            type="checkbox"
            checked={gens.gen5}
            onChange={() => handleGenChange("gen5")}
          />
          Gen 5
        </label>
        <label>
          <input
            type="checkbox"
            checked={gens.gen6}
            onChange={() => handleGenChange("gen6")}
          />
          Gen 6
        </label>
      </div>
    </div>
  );
}
