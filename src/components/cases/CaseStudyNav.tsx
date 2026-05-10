"use client";

import Link from "next/link";
import { tiles } from "@/data/tiles";

// CaseStudyNav — sticky top bar shared by every /works/[slug] page.
//
// Layout (matches the portfolio's existing ProjectNav rhythm so the case
// study reads as part of the same site, not a separate one):
//   Soonk  ·  Work [9 indicator squares] ·  Publication  ·  Resume
//
// The current case study's indicator (data-tile-id) is filled solid; the
// other 8 are outlines.  Clicking an indicator jumps to that case study.
// Clicking "Soonk" or "Work" jumps back to the portfolio landing.

const MONO_STYLE: React.CSSProperties = {
  fontFamily:
    "var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
};

export default function CaseStudyNav({ currentSlug }: { currentSlug: string }) {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-[#1F1F1F] bg-[#EEEEEE]/95 backdrop-blur">
      <nav className="mx-auto flex max-w-[1200px] items-center gap-4 px-[32px] py-4">
        <Link
          href="/"
          className="text-[16px] leading-[0.92] font-normal whitespace-nowrap text-[#A0A0A0] hover:text-[#1F1F1F]"
        >
          Soonk
        </Link>
        <span className="h-6 w-px bg-[#A0A0A0]" aria-hidden />

        <div className="flex items-center gap-2">
          <Link
            href="/#works-list"
            className="text-[16px] leading-[0.92] font-semibold whitespace-nowrap text-black hover:underline"
          >
            Work
          </Link>
          {tiles.map((t) => {
            const active = t.slug === currentSlug;
            return (
              <Link
                key={t.id}
                href={`/works/${t.slug}`}
                aria-label={`${t.id} · ${t.brand}`}
                title={`${t.id} · ${t.brand}`}
                className={`size-4 border border-[#1F1F1F] transition-colors ${
                  active ? "bg-[#1F1F1F]" : "bg-transparent hover:bg-[#D9D9D9]"
                }`}
              />
            );
          })}
        </div>

        <span className="h-6 w-px bg-[#A0A0A0]" aria-hidden />
        <a
          href="/#publication"
          className="text-[16px] leading-[0.92] font-normal whitespace-nowrap text-[#A0A0A0] hover:text-[#1F1F1F]"
        >
          Publication
        </a>
        <span className="h-6 w-px bg-[#A0A0A0]" aria-hidden />
        <a
          href="/#resume"
          className="text-[16px] leading-[0.92] font-normal whitespace-nowrap text-[#A0A0A0] hover:text-[#1F1F1F]"
        >
          Resume
        </a>

        <span
          className="ml-auto hidden text-[12px] tracking-[0.08em] text-[#A0A0A0] tablet:inline"
          style={MONO_STYLE}
        >
          ← BACK TO PORTFOLIO
        </span>
      </nav>
    </header>
  );
}
