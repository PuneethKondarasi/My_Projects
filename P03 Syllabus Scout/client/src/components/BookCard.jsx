import React from 'react';

function BookCard({ book }) {
  const imageUrl = book.cover || 'https://via.placeholder.com/128x192?text=No+Cover';
  const authors = book.author || 'Unknown Author';
  const publishedYear = book.year || 'N/A';
  const infoLink = book.link || '#';

  return (
    <div className="card group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full bg-card border-border">
      <div className="p-4 flex flex-row gap-4">
        <div className="flex-shrink-0 relative">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <img
            src={imageUrl}
            alt={`Cover of ${book.title}`}
            className="w-24 h-36 object-cover rounded-md shadow-md relative z-10"
          />
        </div>
        <div className="flex-grow flex flex-col justify-center">
          <h3 className="text-lg font-display font-bold mb-1 line-clamp-2 group-hover:text-primary transition-colors">
            {book.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
            {authors}
          </p>
          <div className="mt-auto pt-2">
             <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
              {publishedYear}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-auto p-4 pt-0">
        <a
          href={infoLink}
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary w-full text-sm py-2"
        >
          View Book
        </a>
      </div>
    </div>
  );
}

export default BookCard;
