"use client";

import { tiles } from "@/data/tiles";
import { useEffect, useState } from "react";

// MobileNav — header bar + full-screen menu, only mounted on <800px viewports.
// Figma nodes 101:2160 (header) and 101:2488 (menu open).
//   - Sticky header at top: "WORKS" 48px Archivo Black + 56×56 round dark
//     hamburger (3 horizontal white bars).
//   - Tap hamburger → black circle expands from the button position via
//     clip-path animation, filling the screen with a dark menu panel.
//   - Menu: Soonk header, divider, Work (expanded list of all 9 projects;
//     active project has a small filled dot), Publications (collapsed),
//     Resume.

const HAMBURGER_POS = "calc(100% - 56px) 52px"; // ~ where the button sits

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(tiles[0]?.id ?? null);

  // Track current list tile for active project highlight
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-tile-list]");
    if (els.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const id = visible[0].target.getAttribute("data-tile-id");
        if (id) setActiveId(id);
      },
      { threshold: [0.3, 0.6], rootMargin: "-20% 0px -20% 0px" },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Lock body scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);
  const goTo = (id: string) => {
    close();
    // Wait for the close clip-path to start, then scroll
    setTimeout(() => {
      document
        .querySelector(`[data-tile-list][data-tile-id="${id}"]`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  };

  return (
    <>
      {/* Hamburger button — fixed top-right, visible only on mobile.
          WORKS section heading is rendered inline in ProjectList instead,
          so the Hero composition stays clean above. */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="fixed top-[24px] right-[32px] z-40 flex size-[56px] flex-col items-center justify-center gap-[5px] rounded-full bg-[#1F1F1F] shadow-[0_2px_8px_rgba(0,0,0,0.15)] tablet:hidden"
      >
        <span className="block h-[3px] w-[30px] bg-[#F4F4F4]" />
        <span className="block h-[3px] w-[30px] bg-[#F4F4F4]" />
        <span className="block h-[3px] w-[30px] bg-[#F4F4F4]" /></button>

      {/* Menu panel — circle-expand clip-path from hamburger position */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-50 bg-[#1F1F1F] text-[#F4F4F4] tablet:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{
          clipPath: open
            ? `circle(150vmax at ${HAMBURGER_POS})`
            : `circle(0px at ${HAMBURGER_POS})`,
          transition: "clip-path 700ms cubic-bezier(0.65, 0, 0.35, 1)",
        }}
      >
        <div
          className={`flex h-full flex-col gap-[32px] p-[24px] transition-opacity duration-200 ${
            open ? "opacity-100 delay-300" : "opacity-0"
          }`}
        >
          {/* Top row: small logo placeholder + close button */}
          <div className="flex items-start justify-between">
            <div
              aria-hidden
              className="relative h-[48px] w-[48px] shrink-0"
            >
              {/* Compact logo glyph — outer outline + inner dot.  Real
                  shadowed logo from Figma will replace this. */}
              <span className="absolute inset-0 rounded-full border-[3px] border-[#F4F4F4]" />
              <span className="absolute bottom-1 left-1/2 size-3 -translate-x-1/2 rounded-full border-[2px] border-[#F4F4F4]" />
            </div>
            <button
              onClick={close}
              aria-label="Close menu"
              className="text-3xl leading-none text-[#F4F4F4]"
            >
              ✕
            </button>
          </div>

          {/* Soonk wordmark */}
          <p className="text-[32px] leading-[0.92] font-normal text-[#8E8E8E]">
            Soonk
          </p>

          <div className="h-[2px] w-full bg-[#F4F4F4]" />

          {/* Work section (expanded) */}
          <div className="flex flex-col gap-[16px]">
            <button
              onClick={close}
              className="flex items-center gap-[8px] text-[32px] leading-[0.92] font-medium text-[#F4F4F4]"
            >
              <span>Work</span>
              <span aria-hidden className="text-[18px]">∧</span>
            </button>

            <ul className="flex flex-col gap-[16px] pl-1">
              {tiles.map((t) => {
                const active = t.id === activeId;
                return (
                  <li
                    key={t.id}
                    className="flex items-center gap-[16px]"
                  >
                    <button
                      onClick={() => goTo(t.id)}
                      className={`text-left text-[24px] leading-[0.92] ${
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

          {/* Publications (collapsed) */}
          <button
            onClick={close}
            className="flex items-center gap-[8px] text-left text-[32px] leading-[0.92] font-normal text-[#8E8E8E]"
          >
            <span>Publications</span>
            <span aria-hidden className="text-[18px]">∨</span>
          </button>

          {/* Resume */}
          <button
            onClick={close}
            className="text-left text-[32px] leading-[0.92] font-normal text-[#8E8E8E]"
          >
            Resume
          </button>
        </div>
      </div>
    </>
  );
}
