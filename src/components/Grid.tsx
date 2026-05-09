"use client";

import { TileLogo } from "@/components/TileLogo";

// Grid 3×3 — Figma node 55:458 (Desktop-4).
//
// Each tile is its OWN component with bespoke layout.  Trying to unify them
// behind one generic GridTile was hiding intentional per-tile differences:
//   - POMEs : logo+brand inline, tagline, 2-line blurb, callout w/ arrow
//   - Volthop : 2-col split with rotated "Battery-bnb" on the right
//   - GIA : composite logo row (GIA + "+" + Deloitte), then stacked text
//   - Toyota : logo + brand STACKED (not inline), 3 quoted phrases
//   - Word-up : logo + brand stacked, tagline in REGULAR weight (paragraph)
//   - Alnylam : logo + brand stacked, big "Wrong on Purpose" keyword 24px
//   - Teachable : 2-col split — vertical rotated "Teachable" wordmark left,
//                 centered key quote + double description right (most
//                 elaborate of the 9)
//   - NYC parking : wide NYCopendata wordmark + 2-line title + hashtags
//   - GTM : title-only (no logo)
//
// All match Figma weights/sizes exactly — only family is swapped to Archivo.

const SHELL = "relative flex h-[280px] overflow-clip border-2 border-[#1F1F1F]";

// ---- Tile 01 — POMEs ---------------------------------------------------------
function Tile01Pomes() {
  return (
    <article
      data-tile-id="01"
      data-tile-grid
      className={`${SHELL} flex-col gap-[16px] px-[16px] py-[24px]`}
    >
      <div className="flex shrink-0 items-center gap-[12px]">
        <TileLogo tileId="01" />
        <h3 className="text-[30px] leading-[0.92] font-black text-[#1F1F1F]">
          POMEs
        </h3>
      </div>

      <p className="w-full text-[20px] leading-[0.92] font-black text-[#A0A0A0]">
        Small-scale Social Infrastructure
      </p>

      <div className="flex flex-col items-start gap-[8px]">
        <div className="text-[20px] leading-[0.92] font-medium text-[#A0A0A0]">
          <p className="leading-[0.92]">Falsified the first hypothesis</p>
          <p className="leading-[0.92]">Solo founder — field marketing</p>
        </div>
        <div className="flex items-center gap-[11px] text-[15px] leading-[0.92] font-bold">
          <span className="text-[#A0A0A0] line-through">Help me</span>
          <span className="text-[#1F1F1F]">→</span>
          <span className="text-[#1F1F1F]">I can help</span>
        </div>
      </div>
    </article>
  );
}

// ---- Tile 02 — Volthop -------------------------------------------------------
function Tile02Volthop() {
  return (
    <article
      data-tile-id="02"
      data-tile-grid
      className={`${SHELL} items-start gap-[30px] px-[16px] py-[24px]`}
    >
      <div className="flex flex-1 flex-col items-start justify-center gap-[16px] min-w-0">
        <TileLogo tileId="02" />
        <h3 className="text-[30px] leading-[0.95] font-black text-[#1F1F1F]">
          Volthop
        </h3>
        <p className="w-full text-[20px] leading-[0.92] font-black text-[#A0A0A0]">
          Peer-to-peer battery rental
        </p>
        <p className="w-full text-[16px] leading-[0.92] font-normal whitespace-pre-wrap text-[#A0A0A0]">
          {`Reddit Marketing: Problem post (no solution mentioned) → engagement → "now released" announcement. Demand manufactured, then delivered`}
        </p>
      </div>

      {/* Rotated "Battery-bnb" on the right */}
      <div className="flex h-full w-[44px] shrink-0 items-center justify-center overflow-clip">
        <p className="-rotate-90 text-center text-[40px] leading-[0.92] font-medium whitespace-nowrap text-[#A0A0A0]">
          Battery-bnb
        </p>
      </div>
    </article>
  );
}

