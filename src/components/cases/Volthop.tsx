// Volthop case study (project 02 in the canonical list).
//
// Content adapted from `/Volumes/External/Portfolio_Website_26/_brief_volthop_for_figma.md`
// (v3 — 7 sections).  The brief was originally written for a Figma build
// with a cream-monochrome editorial system, but per Soonk the case study
// must read as a continuation of the existing portfolio, so we reuse the
// portfolio's visual language verbatim:
//   - bg #EEEEEE, ink #1F1F1F, secondary #5D5D5D, muted #A0A0A0
//   - Archivo for body / display, JetBrains Mono for accents
//   - chunky 2px borders, sharp corners, no shadow / gradient / glow
//
// Layout (per the brief):
//   §01 Hero        — full-bleed top section, no left nav
//   §02–07          — two-column inside max-w-[1200px]:
//                       [120px sticky left nav] | [content]
//                     The left nav (CaseStudyLeftNav) is reusable across
//                     all case studies — pass it the section list and a
//                     read-time string.

import Link from "next/link";
import UpRightArrowIcon from "@/components/UpRightArrowIcon";
import CaseStudyLeftNav, {
  type CaseStudySection,
} from "@/components/cases/CaseStudyLeftNav";

const MONO: React.CSSProperties = {
  fontFamily:
    "var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
};

// ============================================================================
// Reusable atoms
// ============================================================================

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[12px] tracking-[0.18em] font-medium text-[#5D5D5D]"

    >
      {children}
    </p>
  );
}

