"use client";

import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Header({
  allExpanded,
  onToggleAll,
}: {
  allExpanded: boolean;
  onToggleAll: () => void;
}) {
  return (
    <header>
      <div className="max-w-2xl mx-auto px-6 pt-12 sm:pt-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm text-muted hover:text-foreground transition-colors"
        >
          JS
        </Link>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={onToggleAll}
              className="text-muted hover:text-foreground transition-colors"
              aria-label={allExpanded ? "Collapse all" : "Expand all"}
            >
              {allExpanded ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M1.5 8C2.9 5.2 5.2 3.5 8 3.5C10.8 3.5 13.1 5.2 14.5 8C13.1 10.8 10.8 12.5 8 12.5C5.2 12.5 2.9 10.8 1.5 8Z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <circle cx="8" cy="8" r="2.1" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M3 13L13 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M1.5 8C2.9 5.2 5.2 3.5 8 3.5C10.8 3.5 13.1 5.2 14.5 8C13.1 10.8 10.8 12.5 8 12.5C5.2 12.5 2.9 10.8 1.5 8Z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <circle cx="8" cy="8" r="2.1" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <span>{allExpanded ? "Collapse all" : "Expand all"}</span>
          </TooltipContent>
        </Tooltip>
      </div>
    </header>
  );
}
