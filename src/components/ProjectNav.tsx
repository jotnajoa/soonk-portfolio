"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { tiles } from "@/data/tiles";
import { useEffect, useState } from "react";

// Figma node 101:1972 / 101:1656.
//   Soonk · | · Work [9 indicator squares] | · Publication · | · Resume
//
// Rendered globally via app/layout.tsx, so EVERY route gets the same
// header.  Visibility behaviour depends on pathname:
//   /              — starts opacity 0 + pointer-events none, FlyingSquares
//                    fades it in as the user scrolls past the grid.  This
//                    is the original landing behaviour.
//   any other path — always visible (opacity 1).  No FlyingSquares on
//                    these routes, so the inline initial style controls it.
//
// Active-tile highlight: the scroll observer queries [data-tile-list] —
// only present on the landing.  On case-study pages the array is empty,
// so we just show the page's tile id (e.g. "01" on /work/pomes) as
// active so the indicator anchors the user contextually.
//
// Indicator click: on the landing, smooth-scrolls to the tile.  On
// other pages, navigates to /#work-list with the tile in view (Next.js
// Link with the right href hash).

const PATH_TO_TILE_ID: Record<string, string> = {
  "/work/pomes": "01",
};

export default function ProjectNav() {
  const pathname = usePathname();
  const isLanding = pathname === "/";
  const fallbackActive = PATH_TO_TILE_ID[pathname ?? ""] ?? tiles[0]?.id ?? null;
  const [activeId, setActiveId] = useState<string | null>(fallbackActive);

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
  //
  // Only runs on the landing — case-study pages have no [data-tile-list]
  // elements so the listener would be a no-op anyway.
  useEffect(() => {
    if (!isLanding) return;

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
  }, [isLanding]);

  // Click behaviour for the indicator squares:
  //   - On /         : smooth-scroll to the matching list tile.
  //   - elsewhere    : let the <Link> handle navigation to /#work-list-<id>
  //                    (the landing's ProjectList tile carries that id).
  const goTo = (id: string) => {
    if (!isLanding) return; // Link's href takes over.
    document
      .querySelector(`[data-tile-list][data-tile-id="${id}"]`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // On the landing the nav starts hidden — FlyingSquares fades it in via
  // GSAP as the grid scrolls into view.  On every other page we render
  // it immediately at full opacity so the user always has a header.
  const initialStyle = isLanding
    ? { opacity: 0, pointerEvents: "none" as const }
    : undefined;

  return (
    <div
      data-project-nav
      style={initialStyle}
      className="fixed top-0 right-0 left-0 z-40 hidden bg-[#EEEEEE]/95 backdrop-blur tablet:block"
    >
      {/* Bar bg + backdrop-blur stretch full viewport, but the nav content
          itself caps at 1200px (centered) so it doesn't sprawl on
          ultra-wide screens. */}
      <nav className="mx-auto flex max-w-[1200px] items-center gap-4 px-[32px] py-4">
        <Link
          href="/"
          className="text-[16px] leading-[0.92] font-normal whitespace-nowrap text-[#A0A0A0] hover:text-black"
        >
          Soonk
        </Link>
        <span className="h-6 w-px bg-[#A0A0A0]" aria-hidden />

        <div className="flex items-center gap-2">
          <span className="text-[16px] leading-[0.92] font-semibold whitespace-nowrap text-black">
            Work
          </span>
          {tiles.map((t) => {
            const active = t.id === activeId;
            const indicatorClasses = `size-4 border border-[#1F1F1F] transition-colors ${
              active ? "bg-[#1F1F1F]" : "bg-transparent hover:bg-[#D9D9D9]"
            }`;
            // Same visual + same data-nav-indicator (FlyingSquares targets
            // it on the landing) — only the click behaviour differs.
            if (isLanding) {
              return (
                <button
                  key={t.id}
                  onClick={() => goTo(t.id)}
                  aria-label={`${t.id} · ${t.brand}`}
                  title={`${t.id} · ${t.brand}`}
                  data-nav-indicator={t.id}
                  className={indicatorClasses}
                />
              );
            }
            return (
              <Link
                key={t.id}
                href={`/#work-list-${t.id}`}
                aria-label={`${t.id} · ${t.brand}`}
                title={`${t.id} · ${t.brand}`}
                data-nav-indicator={t.id}
                className={indicatorClasses}
              />
            );
          })}
        </div>

        <span className="h-6 w-px bg-[#A0A0A0]" aria-hidden />
        <Link
          href="/#publication"
          className="text-[16px] leading-[0.92] font-normal whitespace-nowrap text-[#A0A0A0] hover:text-black"
        >
          Publication
        </Link>
        <span className="h-6 w-px bg-[#A0A0A0]" aria-hidden />
        <Link
          href="/#resume"
          className="text-[16px] leading-[0.92] font-normal whitespace-nowrap text-[#A0A0A0] hover:text-black"
        >
          Resume
        </Link>
      </nav>
    </div>
  );
}