function SectionNumber({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[64px] leading-[0.85] font-extrabold tracking-[-0.04em] text-[#1F1F1F] tablet:text-[88px]"

    >
      {children}
    </p>
  );
}

function Headline({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[24px] leading-[1.25] font-black text-[#1F1F1F] tablet:text-[32px]">
      {children}
    </h2>
  );
}

function Lede({ children }: { children: React.ReactNode }) {
  return (
    <p className="max-w-[600px] text-[16px] leading-[1.7] font-normal text-[#1F1F1F] tablet:text-[16px]">
      {children}
    </p>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <p className="max-w-[620px] text-[16px] leading-[1.75] font-normal text-[#5D5D5D]">
      {children}
    </p>
  );
}

// Shared section shell — eyebrow + section-number + headline + lede.
function SectionHeader({
  number,
  eyebrow,
  headline,
  lede,
}: {
  number: string;
  eyebrow: string;
  headline: React.ReactNode;
  lede?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-[18px]">
      <Eyebrow>+ {eyebrow}</Eyebrow>
      <div className="flex flex-col gap-[14px] tablet:flex-row tablet:items-end tablet:gap-[24px]">
        <SectionNumber>{number}</SectionNumber>
        <Headline>{headline}</Headline>
      </div>
      {lede && <Lede>{lede}</Lede>}
    </div>
  );
}

// ============================================================================
// §01 Hero — wordmark + tagline + meta + 5-node ribbon
// ============================================================================

function Hero() {
  return (
    <section className="border-b-2 border-[#1F1F1F] pt-[48px] pb-[64px] tablet:pt-[64px] tablet:pb-[96px]">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-[36px] px-[32px]">
        <Eyebrow>+ Intro</Eyebrow>

        {/* Cinematic letterbox strip — marketing-site hero style.
            The 1280×720 promo is cropped via object-cover into a wider
            aspect (≈21:9), shaving top/bottom while keeping the centre
            composition.  A dark scrim provides legibility for the white
            logo + wordmark + thesis sitting on top.
            All overlay type uses the portfolio fonts: Archivo for display
            (logo + wordmark + thesis), JBM only for the eyebrow / small
            accents kept outside the strip. */}
        <div className="relative aspect-[21/9] w-full overflow-clip border-2 border-[#1F1F1F] bg-[#1F1F1F]">
          {/* Loading spinner sits BEHIND the <video> (earlier in DOM
              order at the same z).  While the video has no first frame
              to paint, its box is transparent and the spinner shows
              through; the instant the video starts rendering frames it
              covers the spinner with object-cover.  No `poster` here
              on purpose — the old NYC-map poster was the "weird map"
              flashing in before the video loaded. */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            aria-hidden
          >
            <div className="h-[40px] w-[40px] animate-spin rounded-full border-[3px] border-[#F4F4F4]/20 border-t-[#F4F4F4]/80" />
          </div>
          <video
            src="/work/volthop/hero.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
            aria-label="Volthop app demo loop"
          />
          {/* Scrim: lighter at top, heavier at bottom where the text sits. */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/75"
            aria-hidden
          />

          {/* Overlay content — bottom-left, the way marketing-site hero
              lays its title + tagline.  `invert` flips the monochrome
              #1F1F1F logo SVG to white without needing a separate asset. */}
          <div className="relative z-10 flex h-full flex-col justify-end gap-[12px] p-[20px] tablet:gap-[20px] tablet:p-[48px]">
            <div className="flex flex-wrap items-end gap-[12px] tablet:gap-[16px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/work/volthop/volthop-logo.svg"
                alt=""
                aria-hidden
                className="h-[36px] w-auto invert tablet:h-[64px]"
              />
              <h1 className="text-[40px] leading-[0.85] font-black tracking-[-0.05em] text-[#F4F4F4] tablet:text-[88px]">
                Volthop
              </h1>
            </div>
            <p className="max-w-[840px] text-[18px] leading-[1.15] font-black tracking-[-0.01em] text-[#F4F4F4] tablet:text-[32px]">
              I posted the problem.
              <br aria-hidden className="tablet:hidden" /> They wrote the
              product.
            </p>
          </div>
        </div>

        {/* Meta row beneath the strip — role · duration · progress on
            the left, live App Store + Play Store links on the right
            (POMEs pattern).  Stacks vertically on mobile: meta on top,
            store links below.  The store icons + "↗" arrow telegraph
            "this is real, here's where to download it" before the
            reader scrolls into the case study. */}
        <div className="grid gap-[24px] tablet:grid-cols-[1fr_auto] tablet:items-end tablet:gap-[32px]">
          <dl className="flex flex-col gap-[14px]">
            {[
              ["Role", "Solo founder · design + build"],
              ["Duration", "Jan – Apr 2026 (live, iterating)"],
              ["Progress", "Closed Testing → Production · Apr 25"],
            ].map(([label, value]) => (
              <div key={label} className="flex gap-[16px]">
                <dt
                  className="w-[110px] shrink-0 text-[12px] tracking-[0.08em] text-[#5D5D5D]"
                  style={MONO}
                >
                  {label.toUpperCase()}
                </dt>
                <dd className="text-[14px] leading-[1.4] text-[#1F1F1F]">
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          {/* Live store links — match the POMEs hero exactly: Apple/Play
              icon, label that underlines on hover, ↗ arrow that nudges
              up-and-right on hover.  Below tablet they stack left-
              aligned (a flex-row justify-between mobile fallback put
              the two store CTAs at opposite edges of the viewport,
              which reads as random rather than paired). */}
          <div className="flex flex-col items-start gap-[10px] self-start tablet:gap-[4px] tablet:self-end tablet:items-stretch">
            <Link
              href="https://apps.apple.com/us/app/volthop/id6759892609"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-[12px] py-[2px] text-[18px] font-semibold tracking-[-0.01em] text-[#1F1F1F] no-underline transition-opacity"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden
                className="h-[22px] w-[22px] shrink-0"
                fill="currentColor"
              >
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              <span className="underline decoration-transparent underline-offset-[5px] transition-[text-decoration-color] duration-150 group-hover:decoration-[#1F1F1F]">
                App Store
              </span>
              <UpRightArrowIcon
                aria-hidden
                className="ml-auto h-[14px] w-[14px] -rotate-45 transition-transform group-hover:-translate-y-[1px] group-hover:translate-x-[1px]"
              />
            </Link>
            <Link
              href="https://play.google.com/store/apps/details?id=com.soonk.volthop"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-[12px] py-[2px] text-[18px] font-semibold tracking-[-0.01em] text-[#1F1F1F] no-underline transition-opacity"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden
                className="h-[22px] w-[22px] shrink-0"
                fill="currentColor"
              >
                <path d="M3.609 1.814 13.792 12 3.609 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .61-.92Zm10.89 10.886 2.302 2.302-12.6 7.227 10.298-9.529Zm3.692-3.69 2.434 1.4a1.5 1.5 0 0 1 0 2.6l-2.434 1.4-2.589-2.7 2.589-2.7Zm-1.39-.793L5.797 1.07l12.6 7.226-2.595 2.404-1-1Z" />
              </svg>
              <span className="underline decoration-transparent underline-offset-[5px] transition-[text-decoration-color] duration-150 group-hover:decoration-[#1F1F1F]">
                Play Store
              </span>
              <UpRightArrowIcon
                aria-hidden
                className="ml-auto h-[14px] w-[14px] -rotate-45 transition-transform group-hover:-translate-y-[1px] group-hover:translate-x-[1px]"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// §02 Insight — "I posted the problem. They wrote the product."
// ============================================================================

function SectionInsight() {
  // §02 "How it started" — the personal context.  Per feedback, kept VERY
  // short: one diagram + four beats.  No prose wall.  The diagram shows
  // the actual physical problem (a battery that can't board a plane).
  return (
    <section
      id="context"
      className="border-t border-[#1F1F1F]/30 py-[48px] first:border-t-0 first:pt-0 tablet:py-[64px]"
    >
      <div className="flex flex-col gap-[36px]">
        <SectionHeader
          number="02"
          eyebrow="Context"
          headline="How it started."
          lede="Before any of this — I was the user."
        />

        {/* Flight-line diagram: US → EU, battery blocked at the gate.
            Abstract over a literal world map because the literal map would
            cost paragraphs and add nothing the line + the × can't say. */}
        <figure className="flex flex-col gap-[20px] border-2 border-[#1F1F1F]/30 bg-[#F8F8F8] p-[24px] tablet:p-[40px]">
          <div className="grid items-center gap-[12px] tablet:grid-cols-[auto_1fr_auto] tablet:gap-[20px]">
            <span
              className="text-[14px] tracking-[0.1em] font-medium text-[#1F1F1F]"
              style={MONO}
            >
              US
            </span>
            <div className="relative h-[24px]">
              {/* dotted flight line */}
              <div
                className="absolute inset-x-0 top-1/2 h-0 -translate-y-1/2 border-t-2 border-dashed border-[#1F1F1F]/40"
                aria-hidden
              />
              {/* plane glyph + battery-X marker, both centered */}
              <div className="absolute inset-0 flex items-center justify-center gap-[10px]">
                <span className="bg-[#F8F8F8] px-[8px] text-[18px]" aria-hidden>
                  ✈
                </span>
                <span
                  className="bg-[#1F1F1F] px-[10px] py-[2px] text-[10px] tracking-[0.1em] text-[#F4F4F4]"
                  style={MONO}
                >
                  ⚡ × NO BOARD
                </span>
              </div>
            </div>
            <span
              className="text-[14px] tracking-[0.1em] font-medium text-[#1F1F1F]"
              style={MONO}
            >
              EU
            </span>
          </div>
          <figcaption
            className="text-center text-[11px] tracking-[0.06em] text-[#A0A0A0]"
            style={MONO}
          >
            FIG. 1 · The watt-hour rule turns a folding e-bike into a regular
            folding bike the moment you land.
          </figcaption>
        </figure>

        {/* Four beats — bullets, not paragraphs. */}
        <ol className="flex flex-col gap-[10px] text-[14px] leading-[1.6] text-[#1F1F1F] tablet:text-[15px]">
          <li className="flex gap-[14px]">
            <span
              className="w-[24px] shrink-0 text-[#A0A0A0]"
              style={MONO}
            >
              01
            </span>
            <span>I&rsquo;m a Brompton electric rider, planning a multi-city trip.</span>
          </li>
          <li className="flex gap-[14px]">
            <span
              className="w-[24px] shrink-0 text-[#A0A0A0]"
              style={MONO}
            >
              02
            </span>
            <span>
              The battery exceeds the FAA / EU watt-hour cap for carry-on, and
              checked-luggage lithium is a hard no.
            </span>
          </li>
          <li className="flex gap-[14px]">
            <span
              className="w-[24px] shrink-0 text-[#A0A0A0]"
              style={MONO}
            >
              03
            </span>
            <span>
              I search for rentals at the destination — nobody carries a
              compatible pack.
            </span>
          </li>
          <li className="flex gap-[14px]">
            <span
              className="w-[24px] shrink-0 text-[#A0A0A0]"
              style={MONO}
            >
              04
            </span>
            <span>
              I see the same friction posted across forums. It isn&rsquo;t just me.
            </span>
          </li>
        </ol>

        <Body>
          Next: figure out whether the demand was real, or whether I was just
          the loudest person in a small room.
        </Body>
      </div>
    </section>
  );
}

// ============================================================================
// §03 Validation — thesis highlight + Reddit receipt + side note
// ============================================================================

function SectionGap() {
  // §03 Validation — Reddit posts → demand check.  Layout per feedback:
  //   - thesis highlight bar full width (kept)
  //   - 2-column row: actual Reddit post screenshot on the LEFT,
  //     four hero stats stacked on the RIGHT.  The screenshot is the
  //     anchor — without it the stats feel arbitrary.  Stacks on mobile.
  //   - manufacturer admission as a small side note at the bottom.
  // Killed: the small "REDDIT POST INSIGHTS · screenshot drops in here"
  // caption and the "TBD · Multi-channel sentiment" placeholder, both of
  // which were unreadable JBM noise.
  const stats: { number: string; label: string }[] = [
    { number: "#8", label: "all-time within a week" },
    { number: "r/Brompton", label: "subreddit" },
    { number: "2 threads", label: "r/Brompton · r/ebikes" },
    { number: "Both sides", label: "demand + supply replied" },
  ];
  return (
    <section
      id="validation"
      className="border-t border-[#1F1F1F]/30 py-[48px] first:border-t-0 first:pt-0 tablet:py-[64px]"
    >
      <div className="flex flex-col gap-[36px]">
        <SectionHeader
          number="03"
          eyebrow="Validation"
          headline={
            <>
              The threads filled in faster
              <br aria-hidden />
              than I could prompt them.
            </>
          }
          lede="To check whether the demand was real, I posted the friction in r/Brompton and r/ebikes — no app, no waitlist, just the question. The replies wrote the rest of this case study."
        />

        {/* Thesis highlight — punchy line, left bar, no card. */}
        <aside className="border-l-4 border-[#1F1F1F] bg-[#F8F8F8] px-[20px] py-[18px] tablet:px-[28px] tablet:py-[24px]">
          <p className="text-[20px] leading-[1.25] font-black tracking-[-0.01em] text-[#1F1F1F] tablet:text-[28px]">
            I posted the problem. They wrote the product.
          </p>
        </aside>

        {/* Receipt row — Reddit post screenshot LEFT, hero stats RIGHT.
            Single-column on mobile (screenshot first, stats below) so the
            artefact still anchors the metrics. */}
        <div className="grid gap-[24px] tablet:grid-cols-[1.2fr_1fr] tablet:items-center tablet:gap-[32px]">
          {/* LEFT — the actual Reddit post that hit #8 all-time */}
          <figure className="flex flex-col gap-[10px]">
            <div className="relative w-full overflow-clip border-2 border-[#1F1F1F] bg-[#F8F8F8]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/work/volthop/reddit-post.png"
                alt="The r/Brompton post — 'I built a free app to solve the Brompton Electric travel battery problem, thanks to this community' — that hit #8 all-time within a week"
                className="block w-full"
              />
            </div>
          </figure>

          {/* RIGHT — four hero stats, stacked vertically.  Larger gap so
              they don't feel like a single dense table; left-aligned to
              match the screenshot's edge. */}
          <dl className="grid grid-cols-2 gap-x-[24px] gap-y-[24px] tablet:grid-cols-1">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-[6px]">
                <dt className="text-[28px] leading-[1] font-medium tracking-[-0.02em] text-[#1F1F1F] tablet:text-[36px]">
                  {s.number}
                </dt>
                <dd className="text-[13px] leading-[1.5] text-[#5D5D5D]">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <Body>
          Across every channel the same shape kept landing: hot interest, real
          friction, and people offering supply before I&rsquo;d built anything to
          sell. That&rsquo;s the answer I needed before writing a line of code.
        </Body>

        {/* Side note — manufacturer admission.  Per feedback, NOT its own
            chapter — just a small confirmation pinned to the bottom of
            validation. */}
        <aside className="border-t border-[#1F1F1F]/20 pt-[18px]">
          <p
            className="mb-[6px] text-[11px] tracking-[0.12em] text-[#A0A0A0]"
            style={MONO}
          >
            SIDE NOTE
          </p>
          <p className="text-[13px] leading-[1.6] text-[#5D5D5D]">
            Brompton&rsquo;s own customer service confirmed the gap on the record:
            travellers do struggle, no rental partnership exists. A small
            receipt but a useful one — manufacturer-level acknowledgement that
            the friction is real.
          </p>
        </aside>
      </div>
    </section>
  );
}

// ============================================================================
// §04 MVP — dual-role architecture + 6 decision blocks
// ============================================================================

// HappyPathStrip — the full 10-step happy path shown as a numbered flow
// (step labels only), followed by 3 sample screens.  Per feedback: don't
// dump all 10 screenshots — too many, eyes glaze — show the path, sample
// the interesting frames.
function HappyPathStrip() {
  // Sampled frames are the four steps Soonk explicitly checked off in
  // review: 01 Explore, 04 Map view, 05 Request battery, 09 Check
  // handoff spot.  These are the moments that change what the user can
  // do — everything else in between is glue.
  const steps: { num: string; label: string; sample?: string }[] = [
    { num: "01", label: "Explore", sample: "/work/volthop/happy-path/01explore.PNG" },
    { num: "02", label: "Address input" },
    { num: "03", label: "Date selection" },
    { num: "04", label: "Map view", sample: "/work/volthop/happy-path/04mapview.PNG" },
    { num: "05", label: "Request battery", sample: "/work/volthop/happy-path/05RequestBatter.png" },
    { num: "06", label: "Confirm request" },
    { num: "07", label: "Contact owner (optional)" },
    { num: "08", label: "Approved contract" },
    { num: "09", label: "Check handoff spot", sample: "/work/volthop/happy-path/09checkinghandoffspot.PNG" },
    { num: "10", label: "Upcoming schedule" },
  ];
  const sampleSteps = steps.filter((s) => !!s.sample);
  return (
    <div className="flex flex-col gap-[20px]">
      {/* Flow strip — labels only */}
      <ol className="flex flex-wrap gap-[6px]">
        {steps.map((s) => (
          <li
            key={s.num}
            className={`flex flex-1 flex-col items-start gap-[4px] border px-[10px] py-[10px] ${
              s.sample
                ? "border-2 border-[#1F1F1F] bg-[#1F1F1F]/[0.04]"
                : "border-[#1F1F1F]/30"
            }`}
            style={{ minWidth: 96 }}
          >
            <span className="text-[10px] text-[#A0A0A0]" style={MONO}>
              {s.num}
            </span>
            <span className="text-[11px] leading-[1.3] font-medium text-[#1F1F1F]">
              {s.label}
            </span>
          </li>
        ))}
      </ol>

      {/* 4 sample frames from the path */}
      <div className="grid gap-[16px] tablet:grid-cols-4">
        {sampleSteps.map((s) => (
          <figure
            key={s.num}
            className="flex flex-col gap-[8px]"
          >
            <div className="relative aspect-[1179/2556] w-full overflow-clip border-2 border-[#1F1F1F]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.sample}
                alt={`Volthop happy-path step ${s.num} — ${s.label}`}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <figcaption
              className="text-[10px] tracking-[0.06em] text-[#A0A0A0]"
              style={MONO}
            >
              {s.num} · {s.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

function SectionMvp() {
  // §04 Conservative MVP Scoping — per feedback: NO dual-role-architecture
  // diagram (it was just text in boxes), NO 6 decision blocks (too dense),
  // NO contact-reveal feature (it doesn't exist in the app).
  //
  // Replaced with: an oversimplified system breakdown, a short "why no
  // chat" note, and the actual happy path (10 steps, 3 sample screens).
  return (
    <section
      id="scope"
      className="border-t border-[#1F1F1F]/30 py-[48px] first:border-t-0 first:pt-0 tablet:py-[64px]"
    >
      <div className="flex flex-col gap-[36px]">
        <SectionHeader
          number="04"
          eyebrow="MVP scope"
          headline="Conservative MVP scoping."
          lede="First-time app developer. Minimum outcome. Skip heavy engineering wherever the design can carry the load instead."
        />

        {/* Oversimplified system — Role / Event / Key feature trio. */}
        <div className="grid gap-[16px] border-2 border-[#1F1F1F]/30 bg-[#F8F8F8] p-[20px] tablet:grid-cols-3 tablet:gap-[24px] tablet:p-[28px]">
          {/* Role */}
          <div className="flex flex-col gap-[10px]">
            <p
              className="text-[10px] tracking-[0.12em] text-[#5D5D5D]"
              style={MONO}
            >
              ROLE
            </p>
            <ul className="flex flex-col gap-[4px] text-[14px] leading-[1.5] text-[#1F1F1F]">
              <li>· Provider</li>
              <li>· Borrower</li>
            </ul>
          </div>
          {/* Event */}
          <div className="flex flex-col gap-[10px]">
            <p
              className="text-[10px] tracking-[0.12em] text-[#5D5D5D]"
              style={MONO}
            >
              EVENT
            </p>
            <ul className="flex flex-col gap-[6px] text-[13px] leading-[1.5] text-[#1F1F1F]">
              <li>
                <span className="text-[#5D5D5D]">Borrower:</span> plan trip →
                explore → find → book → return
              </li>
              <li>
                <span className="text-[#5D5D5D]">Provider:</span> register →
                accept → lend → pick up
              </li>
            </ul>
          </div>
          {/* Key feature */}
          <div className="flex flex-col gap-[10px]">
            <p
              className="text-[10px] tracking-[0.12em] text-[#5D5D5D]"
              style={MONO}
            >
              KEY FEATURE
            </p>
            <ul className="flex flex-col gap-[6px] text-[13px] leading-[1.5] text-[#1F1F1F]">
              <li>
                <span className="text-[#5D5D5D]">Borrower:</span> explore, save,
                request, contact method
              </li>
              <li>
                <span className="text-[#5D5D5D]">Provider:</span> register,
                contact method
              </li>
            </ul>
          </div>
        </div>

        {/* No-chat rationale — short black-bar callout. */}
        <aside className="border-l-4 border-[#1F1F1F] bg-[#F8F8F8] px-[20px] py-[18px]">
          <p className="text-[14px] leading-[1.6] text-[#1F1F1F]">
            <span className="font-medium">Not going to build a chat function.</span>{" "}
            Chat is nice, but without it, letting users connect by other
            messengers or text message does the same job. Heavy engineering is
            going to be skipped.
          </p>
        </aside>

        {/* Onboarding decision — the actual 3-screen flow.
            Per feedback: onboarding's job is to ask "are you also a
            supplier?" and if yes, capture the minimum requirements to
            list a battery.  The previous version used the supplier-info
            screen twice (screens 02 and 03 looked identical); fixed so
            screen 03 is the Contact Methods step — the rule for how
            borrowers reach a supplier when there is no in-app chat.
            Screens:
              01 · Landing / sign-up entry
              02 · Bike profile + "Register as supplier too" toggle ON
                   (also surfaces the Supplier minimum requirements form)
              03 · Contact methods — at least one must stay reachable */}
        <div className="flex flex-col gap-[18px]">
          <div className="flex flex-col gap-[8px]">
            <p
              className="text-[11px] tracking-[0.08em] text-[#A0A0A0]"
              style={MONO}
            >
              ONBOARDING
            </p>
            <h3 className="text-[18px] leading-[1.3] font-medium text-[#1F1F1F]">
              Ask once: are you also a supplier? If yes, here&rsquo;s the
              minimum.
            </h3>
            <p className="max-w-[600px] text-[13px] leading-[1.7] text-[#5D5D5D]">
              Sign-up branches on a single toggle. Borrower-only users skip
              the supplier fields. Supplier opt-ins capture the smallest set
              of fields a listing needs, then choose how borrowers can reach
              them — since there is no in-app chat, at least one contact
              method has to stay on.
            </p>
          </div>

          <div className="grid gap-[16px] tablet:grid-cols-3 tablet:gap-[20px]">
            {[
              {
                num: "01",
                label: "Sign up",
                note: "Email · Google · Apple",
                src: "/work/volthop/onboarding/01-landing.png",
              },
              {
                num: "02",
                label: "Bike profile + supplier toggle",
                note: "Default OFF. Flip ON → Supply Info appears (Country · Location · Price · Dates).",
                src: "/work/volthop/onboarding/02-bike-profile-supplier-toggle.png",
              },
              {
                num: "03",
                label: "Contact methods",
                note: "Text Message is default. Adding WhatsApp / FB Messenger lets the user drop SMS — but at least one stays on.",
                src: "/work/volthop/onboarding/03-contact-methods.png",
              },
            ].map((s) => (
              <figure key={s.num} className="flex flex-col gap-[8px]">
                <div className="relative aspect-[1179/2556] w-full overflow-clip border-2 border-[#1F1F1F]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.src}
                    alt={`Volthop onboarding step ${s.num} — ${s.label}`}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <figcaption className="flex flex-col gap-[2px]">
                  <span
                    className="text-[10px] tracking-[0.08em] text-[#A0A0A0]"
                    style={MONO}
                  >
                    {s.num} · {s.label.toUpperCase()}
                  </span>
                  <span className="text-[12px] leading-[1.4] text-[#5D5D5D]">
                    {s.note}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Happy path — full flow + 3 sample frames */}
        <div className="flex flex-col gap-[14px]">
          <h3 className="text-[18px] leading-[1.3] font-medium text-[#1F1F1F]">
            The full happy path.
          </h3>
          <p className="max-w-[600px] text-[13px] leading-[1.7] text-[#5D5D5D]">
            Ten steps, mostly linear. Highlighted cells in the strip below are
            the frames sampled underneath.
          </p>
          <HappyPathStrip />
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// §05 Iterations — community-driven changes that shipped
// ============================================================================

function SectionIterations() {
  // §05 Iterations — community-driven product changes that shipped:
  //   1. EU + multi-country support  (real demand is US→EU air travellers)
  //   2. Deposit suggestion          (people worried about theft)
  //
  // Note: in-person Brompton meetups (which drove install acquisition,
  // not product iteration) used to live here as Iteration 03 — Soonk
  // pointed out it isn't really iteration but GTM, so it now opens the
  // §06 GTM section instead.
  return (
    <section
      id="iterations"
      className="border-t border-[#1F1F1F]/30 py-[48px] first:border-t-0 first:pt-0 tablet:py-[64px]"
    >
      <div className="flex flex-col gap-[44px]">
        <SectionHeader
          number="05"
          eyebrow="Iterations ★"
          headline={
            <>
              I posted the problem.
              <br aria-hidden />
              They wrote the product.
            </>
          }
          lede="The community didn't just validate the idea — it shipped the next product changes for me. Each one started in a comment thread, and each one re-shaped what got built."
        />

        {/* ---- Iteration 01 — Europe & multi-country expansion --------
            Layout matches §03 Validation: EU map screenshot on the LEFT
            (the artefact anchors what shipped), all content on the RIGHT
            (bullets → community quotes → summary).  Stacks on mobile. */}
        <article className="flex flex-col gap-[16px]">
          <header className="flex flex-wrap items-center gap-[10px]">
            <span
              className="bg-[#1F1F1F] px-[8px] py-[2px] text-[10px] tracking-[0.1em] text-[#F4F4F4]"
              style={MONO}
            >
              ITERATION 01
            </span>
            <h3 className="text-[18px] leading-[1.3] font-medium text-[#1F1F1F] tablet:text-[20px]">
              The real demand isn&rsquo;t US-only — it&rsquo;s air travellers.
            </h3>
          </header>

          <div className="grid gap-[24px] tablet:grid-cols-[240px_1fr] tablet:items-start tablet:gap-[32px]">
            {/* LEFT — EU map screenshot only */}
            <div className="relative aspect-[1179/2556] w-full max-w-[240px] overflow-clip border-2 border-[#1F1F1F]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/work/volthop/volthop-map-europe.png"
                alt="Volthop discovery map covering Europe — UK, Netherlands, Germany, France"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            {/* RIGHT — bullets, community quotes from r/Brompton, summary. */}
            <div className="flex flex-col gap-[18px]">
              <ul className="flex flex-col gap-[8px] text-[14px] leading-[1.6] text-[#1F1F1F] tablet:text-[15px]">
                <li className="flex gap-[12px]">
                  <span className="shrink-0 text-[#A0A0A0]">·</span>
                  <span>
                    Some Europeans mostly take{" "}
                    <span className="font-medium">trains</span> — they don&rsquo;t
                    need a rental network the same way.
                  </span>
                </li>
                <li className="flex gap-[12px]">
                  <span className="shrink-0 text-[#A0A0A0]">·</span>
                  <span>
                    The real demand is people flying{" "}
                    <span className="font-medium">US → EU</span>, or
                    country-to-country, where the bike folds but the battery
                    is grounded.
                  </span>
                </li>
                <li className="flex gap-[12px]">
                  <span className="shrink-0 text-[#A0A0A0]">·</span>
                  <span>
                    A US-only release would have{" "}
                    <span className="font-medium">missed the main cohort</span>.
                    EU + multi-country had to ship in v1.
                  </span>
                </li>
              </ul>

              <div className="flex flex-col gap-[12px]">
                <figure className="border-l-4 border-[#1F1F1F] bg-[#F8F8F8] px-[18px] py-[14px]">
                  <blockquote className="text-[15px] leading-[1.55] text-[#1F1F1F]">
                    &ldquo;Brompton should&rsquo;ve solved this by now &hellip;
                    the community needs to figure it out ourselves.&rdquo;
                  </blockquote>
                  <figcaption className="mt-[8px] text-[12px] leading-[1.4] text-[#5D5D5D]">
                    — Deviantdefective, Top 1% Commenter, r/Brompton
                  </figcaption>
                </figure>

                <figure className="border-l-4 border-[#1F1F1F] bg-[#F8F8F8] px-[18px] py-[14px]">
                  <blockquote className="text-[15px] leading-[1.55] text-[#1F1F1F]">
                    &ldquo;Some cities already have Brompton hire — what
                    about battery hire?&rdquo;
                  </blockquote>
                  <figcaption className="mt-[8px] text-[12px] leading-[1.4] text-[#5D5D5D]">
                    — ChaosCalmed, r/Brompton
                  </figcaption>
                </figure>

                <figure className="border-l-4 border-[#1F1F1F] bg-[#F8F8F8] px-[18px] py-[14px]">
                  <blockquote className="text-[15px] leading-[1.55] text-[#1F1F1F]">
                    &ldquo;Brompton&rsquo;s CEO mentioned a battery rental
                    scheme in a Q&amp;A — still un-launched.&rdquo;
                  </blockquote>
                  <figcaption className="mt-[8px] text-[12px] leading-[1.4] text-[#5D5D5D]">
                    — JanCumin, r/Brompton
                  </figcaption>
                </figure>
              </div>

              <p className="text-[14px] leading-[1.7] text-[#5D5D5D]">
                Five different commenters independently sketched a P2P
                battery rental on the thread before VoltHop was ever
                mentioned — concept familiarity was already there. The
                question wasn&rsquo;t whether to build it, but whether to
                ship US-only or include EU from day one. The EU voices
                above answered that.
              </p>
            </div>
          </div>
        </article>

        {/* ---- Iteration 02 — Deposit feature ------------------------- */}
        <article className="flex flex-col gap-[16px]">
          <header className="flex flex-wrap items-center gap-[10px]">
            <span
              className="bg-[#1F1F1F] px-[8px] py-[2px] text-[10px] tracking-[0.1em] text-[#F4F4F4]"
              style={MONO}
            >
              ITERATION 02
            </span>
            <h3 className="text-[18px] leading-[1.3] font-medium text-[#1F1F1F] tablet:text-[20px]">
              &ldquo;What if someone runs off with the battery?&rdquo;
            </h3>
          </header>

          {/* Layout matches Iteration 01 / §03 Validation: screenshots on
              the LEFT, organized content on the RIGHT.  Quotes pulled from
              the Reddit/Facebook threads Soonk surfaced (r/ebikes, r/Brompton,
              Brompton Electric Owners FB group) — 11 comments narrowed to
              the three sharpest.

              Responsive screen pair:
                - tablet+ (≥800):  screens side-by-side LEFT, text RIGHT
                - <800, ≥400:      screens still side-by-side (top), text
                                   wraps below
                - <400:            screens stack vertically (deal accepted
                                   → deposit modal) so each phone reads at
                                   a comfortable width on tiny viewports */}
          <div className="grid gap-[24px] tablet:grid-cols-[360px_1fr] tablet:items-start tablet:gap-[32px]">
            {/* LEFT — deal accepted + deposit modal, side-by-side */}
            <div className="grid grid-cols-1 gap-[12px] min-[400px]:grid-cols-2 min-[400px]:gap-[16px]">
              <figure className="flex flex-col gap-[8px]">
                <div className="relative aspect-[1179/2556] w-full overflow-clip border-2 border-[#1F1F1F]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/work/volthop/deal_before_hitting_deposit.png"
                    alt="Volthop — deal accepted screen before deposit prompt"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <figcaption className="text-[12px] leading-[1.4] text-[#5D5D5D]">
                  01 · Deal accepted
                </figcaption>
              </figure>
              <figure className="flex flex-col gap-[8px]">
                <div className="relative aspect-[1179/2556] w-full overflow-clip border-2 border-[#1F1F1F]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/work/volthop/deposit.png"
                    alt="Volthop — deposit recommendation modal"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <figcaption className="text-[12px] leading-[1.4] text-[#5D5D5D]">
                  02 · Deposit recommendation modal
                </figcaption>
              </figure>
            </div>

            {/* RIGHT — callout + curated quotes + summary */}
            <div className="flex flex-col gap-[18px]">
              <aside className="border-l-4 border-[#1F1F1F] bg-[#F8F8F8] px-[20px] py-[16px]">
                <p className="text-[14px] leading-[1.6] text-[#1F1F1F]">
                  The community surfaced the trust risk before the first
                  booking ever happened. The answer was a{" "}
                  <span className="font-medium">deposit suggestion</span>:
                  when a deal closes, both sides see a recommended deposit
                  amount and a short note on how to exchange it at the
                  handoff.
                </p>
              </aside>

              <div className="flex flex-col gap-[12px]">
                <figure className="border-l-4 border-[#1F1F1F] bg-[#F8F8F8] px-[18px] py-[14px]">
                  <blockquote className="text-[15px] leading-[1.55] text-[#1F1F1F]">
                    &ldquo;A good battery is easily $500 &hellip; you can
                    sell a used battery pretty quick on Facebook for
                    $2&ndash;300. There needs to be a good system to
                    protect the person lending their battery.&rdquo;
                  </blockquote>
                  <figcaption className="mt-[8px] text-[12px] leading-[1.4] text-[#5D5D5D]">
                    — Ramone45454, r/ebikes
                  </figcaption>
                </figure>

                <figure className="border-l-4 border-[#1F1F1F] bg-[#F8F8F8] px-[18px] py-[14px]">
                  <blockquote className="text-[15px] leading-[1.55] text-[#1F1F1F]">
                    &ldquo;Unscrupulous renter leases your battery, returns
                    their worn-out battery instead.&rdquo;
                  </blockquote>
                  <figcaption className="mt-[8px] text-[12px] leading-[1.4] text-[#5D5D5D]">
                    — EvilPencil, r/ebikes
                  </figcaption>
                </figure>

                <figure className="border-l-4 border-[#1F1F1F] bg-[#F8F8F8] px-[18px] py-[14px]">
                  <blockquote className="text-[15px] leading-[1.55] text-[#1F1F1F]">
                    &ldquo;What happens if a renter damages, loses, swaps
                    or doesn&rsquo;t return the battery? Who holds the
                    deposit and how is it released?&rdquo;
                    <span className="mt-[6px] block text-[13px] text-[#5D5D5D]">
                      &hellip; after the conversation:{" "}
                      <span className="font-medium text-[#1F1F1F]">
                        &ldquo;I&rsquo;ll sign up and see how it goes.&rdquo;
                      </span>
                    </span>
                  </blockquote>
                  <figcaption className="mt-[8px] text-[12px] leading-[1.4] text-[#5D5D5D]">
                    — kingfrank_bromptons, r/Brompton
                  </figcaption>
                </figure>
              </div>

              <p className="text-[14px] leading-[1.7] text-[#5D5D5D]">
                Seven different people across four Reddit threads and one
                Facebook group raised the same shape of concern — theft,
                battery swaps, who holds the money. The deposit-at-deal-close
                screen answered the most-asked version of the question
                directly, and at least one skeptic explicitly flipped after
                the conversation.
              </p>
            </div>
          </div>
        </article>

      </div>
    </section>
  );
}

// ============================================================================
// §06 GTM — in-person + SEO + AEO
// ============================================================================

function SectionGtm() {
  // §06 GTM — three distribution channels for the live app:
  //   1. In-person  — Brompton meetups (the install-acquisition story
  //                   that used to live in §05 Iterations as Iteration 03)
  //   2. SEO        — marketing site at volthop.app indexed deliberately
  //   3. AEO        — answer-first article structure for AI assistants
  // SEO + AEO content pulled directly from volthop.app (the live
  // marketing site); meetup photos under /work/volthop/.
  return (
    <section
      id="channels"
      className="border-t border-[#1F1F1F]/30 py-[48px] first:border-t-0 first:pt-0 tablet:py-[64px]"
    >
      <div className="flex flex-col gap-[36px]">
        <SectionHeader
          number="06"
          eyebrow="GTM"
          headline="Finding them in the wild."
          lede="Once v1 was live, the channels mattered. Three tracks: showing up where Brompton riders already gather (in-person), classic search (SEO), and AI-assistant retrieval (AEO)."
        />

        {/* ---- In-Person — Brompton meetups (IRL distribution) ------- */}
        <article className="flex flex-col gap-[16px]">
          <header className="flex flex-wrap items-center gap-[10px]">
            <span
              className="bg-[#1F1F1F] px-[8px] py-[2px] text-[10px] tracking-[0.1em] text-[#F4F4F4]"
              style={MONO}
            >
              IN-PERSON
            </span>
            <h3 className="text-[18px] leading-[1.3] font-medium text-[#1F1F1F] tablet:text-[20px]">
              Showed up at Brompton meetups, came home with installs.
            </h3>
          </header>

          <p className="max-w-[620px] text-[14px] leading-[1.7] text-[#5D5D5D] tablet:text-[15px]">
            I went to local Brompton meetups in person — talked to people,
            promoted the app, listened. New app installs followed.
          </p>

          {/* 4-up meetup grid */}
          <div className="grid grid-cols-2 gap-[12px] tablet:grid-cols-4">
            {[
              "/work/volthop/meetup-1.jpeg",
              "/work/volthop/meetup-2.jpeg",
              "/work/volthop/meetup-3.jpeg",
              "/work/volthop/meetup-4.jpeg",
            ].map((src, i) => (
              <div
                key={src}
                className="relative aspect-square w-full overflow-clip border-2 border-[#1F1F1F]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`Brompton meetup ${i + 1}`}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </article>

        {/* ---- SEO --------------------------------------------------- */}
        <article className="flex flex-col gap-[16px]">
          <header className="flex flex-wrap items-center gap-[10px]">
            <span
              className="bg-[#1F1F1F] px-[8px] py-[2px] text-[10px] tracking-[0.1em] text-[#F4F4F4]"
              style={MONO}
            >
              SEO
            </span>
            <h3 className="text-[18px] leading-[1.3] font-medium text-[#1F1F1F] tablet:text-[20px]">
              A marketing site, indexed deliberately.
            </h3>
          </header>

          <div className="grid gap-[20px] tablet:grid-cols-[1fr_1fr] tablet:items-start tablet:gap-[28px]">
            <ul className="flex flex-col gap-[8px] text-[14px] leading-[1.6] text-[#1F1F1F] tablet:text-[15px]">
              <li className="flex gap-[12px]">
                <span className="shrink-0 text-[#A0A0A0]">·</span>
                <span>
                  Built a dedicated marketing site (
                  <span style={MONO}>volthop.app</span>) so the app store page
                  isn&rsquo;t the only crawlable surface.
                </span>
              </li>
              <li className="flex gap-[12px]">
                <span className="shrink-0 text-[#A0A0A0]">·</span>
                <span>
                  Targeted long-tail queries riders actually type — &ldquo;ebike
                  battery on a plane&rdquo;, &ldquo;Brompton battery rental&rdquo;,
                  &ldquo;fly with folding ebike&rdquo;.
                </span>
              </li>
              <li className="flex gap-[12px]">
                <span className="shrink-0 text-[#A0A0A0]">·</span>
                <span>
                  Title + H1 mirror the query verbatim (
                  <span className="italic">
                    &ldquo;Can You Take an E-Bike Battery on a Plane? Complete
                    2026 Guide&rdquo;
                  </span>
                  ); year in the title for recency signal.
                </span>
              </li>
              <li className="flex gap-[12px]">
                <span className="shrink-0 text-[#A0A0A0]">·</span>
                <span>
                  Compatible-brand list on home page (Brompton, Tern, Dahon,
                  Lectric, Aventon, Ride1Up, &hellip;) seeds brand-specific
                  long-tail.
                </span>
              </li>
            </ul>

            {/* Marketing home screenshot — captured live from volthop.app. */}
            <figure className="flex flex-col gap-[8px]">
              <div className="relative aspect-[1440/900] w-full overflow-clip border-2 border-[#1F1F1F]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/work/volthop/marketing/marketing-home.png"
                  alt="VoltHop marketing home page — Don't Let Airlines Ground Your E-Bike"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              </div>
              <figcaption
                className="text-[10px] tracking-[0.06em] text-[#A0A0A0]"
                style={MONO}
              >
                volthop.app — marketing home
              </figcaption>
            </figure>
          </div>

          <p className="inline-flex items-center gap-[6px] text-[12px] text-[#A0A0A0]">
            <UpRightArrowIcon className="h-[10px] w-[10px] -rotate-45" />
            <span>link out:</span>{" "}
            <a
              href="https://volthop.app/blog"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-[#A0A0A0] underline-offset-[3px] hover:text-[#1F1F1F]"
            >
              volthop.app/blog
            </a>
          </p>
        </article>

        {/* ---- AEO --------------------------------------------------- */}
        <article className="flex flex-col gap-[16px]">
          <header className="flex flex-wrap items-center gap-[10px]">
            <span
              className="bg-[#1F1F1F] px-[8px] py-[2px] text-[10px] tracking-[0.1em] text-[#F4F4F4]"
              style={MONO}
            >
              AEO
            </span>
            <h3 className="text-[18px] leading-[1.3] font-medium text-[#1F1F1F] tablet:text-[20px]">
              Make the answer easy for the AI assistants.
            </h3>
          </header>

          <div className="grid gap-[20px] tablet:grid-cols-[1fr_1fr] tablet:items-start tablet:gap-[28px]">
            <ul className="flex flex-col gap-[8px] text-[14px] leading-[1.6] text-[#1F1F1F] tablet:text-[15px]">
              <li className="flex gap-[12px]">
                <span className="shrink-0 text-[#A0A0A0]">·</span>
                <span>
                  Answer-first article structure: the H1 is the question,
                  paragraph one is the answer in plain words. Assistants quote
                  that paragraph.
                </span>
              </li>
              <li className="flex gap-[12px]">
                <span className="shrink-0 text-[#A0A0A0]">·</span>
                <span>
                  Airline-by-airline policy table — structured rows assistants
                  can lift into a comparison without re-parsing prose.
                </span>
              </li>
              <li className="flex gap-[12px]">
                <span className="shrink-0 text-[#A0A0A0]">·</span>
                <span>
                  FAQ section at the bottom of every article (5+ Q&amp;A pairs)
                  so retrieval picks up the exact phrasing users ask.
                </span>
              </li>
              <li className="flex gap-[12px]">
                <span className="shrink-0 text-[#A0A0A0]">·</span>
                <span>
                  Dated authority (&ldquo;2026 IATA SOC rule&rdquo;,
                  &ldquo;Southwest 300Wh cap&rdquo;) so freshness checks favour
                  this page over older blog posts.
                </span>
              </li>
            </ul>

            <figure className="flex flex-col gap-[8px]">
              <div className="relative aspect-[1440/900] w-full overflow-clip border-2 border-[#1F1F1F]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/work/volthop/marketing/marketing-blog.png"
                  alt="VoltHop blog index — answer-first articles structured for AI retrieval"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              </div>
              <figcaption
                className="text-[10px] tracking-[0.06em] text-[#A0A0A0]"
                style={MONO}
              >
                volthop.app/blog — answer-first article index
              </figcaption>
            </figure>
          </div>
        </article>
      </div>
    </section>
  );
}

// ============================================================================
// Page composition
// ============================================================================
//
// Per feedback the case study ends at §06 SEO & AEO — the previous
// §07 "What's next" block (reflection + 4 next-move tiles + mocked
// reviews) was removed because (a) it leaned heavily on prose, (b) the
// review tiles were fabricated content that doesn't belong in a
// portfolio, and (c) the user explicitly outlined only §02–§06.

const SECTIONS: CaseStudySection[] = [
  { id: "context", num: "02", label: "How it started" },
  { id: "validation", num: "03", label: "Validation" },
  { id: "scope", num: "04", label: "MVP scope" },
  { id: "iterations", num: "05", label: "Iterations", star: true },
  { id: "channels", num: "06", label: "GTM" },
];

export default function VolthopCaseStudy() {
  return (
    <>
      <Hero />

      {/* §02–06 in a two-column layout: sticky left nav + content column.
          Left nav is hidden below the tablet breakpoint so the read on
          mobile stays linear (top-to-bottom, no side rail). */}
      <div className="border-t-2 border-[#1F1F1F]">
        <div className="mx-auto flex max-w-[1200px] gap-[32px] px-[32px] py-[48px] tablet:py-[64px]">
          <CaseStudyLeftNav
            currentSlug="volthop"
            readTime="~10 min read"
            sections={SECTIONS}
          />

          <div className="flex min-w-0 flex-1 flex-col">
            <SectionInsight />
            <SectionGap />
            <SectionMvp />
            <SectionIterations />
            <SectionGtm />
          </div>
        </div>
      </div>
    </>
  );
}
