function SpellCard({ spell }) {
  return (
    <div className="bg-card rounded-xl border border-accent/10 p-5 hover:border-accent/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(226,183,20,0.08)]">
      <div className="flex items-start gap-3">
        {/* Decorative star icon */}
        <span className="text-accent text-lg mt-0.5">✦</span>
        <div>
          <h3 className="font-crimson font-bold text-accent text-base mb-1">
            {spell.name}
          </h3>
          <p className="text-text-muted text-sm font-raleway leading-relaxed">
            {spell.description || "No description available"}
          </p>
          {/*
            spell.description || "No description available"
            This "OR" operator: shows the right string if description is empty
          */}
        </div>
      </div>
    </div>
  );
}

export default SpellCard;
