"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// SSR-safe layout effect.  Used for the GSAP setup so cleanup runs
// synchronously during commit instead of post-mutation (useEffect's
// passive timing).
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

// Pre-navigation kill switch.  Exported so Link click handlers can
// invoke it BEFORE the React unmount cascade starts.
//
// Why this is needed: ScrollTrigger.pin wraps `#work-grid` in a
// pin-spacer <div> at runtime, mutating the DOM outside React's
// reconciliation.  On client-side navigation (e.g. clicking the POMEs
// tile → /work/pomes), React tries to remove `#work-grid` from its
// expected parent (e.g. <body>), but it's actually inside the
// GSAP-injected pin-spacer.  React throws
//   "Failed to execute 'removeChild' on 'Node': The node to be removed
//    is not a child of this node."
//
// useLayoutEffect cleanup *should* fix this in theory (cleanup runs
// before DOM removal), but in React 19 concurrent rendering + Next.js
// App Router transitions, the timing isn't reliable enough — the
// removeChild error still fires intermittently.
//
// The bullet-proof fix: hook into the click event itself.  Calling
// killGridScrollTriggers() in the Link's onClick runs synchronously
// BEFORE Next.js navigation, GSAP unwinds the pin-spacer, and React's
// subsequent unmount sees the original DOM tree.
export function killGridScrollTriggers() {
  if (typeof window === "undefined") return;
  ScrollTrigger.getAll().forEach((t) => t.kill());
}

// FlyingSquares — desktop scroll-driven transition from grid view to nav.
//
// Animation sequence (over a single scrubbed pin, ~600px of scroll):
//   Phase A · 0.00 → 0.10  (morph)
//     - Every tile's content (logos, headings, paragraphs) fades out
//     - Tile 01's background animates to solid black; tiles 02–09 keep
//       transparent bg + their existing 2px black border, so they read as
//       "outline-only squares" — visually identical to the inactive nav
//       indicators they're about to become.
//   Phase B · 0.10 → ~0.45 (stagger flight)
//     - Each tile flies to its target indicator one after another in
//       canonical id order (01 leftmost first, 09 rightmost last) with a
//       40ms stagger.  power2.in gives the lift-off feel.
//   Phase C · 0.27 → ~0.77 (stagger indicator pop)
//     - Each nav indicator scales+fades in just before its tile arrives,
//       with the same canonical-order stagger.  back.out gives the
//       "타다다다" rapid-pop feel the user asked for.  By the time the
//       tile starts fading, its indicator is already 100% there — no
//       visual gap.
//   Tail · 0.45 → ~0.87
//     - Tiles fade to opacity 0 in canonical order, handing off to the
//       indicators that are now in their slots.
//
// Plus the rest of the nav chrome (Soonk, Work label, Publication, Resume)
// fades in around 0.2–0.5 — that runs on the parent <nav>'s opacity.
// Because indicator opacity is set INDEPENDENTLY (and starts at 0), the
// parent fade doesn't reveal them prematurely.

const CANONICAL_IDS = ["01", "02", "03", "04", "05", "06", "07", "08", "09"];

const STAGGER = 0.04;
const PHASE_A_DUR = 0.1;
const FLIGHT_DUR = 0.35;
const FLIGHT_START = PHASE_A_DUR;
const INDICATOR_DUR = 0.18;
const INDICATOR_START = FLIGHT_START + FLIGHT_DUR / 2; // 0.275
const TILE_FADE_DUR = 0.1;
const TILE_FADE_START = FLIGHT_START + FLIGHT_DUR; // 0.45

