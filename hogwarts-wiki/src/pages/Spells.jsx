import { useState, useEffect } from "react";
import { getAllSpells } from "../services/api";
import SpellCard from "../components/SpellCard";
import SearchBar from "../components/SearchBar";
import GoldenSnitch from "../components/GoldenSnitch";

const ITEMS_PER_PAGE = 18;

function Spells() {
  const [spells, setSpells] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    getAllSpells()
      .then((data) => setSpells(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Search in both name and description
  // || operator: show spell if either condition is true
  const filteredSpells = spells.filter((spell) => {
    const term = searchTerm.toLowerCase();
    return (
      spell.name.toLowerCase().includes(term) ||
      (spell.description && spell.description.toLowerCase().includes(term))
    );
  });

  const visibleSpells = filteredSpells.slice(0, visibleCount);
  const hasMore = visibleCount < filteredSpells.length;

  if (loading) return <GoldenSnitch />;
  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-400 font-crimson text-xl">⚠️ {error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="font-cinzel font-bold text-4xl text-accent text-center mb-4 tracking-wider">
        ✨ Spells
      </h1>
      <p className="text-text-muted text-center font-crimson italic mb-8">
        The complete spellbook of the wizarding world
      </p>

      <SearchBar
        value={searchTerm}
        onChange={(val) => {
          setSearchTerm(val);
          setVisibleCount(ITEMS_PER_PAGE);
        }}
        placeholder="Search spells by name or description..."
      />

      <p className="text-text-muted text-sm text-center mb-6">
        Showing {visibleSpells.length} of {filteredSpells.length} spells
      </p>

      {visibleSpells.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleSpells.map((spell) => (
              <SpellCard key={spell.id} spell={spell} />
            ))}
          </div>

          {hasMore && (
            <div className="text-center mt-10">
              <button
                onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
                className="px-8 py-3 bg-accent/10 border border-accent/30 text-accent rounded-xl font-raleway font-medium hover:bg-accent/20 transition-all duration-300"
              >
                Load More ({filteredSpells.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-text-muted text-center py-10 font-crimson italic">
          No spells found matching "{searchTerm}"
        </p>
      )}
    </div>
  );
}

export default Spells;
