// GIA Platform case study (project 03 in the canonical list).
//
// Source brief: /Volumes/External/Portfolio_Website_26/prompt_for_claude_in_figma_GIA.md
// Visual prototype: /Volumes/External/Portfolio_Website_26/mockups/gia-case-study-v5.html
//
// Design system per the brief — INTENTIONALLY distinct from the homepage's
// monochrome editorial system.  Cream + c-graphite signals enterprise
// gravitas + restraint (sister case studies use teal / amber accents):
//   bg          #EEEEEE   (cream)
//   bg-card     #F8F8F8   (slightly warmer for cards)
//   text        #1F1F1F   (dark warm gray)
//   muted       #5D5D5D
//   border      #A0A0A0   (also: dim gray for [TBD] italic placeholders)
//   accent      #1F1F1F   (c-graphite — used VERY sparingly per spec)
//   pink        #E04D7A   (Fig. 05 loop arrow only)
//
// Typography per the brief:
//   Display       120px / weight 500 / -0.05em
//   Section #     76px  / weight 500 / line-height 0.85
//   h2 (headline) 22px  / weight 500 / line-height 1.4
//   Sub-header    14px  / weight 600 / 0.06em / accent
//   Body          16px  / line-height 1.7 / max-w 720
//   Pull / refl.  Georgia italic 22–24px
//   Eyebrow       11px  / 0.16em / sentence case
//
// Sections (all 7, single long-scroll):
//   §01 Hero            — full-bleed; logo+wordmark, meta block, KEY ACHIEVEMENTS
//   §02 Project+mission — 2×2 mission grid
//   §03 Challenge 01    — Rituals; signature Genie test box + UX cycle pipeline
//   §04 Challenge 02    — Visualizations [2A Forecasted Demand · 2B Financial]
//   §05 Challenge 03    — Offshore [3A 24-hour relay · 3B character classification]
//   §06 Challenge 04    — BRD chaos loop + UIUX Story Structure + tablet mockup
//   §07 What's next     — narrow column reflection
//
// Production screenshots referenced by the brief (Soonk uploads to /public/works/gia/):
//   - forecasted-demand-after.png   (§01 hero anchor + §04 Fig. 02 right pane)
//   - financial-performance-after.png (§04 Fig. 03)
// If those files are missing, each <ProductionScreenshot> renders a labeled
// placeholder so the layout stays intact.

// ============================================================================
// Tokens & primitives
// ============================================================================

import CaseStudyLeftNav, {
  type CaseStudySection,
} from "./CaseStudyLeftNav";

const SERIF: React.CSSProperties = {
  fontFamily: 'Georgia, "Iowan Old Style", Palatino, serif',
};

const MONO: React.CSSProperties = {
  fontFamily:
    "var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
};

// Eyebrow — "+ <label>", 11px / 0.16em / muted, sentence case.
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[12px] tracking-[0.16em] font-medium text-[#5D5D5D]"
    >
      {children}
    </p>
  );
}

