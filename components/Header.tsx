"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header>
      <div className="max-w-2xl mx-auto px-6 pt-12 sm:pt-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm text-muted hover:text-foreground transition-colors"
        >
          JS
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
