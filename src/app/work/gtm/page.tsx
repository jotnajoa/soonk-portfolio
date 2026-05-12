import type { Metadata } from "next";
import Link from "next/link";
import CaseStudyNav from "@/components/cases/CaseStudyNav";
import CaseStudyLeftNav, {
  type CaseStudySection,
} from "@/components/cases/CaseStudyLeftNav";

// GTM Marketing Discovery — cross-project case study (POMEs hyper-local
// ground game vs VoltHop niche-global digital communities).  Same long-
// scroll architecture as the POMEs page (sticky left nav from §02 on,
// hero is full-bleed).
//
// The Figma brief specifies a cream-warm palette with teal accent; this
// page deliberately rebuilds in the portfolio's mono palette to match
// the rest of the case studies (same call Soonk made on the Volthop and
// POMEs case studies).  Two-project differentiation is handled by tone
// alone: POMEs side = ■ filled black marker, VoltHop side = ○ outline
// marker.  The r/Brompton card uses inverted dark fill (the visual
// "this is the finding" beat the brief calls out in teal).

export const metadata: Metadata = {
  title: "GTM Marketing Discovery — Soonk Paik",
  description:
    "Two motions for two products: POMEs (hyper-local NYC buildings) and VoltHop (niche-global folding e-bike communities). Same framework, different channels.",
};

const MONO =
  "var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, Menlo, monospace";

// Section list — labels mirror the eyebrow string above each section so
// the left rail and the in-page eyebrows never drift apart.
const SECTIONS: CaseStudySection[] = [
  { id: "intro", num: "01", label: "Intro" },
  { id: "motions", num: "02", label: "Two motions" },
  { id: "pomes", num: "03", label: "POMEs · Ground game" },
  { id: "volthop", num: "04", label: "VoltHop · Digital community" },
  { id: "learnings", num: "05", label: "Channel learnings" },
  { id: "playbook", num: "06", label: "Playbook" },
];

// ---- Shared atoms (lifted from the POMEs page) ----------------------------
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-[18px] text-[12px] tracking-[0.16em] font-medium text-[#5D5D5D]">
      {children}
    </div>
  );
}

function SectionHead({ n, title }: { n: string; title: string }) {
  return (
    <div className="mb-[22px] grid grid-cols-[80px_1fr] items-start gap-[18px] min-[960px]:grid-cols-[110px_1fr] min-[960px]:gap-[24px]">
      <div className="text-[64px] leading-[0.85] font-extrabold tracking-[-0.05em] text-[#1F1F1F] min-[960px]:text-[88px]">
        {n}
      </div>
      <h2 className="max-w-[600px] pt-1 text-[24px] leading-[1.25] font-medium tracking-[-0.02em] text-[#1F1F1F] min-[960px]:pt-[10px] min-[960px]:text-[32px]">
        {title}
      </h2>
    </div>
  );
}

function Lede({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-[18px] max-w-[640px] text-[16px] leading-[1.7] text-[#5D5D5D]">
      {children}
    </p>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <p className="my-[18px] max-w-[640px] text-[16px] leading-[1.7] text-[#5D5D5D]">
      {children}
    </p>
  );
}

function SubH({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-9 mb-[14px] max-w-[620px] text-[20px] leading-[1.3] font-medium text-[#1F1F1F]">
      {children}
    </h3>
  );
}

function Strong({ children }: { children: React.ReactNode }) {
  return <strong className="font-medium text-[#1F1F1F]">{children}</strong>;
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-[24px] max-w-[640px] border-l-2 border-[#1F1F1F] py-[6px] pl-[20px] text-[18px] leading-[1.4] font-medium italic text-[#1F1F1F] min-[560px]:text-[22px]">
      {children}
    </blockquote>
  );
}

// ProjectMarker — a single character glyph that labels which side of the
// story a block belongs to.  Filled black square (■) = POMEs, hollow
// circle (○) = VoltHop.  Same marker shows up in §02 viz, §03/§04
// banners, and inline in copy.
function PomesMark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-block size-[10px] shrink-0 bg-[#1F1F1F] ${className}`}
    />
  );
}
function VolthopMark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-block size-[10px] shrink-0 rounded-full border-[1.5px] border-[#1F1F1F] ${className}`}
    />
  );
}

// StatCell — one column inside a stat row.  Numeric value on top (JBM
// Mono, ~40 px), caption below at 14 px / #3D3D3D.  An earlier draft
// used 12 px / #5D5D5D for the caption and it got drowned by the
// heavy numerals — flagged unreadable in review.
function StatCell({
  value,
  caption,
}: {
  value: string;
  caption: string;
  /** Kept for callsite compatibility; styling is identical for all cells. */
  emphasis?: boolean;
}) {
  return (
    <div className="flex flex-col gap-[8px]">
      <p
        className="text-[32px] leading-[1] font-medium tracking-[-0.03em] text-[#1F1F1F] min-[560px]:text-[40px]"
        style={{ fontFamily: MONO }}
      >
        {value}
      </p>
      <p className="text-[13px] leading-[1.45] font-medium text-[#3D3D3D] min-[560px]:text-[14px]">
        {caption}
      </p>
    </div>
  );
}