// Section number — 76px display weight 500.  Per the brief's typography
// (NOT extra-bold like the homepage's giant 01–09 numerals).
function SectionNumber({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[56px] leading-[0.85] font-medium tracking-[-0.02em] text-[#1F1F1F] tablet:text-[76px]">
      {children}
    </p>
  );
}

// Section headline — 22px / weight 500 / line-height 1.4, max-w 720.
function Headline({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="max-w-[720px] text-[20px] leading-[1.35] font-medium text-[#1F1F1F] tablet:text-[22px] tablet:leading-[1.4]">
      {children}
    </h2>
  );
}

// Sub-header within a section — 14px / weight 600 / 0.06em / accent.  Used
// for "WHY THIS BUILT TRUST", "EXISTING VISUAL — ...", etc.  Sentence case
// allowed when the brief uses it; uppercase rendered as-typed in content.
function SubHeader({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-[28px] text-[16px] tracking-[0.06em] font-semibold text-[#1F1F1F] tablet:text-[16px]">
      {children}
    </p>
  );
}

// Body paragraph — 16px / line-height 1.7 / max-w 720.  Korean-English mix
// preserved verbatim from the brief.
function Body({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`max-w-[720px] text-[16px] leading-[1.7] font-normal text-[#1F1F1F] tablet:text-[16px] ${className}`}
    >
      {children}
    </p>
  );
}

// Lede — slightly larger body, used at the top of each section beneath the
// headline.
function Lede({ children }: { children: React.ReactNode }) {
  return (
    <p className="max-w-[720px] text-[16px] leading-[1.7] font-normal text-[#1F1F1F] tablet:text-[17px]">
      {children}
    </p>
  );
}

// [TBD] dim italic placeholder — "use [TBD] placeholders styled in dim gray
// italic until Soonk swaps them" (brief).
function Tbd({ children }: { children: React.ReactNode }) {
  return (
    <span className="italic text-[#A0A0A0]">[{children}]</span>
  );
}

// Challenge marker chip — labels each Challenge section (CHALLENGE 01–04).
function ChallengeChip({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block rounded-[4px] border-[0.5px] border-[#1F1F1F] px-[12px] py-[6px] text-[12px] tracking-[0.16em] font-medium text-[#1F1F1F]"
    >
      {children}
    </span>
  );
}

// Sub-section divider — for 2A / 2B / 3A / 3B.  0.5px tertiary top border
// with a floated label overlapping the line.
function SubSectionDivider({ label }: { label: string }) {
  return (
    <div className="relative my-[40px] tablet:my-[56px]">
      <div className="border-t-[0.5px] border-[#A0A0A0]" />
      <span
        className="absolute -top-[10px] left-0 bg-[#EEEEEE] pr-[16px] text-[12px] tracking-[0.16em] font-semibold text-[#1F1F1F]"
      >
        {label}
      </span>
    </div>
  );
}

// Card — cream bg-card, 0.5px border, 12px radius, 28px padding.
function Card({
  children,
  className = "",
  variant = "card",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "card" | "graphite" | "white";
}) {
  const variantClasses =
    variant === "graphite"
      ? "bg-[#1F1F1F] text-white"
      : variant === "white"
        ? "bg-white border-[#1F1F1F] border-[1px]"
        : "bg-[#F8F8F8] border-[#A0A0A0] border-[0.5px]";
  return (
    <div className={`rounded-[12px] p-[24px] tablet:p-[28px] ${variantClasses} ${className}`}>
      {children}
    </div>
  );
}

// Laptop mockup — 16:10 dark frame.  Used for production screenshots.
//
// We use CSS `background-image` (not <img>) so missing files don't render a
// broken-icon — when the bg fails to load, the underlying placeholder layer
// shows through cleanly.  When Soonk drops the screenshot at the expected
// path, the bg layer covers the placeholder.  Server-component-safe (no
// event handlers).
function LaptopMockup({
  src,
  alt,
  fallbackLabel,
  fallbackHint,
}: {
  src: string;
  alt: string;
  fallbackLabel: string;
  fallbackHint?: string;
}) {
  return (
    <div className="my-[32px] rounded-[8px] bg-[#2a2a2a] p-[12px] tablet:p-[18px]">
      <div
        className="relative aspect-[16/10] overflow-hidden rounded-[4px] bg-white"
        role="img"
        aria-label={alt}
      >
        {/* Placeholder layer (z-back) — visible when the bg-image 404s */}
        <div className="absolute inset-0 z-0 flex flex-col items-center justify-center gap-[8px] bg-gradient-to-br from-[#fafafa] to-[#f0f0f0] p-[24px] text-center">
          <span className="text-[12px] tracking-[0.18em] font-medium text-[#5D5D5D]">
            PRODUCTION SCREENSHOT
          </span>
          <span className="max-w-[420px] text-[12px] leading-[1.5] font-medium text-[#1F1F1F]">
            {fallbackLabel}
          </span>
          {fallbackHint && (
            <span className="max-w-[420px] text-[12px] leading-[1.4] text-[#5D5D5D]">
              {fallbackHint}
            </span>
          )}
          <span
            className="mt-[6px] text-[12px] tracking-[0.06em] text-[#A0A0A0]"

          >
            {src}
          </span>
        </div>
        {/* Image layer (z-front) — covers placeholder when the file exists */}
        <div
          className="absolute inset-0 z-10 bg-cover bg-center"
          style={{ backgroundImage: `url("${src}")` }}
        />
      </div>
    </div>
  );
}

// Section shell with optional sticky left nav slot.  §01 Hero is full-bleed
// (no nav); §02–07 share a sticky 150px nav at tablet+ that lists all 7
// sections.  On mobile, the nav is hidden and content stacks naturally.
function SectionWrap({
  id,
  children,
  narrow = false,
}: {
  id: string;
  children: React.ReactNode;
  narrow?: boolean;
}) {
  const inner = narrow ? "max-w-[720px]" : "max-w-[960px]";
  return (
    <section
      id={id}
      className={`border-b-[0.5px] border-[#A0A0A0] py-[80px] tablet:py-[120px]`}
    >
      <div className={`mx-auto ${inner} px-[24px] tablet:px-0`}>{children}</div>
    </section>
  );
}

// Section header — eyebrow + chip(optional) + section number + headline.
// Both the chip-style header (Challenges) and the eyebrow-only header
// (project, reflection) flow through this component.
function SectionHeader({
  eyebrow,
  chip,
  number,
  headline,
}: {
  eyebrow?: string;
  chip?: string;
  number: string;
  headline: React.ReactNode;
}) {
  return (
    <header className="mb-[40px] flex flex-col gap-[18px] tablet:mb-[48px]">
      {chip ? <ChallengeChip>{chip}</ChallengeChip> : eyebrow && <Eyebrow>+ {eyebrow}</Eyebrow>}
      <div className="flex flex-col gap-[12px]">
        <SectionNumber>{number}</SectionNumber>
        <Headline>{headline}</Headline>
      </div>
    </header>
  );
}

// ============================================================================
// §01 Hero — full-bleed
// ============================================================================

function Hero() {
  return (
    <section className="border-b-[0.5px] border-[#A0A0A0] px-[24px] py-[64px] tablet:px-[60px] tablet:py-[80px]">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-[40px]">
        <Eyebrow>+ 01 / Intro</Eyebrow>

        {/* Display row — project number + GIA logo + wordmark, baseline
            aligned.  "03" is JBM Mono (only place JBM appears). */}
        <div className="flex flex-col gap-[12px]">
          <div className="flex flex-wrap items-end gap-[22px]">
            <span
              className="text-[64px] font-extrabold leading-[0.85] tracking-[-0.04em] text-[#1F1F1F] tablet:text-[120px]"
              style={MONO}
            >
              03
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/work/logos/GIA_Logo.svg"
              alt=""
              aria-hidden
              className="h-[64px] w-auto tablet:h-[92px]"
            />
            <h1 className="text-[64px] leading-[0.95] font-medium tracking-[-0.04em] text-[#1F1F1F] tablet:text-[120px] tablet:tracking-[-0.05em] tablet:leading-[1]">
              GIA Platform
            </h1>
          </div>
          <p className="text-[16px] tracking-[0.04em] text-[#5D5D5D] tablet:text-[16px]">
            Growth Insights &amp; Activation · Deloitte enterprise platform
          </p>
        </div>

        {/* 60/40 — anchor visual + meta */}
        <div className="grid gap-[36px] tablet:grid-cols-[60%_40%] tablet:gap-[60px]">
          {/* Left — production screenshot of Forecasted Demand chart */}
          <LaptopMockup
            src="/work/gia/forecasted-demand-after.png"
            alt="GIA Platform — Forecasted Demand chart in production (Demand Sensing → Market Insights & Trends)"
            fallbackLabel="Forecasted Demand chart (live)"
            fallbackHint="Demand Sensing → Market Insights & Trends → Forecasted Demand · DAM tab · Industry: Consumer · FY 2027"
          />

          {/* Right — meta block, 3 rows (Role / Mission / Status) */}
          <dl className="border-t-[0.5px] border-[#A0A0A0]">
            {[
              ["Role", "UX Lead — offshore + onshore design teams"],
              [
                "Mission",
                "Push the stuck project forward. Optimize resources. Replace opinion-based decisions with evidence. Pay down design debt.",
              ],
              ["Status", "Live in production · Jan 2024 — present (still UX Lead)"],
            ].map(([label, value]) => (
              <div
                key={label as string}
                className="grid grid-cols-[80px_1fr] items-baseline gap-[16px] border-b-[0.5px] border-[#A0A0A0] py-[16px]"
              >
                <dt className="text-[12px] tracking-[0.16em] text-[#5D5D5D]">
                  {label}
                </dt>
                <dd className="text-[16px] leading-[1.5] font-medium text-[#1F1F1F] tablet:text-[16px]">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Key Achievements row — 4 columns, all TBD until Soonk fills from
            Framer references.  Renders as a stat row with top + bottom 0.5px
            borders, 32px vertical padding. */}
        <div className="grid grid-cols-2 gap-[24px] border-y-[0.5px] border-[#A0A0A0] py-[32px] tablet:grid-cols-4">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="flex flex-col gap-[10px]">
              <span className="text-[12px] tracking-[0.16em] text-[#5D5D5D]">
                KEY ACHIEVEMENT
              </span>
              <span className="text-[32px] leading-[0.95] font-medium italic text-[#A0A0A0]">
                [TBD]
              </span>
              <span className="text-[12px] leading-[1.4] text-[#1F1F1F] tablet:text-[16px]">
                <Tbd>label — pull from Framer ref {n}</Tbd>
              </span>
            </div>
          ))}
        </div>

        <p
          className="text-[12px] tracking-[0.04em] text-[#5D5D5D]"
        >
          ↓ Scroll for case study
        </p>
      </div>
    </section>
  );
}

// ============================================================================
// Body shell — sticky left nav + main column for §02–07
// ============================================================================

const SECTIONS: CaseStudySection[] = [
  { id: "s02", num: "02", label: "Project + mission" },
  { id: "s03", num: "03", label: "Rituals" },
  { id: "s04", num: "04", label: "Visualizations" },
  { id: "s05", num: "05", label: "Offshore" },
  { id: "s06", num: "06", label: "BRD" },
  { id: "s07", num: "07", label: "What's next" },
];

// ============================================================================
// §02 The project + mission
// ============================================================================

function SectionProject() {
  return (
    <SectionWrap id="s02">
      <SectionHeader
        eyebrow="The project"
        number="02"
        headline={
          <>
            A stuck enterprise platform — and the four things I was asked to
            fix.
          </>
        }
      />
      <div className="flex flex-col gap-[24px]">
        <Body>
          <strong>Growth Insights &amp; Activation (GIA) Platform</strong>은
          Deloitte의 internal enterprise platform이다. Account Leader, Alliance
          Leader, Sales 팀이 <em>이 시장에서 어디서 성장 기회가 발생하는지</em>를
          surface 하고, 특정 account를 deep-dive 하고, partnership을 어떻게
          확장할지 결정하는 데 사용된다. Demand Sensing · Account Deep Dive ·
          Sales Insights · Financial/Operational Performance — 여러 개의 module이
          한 platform 안에 묶여 있고, 각 module이 다른 user persona와 다른
          decision 영역을 cover 한다.
        </Body>
        <Body>
          들어왔을 때 platform은 <em>이미 빌드 중이었지만 진척이 막혀 있었다</em>.
          Quality 문제가 아니었다. <strong>흐름</strong>의 문제였다. 그래서
          들어가자마자 받은 mission은 네 갈래였다 —
        </Body>
      </div>

      {/* Mission grid — 2×2 */}
      <div className="mt-[40px] grid grid-cols-1 gap-[16px] tablet:grid-cols-2 tablet:gap-[20px]">
        {[
          {
            n: "01",
            title: "Push the stuck project forward.",
            body:
              "팀은 ritual에 갇혀 있었다 — design review, BRD pipeline, opinion-based critique. 흐름을 다시 만들어야 했다.",
          },
          {
            n: "02",
            title: "Optimize design resources.",
            body:
              "Offshore + onshore 디자이너가 섞여 있었지만 효율적으로 활용되지 못했다. 시간대 차이를 advantage로 바꾸고, skillset 별로 다른 trajectory를 운영해야 했다.",
          },
          {
            n: "03",
            title: "Build with evidence — not opinion.",
            body:
              '회의가 "do you like this?" 위주로 흘렀다. Real user가 풀려는 문제로 design을 ground 하는 protocol이 필요했다.',
          },
          {
            n: "04",
            title: "Pay down design debt.",
            body:
              "Legacy design system은 unstable했고, 익숙한-그러나-틀린 visualization이 곳곳에 박혀 있었다. 무엇을 cut하고 무엇을 rebuild할지 판단해야 했다.",
          },
        ].map((m) => (
          <Card key={m.n}>
            <p
              className="mb-[10px] text-[12px] tracking-[0.16em] font-medium text-[#5D5D5D]"
            >
              MISSION {m.n}
            </p>
            <h3 className="mb-[12px] text-[18px] leading-[1.3] font-medium text-[#1F1F1F]">
              {m.title}
            </h3>
            <p className="text-[16px] leading-[1.6] text-[#1F1F1F]">{m.body}</p>
          </Card>
        ))}
      </div>

      <div className="mt-[40px]">
        <Body>
          이 네 가지가 결국 네 개의 <strong>challenge</strong>로 정리됐다. 다음
          섹션부터 하나씩.
        </Body>
      </div>
    </SectionWrap>
  );
}

// ============================================================================
// §03 Challenge 01 · Rituals — Genie test + UX cycle pipeline (Fig. 01)
// ============================================================================

function GenieTestBox() {
  return (
    <div className="my-[40px] rounded-[12px] bg-[#1F1F1F] p-[28px] tablet:p-[32px]">
      <div className="flex flex-col gap-[20px] tablet:flex-row tablet:items-start tablet:gap-[24px]">
        <div className="flex size-[64px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-white/50">
          <span className="text-[32px]" role="img" aria-label="genie">
            🧞
          </span>
        </div>
        <div className="flex flex-col gap-[12px]">
          <p className="text-[12px] tracking-[0.16em] font-medium text-white/60">
            THE GENIE TEST
          </p>
          <p
            className="text-[20px] leading-[1.45] italic text-white tablet:text-[22px]"
            style={SERIF}
          >
            &ldquo;If a genie could grant you any outcome — without limits —
            what would it be?&rdquo;
          </p>
          <p className="text-[16px] leading-[1.6] text-white/85">
            이 한 질문이 stakeholder를 <em>solution</em>(드롭다운, 모달)에서{" "}
            <em>outcome</em>(사용자가 무엇을 결정할 수 있어야 하는가)으로
            끌어낸다. <strong>art of possibility</strong>를 통해 진짜 도달하고자
            하는 끝점이 발견되고, 동시에 그것을 막고 있는 진짜 문제도 함께
            surface 된다.
          </p>
        </div>
      </div>
    </div>
  );
}

// Fig. 01 — UX Cycle Pipeline.  7 cards horizontal:
//   START  Genie test (c-graphite fill, white text)
//     →    Outcome (01)  →  User story map (02)  →  Outcome-driven flow (03)
//     →    Low-fi wireframe (04)  →  High-fi (05)  →  Build (06)
function UxCyclePipeline() {
  const steps = [
    { tag: "START", label: "Genie test", graphite: true },
    { tag: "01", label: "Outcome" },
    { tag: "02", label: "User story map" },
    { tag: "03", label: "Outcome-driven flow" },
    { tag: "04", label: "Low-fi wireframe" },
    { tag: "05", label: "High-fi" },
    { tag: "06", label: "Build" },
  ];
  return (
    <figure className="my-[48px] flex flex-col gap-[16px]">
      <div className="overflow-x-auto pb-[8px]">
        <ol className="flex min-w-max items-stretch gap-[8px]">
          {steps.map((s, i) => (
            <li key={s.tag} className="flex items-stretch gap-[8px]">
              <div
                className={`flex w-[120px] flex-col gap-[10px] rounded-[8px] p-[14px] ${
                  s.graphite
                    ? "bg-[#1F1F1F] text-white"
                    : "border-[0.5px] border-[#A0A0A0] bg-[#F8F8F8] text-[#1F1F1F]"
                }`}
              >
                <span
                  className={`text-[12px] tracking-[0.16em] font-medium ${
                    s.graphite ? "text-white/60" : "text-[#5D5D5D]"
                  }`}
                >
                  {s.tag}
                </span>
                <span className="text-[16px] leading-[1.3] font-medium">
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <span
                  aria-hidden
                  className="self-center text-[18px] text-[#5D5D5D]"
                >
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
      <figcaption className="text-[12px] tracking-[0.16em] text-[#5D5D5D]">
        Fig. 01 · How UX activities feed each other — the cycle that built team
        trust
      </figcaption>
    </figure>
  );
}

function SectionRituals() {
  return (
    <SectionWrap id="s03">
      <SectionHeader
        chip="CHALLENGE 01"
        number="03"
        headline={
          <>
            The team was stuck in rituals.
            <br />I needed a framework that moved them.
          </>
        }
      />
      <div className="flex flex-col gap-[24px]">
        <Body>
          각 design pass가 outcome이 아닌 <em>feature</em>에서
          reverse-engineered 되고 있었다. PM은 &ldquo;drop-down을 추가&rdquo;
          같은 instruction을 줬고, 디자이너는 그걸 그렸고, review에서 다시
          갈렸고 — 그런데 <em>왜</em> drop-down이 필요한지에 대한 합의는 끝까지
          없었다. 그래서 매 sprint마다 같은 토론이 반복됐다.
        </Body>
        <Body>
          해결은 단순했다. <strong>맨 처음에 outcome을 강제로 articulate
          시켜라.</strong> 그리고 그것을 다음 모든 단계의 source-of-truth로
          삼아라. 시작점이 두 단어로 고정되어 있다 — <em>genie test.</em>
        </Body>
      </div>

      <GenieTestBox />

      <div className="flex flex-col gap-[24px]">
        <Body>
          Genie test로 outcome이 나오면 — 다음 단계는 자동으로 따라온다. 그리고
          이 자동으로 따라오는 흐름을 팀 전체에 명시적으로 보여주는 것이{" "}
          <strong>cross-functional agreement를 만드는 핵심 move</strong>였다.
          PM, eng, business stakeholder 모두에게 &ldquo;디자이너는 어떻게 일하나&rdquo;가
          한 그림으로 읽히게 되니까 — 갑자기 review에서 묻던 &ldquo;왜 지금
          이걸 하고 있어요?&rdquo; 류 질문이 사라졌다.
        </Body>
      </div>

      <UxCyclePipeline />

      <SubHeader>WHY THIS BUILT TRUST</SubHeader>
      <div className="mt-[12px] flex flex-col gap-[24px]">
        <Body>
          Stakeholder는 &ldquo;디자이너가 뭐 하고 있는지&rdquo;를 늘 의심한다.
          위 pipeline이 visible해지자마자 <em>각 활동이 다음 단계의 input을
          만든다</em>는 게 명시적으로 읽혔다. User story map은 flow의 raw
          material이고, flow는 low-fi의 raw material이다. 더 이상 design은
          &ldquo;예술 활동&rdquo;이 아니라 evidence를 가공해서 build로 전달하는{" "}
          <em>operating chain</em>이 됐다. Cross-functional team이 동의하기
          시작했다.
        </Body>
      </div>
    </SectionWrap>
  );
}

// ============================================================================
// §04 Challenge 02 · Visualizations — 2A Forecasted Demand · 2B Financial
// ============================================================================

// Fig. 02 — Forecasted Demand BEFORE / VALIDATION / AFTER (3-col composite)
function ForecastedDemandFigure() {
  return (
    <figure className="my-[48px] flex flex-col gap-[16px]">
      <div className="grid gap-[24px] tablet:grid-cols-[1fr_180px_1fr]">
        {/* LEFT — BEFORE */}
        <div className="flex flex-col gap-[12px]">
          <div className="relative aspect-square border-[0.5px] border-[#A0A0A0] p-[16px]">
            {/* Y-axis label */}
            <span
              className="absolute left-[6px] top-1/2 origin-left -translate-y-1/2 -rotate-90 text-[12px] tracking-[0.16em] text-[#5D5D5D]"
            >
              FUTURE VALUE ↑
            </span>
            {/* X-axis label */}
            <span
              className="absolute bottom-[4px] left-0 right-0 text-center text-[12px] tracking-[0.16em] text-[#5D5D5D]"
            >
              GROWTH RATE →
            </span>
            {/* Overlapping bubbles A–E (deliberately overlapping; size = "current value" with no scale) */}
            {[
              { l: "A", w: 56, t: 18, x: 60 },
              { l: "B", w: 42, t: 36, x: 50 },
              { l: "C", w: 50, t: 56, x: 24 },
              { l: "D", w: 36, t: 70, x: 22 },
              { l: "E", w: 28, t: 80, x: 12 },
            ].map((b) => (
              <span
                key={b.l}
                style={{
                  width: b.w,
                  height: b.w,
                  top: `${b.t}%`,
                  left: `${b.x}%`,
                }}
                className="absolute flex items-center justify-center rounded-full border-[0.5px] border-[#5D5D5D] bg-[#5D5D5D]/40 text-[12px] font-medium text-white"
              >
                {b.l}
              </span>
            ))}
          </div>
          <ul className="flex flex-col gap-[4px] text-[12px] leading-[1.4] text-[#5D5D5D]">
            <li>⊘ bubble size = current value, no scale</li>
            <li>⊘ overlapping bubbles repositioned by hand</li>
            <li>⊘ visual position no longer matches data</li>
          </ul>
          <p
            className="text-center text-[12px] italic text-[#5D5D5D]"
            style={SERIF}
          >
            Familiar. Insisted upon. Untrue.
          </p>
        </div>

        {/* CENTER — VALIDATION (c-graphite stacked steps, vertical arrow) */}
        <div className="relative flex flex-col items-stretch gap-[10px] py-[8px]">
          {[
            "01. What is this chart supposed to help us decide?",
            "02. Does this chart let you decide it?",
            "03. If no — what does?",
          ].map((t, i, arr) => (
            <div key={t} className="flex flex-col items-center gap-[8px]">
              <div className="w-full rounded-[6px] border-[0.5px] border-[#1F1F1F] bg-white px-[12px] py-[10px] text-[12px] leading-[1.3] font-medium text-[#1F1F1F]">
                {t}
              </div>
              {i < arr.length - 1 && (
                <span aria-hidden className="text-[16px] text-[#1F1F1F]">
                  ↓
                </span>
              )}
            </div>
          ))}
        </div>

        {/* RIGHT — AFTER (production screenshot or labeled placeholder) */}
        <div className="flex flex-col gap-[12px]">
          <LaptopMockup
            src="/work/gia/forecasted-demand-after.png"
            alt="GIA Platform — Forecasted Demand chart, slope/dual-bar production version"
            fallbackLabel="Forecasted Demand chart (live) — horizontal slope/dual-bar"
            fallbackHint="Current → Forecasted, sorted by spend, color-coded Advise/Implement/Operate"
          />
          <ul className="flex flex-col gap-[4px] text-[12px] leading-[1.4] text-[#1F1F1F]">
            <li>✓ current value: visible, scaled</li>
            <li>✓ projected value: visible, scaled</li>
            <li>✓ growth: visible as bar slope</li>
            <li>✓ no manual editing — data IS visual</li>
          </ul>
          <p
            className="text-center text-[12px] italic text-[#1F1F1F]"
            style={SERIF}
          >
            Honest. Comparable. Decision-ready.
          </p>
        </div>
      </div>
      <figcaption className="text-[12px] tracking-[0.16em] text-[#5D5D5D]">
        Fig. 02 · Forecasted Demand — before / validation / after
      </figcaption>
    </figure>
  );
}

// Two-track card row (1×2) — Track A muted, Track B c-graphite filled.
function TwoTrackCards() {
  return (
    <div className="mt-[32px] grid gap-[16px] tablet:grid-cols-2 tablet:gap-[20px]">
      <Card>
        <p className="mb-[8px] text-[12px] tracking-[0.16em] font-medium text-[#5D5D5D]">
          TRACK A · SAFETY CHECK
        </p>
        <h4 className="mb-[12px] text-[16px] leading-[1.4] font-medium text-[#1F1F1F]">
          Current users (familiarity)
        </h4>
        <p className="text-[16px] leading-[1.6] text-[#1F1F1F]">
          새 visualization이 muscle-memory 사용자에게도 작동하는가? Regression
          잡기. <em>최소 기준선.</em>
        </p>
      </Card>
      <Card variant="graphite">
        <p className="mb-[8px] text-[12px] tracking-[0.16em] font-medium text-white/60">
          TRACK B · READABILITY CHECK
        </p>
        <h4 className="mb-[12px] text-[16px] leading-[1.4] font-medium text-white">
          Non-users + future users
        </h4>
        <p className="text-[16px] leading-[1.6] text-white/85">
          사전 노출 없는 사람이 차트를 보고 이해하는가? Familiarity-bias로 가려진
          false positive 잡기. <em>진짜 검증.</em>
        </p>
      </Card>
    </div>
  );
}

function SectionVisualizations() {
  return (
    <SectionWrap id="s04">
      <SectionHeader
        chip="CHALLENGE 02"
        number="04"
        headline={
          <>
            Visualizations that didn&rsquo;t answer
            <br />
            the question they were asked.
          </>
        }
      />
      <Lede>
        두 개의 inherited visualization이 있었다. 둘 다 &ldquo;우리가 늘 쓰던
        것&rdquo;으로 방어되고 있었다. 둘 다 사실 사용자가 풀려는 결정을{" "}
        <em>도와주지 못하고</em> 있었다. 한 번에 두 개를 다 다시 빌드했다.
      </Lede>

      {/* ── 2A · Forecasted Demand ─────────────────────────────────────── */}
      <SubSectionDivider label="2A · FORECASTED DEMAND" />

      <SubHeader>EXISTING VISUAL — 4-QUADRANT BUBBLE CHART</SubHeader>
      <div className="mt-[12px] flex flex-col gap-[16px]">
        <Body>
          <strong>X축</strong> = growth rate. <strong>Y축</strong> = future
          value. <strong>Bubble size</strong> = current value (no scale legend).
        </Body>
        <ol className="flex max-w-[720px] list-decimal flex-col gap-[10px] pl-[20px] text-[16px] leading-[1.7] text-[#1F1F1F] tablet:text-[16px]">
          <li>
            Bubble size가 reference 없으니 opportunity 간 current value 비교
            자체가 불가능했다.
          </li>
          <li>
            현재 가치가 큰지 작은지 한눈에 안 보였다. 핵심 질문은 &ldquo;얼마나
            클 것인가&rdquo;인데 그 답이 <em>안</em> 나왔다.
          </li>
          <li>
            <strong>가장 황당한 부분</strong>: bubble이 발표 시점에 겹치면 deck
            builder가 <em>PowerPoint에서 손으로 옮겼다.</em> Visual이 데이터와
            일치하지 않게 됐다.
          </li>
        </ol>
      </div>

      <SubHeader>STAKEHOLDER CHALLENGE</SubHeader>
      <div className="mt-[12px]">
        <Body>
          가장 강하게 방어한 사람 = <em>그 visualization을 직접 만들어
          보고하던 본인.</em> Career sunk cost. 사용자 evidence 아닌 본인
          자존심으로 방어. 일반 design critique으로는 못 이긴다.
        </Body>
      </div>

      <SubHeader>MY BREAKTHROUGH</SubHeader>
      <div className="mt-[12px] flex flex-col gap-[16px]">
        <Body>
          차트 선호 토론을 거부했다. 한 질문 — <em>&ldquo;What is this chart
          supposed to help us decide?&rdquo;</em> 답: <em>next-quarter
          partnership opportunity 우선순위.</em> 후속 — <em>&ldquo;Does this
          chart let you decide that?&rdquo;</em> 그리고 walk-through:
        </Body>
        <ul className="flex max-w-[720px] flex-col gap-[6px] text-[16px] leading-[1.7] text-[#1F1F1F] tablet:text-[16px]">
          <li>⊘ Can&rsquo;t compare current value (no scale).</li>
          <li>⊘ Can&rsquo;t see the absolute jump from current → projected.</li>
          <li>⊘ Can&rsquo;t trust positions (manual repositioning).</li>
        </ul>
        <Body>
          방의 공기가 식었다. &ldquo;우리가 늘 쓰던 것&rdquo; 방어가 더 이상
          defensible하지 않게 됐다.
        </Body>
      </div>

      <ForecastedDemandFigure />

      {/* ── 2B · Financial / Operational Metrics ───────────────────────── */}
      <SubSectionDivider label="2B · FINANCIAL / OPERATIONAL METRICS" />

      <SubHeader>
        EXISTING VISUAL — A DASHBOARD THAT SHIPPED THE NUMBERS, NOT THE INSIGHT
      </SubHeader>
      <div className="mt-[12px]">
        <Body>
          같은 metric set (1-Year TSR, Total Rev Growth %, ROA %, ROC %, EBITDA
          %, COGS %, R&amp;D %, Total Asset TO, AR Days, ...) 이 inherited 됐다.
          다만 visualization이 <em>&ldquo;숫자를 화면에 띄우는&rdquo;</em>{" "}
          수준이었다 — Account Leader가 정작 알고 싶은{" "}
          <strong>&ldquo;내 account가 peer 대비 어디에 있나?&rdquo;</strong>가
          한눈에 안 보였다. 분포도 안 보였고, outlier 여부도 안 보였고,
          &ldquo;strong / weak&rdquo; 같은 directional 판단도 안 나왔다.
        </Body>
      </div>

      <SubHeader>WHAT WAS BEING MISSED</SubHeader>
      <div className="mt-[12px]">
        <Body>
          현재 사용자들은 그냥 그 숫자를 읽고 자기 머리로 비교하고 있었다.
          익숙해서 <em>그 visualization으로도 일이 된다</em>고 말했다. 그게
          함정이었다 — <strong>그들이 익숙해서 못 보고 있는 것이 무엇인지</strong>
          가 진짜 issue였다.
        </Body>
      </div>

      <SubHeader>TESTING — TWO-TRACK PROTOCOL</SubHeader>
      <div className="mt-[12px]">
        <Body>그래서 usability test를 두 트랙으로 분리했다 —</Body>
      </div>

      <TwoTrackCards />

      <div className="mt-[24px]">
        <Body>
          두 트랙 모두 통과한 design만 ship. 이 protocol이 방어자의 &ldquo;우리
          팀은 익숙해서 잘 쓰고 있다&rdquo; 논리를 무력화시켰다. 데이터가 없으면
          의견 vs 의견 싸움이지만, <em>데이터가 새 버전이 둘 다 통과한다고
          말하면 더 이상 토론이 아니다.</em>
        </Body>
      </div>

      <SubHeader>FINAL CONCLUSION — QUARTILE BOX-PLOT CARDS</SubHeader>
      <div className="mt-[12px]">
        <Body>
          한 화면에 12개 metric. 각 카드: Tail (5/95%) / Outlier (25/75%) /
          Majority of Accounts band, Strong/Weak directional markers. Your
          Account dot in pink, peer dots in gray. 한눈에 분포 + 위치 + 방향성.{" "}
          <strong>Account Deep Dive → Financial/Operational Performance</strong>
          에 live.
        </Body>
      </div>

      <figure className="mt-[16px] flex flex-col gap-[12px]">
        <LaptopMockup
          src="/work/gia/financial-performance-after.png"
          alt="GIA Platform — Financial/Operational Performance, quartile box-plot cards (production)"
          fallbackLabel="Financial/Operational Performance — quartile box-plot cards"
          fallbackHint="Account Deep Dive → 3M Company → Financial/Operational Performance · Your Account (magenta) vs Peer Accounts (gray) · 12 metric cards"
        />
        <figcaption className="text-[12px] tracking-[0.16em] text-[#5D5D5D]">
          Fig. 03 · Financial/Operational Performance — quartile box-plot cards
          (production)
        </figcaption>
      </figure>
    </SectionWrap>
  );
}

// ============================================================================
// §05 Challenge 03 · Offshore — 24-hour relay clock (Fig. 04) + table
// ============================================================================

// Fig. 04 — 24-hour relay clock.  Circular SVG, 270px diameter.
//   Offshore arc top half + Onshore arc bottom half (both muted)
//   Overlap windows ~14:00 and ~22:00 (c-graphite, the "gift hours")
//   Marker dots at handoff start / handoff close / decision-log update
function RelayClock() {
  return (
    <figure className="my-[48px] flex flex-col items-center gap-[20px]">
      <svg
        viewBox="0 0 320 320"
        width="270"
        height="270"
        role="img"
        aria-label="24-hour relay clock"
      >
        {/* outer circle */}
        <circle
          cx="160"
          cy="160"
          r="120"
          fill="none"
          stroke="#A0A0A0"
          strokeWidth="0.5"
        />

        {/* Tick marks at 12 / 18 / 0 / 6 */}
        <g stroke="#A0A0A0" strokeWidth="0.5">
          <line x1="160" y1="40" x2="160" y2="48" />
          <line x1="280" y1="160" x2="272" y2="160" />
          <line x1="160" y1="280" x2="160" y2="272" />
          <line x1="40" y1="160" x2="48" y2="160" />
        </g>
        <text x="160" y="34" fontSize="9" fill="#5D5D5D" textAnchor="middle">
          12
        </text>
        <text x="289" y="164" fontSize="9" fill="#5D5D5D" textAnchor="middle">
          18
        </text>
        <text x="160" y="296" fontSize="9" fill="#5D5D5D" textAnchor="middle">
          0
        </text>
        <text x="29" y="164" fontSize="9" fill="#5D5D5D" textAnchor="middle">
          6
        </text>

        {/* Offshore arc (top half) — muted */}
        <path
          d="M 160 40 A 120 120 0 0 1 160 280"
          fill="none"
          stroke="#5D5D5D"
          strokeWidth="14"
          opacity="0.18"
        />
        <text
          x="65"
          y="160"
          fontSize="9"
          letterSpacing="0.12em"
          fill="#5D5D5D"
          textAnchor="middle"
        >
          OFFSHORE
        </text>

        {/* Onshore arc (bottom half) — muted */}
        <path
          d="M 160 280 A 120 120 0 0 1 160 40"
          fill="none"
          stroke="#5D5D5D"
          strokeWidth="14"
          opacity="0.18"
        />
        <text
          x="255"
          y="160"
          fontSize="9"
          letterSpacing="0.12em"
          fill="#5D5D5D"
          textAnchor="middle"
        >
          ONSHORE
        </text>

        {/* Overlap window 1 — c-graphite, around 14:00–16:30 */}
        <path
          d="M 280 160 A 120 120 0 0 1 245 245"
          fill="none"
          stroke="#1F1F1F"
          strokeWidth="14"
          opacity="0.85"
        />
        {/* Overlap window 2 — c-graphite, around 22:00–00:00 */}
        <path
          d="M 75 245 A 120 120 0 0 1 40 160"
          fill="none"
          stroke="#1F1F1F"
          strokeWidth="14"
          opacity="0.85"
        />

        {/* Marker dots */}
        <circle cx="280" cy="160" r="5" fill="#1F1F1F" />
        <circle cx="240" cy="248" r="5" fill="#1F1F1F" />
        <circle cx="80" cy="248" r="5" fill="#1F1F1F" />

        {/* Center label */}
        <text
          x="160"
          y="158"
          fontSize="10"
          letterSpacing="0.16em"
          fill="#1F1F1F"
          textAnchor="middle"
          fontWeight="500"
        >
          THE RELAY
        </text>
        <text
          x="160"
          y="174"
          fontSize="9"
          letterSpacing="0.12em"
          fill="#1F1F1F"
          textAnchor="middle"
        >
          GIFT HOURS
        </text>

        {/* Marker labels */}
        <text x="298" y="148" fontSize="8" fill="#1F1F1F">
          handoff start
        </text>
        <text x="248" y="266" fontSize="8" fill="#1F1F1F">
          handoff close
        </text>
        <text x="36" y="266" fontSize="8" fill="#1F1F1F">
          decision-log
        </text>
      </svg>
      <p
        className="text-[16px] italic text-[#1F1F1F]"
        style={SERIF}
      >
        Time zones as inventory, not friction.
      </p>
      <figcaption className="text-[12px] tracking-[0.16em] text-[#5D5D5D]">
        Fig. 04 · The 24-hour relay clock
      </figcaption>
    </figure>
  );
}

function CharacterTable() {
  const rows = [
    {
      profile: "Pixel specialist",
      strengths:
        "Spec → high-fi 그대로 옮기는 정밀도. 생산성 높음.",
      training:
        "Design system component 사용법 + handoff annotation 양식 표준화.",
      assignment: "Spec-locked screen production at scale",
    },
    {
      profile: "Pattern applier",
      strengths: "Existing system을 새 context에 확장하는 판단력.",
      training:
        "Component pattern critique 세션 + 시스템 audit 참여로 의사결정 근육 키움.",
      assignment: "Module 간 일관성 유지 + 가벼운 신규 component 제안",
    },
    {
      profile: "Generalist (junior)",
      strengths:
        "유연성 높음. 성장 잠재력. 다만 방향성 가이드 필요.",
      training:
        "UX cycle 전체 노출 + 매주 1:1 review로 framework 내재화. Genie test 사용 훈련.",
      assignment: "Discovery 단계 보조 + low-fi 탐색 + 점진적 ownership 확장",
    },
  ];
  return (
    <div className="mt-[32px] overflow-hidden rounded-[12px] border-[0.5px] border-[#A0A0A0]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse text-left">
          <thead>
            <tr className="bg-[#F8F8F8]">
              {["PROFILE", "STRENGTHS", "TRAINING APPROACH", "BEST ASSIGNMENT"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-[20px] py-[14px] text-[12px] tracking-[0.16em] font-medium text-[#5D5D5D]"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.profile} className="border-t-[0.5px] border-[#A0A0A0]">
                <td className="px-[20px] py-[16px] align-top text-[16px] leading-[1.5] font-semibold text-[#1F1F1F]">
                  {r.profile}
                </td>
                <td className="px-[20px] py-[16px] align-top text-[16px] leading-[1.5] text-[#1F1F1F]">
                  {r.strengths}
                </td>
                <td className="px-[20px] py-[16px] align-top text-[16px] leading-[1.5] text-[#1F1F1F]">
                  {r.training}
                </td>
                <td className="px-[20px] py-[16px] align-top text-[16px] leading-[1.5] text-[#1F1F1F]">
                  {r.assignment}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SectionOffshore() {
  return (
    <SectionWrap id="s05">
      <SectionHeader
        chip="CHALLENGE 03"
        number="05"
        headline={
          <>
            Offshore wasn&rsquo;t a cost lever.
            <br />
            It was a velocity lever.
          </>
        }
      />
      <Lede>
        Offshore + onshore 디자이너가 같은 platform에 섞여 있었지만{" "}
        <em>&ldquo;low-cost execution&rdquo;</em>으로만 운영되고 있었다. 시간대
        차이는 <em>delay</em>로 취급됐고, skillset 차이는 그냥 무시됐다. 두
        가지를 다시 set up 했다 — <strong>(1) 시간대를 advantage로 쓰는 24-hour
        relay</strong>, <strong>(2) skillset 별로 다른 trajectory</strong>.
      </Lede>

      {/* ── 3A · The 24-hour relay ─────────────────────────────────────── */}
      <SubSectionDivider label="3A · THE 24-HOUR RELAY" />

      <div className="mt-[12px]">
        <Body>
          같은 work item이 timezone 경계를 넘어서 <em>연속해서 진행</em>되는
          protocol을 만들었다. Onshore 종료 시점에 handoff log + decision
          context가 정해진 format으로 다음 zone으로 넘어가고, 24시간 후 onshore가
          work-in-progress + offshore 결정 노트와 함께 다시 받는다.{" "}
          <strong>같은 cost로 cycle time이 줄었다.</strong>
        </Body>
      </div>

      <RelayClock />

      {/* ── 3B · Different profiles, different trajectories ────────────── */}
      <SubSectionDivider label="3B · DIFFERENT PROFILES, DIFFERENT TRAJECTORIES" />

      <div className="mt-[12px]">
        <Body>
          Offshore 디자이너를 한 덩어리로 보지 않았다. Skillset profile을{" "}
          <em>구분</em>하고, 각 profile에 다른 training plan + 다른 assignment를
          매칭했다. 핵심은 — 모든 사람을 generalist로 만들려고 하지 않는다.{" "}
          <strong>profile에 맞는 best-use-case로 deploy</strong>한다.
        </Body>
      </div>

      <CharacterTable />

      <p className="mt-[24px] max-w-[720px] text-[16px] italic leading-[1.6] text-[#5D5D5D] tablet:text-[16px]">
        ※ profile labels are placeholders — Soonk to confirm exact archetypes
        used at GIA.
      </p>

      <div className="mt-[40px]">
        <Body>
          두 가지를 합치면: <strong>같은 비용으로 더 빨리 ship</strong> 됐고,
          동시에 <strong>각 디자이너가 본인 강점에 맞는 자리에서 일</strong>했다.
          Offshore가 <em>cost lever가 아닌 velocity lever + talent lever</em>로
          재정의됐다.
        </Body>
      </div>
    </SectionWrap>
  );
}

// ============================================================================
// §06 Challenge 04 · BRD — Fig. 05 chaos loop, 2 principles, UIUX table,
//                          self-policing banner, BRD example tablet mockup
// ============================================================================

// Fig. 05 — BRD chaos loop.  4 nodes in circular arrangement; forward arrows
// connect 1→2→3→4; pink dashed arrow loops from node 4 back to node 2.
function BrdChaosLoop() {
  return (
    <figure className="my-[48px] flex flex-col items-center gap-[16px]">
      <svg
        viewBox="0 0 520 360"
        width="100%"
        height="auto"
        className="max-w-[520px]"
        role="img"
        aria-label="BRD chaos loop"
      >
        <defs>
          <marker
            id="arrowhead-muted"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="4"
            orient="auto"
          >
            <path d="M0,0 L8,4 L0,8 z" fill="#5D5D5D" />
          </marker>
          <marker
            id="arrowhead-pink"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="4"
            orient="auto"
          >
            <path d="M0,0 L8,4 L0,8 z" fill="#E04D7A" />
          </marker>
        </defs>

        {/* Node 1 — top center: BRD delivered */}
        <g>
          <rect
            x="200"
            y="20"
            width="120"
            height="60"
            rx="6"
            fill="white"
            stroke="#5D5D5D"
            strokeWidth="0.5"
          />
          <text x="260" y="44" fontSize="11" fill="#1F1F1F" textAnchor="middle" fontWeight="500">
            BRD delivered
          </text>
          <text x="260" y="60" fontSize="9" fill="#5D5D5D" textAnchor="middle">
            solution-first, no &ldquo;why&rdquo;
          </text>
        </g>

        {/* Node 2 — right: Designer reads */}
        <g>
          <rect
            x="380"
            y="150"
            width="120"
            height="60"
            rx="6"
            fill="white"
            stroke="#5D5D5D"
            strokeWidth="0.5"
          />
          <text x="440" y="174" fontSize="11" fill="#1F1F1F" textAnchor="middle" fontWeight="500">
            Designer reads
          </text>
          <text x="440" y="190" fontSize="9" fill="#5D5D5D" textAnchor="middle">
            &ldquo;why is this here?&rdquo;
          </text>
        </g>

        {/* Node 3 — bottom center: Designer asks PM */}
        <g>
          <rect
            x="200"
            y="280"
            width="120"
            height="60"
            rx="6"
            fill="white"
            stroke="#5D5D5D"
            strokeWidth="0.5"
          />
          <text x="260" y="304" fontSize="11" fill="#1F1F1F" textAnchor="middle" fontWeight="500">
            Designer asks PM
          </text>
          <text x="260" y="320" fontSize="9" fill="#5D5D5D" textAnchor="middle">
            clarification request
          </text>
        </g>

        {/* Node 4 — left: Partial answer */}
        <g>
          <rect
            x="20"
            y="150"
            width="120"
            height="60"
            rx="6"
            fill="white"
            stroke="#5D5D5D"
            strokeWidth="0.5"
          />
          <text x="80" y="174" fontSize="11" fill="#1F1F1F" textAnchor="middle" fontWeight="500">
            Partial answer
          </text>
          <text x="80" y="190" fontSize="9" fill="#5D5D5D" textAnchor="middle">
            &ldquo;just put a button there&rdquo;
          </text>
        </g>

        {/* Forward arrows: 1 → 2 → 3 → 4 */}
        <path
          d="M 320 60 Q 400 90 380 150"
          fill="none"
          stroke="#5D5D5D"
          strokeWidth="1"
          markerEnd="url(#arrowhead-muted)"
        />
        <path
          d="M 380 210 Q 400 270 320 290"
          fill="none"
          stroke="#5D5D5D"
          strokeWidth="1"
          markerEnd="url(#arrowhead-muted)"
        />
        <path
          d="M 200 290 Q 120 270 140 210"
          fill="none"
          stroke="#5D5D5D"
          strokeWidth="1"
          markerEnd="url(#arrowhead-muted)"
        />
        <path
          d="M 140 150 Q 120 90 200 60"
          fill="none"
          stroke="#5D5D5D"
          strokeWidth="1"
          markerEnd="url(#arrowhead-muted)"
        />

        {/* Pink dashed loop arrow: node 4 → node 2 (the heart of the diagram) */}
        <path
          d="M 140 180 Q 260 130 380 180"
          fill="none"
          stroke="#E04D7A"
          strokeWidth="1.5"
          strokeDasharray="4,3"
          markerEnd="url(#arrowhead-pink)"
        />
        <text
          x="260"
          y="148"
          fontSize="11"
          fill="#E04D7A"
          textAnchor="middle"
          fontWeight="500"
          letterSpacing="0.08em"
        >
          ↻ LOOP
        </text>
      </svg>
      <figcaption className="text-[12px] tracking-[0.16em] text-[#5D5D5D]">
        Fig. 05 · The BRD chaos loop — designers asking the same question every
        sprint
      </figcaption>
    </figure>
  );
}

function PrincipleCards() {
  return (
    <div className="mt-[24px] grid gap-[16px] tablet:grid-cols-2 tablet:gap-[20px]">
      <Card variant="white">
        <p className="mb-[10px] text-[12px] tracking-[0.16em] font-medium text-[#1F1F1F]">
          PRINCIPLE 01
        </p>
        <h4 className="text-[17px] leading-[1.4] font-medium text-[#1F1F1F] tablet:text-[18px]">
          BRD is not a UI spec document.
          <br />
          Don&rsquo;t define visual elements.
        </h4>
      </Card>
      <Card variant="white">
        <p className="mb-[10px] text-[12px] tracking-[0.16em] font-medium text-[#1F1F1F]">
          PRINCIPLE 02
        </p>
        <h4 className="text-[17px] leading-[1.4] font-medium text-[#1F1F1F] tablet:text-[18px]">
          What question is this trying to answer?
          <br />
          That&rsquo;s where every BRD starts.
        </h4>
      </Card>
    </div>
  );
}

function UiuxStoryTable() {
  const rows = [
    {
      n: "1",
      section: "User Problem Statement",
      content: "Who · When/where",
      validation: "Is it a problem, not current-state?",
    },
    {
      n: "2",
      section: "Desired User Outcome",
      content: "What user can understand/decide/do",
      validation: 'Outcome ≠ feature. Don’t write "has dropdown."',
    },
    {
      n: "3",
      section: "Questions + Data Needed",
      content: "First-person Qs + data list (data, not UI)",
      validation: "Must lead to outcome",
    },
    {
      n: "4",
      section: "Explicit Non-Goals",
      content: "What this is NOT solving",
      validation: "—",
      opt: true,
    },
    {
      n: "5",
      section: "Additional Notes",
      content: "Outside-the-structure",
      validation: "—",
      opt: true,
    },
  ];
  return (
    <div className="mt-[24px] overflow-hidden rounded-[12px] border-[0.5px] border-[#A0A0A0]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse text-left">
          <thead>
            <tr className="bg-[#F8F8F8]">
              {["#", "SECTION", "CONTENT", "VALIDATION RULE"].map((h) => (
                <th
                  key={h}
                  className="px-[20px] py-[14px] text-[12px] tracking-[0.16em] font-medium text-[#5D5D5D]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.n} className="border-t-[0.5px] border-[#A0A0A0]">
                <td className="px-[20px] py-[16px] align-top text-[16px] text-[#5D5D5D]">
                  {r.n}
                </td>
                <td className="px-[20px] py-[16px] align-top text-[16px] font-medium text-[#1F1F1F]">
                  {r.section}{" "}
                  {r.opt && (
                    <span className="font-normal text-[#5D5D5D]">(opt)</span>
                  )}
                </td>
                <td className="px-[20px] py-[16px] align-top text-[16px] text-[#1F1F1F]">
                  {r.content}
                </td>
                <td className="px-[20px] py-[16px] align-top text-[16px] italic text-[#5D5D5D]">
                  {r.validation}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SelfPolicingBanner() {
  return (
    <div className="my-[40px] rounded-[8px] bg-[#1F1F1F] px-[32px] py-[28px] text-center tablet:px-[40px] tablet:py-[32px]">
      <p
        className="text-[20px] italic leading-[1.5] text-white tablet:text-[22px]"
        style={SERIF}
      >
        &ldquo;If the user story describes a solution instead of a problem, it
        should be rejected.&rdquo;
      </p>
      <p className="mt-[16px] text-[12px] tracking-[0.16em] text-white/60">
        — UIUX STORY STRUCTURE · VALIDATION RULE
      </p>
    </div>
  );
}

function BrdExampleTablet() {
  return (
    <div className="mx-auto my-[32px] max-w-[640px] rounded-[12px] border-[1px] border-[#A0A0A0] bg-white p-[24px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] tablet:p-[32px]">
      <h3 className="text-[16px] font-semibold text-[#1F1F1F]">
        1. USER PROBLEM STATEMENT
      </h3>
      <p className="mt-[6px] text-[12px] leading-[1.55] text-[#1F1F1F]">
        <span className="font-semibold">Who:</span> Alliance Leaders working
        with Deloitte&rsquo;s Growth Platforms
      </p>
      <p className="mt-[8px] text-[12px] leading-[1.55] text-[#1F1F1F]">
        &ldquo;Alliance Leaders struggle to connect current market themes with
        actionable sales opportunities for their Growth Platform partnerships,
        making it difficult to identify where Deloitte can best position its
        offerings in collaboration with vendors.&rdquo;
      </p>

      <h3 className="mt-[20px] text-[16px] font-semibold text-[#1F1F1F]">
        2. DESIRED USER OUTCOME
      </h3>
      <p className="mt-[6px] text-[12px] leading-[1.55] text-[#1F1F1F]">
        &ldquo;Alliance Leaders can understand which current market themes
        present the best areas for &lsquo;Sell With&rsquo; collaboration,
        enabling data-driven, timely decisions about where to focus growth
        efforts.&rdquo;
      </p>

      <h3 className="mt-[20px] text-[16px] font-semibold text-[#1F1F1F]">
        3. QUESTIONS + DATA NEEDED
      </h3>
      <p className="mt-[6px] text-[12px] font-semibold text-[#1F1F1F]">
        User questions
      </p>
      <ul className="mt-[4px] flex list-disc flex-col gap-[4px] pl-[18px] text-[12px] italic leading-[1.55] text-[#5D5D5D]">
        <li>
          &ldquo;What market themes are trending in my Growth Platform&rsquo;s
          space?&rdquo;
        </li>
        <li>
          &ldquo;How do these themes relate to Deloitte offerings and joint
          value propositions?&rdquo;
        </li>
        <li>&ldquo;Which themes have the most momentum?&rdquo;</li>
      </ul>
      <p className="mt-[10px] text-[12px] font-semibold text-[#1F1F1F]">
        Data needed
      </p>
      <p className="mt-[4px] text-[12px] italic leading-[1.55] text-[#5D5D5D]">
        trending market themes; mapping to Deloitte offerings; &ldquo;Sell
        With&rdquo; opportunity list; volume/value scoring
      </p>

      <h3 className="mt-[20px] text-[16px] font-semibold text-[#1F1F1F]">
        4. EXPLICIT NON-GOALS
      </h3>
      <ul className="mt-[6px] flex list-disc flex-col gap-[4px] pl-[18px] text-[12px] leading-[1.55] text-[#1F1F1F]">
        <li>Not redesigning full Growth Platform Deep Dive module</li>
        <li>Not replicating Account Deep Dive</li>
        <li>Not changing approval logic</li>
      </ul>
    </div>
  );
}

function SectionBrd() {
  return (
    <SectionWrap id="s06">
      <SectionHeader
        chip="CHALLENGE 04"
        number="06"
        headline={
          <>
            BRDs that sent us in circles.
            <br />
            Two principles ended the loop.
          </>
        }
      />
      <Lede>
        Pipeline 자체를 고쳐도 <em>input이 망가져 있으면</em> output은 망가진다.
        GIA의 input은 BRD였고, BRD는 매번 디자이너를 같은 loop으로 보냈다.
      </Lede>

      <BrdChaosLoop />

      <SubHeader>WHY THE LOOP HAPPENED</SubHeader>
      <ol className="mt-[12px] flex max-w-[720px] list-decimal flex-col gap-[12px] pl-[20px] text-[16px] leading-[1.7] text-[#1F1F1F] tablet:text-[16px]">
        <li>
          <strong>BRD가 UX spec을 결정해버렸다.</strong> &ldquo;여기다가 버튼을
          놓아라&rdquo; — 이게 acceptance criteria로 박혀 있었다. 디자이너가
          design 결정을 할 공간이 사라졌다.
        </li>
        <li>
          <strong>&ldquo;왜&rdquo;에 대한 질문이 없었다.</strong> 어떤 user
          결정을 돕기 위한 화면인지가 BRD 어디에도 없었다. 디자이너는 매번 그
          질문을 sprint 중간에 PM에게 다시 물었다.
        </li>
        <li>
          <strong>전달해야 하는 정보는 적혀 있었지만, 그 정보가 어떤 질문에
          답하기 위한 건지가 없었다.</strong> 그래서 정보의 granularity 판단이 안
          됐다. 모든 정보가 동등한 비중으로 화면에 떨어졌고 → 정보의 홍수로
          끝났다.
        </li>
      </ol>

      <SubHeader>MY MOVE — RADICALLY SIMPLE PRINCIPLES</SubHeader>
      <div className="mt-[12px]">
        <Body>
          여러 가지를 시도했지만 — 결국 가장 단순하게 정리한 두 줄이 통했다.
        </Body>
      </div>

      <PrincipleCards />

      <div className="mt-[28px]">
        <Body>
          이 두 가지를 prioritize 하는 것만으로 BRD 품질이 dramatically
          올라갔다. 디자이너가 sprint 중간에 같은 질문을 다시 묻는 일이 사라졌다.
          PM의 BRD 작성 시간도 줄었다 — UI를 spec하려고 애쓸 필요가 없으니까.
        </Body>
      </div>

      <SubHeader>
        DOCUMENT SAMPLE — UIUX STORY STRUCTURE (THE PRINCIPLES, OPERATIONALIZED)
      </SubHeader>
      <div className="mt-[12px]">
        <Body>
          두 principle을 다섯 section으로 풀었다. 각 section마다{" "}
          <em>content</em>(무엇을 적는가) + <em>validation rule</em>(어떻게
          검증하는가)이 붙는다. 순서가 중요 — outcome은 problem 정의 후에만 정의
          가능; questions는 outcome 정의 후에만 enumeration 가능.
        </Body>
      </div>

      <UiuxStoryTable />

      <SelfPolicingBanner />

      <SubHeader>REAL EXAMPLE — ALLIANCE LEADERS / &ldquo;SELL WITH&rdquo; BRD</SubHeader>
      <BrdExampleTablet />
    </SectionWrap>
  );
}

// ============================================================================
// §07 What's next — narrow column reflection
// ============================================================================

function SectionNext() {
  return (
    <SectionWrap id="s07" narrow>
      <SectionHeader eyebrow="Reflection" number="07" headline={<>What&rsquo;s next.</>} />
      <Body>
        GIA는 아직 진행 중이다 (Jan 2024 — present). 네 challenge 모두 baseline은
        잡혔지만, 매 sprint마다 새로운 sub-problem이 같은 framework으로 풀리고
        있는 게 가장 좋은 신호다 — <em>genie test, two-track validation, 24-hour
        relay, BRD principles.</em> 다음에 carry over 할 것들 —
      </Body>

      <blockquote
        className="mt-[40px] max-w-[640px] text-[22px] italic leading-[1.5] text-[#1F1F1F] tablet:text-[24px]"
        style={SERIF}
      >
        &ldquo;Walk in with the validation framework. Refuse to argue
        preferences. Build a structure that lives after the role ends.&rdquo;
      </blockquote>
      <p className="mt-[12px] text-[12px] tracking-[0.04em] text-[#5D5D5D]">
        — <Tbd>Soonk&rsquo;s voice</Tbd>
      </p>

      <ul className="mt-[40px] flex flex-col">
        {[
          "다음 engagement에서 어떤 변형으로 framework을 가져갈지",
          "GIA 자체에서 다음 분기 우선순위",
          "forward-looking — what GIA teaches future Soonk",
        ].map((t, i) => (
          <li
            key={i}
            className="flex items-start gap-[12px] border-t-[0.5px] border-[#A0A0A0] py-[20px]"
          >
            <span
              aria-hidden
              className="mt-[6px] block size-[8px] shrink-0 bg-[#5D5D5D]"
            />
            <span className="text-[16px] leading-[1.6] text-[#5D5D5D] tablet:text-[16px]">
              <Tbd>bullet {i + 1}: {t}</Tbd>
            </span>
          </li>
        ))}
      </ul>
    </SectionWrap>
  );
}

// ============================================================================
// Root
// ============================================================================

export default function GiaCaseStudy() {
  return (
    <div className="bg-[#EEEEEE] text-[#1F1F1F]">
      {/* §01 Hero — full-bleed, no left nav */}
      <Hero />

      {/* §02–07 — sticky left nav + main column */}
      <div className="mx-auto flex max-w-[1200px] flex-col px-[24px] tablet:flex-row tablet:gap-[40px] tablet:px-[60px]">
        <CaseStudyLeftNav
          currentSlug="gia"
          readTime="~9 min read"
          sections={SECTIONS}
        />
        <div className="min-w-0 flex-1">
          <SectionProject />
          <SectionRituals />
          <SectionVisualizations />
          <SectionOffshore />
          <SectionBrd />
          <SectionNext />
        </div>
      </div>
    </div>
  );
}
