"use client";

import Link from "next/link";
import { tiles } from "@/data/tiles";
import { useEffect, useRef, useState } from "react";

// MobileNav — mobile-only (<800px) sticky bar PLUS the fullscreen menu
// overlay.  Lives between <Hero/> and <ProjectList/> in DOM order so its
// natural position is just-below the hero; as the user scrolls past the
// hero the bar slides into view, then `position: sticky; top:0;` pins it
// to the viewport top.
//
// The bar title is dynamic: it reads "WORK" while the user is in the
// ProjectList scroll range, then swaps to "Lecture & Publication" once
// scroll crosses into the LecturePublicationList section below.  Detected
// via getBoundingClientRect on [data-section="publication"] in the same
// scroll handler that flips the sticky-active drop-shadow.
//
// Two visual states for the bar chrome:
//   162:3935 — bar visible, no shadow (initial / about-to-stick).
//   162:4000 — sticky-active: bottom border + drop-shadow.

export default function MobileNav() {
  const barRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [inPublication, setInPublication] = useState(false);
  // The clip-path circle for the menu open/close animation emanates from
  // the hamburger button.  Because the bar lives in normal flow until it
  // sticks, the button's viewport position depends on scroll — capture it
  // at click time instead of hard-coding a "calc(100% - 56px) X" value.
  const [clipOrigin, setClipOrigin] = useState("calc(100% - 60px) 32px");

  // Sticky-active detection + section-in-view detection.  Both depend on
  // the same scroll position, so one handler covers both.  The bar sits
  // 80 px tall, so "in publication" means the section's top edge has
  // crossed the bar's bottom edge.
  useEffect(() => {
    const onScroll = () => {
      if (!barRef.current) return;
      setStuck(barRef.current.getBoundingClientRect().top <= 0);
      const pubEl = document.querySelector('[data-section="publication"]');
      if (pubEl) {
        setInPublication(pubEl.getBoundingClientRect().top <= 80);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const openMenu = () => {
    if (buttonRef.current) {
      const r = buttonRef.current.getBoundingClientRect();
      setClipOrigin(`${r.left + r.width / 2}px ${r.top + r.height / 2}px`);
    }
    setOpen(true);
  };
  const close = () => setOpen(false);

  return (
    <>
      {/* Sticky WORK + hamburger bar (mobile only).
          z-30 so it sits above ProjectList content but BELOW the menu
          overlay (z-50). Shadow + border appear only when sticky-active. */}
      <div
        ref={barRef}
        className={`sticky top-0 z-30 bg-[#EEEEEE] tablet:hidden transition-shadow duration-200 ${
          stuck
            ? "border-b border-black shadow-[0_2px_1px_rgba(0,0,0,0.25)]"
            : ""
        }`}
      >
        <div className="flex h-[80px] items-center justify-between px-[32px]">
          {/* Title swaps based on which section is in view.  WORK keeps
              its punchy 48 px treatment; "Lecture & Publication" drops to
              28 px and wraps onto two lines so the longer label still
              fits within the same 80 px bar without truncation. */}
          {inPublication ? (
            <p className="text-[28px] leading-[0.92] font-black text-[#1F1F1F]">
              Lecture &amp;<br />Publication
            </p>
          ) : (
            <p className="text-[48px] leading-[0.92] font-black text-[#1F1F1F]">
              WORK
            </p>
          )}
          {/* Hamburger button — HIDDEN while the bar is in-flow.  Only
              slides in once the bar has reached `top:0` (sticky-active).
              This matches Figma 162:4106 (no hamburger) → 162:3935 (sticky
              bar with hamburger).  The combined opacity + translate-x
              transition makes the button feel like it slips in from the
              right edge as the bar lands. */}
          <button
            ref={buttonRef}
            onClick={openMenu}
            aria-label="Open menu"
            aria-hidden={!stuck}
            tabIndex={stuck ? 0 : -1}
            className={`flex size-[56px] cursor-pointer flex-col items-center justify-center gap-[5px] rounded-full bg-[#1F1F1F] shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-[opacity,transform,box-shadow] duration-300 ease-out hover:-translate-y-[2px] hover:shadow-[0_8px_16px_rgba(0,0,0,0.25)] active:translate-y-0 active:shadow-[0_2px_8px_rgba(0,0,0,0.15)] ${
              stuck
                ? "pointer-events-auto translate-x-0 opacity-100"
                : "pointer-events-none translate-x-4 opacity-0"
            }`}
          >
            <span className="block h-[3px] w-[30px] bg-[#F4F4F4]" />
            <span className="block h-[3px] w-[30px] bg-[#F4F4F4]" />
            <span className="block h-[3px] w-[30px] bg-[#F4F4F4]" />
          </button>
        </div>
      </div>

      {/* Menu panel — circle-expand clip-path from hamburger position */}
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
          {/* Top row: Soonk hamburger-menu logo (Figma asset) + close */}
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

          <p className="text-[32px] leading-[0.92] font-normal text-[#8E8E8E]">
            Soonk
          </p>

          <div className="h-[2px] w-full bg-[#F4F4F4]" />

          <div className="flex flex-col gap-[16px]">
            {/* Bold + bullet when this section is the one in view, gray
                otherwise.  Mirrors the desktop ProjectNav bold/gray swap
                so the menu reflects where the user currently is. */}
            <button
              onClick={close}
              className={`flex cursor-pointer items-center gap-[16px] text-[32px] leading-[0.92] ${
                inPublication
                  ? "font-normal text-[#8E8E8E] hover:text-[#F4F4F4]"
                  : "font-bold text-[#F4F4F4]"
              }`}
            >
              <span>Work</span>
              {!inPublication && (
                <span
                  aria-hidden
                  className="size-3 shrink-0 rounded-full bg-[#F4F4F4]"
                />
              )}
            </button>

            {/* Project items navigate INTO the case-study route, not to
                the home-page tile-list anchor — the menu is the user's
                jump-into-a-case-study affordance, not a same-page scroll
                shortcut.  All projects render in uniform inactive style;
                the bold + dot "you're here" indicator is reserved for
                the case-study CaseStudyNav (where currentSlug actually
                means the user is on that project's page). */}
            <ul className="flex flex-col gap-[16px] pl-1">
              {tiles.map((t) => (
                <li key={t.id} className="flex items-center gap-[16px]">
                  <Link
                    href={`/work/${t.slug}`}
                    onClick={close}
                    className="text-left text-[24px] leading-[0.92] font-normal text-[#8E8E8E] no-underline hover:text-[#F4F4F4]"
                  >
                    {t.brand}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="h-[2px] w-full bg-[#F4F4F4]" />

          {/* Hash link to the section on the home page.  When the user
              is already in that section, mirror the Work entry's active
              treatment (bold + bullet). */}
          <Link
            href="/#publication"
            onClick={close}
            className={`flex items-center gap-[16px] self-start text-[32px] leading-[0.92] no-underline ${
              inPublication
                ? "font-bold text-[#F4F4F4]"
                : "font-normal text-[#8E8E8E] hover:text-[#F4F4F4]"
            }`}
          >
            <span>Lecture &amp; Publication</span>
            {inPublication && (
              <span
                aria-hidden
                className="size-3 shrink-0 rounded-full bg-[#F4F4F4]"
              />
            )}
          </Link>

          <button
            onClick={close}
            className="cursor-pointer text-left text-[32px] leading-[0.92] font-normal text-[#8E8E8E]"
          >
            Resume
          </button>
        </div>
      </div>
    </>
  );
}
