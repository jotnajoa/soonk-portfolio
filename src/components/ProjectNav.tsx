"use client";

import { tiles } from "@/data/tiles";
import { useEffect, useState } from "react";

// Figma node 101:1972 / 101:1656.
//   Soonk · | · Work [9 indicator squares] | · Publication · | · Resume
//
// The nav is RENDERED into the DOM at full position from the start (so the
// FlyingSquares scroll animation can measure indicator positions correctly).
// Initial opacity is 0; FlyingSquares fades it in as the user scrolls past
// the grid.
//
// ProjectNav itself only handles the active-project highlight by observing
// which list tile is most-visible.

export default function ProjectNav() {
  const [activeId, setActiveId] = useState<string | null>(tiles[0]?.id ?? null);

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
      { threshold: [0.3, 0.6, 0.9], rootMargin: "-20% 0px -20% 0px" },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const goTo = (id: string) => {
    document
      .querySelector(`[data-tile-list][data-tile-id="${id}"]`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div
      data-project-nav
      style={{ opacity: 0, pointerEvents: "none" }}
      className="fixed top-0 right-0 left-0 z-40 hidden bg-[#EEEEEE]/95 backdrop-blur md:block"
    >
      <nav className="flex items-center gap-4 px-[32px] py-4">
        <span className="text-[16px] leading-[0.92] font-normal whitespace-nowrap text-[#A0A0A0]">
          Soonk
        </span>
        <span className="h-6 w-px bg-[#A0A0A0]" aria-hidden />

        <div className="flex items-center gap-2">
          <span className="text-[16px] leading-[0.92] font-semibold whitespace-nowrap text-black">
            Work
          </span>
          {tiles.map((t) => {
            const active = t.id === activeId;
            return (
              <button
                key={t.id}
                onClick={() => goTo(t.id)}
                aria-label={`${t.id} · ${t.brand}`}
                title={`${t.id} · ${t.brand}`}
                data-nav-indicator={t.id}
                className={`size-4 border border-[#1F1F1F] transition-colors ${
                  active ? "bg-[#1F1F1F]" : "bg-transparent hover:bg-[#D9D9D9]"
                }`}
              />
            );
          })}
        </div>

        <span className="h-6 w-px bg-[#A0A0A0]" aria-hidden />
        <a
          href="#publication"
          className="text-[16px] leading-[0.92] font-normal whitespace-nowrap text-[#A0A0A0] hover:text-black"
        >
          Publication
        </a>
        <span className="h-6 w-px bg-[#A0A0A0]" aria-hidden />
        <a
          href="#resume"
          className="text-[16px] leading-[0.92] font-normal whitespace-nowrap text-[#A0A0A0] hover:text-black"
        >
          Resume
        </a>
      </nav>
    </div>
  );
}
