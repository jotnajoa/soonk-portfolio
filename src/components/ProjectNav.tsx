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

  // Hash-based scroll-to-tile on landing.
  //
  // Case-study pages link "← BACK TO PORTFOLIO" (and the mobile breadcrumb)
  // to "/#work-list-<tile.id>" so the user returns to the list with their
  // project already in view.  The hash itself is just an anchor: there's no
  // real <element id="work-list-04"> on the page (the list rows use
  // [data-tile-id="04"][data-tile-list] instead, which Next's hashchange
  // resolver can't see).  On mount, parse the hash, locate the matching
  // list row, and scroll it into view — with a short timeout so the
  // ProjectList has actually rendered before we measure.
  useEffect(() => {
    if (!isLanding) return;
    const m = /^#work-list-(\d{2})$/.exec(window.location.hash);
    if (!m) return;
    const id = m[1];
    const tile = document.querySelector(
      `[data-tile-list][data-tile-id="${id}"]`,
    );
    if (!tile) return;
    // One paint later: the list is mounted, but its grid may still be
    // settling.  rAF + setTimeout(0) covers both single-paint and slower
    // hydration paths.
    requestAnimationFrame(() => {
      tile.scrollIntoView({ behavior: "auto", block: "start" });
    });
  }, [isLanding]);

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
            // Hover bg uses the green accent (#00FB00) — same treatment
            // as the case-study CaseStudyNav so the two nav surfaces
            // share a single hover language.
            const indicatorClasses = `block size-4 border border-[#1F1F1F] transition-colors ${
              active
                ? "bg-[#1F1F1F] group-hover:bg-[#00FB00]"
                : "bg-transparent group-hover:bg-[#00FB00]"
            }`;
            // Each indicator is wrapped in a `relative group` so the
            // editorial tooltip can position itself below without
            // pushing siblings.  The indicator element itself keeps the
            // data-nav-indicator attribute + 16×16 size so FlyingSquares
            // continues to measure it correctly.
            const tooltip = (
              <span
                role="tooltip"
                aria-hidden
                className="pointer-events-none absolute top-[calc(100%+14px)] left-1/2 z-50 w-max max-w-[260px] -translate-x-1/2 -translate-y-1 border-2 border-[#1F1F1F] bg-[#00FB00] px-[14px] py-[10px] opacity-0 shadow-[4px_4px_0_0_#1F1F1F] transition-[opacity,transform] duration-150 ease-out group-hover:translate-y-0 group-hover:opacity-100"
              >
                <span
                  className="block text-[10px] tracking-[0.16em] font-medium text-[#1F1F1F]/70"
                  style={{
                    fontFamily:
                      "var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
                  }}
                >
                  {t.id}
                </span>
                <span className="block text-[15px] leading-[1.2] font-semibold text-[#1F1F1F]">
                  {t.brand}
                </span>
                <span className="block text-[12px] leading-[1.35] font-medium text-[#1F1F1F]">
                  {t.tagline}
                </span>
              </span>
            );
            if (isLanding) {
              return (
                <span key={t.id} className="group relative flex items-center">
                  <button
                    onClick={() => goTo(t.id)}
                    aria-label={`${t.id} · ${t.brand}`}
                    data-nav-indicator={t.id}
                    className={indicatorClasses}
                  />
                  {tooltip}
                </span>
              );
            }
            return (
              <span key={t.id} className="group relative flex items-center">
                <Link
                  href={`/#work-list-${t.id}`}
                  aria-label={`${t.id} · ${t.brand}`}
                  data-nav-indicator={t.id}
                  className={indicatorClasses}
                />
                {tooltip}
              </span>
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
