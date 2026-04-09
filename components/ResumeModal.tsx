"use client";

import { useEffect, useState, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);

  const measuredRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      setContainerRef(node);
      setContainerWidth(node.clientWidth);
    }
  }, []);

  useEffect(() => {
    if (!containerRef) return;
    const observer = new ResizeObserver(() => {
      setContainerWidth(containerRef.clientWidth);
    });
    observer.observe(containerRef);
    return () => observer.disconnect();
  }, [containerRef]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl mx-6 border border-border bg-background flex flex-col"
        style={{ height: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
          <span className="text-sm text-muted">resume.pdf</span>
          <button
            onClick={onClose}
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            close
          </button>
        </div>

        {/* PDF content */}
        <div
          ref={measuredRef}
          className="flex-1 overflow-y-auto flex justify-center"
        >
          {containerWidth > 0 && (
            <Document file="/resume.pdf" loading={null} error={null}>
              <Page
                pageNumber={1}
                width={containerWidth}
                renderAnnotationLayer={false}
                renderTextLayer={false}
              />
            </Document>
          )}
        </div>
      </div>
    </div>
  );
}
