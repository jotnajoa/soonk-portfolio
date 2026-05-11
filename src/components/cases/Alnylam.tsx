// Alnylam SSOT case study (project 05 in the canonical list).
//
// Spec source: /Volumes/External/Portfolio_Website_26/_spec_alnylam.md
// Build brief: /Volumes/External/Portfolio_Website_26/_brief_alnylam_for_build.md
//
// Editorial principle: operator-under-constraint.  One signature move
// ("wrong on purpose") gets shown in depth, proven by the annotated
// artifacts themselves, then quantified by the business outcome.  The
// hire signal is velocity through a hard timebox.
//
// Visual system: pure monochrome — same chassis as Toyota / Teachable /
// POMEs.  The brief names a cream palette (#efece4 ground, #3A342E ink)
// but Soonk's portfolio is locked monochrome on #EEEEEE, so the page-
// chrome tokens (bg #EEEEEE / ink #1F1F1F / muted #5D5D5D / tertiary
// #A0A0A0 / surface #F4F4F4) override the brief.  The only chromatic
// content lives inside the sketch artifacts themselves — red, pink,
// green SME annotations baked into the screenshots.
//
// Layout split (Toyota pattern):
//   §01 Hero      — full-bleed, no left nav (max-w-[1200px] internal)
//   §02–06        — left sticky nav (140px) + content column

import CaseStudyLeftNav, {
  type CaseStudySection,
} from "./CaseStudyLeftNav";

const MONO: React.CSSProperties = {
  fontFamily:
    "var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
};

const SERIF: React.CSSProperties = {
  fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
};

const SECTIONS: CaseStudySection[] = [
  { id: "constraint", num: "02", label: "Constraint" },
  { id: "method", num: "03", label: "Method", star: true },
  { id: "practice", num: "04", label: "In practice", star: true },
  { id: "outcome", num: "05", label: "Outcome" },
  { id: "reflection", num: "06", label: "Reflection" },
];

// ============================================================================
// Reusable atoms
// ============================================================================

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-[18px] text-[12px] tracking-[0.16em] font-medium text-[#5D5D5D]">
      {children}
    </p>
  );
}

function SectionHead({ n, title }: { n: string; title: React.ReactNode }) {
  return (
    <div className="mb-[22px] grid grid-cols-[80px_1fr] items-start gap-[18px] min-[960px]:grid-cols-[110px_1fr] min-[960px]:gap-[24px]">
      <div className="text-[64px] leading-[0.85] font-extrabold tracking-[-0.05em] text-[#1F1F1F] min-[960px]:text-[88px]">
        {n}
      </div>
      <h2 className="max-w-[720px] pt-1 text-[24px] leading-[1.25] font-medium tracking-[-0.02em] text-[#1F1F1F] min-[960px]:pt-[10px] min-[960px]:text-[32px]">
        {title}
      </h2>
    </div>
  );
}

function Lede({ children }: { children: React.ReactNode }) {
  return (
    <p className="my-[18px] max-w-[680px] text-[18px] leading-[1.55] font-medium text-[#1F1F1F]">
      {children}
    </p>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <p className="my-[14px] max-w-[680px] text-[16px] leading-[1.7] text-[#1F1F1F]">
      {children}
    </p>
  );
}

function Strong({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold">{children}</strong>;
}

// Section wrapper — first section just sets scroll-margin; subsequent
// sections add a 56-px top spacer + hairline rule (Toyota pattern).
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
          ? "scroll-mt-[80px] pt-[40px] tablet:pt-[56px]"
          : "mt-[56px] scroll-mt-[80px] border-t border-[#A0A0A0] pt-[56px]"
      }
    >
      {children}
    </section>
  );
}

// ============================================================================
// §01 Hero — Wordmark · desktop frame w/ Lead-Time sketch · meta · ribbon
// ============================================================================