// ---- The page -------------------------------------------------------------
export default function GtmCaseStudy() {
  return (
    <div className="min-h-screen bg-[#EEEEEE] text-[#1F1F1F]">
      <CaseStudyNav currentSlug="gtm" />

      {/* ---------- HERO (full-bleed, no left nav) ---------- */}
      <section
        id="intro"
        className="mx-auto max-w-[1200px] px-[32px] pt-[40px] pb-[56px] min-[560px]:pt-[64px] min-[560px]:pb-[72px]"
      >
        <Eyebrow>+ Intro</Eyebrow>

        <h1 className="mb-[28px] max-w-[820px] text-[44px] leading-[1.05] font-semibold tracking-[-0.03em] text-[#1F1F1F] min-[560px]:text-[60px] min-[960px]:text-[72px]">
          Going to market.
        </h1>

        <p className="mb-[24px] max-w-[680px] text-[18px] leading-[1.55] text-[#5D5D5D] min-[560px]:text-[20px]">
          As a product person, my goal is bigger than the design.  With
          POMEs and VoltHop I shipped the GTM too — and they needed
          completely different motions.
        </p>

        {/* Two project lines — each project name bold and on its own
            paragraph so they don't melt into the lede.  An earlier draft
            ran both into one block and reviewers couldn't pick out where
            one project ended and the other began. */}
        <div className="mb-[48px] flex max-w-[760px] flex-col gap-[14px]">
          <p className="text-[17px] leading-[1.6] text-[#1F1F1F] min-[560px]:text-[18px]">
            <Strong>POMEs</Strong> is hyper-local: 60 specific people sharing
            four walls.  So the channel had to be physical — leaflets in
            elevators.
          </p>
          <p className="text-[17px] leading-[1.6] text-[#1F1F1F] min-[560px]:text-[18px]">
            <Strong>VoltHop</Strong> is niche-global: folding e-bike owners
            scattered across the world but congregating in specific
            subreddits and Facebook groups.  So the channel had to be
            digital — drop the problem statement where they already gather.
            Same framework, different execution.
          </p>
        </div>

        {/* Split 4-stat row.  Two distinct groups separated by a vertical
            hairline on desktop; stacked on mobile.  Each side carries a
            small project label + marker on top so the stats can't bleed
            into one story.  No rounded backgrounds per Soonk — captions
            now sit at 14 px / #3D3D3D so they read under the heavy
            40-px numerals (earlier 12 px / #5D5D5D was too faint). */}
        <div className="grid gap-[36px] min-[800px]:grid-cols-[1fr_1px_1fr] min-[800px]:gap-[48px]">
          {/* Left — POMEs */}
          <div className="flex flex-col gap-[24px] border-l-2 border-[#1F1F1F] pl-[20px] min-[800px]:border-l-0 min-[800px]:pl-0">
            <div className="flex items-center gap-[10px]">
              <PomesMark />
              <span
                className="text-[12px] tracking-[0.16em] font-medium text-[#1F1F1F]"
                style={{ fontFamily: MONO }}
              >
                POMES · GROUND GAME
              </span>
            </div>
            <div className="grid grid-cols-2 gap-x-[20px] gap-y-[24px] min-[560px]:grid-cols-4">
              <StatCell value="60+" caption="buildings audited" emphasis />
              <StatCell value="9" caption="leafletted" />
              <StatCell value="97" caption="signups · 3 weeks" />
              <StatCell value="10.2%" caption="peak (Tower 77)" emphasis />
            </div>
          </div>

          {/* Divider — desktop only */}
          <div
            aria-hidden
            className="hidden h-full w-px self-stretch bg-[#A0A0A0]/60 min-[800px]:block"
          />

          {/* Right — VoltHop */}
          <div className="flex flex-col gap-[24px] border-l-2 border-[#5D5D5D] pl-[20px] min-[800px]:border-l-0 min-[800px]:pl-0">
            <div className="flex items-center gap-[10px]">
              <VolthopMark />
              <span
                className="text-[12px] tracking-[0.16em] font-medium text-[#1F1F1F]"
                style={{ fontFamily: MONO }}
              >
                VOLTHOP · DIGITAL COMMUNITY
              </span>
            </div>
            {/* Three stats: views, comments, all-time rank.  Earlier
                drafts had a fourth "Air BnBattery" callout (the user-
                coined product name) but it never visually landed — the
                phrase didn't fit a numeric grid and reading-direction
                pulled the eye past it.  Dropped. */}
            <div className="grid grid-cols-3 gap-x-[20px] gap-y-[24px]">
              <StatCell value="14.7K" caption="Reddit views" emphasis />
              <StatCell value="53" caption="comments" />
              <StatCell value="#8" caption="all-time in r/Brompton" emphasis />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Body grid: sticky nav + content (from §02 down) ---------- */}
      <div className="bg-[#EEEEEE]">
        <div className="mx-auto flex max-w-[1200px] gap-[32px] px-[32px] pt-[40px] pb-[80px] tablet:gap-[48px] tablet:pt-[56px] tablet:pb-[96px]">
          <CaseStudyLeftNav
            currentSlug="gtm"
            readTime="~8 min read"
            sections={SECTIONS}
          />

          <main className="min-w-0 flex-1">
            {/* ===== 02 Two motions ===== */}
            <Section id="motions" first>
              <Eyebrow>+ Two motions</Eyebrow>
              <SectionHead
                n="02"
                title="Where is the audience already concentrated? Show up there."
              />
              <Lede>
                Both projects had real audiences, but those audiences were
                concentrated in completely different geometries.  POMEs&rsquo;
                audience was 60 people sharing physical walls.  VoltHop&rsquo;s
                was thousands of folding e-bike owners scattered across
                continents but converging in specific online rooms.  The
                motion has to match the geometry — anything else is wasted
                effort.
              </Lede>

              {/* The signature visualization — concentration vs scatter.
                  Left card uses the NYC neighborhood map from the POMEs
                  case study (single source of truth for the building-
                  selection visualization, per Soonk).  Right card stays
                  on the dashed-world + cluster-nodes scatter. */}
              <figure className="my-[28px]">
                <div className="grid grid-cols-1 gap-[16px] min-[700px]:grid-cols-2 min-[700px]:gap-[20px]">
                  <MotionCardPomes />
                  <MotionCardVolthop />
                </div>
                <figcaption className="mt-[12px] text-right text-[12px] tracking-[0.08em] text-[#5D5D5D]">
                  FIG. 1 · TWO GEOMETRIES — HYPER-LOCAL vs NICHE-GLOBAL
                </figcaption>
              </figure>

              <SubH>Same framework, different geometry.</SubH>

              {/* Comparison table — 5 rows × 3 cols.  Headers carry the
                  project marker; cells are plain prose.  Axis column at
                  160 px so longest labels ("CONCENTRATION", "VALIDATION
                  SIGNAL") have headroom.

                  Mobile horizontal scroll: viewport widths under ~600px
                  truncated the third column (VoltHop) earlier — the grid
                  was clipped by overflow-hidden.  Switched the outer to
                  overflow-x-auto and locked the inner grid to a 600px
                  minimum so columns keep their proportions and the user
                  can swipe to see the full table. */}
              <div className="my-[18px] overflow-x-auto rounded-[10px] border border-[#1F1F1F]/20 bg-[#F4F4F4]">
                <div className="grid min-w-[600px] grid-cols-[140px_1fr_1fr] items-stretch min-[700px]:min-w-0 min-[700px]:grid-cols-[170px_1fr_1fr]">
                  <div className="border-b border-[#1F1F1F]/15 px-[14px] py-[14px] text-[11px] tracking-[0.12em] font-medium text-[#5D5D5D]" style={{ fontFamily: MONO }}>
                    AXIS
                  </div>
                  <div className="flex items-center gap-[8px] border-b border-l border-[#1F1F1F]/15 px-[18px] py-[14px] text-[13px] font-medium text-[#1F1F1F]">
                    <PomesMark />
                    POMEs
                  </div>
                  <div className="flex items-center gap-[8px] border-b border-l border-[#1F1F1F]/15 px-[18px] py-[14px] text-[13px] font-medium text-[#1F1F1F]">
                    <VolthopMark />
                    VoltHop
                  </div>

                  {[
                    [
                      "Audience",
                      "Renters in one 80+ unit building.",
                      "Folding e-bike riders, niche-global.",
                    ],
                    [
                      "Concentration",
                      "Physical, in one elevator.",
                      "Digital, in 2–3 subreddits + FB groups.",
                    ],
                    [
                      "Motion",
                      "Ground game — audit, leaflet, watch the elevators.",
                      "Surface in the rooms — Reddit posts, FB asks, listen.",
                    ],
                    [
                      "Validation signal",
                      "Conversion rate by building × channel.",
                      "Reddit views, comments, upvote ratio, quote depth.",
                    ],
                    [
                      "Anchor channel",
                      "Elevator leaflet (95 of 97 conversions).",
                      "r/Brompton (deepest attachment).",
                    ],
                  ].map(([axis, p, v], i) => (
                    <Row3 key={axis} axis={axis} p={p} v={v} last={i === 4} />
                  ))}
                </div>
              </div>

              <PullQuote>
                You can&rsquo;t scatter a leaflet in r/Brompton, and a
                Reddit thread won&rsquo;t fit inside a Greenpoint elevator.
                The two motions are not interchangeable — they&rsquo;re
                answers to different geometries of the same question.
              </PullQuote>
            </Section>

            {/* ===== 03 POMEs · Ground game =====
                Banner dropped — the project name was already announced
                three times above (h1, hero stat group, sidenav).  Soonk
                flagged the redundant "Hyper-local · NYC buildings" tag
                as visual clutter; the section title now carries the one
                sentence the reader needs. */}
            <Section id="pomes">
              <Eyebrow>+ POMEs · Ground game</Eyebrow>
              <SectionHead
                n="03"
                title="I leafletted 9 buildings with my wife. 95 of 97 signups came from elevators."
              />

              {/* --- Targeting (bullet list, no prose) --- */}
              <SubH>Targeting</SubH>
              <ul className="my-[14px] flex max-w-[640px] flex-col gap-[10px]">
                {[
                  <>
                    Audited <Strong>60+ buildings</Strong> across 4 NYC
                    neighborhoods — LIC, Williamsburg, Greenpoint, Downtown
                    Brooklyn.
                  </>,
                  <>
                    Four filters: <Strong>80+ units</Strong>, doorman or
                    hybrid concierge, renter-heavy resident mix, multi-
                    elevator core.
                  </>,
                  <>
                    <Strong>Nine buildings</Strong> made the leafletting
                    shortlist; three Greenpoint towers carried the result.
                  </>,
                ].map((b, i) => (
                  <li
                    key={i}
                    className="relative pl-[22px] text-[16px] leading-[1.65] text-[#1F1F1F] before:absolute before:top-[12px] before:left-0 before:h-px before:w-[12px] before:bg-[#1F1F1F]"
                  >
                    {b}
                  </li>
                ))}
              </ul>

              {/* --- Execution methodology (process diagram on top, photo
                  proof underneath — Soonk's structure: methodology first,
                  then the receipts).  Four phases, each phase shows the
                  artifact it produced. */}
              <SubH>Execution · methodology</SubH>
              <Body>
                Each phase produced one artifact.  The diagram below is the
                actual sequence I ran across three weeks — leaflet → first
                email → app follow-up → in-building monitoring.
              </Body>

              <MethodologyDiagram />

              <SubH>Execution · in the field</SubH>

              <ProcessStep
                n="01"
                title="Designed the leaflet, tested four surfaces."
                body="Designed a QR-leaflet with the problem statement and a single ask. Tested it against four placement surfaces — elevators, lobbies, mailrooms/laundry, local cafés — to learn which surface earned the scan. Verdict: elevator. The 30-second captive window beat every other surface."
              />

              {/* Three-up strip — 2 field photos (Prepping, Posting) +
                  the leaflet design as the third panel.  Earlier 4-up
                  (right-side design image + 3 photos including the
                  mailroom) was visually noisy and the design got
                  cropped; this layout shows the artifact AND the
                  leafletting motion in one row.  Mailroom photo
                  retired. */}
              <PhotoStrip
                items={[
                  {
                    kind: "photo",
                    src: "/work/pomes/leaflet/01_prepping.jpg",
                    rot: "-1.2deg",
                    label: "01 · Prepping",
                  },
                  {
                    kind: "photo",
                    src: "/work/pomes/leaflet/02_posting.jpg",
                    rot: "0.8deg",
                    label: "02 · Posting",
                  },
                  {
                    kind: "design",
                    src: "/work/gtm/marketing/leaflet-design.png",
                    label: "03 · Leaflet · QR + problem statement",
                  },
                ]}
              />

              <ProcessStep
                n="02"
                title="Scanned → first email."
                body="Every QR scan went to a one-field form. The address (apt + building) seeded a quick first email that read like a neighbor, not a campaign — same building, same problem, here's what we're building."
                image="/work/gtm/marketing/1stemail.png"
                imageAlt="First email sent to a neighbor after they scanned the leaflet QR"
              />

              <ProcessStep
                n="03"
                title="App ready → second email with the live link."
                body="Once the app was live on TestFlight + Play, the second email landed in the same thread — the people who had said 'this would be useful' got the install link, in their inbox, in their building."
                image="/work/gtm/marketing/followup.png"
                imageAlt="Follow-up email with the live app link sent once the app shipped"
              />

              <ProcessStep
                n="04"
                title="Moved in, monitored, watched the interactions grow."
                body="I leased a unit in the highest-converting building and watched the early signups discover each other — first borrows, first favors, first event RSVPs. Joining the building was the only way to read the interactions the analytics couldn't."
                image="/work/gtm/marketing/joining.png"
                imageAlt="Early POMEs interactions inside the building — signups, borrows, favors"
              />

              {/* --- Conversion result (the headline number) --- */}
              <SubH>Result · Greenpoint owned every meaningful conversion.</SubH>
              <figure className="my-[24px] rounded-[12px] bg-[#F4F4F4] p-[24px]">
                <ConversionBarSvg />
                <figcaption className="mt-[8px] text-right text-[12px] tracking-[0.08em] text-[#5D5D5D]">
                  FIG. 2 · CONVERSION RATE BY BUILDING
                </figcaption>
              </figure>

              <p className="my-[18px] max-w-[640px] text-[16px] leading-[1.7] text-[#1F1F1F]">
                <Strong>95 of 97 conversions came from elevators.</Strong>{" "}
                Not lobbies. Not mailrooms. Not the QR card I tucked into
                package-room shelves.  People are alone, captive, and bored
                for thirty seconds in an elevator — that&rsquo;s the QR scan
                window.
              </p>

              <p
                className="mt-[28px] border-t border-[#A0A0A0] pt-[18px] text-[16px] text-[#5D5D5D]"
                style={{ fontStyle: "italic" }}
              >
                Full POMEs case study — neighborhood selection, building
                audit, design pivot →{" "}
                <Link
                  href="/work/pomes"
                  className="text-[#1F1F1F] underline decoration-[#A0A0A0] underline-offset-4 hover:decoration-[#1F1F1F]"
                >
                  POMEs page
                </Link>
              </p>
            </Section>

            {/* ===== 04 VoltHop · Digital community ===== */}
            <Section id="volthop">
              <Eyebrow>+ VoltHop · Digital community</Eyebrow>
              <SectionHead
                n="04"
                title="Lower views, fewer comments — but vastly more useful engagement."
              />

              <Lede>
                For VoltHop, the audience wasn&rsquo;t in a building — it was
                in a handful of digital rooms. I started by posting the same
                problem-framing question in <Strong>r/ebikes</Strong>{" "}
                (broad, ~430K members) and <Strong>r/Brompton</Strong>{" "}
                (niche, ~12K).  The numbers said broad won.  The conversation
                said the opposite.
              </Lede>

              <SubH>Phase 1 — the same post in two rooms.</SubH>
              <figure className="my-[24px]">
                <div className="relative w-full max-w-[640px] overflow-hidden rounded-[10px] border border-[#1F1F1F]/15 bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/work/gtm/reddit-brompton-post.png"
                    alt="VoltHop problem-framing post on r/Brompton — 3.7K views, 18 comments"
                    className="block h-auto w-full"
                  />
                </div>
                <figcaption
                  className="mt-[8px] text-[12px] tracking-[0.06em] text-[#5D5D5D]"
                  style={{ fontStyle: "italic" }}
                >
                  r/Brompton · the post that surfaced the attachment finding.
                </figcaption>
              </figure>

              {/* r/ebikes vs r/Brompton — 2-up.  Brompton card is the
                  inverted dark fill (the visual "this is the finding"
                  beat the brief calls out). */}
              <div className="my-[28px] grid grid-cols-1 gap-[16px] min-[700px]:grid-cols-2 min-[700px]:gap-[18px]">
                <RedditCard
                  variant="muted"
                  name="r/ebikes"
                  stats={[
                    { v: "11K", c: "views" },
                    { v: "35", c: "comments" },
                    { v: "8", c: "upvotes" },
                  ]}
                  mood={`"Just rent at the destination."`}
                  summary="Engagement was wide and shallow. Riders treated the e-bike as a generic transportation tool — most fixes pointed to rental kiosks or workarounds."
                  tag="GENERAL ATTACHMENT"
                />
                <RedditCard
                  variant="filled"
                  name="r/Brompton"
                  stats={[
                    { v: "3.7K", c: "views" },
                    { v: "18", c: "comments" },
                    { v: "9", c: "upvotes" },
                  ]}
                  mood={`"My Brompton has to come with me."`}
                  summary="A third the views, but the comments were product-shaping. Owners shared exact battery-handling rituals and what a rental partner would need to do."
                  tag="PERSONAL ATTACHMENT"
                />
              </div>

              <Body>
                Lower views, fewer comments — but vastly more useful
                engagement.  Brompton owners gave me product-shaping feedback.
                r/ebikes gave me workarounds.  The lesson:{" "}
                <Strong>niche communities with deeper attachment are worth
                more than broad communities with surface-level interest.
                </Strong>
              </Body>

              <SubH>What four owners actually said.</SubH>
              <div className="my-[18px] flex max-w-[680px] flex-col gap-[16px]">
                <RedditQuote
                  user="BassesNBikes"
                  sub="r/ebikes"
                  quote="Maybe we could invent Air BnBattery."
                  note="A user coined the product name three months before I did. The wedge was real before I built it."
                />
                <RedditQuote
                  user="JanCumin"
                  sub="r/Brompton"
                  quote="Brompton announced a rental scheme years ago and it never shipped — there's a market here that the company has just left on the table."
                  note="The category had an official-yet-stalled solution; that's where unofficial alternatives win."
                />
                <RedditQuote
                  user="ChaosCalmed"
                  sub="r/Brompton"
                  quote="A battery hire option would be great — the battery is the only thing I can't easily fly with."
                  note="Pinpointed the friction at the airport, not at the destination."
                />
                <RedditQuote
                  user="Deviantdefective"
                  sub="r/Brompton · Top 1%"
                  quote="Brompton should've solved this by now."
                  note="A Top 1% community contributor confirming the gap from inside the audience."
                />
              </div>

              <SubH>Where else the audience actually was.</SubH>
              <Body>
                The Reddit signal pointed me to four Facebook groups where
                Brompton and Tern riders share travel logistics, parts, and
                ride photos.  Three are active; one is the cautionary tale.
                The replies below are <Strong>real comments from real owners
                </Strong> — pulled directly from the outreach threads.
              </Body>

              {/* FB groups 2×2 — content sourced from the Marketing
                  Reactions DB in Notion (📘 Facebook 마케팅, 2026-04-11
                  snapshot).  Status + recent reply pairs are verbatim
                  except for light copy-edits for length. */}
              <div className="my-[18px] grid grid-cols-1 gap-[14px] min-[700px]:grid-cols-2 min-[700px]:gap-[16px]">
                <FbCard
                  name="Brompton Electric Owners"
                  status="Active"
                  role="Brompton enthusiasts who own the e-Brompton — the bullseye audience."
                  reply={{
                    user: "Stefani Lange",
                    body: "Oh this is exactly the gap I keep running into when I travel to see family — would love to test it.",
                  }}
                  note="Brompton Electric Owners reposted to the original launch thread; Anne Bennett comment is still pending a follow-up."
                />
                <FbCard
                  name="Brompton G Line Society"
                  status="Live · multi-language sweep"
                  role="Flagship G Line community.  English post live; DE/FR/NL/IT/ES/PT variants drafted for the EU sweep."
                  reply={{
                    user: "—",
                    body: "Posted on 2026-04-28 as part of the European Outreach Sweep — engagement collected against language-localized variants per country.",
                  }}
                  note="Logged in Marketing Reactions DB.  Sweep is the test for whether localized posts outperform a single English launch."
                />
                <FbCard
                  name="Tern Folding Bike Club"
                  status="Active · cross-brand reply"
                  role="Adjacent folder community — not Brompton, but the same airport-battery problem and the same workarounds."
                  reply={{
                    user: "Rick Park",
                    body: "I've shipped my battery via UPS Ground a couple times — works but it's a hassle. Something like VoltHop would honestly save me a chunk of the trip prep.",
                  }}
                  note="Tern reply was the first cross-brand validation — the problem isn't Brompton-specific.  Approved + scheduled."
                />
                <FbCard
                  name="FIIDO e-bike fans"
                  status="Low signal"
                  role="Lower-end folder community.  Posted same template; zero comments after two weeks."
                  reply={{
                    user: "—",
                    body: "Zero replies. Strategy review queued — likely the audience here owns one battery and never travels with the bike, so the rental wedge doesn't apply.",
                  }}
                  note="Kept in the case study because the absence of signal IS the signal — niche-global only works in rooms where the friction is felt."
                />
              </div>

              {/* Field photos — Brompton meetups, real photos from NYC.
                  Hand-rotated rotation strip à la POMEs §08 leaflet
                  photos, so the row reads as ground-truth evidence, not
                  catalog. */}
              <SubH>Meetups · the offline echo.</SubH>
              <div className="my-[18px] grid grid-cols-2 gap-[10px] min-[560px]:grid-cols-4 min-[560px]:gap-[14px]">
                {[
                  { src: "/work/gtm/meetups/brompton-meetup-01.jpeg", rot: "-1.2deg", alt: "Brompton meetup — group of folding bikes in Brooklyn" },
                  { src: "/work/gtm/meetups/brompton-meetup-02.jpg",  rot: "0.8deg",  alt: "Brompton meetup — riders prepping bikes" },
                  { src: "/work/gtm/meetups/brompton-meetup-03.jpeg", rot: "-0.6deg", alt: "Brompton meetup — folded bikes at a stop" },
                  { src: "/work/gtm/meetups/brompton-meetup-04.jpeg", rot: "1.0deg",  alt: "Brompton meetup — group ride waypoint" },
                ].map((p) => (
                  <figure
                    key={p.src}
                    className="m-0"
                    style={{ transform: `rotate(${p.rot})` }}
                  >
                    <div className="overflow-hidden rounded-[6px] border border-[#1F1F1F]/15 bg-white shadow-[0_2px_6px_rgba(0,0,0,0.06)]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.src}
                        alt={p.alt}
                        className="block aspect-[4/3] h-auto w-full object-cover"
                      />
                    </div>
                  </figure>
                ))}
              </div>

              <p
                className="mt-[28px] border-t border-[#A0A0A0] pt-[18px] text-[16px] text-[#5D5D5D]"
                style={{ fontStyle: "italic" }}
              >
                Full VoltHop case study — peer-to-peer battery rental,
                pre-build validation →{" "}
                <Link
                  href="/work/volthop"
                  className="text-[#1F1F1F] underline decoration-[#A0A0A0] underline-offset-4 hover:decoration-[#1F1F1F]"
                >
                  VoltHop page
                </Link>
              </p>
            </Section>

            {/* ===== 05 Channel learnings ===== */}
            <Section id="learnings">
              <Eyebrow>+ Channel learnings</Eyebrow>
              <SectionHead
                n="05"
                title="Three things both projects told me — once I stopped trying to make them say the same thing."
              />

              <div className="my-[28px] grid grid-cols-1 gap-[14px] min-[800px]:grid-cols-3">
                <LearningCard
                  numeral="i."
                  title="Find where the audience already is."
                  body="Don't import the audience to your channel — show up where they're already gathered. POMEs gathered in elevators. VoltHop gathered in r/Brompton. Both are pre-existing rooms; neither was built for me."
                />
                <LearningCard
                  numeral="ii."
                  title="Match motion to medium."
                  body="Physical concentration → physical channels won.  Digital concentration → digital channels won.  When I cross-applied (POMEs Instagram, VoltHop leafletting) the response was flat.  The medium has to fit the geometry."
                />
                <LearningCard
                  numeral="iii."
                  title="Ask first, sell later."
                  body="Both projects' best learnings came from listening.  The strongest VoltHop signal — a user coining the product name — happened in a thread that asked one question and made no pitch.  The strongest POMEs signal — Tower 77's 10.2% — came after a one-line leaflet that posed a question, not a feature."
                />
              </div>
            </Section>

            {/* ===== 06 Playbook ===== */}
            <Section id="playbook">
              <Eyebrow>+ Playbook</Eyebrow>
              <SectionHead
                n="06"
                title="If I had to do this again tomorrow — start here."
              />

              {/* Same number-block style as §03's ProcessStep: 28-px MONO
                  numeral baseline-aligned with the step title, body
                  underneath.  Earlier 44/56-px column treatment made the
                  Playbook numerals visibly larger than the ProcessStep
                  ones and the two sub-numberings read inconsistent. */}
              <ol className="my-[28px] flex flex-col gap-[28px]">
                {[
                  {
                    n: "01",
                    title: "Map the concentration first.",
                    body: "Before any channel touch, answer: where is the audience already gathered?  Is it a physical room (one building, one event, one corridor), a digital room (subreddit, FB group, niche forum), or a chronological window (the moment a specific friction appears)?  No answer here means no channel choice yet.",
                  },
                  {
                    n: "02",
                    title: "Match the motion to the geometry.",
                    body: "Physical concentration → physical occupation (leaflet, table, posters in the elevator).  Digital concentration → posting + listening in the room itself, never adjacent.  Resist the pull to default to whatever channel you're most comfortable with — the channel has to fit the geometry, not your habits.",
                  },
                  {
                    n: "03",
                    title: "Ship to learn, then optimize.",
                    body: "First touch is for signal, not conversion.  A leaflet in one building, a single post in one subreddit.  Read the response before scaling.  POMEs scaled the elevator after Tower 77 hit 10.2%; VoltHop kept posting in r/Brompton after the attachment finding landed.  Optimizing the wrong channel is the most expensive mistake.",
                  },
                ].map((s) => (
                  <li key={s.n} className="min-w-0">
                    <div className="mb-[10px] flex items-baseline gap-[12px]">
                      <span
                        className="text-[28px] leading-[0.9] font-extrabold tracking-[-0.03em] text-[#1F1F1F]"
                        style={{ fontFamily: MONO }}
                      >
                        {s.n}
                      </span>
                      <p className="text-[19px] leading-[1.3] font-medium text-[#1F1F1F]">
                        {s.title}
                      </p>
                    </div>
                    <p className="max-w-[640px] text-[14px] leading-[1.65] text-[#5D5D5D]">
                      {s.body}
                    </p>
                  </li>
                ))}
              </ol>

              <p
                className="my-[28px] max-w-[640px] border-l-2 border-[#1F1F1F] pl-[22px] text-[20px] leading-[1.45] text-[#1F1F1F]"
                style={{ fontStyle: "italic" }}
              >
                What I&rsquo;d change next: budget time for{" "}
                <em className="not-italic font-medium">&ldquo;Phase 0&rdquo;</em>{" "}
                — observation only — before any channel touch.  Both
                projects&rsquo; best learnings came from listening, not selling.
              </p>
            </Section>
          </main>
        </div>
      </div>

      {/* ---------- Footer ---------- */}
      <footer className="border-t border-[#A0A0A0] py-[36px]">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-[32px] text-[12px] text-[#A0A0A0]">
          <span>© 2026 Soonk Paik</span>
          <span>GTM Marketing Discovery</span>
        </div>
      </footer>
    </div>
  );
}

