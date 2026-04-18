function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="relative max-w-md mx-auto mb-8">
      {/* Search icon — on the left side inside the input */}
      {/* pointer-events-none: icon is not clickable, click passes through to the input behind it */}
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Input field */}
      {/* pl-12: left padding so text doesn't overlap the left icon */}
      {/* focus:outline-none: removes the default blue outline */}
      {/* focus:border-accent/50: gold border when focused */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 bg-card border border-accent/20 rounded-xl text-text-primary placeholder-text-muted/50 font-raleway text-sm focus:outline-none focus:border-accent/50 focus:shadow-[0_0_15px_rgba(226,183,20,0.1)] transition-all duration-300"
      />
    </div>
  );
}

export default SearchBar;
