"use client";

import Link from "next/link";
import { TileLogo } from "@/components/TileLogo";
import { killGridScrollTriggers } from "@/components/FlyingSquares";

// Each list tile is a clickable card linking to /work/{slug}.  We wrap
// each <article> in a TileLink (a Next.js <Link>) so the whole tile is a
// single tap target — that keeps the existing data-tile-* attrs on the
// article intact (ProjectNav / MobileNav / ViewportSync still query them).
//
// onClick fires killGridScrollTriggers BEFORE Next.js navigation so the
// GSAP pin-spacer on the desktop grid unwinds cleanly — without this,
// React's reconciler hits "Failed to execute 'removeChild'" on tear-down
// (the spacer wraps the grid outside React's tree).
function TileLink({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={`/work/${slug}`}
      onClick={killGridScrollTriggers}
      className="block w-full text-inherit no-underline outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F1F1F]"
      aria-label={`Open ${slug} case study`}
    >
      {children}
    </Link>
  );
}

// ----- List view (Figma 101:2160 mobile · 101:1655 desktop) ------------------
//
// Layout structure follows Figma 101:2160 EXACTLY:
//   border-2 flex flex-wrap gap-4 items-center p-4
//     - Content col (flex-1, min-w-[240px], flex-col gap-4)
//         - "01" 64px JBM ExtraBold (mobile size; 120px on desktop)
//         - Sub-block (max-w-[480px], gap-2)
//             - Brand row (logo + title INLINE)
//             - Subtitle
//             - Description
//     - Thumbs (shrink-0, flex gap-2 items-center)
//
// IMPORTANT: number lives INSIDE the content column on mobile (Figma 101:2160),
// NOT as a separate flex item.  On desktop (≥800), we render a SECOND number
// as a separate left column at 120px so the wide layout still has the giant
// JBM number on its own column per the user's earlier spec.  The mobile copy
// is hidden via `tablet:hidden`; the desktop copy via `hidden tablet:block`.
//
// Brand row is INLINE on every tile in the list view (per Figma 101:2160).
// The grid view (Grid.tsx) is what has stacked-vs-inline variations.

const ROW =
  "relative flex w-full flex-wrap items-center gap-4 overflow-clip border-2 border-[#1F1F1F] bg-[#EEEEEE] p-4 transition-[transform,box-shadow] duration-200 ease-out hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[4px_4px_0_0_#1F1F1F] tablet:items-start tablet:px-[32px] tablet:py-[24px]";

const MONO_STYLE: React.CSSProperties = {
  fontFamily:
    "var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
};

// Mobile NUM — inside content col, 64px.  Hidden at tablet+.
const NUM_MOBILE =
  "text-[64px] leading-[0.92] font-extrabold whitespace-nowrap text-black tablet:hidden";

// Desktop NUM — separate left column (order-1), 120px.  Hidden on mobile.
const NUM_DESKTOP =
  "hidden shrink-0 tablet:order-1 tablet:block tablet:text-[120px] tablet:leading-[0.92] tablet:font-extrabold tablet:whitespace-nowrap tablet:text-black";

// CONTENT_COL absorbs all available row width via flex-1 (no max-w) so the
// thumb sibling naturally settles at the row's right edge when both fit on
// one line — replacing the old `ml-auto` push that broke on wrap.  The
// readable-width cap moves down to SUB_BLOCK so the text inside still
// stops at ~480 px.
const CONTENT_COL =
  "flex flex-1 flex-col items-start gap-4 min-w-[240px] tablet:order-2";

const SUB_BLOCK =
  "flex w-full flex-col items-start gap-2 tablet:max-w-[480px]";

const BRAND_ROW = "flex flex-wrap items-center gap-3";

const TITLE =
  "text-[32px] leading-[0.92] font-black text-[#1F1F1F] tablet:text-[30px]";

const SUBTITLE =
  "w-full text-[20px] leading-[0.92] font-semibold text-[#5D5D5D] tablet:font-black";

const KEYWORD =
  "w-full text-[20px] leading-[0.95] font-black text-[#1F1F1F] tablet:text-[24px]";

const DESC =
  "w-full text-[12px] leading-[1.1] font-normal text-[#5D5D5D] tablet:text-[16px] tablet:leading-[1.15]";

const HASHTAG =
  "text-[20px] leading-[0.92] font-semibold text-[#5D5D5D] tablet:font-black";

const QUOTE =
  "text-[20px] leading-[0.92] font-semibold whitespace-nowrap text-[#5D5D5D] tablet:font-black";

// Thumbs sit beside content when row has space, wrap below when narrow.
// shrink-0 so they take their natural width (set per-thumb-component).
// No ml-auto: CONTENT_COL's flex-1 already pushes thumbs to the right edge
// on same-line layouts, AND when the thumb wraps to its own row, the
// absence of ml-auto lets it left-align naturally.
const THUMBS_WRAP =
  "flex shrink-0 items-center gap-2 tablet:order-3 tablet:items-stretch tablet:self-stretch tablet:gap-3";

