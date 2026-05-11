"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
// Why useGSAP (and not a plain useEffect): ScrollTrigger with `pin: true`
// inserts a pin-spacer wrapper around the trigger element to reserve scroll
// space.  React doesn't know about that wrapper, so when a Next-router
// navigation tears the page down (e.g. user clicks a list tile and routes
// to /work/{slug}), React's reconciler tries to remove `#work-grid` from
// what it thinks is the parent — but the parent now contains a pin-spacer,
// not the grid directly.  Result:
//   "Failed to execute 'removeChild' on 'Node': The node to be removed is
//    not a child of this node"
//
// `useGSAP` from `@gsap/react` runs in a useLayoutEffect-style hook and
// uses `gsap.context()` under the hood, so its cleanup synchronously
// reverts every animation + ScrollTrigger BEFORE React tears the DOM down.
// `revert: true` (the default) unwraps the pin-spacer cleanly so the
// reconciler sees the structure it expects.
//
// Resize handling: we lift the wide/narrow check into a `useState` so
// `useGSAP`'s deps array can re-run the effect on breakpoint cross — the
// previous context fully reverts (kills triggers, removes pin-spacer) and
// the new run rebuilds.  This also fixes the old "phantom 600px pin spacer
// persists after wide → narrow" bug.

const CANONICAL_IDS = ["01", "02", "03", "04", "05", "06", "07", "08", "09"];

const STAGGER = 0.04;
const PHASE_A_DUR = 0.1;
const FLIGHT_DUR = 0.35;
const FLIGHT_START = PHASE_A_DUR;
const INDICATOR_DUR = 0.18;
const INDICATOR_START = FLIGHT_START + FLIGHT_DUR / 2;
const TILE_FADE_DUR = 0.1;
const TILE_FADE_START = FLIGHT_START + FLIGHT_DUR;

export default function FlyingSquares() {
  // Track wide/narrow as state so useGSAP can revert + rebuild on
  // breakpoint cross.  Lazy init returns the actual viewport width on the
  // client at mount; on the server it's `false` (FlyingSquares renders
  // null anyway, so no hydration mismatch).
  const [isWide, setIsWide] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 800 : false,
  );

  useEffect(() => {
    const update = () => setIsWide(window.innerWidth >= 800);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useGSAP(
    (_ctx, contextSafe) => {
      if (!isWide) return;

      // The 250ms wait is for sibling components (Grid, ProjectNav) to
      // finish their first paint so getBoundingClientRect() returns
      // settled positions.  contextSafe ensures GSAP calls made inside
      // the timeout are still tracked by this useGSAP context — so when
      // the context reverts (route change, breakpoint cross), the
      // timeline + trigger created here are torn down cleanly.
      const buildAnimation = contextSafe!(() => {
        const grid = document.querySelector<HTMLElement>("#work-grid");
        const allTiles = Array.from(
          document.querySelectorAll<HTMLElement>("[data-tile-grid]"),
        );
        const allIndicators = Array.from(
          document.querySelectorAll<HTMLElement>("[data-nav-indicator]"),
        );
        const nav = document.querySelector<HTMLElement>("[data-project-nav]");

        if (!grid || allTiles.length === 0 || !nav) return;

        // Order tiles + indicators by canonical id (01 → 09).
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

        // Tile children for the content fade morph.
        const tileChildren: HTMLElement[] = [];
        tilesByCanonical.forEach((tile) => {
          Array.from(tile.children).forEach((c) => {
            if (c instanceof HTMLElement) tileChildren.push(c);
          });
        });

        // Initial state.
        gsap.set(tilesByCanonical, { transformOrigin: "center center" });
        gsap.set(tilesByCanonical[0], {
          backgroundColor: "rgba(31, 31, 31, 0)",
        });
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

        // Phase A — morph
        tl.to(
          tileChildren,
          { opacity: 0, duration: PHASE_A_DUR, ease: "power2.out" },
          0,
        );
        tl.to(
          tilesByCanonical[0],
          { backgroundColor: "rgba(31, 31, 31, 1)", duration: PHASE_A_DUR },
          0,
        );

        // Phase B — staggered flight
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

        // Phase C — indicators tada-da-da pop in
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

        // Tail — tiles fade out as indicators take over
        moves.forEach((move, i) => {
          tl.to(
            move.tile,
            { opacity: 0, duration: TILE_FADE_DUR },
            TILE_FADE_START + i * STAGGER,
          );
        });

        // Nav chrome (Soonk / Work label / Publication / Resume)
        tl.fromTo(
          nav,
          { opacity: 0, pointerEvents: "none" },
          { opacity: 1, pointerEvents: "auto", duration: 0.3 },
          0.2,
        );

        ScrollTrigger.refresh();
      });

      const setupId = window.setTimeout(buildAnimation, 250);
      return () => {
        window.clearTimeout(setupId);
        // Animation/trigger cleanup is handled by useGSAP's context revert.
      };
    },
    { dependencies: [isWide] },
  );

  return null;
}
