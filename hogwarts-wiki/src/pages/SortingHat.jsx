import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCharactersByHouse } from "../services/api";


const questions = [
  {
    question: "Which quality do you value most?",
    options: [
      { text: "Courage and bravery", house: "Gryffindor" },
      { text: "Ambition and cunning", house: "Slytherin" },
      { text: "Wisdom and creativity", house: "Ravenclaw" },
      { text: "Loyalty and patience", house: "Hufflepuff" },
    ],
  },
  {
    question: "Which creature would you choose as a companion?",
    options: [
      { text: "Phoenix — bold and resilient", house: "Gryffindor" },
      { text: "Serpent — mysterious and powerful", house: "Slytherin" },
      { text: "Owl — wise and observant", house: "Ravenclaw" },
      { text: "Badger — loyal and hardworking", house: "Hufflepuff" },
    ],
  },
  {
    question: "You find a lost wand in the corridor. What do you do?",
    options: [
      { text: "Try to find the owner myself", house: "Gryffindor" },
      { text: "Keep it — finders keepers", house: "Slytherin" },
      { text: "Study it to understand its properties", house: "Ravenclaw" },
      { text: "Turn it in to a professor", house: "Hufflepuff" },
    ],
  },
  {
    question: "What kind of spell interests you the most?",
    options: [
      { text: "Shield and defense spells", house: "Gryffindor" },
      { text: "Dark arts and forbidden curses", house: "Slytherin" },
      { text: "Complex charms and enchantments", house: "Ravenclaw" },
      { text: "Healing and nurturing spells", house: "Hufflepuff" },
    ],
  },
  {
    question: "Where would you spend most of your time at Hogwarts?",
    options: [
      { text: "The Quidditch pitch", house: "Gryffindor" },
      { text: "The dungeons, plotting strategies", house: "Slytherin" },
      { text: "The library, reading everything", house: "Ravenclaw" },
      { text: "The greenhouse, tending plants", house: "Hufflepuff" },
    ],
  },
];


const houseInfo = {
  Gryffindor: {
    emoji: "🦁",
    color: "from-gryffindor to-gryffindor-gold",
    bg: "bg-gryffindor/20",
    border: "border-gryffindor/40",
    text: "text-gryffindor-gold",
    description: "You belong in Gryffindor, where dwell the brave at heart!",
  },
  Slytherin: {
    emoji: "🐍",
    color: "from-slytherin to-emerald-600",
    bg: "bg-slytherin/20",
    border: "border-slytherin/40",
    text: "text-green-300",
    description: "You belong in Slytherin, where you'll make your real friends!",
  },
  Ravenclaw: {
    emoji: "🦅",
    color: "from-ravenclaw to-blue-600",
    bg: "bg-ravenclaw/20",
    border: "border-ravenclaw/40",
    text: "text-blue-300",
    description: "You belong in Ravenclaw, where those of wit and learning will always find their kind!",
  },
  Hufflepuff: {
    emoji: "🦡",
    color: "from-amber-800 to-yellow-600",
    bg: "bg-amber-900/20",
    border: "border-amber-700/40",
    text: "text-hufflepuff",
    description: "You belong in Hufflepuff, where they are just and loyal!",
  },
};

