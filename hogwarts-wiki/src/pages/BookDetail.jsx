import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllBooks } from "../services/api";
import GoldenSnitch from "../components/GoldenSnitch";

function BookDetail() {
  // Get the id parameter from the URL
  // /books/3 → id = "3" (string)
  const { id } = useParams();

  // Programmatic navigation function
  const navigate = useNavigate();

  const [book, setBook] = useState(null);    // null = no data yet
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllBooks()
      .then((data) => {
        // parseInt(id) → converts string "3" to number 3
        // .find() → returns the FIRST element in the array that satisfies the condition
        // Returns undefined if not found
        const found = data.find((b) => b.index === parseInt(id));
        if (found) {
          setBook(found);
        } else {
          setError("Book not found");
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]); // runs again if id changes (navigating to a different book)

  if (loading) return <GoldenSnitch />;
  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-400 font-crimson text-xl">⚠️ {error}</p>
        <button
          onClick={() => navigate("/books")}
          className="mt-4 text-accent hover:underline font-raleway"
        >
          ← Back to Books
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Back button — programmatic navigation with navigate */}
      <button
        onClick={() => navigate("/books")}
        className="text-text-muted hover:text-accent transition-colors font-raleway text-sm mb-8 flex items-center gap-2"
      >
        ← Back to Books
      </button>

      {/* Book detail card */}
      <div className="bg-card rounded-2xl border border-accent/10 overflow-hidden">
        {/*
          md:flex → side by side above 768px (left: image, right: info)
          Stacked on mobile (no flex = normal flow)
        */}
        <div className="md:flex">
          {/* Left: Book cover */}
          <div className="md:w-1/3 bg-bg p-8 flex items-center justify-center">
            <img
              src={book.cover}
              alt={book.title}
              className="max-h-80 object-contain rounded-lg shadow-lg"
            />
          </div>

          {/* Right: Book information */}
          <div className="md:w-2/3 p-8">
            <div className="text-accent text-sm font-raleway font-medium mb-2">
              Book #{book.number}
            </div>
            <h1 className="font-cinzel font-bold text-3xl text-text-primary mb-4 tracking-wide">
              {book.title}
            </h1>

            {/* Info rows */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-accent text-sm">📅</span>
                <span className="text-text-muted font-raleway text-sm">
                  Released: {book.releaseDate}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-accent text-sm">📖</span>
                <span className="text-text-muted font-raleway text-sm">
                  {book.pages} pages
                </span>
              </div>
              {/*
                Conditional rendering: && operator
                If the left side is true, render the right side; if false, render nothing
              */}
              {book.originalTitle && (
                <div className="flex items-center gap-3">
                  <span className="text-accent text-sm">📝</span>
                  <span className="text-text-muted font-raleway text-sm">
                    Original: {book.originalTitle}
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="border-t border-accent/10 pt-6">
              <h2 className="font-cinzel text-accent text-lg mb-3">Description</h2>
              <p className="text-text-muted font-crimson text-base leading-relaxed">
                {book.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
