import { useState, useEffect } from "react";
import { getAllBooks } from "../services/api";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import GoldenSnitch from "../components/GoldenSnitch";

function Books() {
  // ─── STATE DEFINITIONS ───
  const [books, setBooks] = useState([]);         // Initial: empty array
  const [loading, setLoading] = useState(true);    // Initial: loading
  const [error, setError] = useState(null);        // Initial: no error
  const [searchTerm, setSearchTerm] = useState(""); // Initial: empty search

  // ─── API CALL ───
  /*
    useEffect(callback, dependencyArray)
    - callback: function to run
    - []: empty array = run only on first render (mount)
    - [id]: run again if id changes
    - no dependency = runs on every render (usually undesired)

    .then() → runs if fetch succeeds
    .catch() → runs if there's an error
    .finally() → runs in all cases (ideal for closing loading state)
  */
  useEffect(() => {
    getAllBooks()
      .then((data) => {
        setBooks(data);         // Write received data to state
      })
      .catch((err) => {
        setError(err.message);  // Write error message to state
      })
      .finally(() => {
        setLoading(false);      // Loading done (success or error)
      });
  }, []); // ← empty array: run only once

  // ─── SEARCH FILTER ───
  /*
    This code runs on every render.
    When searchTerm changes → React re-renders the component →
    filteredBooks is recalculated → screen updates

    .filter() → returns elements from the array that satisfy the condition (new array)
    .toLowerCase() → removes case sensitivity
    .includes() → checks if one string contains another

    Example: searchTerm = "prisoner"
    "Harry Potter and the Prisoner of Azkaban".toLowerCase()
      → "harry potter and the prisoner of azkaban"
    .includes("prisoner") → true ✓ (this book is shown)
  */
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ─── CONDITIONAL RENDERING ───
  // Showing different content based on conditions in React
  if (loading) return <GoldenSnitch />;

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-400 font-crimson text-xl">⚠️ {error}</p>
        <p className="text-text-muted text-sm mt-2">Please try again later</p>
      </div>
    );
  }

  // ─── MAIN RENDER ───
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="font-cinzel font-bold text-4xl text-accent text-center mb-4 tracking-wider">
        📚 Books
      </h1>
      <p className="text-text-muted text-center font-crimson italic mb-8">
        The complete Harry Potter book collection
      </p>

      {/*
        Passing 3 props to SearchBar:
        - value: the value the input displays (searchTerm state)
        - onChange: function to call when the input changes (setSearchTerm)
        - placeholder: hint shown when empty
      */}
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search books by title..."
      />

      <p className="text-text-muted text-sm text-center mb-6">
        Showing {filteredBooks.length} of {books.length} books
      </p>

      {/*
        Conditional rendering with ternary operator:
        condition ? if_true : if_false

        filteredBooks.length > 0
          ? → show grid if books exist
          : → show "not found" message if empty
      */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/*
            .map() → creates a BookCard component for each book object
            key: so React can efficiently track changes in the list
            book prop: passes the entire book object to BookCard
          */}
          {filteredBooks.map((book) => (
            <BookCard key={book.index} book={book} />
          ))}
        </div>
      ) : (
        <p className="text-text-muted text-center py-10 font-crimson italic">
          No books found matching "{searchTerm}"
        </p>
      )}
    </div>
  );
}

export default Books;
