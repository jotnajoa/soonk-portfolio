"use client";

import { useState } from "react";
import type { AboutEntry, Category } from "@/data/about";
import MobileNav from "@/components/MobileNav";
import CategorySwitch from "./CategorySwitch";
import AboutGrid from "./AboutGrid";
import AboutModal from "./AboutModal";

// /about — top-level page composed of:
//   0. <MobileNav/> sticky bar (mobile-only — shows "About me" + hamburger,
//      mirrors the WORK / Lecture & Publication bar pattern from /).
//   1. Editorial header (desktop only: big "About me" page header,
//      muted thesis line, smaller "I was then…" prompt).
//      On mobile the "About me" h1 is hidden because the sticky bar
//      already carries that label at the same 48 px treatment.
//   2. CategorySwitch on the right of the "I was then…" line.
//   3. AboutGrid (4×4 year cards reflecting the active category).
//   4. AboutModal — conditional on a card click.
//
// ProjectNav renders globally (app/layout.tsx) so the page itself just
// reserves top padding for the fixed bar.  No FlyingSquares / pin
// behaviour here — this is a static document, not a scroll cinematic.

export default function AboutPage() {
  const [category, setCategory] = useState<Category>("work");
  const [openEntry, setOpenEntry] = useState<AboutEntry | null>(null);

  return (
    <>
      {/* Mobile-only sticky bar (tablet:hidden inside MobileNav).  On the
          /about route it reads "About me" at the same 48 px font-black
          page-header treatment as WORK has on /.  Sits at the very top
          of the page so the user always sees the route label as they
          scroll the year grid. */}
      <MobileNav />

      <main className="min-h-screen w-full overflow-x-clip bg-[#EEEEEE] pb-[120px] tablet:pt-[120px]">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-[32px] px-[24px] pt-[32px] tablet:gap-[40px] tablet:px-[32px] tablet:pt-0">
          {/* Editorial header hierarchy (latest revision):
                1. "About me" — DESKTOP-ONLY page header at 64 px font-black.
                   Matches the WORK / Lecture & Publication treatment used
                   on other pages.  Hidden on mobile because <MobileNav/>
                   already carries the same label in the sticky bar.
                2. "We are all changing…" — secondary muted-black thesis
                   (#5D5D5D).  Reads as a quiet epigraph.
                3. "I was then…" — smaller than About me but still true
                   black + font-black.  Paired with the CategorySwitch
                   (the actual call-to-action). */}
          <header className="flex flex-col gap-[20px] tablet:gap-[24px]">
            <h1 className="hidden text-[56px] leading-[0.95] font-black text-[#1F1F1F] tablet:block tablet:text-[64px]">
              About me
            </h1>

            <p className="max-w-[640px] text-[16px] leading-[1.4] font-medium text-[#5D5D5D] tablet:text-[20px] tablet:leading-[1.35]">
              We are all changing slightly over time. Nothing is forever.{" "}
              <a
                href="/Soonk_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#1F1F1F] underline decoration-[#1F1F1F] underline-offset-[4px] transition-colors hover:decoration-[#00FB00] hover:text-[#00FB00]"
              >
                Resume
              </a>
            </p>

            <div className="flex flex-wrap items-center justify-between gap-[20px]">
              <h2 className="text-[28px] leading-[1.05] font-black text-[#1F1F1F] tablet:text-[36px]">
                I was then…
              </h2>
              <CategorySwitch active={category} onChange={setCategory} />
            </div>
          </header>

          {/* Thin separator — matches the lighter 1px border used by the
              grid cards below so the line vocabulary stays consistent. */}
          <div className="border-t border-[#1F1F1F]" />

          <AboutGrid category={category} onOpenEntry={setOpenEntry} />
        </div>

        <AboutModal entry={openEntry} onClose={() => setOpenEntry(null)} />
      </main>
    </>
  );
}
