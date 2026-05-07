"use client";

import { tiles } from "@/data/tiles";
import { useEffect, useState } from "react";

// Sticky desktop nav. Appears once you scroll past ~70% of the hero,
// shows 16 indicator squares with the in-viewport tile highlighted black.
// On mobile, MobileMenu handles its own variant.

export default function ProjectNav() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.7);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-tile-id]");
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length === 0) return;
        // Pick the most-visible tile
        visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const id = visibleEntries[0].target.getAttribute("data-tile-id");
        if (id) setActiveId(id);
      },
      {
        threshold: [0.3, 0.6, 0.9],
        rootMargin: "-25% 0px -25% 0px",
      },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToTile = (id: string) => {
    document
      .querySelector(`[data-tile-id="${id}"]`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div
      aria-hidden={!visible}
      className={`fixed top-0 right-0 left-0 z-40 hidden border-b border-zinc-900 bg-[#EEEEEE]/95 backdrop-blur transition-transform duration-300 lg:block ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="container mx-auto flex items-center gap-5 px-6 py-3 lg:px-16">
        <a href="#" className="text-sm font-light text-zinc-600 hover:text-zinc-900">
          Home
        </a>
        <span className="text-sm text-zinc-400" aria-hidden>
          |
        </span>
        <span className="text-sm font-black tracking-wide text-zinc-900">Work</span>

        <div className="flex items-center gap-1.5">
          {tiles.map((t) => {
            const isActive = t.id === activeId;
            return (
              <button
                key={t.id}
                onClick={() => scrollToTile(t.id)}
                aria-label={`Project ${t.number}: ${t.keyword}`}
                title={`${t.number} · ${t.keyword}`}
                className={`h-3.5 w-3.5 border-2 border-zinc-900 transition-colors ${
                  isActive
                    ? "bg-zinc-900"
                    : "bg-transparent hover:bg-zinc-300"
                }`}
              />
            );
          })}
        </div>

        <span className="text-sm text-zinc-400" aria-hidden>
          |
        </span>
        <a href="#" className="text-sm font-light text-zinc-600 hover:text-zinc-900">
          Publication
        </a>
        <span className="text-sm text-zinc-400" aria-hidden>
          |
        </span>
        <a href="#" className="text-sm font-light text-zinc-600 hover:text-zinc-900">
          Resume
        </a>
      </nav>
    </div>
  );
}