// ----- Thumb primitives ------------------------------------------------------

type Thumb = { src: string; alt: string };

// Two phones side-by-side (POMEs, Volthop).  Per Figma 101:2160, each phone
// is ~99.6 × 215.97 (aspect 1179/2556).  Tablet bumps to taller ~232 height.
function PhonesPair({ a, b }: { a: Thumb; b: Thumb }) {
  return (
    <div className={THUMBS_WRAP}>
      {[a, b].map((t, i) => (
        <div
          key={i}
          className="relative aspect-[1179/2556] w-[99px] shrink-0 overflow-clip border-2 border-[#030303] bg-[#D9D9D9] shadow-[2px_2px_0_0_#1A1A1A] tablet:w-[107px]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={t.src}
            alt={t.alt}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}

// Two desktops overlapped (GIA, Toyota).  Container ~207 × 188 mobile per
// Figma 101:2160 (back at top-left mt-42, front at bottom-right ml-31%).
function DesktopsOverlap({ a, b }: { a: Thumb; b: Thumb }) {
  return (
    <div className={THUMBS_WRAP}>
      <div className="relative h-[188px] w-[208px] tablet:h-[232px] tablet:w-[260px]">
        {/* Back: top-left, smaller */}
        <div className="absolute top-0 left-0 aspect-[1440/1024] h-[100px] overflow-clip border-2 border-[#030303] bg-[#D9D9D9] shadow-[2px_2px_0_0_#1A1A1A] tablet:h-[124px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={a.src}
            alt={a.alt}
            className="h-full w-full object-cover"
          />
        </div>
        {/* Front: bottom-right, offset down-and-right */}
        <div className="absolute right-0 bottom-0 aspect-[1440/1024] h-[100px] overflow-clip border-2 border-[#030303] bg-[#D9D9D9] shadow-[2px_2px_0_0_#1A1A1A] tablet:h-[124px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={b.src}
            alt={b.alt}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

// One screenshot, height-fixed, width auto via aspect.
function SingleThumb({ thumb }: { thumb: Thumb }) {
  return (
    <div className={THUMBS_WRAP}>
      <div className="relative h-[188px] w-fit overflow-clip border-2 border-[#030303] bg-[#D9D9D9] shadow-[2px_2px_0_0_#1A1A1A] tablet:h-[232px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumb.src}
          alt={thumb.alt}
          className="block h-full w-auto object-cover"
        />
      </div>
    </div>
  );
}

// ----- Per-tile components ---------------------------------------------------
// Brand rows are INLINE on every tile (Figma 101:2160).
// Description copy matches Figma 101:2160 EXACTLY (the user flagged my
// earlier "Falsified the first hypothesis"-style placeholder copy as wrong).

function ListPomes() {
  return (
    <TileLink slug="pomes">
    <article id="work-list-01" data-tile-id="01" data-tile-list className={ROW}>
      <p className={NUM_DESKTOP} style={MONO_STYLE}>01</p>
      <div className={CONTENT_COL}>
        <p className={NUM_MOBILE} style={MONO_STYLE}>01</p>
        <div className={SUB_BLOCK}>
          <div className={BRAND_ROW}>
            <TileLogo tileId="01" />
            <h3 className={TITLE}>POMEs</h3>
          </div>
          <p className={SUBTITLE}>Small-scale Social Infrastructure</p>
          <p className={DESC}>
            Trust-based help app for verified small communities, one building
            at a time. Two design inversions from user research: the feed
            defaults to &ldquo;I can help&rdquo; instead of &ldquo;help me&rdquo;
            (Participation Paradox)
          </p>
        </div>
      </div>
      <PhonesPair
        a={{ src: "/work/screenshots/pomes-1.png", alt: "POMEs app screen 1" }}
        b={{ src: "/work/screenshots/pomes-2.png", alt: "POMEs app screen 2" }}
      />
    </article>
    </TileLink>
  );
}

function ListVolthop() {
  return (
    <TileLink slug="volthop">
    <article id="work-list-02" data-tile-id="02" data-tile-list className={ROW}>
      <p className={NUM_DESKTOP} style={MONO_STYLE}>02</p>
      <div className={CONTENT_COL}>
        <p className={NUM_MOBILE} style={MONO_STYLE}>02</p>
        <div className={SUB_BLOCK}>
          <div className={BRAND_ROW}>
            <TileLogo tileId="02" />
            <h3 className={TITLE}>Volthop</h3>
          </div>
          <p className={SUBTITLE}>Peer-to-peer battery rental</p>
          <p className={DESC}>
            Marketplace for folding e-bike travelers. fly with the bike,
            borrow a compatible battery from a local at the destination.
            <br />
            Validated before build
          </p>
        </div>
      </div>
      <PhonesPair
        a={{ src: "/work/screenshots/volthop-1.png", alt: "Volthop app screen 1" }}
        b={{ src: "/work/screenshots/volthop-2.png", alt: "Volthop app screen 2" }}
      />
    </article>
    </TileLink>
  );
}

function ListGia() {
  return (
    <TileLink slug="gia">
    <article id="work-list-03" data-tile-id="03" data-tile-list className={ROW}>
      <p className={NUM_DESKTOP} style={MONO_STYLE}>03</p>
      <div className={CONTENT_COL}>
        <p className={NUM_MOBILE} style={MONO_STYLE}>03</p>
        <div className={SUB_BLOCK}>
          <div className={BRAND_ROW}>
            <TileLogo tileId="03" />
            <h3 className={TITLE}>GIA Platform</h3>
          </div>
          <p className={SUBTITLE}>Global enterprise sales intelligence</p>
          <p className={DESC}>
            When the PM team drowned in scope, I refocused the room on three
            questions and rebuilt the onshore/offshore handoff. 43% design
            cost reduction, 2× product launches, 400+ monthly adopters.
          </p>
        </div>
      </div>
      <DesktopsOverlap
        a={{ src: "/work/screenshots/gia-1.png", alt: "GIA Platform desktop 1" }}
        b={{ src: "/work/screenshots/gia-2.png", alt: "GIA Platform desktop 2" }}
      />
    </article>
    </TileLink>
  );
}

// Toyota: quotes ARE the subtitle in Figma 101:2160 ("UX bloat" / "Velocity"
// / "Negotiable" — short forms, NOT the longer "Trimmed UX bloat" etc that
// I had earlier).  Description follows the quotes.
function ListToyota() {
  return (
    <TileLink slug="toyota">
    <article id="work-list-04" data-tile-id="04" data-tile-list className={ROW}>
      <p className={NUM_DESKTOP} style={MONO_STYLE}>04</p>
      <div className={CONTENT_COL}>
        <p className={NUM_MOBILE} style={MONO_STYLE}>04</p>
        <div className={SUB_BLOCK}>
          <div className={BRAND_ROW}>
            <TileLogo tileId="04" />
            <h3 className={TITLE}>Toyota Guidehub</h3>
          </div>
          <div className="flex w-full flex-wrap items-start gap-2">
            {["“UX bloat”", "“Velocity”", "“Negotiable”"].map((q) => (
              <p key={q} className={QUOTE}>
                {q}
              </p>
            ))}
          </div>
          <p className={DESC}>
            Leadership-shaped engagement, not craft-shaped. A stalled Toyota
            team needed someone to triage, not redesign.
          </p>
        </div>
      </div>
      <DesktopsOverlap
        a={{ src: "/work/screenshots/toyota-1.png", alt: "Toyota Guidehub screen 1" }}
        b={{ src: "/work/screenshots/toyota-2.png", alt: "Toyota Guidehub screen 2" }}
      />
    </article>
    </TileLink>
  );
}

function ListAlnylam() {
  return (
    <TileLink slug="alnylam">
    <article id="work-list-05" data-tile-id="05" data-tile-list className={ROW}>
      <p className={NUM_DESKTOP} style={MONO_STYLE}>05</p>
      <div className={CONTENT_COL}>
        <p className={NUM_MOBILE} style={MONO_STYLE}>05</p>
        <div className={SUB_BLOCK}>
          <div className={BRAND_ROW}>
            <TileLogo tileId="05" />
            <h3 className={TITLE}>Alnylam SSOT</h3>
          </div>
          <p className={KEYWORD}>&ldquo;Wrong on Purpose&rdquo;</p>
          <p className={DESC}>
            Two-month fixed timeline + fixed budget. No room for traditional UX
            process.
          </p>
        </div>
      </div>
      <SingleThumb
        thumb={{ src: "/work/screenshots/alnylam-1.jpeg", alt: "Alnylam SSOT" }}
      />
    </article>
    </TileLink>
  );
}

function ListTeachable() {
  return (
    <TileLink slug="teachable">
    <article id="work-list-06" data-tile-id="06" data-tile-list className={ROW}>
      <p className={NUM_DESKTOP} style={MONO_STYLE}>06</p>
      <div className={CONTENT_COL}>
        <p className={NUM_MOBILE} style={MONO_STYLE}>06</p>
        <div className={SUB_BLOCK}>
          <div className={BRAND_ROW}>
            <TileLogo tileId="06" />
            <h3 className={TITLE}>Teachable</h3>
          </div>
          <p className={KEYWORD}>&ldquo;LOW USAGE ≠ LOW VALUE&rdquo;</p>
          <p className={DESC}>
            Segmented users by data literacy and explicitly cut the power-user
            persona from V1, chose Traffic &amp; Conversion at the school level.
          </p>
          <p className={DESC}>
            Designed measurable success criteria upfront (engagement score + NPS).
          </p>
        </div>
      </div>
      <SingleThumb
        thumb={{ src: "/work/screenshots/teachable-1.jpeg", alt: "Teachable" }}
      />
    </article>
    </TileLink>
  );
}

function ListNyc() {
  return (
    <TileLink slug="parking">
    <article id="work-list-07" data-tile-id="07" data-tile-list className={ROW}>
      <p className={NUM_DESKTOP} style={MONO_STYLE}>07</p>
      <div className={CONTENT_COL}>
        <p className={NUM_MOBILE} style={MONO_STYLE}>07</p>
        <div className={SUB_BLOCK}>
          <div className={BRAND_ROW}>
            <TileLogo tileId="07" />
            <h3 className={TITLE}>Is street parking really free?</h3>
          </div>
          <div className="flex w-full flex-wrap items-start gap-3">
            {["#Daily-life friction", "#small civic pain point"].map((t) => (
              <p key={t} className={HASHTAG}>
                {t}
              </p>
            ))}
          </div>
        </div>
      </div>
      <SingleThumb
        thumb={{ src: "/work/screenshots/parking-1.png", alt: "NYC parking analysis" }}
      />
    </article>
    </TileLink>
  );
}

function ListWordup() {
  return (
    <TileLink slug="wordup">
    <article id="work-list-08" data-tile-id="08" data-tile-list className={ROW}>
      <p className={NUM_DESKTOP} style={MONO_STYLE}>08</p>
      <div className={CONTENT_COL}>
        <p className={NUM_MOBILE} style={MONO_STYLE}>08</p>
        <div className={SUB_BLOCK}>
          <div className={BRAND_ROW}>
            <TileLogo tileId="08" />
            <h3 className={TITLE}>Word-up</h3>
          </div>
          <p className="w-full text-[16px] leading-[1.2] font-normal text-[#5D5D5D] tablet:text-[20px]">
            How Many Words Does a Hip-Hop Song Need?
            <br aria-hidden="true" />A Quantitative Analysis of Hip-Hop Lyrics.
          </p>
        </div>
      </div>
      <SingleThumb
        thumb={{ src: "/work/screenshots/wordup-1.png", alt: "Word-up analysis" }}
      />
    </article>
    </TileLink>
  );
}

function ListGtm() {
  return (
    <TileLink slug="gtm">
    <article id="work-list-09" data-tile-id="09" data-tile-list className={ROW}>
      <p className={NUM_DESKTOP} style={MONO_STYLE}>09</p>
      <div className={CONTENT_COL}>
        <p className={NUM_MOBILE} style={MONO_STYLE}>09</p>
        <div className={SUB_BLOCK}>
          <h3 className={TITLE}>GTM Marketing discovery</h3>
          <div className="flex w-full flex-wrap items-start gap-3">
            {["#Daily-life friction", "#small civic pain point"].map((t) => (
              <p key={t} className={HASHTAG}>
                {t}
              </p>
            ))}
          </div>
        </div>
      </div>
    </article>
    </TileLink>
  );
}

// ----- Section ---------------------------------------------------------------
//
// Render order is the canonical list order (01 → 09).  The mobile sticky
// <MobileNav/> bar (rendered just before this section in page.tsx) carries
// the WORK heading on mobile.  Desktop renders an inline WORK heading at
// the top of this section (per Figma 101:1486).
export default function ProjectList() {
  return (
    <section
      id="work-list"
      // Section bg stretches full viewport; inner column caps at 1200px
      // and centers (matches Hero / Grid / ProjectNav cap).  Bg stays
      // full-bleed; horizontal padding moves to the inner 1200px container
      // so the list's left edge lines up with the nav's "Soonk" text.
      className="flex w-full flex-col items-stretch bg-[#EEEEEE] pt-4 pb-24 tablet:pt-2"
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-4 px-[32px]">
        {/* Section heading — desktop (≥800px) only.  Per Figma 101:1486
            the desktop list view opens with a big WORK title above the 9
            tiles.  On mobile the sticky <MobileNav/> bar carries the WORK
            label, so we hide this inline copy there to avoid duplication. */}
        <h2 className="mb-2 hidden text-[48px] leading-[0.92] font-black text-[#1F1F1F] tablet:block">
          WORK
        </h2>

        <ListPomes />
        <ListVolthop />
        <ListGia />
        <ListToyota />
        <ListAlnylam />
        <ListTeachable />
        <ListNyc />
        <ListWordup />
        <ListGtm />
      </div>
    </section>
  );
}
