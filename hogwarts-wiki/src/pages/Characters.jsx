import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllCharacters } from "../services/api";
import CharacterCard from "../components/CharacterCard";
import SearchBar from "../components/SearchBar";
import GoldenSnitch from "../components/GoldenSnitch";

// House list for filter buttons
const houses = ["All", "Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"];

// How many characters to add on each "Load More" click
const ITEMS_PER_PAGE = 12;

function Characters() {
  // ─── STATES ───
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // ─── URL QUERY PARAMETERS ───
  /*
    useSearchParams → returns [searchParams, setSearchParams]
    - searchParams.get("house") → reads the ?house=xxx value from the URL
    - setSearchParams({house: "Gryffindor"}) → writes ?house=Gryffindor to the URL

    || "All" → use "All" if the house parameter is not in the URL
  */
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedHouse = searchParams.get("house") || "All";

  // ─── API CALL ───
  useEffect(() => {
    getAllCharacters()
      .then((data) => setCharacters(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // ─── HOUSE FILTER BUTTON CLICK ───
  const handleHouseFilter = (house) => {
    if (house === "All") {
      setSearchParams({}); // Remove ?house=xxx from URL → /characters
    } else {
      setSearchParams({ house }); // Add ?house=Gryffindor to URL
    }
    setVisibleCount(ITEMS_PER_PAGE); // Reset pagination when filter changes
  };

  // ─── CHAINED FILTERING ───
  /*
    .filter() checks two conditions at once:
    1. matchesHouse: if selected house is "All", include everyone; otherwise only that house
    2. matchesSearch: include characters whose name matches the search term

    Characters where both are true enter the filtered list
  */
  const filteredCharacters = characters.filter((char) => {
    const matchesHouse = selectedHouse === "All" || char.house === selectedHouse;
    const matchesSearch = char.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesHouse && matchesSearch;
  });

  // ─── PAGINATION ───
  /*
    .slice(0, visibleCount) → take visibleCount elements from the start of the array
    First render: slice(0, 12) → first 12 characters
    1x Load More: slice(0, 24) → first 24 characters

    hasMore: are there more characters to show?
  */
  const visibleCharacters = filteredCharacters.slice(0, visibleCount);
  const hasMore = visibleCount < filteredCharacters.length;

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
        🧙 Characters
      </h1>
      <p className="text-text-muted text-center font-crimson italic mb-8">
        Wizards, witches and magical creatures of the wizarding world
      </p>

      {/* Search bar */}
      <SearchBar
        value={searchTerm}
        onChange={(val) => {
          setSearchTerm(val);
          setVisibleCount(ITEMS_PER_PAGE); // Reset pagination when search changes
        }}
        placeholder="Search characters by name..."
      />

      {/* ─── HOUSE FILTER BUTTONS ─── */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {houses.map((house) => (
          <button
            key={house}
            onClick={() => handleHouseFilter(house)}
            className={`px-4 py-2 rounded-lg text-sm font-raleway font-medium transition-all duration-300 ${
              // Show the active house button in a different color
              selectedHouse === house
                ? "bg-accent text-dark"                    // Selected: gold background
                : "bg-card border border-accent/10 text-text-muted hover:border-accent/30 hover:text-text-primary" // Not selected
            }`}
          >
            {house}
          </button>
        ))}
      </div>

      <p className="text-text-muted text-sm text-center mb-6">
        Showing {visibleCharacters.length} of {filteredCharacters.length} characters
      </p>

      {visibleCharacters.length > 0 ? (
        <>
          {/* Character grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {visibleCharacters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>

          {/* ─── LOAD MORE BUTTON ─── */}
          {/*
            Show if hasMore is true
            On click, increase visibleCount by ITEMS_PER_PAGE
            prev => prev + 12 → functional update
            (takes the previous state value and adds to it)
          */}
          {hasMore && (
            <div className="text-center mt-10">
              <button
                onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
                className="px-8 py-3 bg-accent/10 border border-accent/30 text-accent rounded-xl font-raleway font-medium hover:bg-accent/20 transition-all duration-300"
              >
                Load More ({filteredCharacters.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-text-muted text-center py-10 font-crimson italic">
          No characters found
        </p>
      )}
    </div>
  );
}

export default Characters;
