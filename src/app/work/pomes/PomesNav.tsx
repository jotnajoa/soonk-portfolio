"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// Sticky left nav for the POMEs case study (≥960px).  Mirrors the HTML
// preview's left rail: read-time eyebrow, ordered list of section labels,
// active section tracked by scroll.
//
// Active-section logic mirrors ProjectNav.tsx (scroll-position based, not
// IntersectionObserver — observers fire ratio-only callbacks that can
// flip-flop between adjacent sections at the boundary).  Active = the
// LAST <section data-pomes-section> whose top has crossed a fixed trigger
// line at 30% of the viewport height.

const SECTIONS: Array<{ id: string; n: string; label: string }> = [
  { id: "intro", n: "01", label: "Intro" },
  { id: "hunch", n: "02", label: "The hunch" },
  { id: "scan", n: "03", label: "Market scan" },
  { id: "research", n: "04", label: "Research → inversion" },
  { id: "design", n: "05", label: "Design v1" },
  { id: "build", n: "06", label: "Built & shipped" },
  { id: "engage", n: "07", label: "Engaging" },
  { id: "pivot", n: "08", label: "The pivot" },
  { id: "reflection", n: "09", label: "Reflection" },
];

export default function PomesNav() {
  const [activeId, setActiveId] = useState<string>("intro");

  useEffect(() => {
    const compute = () => {
      const trigger = window.innerHeight * 0.3;
      let next = "intro";
      for (const s of SECTIONS) {
        const el = document.getElementById(`pomes-${s.id}`);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= trigger) {
          next = s.id;
        } else {
          break;
        }
      }
      setActiveId(next);
    };
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, []);

  return (
    <aside className="sticky top-8 hidden self-start pt-1 text-[12px] min-[960px]:block">
      <div className="mb-[22px] tracking-[0.06em] text-[#A0A0A0]">
        ~10 MIN READ
      </div>
      <ol className="border-l border-[#A0A0A0]">
        {SECTIONS.map((s) => {
          const active = s.id === activeId;
          return (
            <li
              key={s.id}
              className={
                active
                  ? "-ml-px border-l-[1.5px] border-[#1F1F1F] py-2 pl-[12.5px] font-medium text-[#1F1F1F]"
                  : "py-2 pl-[14px] text-[#5D5D5D]"
              }
            >
              <a
                href={`#pomes-${s.id}`}
                className="block tabular-nums"
              >
                <span className="mr-2">{s.n}</span>
                {s.label}
              </a>
            </li>
          );
        })}
      </ol>
      <Link
        href="/"
        className="mt-8 block text-[#A0A0A0] hover:text-[#1F1F1F]"
      >
        ← Back
      </Link>
    </aside>
  );
}
