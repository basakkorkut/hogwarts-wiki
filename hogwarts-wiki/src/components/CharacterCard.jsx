import { Link } from "react-router-dom";

// Match the border and shadow colors to the character's house
const houseColors = {
  Gryffindor: "border-gryffindor/50 hover:shadow-gryffindor/20",
  Slytherin: "border-slytherin/50 hover:shadow-slytherin/20",
  Ravenclaw: "border-ravenclaw/50 hover:shadow-ravenclaw/20",
  Hufflepuff: "border-hufflepuff/50 hover:shadow-hufflepuff/20",
};

// Match the badge colors to the character's house
const houseBadgeColors = {
  Gryffindor: "bg-gryffindor text-gryffindor-gold",
  Slytherin: "bg-slytherin text-green-200",
  Ravenclaw: "bg-ravenclaw text-blue-200",
  Hufflepuff: "bg-hufflepuff-black text-hufflepuff",
};

function CharacterCard({ character }) {
  // Character's house determines the border and badge colors
  const borderClass = houseColors[character.house] || "border-accent/10";
  const badgeClass = houseBadgeColors[character.house] || "bg-card text-text-muted";

  return (
    <Link
      to={`/characters/${character.id}`}
      className={`group block bg-card rounded-2xl overflow-hidden border ${borderClass} transition-all duration-500 hover:shadow-[0_0_30px] no-underline`}
    >
      {/* Character image */}
      <div className="relative overflow-hidden h-56 bg-bg flex items-center justify-center">
        {/* Image if available, otherwise show emoji placeholder */}
        {character.image ? (
          <img
            src={character.image}
            alt={character.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="text-5xl opacity-30">🧙</div>
        )}

        {/* Top right house badge */}
        {character.house && (
          <div className={`absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded-lg font-raleway ${badgeClass}`}>
            {character.house}
          </div>
        )}
      </div>

      {/* Character information */}
      <div className="p-4">
        <h3 className="font-crimson font-bold text-text-primary text-base mb-1 group-hover:text-accent transition-colors duration-300 truncate">
          {character.name}
        </h3>
        {/* truncate: if the name is too long */}
        {character.actor && (
          <p className="text-text-muted text-xs font-raleway truncate">
            {character.actor}
          </p>
        )}
      </div>
    </Link>
  );
}

export default CharacterCard;