// ---- Local components -----------------------------------------------------

function Section({
  id,
  first = false,
  children,
}: {
  id: string;
  first?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={
        first
          ? "scroll-mt-[80px]"
          : "mt-[56px] scroll-mt-[80px] border-t border-[#A0A0A0] pt-[56px]"
      }
    >
      {children}
    </section>
  );
}

function Row3({
  axis,
  p,
  v,
  last,
}: {
  axis: string;
  p: string;
  v: string;
  last?: boolean;
}) {
  return (
    <>
      <div
        className={`px-[14px] py-[14px] text-[11px] tracking-[0.08em] font-medium whitespace-normal text-[#5D5D5D] ${
          last ? "" : "border-b border-[#1F1F1F]/15"
        }`}
        style={{ fontFamily: MONO }}
      >
        {axis.toUpperCase()}
      </div>
      <div
        className={`border-l border-[#1F1F1F]/15 px-[18px] py-[14px] text-[14px] leading-[1.55] text-[#1F1F1F] ${
          last ? "" : "border-b"
        }`}
      >
        {p}
      </div>
      <div
        className={`border-l border-[#1F1F1F]/15 px-[18px] py-[14px] text-[14px] leading-[1.55] text-[#1F1F1F] ${
          last ? "" : "border-b"
        }`}
      >
        {v}
      </div>
    </>
  );
}

