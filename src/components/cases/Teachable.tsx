// Teachable Advanced Reporting case study (project 06 in the canonical list).
//
// Spec source: /Volumes/External/Portfolio_Website_26/_spec_teachable.md
// Round-2 feedback applied: leaner hero (logo + better image + 3-row meta),
// no ribbon, no scroll cue, eyebrows unified with the left-nav labels,
// scarcity callout reframed so "0 native analytics features" carries the
// hire-signal weight, personas relocated to §03 (where the cut happens),
// persona-triage diagram replaced with a single text-led "why dropped"
// block, §04 lede rewritten with the WHY (weekly visit = real signal),
// cohort + 4-tool grid removed, PROVES line dropped.
//
// Visual system mirrors Volthop/Toyota — pure monochrome, sharp 2px borders,
// no chromatic accent.  Site palette: #EEEEEE ground / #1F1F1F ink.
//
// Layout split (Toyota pattern):
//   §01 Hero        — full-bleed, no left nav (max-w-[1200px] internal)
//   §02–05          — left sticky nav (140px) + content column

import CaseStudyLeftNav, {
  type CaseStudySection,
} from "@/components/cases/CaseStudyLeftNav";

const MONO: React.CSSProperties = {
  fontFamily:
    "var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
};

const SERIF: React.CSSProperties = {
  fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
};

const SECTIONS: CaseStudySection[] = [
  { id: "state", num: "02", label: "State" },
  { id: "scope-cut", num: "03", label: "Scope cut", star: true },
  { id: "instrumentation", num: "04", label: "Instrumentation", star: true },
  { id: "reframe", num: "05", label: "Reframe", star: true },
];

// ============================================================================
// Reusable atoms — match Volthop weights for visual continuity.
// ============================================================================

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[11px] tracking-[0.18em] font-medium text-[#5D5D5D]"
      style={MONO}
    >
      {children}
    </p>
  );
}

