"use client";

import { useEffect, useState } from "react";

// Figma node 123:3600 — fixed bottom-center "Scroll for more" + down arrow.
// Visible during Hero + Grid; fades out once the user scrolls into the List
// view (same trigger as ProjectNav appearing — the two are symmetrical).

function DownArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="30"
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M7.99936 19.312L0.878359 12.191C0.315946 11.6284 0 10.8655 0 10.07C0 9.27451 0.315946 8.51158 0.878359 7.949C1.97236 6.855 3.85636 6.811 4.99936 7.834V3C4.99936 1.346 6.34536 0 7.99936 0C9.65336 0 10.9994 1.346 10.9994 3V7.834C12.1424 6.811 14.0264 6.855 15.1204 7.949C15.6828 8.51158 15.9987 9.27451 15.9987 10.07C15.9987 10.8655 15.6828 11.6284 15.1204 12.191L7.99936 19.312ZM2.99936 9.07C2.80139 9.06956 2.60776 9.12795 2.44304 9.23776C2.27832 9.34756 2.14994 9.50383 2.07418 9.68673C1.99843 9.86962 1.97873 10.0709 2.01757 10.265C2.05642 10.4591 2.15206 10.6373 2.29236 10.777L7.99936 16.484L13.7064 10.777C13.8938 10.5895 13.9991 10.3352 13.9991 10.07C13.9991 9.80484 13.8938 9.55053 13.7064 9.363C13.5163 9.18028 13.263 9.07822 12.9994 9.07822C12.7357 9.07822 12.4824 9.18028 12.2924 9.363L8.99936 12.656V3C8.98784 2.74252 8.87745 2.49941 8.69118 2.32128C8.5049 2.14315 8.2571 2.04373 7.99936 2.04373C7.74162 2.04373 7.49382 2.14315 7.30754 2.32128C7.12127 2.49941 7.01088 2.74252 6.99936 3V12.656L3.70636 9.363C3.51887 9.17545 3.26455 9.07006 2.99936 9.07Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function ScrollHint() {
  const [visible, setVisible] = useState(false);

  // Appear once the hero has been scrolled into; disappear once the user
  // crosses into the list view.
  useEffect(() => {
    const firstList = document.querySelector<HTMLElement>("[data-tile-list]");

    const onScroll = () => {
      // Show only AFTER user starts scrolling past the hero a bit, so the
      // hint doesn't fight with the opening animation in the first second.
      const past = window.scrollY > 80;
      const inList = firstList ? firstList.getBoundingClientRect().top <= window.innerHeight * 0.15 : false;
      setVisible(past && !inList);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`pointer-events-none fixed bottom-8 left-1/2 z-30 -translate-x-1/2 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex flex-col items-center gap-2 text-[#1F1F1F]">
        <p className="text-[20px] leading-[0.92] font-bold whitespace-nowrap">
          Scroll for more
        </p>
        <DownArrowIcon />
      </div>
    </div>
  );
}
