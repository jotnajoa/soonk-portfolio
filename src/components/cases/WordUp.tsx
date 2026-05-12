// Word Up case study (project 08 in the canonical list).
//
// Spec source: `/Volumes/External/Portfolio_Website_26/_brief_wordup_for_figma.md`
// (4 sections — toy-project density, sits next to Parking as the Personal
// pair: Parking is the 2026 re-build, Word Up is the 2021 artifact).
//
// Visual system: portfolio mono palette — bg #EEEEEE, ink #1F1F1F,
// secondary #5D5D5D, muted #A0A0A0.  Same call as Volthop / Parking — the
// brief's cream chrome was a Figma-side direction, but the case study must
// read as a continuation of the portfolio, so it reuses the portfolio's
// language verbatim.
//
// What survives from the brief's "Option α": the original 2021
// visualizations are embedded as DARK ARTIFACTS framed in 2px ink borders
// — they're exhibited works and stay dark on the gray chrome.
//
// Layout split:
//   §01 Hero       — full-bleed, no left nav
//   §02–04         — left sticky nav (140px) + content column (~960px)

import CaseStudyLeftNav, {
  type CaseStudySection,
} from "@/components/cases/CaseStudyLeftNav";

const SECTIONS: CaseStudySection[] = [
  { id: "question", num: "02", label: "The question" },
  { id: "atmosphere", num: "03", label: "The atmosphere", star: true },
  { id: "findings", num: "04", label: "The findings" },
];

const MONO: React.CSSProperties = {
  fontFamily:
    "var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
};

// ============================================================================
// Atoms
// ============================================================================

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[12px] tracking-[0.18em] font-medium text-[#5D5D5D]">
      {children}
    </p>
  );
}