function SectionNumber({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[64px] leading-[0.85] font-extrabold tracking-[-0.04em] text-[#1F1F1F] tablet:text-[88px]"
      style={MONO}
    >
      {children}
    </p>
  );
}

function Headline({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[24px] leading-[1.25] font-black text-[#1F1F1F] tablet:text-[28px]">
      {children}
    </h2>
  );
}

function Lede({ children }: { children: React.ReactNode }) {
  return (
    <p className="max-w-[640px] text-[15px] leading-[1.7] font-normal text-[#1F1F1F] tablet:text-[16px]">
      {children}
    </p>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <p className="max-w-[640px] text-[14px] leading-[1.75] font-normal text-[#5D5D5D]">
      {children}
    </p>
  );
}

function PullQuote({
  children,
  attribution,
}: {
  children: React.ReactNode;
  attribution?: string;
}) {
  return (
    <figure className="max-w-[560px] border-l-2 border-[#1F1F1F] pl-[18px]">
      <blockquote
        className="text-[20px] leading-[1.45] italic text-[#1F1F1F]"
        style={SERIF}
      >
        {children}
      </blockquote>
      {attribution && (
        <figcaption className="mt-[10px] text-[12px] text-[#5D5D5D]">
          {attribution}
        </figcaption>
      )}
    </figure>
  );
}

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
// §01 Hero — project number + logo + wordmark + tagline + slim 3-row meta.
// No timeline ribbon, no scroll cue, no full-bleed bottom border.
// ============================================================================

function SectionHero() {
  return (
    <section
      id="intro"
      className="pt-[48px] pb-[64px] tablet:pt-[64px] tablet:pb-[96px]"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col gap-[36px] px-[32px]">
        <Eyebrow>+ 01 / Intro</Eyebrow>

        {/* Display: logo + wordmark, then subtitle.  Wordmark weight +
            leading + tracking mirror the POMEs hero so the two founder-grade
            case studies anchor the same display rhythm. */}
        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-wrap items-end gap-[18px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/work/logos/teachable_logo.png"
              alt=""
              aria-hidden
              className="h-[56px] w-auto object-contain tablet:h-[96px]"
            />
            <h1 className="text-[64px] leading-[0.9] font-black tracking-[-0.05em] text-[#1F1F1F] tablet:text-[120px]">
              Teachable
            </h1>
          </div>
          <p className="text-[18px] tracking-[-0.01em] font-normal text-[#5D5D5D] tablet:text-[22px]">
            Advanced Reporting
          </p>
        </div>

        {/* Tagline */}
        <p className="max-w-[600px] text-[20px] leading-[1.4] font-medium text-[#1F1F1F] tablet:text-[22px]">
          Designed the report. Designed how it would be measured. Then refused
          to read low usage as failure.
        </p>

        {/* Two-column row: hero image (flexes) + 3-row meta block on right. */}
        <div className="grid gap-[36px] tablet:grid-cols-[1fr_320px] tablet:items-start tablet:gap-[48px]">
          {/* Hero image — the polished dashboard, 16:9 to honor the source
              asset's aspect ratio without cropping. */}
          <div className="relative aspect-video w-full overflow-clip border-2 border-[#1F1F1F]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/work/teachable/advanced-reporting.jpeg"
              alt="Teachable Advanced Reporting — the shipped dashboard"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          {/* Slim meta block — ROLE, TIMELINE, OUTCOME only.  Scope + Stack
              cut per feedback to remove noise around the result. */}
          <dl className="border-t border-[#1F1F1F]/30">
            {[
              { label: "ROLE", value: "Solo IC · end-to-end" },
              { label: "TIMELINE", value: "2022" },
              {
                label: "OUTCOME",
                value: "87% engagement vs previous 20% (4.4× lift)",
                bold: true,
              },
            ].map(({ label, value, bold }) => (
              <div
                key={label}
                className="flex flex-wrap items-baseline gap-[14px] border-b border-[#1F1F1F]/30 py-[12px]"
              >
                <dt
                  className="w-[90px] shrink-0 text-[11px] tracking-[0.14em] font-medium text-[#5D5D5D]"
                  style={MONO}
                >
                  {label}
                </dt>
                <dd
                  className={`flex-1 text-[14px] leading-[1.5] text-[#1F1F1F] tablet:text-[15px] ${
                    bold ? "font-semibold" : "font-normal"
                  }`}
                >
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// §02 State — scarcity callout with the "0" inverted to carry weight, plus a
// short paragraph explaining the cost-cycle / revenue tie.  Personas moved
// out of this section per feedback (they belong in §03 where the cut happens).
// ============================================================================

function ScarcityCallout() {
  return (
    <div className="border-2 border-[#1F1F1F] bg-[#F8F8F8] p-[20px] tablet:p-[24px]">
      <p
        className="mb-[16px] text-[11px] tracking-[0.12em] font-medium text-[#5D5D5D]"
        style={MONO}
      >
        SCARCITY · what didn&rsquo;t exist
      </p>
      <div className="grid grid-cols-1 gap-[14px] tablet:grid-cols-[1fr_1fr_1.3fr]">
        {/* Two contextual stats — normal weight */}
        <div className="flex flex-col gap-[4px]">
          <span className="text-[32px] leading-[1] font-medium tracking-[-0.02em] text-[#1F1F1F]">
            40K
          </span>
          <span className="text-[12px] leading-[1.45] text-[#5D5D5D]">
            active subscriber schools
          </span>
        </div>
        <div className="flex flex-col gap-[4px]">
          <span className="text-[32px] leading-[1] font-medium tracking-[-0.02em] text-[#1F1F1F]">
            ~5%
          </span>
          <span className="text-[12px] leading-[1.45] text-[#5D5D5D]">
            using UTMs (~2K of 40K)
          </span>
        </div>

        {/* The gap — inverted block, oversized number, carries the weight */}
        <div className="flex flex-col gap-[6px] bg-[#1F1F1F] px-[16px] py-[14px]">
          <span
            className="text-[10px] tracking-[0.14em] font-medium text-[#EEEEEE]/60"
            style={MONO}
          >
            THE GAP
          </span>
          <span
            className="text-[52px] leading-[0.9] font-extrabold tracking-[-0.04em] text-[#EEEEEE]"
            style={MONO}
          >
            0
          </span>
          <span className="text-[12px] leading-[1.45] text-[#EEEEEE]/85">
            native analytics features
          </span>
        </div>
      </div>
    </div>
  );
}

function SectionState() {
  return (
    <section
      id="state"
      className="py-[48px] first:pt-0 tablet:py-[64px]"
    >
      <div className="flex flex-col gap-[28px]">
        <SectionHeader
          number="02"
          eyebrow="State"
          headline={
            <>
              40,000 schools, no analytics tool.
              <br aria-hidden />
              They were guessing.
            </>
          }
          lede="When I joined Teachable, school owners were running creator businesses without numbers. The workaround everyone landed on: a separate Squarespace or WordPress site with Google Analytics — plus the persistent worry they'd set it up wrong. The native platform had no dashboard at all."
        />

        <ScarcityCallout />

        {/* Problem explanation — the cost-cycle + revenue tie that makes the
            zero a real product gap, not a missing-feature footnote. */}
        <Body>
          The cost of zero analytics didn&rsquo;t land on Teachable. It landed
          on the schools — extra setup on a second site, hosting bills,
          configuration anxiety. And the revenue tie ran straight back:
          Teachable&rsquo;s subscriber business is downstream of school
          success. When schools can&rsquo;t read their own numbers, they
          can&rsquo;t grow, retention dips, and the platform loses the upside
          of its own creators getting bigger. A native dashboard wasn&rsquo;t
          a quality-of-life feature. It was a growth lever Teachable
          didn&rsquo;t have yet.
        </Body>
      </div>
    </section>
  );
}

// ============================================================================
// §03 Scope cut ★ — proto-personas + lo-fi sketches + the cut + decision.
// Personas relocated here.  Persona-triage diagram replaced with a single
// text-led "why dropped" block (no need to re-show the persona cards).
// PROVES line removed.
// ============================================================================

function PersonaCard({
  label,
  quote,
  body,
}: {
  label: string;
  quote: string;
  body: string;
}) {
  return (
    <article className="flex flex-col gap-[12px] border border-[#1F1F1F]/30 bg-[#F8F8F8] p-[18px]">
      <p
        className="text-[10px] tracking-[0.18em] font-medium text-[#5D5D5D]"
        style={MONO}
      >
        {label}
      </p>
      <blockquote
        className="text-[16px] leading-[1.45] italic text-[#1F1F1F]"
        style={SERIF}
      >
        “{quote}”
      </blockquote>
      <p className="text-[12px] leading-[1.6] text-[#5D5D5D]">{body}</p>
    </article>
  );
}

function LoFiCard({
  src,
  alt,
  optionNum,
  state,
  title,
  sub,
}: {
  src: string;
  alt: string;
  optionNum: string;
  state: "CHOSEN" | "DROPPED";
  title: string;
  sub: string;
}) {
  const chosen = state === "CHOSEN";
  return (
    <article
      className={`flex flex-col overflow-clip ${
        chosen
          ? "border-2 border-[#1F1F1F] bg-[#F8F8F8]"
          : "border border-[#1F1F1F]/30"
      }`}
    >
      <div className="relative aspect-[4/3] w-full overflow-clip bg-[#EEEEEE]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className={`absolute inset-0 h-full w-full object-cover ${
            chosen ? "opacity-100" : "opacity-55"
          }`}
        />
      </div>
      <div className="flex flex-col gap-[6px] p-[14px]">
        <p
          className="text-[10px] tracking-[0.12em] font-medium"
          style={MONO}
        >
          <span className="text-[#5D5D5D]">{optionNum}</span>
          <span className={chosen ? "text-[#1F1F1F]" : "text-[#A0A0A0]"}>
            {" · "}
            {state}
          </span>
        </p>
        <h4 className="text-[14px] leading-[1.3] font-medium text-[#1F1F1F]">
          {title}
        </h4>
        <p className="text-[12px] leading-[1.55] text-[#5D5D5D]">{sub}</p>
      </div>
    </article>
  );
}

// Combined "why we dropped Advanced" + "what V1 shipped" block.  Replaces
// the earlier 3-column Persona Triage diagram.  Rendered as a tinted band
// rather than a bordered card so it doesn't visually compete with the
// persona + lo-fi card grids that sit directly above it.
function WhyDropAdvanced() {
  return (
    <div className="bg-[#1F1F1F]/[0.05] px-[24px] py-[28px] tablet:px-[36px] tablet:py-[32px]">
      <p
        className="text-[10px] tracking-[0.12em] font-medium text-[#5D5D5D]"
        style={MONO}
      >
        PERSONA / CUT · WHY
      </p>
      <h3 className="mt-[10px] max-w-[760px] text-[20px] leading-[1.3] font-semibold text-[#1F1F1F]">
        The advanced persona didn&rsquo;t make V1. Two reasons, neither was
        roadmap deferral.
      </h3>
      <div className="mt-[20px] grid gap-[14px] tablet:grid-cols-2">
        {[
          [
            "①",
            "DB doesn't provide precise UTM-triggered data — technical infeasibility.",
          ],
          [
            "②",
            "Only ~2K of 40K schools (~5%) actively use UTMs — would build for the smallest segment.",
          ],
        ].map(([glyph, text]) => (
          <div
            key={glyph}
            className="flex items-start gap-[10px] text-[13px] leading-[1.65] text-[#1F1F1F]"
          >
            <span
              className="inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center bg-[#1F1F1F]/15 text-[12px] font-medium text-[#1F1F1F]"
              style={MONO}
            >
              {glyph}
            </span>
            <span>{text}</span>
          </div>
        ))}
      </div>
      <div className="mt-[20px] border-t border-[#1F1F1F]/30 pt-[14px]">
        <p className="text-[13px] leading-[1.7] text-[#1F1F1F]">
          V1 shipped Traffic &amp; Conversion at the school level — the only
          metric set applicable to all 40K schools.{" "}
          <em>Scoping is design, not roadmap deferral.</em>
        </p>
      </div>
    </div>
  );
}

function DecisionBlock() {
  return (
    <div className="grid gap-[24px] border-t border-[#1F1F1F]/30 pt-[28px] tablet:grid-cols-[1fr_360px] tablet:gap-[32px]">
      <div className="flex flex-col gap-[10px]">
        <p
          className="text-[10px] tracking-[0.08em] font-medium text-[#5D5D5D]"
          style={MONO}
        >
          DECISION · VISUALIZATION
        </p>
        <h3 className="text-[18px] leading-[1.3] font-semibold text-[#1F1F1F]">
          Bubble + Line. Same axis, different scales.
        </h3>
        <p className="text-[13px] leading-[1.7] text-[#1F1F1F]">
          Traffic moves in tens of thousands; conversion moves in single-digit
          percentages. Plotted on the same chart, one of them disappears.
          Bubble (traffic volume) + Line (conversion rate) keeps both legible —
          the bubble carries volume, the line carries rate, the timeline ties
          them together.
        </p>
        <p
          className="text-[12px] leading-[1.65] italic text-[#5D5D5D]"
          style={SERIF}
        >
          Why: the real design decision wasn&rsquo;t which chart type. It was
          deciding both metrics had to live in the same eyeline, and then
          engineering a chart that wouldn&rsquo;t sacrifice one for the other.
        </p>
      </div>

      <div className="relative h-[240px] w-full overflow-clip border border-[#1F1F1F]/30 bg-[#F8F8F8]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/work/teachable/04-shortlist-bubble-line.png"
          alt="Bubble + line chart shortlist visual"
          className="absolute inset-0 h-full w-full object-contain p-[10px]"
        />
      </div>
    </div>
  );
}

// Usability strip trimmed per feedback — no header label, no closing
// caption.  Just the four stats + the single top-finding line.
function UsabilityStrip() {
  return (
    <div className="border border-[#1F1F1F]/30 px-[18px] py-[16px] tablet:px-[20px] tablet:py-[18px]">
      <div className="grid grid-cols-2 gap-[12px] tablet:grid-cols-4">
        {[
          ["7", "participants"],
          ["81.6%", "task completion"],
          ["18.4%", "error-free rate"],
          ["41 sec", "avg time on task"],
        ].map(([n, label]) => (
          <div key={label} className="flex flex-col gap-[3px]">
            <span className="text-[20px] leading-[1] font-medium tracking-[-0.01em] text-[#1F1F1F]">
              {n}
            </span>
            <span className="text-[10px] leading-[1.4] text-[#5D5D5D]">
              {label}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-[14px] border-t border-[#1F1F1F]/30 pt-[12px]">
        <p className="text-[12px] leading-[1.65] text-[#1F1F1F]">
          <strong className="font-semibold">Top finding:</strong> 5 of 7
          participants misread the bubble as &ldquo;free conversion
          only&rdquo; — labels rewritten before alpha. Task 5 was the hardest
          at 43% success: the free-vs-paid conversion ambiguity inside the
          tooltip.
        </p>
      </div>
    </div>
  );
}

function SectionScopeCut() {
  return (
    <section
      id="scope-cut"
      className="border-t border-[#1F1F1F]/30 py-[48px] tablet:py-[64px]"
    >
      <div className="flex flex-col gap-[32px]">
        <SectionHeader
          number="03"
          eyebrow="Scope cut"
          headline="The first design decision was a subtraction."
          lede="For the design decision I worked from proto-personas — three hypotheses about data literacy and needs — and ran lo-fi sketches against them. The aim wasn't to confirm the personas. It was to find out which one V1 had to be designed for, and which one it couldn't."
        />

        {/* Proto-personas — moved here from §02 per feedback */}
        <div className="flex flex-col gap-[14px]">
          <p
            className="text-[11px] tracking-[0.10em] font-medium text-[#5D5D5D]"
            style={MONO}
          >
            Proto-personas · three hypotheses about data literacy
          </p>
          <div className="grid gap-[14px] tablet:grid-cols-3">
            <PersonaCard
              label="BEGINNER"
              quote="I don't know what data to even look at."
              body="Largest segment. Doesn't have data literacy yet. Wants to be told what matters."
            />
            <PersonaCard
              label="INTERMEDIATE"
              quote="I only need numbers and statistics based on date range."
              body="The core. Knows the metrics they want, just needs them in one place without fighting for them."
            />
            <PersonaCard
              label="ADVANCED"
              quote="I want to know which one has been successful."
              body="Marketing-fluent. Uses UTMs. Wants attribution and drilldown."
            />
          </div>
        </div>

        {/* Lo-fi sketches — the artifact used to read each persona's ceiling */}
        <div className="flex flex-col gap-[14px]">
          <p
            className="text-[11px] tracking-[0.10em] font-medium text-[#5D5D5D]"
            style={MONO}
          >
            Three lo-fi sketches · one per persona&rsquo;s ceiling
          </p>
          <div className="grid gap-[14px] tablet:grid-cols-3">
            <LoFiCard
              src="/work/teachable/02-lofi-traffic-conversion.jpg"
              alt="Lo-fi mock: Traffic & Conversion"
              optionNum="OPTION 01"
              state="CHOSEN"
              title="Traffic & Conversion"
              sub="School-level traffic + conversion overlay. The most universal metric set across all 40K schools."
            />
            <LoFiCard
              src="/work/teachable/02-lofi-product.png"
              alt="Lo-fi mock: Product drilldown"
              optionNum="OPTION 02"
              state="DROPPED"
              title="Product drilldown"
              sub="Per-course performance. Useful, but courses already had a separate sales view."
            />
            <LoFiCard
              src="/work/teachable/02-lofi-marketing.png"
              alt="Lo-fi mock: Marketing drilldown"
              optionNum="OPTION 03"
              state="DROPPED"
              title="Marketing drilldown"
              sub="UTM attribution + campaign-level analytics. Powerful — but only ~5% of schools used UTMs."
            />
          </div>
        </div>

        <WhyDropAdvanced />

        <DecisionBlock />

        <UsabilityStrip />
      </div>
    </section>
  );
}

// ============================================================================
// §04 Instrumentation ★ — engagement score formula with the WHY in the lede.
// Cohort criteria + 4-tool grid removed per feedback.
// ============================================================================

// Fig. 2 of 3 — designed before the alpha, the binary contract.
function EngagementFormula() {
  return (
    <div className="border-2 border-[#1F1F1F] bg-[#F8F8F8] px-[24px] py-[28px] tablet:px-[32px] tablet:py-[32px]">
      <p
        className="text-center text-[11px] tracking-[0.12em] font-medium text-[#5D5D5D]"
        style={MONO}
      >
        ENGAGEMENT SCORE · DESIGNED BEFORE ALPHA
      </p>

      <p className="mt-[18px] text-center text-[15px] leading-[1.5] text-[#1F1F1F]">
        <strong className="font-semibold">
          1+ visit during a given week
        </strong>{" "}
        → +1 to school&rsquo;s score
      </p>
      <p className="mt-[6px] text-center text-[14px] leading-[1.5] text-[#5D5D5D]">
        Over the 4-week alpha period · max possible score: 4
      </p>

      <div className="mt-[24px] grid grid-cols-2 gap-[10px] tablet:grid-cols-4">
        {["WEEK 1", "WEEK 2", "WEEK 3", "WEEK 4"].map((w) => (
          <div
            key={w}
            className="flex flex-col items-center gap-[4px] border border-[#1F1F1F]/40 bg-[#EEEEEE] px-[12px] py-[14px]"
          >
            <span
              className="text-[10px] tracking-[0.08em] font-medium text-[#5D5D5D]"
              style={MONO}
            >
              {w}
            </span>
            <span className="text-[13px] font-medium text-[#1F1F1F]">
              visit?
            </span>
            <span
              className="text-[14px] font-medium text-[#1F1F1F]"
              style={MONO}
            >
              +1
            </span>
          </div>
        ))}
      </div>

      <div className="mt-[20px] border-t border-[#1F1F1F]/30 pt-[16px] text-center">
        <p
          className="text-[10px] tracking-[0.12em] font-medium text-[#5D5D5D]"
          style={MONO}
        >
          SUCCESS THRESHOLD
        </p>
        <p
          className="mt-[6px] text-[22px] leading-[1.2] font-semibold tracking-[-0.01em] text-[#1F1F1F]"
          style={MONO}
        >
          score &gt; 2
        </p>
        <p className="mt-[4px] text-[11px] leading-[1.5] text-[#5D5D5D]">
          visited at least 3 of 4 weeks ·{" "}
          <em>if hit → ships to all 40K · if not → re-scope</em>
        </p>
      </div>
    </div>
  );
}

function SectionInstrumentation() {
  return (
    <section
      id="instrumentation"
      className="border-t border-[#1F1F1F]/30 py-[48px] tablet:py-[64px]"
    >
      <div className="flex flex-col gap-[32px]">
        <SectionHeader
          number="04"
          eyebrow="Instrumentation"
          headline={
            <>
              Before the alpha shipped,
              <br aria-hidden />
              I&rsquo;d already designed the scoreboard.
            </>
          }
          lede="A school's business doesn't change visibly day to day — daily-active would have been the wrong yardstick. Weekly was the right one. If a school owner walked back in even once a week, the dashboard had pulled them in at the moment something was worth checking. Once-a-week return = signal. The score had to count weekly returns, not session minutes."
        />

        <p
          className="text-[11px] tracking-[0.10em] font-medium text-[#5D5D5D]"
          style={MONO}
        >
          Fig. 2 of 3 · Engagement score formula · the binary contract
        </p>

        <EngagementFormula />

        <Body>
          The score wasn&rsquo;t a measurement I&rsquo;d hand to PM after
          launch — it was the contract written before launch.{" "}
          <em>If score &gt; 2, ship to all 40K. If not, re-scope.</em> Writing
          the criteria I&rsquo;d be judged against, before the code shipped,
          is the part of the role nobody hires you to do but everybody hires
          you for.
        </Body>
      </div>
    </section>
  );
}

// ============================================================================
// §05 Reframe ★ — the strongest section.  Mini stats → quote → ★ chart → 87%.
// ============================================================================

// Fig. 3 of 3 — the signature visual.  Same data, second reading.
//
// Geometry (viewBox 0 0 720 300):
//   - Baseline at y=240, bar tops vary by week
//   - 4 bars (width 60, gap 60), centered: W1 x=150, W2 x=270, W3 x=390, W4 x=510
//   - Bar heights declining: 180 / 140 / 100 / 60 (opacity 85 / 70 / 55 / 40%)
//   - Event-trigger markers in the gaps: x=240 (W1↔W2) and x=360 (W2↔W3)
//   - Spike circles at bar tops: W2 (x=300, y=100) and W3 (x=420, y=140)
//   - Week labels below baseline at y=260
//   - Dashed trend curve from top-left to bottom-right
function ReframeChart() {
  return (
    <div className="border-2 border-[#1F1F1F] bg-[#1F1F1F]/[0.04] px-[20px] py-[24px] tablet:px-[28px] tablet:py-[28px]">
      <p
        className="mb-[14px] text-[11px] tracking-[0.10em] font-medium text-[#5D5D5D]"
        style={MONO}
      >
        WEEKLY ACTIVE SCHOOLS · ALPHA · 4 WEEKS
      </p>
      <p className="mb-[18px] max-w-[640px] text-[12px] leading-[1.65] text-[#5D5D5D]">
        <strong className="font-semibold text-[#1F1F1F]">
          First reading
        </strong>{" "}
        (engagement score): a declining curve. Looks like fading interest.
        <br aria-hidden />
        <strong className="font-semibold text-[#1F1F1F]">
          Second reading
        </strong>{" "}
        (event-trigger overlay): each spike maps to a school event — course
        launch, BOGO promo, seasonal sale.
      </p>

      <div className="w-full overflow-x-auto">
        <svg
          viewBox="0 0 720 300"
          xmlns="http://www.w3.org/2000/svg"
          className="block w-full min-w-[600px] text-[#1F1F1F]"
          role="img"
          aria-label="Weekly active schools across the 4-week alpha — declining bars overlaid with event-trigger markers showing spikes around course launches and promotions."
        >
          {/* Y-axis micro-label */}
          <text
            x={8}
            y={20}
            fontSize={9}
            fontFamily="var(--font-jetbrains-mono), monospace"
            fill="#5D5D5D"
            letterSpacing="0.04em"
          >
            weekly active schools →
          </text>

          {/* Gridlines (dashed hair) */}
          <line
            x1={50}
            y1={80}
            x2={700}
            y2={80}
            stroke="#1F1F1F"
            strokeOpacity={0.18}
            strokeDasharray="3 4"
          />
          <line
            x1={50}
            y1={160}
            x2={700}
            y2={160}
            stroke="#1F1F1F"
            strokeOpacity={0.18}
            strokeDasharray="3 4"
          />

          {/* Baseline */}
          <line
            x1={50}
            y1={240}
            x2={700}
            y2={240}
            stroke="#1F1F1F"
            strokeOpacity={0.45}
            strokeWidth={1}
          />

          {/* Bars — declining heights + declining opacities */}
          <rect
            x={150}
            y={60}
            width={60}
            height={180}
            fill="currentColor"
            fillOpacity={0.85}
          />
          <rect
            x={270}
            y={100}
            width={60}
            height={140}
            fill="currentColor"
            fillOpacity={0.7}
          />
          <rect
            x={390}
            y={140}
            width={60}
            height={100}
            fill="currentColor"
            fillOpacity={0.55}
          />
          <rect
            x={510}
            y={180}
            width={60}
            height={60}
            fill="currentColor"
            fillOpacity={0.4}
          />

          {/* Event-trigger marker 1 — between W1 and W2 */}
          <line
            x1={240}
            y1={48}
            x2={240}
            y2={240}
            stroke="#1F1F1F"
            strokeWidth={1.5}
            strokeDasharray="3 2"
            strokeOpacity={0.75}
          />
          <text
            x={240}
            y={32}
            fontSize={9}
            fontFamily="var(--font-jetbrains-mono), monospace"
            fill="#1F1F1F"
            letterSpacing="0.04em"
            textAnchor="middle"
          >
            ↓ course launch
          </text>
          <text
            x={240}
            y={44}
            fontSize={8}
            fontFamily="var(--font-jetbrains-mono), monospace"
            fill="#5D5D5D"
            letterSpacing="0.04em"
            textAnchor="middle"
          >
            Apr 12 · School A
          </text>

          {/* Event-trigger marker 2 — between W2 and W3 */}
          <line
            x1={360}
            y1={48}
            x2={360}
            y2={240}
            stroke="#1F1F1F"
            strokeWidth={1.5}
            strokeDasharray="3 2"
            strokeOpacity={0.75}
          />
          <text
            x={360}
            y={32}
            fontSize={9}
            fontFamily="var(--font-jetbrains-mono), monospace"
            fill="#1F1F1F"
            letterSpacing="0.04em"
            textAnchor="middle"
          >
            ↓ BOGO promo
          </text>
          <text
            x={360}
            y={44}
            fontSize={8}
            fontFamily="var(--font-jetbrains-mono), monospace"
            fill="#5D5D5D"
            letterSpacing="0.04em"
            textAnchor="middle"
          >
            Apr 19 · School B
          </text>

          {/* Spike annotations — bar-top circles + adjacent labels */}
          <circle cx={300} cy={100} r={5} fill="#1F1F1F" />
          <text
            x={310}
            y={96}
            fontSize={9}
            fontFamily="var(--font-jetbrains-mono), monospace"
            fill="#1F1F1F"
            letterSpacing="0.04em"
          >
            +18% spike
          </text>
          <circle cx={420} cy={140} r={5} fill="#1F1F1F" />
          <text
            x={430}
            y={136}
            fontSize={9}
            fontFamily="var(--font-jetbrains-mono), monospace"
            fill="#1F1F1F"
            letterSpacing="0.04em"
          >
            +12% spike
          </text>

          {/* Dashed trend curve + italic label */}
          <path
            d="M 80 80 Q 360 200 660 250"
            stroke="#1F1F1F"
            strokeOpacity={0.5}
            strokeWidth={1}
            strokeDasharray="4 3"
            fill="none"
          />
          <text
            x={560}
            y={232}
            fontSize={11}
            fontStyle="italic"
            fontFamily="ui-serif, Georgia, serif"
            fill="#5D5D5D"
          >
            declining baseline
          </text>

          {/* Week labels below baseline, centered on bars */}
          {[
            ["WEEK 1", 180],
            ["WEEK 2", 300],
            ["WEEK 3", 420],
            ["WEEK 4", 540],
          ].map(([label, x]) => (
            <text
              key={label as string}
              x={x as number}
              y={260}
              fontSize={10}
              fontFamily="var(--font-jetbrains-mono), monospace"
              fill="#5D5D5D"
              textAnchor="middle"
              letterSpacing="0.06em"
            >
              {label as string}
            </text>
          ))}
        </svg>
      </div>

      <p
        className="mt-[14px] text-center text-[11px] leading-[1.55] tracking-[0.04em] text-[#5D5D5D]"
        style={MONO}
      >
        Each spike maps to a school event — new course launch, promotion,
        seasonal sale. Usage isn&rsquo;t weekly. It&rsquo;s launch-triggered.
      </p>

      <figure className="mt-[16px] border-l-2 border-[#1F1F1F] bg-[#1F1F1F]/[0.04] px-[16px] py-[12px]">
        <p
          className="text-[12px] leading-[1.65] italic text-[#5D5D5D]"
          style={SERIF}
        >
          Participant 2 had asked for course-launch and campaign-release date
          markers during usability testing — three months before alpha.{" "}
          <strong className="not-italic font-semibold text-[#1F1F1F]">
            The reframe was visible in the room before it was visible in the
            data.
          </strong>
        </p>
      </figure>
    </div>
  );
}

function ClosingStat() {
  return (
    <div className="border-t-2 border-b-2 border-[#1F1F1F] py-[28px] tablet:py-[36px]">
      <p
        className="text-center text-[64px] leading-[0.9] font-extrabold tracking-[-0.04em] text-[#1F1F1F] tablet:text-[88px]"
        style={MONO}
      >
        87%
      </p>
      <p
        className="mt-[10px] text-center text-[11px] tracking-[0.10em] font-medium text-[#5D5D5D]"
        style={MONO}
      >
        FINAL ENGAGEMENT · vs previous 20% · 4.4× lift
      </p>
    </div>
  );
}

function SectionReframe() {
  return (
    <section
      id="reframe"
      className="border-t border-[#1F1F1F]/30 py-[48px] tablet:py-[64px]"
    >
      <div className="flex flex-col gap-[32px]">
        <SectionHeader
          number="05"
          eyebrow="Reframe"
          headline={
            <>
              Low usage didn&rsquo;t mean low value.
              <br aria-hidden />
              The schools were event-driven.
            </>
          }
          lede="Alpha results came in declining week over week. By the engagement score I'd designed, the launch looked like a slow failure. Then I read the same data a second way."
        />

        {/* Mini stats — plain, mono, no box */}
        <div
          className="flex flex-col gap-[4px] text-[13px] leading-[2] tracking-[0.04em] text-[#5D5D5D]"
          style={MONO}
        >
          <p>78% of schools used the product in week 1</p>
          <p>58% returned in week 2</p>
          <p>engagement decreased steadily through week 4</p>
        </div>

        <PullQuote attribution="— me, internally, week 4 of alpha">
          Does the lower visits mean lower value? What drove the decline?
        </PullQuote>

        <p
          className="text-[11px] tracking-[0.10em] font-medium text-[#5D5D5D]"
          style={MONO}
        >
          Fig. 3 of 3 · The reframe chart · same data, second reading
        </p>

        <ReframeChart />

        <ClosingStat />

        <p
          className="max-w-[580px] text-[20px] leading-[1.5] italic text-[#1F1F1F] tablet:text-[22px]"
          style={SERIF}
        >
          The dashboard&rsquo;s job wasn&rsquo;t to be checked daily. It was
          to be there when the event triggered.
        </p>

        <div className="flex flex-col gap-[10px]">
          <p
            className="text-[11px] tracking-[0.10em] font-medium text-[#5D5D5D]"
            style={MONO}
          >
            WHAT THE REFRAME TAUGHT
          </p>
          <ul className="flex flex-col gap-[8px]">
            {[
              "Schools at different stages have different needs.",
              "Activity is triggered by events, not calendar weeks.",
              "Reporting tools should be designed for cadence, not frequency.",
            ].map((t) => (
              <li
                key={t}
                className="flex items-baseline gap-[10px] text-[14px] leading-[1.7] text-[#1F1F1F]"
              >
                <span className="shrink-0 text-[#5D5D5D]">—</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <Body>
          The bigger move: I wrote the metric. I watched the metric say{" "}
          <em>fail</em>. I refused. The data through a different lens — event
          triggers — already showed success. The interpretation move IS the
          senior move. Not the chart. Not the build. The reading.
        </Body>
      </div>
    </section>
  );
}

// ============================================================================
// Page composition
// ============================================================================

export default function TeachableCaseStudy() {
  return (
    <>
      <SectionHero />

      {/* §02–05 — left sticky nav + content column, matching Toyota's layout */}
      <div className="mx-auto max-w-[1200px] px-[32px]">
        <div className="flex tablet:gap-[40px]">
          <CaseStudyLeftNav
            currentSlug="teachable"
            readTime="~6 min read"
            sections={SECTIONS}
          />
          <div className="min-w-0 flex-1">
            <SectionState />
            <SectionScopeCut />
            <SectionInstrumentation />
            <SectionReframe />
          </div>
        </div>
      </div>
    </>
  );
}
