"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

// Register plugin once per browser session.  Server-safe — the import path
// for ScrollTrigger is fine at module level, but registerPlugin must only
// run in the browser (no `document`/`window` on the server).
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// FlyingSquares — the showcase scroll animation.
//
// As the user scrolls from the grid into the list, the 9 grid tiles fly up
// and shrink, each landing exactly on its corresponding indicator dot in
// the sticky ProjectNav.  At the same moment the nav itself fades in.  By
// the end of the transition the tiles have collapsed to the indicator
// size, faded out, and the nav (with its 9 dots) is fully visible.
//
// Mechanics:
//   - GSAP ScrollTrigger pins the grid section for ~600px of scroll.
//   - During the pin, a scrubbed timeline maps scroll progress 0 → 1 to:
//       • each tile transformed (x, y, scale) toward its target indicator
//       • the nav fading in
//       • the tiles fading out at the very end
//   - Indicator positions are measured from a fully-rendered (opacity-0)
//     ProjectNav, so geometry is captured BEFORE the visual reveal.
//
// Only mounts the effect in the browser; no DOM is rendered (returns null).

export default function FlyingSquares() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let triggers: ScrollTrigger[] = [];

    // Wait one tick so all sibling components have committed to the DOM
    // and layout is stable before we measure positions.
    const setupId = window.setTimeout(() => {
      const grid = document.querySelector<HTMLElement>("#works-grid");
      const tiles = Array.from(
        document.querySelectorAll<HTMLElement>("[data-tile-grid]"),
      );
      const indicators = Array.from(
        document.querySelectorAll<HTMLElement>("[data-nav-indicator]"),
      );
      const nav = document.querySelector<HTMLElement>("[data-project-nav]");

      if (!grid || tiles.length === 0 || indicators.length === 0 || !nav) {
        // Quietly bail if anything is missing — the page still works without
        // the flying animation, just no fancy transition.
        return;
      }

      // Each tile shrinks toward its own center as it flies up.
      gsap.set(tiles, { transformOrigin: "center center" });

      // Pre-compute the (dx, dy, scale) each tile needs to land on its
      // indicator.  Captured ONCE here; the pin keeps tile origins fixed
      // during the animation, so these deltas remain valid.
      const moves = tiles
        .map((tile, i) => {
          const indicator = indicators[i];
          if (!indicator) return null;
          const tr = tile.getBoundingClientRect();
          const ir = indicator.getBoundingClientRect();
          return {
            tile,
            dx: ir.left + ir.width / 2 - (tr.left + tr.width / 2),
            dy: ir.top + ir.height / 2 - (tr.top + tr.height / 2),
            scale: ir.width / tr.width,
          };
        })
        .filter(<T,>(m: T | null): m is T => m !== null);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: grid,
          // Pin engages the moment the grid lines up with the top of the
          // viewport (= user has finished scrolling past the hero, full
          // grid is at the top). Then 800px of scroll plays the entire
          // flight + nav fade + tile dissolve.
          start: "top top",
          end: "+=800",
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      // Tile flight — translate + scale.  power2.in feels like the tile
      // "lifts off" at first and accelerates into its slot.
      moves.forEach(({ tile, dx, dy, scale }) => {
        tl.to(tile, { x: dx, y: dy, scale, ease: "power2.in" }, 0);
      });

      // Nav opacity fades in over the middle of the animation; pointer-
      // events flip to auto so it becomes interactive at the same time.
      tl.fromTo(
        nav,
        { opacity: 0, pointerEvents: "none" },
        { opacity: 1, pointerEvents: "auto", ease: "none" },
        0.4,
      );

      // Last 15% of the timeline: tiles dissolve into the dots they've
      // landed on, leaving just the indicators visible.
      tl.to(tiles, { opacity: 0, ease: "none" }, 0.85);

      ScrollTrigger.refresh();
      triggers = ScrollTrigger.getAll();
    }, 250);

    return () => {
      window.clearTimeout(setupId);
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return null;
}
