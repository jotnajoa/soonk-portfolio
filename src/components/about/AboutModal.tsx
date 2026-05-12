"use client";

import { useEffect } from "react";
import type { AboutEntry } from "@/data/about";

// Full-info modal triggered by clicking a year card.  Reproduces the
// sketch sentence structure:
//
//   I worked... at                                                       X
//
//   GS Engineering and Construction
//   2012-2015
//
//   as PM
//
// Backdrop dims the page underneath and closes the modal on click; the
// modal itself stops propagation so clicks on the card don't bubble
// straight to the backdrop.  Escape also closes.

export default function AboutModal({
  entry,
  onClose,
}: {
  entry: AboutEntry | null;
  onClose: () => void;
}) {
  // Escape-to-close.  Effect re-binds whenever the open entry changes so
  // the listener is always tied to the current onClose.
  useEffect(() => {
    if (!entry) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [entry, onClose]);

  // Lock body scroll while open — without this the backdrop scrolls with
  // the page, which feels broken on the long year grid.
  useEffect(() => {
    if (!entry) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [entry]);

  if (!entry) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-modal-title"
      // Top layer.  Backdrop is 55% black; the modal sits centered.
      // Tighter gutter on mobile so the inner card stays inside the
      // visible viewport even when the browser's layout viewport is a
      // few px wider than the visual one (notch / scrollbar reservations).
      // The shadow-offset of 8px on the right also has to fit inside the
      // gutter, so we leave at least 12 px breathing room on each side.
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#1F1F1F]/55 px-[12px] py-[16px] tablet:px-[24px] tablet:py-[24px]"
      onClick={onClose}
    >
      <div
        // Stop the click from reaching the backdrop's onClick handler.
        // max-h + overflow-y-auto so a long modal can't bleed past the
        // visible viewport on shorter phones.  shadow + 8 px wide
        // offset is the reason for the asymmetric -mr-[8px] alignment
        // override on the X button below — without it the X sits 8 px
        // closer to centre than the rest of the right edge.
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[calc(100dvh-32px)] w-full max-w-[400px] overflow-y-auto border-2 border-[#1F1F1F] bg-[#EEEEEE] p-[20px] shadow-[8px_8px_0_0_#1F1F1F] tablet:max-w-[480px] tablet:p-[28px]"
      >
        {/* Top row: prefix label + close X */}
        <div className="mb-[16px] flex items-start justify-between gap-4 tablet:mb-[20px]">
          <p className="text-[15px] leading-[1.2] font-medium text-[#5D5D5D] tablet:text-[18px]">
            {entry.modalLabel}
          </p>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="-mt-1 -mr-1 flex size-8 shrink-0 cursor-pointer items-center justify-center text-[22px] leading-none text-[#1F1F1F] hover:text-[#00FB00]"
          >
            ×
          </button>
        </div>

        <h2
          id="about-modal-title"
          className="text-[22px] leading-[1.1] font-black text-[#1F1F1F] tablet:text-[28px]"
        >
          {entry.title}
        </h2>
        <p
          className="mt-[6px] text-[12px] tracking-[0.08em] font-medium text-[#5D5D5D] uppercase tablet:text-[14px]"
          style={{
            fontFamily:
              "var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
          }}
        >
          {entry.period}
        </p>

        {entry.detail && (
          <p className="mt-[16px] text-[14px] leading-[1.4] font-normal text-[#1F1F1F] tablet:mt-[20px] tablet:text-[16px]">
            {entry.detail}
          </p>
        )}
      </div>
    </div>
  );
}
