"use client";

import { tiles } from "@/data/tiles";
import { useEffect, useState } from "react";

// Mobile/narrow-viewport variant of the project nav.
// - Compact header bar with hamburger (appears after scrolling past hero)
// - Tap hamburger → dark panel slides in via a diagonal clip-path wipe from
//   top-left, revealing the full menu (Home / Work / Publication / Resume).

export default function MobileMenu() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [open, setOpen] = useState(false);

  // Show header after the hero
  useEffect(() => {
    const onScroll = () => {
      setHeaderVisible(window.scrollY > window.innerHeight * 0.7);
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

  // Track current tile in viewport
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-tile-id]");
    if (els.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const v = entries.filter((e) => e.isIntersecting);
        if (v.length === 0) return;
        v.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const id = v[0].target.getAttribute("data-tile-id");
        if (id) setActiveId(id);
      },
      { threshold: [0.4], rootMargin: "-20% 0px -20% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const close = () => setOpen(false);
  const goTo = (id: string) => {
    close();
    // Wait for the menu close animation, then scroll
    setTimeout(() => {
      document
        .querySelector(`[data-tile-id="${id}"]`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 350);
  };

  return (
    <>
      {/* Compact header bar — slides down on scroll, hidden on lg+ */}
      <div
        aria-hidden={!headerVisible}
        className={`fixed top-0 right-0 left-0 z-40 flex items-center justify-between border-b border-zinc-900 bg-[#EEEEEE]/95 backdrop-blur transition-transform duration-300 lg:hidden ${
          headerVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex flex-1 items-center gap-3 overflow-hidden px-4 py-3">
          <span className="text-base font-black text-zinc-900">Work</span>
          <div className="flex flex-1 items-center gap-1 overflow-x-auto">
            {tiles.map((t) => (
              <span
                key={t.id}
                aria-hidden
                className={`h-3 w-3 flex-shrink-0 border border-zinc-900 ${
                  t.id === activeId ? "bg-zinc-900" : "bg-transparent"
                }`}
              />
            ))}
          </div>
        </div>
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="m-3 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-white"
        >
          {/* hamburger glyph */}
          <span className="relative block h-0.5 w-5 bg-white before:absolute before:left-0 before:-top-2 before:h-0.5 before:w-5 before:bg-white before:content-[''] after:absolute after:left-0 after:top-2 after:h-0.5 after:w-5 after:bg-white after:content-['']" />
        </button>
      </div>

      {/* Full-screen menu panel — diagonal clip-path wipe from top-left */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-50 bg-zinc-900 text-zinc-50 lg:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{
          clipPath: open
            ? "polygon(0 0, 200% 0, 0 200%)"
            : "polygon(0 0, 0 0, 0 0)",
          transition: "clip-path 600ms cubic-bezier(0.65, 0, 0.35, 1)",
        }}
      >
        <button
          onClick={close}
          aria-label="Close menu"
          className="absolute top-4 right-5 text-3xl leading-none"
        >
          ×
        </button>

        <nav
          className={`flex flex-col gap-0 px-6 pt-20 pb-10 transition-opacity duration-200 ${
            open ? "opacity-100 delay-300" : "opacity-0"
          }`}
        >
          <a
            href="#"
            onClick={close}
            className="border-b border-zinc-700 py-4 text-lg font-light"
          >
            Home
          </a>

          <div className="border-b border-zinc-700 py-4">
            <div className="mb-3 text-lg font-black tracking-wide">Work ∧</div>
            <ul className="flex flex-col gap-3 pl-1">
              {tiles.map((t) => {
                const isActive = t.id === activeId;
                return (
                  <li
                    key={t.id}
                    className="flex items-center justify-between text-base"
                  >
                    <button
                      onClick={() => goTo(t.id)}
                      className={`text-left font-light ${
                        isActive ? "font-black text-white" : "text-zinc-300"
                      }`}
                    >
                      {t.keyword}
                    </button>
                    {isActive && (
                      <span className="ml-3 inline-block h-2 w-2 rounded-full bg-white" />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <a
            href="#"
            onClick={close}
            className="border-b border-zinc-700 py-4 text-lg font-light"
          >
            Publication ∨
          </a>
          <a
            href="#"
            onClick={close}
            className="py-4 text-lg font-light"
          >
            Resume
          </a>
        </nav>
      </div>
    </>
  );
}
