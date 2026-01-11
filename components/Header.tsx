"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-border">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-foreground hover:text-muted transition-colors"
        >
          joey sinclair
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/projects"
            className={`text-sm transition-colors ${
              pathname === "/projects"
                ? "text-foreground"
                : "text-muted hover:text-foreground"
            }`}
          >
            projects
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
