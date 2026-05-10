"use client";

import { useEffect, useState } from "react";

// Figma node 123:3600 — fixed bottom-center "Scroll for more" + down arrow.
//
// Visibility lifecycle:
//   1. Hidden at the very top of the page (scrollY < ~80) — Hero owns its
//      own "Scroll for more" cue at the bottom of the viewport during the
//      initial hero animation.
//   2. Visible from when the user has scrolled into the grid all the way
//      THROUGH the FlyingSquares animation.  We intentionally keep the cue
//      on screen for the ENTIRE flight so the user knows there's more to
//      see while the tiles are still mid-animation.
//   3. Hidden once the sticky ProjectNav has fully faded in (opacity ≥ 0.95)
//      — the nav indicators ARE the "more" the cue was pointing at, so the
//      cue's job is done the moment they're on screen.
//
// We tie visibility to ProjectNav's live opacity (which FlyingSquares scrubs
// from 0 → 1 as the timeline progresses) rather than a hard scroll-position
// threshold, so the cue tracks the actual animation state.

export default function ScrollHint() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const past = window.scrollY > 80;
      const nav = document.querySelector<HTMLElement>("[data-project-nav]");
      const navOpacity = nav
        ? parseFloat(getComputedStyle(nav).opacity || "0")
        : 0;
      // Visible while we're past the initial hero AND the nav header isn't
      // yet fully revealed.  Threshold 0.95 (not 1.0) so the cue fades out
      // a beat BEFORE the nav reaches full opacity — feels less abrupt.
      setVisible(past && navOpacity < 0.95);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`pointer-events-none fixed bottom-8 left-1/2 z-30 hidden -translate-x-1/2 transition-opacity duration-500 tablet:block ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex flex-col items-center gap-2 text-[#1F1F1F]">
        <p className="text-[20px] leading-[0.92] font-bold whitespace-nowrap">
          Scroll for more
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/Downarrow.svg"
          alt=""
          aria-hidden
          className="h-[20px] w-auto"
        />
      </div>
    </div>
  );
}
