import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-2xl mb-4">404</h1>
      <p className="text-muted mb-8">Page not found.</p>
      <Link
        href="/"
        className="text-sm text-muted hover:text-foreground transition-colors"
      >
        &larr; back home
      </Link>
    </div>
  );
}
