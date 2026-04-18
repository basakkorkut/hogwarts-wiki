function Footer() {
  return (
    <footer className="mt-auto border-t border-accent/10 bg-dark/80">
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <p className="font-cinzel text-accent text-sm tracking-widest mb-2">
          ⚡ Hogwarts Wiki
        </p>
        <p className="text-text-primary text-sm font-raleway mb-3">
          Developed by{" "}
          <span className="text-accent font-semibold">
            Başak Korkut
          </span>
          {" "} — Made with love, as a small memory for my nephews.
        </p>
        <p className="text-text-muted text-xs font-raleway">
          Built with React & Tailwind CSS — Data from{" "}
          <a
            href="https://hp-api.onrender.com/"
            target="_blank"
            rel="noreferrer"
            className="text-accent/70 hover:text-accent transition-colors"
          >
            HP-API
          </a>{" "}
          &{" "}
          <a
            href="https://github.com/fedeperin/potterapi"
            target="_blank"
            rel="noreferrer"
            className="text-accent/70 hover:text-accent transition-colors"
          >
            PotterAPI
          </a>
        </p>
        <p className="text-text-muted/50 text-xs mt-2">
          Not affiliated with J.K. Rowling or Warner Bros.
        </p>
      </div>
    </footer>
  );
}

export default Footer;