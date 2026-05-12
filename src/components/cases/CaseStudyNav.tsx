"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { tiles } from "@/data/tiles";
import { TileLogo } from "@/components/TileLogo";

// CaseStudyNav — sticky top bar shared by every /work/[slug] page.
//
// Two layouts share the same sticky bar:
//
//   ≥800px (desktop)
//     Soonk · | · Work [9 indicator squares] · | · Publication · | · Resume
//                                                            ← BACK TO PORTFOLIO
//
//   <800px (mobile)
//     [project number]  [logo]  [project name]                    ☰
//     The hamburger opens the same project picker the home-page MobileNav
//     uses, except items here navigate to /work/{slug} instead of
//     scrolling to data-tile-list anchors (which only exist on /).
//
// Brand + primary nav routing rules:
//   - "Soonk" (brand mark, top-left in both layouts) → always Link to "/".
//     It's a brand link, not a back affordance — a user navigating between
//     case studies expects "Soonk" to take them home, not back to whichever
//     other case study they happened to land on first.
//   - "Work" (top-bar label next to the 9 indicator squares) → "/#work-grid".
//     Primary nav, jumps to the projects section on home.
//   - "← BACK TO PORTFOLIO" (desktop right) AND the mobile breadcrumb
//     (project number + logo + brand) → Link to "/#work-list-<tile.id>".
//     Earlier these used router.back(), which would surface "the last page
//     you came from" — if a user navigated case → case → case via the next
//     rail, "BACK TO PORTFOLIO" would send them to the previous case
//     instead of the home list.  The hash anchor (#work-list-<id>) is read
//     by ProjectNav on mount: when the home page loads with that hash, it
//     scrolls the matching list row into view, so the user lands back in
//     the work list with their project already in focus.

