"use client";

import Image from "next/image";
import { useEffect } from "react";

interface ImageModalProps {
  isOpen: boolean;
  imageSrc: string | null;
  imageAlt: string;
  onClose: () => void;
}

export default function ImageModal({
  isOpen,
  imageSrc,
  imageAlt,
  onClose,
}: ImageModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen || !imageSrc) return null;

  const fileName = imageSrc.split("/").pop() ?? imageAlt;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl mx-6 border border-border bg-background flex flex-col"
        style={{ height: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
          <span className="text-sm text-muted">{fileName}</span>
          <button
            onClick={onClose}
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            close
          </button>
        </div>

        <div className="relative flex-1 min-h-0 p-4 sm:p-6">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-contain"
            sizes="100vw"
          />
        </div>
      </div>
    </div>
  );
}