function SectionNumber({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[64px] leading-[0.85] font-extrabold tracking-[-0.04em] text-[#1F1F1F] tablet:text-[88px]">
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
    <p className="max-w-[600px] text-[16px] leading-[1.7] font-normal text-[#1F1F1F]">
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

// ----------------------------------------------------------------------------
// DarkArtifact — exhibited work, 2021 origin.
// Black card + 2px ink border + mono frame-tag pinned top-left.  Tag colors
// stay cream-on-black per the brief — these labels are *inside* the dark
// frame, so they reference the dark frame's palette, not the page chrome.
// ----------------------------------------------------------------------------
function DarkArtifact({
  src,
  alt,
  tag,
  className = "",
}: {
  src: string;
  alt: string;
  tag: string;
  className?: string;
}) {
  return (
    <figure
      className={`relative overflow-hidden border-2 border-[#1F1F1F] bg-[#0a0a0a] p-[8px] ${className}`}
    >
      <span
        className="absolute left-[14px] top-[14px] z-10 bg-black/60 px-[7px] py-[3px] text-[9px] tracking-[0.08em] text-[#EEEEEE]/85"
        style={MONO}
      >
        {tag}
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="block h-auto w-full"
        loading="lazy"
      />
    </figure>
  );
}

// ============================================================================
// §01 Hero — wordmark + tagline + meta (3 rows, no ribbon)
// ============================================================================

function Hero() {
  return (
    <section className="pt-[48px] pb-[64px] tablet:pt-[64px] tablet:pb-[96px]">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-[36px] px-[32px]">
        <Eyebrow>+ 01 / Intro</Eyebrow>

        {/* Display — wordmark alone, POMEs hero spec (68 / 92 / 128 px,
            font-semibold, tracking -0.05).  The descriptive subtitle
            lives on the right side of the hero grid alongside the meta. */}
        <h1 className="text-[68px] leading-[0.9] font-semibold tracking-[-0.05em] text-[#1F1F1F] min-[560px]:text-[92px] min-[960px]:text-[128px]">
          Word Up
        </h1>

        {/* Hero grid — dark dispersion artifact LEFT (image-dominant 3:2),
            tagline + subtitle + meta RIGHT.  The artifact is the exhibited
            work, so it takes the larger column; the right column is the
            caption + chrome. */}
        <div className="grid gap-[36px] tablet:grid-cols-[3fr_2fr] tablet:items-start">
          <DarkArtifact
            src="/work/wordup/wordup-vocab-dispersion-90s.png"
            alt="Word Up — vocabulary dispersion sun-burst, 90s"
            tag="ORIGINAL · 2021 · DISPERSION INDICATOR"
          />

          <div className="flex flex-col gap-[24px]">
            <div className="flex flex-col gap-[10px]">
              {/* Tagline — POMEs scale: 24 → 28 → 36 px, medium, tight
                  tracking.  Same hierarchy as the POMEs hero. */}
              <p className="max-w-[620px] text-[24px] leading-[1.2] font-medium tracking-[-0.02em] text-[#1F1F1F] min-[560px]:text-[28px] min-[960px]:text-[36px]">
                I asked the lyrics how many words they needed.
              </p>
              <p className="max-w-[620px] text-[15px] leading-[1.5] font-normal italic text-[#5D5D5D]">
                — a quantitative analysis on hip hop lyrics, 2021
              </p>
            </div>

            {/* Meta dl — POMEs spec (110 px label col, 18 gap, 14 py). */}
            <dl className="border-t border-[#A0A0A0]">
              {[
                ["Role", "Solo · research, design, build"],
                ["Data", "Genius API — lyrics from top hip hop tracks"],
                ["Year", "2021"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="grid grid-cols-[110px_1fr] items-baseline gap-[18px] border-b border-[#A0A0A0] py-[14px]"
                >
                  <dt className="text-[12px] font-medium tracking-[0.06em] text-[#5D5D5D]">
                    {label}
                  </dt>
                  <dd className="text-[16px] leading-[1.5] text-[#1F1F1F]">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// §02 Question + Data Path
// ============================================================================

function GoalCard({
  label,
  title,
  body,
}: {
  label: string;
  title: string;
  body: React.ReactNode;
}) {
  return (
    <article className="flex flex-col gap-[10px] border-2 border-[#1F1F1F]/30 bg-[#1F1F1F]/[0.03] p-[18px]">
      <p
        className="text-[10px] tracking-[0.08em] text-[#5D5D5D]"
        style={MONO}
      >
        {label}
      </p>
      <h3 className="text-[16px] leading-[1.3] font-medium text-[#1F1F1F]">
        {title}
      </h3>
      <p className="text-[13px] leading-[1.65] text-[#5D5D5D]">{body}</p>
    </article>
  );
}

const PIPELINE: {
  n: string;
  title: string;
  desc: string;
  tool: string;
}[] = [
  {
    n: "STEP 01",
    title: "Genius API",
    desc: "Top hip hop artists + their top tracks' lyrics",
    tool: "Node.js + Axios",
  },
  {
    n: "STEP 02",
    title: "Pre-process",
    desc: "Top 10 songs / artist · per-decade JSON snapshots",
    tool: "Node.js",
  },
  {
    n: "STEP 03",
    title: "Render",
    desc: "Scroll-lazy · svg for small, canvas for large",
    tool: "d3.js + canvas + gsap",
  },
];

function PipelineDiagram() {
  return (
    <div className="flex flex-col gap-[10px]">
      <p
        className="text-[11px] tracking-[0.05em] text-[#5D5D5D]"
        style={MONO}
      >
        Fig. 1 · Data pipeline · API → pre-process → render
      </p>
      <div className="grid grid-cols-1 gap-[8px] tablet:grid-cols-3">
        {PIPELINE.map((s) => (
          <article
            key={s.n}
            className="flex flex-col gap-[10px] border-2 border-[#1F1F1F]/30 bg-[#1F1F1F]/[0.03] p-[16px]"
          >
            <p
              className="text-[11px] tracking-[0.08em] text-[#5D5D5D]"
              style={MONO}
            >
              {s.n}
            </p>
            <p className="text-[15px] leading-[1.3] font-medium text-[#1F1F1F]">
              {s.title}
            </p>
            <p className="text-[13px] leading-[1.6] text-[#5D5D5D]">
              {s.desc}
            </p>
            <p
              className="mt-auto border-t border-[#1F1F1F]/20 pt-[8px] text-[11px] tracking-[0.04em] text-[#5D5D5D]"
              style={MONO}
            >
              {s.tool}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

function CraftCallout() {
  return (
    <aside className="border-l-2 border-[#1F1F1F] bg-[#1F1F1F]/[0.04] px-[20px] py-[18px]">
      <h3 className="mb-[8px] text-[14px] leading-[1.35] font-medium text-[#1F1F1F]">
        Why pre-process on Node, not client-side?
      </h3>
      <p className="max-w-[600px] text-[13px] leading-[1.7] text-[#5D5D5D]">
        The full lyrics dataset was too large to manage in a browser. Two craft
        moves: (1) top 10 songs per artist became the key indicator — enough to
        characterize without overwhelming the client. (2) Different
        visualizations need differently-shaped data; reshape once on Node, not
        three times in a browser.
      </p>
    </aside>
  );
}

function SectionQuestion() {
  return (
    <section
      id="question"
      className="border-t border-[#1F1F1F]/30 py-[48px] first:border-t-0 first:pt-0 tablet:py-[64px]"
    >
      <div className="flex flex-col gap-[36px]">
        <SectionHeader
          number="02"
          eyebrow="The question"
          headline={
            <>
              How many words do you need
              <br aria-hidden />
              to understand hip hop?
            </>
          }
          lede="I'm an ESL speaker. Listening to hip hop, I kept landing on the same feeling: this is the most word-driven music genre I'd encountered. To follow it — really follow it — how much vocabulary do you actually need? And is that vocabulary widening or narrowing over time?"
        />

        <div className="grid gap-[14px] tablet:grid-cols-2">
          <GoalCard
            label="GOAL 01 / VOCABULARY COUNT"
            title="Unique word count by decade"
            body={
              <>
                If a decade&apos;s lyrics use diverse vocabulary, then despite
                the raw word count, the count of <em>unique</em> words will be
                smaller than the raw word count. Track how this gap shifts over
                time.
              </>
            }
          />
          <GoalCard
            label="GOAL 02 / DIVERSITY"
            title="Vocabulary dispersion across the top X%"
            body="Measure how concentrated lyrical content is in the top X% most-used words. Higher concentration = lower diversity. Compare across decades."
          />
        </div>

        <PipelineDiagram />

        <CraftCallout />

        <Body>
          Most of the work was the pipeline. The visualization is what people
          see; the scrape and the API loops are what made the visualization
          possible. Two days of scraping for two seconds of dispersion
          animation.
        </Body>
      </div>
    </section>
  );
}

// ============================================================================
// §03 The atmosphere ★
// ============================================================================

function ArtifactBlock({
  src,
  alt,
  tag,
  caption,
  maxWidth = 640,
}: {
  src: string;
  alt: string;
  tag: string;
  caption: React.ReactNode;
  maxWidth?: number;
}) {
  return (
    <div className="flex flex-col gap-[14px]">
      <div style={{ maxWidth }}>
        <DarkArtifact src={src} alt={alt} tag={tag} />
      </div>
      <p className="max-w-[560px] text-[13px] leading-[1.65] text-[#5D5D5D]">
        {caption}
      </p>
    </div>
  );
}

function SectionAtmosphere() {
  return (
    <section
      id="atmosphere"
      className="border-t border-[#1F1F1F]/30 py-[48px] first:border-t-0 first:pt-0 tablet:py-[64px]"
    >
      <div className="flex flex-col gap-[36px]">
        <SectionHeader
          number="03"
          eyebrow="The atmosphere"
          headline="I made the chart a club."
          lede={
            <>
              A standard answer to &ldquo;what does the data show&rdquo; is a
              bar chart. The standard answer is correct and almost always
              lifeless. The decision here was to treat the visualization as an
              immersive experience — decades became rooms, the navigation
              became a cassette deck, the entrance became a luminosity fade
              like a club door opening.{" "}
              <strong className="font-medium text-[#1F1F1F]">
                The atmosphere isn&apos;t decoration. It&apos;s information.
              </strong>{" "}
              The user feels time passing because the room changes around them.
            </>
          }
        />

        <div className="flex flex-col gap-[40px]">
          <ArtifactBlock
            src="/work/wordup/intro.gif"
            alt="Word Up — landing / entering hip hop club"
            tag="ORIGINAL · 2021 · LANDING / ENTERING HIP HOP CLUB"
            caption={
              <>
                Luminosity transition as the entry sequence. The fade-in{" "}
                <em>is</em> the door — by the time you can see the chart,
                you&apos;re already inside.
              </>
            }
          />

          <ArtifactBlock
            src="/work/wordup/selectandplay.gif"
            alt="Word Up — decade selector and transport controls"
            tag="ORIGINAL · 2021 · DECADE SELECTOR + TRANSPORT CONTROLS"
            caption={
              <>
                <span style={MONO} className="text-[12px] text-[#1F1F1F]">
                  NOW PLAYING / REWIND / PLAY-PAUSE / EJECT
                </span>{" "}
                — analog cassette grammar borrowed for digital data. Each
                decade is a room. Tap the switch, the air changes.
              </>
            }
          />

          <ArtifactBlock
            src="/work/wordup/wordupclip1.gif"
            alt="Word Up — visualization of every word in the dataset"
            tag="ORIGINAL · 2021 · VISUALIZATION OF ENTIRE WORDS"
            caption="The full word field — every word from every track in the dataset, rendered to canvas because svg would have crashed the browser. Decoration that's also a stress test."
          />
        </div>

        <Body>
          Three design moves served one decision: time should feel like a
          place, not an axis. The case for atmosphere as evidence is the case
          that information design has feelings too — and that letting them in
          doesn&apos;t soften the data, it lands it.
        </Body>
      </div>
    </section>
  );
}

// ============================================================================
// §04 Findings + reflection
// ============================================================================

function FindingColumn({
  src,
  alt,
  tag,
  label,
  title,
  body,
}: {
  src: string;
  alt: string;
  tag: string;
  label: string;
  title: string;
  body: React.ReactNode;
}) {
  return (
    <article className="flex flex-col gap-[14px]">
      <DarkArtifact src={src} alt={alt} tag={tag} />
      <p
        className="text-[10px] tracking-[0.08em] text-[#5D5D5D]"
        style={MONO}
      >
        {label}
      </p>
      <h3 className="text-[15px] leading-[1.35] font-medium text-[#1F1F1F]">
        {title}
      </h3>
      <p className="text-[13px] leading-[1.7] text-[#5D5D5D]">{body}</p>
    </article>
  );
}

function SectionFindings() {
  return (
    <section
      id="findings"
      className="border-t border-[#1F1F1F]/30 py-[48px] first:border-t-0 first:pt-0 tablet:py-[64px]"
    >
      <div className="flex flex-col gap-[36px]">
        <SectionHeader
          number="04"
          eyebrow="The findings"
          headline={
            <>
              The vocabulary shrank.
              <br aria-hidden />
              The songs didn&apos;t.
            </>
          }
          lede="Two findings, both clearer with each successive decade."
        />

        <div className="grid gap-[28px] tablet:grid-cols-2">
          <FindingColumn
            src="/work/wordup/highlights.gif"
            alt="Word Up — top 100 vocabulary visualization, 90s"
            tag="ORIGINAL · 2021 · TOP 100 VOCABULARY · 90s"
            label="FINDING 01 / COUNT"
            title="Unique-word count declined over time."
            body={
              <>
                Across notable artists from the 80s through the 10s, the count
                of unique vocabulary used in top tracks{" "}
                <strong className="font-medium text-[#1F1F1F]">
                  decreased decade by decade
                </strong>
                . Hip hop got more homogeneous — fewer distinct words, more
                shared vocabulary. Early hip hop demanded a larger dictionary
                to follow; later hip hop didn&apos;t. The chart kept playing;
                the dictionary kept shrinking.
              </>
            }
          />

          <FindingColumn
            src="/work/wordup/wordupclip2.gif"
            alt="Word Up — vocabulary dispersion across decades"
            tag="ORIGINAL · 2021 · VOCABULARY DISPERSION"
            label="FINDING 02 / DISPERSION"
            title="Trends come and go. Dead words don't return."
            body={
              <>
                The dispersion sun-burst measures how concentrated lyrics are
                in the top X% of words. Across decades,{" "}
                <strong className="font-medium text-[#1F1F1F]">
                  the high-frequency words rotate
                </strong>{" "}
                — trendy slang rises and falls —{" "}
                <strong className="font-medium text-[#1F1F1F]">
                  but the words that fade out almost never come back
                </strong>
                . New vocabulary cycles in; old vocabulary leaves the room and
                doesn&apos;t return.
              </>
            }
          />
        </div>

        {/* Closing reflection — italic pull-out, Archivo italic (matches
            Parking / Volthop pull-quotes; no serif fallback). */}
        <p className="max-w-[560px] text-[19px] leading-[1.55] font-normal italic text-[#1F1F1F]">
          Net: early hip hop required more vocabulary to listen to. By the
          2010s, a smaller word set carried more songs. The chart room cooled
          down over the decades. We kept dancing to it.
        </p>

        <Body>
          Three muscles trained here that show up in everything after:
          end-to-end data fluency (scrape · API · pre-process · render),
          narrative scaffolding around quantitative findings (a finding is a
          sentence, then a chart), and the conviction that aesthetic is
          evidence (the club is the chart). VoltHop&apos;s iteration ladder
          and POMEs&apos; reframing both descend from this project&apos;s
          basic move — answer your own question, all the way.
        </Body>

        <p
          className="text-[11px] tracking-[0.04em] text-[#5D5D5D]"
          style={MONO}
        >
          ↗{" "}
          <a
            href="https://jotnajoa.github.io/wordup"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-[3px] hover:no-underline"
          >
            live demo · jotnajoa.github.io/wordup
          </a>{" "}
          <span className="text-[#A0A0A0]">(desktop only)</span>
        </p>
      </div>
    </section>
  );
}

// ============================================================================
// Page composition
// ============================================================================

export default function WordupCaseStudy() {
  return (
    <>
      <Hero />

      <div>
        <div className="mx-auto flex max-w-[1200px] gap-[32px] px-[32px] py-[48px] tablet:py-[64px]">
          <CaseStudyLeftNav
            currentSlug="wordup"
            readTime="~5 min read"
            sections={SECTIONS}
          />

          <div className="flex min-w-0 flex-1 flex-col">
            <SectionQuestion />
            <SectionAtmosphere />
            <SectionFindings />
          </div>
        </div>
      </div>
    </>
  );
}
