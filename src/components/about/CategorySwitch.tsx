"use client";

import { CATEGORIES, CATEGORY_META, type Category } from "@/data/about";
import { HeartIcon, HomeIcon, PlaneIcon, WorkIcon } from "./icons";

// 4-up toggle group sitting to the right of the "I was then…" line.
// Active state inverts (dark fill + light icon) — same emphasis pattern
// as the case-study left-nav active tile and ProjectNav active indicator.
// Hover surfaces the portfolio's green accent (#00FB00) when inactive,
// matching the work-tile-indicator hover treatment in ProjectNav.

const ICONS: Record<Category, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  work: WorkIcon,
  home: HomeIcon,
  travel: PlaneIcon,
  love: HeartIcon,
};

export default function CategorySwitch({
  active,
  onChange,
}: {
  active: Category;
  onChange: (next: Category) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="About-me category"
      className="flex shrink-0 items-center gap-0"
    >
      {CATEGORIES.map((cat, i) => {
        const Icon = ICONS[cat];
        const meta = CATEGORY_META[cat];
        const isActive = cat === active;
        // Buttons share borders — every tile renders its own border-2,
        // and from the second tile we drop the left border via -ml-[2px]
        // so the seam reads as a single 2px line, not 4px.
        return (
          <button
            key={cat}
            role="tab"
            aria-selected={isActive}
            aria-label={meta.ariaLabel}
            title={meta.label}
            onClick={() => onChange(cat)}
            className={`group flex size-[48px] items-center justify-center border-2 border-[#1F1F1F] transition-colors ${
              i > 0 ? "-ml-[2px]" : ""
            } ${
              isActive
                ? "bg-[#1F1F1F] text-[#EEEEEE]"
                : "bg-transparent text-[#1F1F1F] hover:bg-[#00FB00]"
            }`}
          >
            <Icon className="size-[24px]" />
          </button>
        );
      })}
    </div>
  );
}
