// Project logos — real assets from /public/works/logos/.
// IDs follow the renumbered Figma grid order:
//   01 POMEs · 02 Volthop · 03 GIA+Deloitte (composite) · 04 Toyota
//   05 Word-up · 06 Alnylam · 07 Teachable · 08 NYC OpenData · 09 GTM (none)
//
// Plain <img> tags (not next/image) keep size/object-fit per-tile simple.

const LOGOS: Record<
  string,
  | { src: string; alt: string; className?: string }
  | { composite: true }
> = {
  "01": { src: "/works/logos/Pomes_logo.svg", alt: "POMEs logo", className: "h-[48px] w-auto" },
  "02": { src: "/works/logos/Volthop_Logo.svg", alt: "Volthop logo", className: "h-[48px] w-auto" },
  "03": { composite: true },
  "04": { src: "/works/logos/toyotalogo.png", alt: "Toyota logo", className: "h-[40px] w-auto object-contain" },
  "05": { src: "/works/logos/genius_logo.png", alt: "Genius (Word-up) logo", className: "h-[40px] w-auto object-contain" },
  "06": { src: "/works/logos/alnylamlogo.png", alt: "Alnylam logo", className: "h-[40px] w-auto object-contain" },
  "07": { src: "/works/logos/teachablelogo.png", alt: "Teachable logo", className: "h-[40px] w-auto object-contain" },
  "08": { src: "/works/logos/nycopendata.png", alt: "NYC OpenData logo", className: "h-[36px] max-w-[260px] w-auto object-contain" },
  // "09" — GTM has no logo per Figma
};

export function TileLogo({ tileId }: { tileId: string }) {
  const entry = LOGOS[tileId];
  if (!entry) return null;

  if ("composite" in entry) {
    return (
      <div className="flex items-center gap-1">
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
    // eslint-disable-next-line @next/next/no-img-element
    <img src={entry.src} alt={entry.alt} className={entry.className} />
  );
}