function SortingHat() {
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({
    Gryffindor: 0,
    Slytherin: 0,
    Ravenclaw: 0,
    Hufflepuff: 0,
  });
  const [result, setResult] = useState(null);
  const [houseCharacters, setHouseCharacters] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);

  // ─── ANSWER CLICK FUNCTION ───
  const handleAnswer = (house) => {
    /*
      Create a copy of scores with the spread operator and
      increase the selected house's score by 1

      { ...scores } → copy all current scores
      [house]: scores[house] + 1 → update the selected house's score

      Why don't we just do scores[house]++?
      Directly mutating state in React is not allowed.
      Always create a new object and update with setState.
    */
    const newScores = { ...scores, [house]: scores[house] + 1 };
    setScores(newScores);

    if (currentQuestion < questions.length - 1) {
      // More questions remain → go to the next question
      setCurrentQuestion(currentQuestion + 1);
    } else {
      /*
        Last question → find the winner

        Object.entries(newScores) → array like [["Gryffindor", 3], ["Slytherin", 1], ...]
        .sort((a, b) => b[1] - a[1]) → sort by scores from highest to lowest
        [0][0] → get the name of the highest-scoring house
      */
      const winner = Object.entries(newScores).sort((a, b) => b[1] - a[1])[0][0];
      setResult(winner);
    }
  };

  // ─── FETCH CHARACTERS WHEN RESULT IS DETERMINED ───
  /*
    When result changes from null to a value like "Gryffindor",
    this useEffect is triggered and fetches characters of that house from the API

    .slice(0, 6) → take only the first 6 characters (to save space on the result screen)
  */
  useEffect(() => {
    if (result) {
      getCharactersByHouse(result.toLowerCase())
        .then((data) => setHouseCharacters(data.slice(0, 6)))
        .catch(() => setHouseCharacters([]));
    }
  }, [result]);

  // ─── RESET QUIZ ───
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScores({ Gryffindor: 0, Slytherin: 0, Ravenclaw: 0, Hufflepuff: 0 });
    setResult(null);
    setHouseCharacters([]);
    setQuizStarted(true);
  };

  // ═══════════════════════════════════════
  // SCREEN 1: START (quizStarted = false)
  // ═══════════════════════════════════════
  if (!quizStarted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-6">🎩</div>
        <h1 className="font-cinzel font-bold text-4xl text-accent mb-4 tracking-wider">
          The Sorting Hat
        </h1>
        <p className="font-crimson text-xl text-text-muted italic mb-8 max-w-md mx-auto leading-relaxed">
          "Oh you may not think I'm pretty, but don't judge on what you see.
          I'll eat myself if you can find a smarter hat than me."
        </p>
        <button
          onClick={() => setQuizStarted(true)}
          className="px-8 py-4 bg-gradient-to-r from-accent/80 to-amber-600 text-dark font-cinzel font-bold rounded-xl text-lg hover:from-accent hover:to-amber-500 transition-all duration-300 shadow-[0_0_30px_rgba(226,183,20,0.3)]"
        >
          Begin Sorting Ceremony
        </button>
      </div>
    );
  }

  // ═══════════════════════════════════════
  // SCREEN 3: RESULT (result !== null)
  // ═══════════════════════════════════════
  if (result) {
    const info = houseInfo[result];

    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        {/* Result card — in the house's color */}
        <div className={`${info.bg} ${info.border} border rounded-2xl p-10 mb-8`}>
          <div className="text-6xl mb-4">{info.emoji}</div>
          <h1 className={`font-cinzel font-bold text-4xl ${info.text} mb-4 tracking-wider`}>
            {result}!
          </h1>
          <p className="font-crimson text-xl text-text-muted italic max-w-md mx-auto">
            {info.description}
          </p>
        </div>

        {/* Famous characters from that house (fetched from API) */}
        {houseCharacters.length > 0 && (
          <div className="mb-8">
            <h2 className="font-cinzel text-accent text-xl mb-6">
              Famous {result} Members
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
              {houseCharacters.map((char) => (
                <Link
                  key={char.id}
                  to={`/characters/${char.id}`}
                  className="group block no-underline"
                >
                  <div className="flex flex-col items-center">
                    {char.image ? (
                      <img
                        src={char.image}
                        alt={char.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-accent/20 group-hover:border-accent/60 transition-all"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-card flex items-center justify-center text-2xl border-2 border-accent/10">
                        🧙
                      </div>
                    )}
                    {/*
                      char.name.split(" ")[0] → show only the first name
                      "Harry Potter" → "Harry"
                      Saves space in the small area
                    */}
                    <p className="text-text-muted text-xs mt-2 font-raleway group-hover:text-accent transition-colors text-center">
                      {char.name.split(" ")[0]}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={resetQuiz}
            className="px-6 py-3 bg-accent/10 border border-accent/30 text-accent rounded-xl font-raleway font-medium hover:bg-accent/20 transition-all"
          >
            Try Again
          </button>
          {/* Go to Characters page with that house filter */}
          <Link
            to={`/characters?house=${result}`}
            className="px-6 py-3 bg-accent text-dark rounded-xl font-raleway font-medium hover:bg-accent/90 transition-all no-underline"
          >
            View All {result} Characters
          </Link>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════
  // SCREEN 2: QUESTION (quizStarted=true, result=null)
  // ═══════════════════════════════════════
  const question = questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-text-muted text-sm font-raleway mb-2">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
        </div>
        {/*
          Progress bar — width changes dynamically based on percentage
          We use inline style like style={{ width: "60%" }}
          because Tailwind doesn't support dynamic percentage classes
        */}
        <div className="h-2 bg-card rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-accent to-amber-500 rounded-full transition-all duration-500"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question text */}
      <div className="text-center mb-8">
        <div className="text-4xl mb-4">🎩</div>
        <h2 className="font-cinzel text-2xl text-text-primary tracking-wide">
          {question.question}
        </h2>
      </div>

      {/* Option buttons */}
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option.house)}
            className="w-full text-left px-6 py-4 bg-card border border-accent/10 rounded-xl text-text-primary font-raleway hover:border-accent/40 hover:bg-accent/5 transition-all duration-300 hover:shadow-[0_0_20px_rgba(226,183,20,0.08)]"
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SortingHat;
