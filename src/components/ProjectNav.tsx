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

  // Active-tile tracking via scroll position (NOT IntersectionObserver).
  //
  // We previously used IntersectionObserver + ratio-sort, but that has a
  // subtle bug: each callback only contains entries for tiles that crossed
  // a threshold THIS frame.  If tile 02 is fully visible and tile 03 starts
  // entering, the callback fires with only [03] — we'd pick 03 even though
  // 02 is still more visible overall.  A moment later 02's threshold flips,
  // callback fires with [02], and we switch back.  Result: indicators bounce
  // between adjacent tiles as the boundary crosses, which is what the user
  // saw ("3rd lights up, then back to 2nd, then 4th, then back to 3rd…").
  //
  // Scroll-position approach is monotonic: active tile = the LAST tile whose
  // top has crossed a fixed trigger line ~30% down the viewport.  Scrolling
  // forward only ever advances; scrolling backward only ever retreats.
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
          // Tiles after this haven't reached the trigger yet — stop.
          break;
        }
      }

      if (nextId) setActiveId(nextId);
    };

    // Run once at mount (in case page loaded scrolled), then on every scroll
    // and resize.  Passive listener — we never preventDefault.
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
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
      className="fixed top-0 right-0 left-0 z-40 hidden bg-[#EEEEEE]/95 backdrop-blur tablet:block"
    >
      {/* Bar bg + backdrop-blur stretch full viewport, but the nav content
          itself caps at 1200px (centered) so it doesn't sprawl on
          ultra-wide screens. */}
      <nav className="mx-auto flex max-w-[1200px] items-center gap-4 px-[32px] py-4">
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