// ---- Tile 03 — GIA Platform --------------------------------------------------
function Tile03Gia() {
  return (
    <article
      data-tile-id="03"
      data-tile-grid
      className={`${SHELL} flex-col gap-[16px] px-[25px] py-[24px]`}
    >
      {/* Composite logo (TileLogo handles GIA + "+" + Deloitte) */}
      <TileLogo tileId="03" />

      <div className="flex w-full flex-col items-start gap-[10px]">
        <h3 className="w-full text-[30px] leading-[0.95] font-black text-[#1F1F1F]">
          GIA Platform
        </h3>
        <p className="w-full text-[20px] leading-[0.92] font-black text-[#A0A0A0]">
          Global enterprise sales intelligence
        </p>
        <p className="w-full text-[16px] leading-[0.92] font-medium text-[#A0A0A0]">
          Leading UX strategy and design operations for a global enterprise
          sales intelligence platform.
        </p>
      </div>
    </article>
  );
}

// ---- Tile 04 — Toyota Guidehub -----------------------------------------------
function Tile04Toyota() {
  return (
    <article
      data-tile-id="04"
      data-tile-grid
      className={`${SHELL} flex-col gap-[16px] px-[18px] py-[24px]`}
    >
      <TileLogo tileId="04" />
      <h3 className="text-[30px] leading-[0.92] font-black whitespace-nowrap text-black">
        Toyota Guidehub
      </h3>
      <div className="flex w-full flex-col items-start gap-[8px] text-[20px] leading-[0.92] font-black text-[#A0A0A0]">
        <p className="w-full">&ldquo;Trimmed UX bloat&rdquo;</p>
        <p className="w-full">&ldquo;Team velocity&rdquo;</p>
        <p className="w-full">&ldquo;Non-negotiable&rdquo;</p>
      </div>
    </article>
  );
}

// ---- Tile 05 — Word-up -------------------------------------------------------
// Note: tagline here is REGULAR weight (it's descriptive paragraph, not a
// bold subhead like the others).
function Tile05Wordup() {
  return (
    <article
      data-tile-id="05"
      data-tile-grid
      className={`${SHELL} flex-col gap-[16px] px-[18px] py-[24px]`}
    >
      <div className="flex flex-col items-start gap-[16px]">
        <TileLogo tileId="05" />
        <h3 className="text-[30px] leading-[0.92] font-black whitespace-nowrap text-black">
          Word-up
        </h3>
      </div>
      <div className="flex w-full flex-col items-start">
        <p className="w-full text-[20px] leading-[0.92] font-normal text-[#A0A0A0]">
          How Many Words Does a Hip-Hop Song Need?
          <br aria-hidden="true" />
          A Quantitative Analysis of Hip-Hop Lyrics
        </p>
      </div>
    </article>
  );
}

// ---- Tile 06 — Alnylam SSOT --------------------------------------------------
function Tile06Alnylam() {
  return (
    <article
      data-tile-id="06"
      data-tile-grid
      className={`${SHELL} flex-col gap-[16px] px-[16px] py-[24px]`}
    >
      <div className="flex w-full flex-col items-start justify-center gap-[16px]">
        <TileLogo tileId="06" />
        <h3 className="w-full text-[30px] leading-[0.92] font-black text-[#1F1F1F]">
          Alnylam SSOT
        </h3>
      </div>
      <p className="w-full text-[24px] leading-[0.92] font-black text-[#A0A0A0]">
        &ldquo;Wrong on Purpose&rdquo;
      </p>
      <p className="w-full text-[20px] leading-[0.92] font-normal text-[#A0A0A0]">
        Two-month fixed timeline + fixed budget. No room for traditional UX
        process.
      </p>
    </article>
  );
}