// ---- Section 02 visualization ---------------------------------------------

// POMEs · hyper-local — reuse the NYC neighborhood map from the POMEs
// case study (Soonk's call: don't introduce a second hyper-local
// visualization, use the canonical one).  Same artwork the POMEs §08
// signature evidence figure relies on.
function MotionCardPomes() {
  return (
    <div className="flex flex-col gap-[14px] rounded-[12px] bg-[#F4F4F4] p-[20px]">
      <div className="flex items-center gap-[10px]">
        <PomesMark />
        <span
          className="text-[11px] tracking-[0.18em] font-medium text-[#1F1F1F]"
          style={{ fontFamily: MONO }}
        >
          POMES · HYPER-LOCAL
        </span>
      </div>

      <NycMapSvg />

      <p className="text-[13px] leading-[1.5] text-[#5D5D5D]">
        ~60 people concentrated in a single building.  Everyone in the same
        physical place, every day.
      </p>
    </div>
  );
}

// NycMapSvg — duplicate of the POMEs case study Fig. 3 NYC map so the
// GTM page can render the canonical hyper-local viz without importing
// from a sibling route.
function NycMapSvg() {
  return (
    <svg
      viewBox="0 0 300 280"
      xmlns="http://www.w3.org/2000/svg"
      className="block h-auto w-full max-h-[280px]"
      aria-label="NYC neighborhood map — Tower 77 Greenpoint hit 10.2% conversion"
    >
      <path
        d="M 35 20 Q 20 100, 40 180 T 35 270"
        fill="none"
        stroke="#A0A0A0"
        strokeWidth="0.5"
        strokeDasharray="3 3"
      />
      <text
        x="22"
        y="155"
        fontSize="9"
        fill="#A0A0A0"
        transform="rotate(80 22 155)"
        letterSpacing="0.05em"
        fontFamily="Archivo"
      >
        East River
      </text>
      <circle cx="105" cy="35" r="3" fill="#A0A0A0" />
      <text x="118" y="32" fontSize="11" fill="#5D5D5D" fontWeight="500" fontFamily="Archivo">
        LIC
      </text>
      <text x="118" y="46" fontSize="9" fill="#A0A0A0" fontFamily="Archivo">
        3 signups · 0.8%
      </text>
      <circle cx="118" cy="100" r="3" fill="#A0A0A0" />
      <text x="131" y="97" fontSize="11" fill="#5D5D5D" fontWeight="500" fontFamily="Archivo">
        Greenpoint
      </text>
      <text x="131" y="111" fontSize="9" fill="#A0A0A0" fontFamily="Archivo">
        88 signups · 3 buildings
      </text>
      <text x="160" y="148" fontSize="22" fontWeight="500" textAnchor="middle" fill="#1F1F1F" fontFamily="Archivo">
        ★
      </text>
      <text x="178" y="148" fontSize="13" fontWeight="500" fill="#1F1F1F" fontFamily="Archivo">
        Tower 77
      </text>
      <text x="178" y="164" fontSize="10" fill="#5D5D5D" fontFamily="Archivo">
        54 signups · 10.2%
      </text>
      <circle cx="115" cy="200" r="3" fill="#A0A0A0" />
      <text x="128" y="197" fontSize="11" fill="#5D5D5D" fontWeight="500" fontFamily="Archivo">
        Williamsburg
      </text>
      <text x="128" y="211" fontSize="9" fill="#A0A0A0" fontFamily="Archivo">
        3 signups · 0.4%
      </text>
      <circle cx="100" cy="252" r="3" fill="#A0A0A0" />
      <text x="113" y="249" fontSize="11" fill="#5D5D5D" fontWeight="500" fontFamily="Archivo">
        Downtown BK
      </text>
      <text x="113" y="263" fontSize="9" fill="#A0A0A0" fontFamily="Archivo">
        untested
      </text>
    </svg>
  );
}

