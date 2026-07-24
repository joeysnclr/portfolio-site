import type { Metadata } from "next";
import BooksGrid from "@/components/BooksGrid";
import { books } from "@/lib/books";

export const metadata: Metadata = {
  title: "Library",
  description: "Books I have read and my thoughts on them.",
};

export default function BooksPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 pt-12 sm:pt-16 pb-16">
      <h1 className="text-sm mb-8">Library</h1>
      <BooksGrid books={books} />
    </div>
  );
}
