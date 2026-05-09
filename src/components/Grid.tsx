"use client";

import { tiles, type Tile } from "@/data/tiles";

// ----- Tile (3×3 grid view) ---------------------------------------------------
// Mirrors Figma node 55:458 (Desktop-4): bordered 280h tile, JetBrains Mono
// throughout (Soonk's stack — Figma's Archivo is intentionally swapped out).
// All other tokens (color, spacing, weight) are preserved verbatim.

function LogoSlot({ brand }: { brand: string }) {
  // Lightweight placeholder — actual Figma logos are bespoke SVGs that will
  // get imported later. Placeholder keeps the layout grid faithful for v1.
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#1F1F1F] text-[9px] font-bold tracking-wide text-[#A0A0A0] uppercase">
      {brand.slice(0, 3)}
    </div>
  );
}

function GridTile({ tile }: { tile: Tile }) {
  const rotated = tile.grid.keyword && tile.grid.keywordRotated;

  return (
    <article
      data-tile-id={tile.id}
      data-tile-grid
      className="relative flex h-[280px] overflow-clip border-2 border-[#1F1F1F]"
    >
      {/* Main content column */}
      <div
        className={`flex flex-1 flex-col gap-4 px-4 py-6 ${
          rotated ? "max-w-[calc(100%-44px)]" : ""
        }`}
      >
        {/* Brand row */}
        <div className="flex shrink-0 items-center gap-3">
          <LogoSlot brand={tile.brand} />
          <h3 className="line-clamp-2 text-[30px] leading-[0.95] font-extrabold text-[#1F1F1F]">
            {tile.brand}
          </h3>
        </div>

        {tile.grid.tagline && (
          <p className="text-[20px] leading-[0.92] font-extrabold whitespace-pre-line text-[#A0A0A0]">
            {tile.grid.tagline}
          </p>
        )}

        {tile.grid.blurb && (
          <p className="text-[18px] leading-[1.05] font-medium whitespace-pre-line text-[#A0A0A0]">
            {tile.grid.blurb}
          </p>
        )}

        {tile.grid.description && (
          <p className="text-[16px] leading-[1.05] font-medium text-[#A0A0A0]">
            {tile.grid.description}
          </p>
        )}

        {tile.grid.quotes?.map((q, i) => (
          <p
            key={i}
            className="text-[20px] leading-[0.92] font-extrabold text-[#A0A0A0]"
          >
            {q}
          </p>
        ))}

        {tile.grid.hashtags && (
          <div className="flex flex-col gap-2">
            {tile.grid.hashtags.map((t) => (
              <p
                key={t}
                className="text-[20px] leading-[0.92] font-extrabold text-[#A0A0A0]"
              >
                {t}
              </p>
            ))}
          </div>
        )}

        {tile.grid.callout && (
          <div className="mt-auto flex items-center gap-3 text-[15px] leading-[0.92] font-bold">
            {tile.grid.callout.strike && (
              <span className="text-[#A0A0A0] line-through">
                {tile.grid.callout.strike}
              </span>
            )}
            {tile.grid.callout.arrow && (
              <span className="text-[#1F1F1F]">→</span>
            )}
            {tile.grid.callout.final && (
              <span className="text-[#1F1F1F]">{tile.grid.callout.final}</span>
            )}
          </div>
        )}
      </div>

      {/* Optional rotated keyword (Volthop "Battery-bnb" style) */}
      {rotated && (
        <div className="flex w-[44px] shrink-0 items-center justify-center overflow-clip">
          <p className="-rotate-90 text-center text-[40px] leading-[0.92] font-medium whitespace-nowrap text-[#A0A0A0]">
            {tile.grid.keyword}
          </p>
        </div>
      )}
    </article>
  );
}

// ----- Grid section -----------------------------------------------------------

export default function Grid() {
  return (
    <section
      id="works-grid"
      className="flex w-full flex-col items-start gap-[64px] bg-[#EEEEEE] px-[32px] pt-[96px] pb-24"
    >
      <h2 className="text-[#1F1F1F] text-[96px] leading-[0.92] font-extrabold whitespace-nowrap">
        WORKS
      </h2>
      <div className="grid w-full grid-cols-3 gap-4">
        {tiles.map((t) => (
          <GridTile key={t.id} tile={t} />
        ))}
      </div>
    </section>
  );
}
