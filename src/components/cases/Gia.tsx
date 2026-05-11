// GIA Platform case study — light-mode editorial, aligned with the portfolio's
// design system and the sister POMEs case study at /work/pomes.
//
// Source: /Volumes/External/Portfolio_Website_26/prompt_for_claude_in_figma_GIA.md
//   + GIA Feedback PDF (Soonk Paik, May 2026).
// Visual reference: /Volumes/External/Portfolio_Website_26/.claude/worktrees/
//   silly-payne-aca7b5/src/app/work/pomes/page.tsx
//
// Design tokens (same as POMEs / landing — NOT the cream/c-graphite system
// from the original brief, which the feedback explicitly overrode):
//   bg          #EEEEEE
//   surface     #F4F4F4   (cards / callouts)
//   tile        #D9D9D9   (mid-grey thumbnails / chip)
//   text        #1F1F1F   (primary)
//   muted       #5D5D5D   (body)
//   tertiary    #A0A0A0   (caption, eyebrow, hairlines)
//
// Typography:
//   Section number   64–88px ExtraBold tracking -0.05em (JetBrains Mono)
//   Section title    22–28px medium tracking -0.02em (Archivo)
//   Sub-header       19px medium
//   Body / lede      15px / line-height 1.75 muted
//   Eyebrow          12px tracking 0.16em tertiary
//
// Structure (6 sections, per feedback):
//   §01 Intro              — full-bleed hero w/ GIA + Deloitte composite logo
//   §02 Project overview   — 5 modules, each a labeled placeholder + 1-liner
//   §03 Challenge · Rituals       (boiled UX cycle into a 3-step flow)
//   §04 Challenge · Visualizations (Forecasted Demand · Financial Metrics)
//   §05 Challenge · Offshore       (4-Type talent framework)
//   §06 Reflection & Impact

import type { CSSProperties } from "react";

const MONO =
  "var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, Menlo, monospace";
const MONO_STYLE: CSSProperties = { fontFamily: MONO };

// ===========================================================================
// Shared atoms
// ===========================================================================

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-[18px] text-[12px] tracking-[0.16em] text-[#A0A0A0]">
      {children}
    </div>
  );
}

function SectionHead({ n, title }: { n: string; title: React.ReactNode }) {
  return (
    <div className="mb-[22px] grid grid-cols-[80px_1fr] items-start gap-[18px] min-[960px]:grid-cols-[110px_1fr] min-[960px]:gap-[24px]">
      <div
        className="text-[64px] leading-[0.85] font-extrabold tracking-[-0.05em] text-[#1F1F1F] min-[960px]:text-[88px]"
        style={MONO_STYLE}
      >
        {n}
      </div>
      <h2 className="max-w-[600px] pt-1 text-[22px] leading-[1.2] font-medium tracking-[-0.02em] text-[#1F1F1F] min-[960px]:pt-[10px] min-[960px]:text-[28px]">
        {title}
      </h2>
    </div>
  );
}

function Lede({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-[18px] max-w-[620px] text-[15px] leading-[1.75] text-[#5D5D5D]">
      {children}
    </p>
  );
}

function Body({
  children,
  italic = false,
  className = "",
}: {
  children: React.ReactNode;
  italic?: boolean;
  className?: string;
}) {
  return (
    <p
      className={`my-[18px] max-w-[620px] text-[15px] leading-[1.75] text-[#5D5D5D] ${className}`}
      style={italic ? { fontStyle: "italic", fontSize: 17, color: "#1F1F1F" } : undefined}
    >
      {children}
    </p>
  );
}

function SubH({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-9 mb-[14px] max-w-[620px] text-[19px] leading-[1.3] font-medium text-[#1F1F1F]">
      {children}
    </h3>
  );
}

function Strong({ children }: { children: React.ReactNode }) {
  return <strong className="font-medium text-[#1F1F1F]">{children}</strong>;
}

// Section wrapper — mirrors PomesNav's expectation of `gia-{id}` anchors and
// `data-gia-section` so a left-nav scroll tracker can hook into it later.
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
      id={`gia-${id}`}
      data-gia-section
      className={
        first
          ? "scroll-mt-12"
          : "mt-[56px] scroll-mt-12 border-t border-[#A0A0A0] pt-[56px]"
      }
    >
      {children}
    </section>
  );
}

