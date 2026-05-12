"use client";

import { useState } from "react";
import {
  YEARS,
  entryAt,
  type AboutEntry,
  type Category,
} from "@/data/about";

// Year grid — one cell per year in YEARS (currently 2012-2027 → 4×4).
// Cells with an entry render the entry's glyph (text wordmark or icon),
// lift on hover with the same offset-shadow pattern as the WORK list
// rows, and surface a small tooltip (ProjectNav vocabulary: green
// background + offset shadow).  Empty cells render a dashed border to
// read as "not yet" — see the 2027 cell in the sketch.

function GlyphView({ entry }: { entry: AboutEntry }) {
  if (entry.glyph.kind === "icon") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={entry.glyph.src}
        alt={entry.glyph.alt}
        aria-hidden
        className="size-[56px] text-[#1F1F1F]"
      />
    );
  }
  if (entry.glyph.kind === "img") {
    // Real logo asset (PNG/SVG file in /public/about).  object-contain so
    // tall logos (Pepsi roundel) and wide logos (deloitte wordmark) both
    // fit inside the same square box without distortion.  Max-width 70%
    // gives breathing room from the year chip in the top-left.
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={entry.glyph.src}
        alt={entry.glyph.alt}
        aria-hidden
        className="max-h-[80px] max-w-[70%] object-contain"
      />
    );
  }
  // Text wordmark.  Some are short ("D", "GS") and some long ("pepsico"),
  // so we use a single base size + line-clamp so any value fits in the
  // 160px-tall card without overflowing.
  return (
    <span className="px-2 text-center text-[36px] leading-[0.95] font-bold tracking-[-0.02em] text-[#1F1F1F]">
      {entry.glyph.value}
    </span>
  );
}

function YearCard({
  year,
  entry,
  onOpen,
}: {
  year: number;
  entry: AboutEntry | undefined;
  onOpen: (entry: AboutEntry) => void;
}) {
  // Year label sits INSIDE the card, top-left corner.  Mono treatment
  // matches the case-study section markers used elsewhere in the
  // portfolio.  Per Soonk: feels more like a single object with a
  // timestamp on it, rather than a captioned figure.
  const yearLabel = (
    <span
      className="pointer-events-none absolute top-[8px] left-[10px] text-[11px] leading-none font-medium text-[#5D5D5D]"
      style={{
        fontFamily:
          "var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
      }}
    >
      {year}
    </span>
  );

  // Empty cell — no entry covers this year.  Dashed border reads as "TBD"
  // (the 2027 column in the user's sketch).  Year chip floats inside the
  // same way as filled cells for visual consistency.
  if (!entry) {
    return (
      <div
        aria-hidden
        className="relative flex h-[160px] items-center justify-center border border-dashed border-[#1F1F1F]/30 bg-transparent"
      >
        {yearLabel}
      </div>
    );
  }

  // `hover:z-20` on the card lifts its stacking context above SIBLING
  // cards (so the tooltip + the lifted card itself read in front of
  // neighbors) but stays BELOW the sticky header bars (MobileNav z-30,
  // ProjectNav z-40).  Without this cap, a hovered card scrolling under
  // the header would render *above* the header — the year-grid's bug:
  // hover a 2016 cell while the row is mid-scroll and the card popped
  // out the top of "About me".
  return (
    <button
      onClick={() => onOpen(entry)}
      aria-label={`${entry.title}, ${entry.period}`}
      className="group relative flex h-[160px] cursor-pointer items-center justify-center overflow-visible border border-[#1F1F1F] bg-transparent transition-[transform,box-shadow] duration-200 ease-out hover:z-20 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[3px_3px_0_0_#1F1F1F]"
    >
      {yearLabel}
      <GlyphView entry={entry} />

      {/* Tooltip — ProjectNav style (green bg, offset shadow, mono
          meta line on top + bold title underneath).  Appears below the
          card on hover; pointer-events-none so it never intercepts
          clicks meant for the button.  z-20 stacks above sibling cards
          (which default to z-auto) but stays below the sticky headers
          (MobileNav z-30, ProjectNav z-40). */}
      <span
        role="tooltip"
        aria-hidden
        className="pointer-events-none absolute top-[calc(100%+12px)] left-1/2 z-20 w-max max-w-[140px] -translate-x-1/2 -translate-y-1 border-2 border-[#1F1F1F] bg-[#00FB00] px-[12px] py-[8px] text-left opacity-0 shadow-[4px_4px_0_0_#1F1F1F] transition-[opacity,transform] duration-150 ease-out group-hover:translate-y-0 group-hover:opacity-100 tablet:max-w-[240px] tablet:px-[14px] tablet:py-[10px]"
      >
        <span
          className="block text-[10px] tracking-[0.16em] font-medium text-[#1F1F1F]/70"
          style={{
            fontFamily:
              "var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
          }}
        >
          {entry.period}
        </span>
        <span className="block text-[15px] leading-[1.2] font-semibold text-[#1F1F1F]">
          {entry.title}
        </span>
      </span>
    </button>
  );
}

export default function AboutGrid({
  category,
  onOpenEntry,
}: {
  category: Category;
  onOpenEntry: (entry: AboutEntry) => void;
}) {
  // Track which card the cursor is over so we can suppress neighboring
  // tooltips when needed.  (Currently unused — hover state is CSS-only —
  // but we keep the hook so future "highlight a span" interactions are
  // trivial to wire in.)
  const [, setHoveredId] = useState<string | null>(null);

  return (
    <div
      // 3 columns at the narrowest, 4 columns at tablet+.  Soonk's
      // explicit feedback: the 2-column fallback felt wrong even on
      // small screens, so we hold a minimum of 3 columns throughout.
      className="grid grid-cols-3 gap-x-[12px] gap-y-[16px] tablet:grid-cols-4 tablet:gap-x-[16px] tablet:gap-y-[20px]"
      onMouseLeave={() => setHoveredId(null)}
    >
      {YEARS.map((year) => {
        const entry = entryAt(category, year);
        return (
          <YearCard
            key={year}
            year={year}
            entry={entry}
            onOpen={onOpenEntry}
          />
        );
      })}
    </div>
  );
}
