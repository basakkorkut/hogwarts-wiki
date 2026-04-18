import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCharacterById } from "../services/api";
import GoldenSnitch from "../components/GoldenSnitch";

// Different color theme for each house
const houseThemes = {
  Gryffindor: {
    bg: "from-gryffindor/30 to-gryffindor-gold/10",
    badge: "bg-gryffindor text-gryffindor-gold",
    border: "border-gryffindor/30",
  },
  Slytherin: {
    bg: "from-slytherin/30 to-emerald-900/10",
    badge: "bg-slytherin text-green-200",
    border: "border-slytherin/30",
  },
  Ravenclaw: {
    bg: "from-ravenclaw/30 to-blue-900/10",
    badge: "bg-ravenclaw text-blue-200",
    border: "border-ravenclaw/30",
  },
  Hufflepuff: {
    bg: "from-amber-900/30 to-yellow-900/10",
    badge: "bg-hufflepuff-black text-hufflepuff",
    border: "border-amber-700/30",
  },
};

function CharacterDetail() {
  const { id } = useParams();    // Get UUID from URL
  const navigate = useNavigate(); // For the back button

  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCharacterById(id)
      .then((data) => {
        // HP-API returns an array even for a single character → take the first element
        if (data && data.length > 0) {
          setCharacter(data[0]);
        } else {
          setError("Character not found");
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <GoldenSnitch />;
  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-400 font-crimson text-xl">⚠️ {error}</p>
        <button
          onClick={() => navigate("/characters")}
          className="mt-4 text-accent hover:underline font-raleway"
        >
          ← Back to Characters
        </button>
      </div>
    );
  }

  // Determine theme colors based on the character's house
  // houseThemes[character.house] → returns red theme object if Gryffindor
  // || { ... } → default colors if house info is missing
  const theme = houseThemes[character.house] || {
    bg: "from-accent/10 to-transparent",
    badge: "bg-card text-text-muted",
    border: "border-accent/10",
  };

  /*
    infoItems: Define info fields to display as an array
    .filter(item => item.value) → remove items where value is empty/undefined

    Why do we do this?
    Not all fields are filled for every character.
    Example: some characters don't have a patronus, some don't have a birth date.
    With this approach, empty fields are hidden automatically.
  */
  const infoItems = [
    { label: "Species", value: character.species },
    { label: "Gender", value: character.gender },
    { label: "Date of Birth", value: character.dateOfBirth },
    { label: "Ancestry", value: character.ancestry },
    { label: "Eye Colour", value: character.eyeColour },
    { label: "Hair Colour", value: character.hairColour },
    { label: "Patronus", value: character.patronus },
    { label: "Actor", value: character.actor },
    { label: "Year of Birth", value: character.yearOfBirth },
  ].filter((item) => item.value); // Filter out empty values

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <button
        onClick={() => navigate("/characters")}
        className="text-text-muted hover:text-accent transition-colors font-raleway text-sm mb-8 flex items-center gap-2"
      >
        ← Back to Characters
      </button>

      <div className={`bg-card rounded-2xl border ${theme.border} overflow-hidden`}>
        {/* Top color gradient stripe — in the house's color */}
        <div className={`h-2 bg-gradient-to-r ${theme.bg}`} />

        <div className="md:flex">
          {/* Left: Character image */}
          <div className="md:w-1/3 bg-bg p-8 flex items-center justify-center">
            {character.image ? (
              <img
                src={character.image}
                alt={character.name}
                className="w-48 h-48 object-cover rounded-full border-4 border-accent/20 shadow-lg"
              />
            ) : (
              <div className="w-48 h-48 rounded-full bg-card flex items-center justify-center text-6xl border-4 border-accent/10">
                🧙
              </div>
            )}
          </div>

          {/* Right: Character information */}
          <div className="md:w-2/3 p-8">
            <div className="flex items-start justify-between mb-4">
              <h1 className="font-cinzel font-bold text-3xl text-text-primary tracking-wide">
                {character.name}
              </h1>
              {character.house && (
                <span className={`${theme.badge} px-3 py-1 rounded-lg text-sm font-raleway font-bold`}>
                  {character.house}
                </span>
              )}
            </div>

            {/* Alternate names (if any) */}
            {character.alternate_names && character.alternate_names.length > 0 && (
              <p className="text-text-muted font-crimson italic mb-6">
                Also known as: {character.alternate_names.join(", ")}
              </p>
            )}

            {/* Info fields — 2-column grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {infoItems.map((item) => (
                <div key={item.label} className="bg-bg/50 rounded-lg p-3">
                  <p className="text-text-muted text-xs font-raleway uppercase tracking-wider mb-1">
                    {item.label}
                  </p>
                  <p className="text-text-primary font-crimson text-base capitalize">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Wand info (if any) */}
            {character.wand && (character.wand.wood || character.wand.core) && (
              <div className="border-t border-accent/10 pt-6">
                <h2 className="font-cinzel text-accent text-lg mb-3">🪄 Wand</h2>
                <div className="flex flex-wrap gap-4">
                  {character.wand.wood && (
                    <span className="bg-bg/50 px-3 py-1 rounded-lg text-text-muted text-sm font-raleway">
                      Wood: <span className="text-text-primary capitalize">{character.wand.wood}</span>
                    </span>
                  )}
                  {character.wand.core && (
                    <span className="bg-bg/50 px-3 py-1 rounded-lg text-text-muted text-sm font-raleway">
                      Core: <span className="text-text-primary capitalize">{character.wand.core}</span>
                    </span>
                  )}
                  {character.wand.length && (
                    <span className="bg-bg/50 px-3 py-1 rounded-lg text-text-muted text-sm font-raleway">
                      Length: <span className="text-text-primary">{character.wand.length}"</span>
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Status badges */}
            <div className="flex flex-wrap gap-2 mt-6">
              {character.hogwartsStudent && (
                <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-raleway">
                  🎓 Hogwarts Student
                </span>
              )}
              {character.hogwartsStaff && (
                <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-raleway">
                  👨‍🏫 Hogwarts Staff
                </span>
              )}
              {character.wizard && (
                <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-raleway">
                  ✨ Wizard
                </span>
              )}
              {!character.alive && (
                <span className="bg-red-900/30 text-red-400 px-3 py-1 rounded-full text-xs font-raleway">
                  💀 Deceased
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetail;
