import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  // useLocation: provides current URL information
  // Example: if you're on /characters, location.pathname = "/characters"
  const location = useLocation();

  // Mobile menu open/closed state
  const [menuOpen, setMenuOpen] = useState(false);

  // Navigation links — stored in an array so we can iterate with .map()
  const links = [
    { to: "/", label: "Home" },
    { to: "/books", label: "Books" },
    { to: "/characters", label: "Characters" },
    { to: "/spells", label: "Spells" },
    { to: "/sorting-hat", label: "Sorting Hat" },
  ];

  // Function to check if a link is active
  // "Characters" link should also appear active when at /characters/abc123
  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    // sticky top-0: sticks to the top of the page when scrolling
    // z-50: stays above other elements
    // backdrop-blur-md: blurs content behind it (glass effect)
    <nav className="sticky top-0 z-50 bg-dark/90 backdrop-blur-md border-b border-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo — clicking goes to the home page */}
          <Link to="/" className="flex items-center gap-2 no-underline">
            <span className="text-accent text-2xl">⚡</span>
            <span className="font-cinzel font-bold text-accent text-lg tracking-wider">
              Hogwarts Wiki
            </span>
          </Link>

          {/* === DESKTOP MENU === */}
          {/* hidden md:flex → hidden on mobile, visible above 768px */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-raleway font-medium tracking-wide transition-all duration-300 no-underline ${
                  isActive(link.to)
                    ? "bg-accent/20 text-accent"           // Active: gold background + gold text
                    : "text-text-muted hover:text-text-primary hover:bg-white/5" // Inactive
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* === MOBILE HAMBURGER BUTTON === */}
          {/* md:hidden → hidden above 768px, visible on mobile */}
          <button
            className="md:hidden text-text-primary p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {/* X or hamburger icon based on menuOpen state */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* === MOBILE MENU (when open) === */}
        {/* Visible when menuOpen is true (conditional rendering) */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-accent/10 mt-2 pt-2">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)} // Close menu when link is clicked
                className={`block px-4 py-3 rounded-lg text-sm font-raleway font-medium no-underline transition-all ${
                  isActive(link.to)
                    ? "bg-accent/20 text-accent"
                    : "text-text-muted hover:text-text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
