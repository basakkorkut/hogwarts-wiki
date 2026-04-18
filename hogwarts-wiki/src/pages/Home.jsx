
import { Link } from "react-router-dom";

// Static data for each section card
const sections = [
  {
    to: "/books",        // URL the Link navigates to
    title: "Books",
    emoji: "📚",
    description: "Explore all 8 books of the Harry Potter saga",
    color: "from-gryffindor to-gryffindor-gold", // gradient colors
  },
  {
    to: "/characters",
    title: "Characters",
    emoji: "🧙",
    description: "Discover wizards, witches and magical creatures",
    color: "from-slytherin to-emerald-700",
  },
  {
    to: "/spells",
    title: "Spells",
    emoji: "✨",
    description: "Browse the complete spellbook of the wizarding world",
    color: "from-ravenclaw to-blue-800",
  },
  {
    to: "/sorting-hat",
    title: "Sorting Hat",
    emoji: "🎩",
    description: "Take the quiz and discover your Hogwarts house",
    color: "from-amber-900 to-amber-700",
  },
];

function Home() {
  return (
    <div className="min-h-screen">

      {/* ===== HERO SECTION ===== */}
      {/* Large introductory area at the top of the page */}
      {/* relative: absolute elements inside are positioned relative to this */}
      {/* overflow-hidden: prevents gradient overflow */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        {/* Subtle gold gradient background effect */}
        {/* absolute inset-0: covers the entire parent area */}
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />

        {/* relative: renders above the gradient */}
        <div className="relative max-w-4xl mx-auto">
          <h1 className="font-cinzel font-bold text-5xl md:text-7xl text-accent mb-6 tracking-wider">
            ⚡ Hogwarts Wiki
          </h1>
          <p className="font-crimson text-xl md:text-2xl text-text-muted italic max-w-2xl mx-auto leading-relaxed">
            "It does not do to dwell on dreams and forget to live."
          </p>
          <p className="text-text-muted/50 text-sm mt-2 font-raleway">
            — Albus Dumbledore
          </p>
        </div>
      </section>

      {/* ===== SECTION CARDS ===== */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <h2 className="font-cinzel text-2xl text-text-primary text-center mb-12 tracking-wide">
          Explore the Wizarding World
        </h2>

        {/*
          Responsive grid:
          - grid-cols-1    → each card takes full width on mobile (1 column)
          - sm:grid-cols-2 → 2 columns above 640px
          - lg:grid-cols-4 → 4 columns above 1024px
          - gap-6          → 24px gap between cards
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/*
            .map() → creates a card for each element in the sections array
            key={section.to} → so React can uniquely identify each element
            React uses key to understand which element changed when items are
            added/removed from a list. Without key, it re-renders the entire list.
          */}
          {sections.map((section) => (
            <Link
              key={section.to}
              to={section.to}
              className="group block no-underline"
            >
              <div className="relative bg-card rounded-2xl p-6 border border-accent/10 hover:border-accent/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(226,183,20,0.1)] h-full">
                {/* Thin colored gradient stripe at the top of the card */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${section.color} rounded-t-2xl opacity-50 group-hover:opacity-100 transition-opacity`} />

                <div className="text-4xl mb-4">{section.emoji}</div>
                <h3 className="font-cinzel font-bold text-text-primary text-lg mb-2 group-hover:text-accent transition-colors">
                  {section.title}
                </h3>
                <p className="text-text-muted text-sm font-raleway leading-relaxed">
                  {section.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== HOGWARTS HOUSES ===== */}
      {/*
        Each house card navigates to the Characters page with a query parameter
        Example: /characters?house=Gryffindor
        Characters.jsx reads this parameter with useSearchParams
        and automatically filters by that house
      */}
      <section className="max-w-4xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Gryffindor", emoji: "🦁", color: "bg-gryffindor/20 border-gryffindor/30" },
            { name: "Slytherin", emoji: "🐍", color: "bg-slytherin/20 border-slytherin/30" },
            { name: "Ravenclaw", emoji: "🦅", color: "bg-ravenclaw/20 border-ravenclaw/30" },
            { name: "Hufflepuff", emoji: "🦡", color: "bg-amber-900/20 border-amber-700/30" },
          ].map((house) => (
            <Link
              key={house.name}
              to={`/characters?house=${house.name}`}
              className={`block text-center py-6 rounded-xl border ${house.color} hover:scale-105 transition-transform duration-300 no-underline`}
            >
              <div className="text-3xl mb-2">{house.emoji}</div>
              <p className="font-cinzel text-text-primary text-sm tracking-wider">
                {house.name}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
