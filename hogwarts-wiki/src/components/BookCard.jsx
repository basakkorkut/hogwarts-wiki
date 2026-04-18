import { Link } from "react-router-dom";

function BookCard({ book }) {
  return (
    <Link
      to={`/books/${book.index}`}
      className="group block bg-card rounded-2xl overflow-hidden border border-accent/10 hover:border-accent/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(226,183,20,0.1)] no-underline"
    >
      {/* Book cover */}
      <div className="relative overflow-hidden h-64 bg-bg">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
        />
        {/* Book number badge */}
        <div className="absolute top-3 right-3 bg-accent/90 text-dark text-xs font-bold px-2 py-1 rounded-lg font-raleway">
          #{book.number}
        </div>
      </div>

      {/* Book information */}
      <div className="p-5">
        <h3 className="font-crimson font-bold text-text-primary text-lg mb-2 group-hover:text-accent transition-colors duration-300">
          {book.title}
        </h3>
        <div className="flex items-center justify-between text-text-muted text-sm font-raleway">
          <span>{book.releaseDate}</span>
          <span>{book.pages} pages</span>
        </div>
      </div>
    </Link>
  );
}

export default BookCard;