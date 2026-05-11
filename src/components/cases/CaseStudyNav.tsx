"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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
//   - "Work" (top-bar label next to the 9 indicator squares) → "/#work".
//     Primary nav, jumps to the projects section on home.
//   - "← BACK TO PORTFOLIO" → uses goBack(): router.back() if there is
//     prior history (so home-page scroll position + hero state is preserved),
//     falling back to router.push("/") on direct loads.  This is the only
//     control that semantically *should* go "back" rather than to a fixed
//     route.
//   - Mobile breadcrumb (project number + logo + brand, top-left mobile bar)
//     also uses goBack() — it reads as the inverse of the project label
//     the user just tapped into, not as a brand mark.

export default function CaseStudyNav({ currentSlug }: { currentSlug: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  // The clip-path circle for the menu open/close animation emanates from
  // the hamburger button.  Capture the button's screen position at click
  // time so the animation origin tracks layout shifts (e.g. resize).
  const [clipOrigin, setClipOrigin] = useState("calc(100% - 60px) 32px");

  const tile = tiles.find((t) => t.slug === currentSlug) ?? null;

  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

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
        {/* ---- Mobile bar (<800) — project number + logo + name + hamburger ---- */}
        <div className="flex h-[64px] items-center justify-between px-[24px] tablet:hidden">
          <button
            type="button"
            onClick={goBack}
            className="flex cursor-pointer items-center gap-[10px]"
            aria-label="Back to portfolio"
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
          <Link
            href="/"
            className="text-[16px] leading-[0.92] font-normal whitespace-nowrap text-[#5D5D5D] no-underline hover:text-[#1F1F1F]"
          >
            Soonk
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
                    className={`block size-4 border border-[#1F1F1F] transition-colors ${
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
            Publication
          </Link>
          <span className="h-6 w-px bg-[#A0A0A0]" aria-hidden />
          <Link
            href="/#resume"
            className="text-[16px] leading-[0.92] font-normal whitespace-nowrap text-[#5D5D5D] hover:text-[#1F1F1F]"
          >
            Resume
          </Link>

          <button
            type="button"
            onClick={goBack}
            className="ml-auto cursor-pointer text-[12px] tracking-[0.08em] text-[#5D5D5D] hover:text-[#1F1F1F]"
          >
            ← BACK TO PORTFOLIO
          </button>
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
          className={`flex h-full flex-col gap-[32px] p-[24px] transition-opacity duration-200 ${
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
            className="self-start text-[32px] leading-[0.92] font-normal text-[#A0A0A0] no-underline hover:text-[#F4F4F4]"
          >
            Soonk
          </Link>

          <div className="h-[2px] w-full bg-[#F4F4F4]" />

          <div className="flex flex-col gap-[16px]">
            <Link
              href="/#work-grid"
              onClick={close}
              className="flex items-center gap-[8px] self-start text-[32px] leading-[0.92] font-medium text-[#F4F4F4] no-underline"
            >
              <span>Work</span>
            </Link>

            <ul className="flex flex-col gap-[16px] pl-1">
              {tiles.map((t) => {
                const active = t.slug === currentSlug;
                return (
                  <li key={t.id} className="flex items-center gap-[16px]">
                    <Link
                      href={`/work/${t.slug}`}
                      onClick={close}
                      className={`text-left text-[24px] leading-[0.92] no-underline ${
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
            className="self-start text-[32px] leading-[0.92] font-normal text-[#A0A0A0] hover:text-[#F4F4F4] no-underline"
          >
            Publications
          </Link>

          <Link
            href="/#resume"
            onClick={close}
            className="self-start text-[32px] leading-[0.92] font-normal text-[#A0A0A0] hover:text-[#F4F4F4] no-underline"
          >
            Resume
          </Link>
        </div>
      </div>
    </>
  );
}
