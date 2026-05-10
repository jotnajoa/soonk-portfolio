"use client";

import { useEffect, useRef } from "react";

// ViewportSync — preserve "what the user is looking at" across viewport
// resizes that cross the mobile↔tablet (800px) breakpoint.
//
// The problem this solves:
//   - Wide layout has Hero + Grid + FlyingSquares pin spacer + List.
//   - Narrow layout has Hero + sticky bar + List (no Grid, no pin spacer).
//   - Same scrollY means very different things in each layout.  E.g. a user
//     scrolled to "tile 04 of the list" on narrow has scrollY ≈ 1500.
//     Resize to wide and 1500 lands them inside the FlyingSquares pin
//     spacer — empty white nothing.  Conversely, a wide user mid-grid
//     squeezed to narrow lands halfway down the list, far from where they
//     were looking.
//
// Strategy:
//   - On every scroll, remember the LAST list tile whose top has crossed a
//     trigger line ~30% from the top of the viewport.  That's "the tile the
//     user is currently reading."  If the user is past the hero but not yet
//     into the list (i.e. somewhere in the wide-only Grid/pin region), we
//     fall back to tile 01 — the first thing they'd see when the list
//     starts.
//   - On resize that crosses the 800px breakpoint, wait two animation
//     frames for layout to settle, then jump scroll to that tile's new
//     position.  Instant scroll (not smooth) so the user perceives this as
//     "the page snapping to keep my place," not as an animation.

const TRIGGER_FRACTION = 0.3;
const BREAKPOINT = 800;

export default function ViewportSync() {
  const lastTileRef = useRef<string | null>(null);

  useEffect(() => {
    const updateActive = () => {
      const tiles = Array.from(
        document.querySelectorAll<HTMLElement>("[data-tile-list]"),
      );
      if (tiles.length === 0) return;

      const trigger = window.innerHeight * TRIGGER_FRACTION;
      let active: string | null = null;

      for (const tile of tiles) {
        const rect = tile.getBoundingClientRect();
        if (rect.top <= trigger) {
          active = tile.getAttribute("data-tile-id");
        } else {
          break;
        }
      }

      // Past hero but no list tile has crossed the trigger yet — we're in
      // the wide-only Grid/pin region.  Anchor to tile 01 so a resize lands
      // the user at the start of the list rather than in dead space.
      if (!active && window.scrollY > 100) {
        const firstRect = tiles[0].getBoundingClientRect();
        if (firstRect.top > window.innerHeight) {
          active = tiles[0].getAttribute("data-tile-id");
        }
      }

      if (active) {
        lastTileRef.current = active;
      }
    };

    let lastBp = window.innerWidth >= BREAKPOINT;

    const onResize = () => {
      const newBp = window.innerWidth >= BREAKPOINT;
      if (newBp === lastBp) return;
      lastBp = newBp;

      const targetId = lastTileRef.current;
      if (!targetId) return;

      const settle = () => {
        const tile = document.querySelector<HTMLElement>(
          `[data-tile-list][data-tile-id="${targetId}"]`,
        );
        if (!tile) return;
        const y = tile.getBoundingClientRect().top + window.scrollY;
        window.scrollTo(0, y);
      };

      // Multi-settle: layout reflow, ScrollTrigger.refresh() inside
      // FlyingSquares' resize handler, and any GSAP pin-spacer cleanup
      // happen on different frames/ticks.  A single rAF×2 isn't enough —
      // empirically the user lands at ~tile 07 instead of tile 02 on
      // wide→narrow because the pin spacer's height takes a beat to
      // collapse.  Re-scrolling at 0 / 100 / 400ms catches every settle
      // point, with the final one being the source of truth.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          settle();
          window.setTimeout(settle, 100);
          window.setTimeout(settle, 400);
        });
      });
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return null;
}
