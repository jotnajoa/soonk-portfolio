"use client";

import { useEffect, useState } from "react";

// Figma node 123:3600 — fixed bottom-center "Scroll for more" + down arrow.
//
// This is the SINGLE "scroll for more" cue on the landing.  An earlier
// version of Hero.tsx also rendered an inline cue at the bottom of the
// hero section, which meant two of them appeared at once once the hint
// kicked in.  The inline one is gone; this floater owns the role.
//
// Visibility lifecycle:
//   1. Hidden for the first 1.6s after mount — covers the hero's 1.5s
//      scroll-lock + a beat of buffer so the cue doesn't pop in DURING
//      the dark-to-light cross-fade.
//   2. Visible from then until the sticky ProjectNav has fully faded in
//      (opacity ≥ 0.95).  We tie visibility to nav opacity (which
//      FlyingSquares scrubs from 0 → 1) so the cue tracks the actual
//      animation state, not a raw scroll threshold.
//
// Visual treatment: the cue floats on top of arbitrary page content
// (hero text, work tiles, list rows), so a transparent block of the
// page bg (#EEEEEE) at 60% + a small backdrop-blur sits behind the
// text — readers see SOMETHING is back there, but the cue's letters
// don't fight the body type for legibility.

export default function ScrollHint() {
  const [heroReady, setHeroReady] = useState(false);
  const [visible, setVisible] = useState(false);

  // First gate: wait out the hero's scroll-lock + the dark-phase
  // cross-fade before the cue is allowed to show.  Independent of
  // scroll position so we don't pop the cue in the middle of an
  // animation just because the user happened to scroll early.
  useEffect(() => {
    const t = window.setTimeout(() => setHeroReady(true), 1600);
    return () => window.clearTimeout(t);
  }, []);

  // Second gate: hide once the ProjectNav has come into view.  The
  // nav indicators are the "more" the cue was pointing at, so the
  // cue's job is done the moment they're on screen.
  useEffect(() => {
    if (!heroReady) return;
    const update = () => {
      const nav = document.querySelector<HTMLElement>("[data-project-nav]");
      const navOpacity = nav
        ? parseFloat(getComputedStyle(nav).opacity || "0")
        : 0;
      // Threshold 0.95 (not 1.0) so the cue starts fading out a beat
      // BEFORE the nav reaches full opacity — feels less abrupt.
      setVisible(navOpacity < 0.95);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [heroReady]);

  return (
    <div
      aria-hidden={!visible}
      className={`pointer-events-none fixed bottom-8 left-1/2 z-30 -translate-x-1/2 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex flex-col items-center gap-2 rounded-full bg-[#EEEEEE]/60 px-[18px] py-[10px] text-[#1F1F1F] backdrop-blur-sm">
        <p className="text-[16px] leading-[0.92] font-bold whitespace-nowrap tablet:text-[20px]">
          Scroll for more
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/Downarrow.svg"
          alt=""
          aria-hidden
          className="h-[16px] w-auto tablet:h-[20px]"
        />
      </div>
    </div>
  );
}