// VoltHop · niche-global — dashed world frame with ~30 scattered dots
// and three highlighted cluster nodes.
function MotionCardVolthop() {
  // Scattered grey dots
  const seeds = [
    [38, 60], [54, 32], [78, 80], [108, 50], [132, 28],
    [170, 60], [196, 36], [224, 70], [56, 110], [90, 130],
    [122, 102], [156, 132], [188, 110], [220, 132], [40, 158],
    [78, 184], [110, 174], [148, 190], [180, 162], [212, 184],
    [60, 200], [96, 96], [142, 70], [206, 100], [70, 76],
    [134, 158], [168, 186], [200, 70], [82, 50], [222, 158],
  ];
  // Three cluster nodes (highlighted)
  const clusters: { x: number; y: number; label: string }[] = [
    { x: 92, y: 90, label: "r/Brompton" },
    { x: 178, y: 96, label: "r/ebikes" },
    { x: 130, y: 168, label: "FB groups" },
  ];

  return (
    <div className="flex flex-col gap-[14px] rounded-[12px] bg-[#F4F4F4] p-[20px]">
      <div className="flex items-center gap-[10px]">
        <VolthopMark />
        <span
          className="text-[11px] tracking-[0.18em] font-medium text-[#1F1F1F]"
          style={{ fontFamily: MONO }}
        >
          VOLTHOP · NICHE-GLOBAL
        </span>
      </div>

      <svg
        viewBox="0 0 280 240"
        xmlns="http://www.w3.org/2000/svg"
        className="block h-auto w-full max-h-[260px]"
        aria-label="Niche-global scatter — dozens of riders globally, three online cluster nodes"
      >
        {/* World frame — dashed */}
        <rect
          x="20"
          y="20"
          width="240"
          height="200"
          fill="none"
          stroke="#A0A0A0"
          strokeWidth="0.8"
          strokeDasharray="4 4"
        />
        {/* Globe ellipse hint */}
        <ellipse
          cx={140}
          cy={120}
          rx={108}
          ry={78}
          fill="none"
          stroke="#A0A0A0"
          strokeWidth="0.4"
          strokeDasharray="2 3"
          opacity={0.6}
        />
        {/* Cluster connector lines */}
        {clusters.map((c, i) => {
          const next = clusters[(i + 1) % clusters.length];
          return (
            <line
              key={i}
              x1={c.x}
              y1={c.y}
              x2={next.x}
              y2={next.y}
              stroke="#1F1F1F"
              strokeWidth="0.6"
              strokeDasharray="3 3"
              opacity={0.4}
            />
          );
        })}
        {/* Scattered grey dots */}
        {seeds.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={1.6} fill="#A0A0A0" />
        ))}
        {/* Cluster nodes — bigger, dark */}
        {clusters.map((c) => (
          <g key={c.label}>
            <circle cx={c.x} cy={c.y} r={9} fill="#1F1F1F" />
            <text
              x={c.x}
              y={c.y + 22}
              textAnchor="middle"
              fontSize={9}
              fill="#1F1F1F"
              fontFamily="Archivo"
              fontWeight={500}
            >
              {c.label}
            </text>
          </g>
        ))}
      </svg>

      <p className="text-[13px] leading-[1.5] text-[#5D5D5D]">
        Thousands of folding e-bike owners scattered globally — but
        congregating in a handful of online rooms.
      </p>
    </div>
  );
}

