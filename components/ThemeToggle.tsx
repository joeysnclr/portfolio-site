"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "./ThemeProvider";

function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const hydrated = useHydrated();

  return (
    <button
      onClick={toggleTheme}
      className="text-sm text-muted hover:text-foreground transition-colors"
      aria-label="Toggle theme"
    >
      {hydrated ? (theme === "dark" ? "light" : "dark") : "theme"}
    </button>
  );
}
