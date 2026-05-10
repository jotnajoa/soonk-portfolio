"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { tiles } from "@/data/tiles";

// Reusable sticky left-side nav for any /work/{slug} case study.  Sits
// alongside the section content on tablet+ (hidden on mobile so the read
// stays linear).
//
// Layout, top → bottom:
//   1. Project name + read-time           (anchor — "what am I reading")
//   2. Section list w/ scroll-position    (mid-page navigation)
//      active highlight
//   3. ← Previous · Next →                (sibling-project nav, derived
//      project links                       from tiles.ts using currentSlug)
//
// The "Back to portfolio" affordance lives in the top <CaseStudyNav/> bar
// (Soonk + Work links), so this rail focuses entirely on intra-case
// navigation + cross-case continuation.

const MONO_STYLE: React.CSSProperties = {
  fontFamily:
    "var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
};

/**
 * One nav entry. `id` must match the corresponding `<section id={...}>`
 * in the page so anchor jumps + active tracking work.
 */
export type CaseStudySection = {
  id: string;
  /** Section number, e.g. "02".  Always rendered in JBM Mono. */
  num: string;
  /** Short label, e.g. "Insight". */
  label: string;
  /** Optional "★" star marker for signature sections (per the brief). */
  star?: boolean;
};

export default function CaseStudyLeftNav({
  currentSlug,
  readTime,
  sections,
  /** Pixel offset to apply when smooth-scrolling to a section.  Defaults
   *  to 80 — enough to clear the sticky <CaseStudyNav/> top bar. */
  scrollOffset = 80,
}: {
  currentSlug: string;
  readTime?: string;
  sections: CaseStudySection[];
  scrollOffset?: number;
}) {
  // Derive the current tile + its neighbors from the canonical project
  // list.  Self-contained so callers only need to pass `currentSlug`;
  // we look up the brand string and prev/next here.
  const currentIdx = tiles.findIndex((t) => t.slug === currentSlug);
  const current = currentIdx >= 0 ? tiles[currentIdx] : null;
  const prev = currentIdx > 0 ? tiles[currentIdx - 1] : null;
  const next =
    currentIdx >= 0 && currentIdx < tiles.length - 1
      ? tiles[currentIdx + 1]
      : null;

  const [activeId, setActiveId] = useState<string | null>(
    sections[0]?.id ?? null,
  );

  useEffect(() => {
    const compute = () => {
      const trigger = window.innerHeight * 0.3;
      let currentId: string | null = sections[0]?.id ?? null;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= trigger) {
          currentId = s.id;
        } else {
          break;
        }
      }
      setActiveId(currentId);
    };

    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [sections]);

  const handleJump = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - scrollOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <aside className="hidden w-[140px] shrink-0 tablet:block">
      <div className="sticky top-[80px] flex flex-col gap-[18px] border-r border-[#1F1F1F]/30 pr-[18px]">
        {/* ---- Project anchor (name + read time) ----------------------- */}
        {current && (
          <div className="flex flex-col gap-[6px]">
            <p className="line-clamp-2 text-[13px] leading-[1.25] font-medium text-[#1F1F1F]">
              {current.brand}
            </p>
            {readTime && (
              <p
                className="text-[10px] tracking-[0.05em] text-[#A0A0A0]"
                style={MONO_STYLE}
              >
                {readTime}
              </p>
            )}
          </div>
        )}

        {/* ---- Section list -------------------------------------------- */}
        <ul className="flex flex-col">
          {sections.map((s) => {
            const active = s.id === activeId;
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={(e) => handleJump(e, s.id)}
                  aria-current={active ? "true" : undefined}
                  className={`relative flex items-baseline gap-[6px] py-[4px] pl-[10px] text-[12px] leading-[1.9] no-underline transition-colors ${
                    active
                      ? "font-bold text-[#1F1F1F]"
                      : "font-normal text-[#5D5D5D] hover:text-[#1F1F1F]"
                  }`}
                >
                  {active && (
                    <span
                      aria-hidden
                      className="absolute top-[8px] bottom-[8px] left-0 w-[3px] bg-[#1F1F1F]"
                    />
                  )}
                  <span
                    className="w-[22px] shrink-0"
                    style={MONO_STYLE}
                  >
                    {s.num}
                  </span>
                  <span>
                    {s.label}
                    {s.star && " ★"}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* ---- Prev / Next sibling-project navigation ------------------ */}
        {(prev || next) && (
          <div className="flex flex-col gap-[16px] border-t border-[#1F1F1F]/30 pt-[16px]">
            {prev && (
              <Link
                href={`/work/${prev.slug}`}
                className="group flex flex-col gap-[3px] no-underline"
              >
                <span
                  className="text-[10px] tracking-[0.08em] text-[#A0A0A0] group-hover:text-[#5D5D5D]"
                  style={MONO_STYLE}
                >
                  ← PREVIOUS
                </span>
                <span className="line-clamp-2 text-[12px] leading-[1.3] font-medium text-[#1F1F1F] group-hover:underline">
                  {prev.brand}
                </span>
              </Link>
            )}
            {next && (
              <Link
                href={`/work/${next.slug}`}
                className="group flex flex-col gap-[3px] no-underline"
              >
                <span
                  className="text-[10px] tracking-[0.08em] text-[#A0A0A0] group-hover:text-[#5D5D5D]"
                  style={MONO_STYLE}
                >
                  NEXT →
                </span>
                <span className="line-clamp-2 text-[12px] leading-[1.3] font-medium text-[#1F1F1F] group-hover:underline">
                  {next.brand}
                </span>
              </Link>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