// Production-screenshot placeholder.  CSS background-image so a missing file
// 404s silently (no broken-image icon) and the label underneath shows
// through.  When Soonk drops the file at the expected path, the bg covers
// the label.
function Screenshot({
  src,
  alt,
  label,
  hint,
  className = "",
}: {
  src: string;
  alt: string;
  label: string;
  hint?: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[8px] bg-[#1F1F1F] p-[10px] min-[560px]:p-[14px] ${className}`}
      role="img"
      aria-label={alt}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-[4px] bg-white">
        <div className="absolute inset-0 z-0 flex flex-col items-center justify-center gap-[6px] bg-[#F4F4F4] p-[20px] text-center">
          <span className="text-[10px] tracking-[0.18em] font-medium text-[#A0A0A0]">
            PRODUCTION SCREENSHOT
          </span>
          <span className="max-w-[420px] text-[13px] leading-[1.5] font-medium text-[#1F1F1F]">
            {label}
          </span>
          {hint && (
            <span className="max-w-[420px] text-[11px] leading-[1.4] text-[#A0A0A0]">
              {hint}
            </span>
          )}
          <span
            className="mt-[6px] text-[10px] tracking-[0.06em] text-[#A0A0A0]"
            style={MONO_STYLE}
          >
            {src}
          </span>
        </div>
        <div
          className="absolute inset-0 z-10 bg-cover bg-center"
          style={{ backgroundImage: `url("${src}")` }}
        />
      </div>
    </div>
  );
}

// ===========================================================================
// Hero — full-bleed
// ===========================================================================

function Hero() {
  return (
    <section
      id="gia-intro"
      data-gia-section
      className="mx-auto max-w-[1080px] px-[20px] pt-[88px] pb-[40px] min-[560px]:px-[32px] min-[560px]:pt-[112px] min-[560px]:pb-[56px]"
    >
      <Eyebrow>+ 01 / Intro</Eyebrow>

      {/* Composite logo — GIA + Deloitte, baseline aligned (mirrors the home-
          page tile so the case-study reads as the same project) */}
      <div className="mb-[24px] flex flex-wrap items-center gap-[14px] min-[560px]:mb-[32px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/works/logos/GIA_Logo.svg"
          alt="GIA logo"
          className="h-[56px] w-auto min-[560px]:h-[72px] min-[960px]:h-[88px]"
        />
        <span className="px-[6px] text-[36px] leading-none font-black text-[#1F1F1F] min-[560px]:text-[48px]">
          +
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/works/logos/Deloittelogo.svg"
          alt="Deloitte logo"
          className="h-[56px] w-auto min-[560px]:h-[72px] min-[960px]:h-[88px]"
        />
      </div>

      <h1 className="mb-[10px] text-[64px] leading-[0.9] font-black tracking-[-0.05em] text-[#1F1F1F] min-[560px]:text-[96px] min-[960px]:text-[120px]">
        GIA Platform
      </h1>
      <p className="mb-[40px] text-[14px] tracking-[0.04em] text-[#5D5D5D] min-[560px]:text-[15px] min-[960px]:mb-[48px]">
        Growth Insights &amp; Activation · Deloitte enterprise platform
      </p>

      {/* 60/40 row — screenshot left, statement + role/scope right */}
      <div className="mb-[40px] grid gap-[28px] min-[720px]:grid-cols-[60%_40%] min-[720px]:gap-[40px] min-[960px]:mb-[48px]">
        <Screenshot
          src="/works/gia/forecasted-demand-after.png"
          alt="GIA Platform — Forecasted Demand chart, slope/dual-bar (production)"
          label="Forecasted Demand chart (live)"
          hint="Demand Sensing → Market Insights & Trends → Forecasted Demand · DAM tab · Industry: Consumer · FY 2027"
        />
        <div className="flex flex-col gap-[24px]">
          <p className="text-[20px] leading-[1.35] font-medium tracking-[-0.01em] text-[#1F1F1F] min-[560px]:text-[22px]">
            I joined a stalled enterprise platform and rebuilt how its design
            team operated — turning rituals into a flow, opinions into
            evidence, and headcount into a talent model.
          </p>
          <dl className="border-t border-[#A0A0A0]">
            {[
              ["Role", "UX Lead — onshore + offshore design teams"],
              [
                "Scope",
                "Design system · UX framework · cross-shore enablement · stakeholder validation",
              ],
            ].map(([l, v]) => (
              <div
                key={l}
                className="grid grid-cols-[80px_1fr] items-baseline gap-[16px] border-b border-[#A0A0A0] py-[14px]"
              >
                <dt className="text-[12px] font-medium tracking-[0.06em] text-[#A0A0A0]">
                  {l}
                </dt>
                <dd className="text-[14px] leading-[1.5] text-[#1F1F1F]">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Key Achievements — 3-up stat strip, full-bleed of the hero column.
          Numbers per the Reflection & Impact section of the feedback. */}
      <div className="grid grid-cols-1 gap-[14px] border-t border-[#A0A0A0] pt-[24px] min-[560px]:grid-cols-3 min-[560px]:gap-[24px]">
        {[
          [
            "43%",
            "Design cost savings",
            "Reduction through the offshore enablement model.",
          ],
          [
            "+435",
            "Early adopters",
            "Increased fidelity accelerated early releases.",
          ],
          [
            "×2",
            "Product launches",
            "Saved resources re-invested into parallel product launches.",
          ],
        ].map(([num, lbl, desc]) => (
          <div key={lbl} className="flex flex-col gap-[6px]">
            <div className="text-[12px] tracking-[0.16em] text-[#A0A0A0]">
              KEY ACHIEVEMENT
            </div>
            <div
              className="text-[44px] leading-[1] font-extrabold tracking-[-0.04em] text-[#1F1F1F] min-[960px]:text-[56px]"
              style={MONO_STYLE}
            >
              {num}
            </div>
            <div className="text-[15px] font-medium text-[#1F1F1F]">{lbl}</div>
            <div className="text-[12px] leading-[1.5] text-[#5D5D5D]">
              {desc}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ===========================================================================
// Left nav — sticky for ≥960
// ===========================================================================

const NAV_SECTIONS: Array<{ id: string; n: string; label: string }> = [
  { id: "intro", n: "01", label: "Intro" },
  { id: "overview", n: "02", label: "Project overview" },
  { id: "rituals", n: "03", label: "Challenge · Rituals" },
  { id: "visuals", n: "04", label: "Challenge · Visualizations" },
  { id: "offshore", n: "05", label: "Challenge · Offshore" },
  { id: "reflection", n: "06", label: "Reflection & impact" },
];

function GiaNav() {
  return (
    <aside className="sticky top-8 hidden self-start pt-1 text-[12px] min-[960px]:block">
      <div className="mb-[22px] tracking-[0.06em] text-[#A0A0A0]">
        ~8 MIN READ
      </div>
      <ol className="border-l border-[#A0A0A0]">
        {NAV_SECTIONS.map((s) => (
          <li key={s.id} className="py-2 pl-[14px] text-[#5D5D5D]">
            <a
              href={`#gia-${s.id}`}
              className="block tabular-nums hover:text-[#1F1F1F]"
            >
              <span className="mr-2">{s.n}</span>
              {s.label}
            </a>
          </li>
        ))}
      </ol>
    </aside>
  );
}

// ===========================================================================
// §02 Project overview — five modules
// ===========================================================================

type Module = {
  num: string;
  name: string;
  tagline: string;
  body: string;
  src: string;
  hint: string;
};

const MODULES: Module[] = [
  {
    num: "01",
    name: "Dashboard",
    tagline: "An always-on monitor.",
    body: "Surfaces a user's most-viewed views by preference — a single pane of glass for what each leader already cares about. Watch the market without re-finding the chart.",
    src: "/works/gia/dashboard.png",
    hint: "Dashboard — pinned modules, live metrics",
  },
  {
    num: "02",
    name: "Account targeting",
    tagline: "Find who fits.",
    body: "Filter the client universe by a leader's own criteria — industry, revenue band, deal stage, geography — and get back a short-list ready for targeted outreach.",
    src: "/works/gia/account-targeting.png",
    hint: "Account targeting — criteria builder + result list",
  },
  {
    num: "03",
    name: "Demand sensing",
    tagline: "Read the market.",
    body: "Surfaces market signals in each industry and sector so leaders can catch where the opportunity is moving and reposition Deloitte's offer early.",
    src: "/works/gia/demand-sensing.png",
    hint: "Demand sensing — Forecasted Demand by sector",
  },
  {
    num: "04",
    name: "Account deep dive",
    tagline: "360° on one account.",
    body: "A complete view of a single account — tech stack, contract history, financial/operational performance, and forward-looking opportunities — so a leader can walk into a meeting prepared.",
    src: "/works/gia/account-deep-dive.png",
    hint: "Account Deep Dive — 3M Company · Sales / Technology / Financial tabs",
  },
  {
    num: "05",
    name: "Growth platform (Alliance)",
    tagline: "Partner-led pipeline.",
    body: "How Deloitte and its alliance partners have sold together, and where the next \"sell with\" plays sit. Synergy made legible — not assumed.",
    src: "/works/gia/growth-platform.png",
    hint: "Growth Platform — Alliance partnerships + Sell-With opportunities",
  },
];

function ModuleRow({ m, reverse }: { m: Module; reverse: boolean }) {
  const visual = (
    <Screenshot
      src={m.src}
      alt={`GIA Platform — ${m.name} module`}
      label={`${m.name} (module)`}
      hint={m.hint}
    />
  );
  const text = (
    <div className="min-w-0">
      <div
        className="mb-[6px] text-[12px] tracking-[0.16em] text-[#A0A0A0]"
        style={MONO_STYLE}
      >
        MODULE {m.num}
      </div>
      <h3 className="mb-[12px] text-[22px] leading-[1.25] font-medium tracking-[-0.01em] text-[#1F1F1F]">
        {m.name} — <span className="text-[#5D5D5D]">{m.tagline}</span>
      </h3>
      <p className="text-[14px] leading-[1.7] text-[#5D5D5D]">{m.body}</p>
    </div>
  );
  return (
    <div className="my-[28px] grid grid-cols-1 items-center gap-[24px] min-[720px]:grid-cols-2 min-[720px]:gap-[40px]">
      {reverse ? (
        <>
          <div className="order-2 min-[720px]:order-1">{text}</div>
          <div className="order-1 min-[720px]:order-2">{visual}</div>
        </>
      ) : (
        <>
          {visual}
          {text}
        </>
      )}
    </div>
  );
}

function SectionOverview() {
  return (
    <Section id="overview">
      <Eyebrow>+ Project overview</Eyebrow>
      <SectionHead n="02" title="One platform, five modules — each a different decision domain." />
      <Lede>
        GIA is Deloitte&rsquo;s internal enterprise platform for Account
        Leaders, Alliance Leaders, and sales teams. Five modules sit inside
        one shell, each cut for a different audience and a different
        decision — together they take a leader from market signal to a
        prepared meeting.
      </Lede>
      {MODULES.map((m, i) => (
        <ModuleRow key={m.num} m={m} reverse={i % 2 === 1} />
      ))}
    </Section>
  );
}

// ===========================================================================
// §03 Challenge · Rituals — Outcome → User Story → Low-fi
// ===========================================================================

// Pipeline strip — 4 cards horizontal: Outcome (Genie) → User Story Map →
// Low-fi → Build.  Mobile collapses to a vertical stack.
function FlowPipeline() {
  const steps = [
    { tag: "01", label: "Identify outcome", note: "Genie question" },
    { tag: "02", label: "User story map", note: "Outcome → flow" },
    { tag: "03", label: "Low-fi wireframe", note: "Flow → blueprint" },
    { tag: "04", label: "Build", note: "Engineering hand-off" },
  ];
  return (
    <div className="my-[28px] overflow-x-auto pb-[4px]">
      <ol className="flex min-w-max items-stretch gap-[10px]">
        {steps.map((s, i) => (
          <li key={s.tag} className="flex items-stretch gap-[10px]">
            <div className="flex w-[160px] flex-col gap-[6px] rounded-[10px] bg-[#F4F4F4] px-[16px] py-[14px]">
              <span
                className="text-[10px] tracking-[0.16em] text-[#A0A0A0]"
                style={MONO_STYLE}
              >
                {s.tag}
              </span>
              <span className="text-[14px] leading-[1.3] font-medium text-[#1F1F1F]">
                {s.label}
              </span>
              <span className="text-[11px] leading-[1.4] text-[#5D5D5D]">
                {s.note}
              </span>
            </div>
            {i < steps.length - 1 && (
              <span
                aria-hidden
                className="self-center text-[18px] font-bold text-[#A0A0A0]"
              >
                →
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

function SectionRituals() {
  return (
    <Section id="rituals">
      <Eyebrow>+ Challenge 01 — Rituals over outcomes</Eyebrow>
      <SectionHead
        n="03"
        title={
          <>
            A stuck enterprise platform — and the four things I was asked to
            fix.
          </>
        }
      />
      <Lede>
        Each design pass was reverse-engineered from a feature, not an
        outcome. PMs handed over &ldquo;add a dropdown,&rdquo; designers
        drew it, review re-litigated it — and no one agreed on why the
        dropdown was there in the first place. Every sprint repeated the
        same conversation.{" "}
        <Strong>I needed a framework that moved them.</Strong>
      </Lede>
      <Body>
        So I boiled the cycle down to three steps that fed each other — and
        made it visible to PMs, engineering, and business stakeholders so
        the &ldquo;why are you doing this?&rdquo; question stopped landing
        in design reviews.
      </Body>

      <FlowPipeline />

      {/* Sub-block 01 — Identify outcome (Genie question) */}
      <SubH>01 · Identify the outcome — the Genie question</SubH>
      <Screenshot
        src="/works/gia/genie-test.png"
        alt="GIA Platform — Genie question worksheet"
        label="Genie question — workshop artifact"
        hint="Soonk to drop the actual screenshot here"
      />
      <Body>
        Before any wireframe, I asked stakeholders one question:{" "}
        <em>&ldquo;If a genie could grant you any outcome — ignoring
        feasibility — what would it be?&rdquo;</em> The genie removes
        constraints on purpose. Without it, teams design from what&rsquo;s
        easy to build; the conversation collapses into output and feature
        bloat, and no one can name the north star.
      </Body>
      <Body>
        With it, the right outcome surfaces — and so does whatever real
        constraint is blocking it. Both arrive in the same sentence. That
        becomes the source of truth for the next two steps.
      </Body>

      {/* Sub-block 02 — User story mapping */}
      <SubH>02 · User story mapping</SubH>
      <Screenshot
        src="/works/gia/user-story-map.png"
        alt="GIA Platform — User story map artifact"
        label="User story map — outcome → flow"
        hint="Soonk to drop the actual screenshot here"
      />
      <Body>
        Take the outcome from step one and lay out the path to it as a flow
        — who does what, in what order, against which data. The story map
        is what the low-fi wireframe is then built against; nothing in the
        wireframe should exist outside this map.
      </Body>

      {/* Sub-block 03 — Low-fi */}
      <SubH>03 · Low-fi wireframe</SubH>
      <Screenshot
        src="/works/gia/low-fi.png"
        alt="GIA Platform — Low-fi wireframe"
        label="Low-fi wireframe — engineering blueprint"
        hint="Soonk to drop the actual screenshot here"
      />
      <Body>
        The blueprint engineering reads — front-end <em>and</em> back-end.
        Layout, state, and data contracts in one artifact, derived from
        the story map. By the time it reaches review, the outcome is
        articulated, the flow is mapped, and the visual is the
        consequence — not the starting point.
      </Body>

      <Body italic>
        Three artifacts, one chain. Each makes the next one defensible.
      </Body>
    </Section>
  );
}

// ===========================================================================
// §04 Challenge · Visualizations — Forecasted Demand + Financial Metrics
// ===========================================================================

// "Existing visual" — schematic 4-quadrant scatter chart with overlapping
// bubbles, used to show what was wrong with the inherited Forecasted Demand
// chart.  Rendered larger than the old Fig. 02 so the issue is readable.
function ExistingForecastChart() {
  return (
    <figure className="my-[28px] flex flex-col gap-[12px]">
      <div className="relative aspect-[16/10] w-full max-w-[640px] overflow-hidden rounded-[8px] border border-[#A0A0A0] bg-[#F4F4F4]">
        <span className="absolute top-[14px] left-[20px] text-[10px] tracking-[0.18em] text-[#A0A0A0]">
          EXISTING VISUAL · 4-QUADRANT SCATTER
        </span>
        {/* Axes */}
        <span
          className="absolute bottom-[18px] left-1/2 -translate-x-1/2 text-[10px] tracking-[0.16em] text-[#A0A0A0]"
        >
          GROWTH RATE →
        </span>
        <span
          className="absolute top-1/2 left-[10px] origin-left -translate-y-1/2 -rotate-90 text-[10px] tracking-[0.16em] text-[#A0A0A0]"
        >
          FUTURE VALUE ↑
        </span>
        {/* Quadrant lines */}
        <span className="absolute top-[12%] bottom-[18%] left-1/2 w-px bg-[#A0A0A0]/40" />
        <span className="absolute top-1/2 right-[8%] left-[8%] h-px bg-[#A0A0A0]/40" />
        {/* Overlapping bubbles — labels A–E */}
        {[
          { l: "A", w: 96, t: 18, x: 60 },
          { l: "B", w: 72, t: 30, x: 50 },
          { l: "C", w: 84, t: 52, x: 22 },
          { l: "D", w: 56, t: 64, x: 22 },
          { l: "E", w: 44, t: 76, x: 12 },
        ].map((b) => (
          <span
            key={b.l}
            style={{
              width: b.w,
              height: b.w,
              top: `${b.t}%`,
              left: `${b.x}%`,
            }}
            className="absolute flex items-center justify-center rounded-full border border-[#5D5D5D] bg-[#D9D9D9]/70 text-[14px] font-medium text-[#1F1F1F]"
          >
            {b.l}
          </span>
        ))}
      </div>
      <figcaption className="text-[11px] tracking-[0.16em] text-[#A0A0A0]">
        Fig. — Forecasted Demand · the inherited chart.  Bubble size = current
        value (no scale legend).
      </figcaption>
    </figure>
  );
}

// Problem list — white box with bulleted, numbered problems, used after the
// Existing Visual to call out what specifically fails.
function ProblemBox({
  items,
}: {
  items: { n: string; text: React.ReactNode }[];
}) {
  return (
    <div className="my-[20px] max-w-[640px] rounded-[10px] bg-white px-[24px] py-[20px]">
      <div
        className="mb-[12px] text-[11px] tracking-[0.16em] text-[#A0A0A0]"
        style={MONO_STYLE}
      >
        PROBLEMS
      </div>
      <ol className="flex flex-col gap-[10px]">
        {items.map((p) => (
          <li
            key={p.n}
            className="grid grid-cols-[28px_1fr] items-start gap-[10px] text-[14px] leading-[1.6] text-[#1F1F1F]"
          >
            <span
              className="pt-[2px] text-[12px] font-medium text-[#A0A0A0]"
              style={MONO_STYLE}
            >
              {p.n}
            </span>
            <span>{p.text}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

// Two-column section replacing the old "Track A / Track B" cards.  Per
// feedback: drop the card chrome and just do two plain columns.
function TwoTrackColumns() {
  return (
    <div className="my-[28px] grid max-w-[680px] grid-cols-1 gap-[24px] border-y border-[#A0A0A0] py-[24px] min-[560px]:grid-cols-2 min-[560px]:gap-[40px]">
      <div>
        <div
          className="mb-[8px] text-[11px] tracking-[0.16em] text-[#A0A0A0]"
          style={MONO_STYLE}
        >
          CURRENT USERS
        </div>
        <p className="text-[14px] leading-[1.7] text-[#1F1F1F]">
          Safety check.  Does the new visual still work for someone running
          on muscle memory?  Catches regressions.  This is the minimum bar,
          not the test.
        </p>
      </div>
      <div>
        <div
          className="mb-[8px] text-[11px] tracking-[0.16em] text-[#A0A0A0]"
          style={MONO_STYLE}
        >
          NON-USERS + FUTURE USERS
        </div>
        <p className="text-[14px] leading-[1.7] text-[#1F1F1F]">
          Readability check.  Can someone with no prior exposure read it
          and act on it?  This is what familiarity bias hides.  A new
          visual only ships when both tracks pass.
        </p>
      </div>
    </div>
  );
}

function SectionVisualizations() {
  return (
    <Section id="visuals">
      <Eyebrow>+ Challenge 02 — Inherited visuals</Eyebrow>
      <SectionHead
        n="04"
        title={
          <>
            Visualizations that didn&rsquo;t answer
            <br />
            the question they were asked.
          </>
        }
      />
      <Lede>
        Both charts had been kept because they were familiar.{" "}
        <Strong>
          &ldquo;Current users are fine with it&rdquo;
        </Strong>{" "}
        is a sentence that hides a problem: at scale, the next thousand
        users — who never built that muscle memory — fall off the chart.
        Two visuals needed rebuilding, in two different shapes.
      </Lede>

      {/* ── 2A · Forecasted Demand ───────────────────────────────────── */}
      <SubH>2A · Forecasted Demand</SubH>
      <Body>
        The inherited Forecasted Demand chart was a 4-quadrant scatter.
        X-axis was growth rate, Y-axis future value, bubble size mapped to
        current value with no scale legend.  It was the right data and the
        wrong shape.
      </Body>

      <ExistingForecastChart />

      <ProblemBox
        items={[
          {
            n: "01",
            text: "Bubble size mapped to current value with no reference scale — so opportunities couldn't be compared on the metric that mattered most.",
          },
          {
            n: "02",
            text: "No way to read whether a value was large or small at a glance — the question the chart was supposed to answer was the one it didn't.",
          },
          {
            n: "03",
            text: "When bubbles overlapped at presentation time, the deck builder repositioned them by hand in PowerPoint — and the visual stopped matching the underlying data.",
          },
          {
            n: "04",
            text: 'The 4-quadrant frame implied all four corners mattered equally; the team only acted on high-growth × high-value.',
          },
        ]}
      />

      <Body>
        I refused to debate chart preferences.  One question went into
        every review:{" "}
        <em>&ldquo;What is this chart supposed to help us decide?&rdquo;</em>{" "}
        Answer: next-quarter opportunity priority.  Then the follow-up:{" "}
        <em>&ldquo;Does this chart let you decide that?&rdquo;</em>  No.
        The conversation stopped being about taste.
      </Body>

      <Screenshot
        src="/works/gia/forecasted-demand-after.png"
        alt="GIA Platform — Forecasted Demand, slope/dual-bar production version"
        label="Forecasted Demand — production"
        hint="Horizontal slope/dual-bar; Current → Forecasted, sorted by spend, color-coded by Advise / Implement / Operate."
        className="my-[24px]"
      />

      <Body>
        Horizontal slope bars sorted by projected value descending.  Two
        bars per row — current and forecasted, with the growth arrow
        between them.  Bars are colored by category (Advise / Implement /
        Operate).  The data <em>is</em> the visual.  No hand-editing is
        possible — and the team stopped doing it.
      </Body>

      {/* ── 2B · Financial / Operational Metrics ─────────────────────── */}
      <SubH>2B · Financial / Operational Metrics</SubH>
      <Body>
        The inherited financial dashboard shipped the numbers but not the
        insight.  It was a peer-analysis table — twelve metrics (1-Year
        TSR, Revenue growth, EBITDA, ROA, R&amp;D, AR Days, ...)  packed
        next to one another with color-coded tiers — and the question{" "}
        <Strong>
          &ldquo;where does my account sit relative to its peers?&rdquo;
        </Strong>{" "}
        wasn&rsquo;t anywhere on the screen.
      </Body>

      <Screenshot
        src="/works/gia/existing-financial-metrics.png"
        alt="GIA Platform — Existing Financial Metrics peer-analysis table"
        label="Existing Financial Metrics — peer-analysis table"
        hint="Soonk to drop the screenshot of the cluttered peer-analysis page"
        className="my-[24px]"
      />

      <Body>
        Distribution was invisible.  Outlier status was invisible.  The
        &ldquo;strong vs.&nbsp;weak&rdquo; directional read — the one
        Account Leaders actually came for — wasn&rsquo;t there.  Current
        users coped because they&rsquo;d learned to read it sideways; the
        next cohort would not.
      </Body>

      <Body>
        Rather than argue that the existing chart was bad, I worked
        backwards from the questions an Account Leader walks in with —
        and listed the information needed to answer each.  Then I asked
        what visual primitive would make those answers visible at a
        glance.  <em>Emotional attachment to the existing chart had to be
        replaced with outcome-driven thinking.</em>
      </Body>

      <Body>
        <Strong>Testing — two-track usability.</Strong>  Current users had
        too much muscle memory to detect their own blind spots, so I split
        recruitment into two tracks.  The new design only shipped when
        both passed.
      </Body>
      <TwoTrackColumns />

      <Body>
        The shipped version is a quartile box-plot card per metric — Tail
        (5 / 95 %), Outlier (25 / 75 %), Majority of accounts band, with
        strong / weak directional markers.  Your account sits as a pink
        dot, peers as gray.  Twelve cards in a 3 × 4 grid replace the old
        wall of numbers.
      </Body>

      <Screenshot
        src="/works/gia/financial-after.png"
        alt="GIA Platform — Financial / Operational Performance, quartile box-plot cards (production)"
        label="Financial / Operational Performance — quartile box-plot cards"
        hint="Account Deep Dive → 3M Company → Financial / Operational Performance · Your account (pink) vs Peer accounts (gray) · 12 cards in a 3×4 grid"
        className="my-[24px]"
      />

      <Body italic>
        Both charts moved from &ldquo;the one we&rsquo;ve always
        used&rdquo; to &ldquo;the one that answers the question.&rdquo;
      </Body>
    </Section>
  );
}

// ===========================================================================
// §05 Challenge · Offshore — 4-Type talent framework
// ===========================================================================

// Skill-level meter — 3 dots, filled count = level (0–3).
function SkillDots({ level }: { level: number }) {
  return (
    <span className="inline-flex items-center gap-[3px] align-middle">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={
            i < level
              ? "size-[8px] rounded-full bg-[#1F1F1F]"
              : "size-[8px] rounded-full border border-[#A0A0A0] bg-transparent"
          }
        />
      ))}
    </span>
  );
}

type DesignerType = {
  num: string;
  name: string;
  arc: string;
  skills: { label: string; level: number }[];
  assessment: string;
  provided: string;
  goal: string;
};

const DESIGNER_TYPES: DesignerType[] = [
  {
    num: "01",
    name: "Foundational Builder",
    arc: "Needs low-fi guidance → grows through structured UX exposure",
    skills: [
      { label: "Visual design", level: 2 },
      { label: "Product thinking", level: 2 },
      { label: "Stakeholder", level: 2 },
    ],
    assessment:
      "Generally strong skillset, capable of structuring user flows.  Struggled to articulate end-to-end process and outcomes in stakeholder discussions.",
    provided:
      "Low-fidelity wireframes as structural guidance, paired with mentoring that encouraged them to sketch their own ideas.",
    goal: "Independent ownership of full product flows — gradually reducing reliance on support.",
  },
  {
    num: "02",
    name: "Collaborative Leader",
    arc: "Leads a design stream → grows into a team-lead role",
    skills: [
      { label: "Visual design", level: 3 },
      { label: "Product thinking", level: 3 },
      { label: "Stakeholder", level: 1 },
    ],
    assessment:
      "Strong in both visual and product thinking, with growing stakeholder communication.  Ready to lead features autonomously and contribute to async collaboration.",
    provided:
      "Mentored on BRD clarification, then delegated full ownership of product streams and empowered them to co-lead offshore design reviews.",
    goal: "Senior-level ownership and leadership capacity across time zones.",
  },
  {
    num: "03",
    name: "Visual Specialist",
    arc: "Owns stand-alone components",
    skills: [
      { label: "Visual design", level: 3 },
      { label: "Product thinking", level: 1 },
      { label: "Stakeholder", level: 1 },
    ],
    assessment:
      "Highly skilled in UI / visual design but lacked strong UX reasoning and product thinking.",
    provided:
      "Standalone, static design tasks — paired with Type 01 designers to reinforce UX logic from the other direction.",
    goal: "Strengthen UX understanding while maximizing visual output quality.",
  },
  {
    num: "04",
    name: "Strategic Convert",
    arc: "Focuses on foundational training → grows into full-stack product designer",
    skills: [
      { label: "Visual design", level: 0 },
      { label: "Product thinking", level: 1 },
      { label: "Stakeholder", level: 3 },
    ],
    assessment:
      "No formal design background — but strong business logic and stakeholder communication, often transitioning from a strategy role.",
    provided:
      "Hands-on training during onshore overlap sessions covering design tools, fundamentals, and applied UX practice.",
    goal: "Evolve into fully contributing product designers by combining business fluency with design execution.",
  },
];

function TypeCard({ t }: { t: DesignerType }) {
  return (
    <div className="rounded-[12px] bg-[#F4F4F4] p-[20px]">
      <div className="mb-[10px] flex items-baseline justify-between">
        <span
          className="text-[11px] tracking-[0.16em] text-[#A0A0A0]"
          style={MONO_STYLE}
        >
          TYPE {t.num}
        </span>
      </div>
      <h4 className="mb-[14px] text-[17px] leading-[1.3] font-medium text-[#1F1F1F]">
        {t.name}
      </h4>
      <ul className="flex flex-col gap-[6px]">
        {t.skills.map((s) => (
          <li
            key={s.label}
            className="flex items-center justify-between gap-[12px] text-[12px] text-[#5D5D5D]"
          >
            <span>{s.label}</span>
            <SkillDots level={s.level} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function TypeDetail({ t }: { t: DesignerType }) {
  return (
    <div className="border-l-2 border-[#1F1F1F] py-[8px] pl-[16px]">
      <div className="mb-[6px] flex items-baseline gap-[10px]">
        <span
          className="text-[11px] tracking-[0.16em] text-[#A0A0A0]"
          style={MONO_STYLE}
        >
          TYPE {t.num}
        </span>
        <span className="text-[14px] font-medium text-[#1F1F1F]">
          {t.name}
        </span>
      </div>
      <p className="mb-[14px] text-[13px] italic leading-[1.5] text-[#5D5D5D]">
        {t.arc}
      </p>
      <dl className="grid grid-cols-[110px_1fr] gap-x-[14px] gap-y-[8px]">
        {[
          ["Assessment", t.assessment],
          ["What I provided", t.provided],
          ["Goal", t.goal],
        ].map(([k, v]) => (
          <div key={k} className="contents">
            <dt
              className="text-[11px] tracking-[0.06em] font-medium text-[#A0A0A0]"
              style={MONO_STYLE}
            >
              {k}
            </dt>
            <dd className="text-[13px] leading-[1.6] text-[#1F1F1F]">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function SectionOffshore() {
  return (
    <Section id="offshore">
      <Eyebrow>+ Challenge 03 — Offshore</Eyebrow>
      <SectionHead
        n="05"
        title={
          <>
            Offshore wasn&rsquo;t the model.
            <br />
            How we used it was.
          </>
        }
      />
      <Lede>
        Onshore / offshore is not a special model.  Everyone runs it.  The
        failure mode is treating offshore as a pair of acting hands —
        context missing, decisions reserved for onshore.  Quality drops,
        the 24-hour clock stops actually buying speed, and the model{" "}
        <em>looks</em> efficient on paper while costing more in rework.
      </Lede>
      <Body>
        I solved it not by changing the shore split, but by re-evaluating
        each designer and matching the work to the profile — a four-type
        framework that ran top of the staffing decision from then on.
      </Body>

      {/* 2×2 type grid — the at-a-glance distribution */}
      <div className="my-[28px] grid grid-cols-1 gap-[14px] min-[560px]:grid-cols-2 min-[560px]:gap-[18px]">
        {DESIGNER_TYPES.map((t) => (
          <TypeCard key={t.num} t={t} />
        ))}
      </div>

      {/* Per-type detail — short Assessment / Provided / Goal beats */}
      <div className="my-[28px] flex flex-col gap-[22px]">
        {DESIGNER_TYPES.map((t) => (
          <TypeDetail key={t.num} t={t} />
        ))}
      </div>

      <Body italic>
        Re-evaluating talent instead of re-evaluating cost.  Offshore became
        a velocity-and-talent lever — not a headcount one.
      </Body>
    </Section>
  );
}

// ===========================================================================
// §06 Reflection & Impact
// ===========================================================================

function StatCard({
  num,
  label,
  desc,
}: {
  num: string;
  label: string;
  desc: string;
}) {
  return (
    <div className="rounded-[12px] bg-[#F4F4F4] p-[20px]">
      <div
        className="mb-[10px] text-[44px] leading-[1] font-extrabold tracking-[-0.04em] text-[#1F1F1F] min-[560px]:text-[52px]"
        style={MONO_STYLE}
      >
        {num}
      </div>
      <div className="mb-[6px] text-[15px] font-medium text-[#1F1F1F] border-b border-[#A0A0A0] pb-[8px]">
        {label}
      </div>
      <p className="text-[12px] leading-[1.6] text-[#5D5D5D]">{desc}</p>
    </div>
  );
}

function SectionReflection() {
  return (
    <Section id="reflection">
      <Eyebrow>+ Reflection</Eyebrow>
      <SectionHead
        n="06"
        title="What shipped, what didn't, what I'd carry into the next role."
      />

      <SubH>What went well</SubH>
      <div className="my-[18px] grid grid-cols-1 gap-[14px] min-[560px]:grid-cols-3 min-[560px]:gap-[18px]">
        <StatCard
          num="43%"
          label="Design cost savings"
          desc="Reduction through the offshore enablement model."
        />
        <StatCard
          num="+435"
          label="Early adopters"
          desc="Increased fidelity accelerated early releases."
        />
        <StatCard
          num="×2"
          label="Product launches"
          desc="Saved resources re-invested into parallel product launches."
        />
      </div>

      <SubH>What didn&rsquo;t</SubH>
      <Body>
        A firm-wide design system was still out of reach — blocked by
        structural billing constraints, not by design or engineering will.
        The next leadership engagement will inherit that work.
      </Body>

      <SubH>What I learned</SubH>
      <ul className="my-[18px] flex max-w-[620px] flex-col gap-[10px]">
        <li className="grid grid-cols-[16px_1fr] items-start gap-[10px]">
          <span
            aria-hidden
            className="mt-[8px] block size-[6px] shrink-0 bg-[#1F1F1F]"
          />
          <span className="text-[15px] leading-[1.6] text-[#1F1F1F]">
            <Strong>Strong design systems are as much about education
            as execution.</Strong>
          </span>
        </li>
        <li className="grid grid-cols-[16px_1fr] items-start gap-[10px]">
          <span
            aria-hidden
            className="mt-[8px] block size-[6px] shrink-0 bg-[#1F1F1F]"
          />
          <span className="text-[15px] leading-[1.6] text-[#1F1F1F]">
            <Strong>Systems solve what people can&rsquo;t argue
            through.</Strong>
          </span>
        </li>
      </ul>
      <Body>
        Focusing on individual performance matters — but system-level
        changes often solve the deeper, recurring problems more
        effectively.  Frontend implementation inconsistencies got
        addressed not by adding meetings, but by introducing a design QA
        layer.  Offshore collaboration improved not by collaborating more,
        but by segmenting roles clearly and reshaping the handoff.
      </Body>
      <Body italic>
        When the system is clear, people can focus on the work — not on
        defending themselves.
      </Body>
    </Section>
  );
}

// ===========================================================================
// Root
// ===========================================================================

export default function GiaCaseStudy() {
  return (
    <div className="min-h-screen bg-[#EEEEEE] text-[#1F1F1F]">
      <Hero />
      <div className="bg-[#EEEEEE]">
        <div className="mx-auto grid max-w-[1080px] gap-[32px] px-[20px] pt-[40px] pb-[80px] min-[560px]:px-[32px] min-[960px]:grid-cols-[130px_1fr] min-[960px]:gap-[48px] min-[960px]:pt-[56px] min-[960px]:pb-[96px]">
          <GiaNav />
          <main className="min-w-0">
            <SectionOverview />
            <SectionRituals />
            <SectionVisualizations />
            <SectionOffshore />
            <SectionReflection />
          </main>
        </div>
      </div>
    </div>
  );
}
