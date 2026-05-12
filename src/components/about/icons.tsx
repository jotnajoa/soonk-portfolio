// Inline SVG glyphs for the four category-switch toggles.  Each draws in
// currentColor so the parent button can flip stroke between the inactive
// (#1F1F1F on transparent) and active (#EEEEEE on #1F1F1F) states with a
// simple text-color swap.  Sized via className from the parent so all
// four glyphs align optically at the same baseline.

import type { SVGProps } from "react";

// "Work" — two side-by-side building silhouettes (a small office +
// taller one).  Pulled from the user's sketch where the toggle reads
// as a tiny skyline.
export function WorkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden
      {...props}
    >
      {/* shorter building, left */}
      <rect x="3" y="9" width="7" height="12" />
      <line x1="5" y1="12" x2="5" y2="12.01" />
      <line x1="8" y1="12" x2="8" y2="12.01" />
      <line x1="5" y1="15" x2="5" y2="15.01" />
      <line x1="8" y1="15" x2="8" y2="15.01" />
      <line x1="5" y1="18" x2="5" y2="18.01" />
      <line x1="8" y1="18" x2="8" y2="18.01" />
      {/* taller building, right */}
      <rect x="12" y="4" width="9" height="17" />
      <line x1="15" y1="8" x2="15" y2="8.01" />
      <line x1="18" y1="8" x2="18" y2="8.01" />
      <line x1="15" y1="12" x2="15" y2="12.01" />
      <line x1="18" y1="12" x2="18" y2="12.01" />
      <line x1="15" y1="16" x2="15" y2="16.01" />
      <line x1="18" y1="16" x2="18" y2="16.01" />
    </svg>
  );
}

// "Home" — simple peaked-roof house.
export function HomeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M3 11.5 12 4l9 7.5V21H3z" />
      <path d="M10 21v-6h4v6" />
    </svg>
  );
}

// "Travel" — commercial airplane silhouette (Lucide-style "plane",
// fuselage banked up-right with two wings + tail).  Switched from the
// paper-airplane glyph per Soonk's feedback — a real plane reads more
// clearly as "travel" than the origami one.
export function PlaneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  );
}

// "Loves" — heart.
export function HeartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M12 21s-7-4.5-9.5-9C.7 8.4 3 4 7 4c2 0 3.5 1 5 3 1.5-2 3-3 5-3 4 0 6.3 4.4 4.5 8-2.5 4.5-9.5 9-9.5 9z" />
    </svg>
  );
}
