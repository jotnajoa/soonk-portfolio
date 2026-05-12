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
//   1. Hidden for the first 3.5s after mount — covers the hero's
//      scroll-lock (1.5s) plus the dark→light bg flip (~t=3.1) plus a
//      beat of buffer, so the cue doesn't pop in DURING the
//      cross-fade.  Earlier 1.6s gate fired the cue mid-fade because
//      it only waited out the scroll-lock, not the visual transition.
//   2. Visible from then until the user has scrolled past the hero
//      (its bottom edge below 70% of viewport).  Earlier version
//      tied visibility to ProjectNav opacity, which only animates on
//      desktop via FlyingSquares — on mobile, where the nav is
//      `tablet:block` (display:none) and FlyingSquares early-returns,
//      the cue never disappeared.  Hero-scroll check works on both
//      platforms with one rule.
//
// Visual treatment: the cue floats on top of arbitrary page content
// (hero text, work tiles, list rows), so a transparent block of the
// page bg (#EEEEEE) at 60% + a small backdrop-blur sits behind the
// text — readers see SOMETHING is back there, but the cue's letters
// don't fight the body type for legibility.

export default function ScrollHint() {
  const [heroReady, setHeroReady] = useState(false);
  const [visible, setVisible] = useState(false);

  // First gate: wait out the hero's scroll-lock (1.5s) + the dark-phase
  // cross-fade (bg flip lands at t=3.1) before the cue is allowed to
  // show.  Independent of scroll position — don't pop the cue mid-
  // animation just because the user happened to scroll early.
  useEffect(() => {
    const t = window.setTimeout(() => setHeroReady(true), 3500);
    return () => window.clearTimeout(t);
  }, []);

  // Second gate: hide once the user has scrolled meaningfully past
  // the hero.  Single rule that works on mobile and desktop — the
  // old nav-opacity check only fired on desktop (FlyingSquares is
  // wide-only), leaving the cue stuck on screen forever on phones.
  useEffect(() => {
    if (!heroReady) return;
    const update = () => {
      const hero = document.querySelector<HTMLElement>(".hero");
      if (!hero) {
        setVisible(false);
        return;
      }
      const rect = hero.getBoundingClientRect();
      // Visible while hero's bottom edge is still in the lower 30%
      // of the viewport (i.e., user hasn't scrolled past it yet).
      setVisible(rect.bottom > window.innerHeight * 0.7);
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