// ---- Tile 07 — Teachable -----------------------------------------------------
// Two-column split: vertical rotated "Teachable" wordmark on left,
// centered key quote + paired description on right.
function Tile07Teachable() {
  return (
    <article
      data-tile-id="07"
      data-tile-grid
      className={`${SHELL} items-start gap-[30px] px-[16px] py-[24px]`}
    >
      {/* Left: logo + vertical rotated "Teachable" */}
      <div className="flex h-full shrink-0 flex-col items-center justify-center gap-[8px]">
        <TileLogo tileId="07" />
        <div className="flex h-[160px] w-[29px] items-center justify-center">
          <div className="flex-none -rotate-90">
            <p className="w-[160px] text-center text-[32px] leading-[0.92] font-medium text-[#1F1F1F]">
              Teachable
            </p>
          </div>
        </div>
      </div>

      {/* Right: key quote + description */}
      <div className="flex h-full flex-1 flex-col items-start justify-between min-w-0">
        <div className="flex w-full flex-col items-center justify-center">
          <p className="w-full text-center text-[24px] leading-[0.95] font-black text-[#1F1F1F]">
            &ldquo;LOW USAGE ≠ LOW VALUE&rdquo;
          </p>
        </div>
        <p className="w-full text-[16px] leading-[0.92] font-normal text-[#A0A0A0]">
          Segmented users by data literacy and explicitly cut the power-user
          persona from V1, chose Traffic &amp; Conversion at the school level.
        </p>
        <p className="w-full text-[16px] leading-[0.92] font-normal text-[#A0A0A0]">
          Designed measurable success criteria upfront (engagement score + NPS)
        </p>
      </div>
    </article>
  );
}

// ---- Tile 08 — NYC parking ---------------------------------------------------
function Tile08Nyc() {
  return (
    <article
      data-tile-id="08"
      data-tile-grid
      className={`${SHELL} flex-col gap-[24px] px-[25px] py-[24px]`}
    >
      <TileLogo tileId="08" />
      <div className="w-full text-[30px] leading-[0.95] font-black text-[#1F1F1F]">
        <p className="leading-[0.95]">Is street parking</p>
        <p className="leading-[0.95]">really free?</p>
      </div>
      <div className="flex w-full flex-col items-start gap-[8px] text-[20px] leading-[0.92] font-black text-[#A0A0A0]">
        <p className="w-full">#Daily-life friction</p>
        <p className="w-full">#small civic pain point</p>
      </div>
    </article>
  );
}

// ---- Tile 09 — GTM Marketing -------------------------------------------------
// Title-only (no logo per Figma).
function Tile09Gtm() {
  return (
    <article
      data-tile-id="09"
      data-tile-grid
      className={`${SHELL} flex-col gap-[24px] px-[25px] py-[24px] font-black`}
    >
      <p className="w-full text-[30px] leading-[0.95] text-[#1F1F1F]">
        GTM Marketing discovery
      </p>
      <div className="flex w-full flex-col items-start gap-[8px] text-[20px] leading-[0.92] text-[#A0A0A0]">
        <p className="w-full">#Daily-life friction</p>
        <p className="w-full">#small civic pain point</p>
      </div>
    </article>
  );
}

// ---- Section -----------------------------------------------------------------
// No "WORKS" headline — the flying-squares animation creates the page header
// as the squares fly into the sticky nav indicators.
export default function Grid() {
  return (
    <section
      id="works-grid"
      className="relative z-30 hidden w-full flex-col items-start gap-[64px] bg-[#EEEEEE] px-[32px] pt-[96px] pb-24 tablet:flex"
    >
      <div className="grid w-full grid-cols-3 gap-[16px]">
        {/* row 1 */}
        <Tile01Pomes />
        <Tile02Volthop />
        <Tile03Gia />
        {/* row 2 */}
        <Tile04Toyota />
        <Tile05Wordup />
        <Tile06Alnylam />
        {/* row 3 */}
        <Tile07Teachable />
        <Tile08Nyc />
        <Tile09Gtm />
      </div>
    </section>
  );
}
