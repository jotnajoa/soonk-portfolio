"use client";

import { tiles, type Tile } from "@/data/tiles";

// ----- List tile (Figma nodes 101:1655 desktop · 101:2160 mobile) -------------
//
// Desktop (≥800px) — full-width row with [number 120px] [content max-w-480]
// [thumbnails grow], all in a single non-wrapping flex.
//
// Mobile  (<800px)  — same border + min-h, but flex-wrap: number stacks at
// top of content column, thumbnails wrap below.  Sizes shrink throughout
// (number 120 → 64, brand 30 → 32, description 16 → 12).
//
// Tokens (color · weight · leading) follow Figma exactly; family Archivo.

function ThumbsSlot({ thumbs }: { thumbs?: string[] }) {
  if (!thumbs || thumbs.length === 0) return null;
  return (
    <div className="order-3 flex w-full justify-end gap-2 tablet:order-none tablet:ml-auto tablet:w-auto tablet:flex-1 tablet:items-center tablet:gap-4 tablet:self-stretch">
      {thumbs.map((src, i) => (
        <div
          key={i}
          className="relative aspect-[100/216] w-[100px] shrink-0 border-2 border-[#030303] bg-[#D9D9D9] shadow-[1px_1px_0_0_#1A1A1A] tablet:aspect-auto tablet:h-full tablet:w-auto tablet:flex-1 tablet:shadow-[2px_2px_0_0_#1A1A1A]"
        >
          {/* Image goes here when assets land in /public/works/ */}
          <div className="flex h-full items-center justify-center text-[9px] font-bold tracking-wide text-[#A0A0A0] uppercase">
            {src.split("/").pop()?.replace(/\.(jpg|png|webp)$/, "")}
          </div>
        </div>
      ))}
    </div>
  );
}

function ListTile({ tile, num }: { tile: Tile; num: number }) {
  const numStr = String(num).padStart(2, "0");

  return (
    <article
      data-tile-id={tile.id}
      data-tile-list
      className="relative flex w-full min-h-[280px] flex-wrap items-center gap-4 overflow-clip border-2 border-[#1F1F1F] p-4 tablet:flex-nowrap tablet:items-start tablet:px-[32px] tablet:py-[24px]"
    >
      {/* Number — Archivo Black, 64 mobile / 120 desktop */}
      <p className="order-1 shrink-0 text-[64px] leading-[0.92] font-black whitespace-nowrap text-black tablet:text-[120px]">
        {numStr}
      </p>

      {/* Content column */}
      <div className="order-2 flex min-w-[200px] flex-1 flex-col items-start gap-2 tablet:max-w-[480px] tablet:gap-4">
        {/* Brand */}
        <h3 className="line-clamp-2 text-[32px] leading-[0.92] font-black text-[#1F1F1F] tablet:text-[30px]">
          {tile.brand}
        </h3>

        {/* Tagline — semibold on mobile, black on desktop per Figma */}
        {tile.list.tagline && (
          <p className="w-full text-[20px] leading-[0.92] font-semibold text-[#5D5D5D] tablet:font-black">
            {tile.list.tagline}
          </p>
        )}

        {/* Optional accent quote/keyword */}
        {tile.list.keyword && (
          <p className="w-full text-[20px] leading-[0.95] font-black text-[#1F1F1F] tablet:text-[24px]">
            {tile.list.keyword}
          </p>
        )}

        {/* Quoted phrases (Toyota) */}
        {tile.list.quotes && (
          <div className="flex w-full flex-wrap items-start gap-2">
            {tile.list.quotes.map((q) => (
              <p
                key={q}
                className="text-[20px] leading-[0.92] font-semibold whitespace-nowrap text-[#5D5D5D] tablet:font-black"
              >
                {q}
              </p>
            ))}
          </div>
        )}

        {/* Hashtags (NYC parking, GTM) */}
        {tile.list.hashtags && (
          <div className="flex w-full flex-wrap items-start gap-2">
            {tile.list.hashtags.map((t) => (
              <p
                key={t}
                className="text-[20px] leading-[0.92] font-semibold text-[#5D5D5D] tablet:font-black"
              >
                {t}
              </p>
            ))}
          </div>
        )}

        {/* Description — 12 mobile / 16 desktop */}
        {tile.list.description && (
          <p className="w-full text-[12px] leading-[0.92] font-normal text-[#5D5D5D] tablet:text-[16px]">
            {tile.list.description}
          </p>
        )}
      </div>

      {/* Thumbnails (right on desktop, wrapped below on mobile) */}
      <ThumbsSlot thumbs={tile.list.thumbs} />
    </article>
  );
}

// ----- ProjectList section ----------------------------------------------------

export default function ProjectList() {
  return (
    <section
      id="works-list"
      className="flex w-full flex-col items-start gap-4 bg-[#EEEEEE] px-[32px] pt-[96px] pb-24 tablet:pt-12"
    >
      {/* Mobile-only WORKS section heading. On desktop, the heading is
          formed by the flying-squares animation landing in the sticky nav. */}
      <h2 className="mb-[24px] text-[48px] leading-[0.92] font-black text-[#1F1F1F] tablet:hidden">
        WORKS
      </h2>

      {tiles.map((t, i) => (
        <ListTile key={t.id} tile={t} num={i + 1} />
      ))}
    </section>
  );
}
