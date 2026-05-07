"use client";

import { tiles, type Tile } from "@/data/tiles";

// Brutalist psychedelic lime — picked off the Brasília reference, slightly punched up.
// Lives as `--lime` in globals.css for reuse.
const GREEN = "#4DFF00";

function quoteIfNeeded(s: string, quoted?: boolean) {
  return quoted ? `“${s}”` : s;
}

// --- Layout variants ---------------------------------------------------------
// Each card cycles through A/B/C/D so the grid reads as a typographic catalog
// (per "Figuring Out Type" reference) instead of 16 identical cards.

function LayoutA({ tile }: { tile: Tile }) {
  // Keyword top-left huge, secondary below, tertiary as a sideways word bottom-right.
  return (
    <>
      <h3 className="mt-6 max-w-[85%] text-2xl leading-[0.92] font-black tracking-tight text-zinc-900 sm:text-3xl lg:text-[2rem]">
        {quoteIfNeeded(tile.keyword, tile.keywordQuoted)}
      </h3>
      {tile.secondary && (
        <p className="mt-3 text-sm font-medium text-zinc-700 sm:text-base">
          {tile.secondary}
        </p>
      )}
      {tile.tertiary && (
        <span
          className="absolute right-2 bottom-4 origin-bottom-right -rotate-90 text-xs font-medium whitespace-nowrap text-zinc-600"
          aria-hidden
        >
          {tile.tertiary}
        </span>
      )}
    </>
  );
}

function LayoutB({ tile }: { tile: Tile }) {
  // Two stacked bold keywords, top-aligned. Reads like a chant.
  return (
    <div className="mt-8 flex flex-col">
      <h3 className="text-xl leading-[0.95] font-black tracking-tight text-zinc-900 sm:text-2xl lg:text-3xl">
        {quoteIfNeeded(tile.keyword, tile.keywordQuoted)}
      </h3>
      {tile.secondary && (
        <p className="mt-1 text-xl leading-[0.95] font-black tracking-tight text-zinc-900 sm:text-2xl lg:text-3xl">
          {tile.secondary}
        </p>
      )}
    </div>
  );
}

function LayoutC({ tile }: { tile: Tile }) {
  // Keyword on top, descriptive subtitle below as paragraph.
  return (
    <>
      <h3 className="mt-6 max-w-[90%] text-2xl leading-[0.92] font-black tracking-tight text-zinc-900 sm:text-3xl">
        {quoteIfNeeded(tile.keyword, tile.keywordQuoted)}
      </h3>
      {tile.subtitle && (
        <p className="mt-4 text-xs leading-snug text-zinc-700 sm:text-sm">
          {tile.subtitle}
        </p>
      )}
    </>
  );
}

function LayoutD({ tile }: { tile: Tile }) {
  // Keyword rotated 90° vertical; secondary small horizontal at top.
  return (
    <>
      {tile.secondary && (
        <p className="mt-6 text-sm font-medium text-zinc-700 sm:text-base">
          {tile.secondary}
        </p>
      )}
      <div className="absolute inset-y-6 right-3 flex items-center">
        <h3 className="origin-center -rotate-90 text-2xl leading-none font-black tracking-tight whitespace-nowrap text-zinc-900 sm:text-3xl">
          {quoteIfNeeded(tile.keyword, tile.keywordQuoted)}
        </h3>
      </div>
    </>
  );
}

// --- Card --------------------------------------------------------------------

function TileCard({ tile }: { tile: Tile }) {
  return (
    <article
      data-tile-id={tile.id}
      data-tile-keyword={tile.keyword}
      className="group relative aspect-square overflow-hidden border-2 border-zinc-900 bg-white p-4 transition-[border-width,background-color] duration-150 hover:border-[5px] hover:bg-[var(--tile-hover)] sm:p-5"
      style={{ ["--tile-hover" as string]: GREEN } as React.CSSProperties}
    >
      {/* Number — top-right */}
      <span className="absolute top-3 right-3 text-[11px] font-bold tracking-wide text-zinc-600 group-hover:text-zinc-900">
        {tile.number}
      </span>

      {/* Layout */}
      {tile.layout === "A" && <LayoutA tile={tile} />}
      {tile.layout === "B" && <LayoutB tile={tile} />}
      {tile.layout === "C" && <LayoutC tile={tile} />}
      {tile.layout === "D" && <LayoutD tile={tile} />}

      {/* Thumbnail — small placeholder always present, comes forward on hover.
          Real project thumbs will replace these later. */}
      <div className="pointer-events-none absolute bottom-3 left-3 h-12 w-12 overflow-hidden border-2 border-zinc-900 bg-zinc-200 opacity-30 transition-opacity duration-200 group-hover:opacity-100 sm:h-16 sm:w-16">
        <div className="flex h-full items-center justify-center text-[9px] font-black tracking-widest uppercase text-zinc-700">
          {tile.category}
        </div>
      </div>
    </article>
  );
}

// --- Grid --------------------------------------------------------------------

export default function Grid() {
  return (
    <section
      id="works"
      className="relative bg-[#EEEEEE] px-6 pt-16 pb-24 lg:px-16"
    >
      <h2 className="mb-10 text-5xl leading-none font-black tracking-tight text-zinc-900 sm:text-6xl lg:mb-12 lg:text-7xl">
        WORKS
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {tiles.map((tile) => (
          <TileCard key={tile.id} tile={tile} />
        ))}
      </div>
    </section>
  );
}
