"use client";

import { tiles } from "@/data/tiles";
import { useEffect, useRef, useState } from "react";

// MobileNav — mobile-only (<800px) sticky WORK+hamburger bar PLUS the
// fullscreen menu overlay.  Lives between <Hero/> and <ProjectList/> in DOM
// order so its natural position is just-below the hero; as the user scrolls
// past the hero the bar slides into view, then `position: sticky; top:0;`
// pins it to the viewport top.
//
// Two visual states:
//   162:3935 — bar visible, no shadow (initial / about-to-stick).
//   162:4000 — sticky-active: bottom border + drop-shadow.
// State is detected by checking `getBoundingClientRect().top <= 0` on scroll.

export default function MobileNav() {
  const barRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(tiles[0]?.id ?? null);
  const [stuck, setStuck] = useState(false);
  // The clip-path circle for the menu open/close animation emanates from
  // the hamburger button.  Because the bar lives in normal flow until it
  // sticks, the button's viewport position depends on scroll — capture it
  // at click time instead of hard-coding a "calc(100% - 56px) X" value.
  const [clipOrigin, setClipOrigin] = useState("calc(100% - 60px) 32px");

  // Active list-tile tracking — same scroll-position logic as ProjectNav.
  // (See that file for the explanation of why we don't use IntersectionObserver.)
  useEffect(() => {
    const compute = () => {
      const els = Array.from(
        document.querySelectorAll<HTMLElement>("[data-tile-list]"),
      );
      if (els.length === 0) return;
      const trigger = window.innerHeight * 0.3;
      let nextId: string | null = els[0].getAttribute("data-tile-id");
      for (const el of els) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= trigger) {
          nextId = el.getAttribute("data-tile-id");
        } else {
          break;
        }
      }
      if (nextId) setActiveId(nextId);
    };
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, []);

  // Sticky-active detection (for the drop-shadow visual cue).
  useEffect(() => {
    const onScroll = () => {
      if (!barRef.current) return;
      setStuck(barRef.current.getBoundingClientRect().top <= 0);
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
  const goTo = (id: string) => {
    close();
    setTimeout(() => {
      document
        .querySelector(`[data-tile-list][data-tile-id="${id}"]`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  };

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
          <p className="text-[48px] leading-[0.92] font-black text-[#1F1F1F]">
            WORK
          </p>
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
            <button
              onClick={close}
              className="flex cursor-pointer items-center gap-[8px] text-[32px] leading-[0.92] font-medium text-[#F4F4F4]"
            >
              <span>Work</span>
              <span aria-hidden className="text-[18px]">∧</span>
            </button>

            <ul className="flex flex-col gap-[16px] pl-1">
              {tiles.map((t) => {
                const active = t.id === activeId;
                return (
                  <li key={t.id} className="flex items-center gap-[16px]">
                    <button
                      onClick={() => goTo(t.id)}
                      className={`cursor-pointer text-left text-[24px] leading-[0.92] ${
                        active
                          ? "font-bold text-[#F4F4F4]"
                          : "font-normal text-[#8E8E8E]"
                      }`}
                    >
                      {t.brand}
                    </button>
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

          <button
            onClick={close}
            className="flex cursor-pointer items-center gap-[8px] text-left text-[32px] leading-[0.92] font-normal text-[#8E8E8E]"
          >
            <span>Publications</span>
            <span aria-hidden className="text-[18px]">∨</span>
          </button>

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
