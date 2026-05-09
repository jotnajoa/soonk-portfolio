"use client";

import { tiles, type Tile } from "@/data/tiles";

// ----- List tile (full-width row, Figma node 101:1655) ------------------------
// 3-column flex: [number 120px] [content max-w-480] [thumbnails grow]
// Tokens (color · spacing · weight) verbatim from MCP, family swapped to Archivo:
//   number (Archivo Black 120px)        : font-black
//   brand (Archivo Black 30px)          : font-black
//   tagline (Archivo Black 20px)        : font-black
//   keyword (Archivo Black 24px)        : font-black
//   description (Archivo Regular 16px)  : font-normal

function ThumbsSlot({ thumbs }: { thumbs?: string[] }) {
  if (!thumbs || thumbs.length === 0) return null;
  return (
    <div className="flex flex-1 items-center justify-end gap-4 self-stretch">
      {thumbs.map((src, i) => (
        <div
          key={i}
          className="relative h-full min-w-px flex-1 border-2 border-[#030303] bg-[#D9D9D9] shadow-[2px_2px_0_0_#1A1A1A]"
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
      className="relative flex min-h-[280px] w-full items-start gap-4 overflow-clip border-2 border-[#1F1F1F] px-[32px] py-[24px]"
    >
      {/* Number — Archivo Black 120px */}
      <p className="shrink-0 text-[120px] leading-[0.92] font-black whitespace-nowrap text-black">
        {numStr}
      </p>

      {/* Content column */}
      <div className="relative flex max-w-[480px] flex-1 flex-col items-start gap-4">
        {/* Brand */}
        <h3 className="line-clamp-2 text-[30px] leading-[0.92] font-black text-[#1F1F1F]">
          {tile.brand}
        </h3>

        {/* Tagline */}
        {tile.list.tagline && (
          <p className="w-full text-[20px] leading-[0.92] font-black text-[#5D5D5D]">
            {tile.list.tagline}
          </p>
        )}

        {/* Optional accent quote/keyword */}
        {tile.list.keyword && (
          <p className="w-full text-[24px] leading-[0.95] font-black text-[#1F1F1F]">
            {tile.list.keyword}
          </p>
        )}

        {/* Quoted phrases (Toyota) */}
        {tile.list.quotes && (
          <div className="flex w-full flex-wrap items-start gap-2">
            {tile.list.quotes.map((q) => (
              <p
                key={q}
                className="text-[20px] leading-[0.92] font-black whitespace-nowrap text-[#5D5D5D]"
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
                className="text-[20px] leading-[0.92] font-black text-[#5D5D5D]"
              >
                {t}
              </p>
            ))}
          </div>
        )}

        {/* Description */}
        {tile.list.description && (
          <p className="w-full text-[16px] leading-[0.92] font-normal text-[#5D5D5D]">
            {tile.list.description}
          </p>
        )}
      </div>

      {/* Thumbnails (right-side, fills remaining space) */}
      <ThumbsSlot thumbs={tile.list.thumbs} />
    </article>
  );
}

// ----- ProjectList section ----------------------------------------------------

export default function ProjectList() {
  return (
    <section
      id="works-list"
      className="flex w-full flex-col items-start gap-4 bg-[#EEEEEE] px-[32px] pt-12 pb-24"
    >
      {tiles.map((t, i) => (
        <ListTile key={t.id} tile={t} num={i + 1} />
      ))}
    </section>
  );
}
