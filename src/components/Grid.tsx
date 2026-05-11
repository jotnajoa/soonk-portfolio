"use client";

import Link from "next/link";
import { TileLogo } from "@/components/TileLogo";
import { killGridScrollTriggers } from "@/components/FlyingSquares";

// Grid 3×3 — Figma node 55:458 (Desktop-4).
//
// IMPORTANT — IDs vs visual position:
//   data-tile-id always matches the CANONICAL list order (see tiles.ts):
//     01 POMEs · 02 Volthop · 03 GIA · 04 Toyota · 05 Alnylam · 06 Teachable
//     07 NYC parking · 08 Word-up · 09 GTM
//   The grid renders tiles in a DIFFERENT visual order to match Figma's 3×3
//   layout (Word-up at row 2 col 2, Alnylam at row 2 col 3, etc.).  Each tile
//   keeps its data-tile-id matching the list, so flying-squares and nav
//   indicators map by ID — not by render index.
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

// ---- 01 POMEs ---------------------------------------------------------------
// POMEs has a published case study at /work/pomes — the absolute-positioned
// Link covers the whole tile (hover hint via `group-hover` if we want it
// later).  All the layout content stays as-is so flying-squares geometry
// and data-tile-id measurements are unchanged.
function TilePomes() {
  return (
    <article
      data-tile-id="01"
      data-tile-grid
      className={`${SHELL} group flex-col gap-[16px] px-[16px] py-[24px]`}
    >
      <Link
        href="/work/pomes"
        aria-label="POMEs case study"
        className="absolute inset-0 z-10"
        onClick={killGridScrollTriggers}
      />

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

// ---- 02 Volthop -------------------------------------------------------------
function TileVolthop() {
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

// ---- 03 GIA Platform --------------------------------------------------------
function TileGia() {
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

// ---- 04 Toyota Guidehub -----------------------------------------------------
function TileToyota() {
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

// ---- 05 Alnylam SSOT --------------------------------------------------------
function TileAlnylam() {
  return (
    <article
      data-tile-id="05"
      data-tile-grid
      className={`${SHELL} flex-col gap-[16px] px-[16px] py-[24px]`}
    >
      <div className="flex w-full flex-col items-start justify-center gap-[16px]">
        <TileLogo tileId="05" />
        <h3 className="w-full text-[30px] leading-[0.92] font-black text-[#1F1F1F]">
          Alnylam SSOT
        </h3>
      </div>
      <p className="w-full text-[24px] leading-[0.92] font-black text-[#A0A0A0]">
        &ldquo;Wrong on Purpose&rdquo;
      </p>
      <p className="w-full text-[16px] leading-[0.92] font-normal text-[#A0A0A0]">
        Two-month fixed timeline + fixed budget. No room for traditional UX
        process.
      </p>
    </article>
  );
}

// ---- 06 Teachable -----------------------------------------------------------
// Two-column split: vertical rotated "Teachable" wordmark on left,
// centered key quote + paired description on right.
function TileTeachable() {
  return (
    <article
      data-tile-id="06"
      data-tile-grid
      className={`${SHELL} items-start gap-[30px] px-[16px] py-[24px]`}
    >
      {/* Left: logo + vertical rotated "Teachable" */}
      <div className="flex h-full shrink-0 flex-col items-center justify-center gap-[8px]">
        <TileLogo tileId="06" />
        <div className="flex h-[160px] w-[29px] items-center justify-center">
          <div className="flex-none -rotate-90">
            <p className="w-[160px] text-center text-[32px] leading-[0.92] font-medium text-[#1F1F1F]">
              Teachable
            </p>
          </div>
        </div>
      </div>

      {/* Right column: quote at top, descriptions GROUPED at bottom.
          Earlier I had the quote + 2 paragraphs as 3 separate children with
          `justify-between` — that pushed desc1 into the vertical middle of
          the column (between quote and desc2), which doesn't match Figma
          55:458.  Wrapping desc1+desc2 in a single flex-col makes them ONE
          flex item, so justify-between pairs them at the bottom while the
          quote stays at the top. */}
      <div className="flex h-full flex-1 flex-col justify-between gap-2 min-w-0">
        <p
          className="w-full text-[24px] leading-[0.95] font-black text-[#1F1F1F]"
          style={{ textAlign: "center" }}
        >
          &ldquo;LOW USAGE ≠ LOW VALUE&rdquo;
        </p>
        <div className="flex w-full flex-col gap-2 text-[16px] leading-[0.92] font-normal text-[#A0A0A0]">
          <p>
            Segmented users by data literacy and explicitly cut the power-user
            persona from V1, chose Traffic &amp; Conversion at the school level.
          </p>
          <p>
            Designed measurable success criteria upfront (engagement score + NPS)
          </p>
        </div>
      </div>
    </article>
  );
}

// ---- 07 NYC parking ---------------------------------------------------------
function TileNyc() {
  return (
    <article
      data-tile-id="07"
      data-tile-grid
      className={`${SHELL} flex-col gap-[24px] px-[25px] py-[24px]`}
    >
      <TileLogo tileId="07" />
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

// ---- 08 Word-up -------------------------------------------------------------
// Note: tagline here is REGULAR weight (it's descriptive paragraph, not a
// bold subhead like the others).
function TileWordup() {
  return (
    <article
      data-tile-id="08"
      data-tile-grid
      className={`${SHELL} flex-col gap-[16px] px-[18px] py-[24px]`}
    >
      <div className="flex flex-col items-start gap-[16px]">
        <TileLogo tileId="08" />
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

// ---- 09 GTM Marketing -------------------------------------------------------
// Title-only (no logo per Figma).
function TileGtm() {
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

// ---- Section ----------------------------------------------------------------
// No "WORK" headline — the flying-squares animation creates the page header
// as the squares fly into the sticky nav indicators.
//
// Render order matches Figma's 3×3 visual layout (NOT canonical id order):
//   row 1 : POMEs · Volthop · GIA
//   row 2 : Toyota · Word-up · Alnylam
//   row 3 : Teachable · NYC · GTM
export default function Grid() {
  return (
    <section
      id="work-grid"
      // pb is intentionally minimal: the FlyingSquares pin already provides
      // the visual transition into the list, so any extra bottom padding
      // here just reads as dead scroll between the two sections.
      className="relative z-30 hidden w-full flex-col items-start gap-[64px] bg-[#EEEEEE] pt-[96px] pb-4 tablet:flex"
    >
      {/* Bg full-bleed (continuous color band); horizontal padding lives on
          the inner 1200px container so the grid's left edge lines up with
          the nav's "Soonk" text — same alignment rule as Hero / ProjectList. */}
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-3 gap-[16px] px-[32px]">
        {/* row 1 */}
        <TilePomes />
        <TileVolthop />
        <TileGia />
        {/* row 2 */}
        <TileToyota />
        <TileWordup />
        <TileAlnylam />
        {/* row 3 */}
        <TileTeachable />
        <TileNyc />
        <TileGtm />
      </div>
    </section>
  );
}
