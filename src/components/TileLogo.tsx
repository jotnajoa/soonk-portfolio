// Project logos — real assets from /public/works/logos/.
// IDs match the canonical list order (see tiles.ts):
//   01 POMEs · 02 Volthop · 03 GIA + Deloitte (composite) · 04 Toyota
//   05 Alnylam · 06 Teachable · 07 NYC OpenData · 08 Word-up (Genius) · 09 GTM (none)
//
// IMPORTANT: every returned element gets `self-start` (or carries it via a
// wrapper).  Grid tiles are flex-col containers with the default
// `align-items: stretch`, which would stretch the bare <img> to the tile's
// full inner width.  At that point `object-contain` (which we use to keep
// the image's aspect ratio inside the height-locked box) centers the actual
// image content inside the stretched box — which the user perceives as the
// logo "floating in the middle" of the tile (NYC OpenData, Toyota, etc.).
// `self-start` opts the flex item out of stretch, so the box is sized to
// the image's natural width and the logo sits at the column's left edge.

const LOGOS: Record<
  string,
  | { src: string; alt: string; className?: string }
  | { composite: true }
> = {
  "01": { src: "/works/logos/Pomes_logo.svg", alt: "POMEs logo", className: "h-[48px] w-auto self-start" },
  "02": { src: "/works/logos/Volthop_Logo.svg", alt: "Volthop logo", className: "h-[48px] w-auto self-start" },
  "03": { composite: true },
  "04": { src: "/works/logos/toyotalogo.png", alt: "Toyota logo", className: "h-[40px] w-auto self-start object-contain" },
  "05": { src: "/works/logos/alnylamlogo.png", alt: "Alnylam logo", className: "h-[40px] w-auto self-start object-contain" },
  "06": { src: "/works/logos/teachablelogo.png", alt: "Teachable logo", className: "h-[40px] w-auto self-start object-contain" },
  "07": { src: "/works/logos/nycopendata.png", alt: "NYC OpenData logo", className: "h-[36px] max-w-[260px] w-auto self-start object-contain" },
  "08": { src: "/works/logos/genius_logo.png", alt: "Genius (Word-up) logo", className: "h-[40px] w-auto self-start object-contain" },
  // "09" — GTM has no logo
};

export function TileLogo({ tileId }: { tileId: string }) {
  const entry = LOGOS[tileId];
  if (!entry) return null;

  if ("composite" in entry) {
    return (
      <div className="flex items-center gap-1 self-start">
        {/* eslint-disable @next/next/no-img-element */}
        <img
          src="/works/logos/GIA_Logo.svg"
          alt="GIA logo"
          className="h-[44px] w-auto"
        />
        <span className="px-1 text-[26px] leading-none font-black text-[#1F1F1F]">
          +
        </span>
        <img
          src="/works/logos/Deloittelogo.svg"
          alt="Deloitte logo"
          className="h-[44px] w-auto"
        />
      </div>
    );
  }

  return (
    <img src={entry.src} alt={entry.alt} className={entry.className} />
  );
}
