function GoldenSnitch() {
  return (
    // flex + items-center + justify-center: middle of the page

    <div className="flex flex-col items-center justify-center py-20">

      {/* Snitch body */}
      <div className="relative" style={{ animation: "snitch-fly 3s ease-in-out infinite" }}>

        {/* Left wing */}
        {/* absolute: exits normal flow, positioned relative to the body */}
        {/* -left-10: positions 40px to the left of the body */}
        <div
          className="absolute -left-10 top-1/2 -translate-y-1/2 w-10 h-6 bg-gradient-to-l from-amber-300 to-transparent rounded-full opacity-70"
          style={{ animation: "snitch-wing 0.4s ease-in-out infinite" }}
        />

        {/* Golden ball */}
        {/* bg-gradient-to-br: gradient from top-left to bottom-right */}
        {/* shadow: golden glow effect around it */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-600 shadow-[0_0_20px_rgba(226,183,20,0.6)]" />

        {/* Right wing — mirror of the left wing */}
        <div
          className="absolute -right-10 top-1/2 -translate-y-1/2 w-10 h-6 bg-gradient-to-r from-amber-300 to-transparent rounded-full opacity-70"
          style={{ animation: "snitch-wing 0.4s ease-in-out infinite reverse" }}
        />
      </div>

      {/* Loading text */}
      <p className="mt-8 text-text-muted font-crimson text-lg italic tracking-wide">
        Summoning data from Hogwarts...
      </p>
    </div>
  );
}

export default GoldenSnitch;
