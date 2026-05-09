"use client";

import { tiles } from "@/data/tiles";
import { useEffect, useState } from "react";

// Figma node 101:1972 / 101:1656.
//   Soonk · | · Work [9 indicator squares] | · Publication · | · Resume
//   Indicator: 16×16 box, border 1px #1F1F1F default, fill #1F1F1F when current.
// Sticky after scrolling past hero. Active project tracked via IntersectionObserver
// on the [data-tile-list] elements.

export default function ProjectNav() {
  const [activeId, setActiveId] = useState<string | null>(tiles[0]?.id ?? null);
  const [visible, setVisible] = useState(false);

  // Show nav once user scrolls past the hero section
  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which list tile is most-visible
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-tile-list]");
    if (els.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length === 0) return;
        visibleEntries.sort(
          (a, b) => b.intersectionRatio - a.intersectionRatio,
        );
        const id = visibleEntries[0].target.getAttribute("data-tile-id");
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
      aria-hidden={!visible}
      className={`fixed top-0 right-0 left-0 z-40 hidden bg-[#EEEEEE]/95 backdrop-blur transition-transform duration-300 md:block ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="flex items-center gap-4 px-[64px] py-4">
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