// ---- Section 03 conversion bar (mono-palette adaptation) ------------------

function ConversionBarSvg() {
  const rows: { label: string; v: number; emph?: boolean }[] = [
    { label: "Tower 77 (Greenpoint)", v: 10.2, emph: true },
    { label: "Greenpoint Central",   v: 5.0 },
    { label: "1 Bell Slip",           v: 4.8 },
    { label: "LIC buildings (avg)",   v: 1.0 },
    { label: "Atelier (Williamsburg)",v: 0.4 },
  ];
  const max = 11;          // y-axis upper bound
  const barMaxW = 360;
  return (
    <svg
      viewBox="0 0 520 240"
      xmlns="http://www.w3.org/2000/svg"
      className="block h-auto w-full"
      aria-label="Conversion rate by building — Tower 77 hit 10.2%, twice the next-best"
    >
      <text
        x={0}
        y={14}
        fontSize={10}
        fill="#A0A0A0"
        letterSpacing="0.06em"
        fontFamily="Archivo"
      >
        CONVERSION RATE · TOP BUILDINGS (LEAFLET → SIGNUP)
      </text>
      {rows.map((r, i) => {
        const y = 38 + i * 38;
        const w = (r.v / max) * barMaxW;
        return (
          <g key={r.label}>
            <text
              x={0}
              y={y}
              fontSize={11}
              fill={r.emph ? "#1F1F1F" : "#5D5D5D"}
              fontWeight={r.emph ? 600 : 400}
              fontFamily="Archivo"
            >
              {r.label}
            </text>
            <rect
              x={0}
              y={y + 6}
              width={w}
              height={16}
              fill={r.emph ? "#1F1F1F" : "#A0A0A0"}
              rx={2}
            />
            <text
              x={w + 8}
              y={y + 19}
              fontSize={12}
              fill="#1F1F1F"
              fontWeight={r.emph ? 600 : 400}
              fontFamily="Archivo"
            >
              {r.v.toFixed(1)}%
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ---- Section 03 process helpers ------------------------------------------

// MethodologyDiagram — the 4-phase process bar that sits ABOVE the
// per-phase photo sections.  Reads left-to-right (or top-to-bottom on
// mobile): leaflet → first email → app follow-up → in-building monitor.
// Each node carries the artifact name; the connecting line is the
// timeline.
function MethodologyDiagram() {
  const phases = [
    { n: "01", t: "Leaflet", sub: "QR · 4 surfaces tested" },
    { n: "02", t: "First email", sub: "after the scan" },
    { n: "03", t: "App follow-up", sub: "live link in the same thread" },
    { n: "04", t: "Move in · monitor", sub: "watch the interactions land" },
  ];
  return (
    <div className="my-[22px] rounded-[12px] bg-[#F4F4F4] px-[20px] py-[22px] tablet:px-[28px] tablet:py-[26px]">
      <p
        className="mb-[18px] text-[11px] tracking-[0.16em] font-medium text-[#5D5D5D]"
        style={{ fontFamily: MONO }}
      >
        FIG. 2 · FOUR-PHASE GTM PROCESS
      </p>
      {/* On desktop the four nodes lay out as a horizontal row with a
          hairline connecting them; on mobile they stack and the connector
          becomes a vertical bar on the left. */}
      <ol className="relative grid grid-cols-1 gap-[18px] min-[700px]:grid-cols-4 min-[700px]:gap-[12px]">
        {phases.map((p, i) => (
          <li
            key={p.n}
            className="relative flex items-start gap-[12px] min-[700px]:flex-col min-[700px]:gap-[10px]"
          >
            <span
              className="flex size-[36px] shrink-0 items-center justify-center rounded-full bg-[#1F1F1F] text-[12px] font-semibold text-[#F4F4F4]"
              style={{ fontFamily: MONO }}
            >
              {p.n}
            </span>
            <div className="min-w-0">
              <p className="text-[15px] leading-[1.3] font-medium text-[#1F1F1F]">
                {p.t}
              </p>
              <p className="mt-[2px] text-[12px] leading-[1.5] text-[#5D5D5D]">
                {p.sub}
              </p>
            </div>
            {/* Connector to the next node — horizontal on desktop, hidden
                on mobile (the natural vertical stack reads as the chain). */}
            {i < phases.length - 1 && (
              <span
                aria-hidden
                className="absolute top-[18px] left-[44px] hidden h-px bg-[#1F1F1F]/30 min-[700px]:left-[36px] min-[700px]:right-[-6px] min-[700px]:block"
              />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

// ProcessStep — one numbered phase row.  When an `image` is passed the
// row becomes a 2-col layout (text + asset).  Without an image the
// text spans full width — used for phase 01 where the leaflet artifact
// now lives in the PhotoStrip below instead of pinned to the right.
// Asset images use object-contain (NOT cover): reviewers flagged that
// the earlier cover crop chopped half the artifact off; contain lets
// the full leaflet / email screenshot render even when aspect-ratios
// don't match the slot.
function ProcessStep({
  n,
  title,
  body,
  image,
  imageAlt,
}: {
  n: string;
  title: string;
  body: string;
  image?: string;
  imageAlt?: string;
}) {
  const hasImage = Boolean(image);
  return (
    <div
      className={`my-[28px] grid grid-cols-1 items-start gap-[24px] ${
        hasImage ? "min-[700px]:grid-cols-[1fr_320px] min-[700px]:gap-[32px]" : ""
      }`}
    >
      <div className="min-w-0">
        <div className="mb-[10px] flex items-baseline gap-[12px]">
          <span
            className="text-[28px] leading-[0.9] font-extrabold tracking-[-0.03em] text-[#1F1F1F]"
            style={{ fontFamily: MONO }}
          >
            {n}
          </span>
          <p className="text-[19px] leading-[1.3] font-medium text-[#1F1F1F]">
            {title}
          </p>
        </div>
        <p className="max-w-[640px] text-[15px] leading-[1.65] text-[#5D5D5D]">
          {body}
        </p>
      </div>
      {hasImage && (
        <div className="w-full rounded-[10px] border border-[#1F1F1F]/15 bg-white p-[8px] shadow-[0_2px_6px_rgba(0,0,0,0.06)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={imageAlt ?? ""}
            className="block h-auto max-h-[420px] w-full object-contain"
          />
        </div>
      )}
    </div>
  );
}

// PhotoStrip — 3-up row that mixes two item kinds:
//   • photo  — a hand-rotated field photo (polaroid feel).
//   • design — a flat artifact screenshot, NOT rotated, NOT cropped.
// Earlier 4-up version (image right of ProcessStep + 3 photos
// including the mailroom) cracked the layout and cropped the leaflet
// design.  Soonk's call: 3 panels max, mailroom out, design slotted
// into the third position with object-contain.
type StripItem =
  | { kind: "photo"; src: string; rot: string; label: string }
  | { kind: "design"; src: string; label: string };

function PhotoStrip({ items }: { items: StripItem[] }) {
  // Grid's default items-stretch makes every figure equal-height; the
  // figure-level flex-col + flex-1 on the image container lets each
  // image fill that shared height (rather than each item shrinking to
  // its natural ratio).  Result: the leaflet-design panel sets the
  // row height and the two field photos grow to meet it.
  return (
    <div className="my-[18px] grid grid-cols-1 gap-[14px] min-[560px]:grid-cols-3 min-[560px]:gap-[14px]">
      {items.map((p) => {
        if (p.kind === "photo") {
          return (
            <figure
              key={p.src}
              className="m-0 flex flex-col"
              style={{ transform: `rotate(${p.rot})` }}
            >
              <div className="min-h-[280px] flex-1 overflow-hidden rounded-[6px] border border-[#1F1F1F]/15 bg-white shadow-[0_2px_6px_rgba(0,0,0,0.06)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.src}
                  alt={p.label}
                  className="block h-full w-full object-cover"
                />
              </div>
              <figcaption
                className="mt-[5px] text-[10px] tracking-[0.08em] text-[#A0A0A0]"
                style={{ fontFamily: MONO }}
              >
                {p.label}
              </figcaption>
            </figure>
          );
        }
        // design — flat, no rotation, full content via object-contain.
        // The min-h here anchors the row height so the photo cells (which
        // would otherwise collapse to their natural 4:3) match.
        return (
          <figure key={p.src} className="m-0 flex flex-col">
            <div className="flex min-h-[280px] flex-1 items-center justify-center overflow-hidden rounded-[6px] border border-[#1F1F1F]/15 bg-white p-[8px] shadow-[0_2px_6px_rgba(0,0,0,0.06)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.src}
                alt={p.label}
                className="block h-auto max-h-[420px] w-full object-contain"
              />
            </div>
            <figcaption
              className="mt-[5px] text-[10px] tracking-[0.08em] text-[#A0A0A0]"
              style={{ fontFamily: MONO }}
            >
              {p.label}
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}

// ---- Section 04 components ------------------------------------------------

function RedditCard({
  variant,
  name,
  stats,
  mood,
  summary,
  tag,
}: {
  variant: "muted" | "filled";
  name: string;
  stats: { v: string; c: string }[];
  mood: string;
  summary: string;
  tag: string;
}) {
  const filled = variant === "filled";
  return (
    <div
      className={`flex flex-col gap-[14px] rounded-[12px] px-[22px] py-[22px] ${
        filled
          ? "bg-[#1F1F1F] text-[#F4F4F4]"
          : "bg-[#F4F4F4] text-[#1F1F1F]"
      }`}
    >
      <div
        className={`flex items-center justify-between text-[16px] font-medium ${
          filled ? "text-[#F4F4F4]" : "text-[#1F1F1F]"
        }`}
      >
        <span>{name}</span>
        <span
          className={`rounded-[3px] px-[7px] py-[3px] text-[10px] tracking-[0.12em] font-bold ${
            filled
              ? "bg-[#F4F4F4] text-[#1F1F1F]"
              : "bg-[#1F1F1F] text-[#F4F4F4]"
          }`}
          style={{ fontFamily: MONO }}
        >
          {tag}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-[12px]">
        {stats.map((s) => (
          <div key={s.c} className="flex flex-col gap-[2px]">
            <span
              className={`text-[20px] leading-[1] font-medium ${
                filled ? "text-[#F4F4F4]" : "text-[#1F1F1F]"
              }`}
              style={{ fontFamily: MONO }}
            >
              {s.v}
            </span>
            <span
              className={`text-[11px] ${
                filled ? "text-[#A0A0A0]" : "text-[#5D5D5D]"
              }`}
            >
              {s.c}
            </span>
          </div>
        ))}
      </div>

      <p
        className={`text-[16px] leading-[1.45] italic ${
          filled ? "text-[#F4F4F4]" : "text-[#1F1F1F]"
        }`}
      >
        {mood}
      </p>

      <p
        className={`text-[13px] leading-[1.6] ${
          filled ? "text-[#D9D9D9]" : "text-[#5D5D5D]"
        }`}
      >
        {summary}
      </p>
    </div>
  );
}

function RedditQuote({
  user,
  sub,
  quote,
  note,
}: {
  user: string;
  sub: string;
  quote: string;
  note: string;
}) {
  return (
    <div className="grid grid-cols-[120px_1fr] items-start gap-[14px] rounded-[10px] bg-[#F4F4F4] px-[18px] py-[14px] min-[560px]:grid-cols-[160px_1fr] min-[560px]:gap-[18px]">
      <div className="flex flex-col gap-[2px]">
        <span
          className="text-[12px] tracking-[0.04em] font-medium text-[#1F1F1F]"
          style={{ fontFamily: MONO }}
        >
          u/{user}
        </span>
        <span className="text-[11px] text-[#5D5D5D]">{sub}</span>
      </div>
      <div className="flex flex-col gap-[4px]">
        <p className="text-[15px] leading-[1.45] italic text-[#1F1F1F]">
          &ldquo;{quote}&rdquo;
        </p>
        <p className="text-[12px] leading-[1.5] text-[#5D5D5D]">→ {note}</p>
      </div>
    </div>
  );
}

// FbCard — one Facebook group panel.  Header (group name + status pill),
// role line (what the group is), then a real comment block with the
// commenter's handle, the verbatim reply, and an editorial note (what
// the reply told me).  Content for these cards is sourced from the
// Marketing Reactions DB in Notion — not synthesized.
function FbCard({
  name,
  status,
  role,
  reply,
  note,
}: {
  name: string;
  status: string;
  role: string;
  reply: { user: string; body: string };
  note: string;
}) {
  return (
    <div className="flex flex-col gap-[14px] rounded-[10px] bg-[#F4F4F4] px-[20px] py-[18px]">
      <div className="flex flex-wrap items-center justify-between gap-[8px]">
        <p className="text-[15px] font-medium leading-[1.2] text-[#1F1F1F]">
          {name}
        </p>
        <span
          className="rounded-[3px] bg-[#1F1F1F] px-[7px] py-[3px] text-[10px] tracking-[0.12em] font-bold text-[#F4F4F4]"
          style={{ fontFamily: MONO }}
        >
          {status.toUpperCase()}
        </span>
      </div>
      <p className="text-[12px] leading-[1.55] text-[#5D5D5D]">{role}</p>
      {/* Reply block — verbatim comment from the group, with the
          commenter handle on a small caption line. */}
      <div className="border-l-2 border-[#1F1F1F] pl-[14px]">
        <p
          className="text-[11px] tracking-[0.04em] font-medium text-[#1F1F1F]"
          style={{ fontFamily: MONO }}
        >
          {reply.user}
        </p>
        <p className="mt-[4px] text-[13px] leading-[1.55] italic text-[#1F1F1F]">
          &ldquo;{reply.body}&rdquo;
        </p>
      </div>
      <p className="text-[12px] leading-[1.6] text-[#5D5D5D]">→ {note}</p>
    </div>
  );
}

// ---- Section 05 learning card --------------------------------------------

function LearningCard({
  numeral,
  title,
  body,
}: {
  numeral: string;
  title: string;
  body: string;
}) {
  return (
    <div className="flex flex-col gap-[12px] rounded-[12px] bg-[#F4F4F4] px-[22px] py-[24px]">
      <span
        className="text-[24px] leading-[1] italic text-[#1F1F1F]"
        style={{ fontFamily: "serif" }}
      >
        {numeral}
      </span>
      <p className="text-[18px] leading-[1.3] font-medium text-[#1F1F1F]">
        {title}
      </p>
      <p className="text-[14px] leading-[1.6] text-[#5D5D5D]">{body}</p>
    </div>
  );
}
