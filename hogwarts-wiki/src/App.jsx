/**
 * App.jsx — Application Root Component (Router)
 *
 * What does this file do?
 * - Activates URL listening with BrowserRouter
 * - Defines which page component renders for each URL path
 * - Wraps all pages with Navbar and Footer
 *
 * How does BrowserRouter work?
 * - Listens to the URL in the browser's address bar
 * - When the URL changes (Link click, back button, etc.) it finds the matching Route
 * - Renders the component in that Route's element prop
 * - PAGE DOES NOT RELOAD — only the content changes (SPA)
 *
 * Route path rules:
 * - "/" → exact match, home page only
 * - "/books" → exact match, book list
 * - "/books/:id" → dynamic segment, any value replaces :id
 *   Example: /books/3 → id="3", /books/7 → id="7"
 *
 * Why are Navbar and Footer outside Routes?
 * - Components inside Routes change based on the URL
 * - Those outside Routes are ALWAYS visible
 * - This ensures the same menu and footer appear on every page
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout components — visible on every page
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Page components — one is rendered based on the URL
import Home from "./pages/Home";
import Books from "./pages/Books";
import BookDetail from "./pages/BookDetail";
import Characters from "./pages/Characters";
import CharacterDetail from "./pages/CharacterDetail";
import Spells from "./pages/Spells";
import SortingHat from "./pages/SortingHat";

function App() {
  return (
    <BrowserRouter>
      {/* ─── VISIBLE ON EVERY PAGE: Navbar ─── */}
      <Navbar />

      {/* ─── SECTION THAT CHANGES BY URL ─── */}
      {/* flex-1: takes all remaining vertical space (pushes Footer down) */}
      <main className="flex-1">
        <Routes>
          {/* path="/" → when user first opens the site */}
          <Route path="/" element={<Home />} />

          {/* path="/books" → book list page */}
          <Route path="/books" element={<Books />} />

          {/*
            path="/books/:id" → single book detail page
            :id dynamic parameter — value comes from the URL
            /books/0 → BookDetail renders, useParams() returns id="0"
            /books/5 → BookDetail renders, useParams() returns id="5"
          */}
          <Route path="/books/:id" element={<BookDetail />} />

          <Route path="/characters" element={<Characters />} />
          <Route path="/characters/:id" element={<CharacterDetail />} />

          <Route path="/spells" element={<Spells />} />

          <Route path="/sorting-hat" element={<SortingHat />} />
        </Routes>
      </main>

      {/* ─── VISIBLE ON EVERY PAGE: Footer ─── */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