// Desktop-frame component — replaces VoltHop's PhoneFrame for this case.
// 1.5-px outline, 8-px radius, browser-bar-style top with three dots +
// mono caption strip top + bottom.  The "frame" itself is part of the
// thesis: this is software the war-room sketched into existence, so
// presenting the sketch inside a desktop chrome reads as evidence, not
// decoration.
function DesktopFrame({
  src,
  alt,
  topCaption,
  bottomCaption,
}: {
  src: string;
  alt: string;
  topCaption: string;
  bottomCaption: string;
}) {
  return (
    <div className="overflow-hidden rounded-[8px] border-[1.5px] border-[#1F1F1F] bg-[#EEEEEE]">
      <div className="flex h-[22px] items-center gap-[5px] border-b border-[#1F1F1F]/25 px-[10px]">
        <span
          aria-hidden
          className="size-[7px] rounded-full border-[0.5px] border-[#1F1F1F]/40"
        />
        <span
          aria-hidden
          className="size-[7px] rounded-full border-[0.5px] border-[#1F1F1F]/40"
        />
        <span
          aria-hidden
          className="size-[7px] rounded-full border-[0.5px] border-[#1F1F1F]/40"
        />
        <span
          className="ml-auto text-[9px] tracking-[0.04em] text-[#5D5D5D]"
          style={MONO}
        >
          {topCaption}
        </span>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="block w-full" />
      <div
        className="border-t border-[#1F1F1F]/25 bg-[#1F1F1F]/[0.04] px-[12px] py-[8px] text-[9px] tracking-[0.04em] text-[#5D5D5D]"
        style={MONO}
      >
        {bottomCaption}
      </div>
    </div>
  );
}

