import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link
              href="https://github.com/joeysnclr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              github
            </Link>
            <Link
              href="https://x.com/jitcommit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              x/twitter
            </Link>
          </div>
          <p className="text-sm text-muted">
            berkeley data science &apos;25
          </p>
        </div>
      </div>
    </footer>
  );
}