export default function FlyingSquares() {
  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return;

    let triggers: ScrollTrigger[] = [];
    let setupTimeoutId: number | null = null;
    let lastIsWide = window.innerWidth >= 800;

    const cleanup = () => {
      if (setupTimeoutId !== null) {
        window.clearTimeout(setupTimeoutId);
        setupTimeoutId = null;
      }
      triggers.forEach((t) => t.kill());
      triggers = [];
      // Reset every tile + its children to clean state.
      document
        .querySelectorAll<HTMLElement>("[data-tile-grid]")
        .forEach((tile) => {
          gsap.set(tile, { clearProps: "all" });
          Array.from(tile.children).forEach((c) => {
            if (c instanceof HTMLElement) gsap.set(c, { clearProps: "opacity" });
          });
        });
      // Reset every nav indicator.
      document
        .querySelectorAll<HTMLElement>("[data-nav-indicator]")
        .forEach((ind) => {
          gsap.set(ind, { clearProps: "all" });
        });
      // Reset nav.
      const nav = document.querySelector<HTMLElement>("[data-project-nav]");
      if (nav) {
        gsap.set(nav, {
          clearProps: "all",
          opacity: 0,
          pointerEvents: "none",
        });
      }
    };

    const setup = () => {
      cleanup();
      if (window.innerWidth < 800) return;

      setupTimeoutId = window.setTimeout(() => {
        const grid = document.querySelector<HTMLElement>("#work-grid");
        const allTiles = Array.from(
          document.querySelectorAll<HTMLElement>("[data-tile-grid]"),
        );
        const allIndicators = Array.from(
          document.querySelectorAll<HTMLElement>("[data-nav-indicator]"),
        );
        const nav = document.querySelector<HTMLElement>("[data-project-nav]");

        if (!grid || allTiles.length === 0 || !nav) return;

        // Order tiles + indicators by canonical id (01 → 09).  Tile 01
        // becomes the filled "active" indicator; rest stay outlines.
        const tilesByCanonical: HTMLElement[] = [];
        const indicatorsByCanonical: HTMLElement[] = [];
        for (const id of CANONICAL_IDS) {
          const tile = allTiles.find((t) => t.dataset.tileId === id);
          const ind = allIndicators.find(
            (i) => i.dataset.navIndicator === id,
          );
          if (tile) tilesByCanonical.push(tile);
          if (ind) indicatorsByCanonical.push(ind);
        }
        if (
          tilesByCanonical.length === 0 ||
          indicatorsByCanonical.length === 0
        )
          return;

        // Pre-compute flight deltas (tile center → indicator center).
        const moves = tilesByCanonical
          .map((tile, i) => {
            const indicator = indicatorsByCanonical[i];
            if (!indicator) return null;
            const tr = tile.getBoundingClientRect();
            const ir = indicator.getBoundingClientRect();
            return {
              tile,
              indicator,
              dx: ir.left + ir.width / 2 - (tr.left + tr.width / 2),
              dy: ir.top + ir.height / 2 - (tr.top + tr.height / 2),
              scale: ir.width / tr.width,
            };
          })
          .filter(<T,>(m: T | null): m is T => !!m);

        // Collect tile children (for the content-fade morph).
        const tileChildren: HTMLElement[] = [];
        tilesByCanonical.forEach((tile) => {
          Array.from(tile.children).forEach((c) => {
            if (c instanceof HTMLElement) tileChildren.push(c);
          });
        });

        // Initial state.
        gsap.set(tilesByCanonical, { transformOrigin: "center center" });
        // Tile 01 starts with transparent bg so the bg-color tween has a
        // numeric starting value to interpolate from.
        gsap.set(tilesByCanonical[0], {
          backgroundColor: "rgba(31, 31, 31, 0)",
        });
        // Indicators independently start invisible + slightly small so
        // they pop in instead of fading flat.
        gsap.set(indicatorsByCanonical, { opacity: 0, scale: 0.6 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: grid,
            start: "bottom bottom",
            end: "+=600",
            pin: true,
            pinSpacing: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        // ---- Phase A: morph (0 → 0.1) ----------------------------------
        tl.to(
          tileChildren,
          { opacity: 0, duration: PHASE_A_DUR, ease: "power2.out" },
          0,
        );
        tl.to(
          tilesByCanonical[0],
          {
            backgroundColor: "rgba(31, 31, 31, 1)",
            duration: PHASE_A_DUR,
          },
          0,
        );

        // ---- Phase B: staggered flight ---------------------------------
        moves.forEach((move, i) => {
          tl.to(
            move.tile,
            {
              x: move.dx,
              y: move.dy,
              scale: move.scale,
              duration: FLIGHT_DUR,
              ease: "power2.in",
            },
            FLIGHT_START + i * STAGGER,
          );
        });

        // ---- Phase C: indicators tada-da-da pop in ---------------------
        indicatorsByCanonical.forEach((ind, i) => {
          tl.to(
            ind,
            {
              opacity: 1,
              scale: 1,
              duration: INDICATOR_DUR,
              ease: "back.out(2.5)",
            },
            INDICATOR_START + i * STAGGER,
          );
        });

        // ---- Tail: tiles fade out as indicators take over --------------
        moves.forEach((move, i) => {
          tl.to(
            move.tile,
            { opacity: 0, duration: TILE_FADE_DUR },
            TILE_FADE_START + i * STAGGER,
          );
        });

        // ---- Nav chrome (Soonk / Work label / Publication / Resume) ----
        // Indicators have their own opacity so they stay hidden during this
        // outer fade — only the labels appear here.
        tl.fromTo(
          nav,
          { opacity: 0, pointerEvents: "none" },
          { opacity: 1, pointerEvents: "auto", duration: 0.3 },
          0.2,
        );

        ScrollTrigger.refresh();
        triggers = ScrollTrigger.getAll();
      }, 250);
    };

    setup();

    const onResize = () => {
      const isWide = window.innerWidth >= 800;
      if (isWide === lastIsWide) return;
      lastIsWide = isWide;
      setup();
    };

    window.addEventListener("resize", onResize);

    return () => {
      cleanup();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return null;
}