function SectionHero() {
  return (
    <section
      id="intro"
      className="mx-auto max-w-[1200px] px-[32px] pt-[40px] pb-[40px] min-[560px]:pt-[64px] min-[560px]:pb-[48px]"
    >
      <Eyebrow>+ 01 / Intro</Eyebrow>

      {/* Wordmark — pure typographic treatment.  No Alnylam logo SVG;
          the case is about the method, not the brand. */}
      <div className="mb-[48px] flex flex-wrap items-end leading-none min-[560px]:mb-[64px] min-[960px]:mb-[72px]">
        <span className="text-[56px] font-semibold leading-[0.9] tracking-[-0.04em] text-[#1F1F1F] min-[560px]:text-[80px] min-[960px]:text-[112px]">
          Alnylam SSOT
        </span>
      </div>

      {/* Hero 2-col — desktop frame (Lead Time sketch) left, tagline +
          meta right.  Stacks vertically below tablet. */}
      <div className="mb-[40px] grid gap-[32px] tablet:mb-[48px] tablet:grid-cols-[1.2fr_1fr] tablet:items-start tablet:gap-[40px]">
        <DesktopFrame
          src="/work/alnylam/sketch-01-lead-time.jpeg"
          alt="Lead Time Dashboard wireframe with red SME annotation reading 'Knowing individual batches' time doesn't help'"
          topCaption="Lead Time Dashboard · sketch v1 · day-one war room"
          bottomCaption={"SME annotation in red — “Knowing individual batches’ time doesn’t help.”"}
        />

        <div className="flex min-w-0 flex-col gap-[28px] tablet:gap-[32px]">
          <p className="max-w-[480px] text-[22px] leading-[1.4] font-medium tracking-[-0.01em] text-[#1F1F1F] min-[560px]:text-[24px] min-[960px]:text-[28px]">
            Sketches as catalysts, not artifacts. The wrong one made the right
            one obvious.
          </p>

          <dl className="border-t border-[#A0A0A0]">
            {[
              ["Role", "Senior IC"],
              ["Timeline", "8 weeks fixed → engagement expanded"],
              [
                "Impact",
                "Shipped · +690% YoY client revenue · 4 follow-on engagements",
              ],
            ].map(([l, v]) => (
              <div
                key={l}
                className="grid grid-cols-[90px_1fr] items-baseline gap-[14px] border-b border-[#A0A0A0] py-[12px]"
              >
                <dt
                  className="text-[11px] font-medium tracking-[0.06em] text-[#5D5D5D]"
                  style={MONO}
                >
                  {l}
                </dt>
                <dd className="text-[14px] leading-[1.55] text-[#1F1F1F]">
                  {v}
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
// §02 The constraint — 4-card stat row + body
// ============================================================================

function ConstraintCard({ n, l }: { n: string; l: string }) {
  return (
    <div className="flex flex-col gap-[10px] rounded-[8px] border-[1.5px] border-[#1F1F1F] bg-[#F4F4F4] px-[18px] py-[18px]">
      <span className="text-[28px] font-semibold leading-[1] tracking-[-0.02em] text-[#1F1F1F] min-[560px]:text-[32px]">
        {n}
      </span>
      <span className="text-[11px] leading-[1.5] text-[#5D5D5D]">{l}</span>
    </div>
  );
}

function SectionConstraint() {
  return (
    <Section id="constraint" first>
      <Eyebrow>+ The constraint</Eyebrow>
      <SectionHead
        n="02"
        title={
          <>
            Two months. Fixed budget.<br />
            A platform the client was about to bet a lot on.
          </>
        }
      />
      <Lede>
        Alnylam&rsquo;s SSOT consolidates program data scattered across R&amp;D,
        Clinical, and Launch into one platform. Discovery couldn&rsquo;t run
        long. Stakeholder groups were using the same words
        (&ldquo;milestone,&rdquo; &ldquo;phase&rdquo;) to mean different
        things, and a workshop or two wasn&rsquo;t going to surface it.
        Traditional UX rhythm would have caught the misalignment three weeks
        before launch — too late.
      </Lede>

      <p
        className="mt-[28px] mb-[10px] text-[12px] tracking-[0.08em] text-[#5D5D5D]"
        style={MONO}
      >
        THE FOUR CONSTRAINTS THAT RULED OUT TRADITIONAL PROCESS
      </p>

      <div className="my-[18px] grid grid-cols-1 gap-[14px] min-[560px]:grid-cols-2 min-[960px]:grid-cols-4">
        <ConstraintCard
          n="8 wks"
          l="Fixed timeline · zero buffer · no recoverable slip room"
        />
        <ConstraintCard
          n="Fixed"
          l="Budget locked at contract · scope creep forbidden"
        />
        <ConstraintCard
          n="3+"
          l="Stakeholder groups · overlapping vocab, different mental models"
        />
        <ConstraintCard
          n="High"
          l="Stakes · clinical-trial timelines downstream of the platform"
        />
      </div>

      <Body>
        The choice wasn&rsquo;t between fast and slow. It was between{" "}
        <em>what surfaces misalignment fastest</em>. Discovery interviews
        surface stated preferences. Workshops surface group consensus. Neither
        surfaces what a stakeholder actually believes about a specific data
        view until they see one and react to it. So the method had to start at
        the artifact.
      </Body>
    </Section>
  );
}

// ============================================================================
// §03 The method ★ — Workflow loop SVG + pull quote + body
// ============================================================================

// Inline SVG redraw of the war-room loop.  The "Sketch" node is filled
// black with white text — visual inversion against the other open boxes
// is the emphasis (Soonk's feedback: "Wrong on purpose 하이라이트 쌔게
// 넣어줘").  Two looping arrows close the cycle: sign-off → build, build
// → SME input.  Monochrome — the only chromatic content elsewhere on the
// page is the SME annotations inside the sketch images.
function WorkflowLoopDiagram() {
  return (
    <figure className="my-[28px] rounded-[10px] border-[1.5px] border-[#1F1F1F] bg-[#1F1F1F]/[0.03] px-[18px] py-[28px] tablet:px-[28px]">
      <svg
        viewBox="0 0 800 280"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        className="block h-auto w-full"
        role="img"
        aria-labelledby="alnylam-wf-title alnylam-wf-desc"
      >
        <title id="alnylam-wf-title">War-room workflow loop</title>
        <desc id="alnylam-wf-desc">
          Daily war-room loop: SME Input feeds a deliberately-flawed Sketch
          (the wrong-on-purpose step), which routes through Strategic
          Alignment, Engineering Feasibility, and Sign-off; sign-off then
          triggers the Build of the data pipeline and frontend, which loops
          back to SME Input for the next iteration.
        </desc>
        <defs>
          <marker
            id="alnylam-arr"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" fill="#1F1F1F" />
          </marker>
        </defs>
        {/* Open boxes — every node except Sketch */}
        <g fill="none" stroke="#1F1F1F" strokeWidth="1">
          <rect x="20" y="40" width="120" height="68" rx="10" />
          <rect x="320" y="40" width="120" height="68" rx="10" />
          <rect x="470" y="40" width="120" height="68" rx="10" />
          <rect x="620" y="40" width="140" height="68" rx="10" />
          {/* Bottom box — Build */}
          <rect x="320" y="190" width="200" height="68" rx="10" />
        </g>
        {/* Sketch node — solid black fill, the emphasis */}
        <rect
          x="170"
          y="40"
          width="120"
          height="68"
          rx="10"
          fill="#1F1F1F"
          stroke="#1F1F1F"
          strokeWidth="1"
        />
        {/* Labels — open nodes (dark on cream) */}
        <g
          fill="#1F1F1F"
          fontFamily="-apple-system, Inter, sans-serif"
          fontSize="13"
          textAnchor="middle"
        >
          <text x="80" y="78">SME Input</text>
          <text x="380" y="70">Strategic</text>
          <text x="380" y="88">Alignment</text>
          <text x="530" y="70">Engineering</text>
          <text x="530" y="88">Feasibility</text>
          <text x="690" y="70">Sign-off for</text>
          <text x="690" y="88">the approach</text>
          <text x="420" y="220">Build data pipeline</text>
          <text x="420" y="238">+ frontend</text>
        </g>
        {/* Sketch labels — light on black, bigger & bolder */}
        <text
          x="230"
          y="72"
          fontFamily="-apple-system, Inter, sans-serif"
          fontSize="15"
          fontWeight="700"
          fill="#F4F4F4"
          textAnchor="middle"
        >
          Sketch
        </text>
        <text
          x="230"
          y="94"
          fontSize="11"
          fill="#F4F4F4"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          letterSpacing="0.12em"
          fontWeight="600"
          textAnchor="middle"
        >
          WRONG-ON-PURPOSE
        </text>
        {/* Arrows — sequential top row */}
        <g
          stroke="#1F1F1F"
          strokeWidth="1"
          fill="none"
          markerEnd="url(#alnylam-arr)"
        >
          <line x1="142" y1="74" x2="166" y2="74" />
          <line x1="292" y1="74" x2="316" y2="74" />
          <line x1="442" y1="74" x2="466" y2="74" />
          <line x1="592" y1="74" x2="616" y2="74" />
          {/* Sign-off → Build (down right) */}
          <path d="M 690 110 V 165 H 520 V 188" />
          {/* Build → SME Input (loop back left) */}
          <path d="M 320 224 H 80 V 112" />
        </g>
      </svg>
      <figcaption
        className="mt-[16px] text-center text-[11px] tracking-[0.04em] text-[#5D5D5D]"
        style={MONO}
      >
        Fig. 1 · The loop runs daily, not weekly. Wrong-on-purpose lives at
        Sketch.
      </figcaption>
    </figure>
  );
}

function SectionMethod() {
  return (
    <Section id="method">
      <Eyebrow>+ The method</Eyebrow>
      <SectionHead
        n="03"
        title={
          <>
            I drew the wrong thing first —<br />
            on purpose.
          </>
        }
      />
      <Lede>
        In a room of senior stakeholders, abstract questions get diplomatic
        answers. Concrete artifacts get specific ones. A deliberately-flawed
        sketch gives the room a target to disagree with — which is the only
        kind of disagreement that&rsquo;s actionable. &ldquo;I&rsquo;m not
        sure about the timeline view&rdquo; is a design problem. &ldquo;No,
        that should be quarterly not monthly&rdquo; is a spec.
      </Lede>

      <WorkflowLoopDiagram />

      <figure className="my-[28px] max-w-[560px] border-l-2 border-[#1F1F1F] pl-[18px]">
        <blockquote
          className="text-[20px] leading-[1.45] italic text-[#1F1F1F]"
          style={SERIF}
        >
          &ldquo;Knowing individual batches&rsquo; time doesn&rsquo;t help.&rdquo;
        </blockquote>
        <figcaption
          className="mt-[10px] text-[12px] text-[#5D5D5D]"
          style={MONO}
        >
          — handwritten on the Lead Time dashboard, week one
        </figcaption>
      </figure>

      <Body>
        The annotation isn&rsquo;t feedback. It&rsquo;s the spec. By the time
        an SME has written{" "}
        <em>
          &ldquo;Knowing individual batches&rsquo; time doesn&rsquo;t help&rdquo;
        </em>{" "}
        in red on a wireframe, the next sketch is already specified: kill the
        per-batch view, build a phase-level rollup. No translation step. No
        &ldquo;let me write that up.&rdquo; The artifact closes the loop.
      </Body>
    </Section>
  );
}

// ============================================================================
// §04 In practice ★ — Sketch gallery (2×2) + shipped-interaction sub-block
// ============================================================================

function SketchTile({
  src,
  alt,
  tag,
  title,
  children,
}: {
  src: string;
  alt: string;
  tag: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="flex flex-col overflow-hidden rounded-[8px] border border-[#1F1F1F]/20 bg-[#EEEEEE]">
      <div className="aspect-[3/2] overflow-hidden border-b border-[#1F1F1F]/15 bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="px-[16px] py-[14px]">
        <span
          className="mb-[10px] inline-block rounded-[3px] bg-[#1F1F1F]/[0.06] px-[7px] py-[3px] text-[9px] tracking-[0.05em] text-[#1F1F1F]"
          style={MONO}
        >
          {tag}
        </span>
        <h3 className="mb-[6px] text-[14px] font-medium leading-[1.3] text-[#1F1F1F]">
          {title}
        </h3>
        <p className="text-[12px] leading-[1.6] text-[#5D5D5D]">{children}</p>
      </div>
    </article>
  );
}

// 8-week emphasis callout — inverted dark slab.  Matches the
// "Wrong-on-purpose" treatment in §03 (Sketch node fill) so the two
// signature beats of the page share one visual grammar of emphasis.
function EightWeekCallout() {
  return (
    <aside className="my-[28px] max-w-[680px] rounded-[12px] bg-[#1F1F1F] px-[24px] py-[20px] tablet:px-[28px] tablet:py-[24px]">
      <p
        className="text-[11px] tracking-[0.18em] font-medium text-[#A0A0A0]"
        style={MONO}
      >
        8-WEEK CLOCK · AGGRESSIVE TIMELINE
      </p>
      <p className="mt-[10px] text-[18px] leading-[1.45] font-medium text-[#F4F4F4] tablet:text-[20px]">
        No room for write-ups, debrief decks, or &ldquo;we&rsquo;ll circle
        back on this.&rdquo; The room was fast because the room was
        concrete.
      </p>
    </aside>
  );
}

function SectionPractice() {
  return (
    <Section id="practice">
      <Eyebrow>+ In practice</Eyebrow>
      <SectionHead
        n="04"
        title={
          <>
            The annotations<br />
            ARE the spec.
          </>
        }
      />
      <Lede>
        Four sketches from the eight weeks. Each one carries the SME reaction
        it provoked, still on the page. The case study doesn&rsquo;t have to
        describe the method — it&rsquo;s drawn in the margins.
      </Lede>

      <div className="my-[24px] grid grid-cols-1 gap-[18px] min-[560px]:grid-cols-2">
        <SketchTile
          src="/work/alnylam/sketch-01-lead-time.jpeg"
          alt="Lead Time Dashboard sketch with red annotation: 'Knowing individual batches' time doesn't help'"
          tag="SKETCH 01 · LEAD TIME"
          title="Wrong altitude."
        >
          Per-batch granularity drowned the signal. SME annotation in red:{" "}
          <em>
            &ldquo;Knowing individual batches&rsquo; time doesn&rsquo;t help.&rdquo;
          </em>{" "}
          <Strong>Spec:</Strong> cut the per-batch view, ship a phase-level
          rollup.
        </SketchTile>

        <SketchTile
          src="/work/alnylam/sketch-02-inventory-level.png"
          alt="Inventory Level Tracker sketch with pink-box annotation on the Storage Location filter: 'We might not need'"
          tag="SKETCH 02 · INVENTORY LEVEL"
          title="Wrong scope."
        >
          A Storage Location filter was drawn in. Pink-box reaction:{" "}
          <em>&ldquo;We might not need.&rdquo;</em>{" "}
          <Strong>Spec:</Strong> cut the dropdown, simplify the chrome.
        </SketchTile>

        <SketchTile
          src="/work/alnylam/sketch-03-option2-stacked.png"
          alt="Option 2 stacked-bar sketch with green sticky note: 'Focusing expiring RM and highlight them'"
          tag="SKETCH 03 · OPTION 2"
          title="Wrong emphasis."
        >
          Equal-weight stacked bars buried urgent batches. Green sticky:{" "}
          <em>&ldquo;Focusing expiring RM and highlight them.&rdquo;</em>{" "}
          <Strong>Spec:</Strong> dim non-expiring, emphasize expiring.
        </SketchTile>

        <SketchTile
          src="/work/alnylam/sketch-04-sankey-explorations.png"
          alt="Three Sankey-diagram explorations on a single canvas with multi-color sticky-note annotations"
          tag="SKETCH 04 · SANKEY EXPLORATIONS"
          title="The sketch is the conversation."
        >
          Three Sankey options on one canvas, sticky-notes everywhere. No
          deck. No write-up. <Strong>Spec:</Strong> the meeting is the
          artifact.
        </SketchTile>
      </div>
      <p
        className="my-[8px] text-center text-[11px] tracking-[0.06em] text-[#5D5D5D]"
        style={MONO}
      >
        ↑ Annotation = spec. No translation step. ↑
      </p>

      <EightWeekCallout />

      <Body>
        Every sketch went out at end-of-day with annotations on it. Every
        morning started with the next version of the same sketch.
      </Body>
    </Section>
  );
}

// ============================================================================
// §05 Outcome — Stats callout (4-up) + impact cards (3-up) + shipped output
// ============================================================================

function StatsCallout() {
  const stats: { n: string; l: string; aria?: string }[] = [
    { n: "690%", l: "Client revenue growth YoY", aria: "690 percent" },
    { n: "5 yrs", l: "Highest growth on this client in 5 yrs" },
    { n: "4", l: "Additional engagements signed" },
    { n: "3", l: "More pharma initiatives followed" },
  ];
  return (
    <div className="my-[24px] rounded-[8px] border-[1.5px] border-[#1F1F1F] bg-[#1F1F1F]/[0.04] p-[24px] tablet:p-[28px]">
      <p
        className="mb-[18px] text-[11px] tracking-[0.12em] text-[#5D5D5D]"
        style={MONO}
      >
        RECEIPT — WHAT THE ENGAGEMENT RETURNED
      </p>
      <dl className="grid grid-cols-2 gap-[16px] min-[720px]:grid-cols-4">
        {stats.map((s) => (
          <div key={s.l} className="flex flex-col gap-[6px]">
            <dt className="sr-only">{s.l}</dt>
            <dd
              aria-label={s.aria}
              className="text-[32px] font-semibold leading-[1] tracking-[-0.02em] text-[#1F1F1F]"
            >
              {s.n}
            </dd>
            <span className="text-[11px] leading-[1.5] text-[#5D5D5D]">
              {s.l}
            </span>
          </div>
        ))}
      </dl>
    </div>
  );
}

function ImpactCard({
  num,
  head,
  bullets,
}: {
  num: string;
  head: string;
  bullets: React.ReactNode[];
}) {
  return (
    <article className="flex flex-col gap-[10px] rounded-[8px] border border-[#1F1F1F]/20 bg-[#1F1F1F]/[0.02] p-[18px]">
      <span
        className="text-[10px] tracking-[0.08em] text-[#5D5D5D]"
        style={MONO}
      >
        {num}
      </span>
      <h3 className="text-[14px] font-medium leading-[1.35] text-[#1F1F1F]">
        {head}
      </h3>
      <ul className="flex flex-col gap-[8px]">
        {bullets.map((b, i) => (
          <li
            key={i}
            className="grid grid-cols-[10px_1fr] items-baseline gap-[10px] text-[12px] leading-[1.6] text-[#1F1F1F]"
          >
            <span aria-hidden className="text-[#5D5D5D]">
              ·
            </span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function SectionOutcome() {
  return (
    <Section id="outcome">
      <Eyebrow>+ The outcome</Eyebrow>
      <SectionHead
        n="05"
        title={
          <>
            Eight weeks in.<br />
            The engagement expanded.
          </>
        }
      />
      <Lede>
        The hard constraint wasn&rsquo;t a ceiling on the project — it was a
        floor for trust. Velocity at fixed scope was the proof. The expansion
        came not from a single deliverable, but from a cadence the client
        decided to keep buying.
      </Lede>

      <StatsCallout />

      <div className="my-[24px] grid grid-cols-1 gap-[18px] min-[720px]:grid-cols-3">
        <ImpactCard
          num="01 / PROJECT EXPANSION"
          head="A proof-of-concept the client kept buying."
          bullets={[
            <>
              Led directly to <Strong>4 additional engagements</Strong> to
              scale digital transformation
            </>,
            "Positioned the SSOT as a proof-of-concept for broader platformization",
            "Client gained confidence in what could be achieved within severe limitations",
          ]}
        />
        <ImpactCard
          num="02 / DIRECT REVENUE"
          head="Cadence-driven trust → top-line growth."
          bullets={[
            <>
              Revenue from the client grew <Strong>690%</Strong> compared to
              the previous year
            </>,
            <>
              Marked the <Strong>highest growth in 5 years</Strong> across
              this account
            </>,
            "Trust built on velocity, not deliverable polish",
          ]}
        />
        <ImpactCard
          num="03 / PERSONAL BRAND"
          head="Sector-specific demand established."
          bullets={[
            <>
              Became a trusted design lead in{" "}
              <Strong>Life Sciences and Healthcare</Strong> initiatives
            </>,
            <>
              Pulled into <Strong>3 more pharma initiatives</Strong> right
              after this engagement
            </>,
            "Method generalized into a Life-Sciences-track playbook",
          ]}
        />
      </div>

    </Section>
  );
}

// ============================================================================
// §06 Reflection — Italic reflection + 2 lesson cards + Works/Fails 2-col
// ============================================================================

function LessonCard({
  head,
  children,
}: {
  head: string;
  children: React.ReactNode;
}) {
  return (
    <aside className="my-[18px] rounded-r-[6px] border-l-2 border-[#1F1F1F] bg-[#1F1F1F]/[0.04] px-[18px] py-[14px]">
      <h3 className="mb-[6px] text-[14px] font-medium leading-[1.35] text-[#1F1F1F]">
        {head}
      </h3>
      <p className="text-[13px] leading-[1.7] text-[#1F1F1F]">{children}</p>
    </aside>
  );
}

function TravelsCol({ head, items }: { head: string; items: string[] }) {
  return (
    <div className="rounded-[6px] border border-[#1F1F1F]/20 px-[16px] py-[14px]">
      <p
        className="mb-[10px] text-[10px] tracking-[0.08em] text-[#5D5D5D]"
        style={MONO}
      >
        {head}
      </p>
      <ul className="flex flex-col gap-[4px]">
        {items.map((it, i) => (
          <li
            key={i}
            className="grid grid-cols-[10px_1fr] items-baseline gap-[10px] text-[12px] leading-[1.65] text-[#1F1F1F]"
          >
            <span aria-hidden className="text-[#5D5D5D]">
              ·
            </span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SectionReflection() {
  return (
    <Section id="reflection">
      <Eyebrow>+ Reflection</Eyebrow>
      <SectionHead
        n="06"
        title={
          <>
            Where this method<br />
            earns its place.
          </>
        }
      />

      <p
        className="my-[24px] max-w-[560px] text-[20px] leading-[1.5] italic text-[#1F1F1F]"
        style={SERIF}
      >
        Wrong-on-purpose works when the room is smart, the constraint is hard,
        and the cost of mid-flight misalignment is high. It fails when
        stakeholders won&rsquo;t catch the mistake — then you&rsquo;ve just
        shipped wrong work.
      </p>

      <p
        className="mt-[28px] mb-[10px] text-[12px] tracking-[0.08em] text-[#5D5D5D]"
        style={MONO}
      >
        TWO TAKEAWAYS
      </p>

      <LessonCard head="01 · Adaptability over ritual">
        Process isn&rsquo;t sacred; the outcome is. UX rituals get cut when
        they don&rsquo;t earn their place against the clock. Sketch-first
        becomes the only rhythm that closes the loop daily.
      </LessonCard>

      <LessonCard head="02 · Situational leadership">
        UX doesn&rsquo;t need ideal conditions to create value. It needs the
        right leverage points. Under a hard timebox, the leverage point is
        the artifact — and the artifact has to be drawn before the room is
        ready for it.
      </LessonCard>

      <div className="mt-[36px]">
        <p
          className="mb-[10px] text-[12px] tracking-[0.08em] text-[#5D5D5D]"
          style={MONO}
        >
          WHERE THE METHOD TRAVELS
        </p>
        <div className="grid grid-cols-1 gap-[14px] min-[560px]:grid-cols-2">
          <TravelsCol
            head="WORKS"
            items={[
              "Senior cross-functional rooms",
              "Time-boxed engagements",
              "Regulated industries (pharma, finance, healthcare)",
              "Late-stage product correction",
            ]}
          />
          <TravelsCol
            head="FAILS"
            items={[
              "Early-stage clients without domain depth",
              "Junior stakeholders — wrong-on-purpose costs reputation without information",
              "Low-stakes UX",
              "Async-only teams (no daily review surface)",
            ]}
          />
        </div>
      </div>
    </Section>
  );
}

// ============================================================================
// Page composition
// ============================================================================

export default function AlnylamCaseStudy() {
  return (
    <>
      <SectionHero />

      {/* §02–06 — left sticky nav + content column */}
      <div className="mx-auto max-w-[1200px] px-[32px] pb-[80px]">
        <div className="flex tablet:gap-[40px]">
          <CaseStudyLeftNav
            currentSlug="alnylam"
            readTime="~6 min read"
            sections={SECTIONS}
          />
          <div className="min-w-0 flex-1">
            <SectionConstraint />
            <SectionMethod />
            <SectionPractice />
            <SectionOutcome />
            <SectionReflection />
          </div>
        </div>
      </div>
    </>
  );
}
