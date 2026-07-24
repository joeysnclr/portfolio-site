"use client";

import { useState } from "react";
import Image from "next/image";
import { Book } from "@/lib/books";

function BookCard({
  book,
  isRevealed,
  onToggle,
}: {
  book: Book;
  isRevealed: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="group relative aspect-[2/3] overflow-hidden border border-border bg-background text-left cursor-pointer w-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground"
    >
      <Image
        src={book.coverSrc}
        alt={`${book.title} cover`}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 50vw, 25vw"
      />

      <div
        className={`absolute inset-0 bg-foreground/80 flex flex-col justify-end p-3 transition-opacity duration-200 ${
          isRevealed ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        <span className="text-xs text-background font-medium leading-tight">
          {book.title}
        </span>
        <span className="text-[10px] text-background/70 mt-0.5 leading-tight">
          {book.author}
        </span>
        {book.thought ? (
          <span className="text-[10px] text-background/70 mt-1.5 leading-snug italic">
            {book.thought}
          </span>
        ) : null}
      </div>
    </button>
  );
}

export default function BooksGrid({ books }: { books: Book[] }) {
  const [revealedId, setRevealedId] = useState<string | null>(null);

  function handleToggle(id: string) {
    setRevealedId((prev) => (prev === id ? null : id));
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          isRevealed={revealedId === book.id}
          onToggle={() => handleToggle(book.id)}
        />
      ))}
    </div>
  );
}