export default function CaseStudyNav({ currentSlug }: { currentSlug: string }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  // The clip-path circle for the menu open/close animation emanates from
  // the hamburger button.  Capture the button's screen position at click
  // time so the animation origin tracks layout shifts (e.g. resize).
  const [clipOrigin, setClipOrigin] = useState("calc(100% - 60px) 32px");

  const tile = tiles.find((t) => t.slug === currentSlug) ?? null;

  const openMenu = () => {
    if (buttonRef.current) {
      const r = buttonRef.current.getBoundingClientRect();
      setClipOrigin(`${r.left + r.width / 2}px ${r.top + r.height / 2}px`);
    }
    setOpen(true);
  };
  const close = () => setOpen(false);

  // Lock body scroll while menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b-2 border-[#1F1F1F] bg-[#EEEEEE]/95 backdrop-blur">
        {/* ---- Mobile bar (<800) — project number + logo + name + hamburger ----
            The breadcrumb is a button that scrolls to the top of the
            current case study, NOT a back-to-portfolio link.  Tapping
            the project logo to navigate home was misleading (it reads
            as an identity badge, not a back affordance); the hamburger
            drawer's "Work > {project}" list is the deliberate path
            back to the portfolio. */}
        <div className="flex h-[64px] items-center justify-between px-[24px] tablet:hidden">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex cursor-pointer items-center gap-[10px]"
            aria-label={`Scroll to top of ${tile?.brand ?? "case study"}`}
          >
            {tile && (
              <span
                className="font-mono text-[14px] font-medium tracking-[0.04em] text-[#1F1F1F]"
                style={{
                  fontFamily:
                    "var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
                }}
              >
                {tile.id}
              </span>
            )}
            {tile && <TileLogo tileId={tile.id} />}
            <span className="text-[16px] leading-[0.92] font-bold text-[#1F1F1F]">
              {tile?.brand ?? "Soonk"}
            </span>
          </button>

          <button
            ref={buttonRef}
            onClick={openMenu}
            aria-label="Open menu"
            className="flex size-[44px] cursor-pointer flex-col items-center justify-center gap-[4px] rounded-full bg-[#1F1F1F] shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-[1px] hover:shadow-[0_8px_16px_rgba(0,0,0,0.25)]"
          >
            <span className="block h-[2px] w-[22px] bg-[#F4F4F4]" />
            <span className="block h-[2px] w-[22px] bg-[#F4F4F4]" />
            <span className="block h-[2px] w-[22px] bg-[#F4F4F4]" />
          </button>
        </div>

        {/* ---- Desktop bar (≥800) — full nav row ---- */}
        <nav className="mx-auto hidden max-w-[1200px] items-center gap-4 px-[32px] py-4 tablet:flex">
          {/* Brand: [logo + Soonk] — matches the landing's ProjectNav so
              the brand reads identically on every route. */}
          <Link
            href="/"
            className="flex items-center gap-[10px] whitespace-nowrap text-[#5D5D5D] no-underline transition-colors hover:text-[#1F1F1F]"
            aria-label="Soonk — home"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/soonk_logo_mark.svg"
              alt=""
              aria-hidden
              className="h-[24px] w-auto shrink-0"
            />
            <span className="text-[16px] leading-[0.92] font-normal">
              Soonk
            </span>
          </Link>
          <span className="h-6 w-px bg-[#A0A0A0]" aria-hidden />

          <div className="flex items-center gap-2">
            <Link
              href="/#work-grid"
              className="text-[16px] leading-[0.92] font-semibold whitespace-nowrap text-[#1F1F1F] no-underline hover:underline"
            >
              Work
            </Link>
            {/* Indicator squares — 16×16 each, fixed size at rest, no
                row reflow on hover.  Hovering a square:
                  (1) fills the square with #00FB00 (Soonk accent green)
                      while keeping its black border, and
                  (2) reveals an editorial tooltip card below the row
                      with the project's brand + tagline — same green
                      fill, hard 4-px offset shadow for the brutalist
                      drop-shadow feel.
                Tooltip is absolutely positioned below the square so
                siblings don't shift on hover.  pointer-events-none keeps
                the card from interfering with hover continuity. */}
            {tiles.map((t) => {
              const active = t.slug === currentSlug;
              return (
                <span key={t.id} className="group relative flex items-center">
                  <Link
                    href={`/work/${t.slug}`}
                    aria-label={`${t.id} · ${t.brand}`}
                    className={`block size-4 cursor-pointer border border-[#1F1F1F] transition-colors ${
                      active
                        ? "bg-[#1F1F1F] group-hover:bg-[#00FB00]"
                        : "bg-transparent group-hover:bg-[#00FB00]"
                    }`}
                  />
                  <span
                    role="tooltip"
                    aria-hidden
                    className="pointer-events-none absolute top-[calc(100%+14px)] left-1/2 z-50 w-max max-w-[260px] -translate-x-1/2 -translate-y-1 border-2 border-[#1F1F1F] bg-[#00FB00] px-[14px] py-[10px] opacity-0 shadow-[4px_4px_0_0_#1F1F1F] transition-[opacity,transform] duration-150 ease-out group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    <span className="block text-[10px] tracking-[0.16em] font-medium text-[#1F1F1F]/70" style={{ fontFamily: "var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                      {t.id}
                    </span>
                    <span className="block text-[15px] leading-[1.2] font-semibold text-[#1F1F1F]">
                      {t.brand}
                    </span>
                    <span className="block text-[12px] leading-[1.35] font-medium text-[#1F1F1F]">
                      {t.tagline}
                    </span>
                  </span>
                </span>
              );
            })}
          </div>

          <span className="h-6 w-px bg-[#A0A0A0]" aria-hidden />
          <Link
            href="/#publication"
            className="text-[16px] leading-[0.92] font-normal whitespace-nowrap text-[#5D5D5D] hover:text-[#1F1F1F]"
          >
            Lecture &amp; Publication
          </Link>
          <span className="h-6 w-px bg-[#A0A0A0]" aria-hidden />
          <Link
            href="/about"
            className="text-[16px] leading-[0.92] font-normal whitespace-nowrap text-[#5D5D5D] hover:text-[#1F1F1F]"
          >
            About me
          </Link>

          <Link
            href={tile ? `/#work-list-${tile.id}` : "/"}
            className="ml-auto text-[12px] tracking-[0.08em] text-[#5D5D5D] no-underline hover:text-[#1F1F1F]"
          >
            ← BACK TO PORTFOLIO
          </Link>
        </nav>
      </header>

      {/* ---- Mobile menu overlay (clip-path circle expand from hamburger) ---- */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-50 bg-[#1F1F1F] text-[#F4F4F4] tablet:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{
          clipPath: open
            ? `circle(150vmax at ${clipOrigin})`
            : `circle(0px at ${clipOrigin})`,
          transition: "clip-path 700ms cubic-bezier(0.65, 0, 0.35, 1)",
        }}
      >
        <div
          className={`flex h-full flex-col gap-[20px] overflow-y-auto p-[20px] transition-opacity duration-200 ${
            open ? "opacity-100 delay-300" : "opacity-0"
          }`}
        >
          <div className="flex items-start justify-between">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hamburger_logo.svg"
              alt=""
              aria-hidden
              className="h-[48px] w-auto shrink-0"
            />
            <button
              onClick={close}
              aria-label="Close menu"
              className="cursor-pointer text-3xl leading-none text-[#F4F4F4]"
            >
              ✕
            </button>
          </div>

          <Link
            href="/"
            onClick={close}
            className="self-start text-[26px] leading-[1] font-normal text-[#A0A0A0] no-underline hover:text-[#F4F4F4]"
          >
            Soonk
          </Link>

          <div className="h-[2px] w-full bg-[#F4F4F4]" />

          <div className="flex flex-col gap-[12px]">
            <Link
              href="/#work-grid"
              onClick={close}
              className="flex items-center gap-[8px] self-start text-[26px] leading-[1] font-medium text-[#F4F4F4] no-underline"
            >
              <span>Work</span>
            </Link>

            <ul className="flex flex-col gap-[10px] pl-[20px]">
              {tiles.map((t) => {
                const active = t.slug === currentSlug;
                return (
                  <li key={t.id} className="flex items-center gap-[16px]">
                    <Link
                      href={`/work/${t.slug}`}
                      onClick={close}
                      className={`text-left text-[20px] leading-[1.05] no-underline ${
                        active
                          ? "font-bold text-[#F4F4F4]"
                          : "font-normal text-[#A0A0A0] hover:text-[#F4F4F4]"
                      }`}
                    >
                      {t.brand}
                    </Link>
                    {active && (
                      <span
                        aria-hidden
                        className="size-3 shrink-0 rounded-full bg-[#F4F4F4]"
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="h-[2px] w-full bg-[#F4F4F4]" />

          <Link
            href="/#publication"
            onClick={close}
            className="self-start text-[26px] leading-[1] font-normal text-[#A0A0A0] hover:text-[#F4F4F4] no-underline"
          >
            Lecture &amp; Publication
          </Link>

          <Link
            href="/about"
            onClick={close}
            className="self-start text-[26px] leading-[1] font-normal text-[#A0A0A0] hover:text-[#F4F4F4] no-underline"
          >
            About me
          </Link>
        </div>
      </div>
    </>
  );
}
