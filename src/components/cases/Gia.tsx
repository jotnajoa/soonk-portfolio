// GIA Platform case study — light-mode editorial, aligned with the sister
// POMEs case study at /work/pomes.
//
// 2nd-round feedback applied:
//   - Title weight reduced to font-semibold (POMEs lowered theirs too)
//   - Hero sentence shortened, sized to POMEs (24/28/36 medium)
//   - Timeline put back (Jan 2024 → on-going)
//   - 6 module screenshots dropped in from /assets/GIA Platform Resources
//   - Flow pipeline wraps on narrow viewports + words color-coded:
//       Outcome   = green (#16A34A)
//       flow      = orange (#EA580C)
//       Blueprint = blue (#1E40AF)
//   - "Build" → "Blueprint to Dev"
//   - §03 collapsed to one Challenges section with 3 sub-challenges (was
//     three separate top-level sections)
//   - Per-challenge content cut to bullet points (no rambling prose)
//   - Each designer-type detail compacted to Solution + Why it worked

import CaseStudyLeftNav, {
  type CaseStudySection,
} from "./CaseStudyLeftNav";

const MONO =
  "var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, Menlo, monospace";
const MONO_STYLE: React.CSSProperties = { fontFamily: MONO };

// Concept colors — used ONLY for the pipeline highlight + the 3 sub-blocks
// that follow.  Everything else stays monochrome.
const C_OUTCOME = "font-bold text-[#16A34A]";
const C_FLOW = "font-bold text-[#EA580C]";
const C_BLUEPRINT = "font-bold text-[#1E40AF]";

const SECTIONS: CaseStudySection[] = [
  { id: "intro", num: "01", label: "Intro" },
  { id: "overview", num: "02", label: "Project overview" },
  { id: "challenges", num: "03", label: "Challenges", star: true },
  { id: "reflection", num: "04", label: "Reflection" },
];

// ===========================================================================
// Shared atoms — match POMEs verbatim so type scale + colors line up
// ===========================================================================

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-[18px] text-[12px] tracking-[0.16em] font-medium text-[#5D5D5D]">
      {children}
    </div>
  );
}

function SectionHead({ n, title }: { n: string; title: React.ReactNode }) {
  return (
    <div className="mb-[22px] grid grid-cols-[80px_1fr] items-start gap-[18px] min-[960px]:grid-cols-[110px_1fr] min-[960px]:gap-[24px]">
      <div className="text-[64px] leading-[0.85] font-extrabold tracking-[-0.05em] text-[#1F1F1F] min-[960px]:text-[88px]">
        {n}
      </div>
      <h2 className="max-w-[640px] pt-1 text-[24px] leading-[1.25] font-medium tracking-[-0.02em] text-[#1F1F1F] min-[960px]:pt-[10px] min-[960px]:text-[32px]">
        {title}
      </h2>
    </div>
  );
}

function Lede({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-[18px] max-w-[620px] text-[16px] leading-[1.7] text-[#5D5D5D]">
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
      className={`my-[18px] max-w-[620px] text-[16px] leading-[1.7] text-[#5D5D5D] ${className}`}
      style={italic ? { fontStyle: "italic", fontSize: 18, color: "#1F1F1F" } : undefined}
    >
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

// PullQuote — left-bar italic call-out (POMEs's signature device).  Used in
// Challenge 1 to land the "I just needed three things" beat.
function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-[28px] max-w-[620px] border-l-2 border-[#1F1F1F] py-[6px] pl-[20px] text-[18px] leading-[1.4] font-medium italic text-[#1F1F1F] min-[560px]:text-[22px]">
      {children}
    </blockquote>
  );
}

// Compact bullet list — used heavily inside the challenges (feedback was
// explicit: bullet points over prose).
function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="my-[14px] flex max-w-[620px] flex-col gap-[8px]">
      {items.map((t, i) => (
        <li
          key={i}
          className="grid grid-cols-[14px_1fr] items-start gap-[10px] text-[15px] leading-[1.55] text-[#1F1F1F]"
        >
          <span
            aria-hidden
            className="mt-[8px] block size-[6px] shrink-0 bg-[#1F1F1F]"
          />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

// Section wrapper — `id` matches CaseStudyLeftNav's section id (no prefix).
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

// Screenshot — thin dark bezel, 16:10.  When the bg image 404s, the label
// underneath shows through (no broken-icon).
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
      className={`rounded-[6px] bg-[#2A2A2A] p-[4px] min-[560px]:p-[6px] ${className}`}
      role="img"
      aria-label={alt}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-[4px] bg-white">
        <div className="absolute inset-0 z-0 flex flex-col items-center justify-center gap-[6px] bg-[#F4F4F4] p-[20px] text-center">
          <span className="text-[11px] tracking-[0.16em] font-medium text-[#5D5D5D]">
            PRODUCTION SCREENSHOT
          </span>
          <span className="max-w-[420px] text-[14px] leading-[1.5] font-medium text-[#1F1F1F]">
            {label}
          </span>
          {hint && (
            <span className="max-w-[420px] text-[12px] leading-[1.4] text-[#5D5D5D]">
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
// §01 Hero — full-bleed
// ===========================================================================

function Hero() {
  return (
    <section
      id="intro"
      className="mx-auto max-w-[1200px] px-[24px] pt-[88px] pb-[40px] min-[560px]:px-[32px] min-[560px]:pt-[112px] min-[560px]:pb-[56px]"
    >
      <Eyebrow>+ 01 / Intro</Eyebrow>

      {/* Logo composite — GIA + Deloitte.  Font-weight reduced from black
          to semibold per feedback (POMEs did the same). */}
      <div className="mb-[28px] flex flex-wrap items-end gap-[20px] leading-none min-[560px]:mb-[36px] min-[560px]:gap-[28px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/work/logos/GIA_Logo.svg"
          alt="GIA logo"
          className="h-[60px] w-auto shrink-0 min-[560px]:h-[80px] min-[960px]:h-[112px]"
        />
        <span className="px-[2px] text-[36px] font-semibold leading-none text-[#1F1F1F] min-[560px]:text-[48px] min-[960px]:text-[64px]">
          +
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/work/logos/Deloittelogo.svg"
          alt="Deloitte logo"
          className="h-[60px] w-auto shrink-0 min-[560px]:h-[80px] min-[960px]:h-[112px]"
        />
      </div>

      <h1 className="mb-[10px] text-[68px] font-semibold leading-[0.9] tracking-[-0.05em] text-[#1F1F1F] min-[560px]:text-[92px] min-[960px]:text-[128px]">
        GIA Platform
      </h1>
      <p className="mb-[40px] text-[14px] tracking-[0.04em] text-[#5D5D5D] min-[560px]:text-[15px] min-[960px]:mb-[48px]">
        Growth Insights &amp; Activation · Deloitte enterprise platform
      </p>

      {/* 2-col — screenshot left + tagline / meta / timeline right */}
      <div className="mb-[40px] grid gap-[32px] tablet:mb-[48px] tablet:grid-cols-[60%_1fr] tablet:items-start tablet:gap-[48px]">
        <Screenshot
          src="/work/gia/hero-account-sales-jnj.png"
          alt="GIA Platform — Account Deep Dive · Sales Insights (production)"
          label="Account Deep Dive · Sales Insights"
          hint="Account Deep Dive → 3M Company → Sales Insights"
        />

        <div className="flex min-w-0 flex-col gap-[28px] tablet:gap-[32px]">
          {/* Tagline — short, POMEs font-sizing */}
          <p className="max-w-[480px] text-[24px] leading-[1.2] font-medium tracking-[-0.02em] text-[#1F1F1F] min-[560px]:text-[28px] min-[960px]:text-[36px]">
            I got a stalled enterprise design team moving again.
          </p>

          {/* Meta — Role + Scope */}
          <dl className="border-t border-[#A0A0A0]">
            {[
              ["Role", "UX Lead — onshore + offshore design teams"],
              ["Scope", "Design system · UX framework · cross-shore enablement"],
            ].map(([l, v]) => (
              <div
                key={l}
                className="grid grid-cols-[100px_1fr] items-baseline gap-[16px] border-b border-[#A0A0A0] py-[14px]"
              >
                <dt className="text-[12px] font-medium tracking-[0.06em] text-[#5D5D5D]">
                  {l}
                </dt>
                <dd className="text-[15px] leading-[1.5] text-[#1F1F1F]">
                  {v}
                </dd>
              </div>
            ))}
          </dl>

          {/* Timeline — Jan 2024 → on-going (per feedback request).  Same
              vertical-tick + hairline layout as POMEs's right-column
              timeline. */}
          <div>
            <p
              className="mb-[12px] text-[12px] tracking-[0.16em] font-medium text-[#5D5D5D]"
              style={MONO_STYLE}
            >
              TIMELINE
            </p>
            <ol className="flex flex-col">
              {[
                ["Jan 2024", "Joined as UX Lead"],
                ["2024", "Rebuilt the design cycle"],
                ["2024–25", "Inherited visuals · offshore reshape"],
                ["On-going", "Operating at scale"],
              ].map(([d, l], i) => (
                <li
                  key={l}
                  className={`grid grid-cols-[120px_1fr] items-center gap-[14px] py-[10px] ${
                    i > 0 ? "border-t border-[#A0A0A0]/50" : ""
                  }`}
                >
                  <span className="flex items-center gap-[10px] text-[12px] tracking-[0.04em] text-[#5D5D5D]">
                    <span
                      aria-hidden
                      className="block h-[10px] w-[2px] bg-[#1F1F1F]"
                    />
                    {d}
                  </span>
                  <span className="text-[15px] leading-[1.3] font-medium text-[#1F1F1F]">
                    {l}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Key Achievements — 3-up stat strip */}
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
            "Saved resources re-invested into parallel launches.",
          ],
        ].map(([num, lbl, desc]) => (
          <div key={lbl} className="flex flex-col gap-[6px]">
            <div className="text-[12px] tracking-[0.16em] font-medium text-[#5D5D5D]">
              KEY ACHIEVEMENT
            </div>
            <div className="text-[44px] leading-[1] font-extrabold tracking-[-0.04em] text-[#1F1F1F] min-[960px]:text-[56px]">
              {num}
            </div>
            <div className="text-[15px] font-medium text-[#1F1F1F]">{lbl}</div>
            <div className="text-[13px] leading-[1.5] text-[#5D5D5D]">
              {desc}
            </div>
          </div>
        ))}
      </div>
    </section>
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
    body: "Surfaces each user's most-viewed views — a single pane of glass on what they already care about.",
    src: "/work/gia/dashboard.png",
    hint: "Dashboard — pinned modules + live metrics",
  },
  {
    num: "02",
    name: "Account targeting",
    tagline: "Find who fits.",
    body: "Filter the client universe by a leader's own criteria — industry, revenue band, geography, deal stage — and get back a short-list ready for outreach.",
    src: "/work/gia/account-targeting.png",
    hint: "Account targeting — criteria builder + result list",
  },
  {
    num: "03",
    name: "Demand sensing",
    tagline: "Read the market.",
    body: "Surfaces market signals in each industry and sector so leaders can catch where opportunity is moving and reposition Deloitte's offer early.",
    src: "/work/gia/demand-sensing.png",
    hint: "Demand sensing — Forecasted Demand by sector",
  },
  {
    num: "04",
    name: "Account deep dive",
    tagline: "360° on one account.",
    body: "A full view of one account — tech stack, contract history, financial / operational performance, and forward-looking opportunities.",
    src: "/work/gia/account-deepdive.png",
    hint: "Account Deep Dive — 3M Company · Sales / Technology / Financial tabs",
  },
  {
    num: "05",
    name: "Growth platform (Alliance)",
    tagline: "Partner-led pipeline.",
    body: 'How Deloitte and its alliance partners have sold together, and where the next "sell with" plays sit.',
    src: "/work/gia/growth-platform.png",
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
      <div className="mb-[6px] text-[11px] tracking-[0.16em] font-medium text-[#5D5D5D]">
        MODULE {m.num}
      </div>
      <h3 className="mb-[12px] text-[22px] leading-[1.25] font-medium tracking-[-0.01em] text-[#1F1F1F]">
        {m.name} — <span className="text-[#5D5D5D]">{m.tagline}</span>
      </h3>
      <p className="text-[15px] leading-[1.7] text-[#5D5D5D]">{m.body}</p>
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
    <Section id="overview" first>
      <Eyebrow>+ Project overview</Eyebrow>
      <SectionHead
        n="02"
        title="One platform, five modules — each a different decision domain."
      />
      <Lede>
        GIA is Deloitte&rsquo;s internal enterprise platform for Account
        Leaders, Alliance Leaders, and sales teams.  Five modules sit
        inside one shell, each cut for a different audience and a different
        decision.
      </Lede>
      {MODULES.map((m, i) => (
        <ModuleRow key={m.num} m={m} reverse={i % 2 === 1} />
      ))}
    </Section>
  );
}

// ===========================================================================
// §03 Challenges — single section with 3 sub-challenges
// ===========================================================================

// Pipeline — 4 cards, wraps cleanly on narrow viewports (was overflow-scroll).
// Words inside each card are color-coded so the chain reads as a single
// sentence even when the cards wrap.
function FlowPipeline() {
  const steps: { tag: string; label: React.ReactNode; note: React.ReactNode }[] =
    [
      {
        tag: "01",
        label: (
          <>
            Identify <span className={C_OUTCOME}>Outcome</span>
          </>
        ),
        note: "The Genie question",
      },
      {
        tag: "02",
        label: "User story map",
        note: (
          <>
            <span className={C_OUTCOME}>Outcome</span>
            {" → "}
            <span className={C_FLOW}>flow</span>
          </>
        ),
      },
      {
        tag: "03",
        label: "Low-fi wireframe",
        note: (
          <>
            <span className={C_FLOW}>Flow</span>
            {" → "}
            <span className={C_BLUEPRINT}>blueprint</span>
          </>
        ),
      },
      {
        tag: "04",
        label: (
          <>
            <span className={C_BLUEPRINT}>Blueprint</span> to Dev
          </>
        ),
        note: "Ready to build",
      },
    ];
  return (
    <div className="my-[28px] grid grid-cols-1 gap-[10px] min-[480px]:grid-cols-2 min-[960px]:grid-cols-4">
      {steps.map((s) => (
        <div
          key={s.tag}
          className="flex flex-col gap-[6px] rounded-[10px] bg-[#F4F4F4] px-[16px] py-[14px]"
        >
          <span
            className="text-[10px] tracking-[0.16em] text-[#5D5D5D]"
            style={MONO_STYLE}
          >
            {s.tag}
          </span>
          <span className="text-[14px] leading-[1.3] font-medium text-[#1F1F1F]">
            {s.label}
          </span>
          <span className="text-[12px] leading-[1.4] text-[#5D5D5D]">
            {s.note}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Challenge 1: Rituals over outcomes ──────────────────────────────────────

function Challenge1() {
  return (
    <div className="mt-[40px]">
      <div className="mb-[14px]">
        <p className="mb-[8px] text-[12px] tracking-[0.16em] font-medium text-[#5D5D5D]">
          CHALLENGE 01
        </p>
        <h3 className="text-[26px] leading-[1.2] font-medium tracking-[-0.02em] text-[#1F1F1F] min-[560px]:text-[32px]">
          Rituals over outcomes
        </h3>
      </div>

      <Body>
        The team was busy.  Design pass after design pass came through —
        review, redraw, re-litigate.  Yet the platform wasn&rsquo;t moving.
        Every sprint repeated the same conversation because no one had
        agreed on <em>why</em> any of it was being built.
      </Body>
      <Body>
        I cleared the rituals.  Three steps survived — and they actually
        moved the team.
      </Body>

      <PullQuote>I just needed three things to make it move.</PullQuote>

      <FlowPipeline />

      <Body>
        Each step feeds the next, and the chain is visible.  Once PMs,
        engineering, and business stakeholders could see how an{" "}
        <span className={C_OUTCOME}>Outcome</span> became a{" "}
        <span className={C_FLOW}>flow</span> and a flow became a{" "}
        <span className={C_BLUEPRINT}>Blueprint</span>, the
        &ldquo;why are you doing this?&rdquo; question stopped landing in
        design reviews.
      </Body>

      {/* Per-step blocks */}
      <SubH>
        01 · Identify the <span className={C_OUTCOME}>Outcome</span> — the
        Genie question
      </SubH>
      <Screenshot
        src="/work/gia/genie-question.png"
        alt="GIA Platform — Genie question worksheet"
        label="Genie question — workshop artifact"
      />
      <Body>
        <em>
          &ldquo;If a genie could grant you any outcome — ignoring
          feasibility — what would it be?&rdquo;
        </em>{" "}
        Removing the build constraint on purpose surfaces the north star
        — and the real blocker — in the same sentence.  Without it, teams
        design from what&rsquo;s easy to ship, and the conversation
        collapses into output and feature bloat.
      </Body>

      <SubH>
        02 · User story map — turn the{" "}
        <span className={C_OUTCOME}>outcome</span> into a{" "}
        <span className={C_FLOW}>flow</span>
      </SubH>
      <Screenshot
        src="/work/gia/user-story-map.png"
        alt="GIA Platform — User story map artifact"
        label="User story map — outcome → flow"
      />
      <Body>
        Take the outcome from step one and lay out the path to it — who
        does what, in what order, against which data.  This is the
        artifact the wireframe gets built against; nothing in the
        wireframe should exist outside the map.
      </Body>

      <SubH>
        03 · Low-fi wireframe — turn the{" "}
        <span className={C_FLOW}>flow</span> into a{" "}
        <span className={C_BLUEPRINT}>blueprint</span>
      </SubH>
      <Screenshot
        src="/work/gia/lowfi-wireframe.png"
        alt="GIA Platform — Low-fi wireframe"
        label="Low-fi wireframe — engineering-ready"
      />
      <Body>
        Layout, state, and data contracts in one artifact — derived from
        the story map.  By the time review opens, the outcome is named,
        the flow is mapped, and the visual is the consequence, not the
        starting point.  Engineering reads this as the blueprint they
        build to.
      </Body>
    </div>
  );
}

// ── Challenge 2: Familiarity over effectiveness ─────────────────────────────

function Challenge2() {
  return (
    <div className="mt-[64px]">
      <div className="mb-[14px]">
        <p className="mb-[8px] text-[12px] tracking-[0.16em] font-medium text-[#5D5D5D]">
          CHALLENGE 02
        </p>
        <h3 className="text-[26px] leading-[1.2] font-medium tracking-[-0.02em] text-[#1F1F1F] min-[560px]:text-[32px]">
          Familiarity over effectiveness
        </h3>
      </div>

      <Body>
        People kept the existing visuals because they were used to them —
        even when those visuals didn&rsquo;t actually answer the question.
        Insiders coped on muscle memory; the next thousand users
        wouldn&rsquo;t.
      </Body>
      <Body>
        Every rebuild started with the same question:{" "}
        <Strong>what does this visualization need to answer?</Strong>
      </Body>

      {/* 2A · Forecasted Demand */}
      <SubH>2A · Forecasted Demand</SubH>

      <p className="my-[10px] text-[13px] tracking-[0.16em] font-medium text-[#5D5D5D]">
        QUESTIONS TO ANSWER
      </p>
      <Bullets
        items={[
          "Who has the biggest current value?",
          "Who will have the biggest future value?",
          "How much growth — or shrink — in between?",
        ]}
      />

      <p className="mt-[28px] mb-[10px] text-[13px] tracking-[0.16em] font-medium text-[#5D5D5D]">
        EXISTING VISUAL
      </p>
      <ExistingForecastChart />

      <p className="mt-[20px] mb-[10px] text-[13px] tracking-[0.16em] font-medium text-[#5D5D5D]">
        PROBLEMS
      </p>
      <Bullets
        items={[
          <>
            X-axis = growth rate, Y-axis = future value, bubble size =
            current value — with <em>no scale legend</em>.  Current values
            cannot be compared.
          </>,
          <>
            No way to tell at a glance whether a value grew dramatically
            or shrank from a larger base.
          </>,
          <>
            Drawn manually in PowerPoint — when bubbles overlapped, the
            deck builder repositioned them by hand.{" "}
            <em>The visual stopped matching the data.</em>
          </>,
          <>Closer to a painting than a chart.  Cannot scale.</>,
        ]}
      />

      <p className="mt-[28px] mb-[10px] text-[13px] tracking-[0.16em] font-medium text-[#5D5D5D]">
        SOLVED BY
      </p>
      <Body>
        Setting the goal first and verifying the new visual answers it —
        which is what overcame emotional attachment to the existing
        version.
      </Body>

      <Screenshot
        src="/work/gia/demand-forecast.png"
        alt="GIA Platform — Forecasted Demand, slope/dual-bar production"
        label="Forecasted Demand — production"
        hint="Horizontal slope/dual-bar; Current → Forecasted, sorted by spend"
        className="my-[24px]"
      />

      {/* 2B · Financial / Operational Metrics */}
      <SubH>2B · Financial / Operational Metrics</SubH>

      <p className="my-[10px] text-[13px] tracking-[0.16em] font-medium text-[#5D5D5D]">
        QUESTIONS TO ANSWER
      </p>
      <Bullets
        items={[
          "Where does my account sit relative to its peers?",
          "Strong or weak — and on which metrics?",
          "Outlier, majority, or tail of the distribution?",
        ]}
      />

      <p className="mt-[28px] mb-[10px] text-[13px] tracking-[0.16em] font-medium text-[#5D5D5D]">
        EXISTING VISUAL
      </p>
      <Screenshot
        src="/work/gia/existing-financial-metrics.png"
        alt="GIA Platform — Existing peer-analysis table"
        label="Existing peer-analysis table"
        hint="12 financial metrics shipped as a color-tiered table"
        className="my-[20px]"
      />

      <p className="mt-[20px] mb-[10px] text-[13px] tracking-[0.16em] font-medium text-[#5D5D5D]">
        PROBLEMS
      </p>
      <Bullets
        items={[
          "Distribution invisible.",
          "Outlier status invisible.",
          'Directional "strong / weak" read absent.',
          "Existing users coped on muscle memory; the next cohort wouldn't.",
        ]}
      />

      <p className="mt-[28px] mb-[10px] text-[13px] tracking-[0.16em] font-medium text-[#5D5D5D]">
        SOLVED BY
      </p>
      <Body>
        Working backwards from the questions, listing the data needed,
        and picking a visual primitive — quartile box-plot cards — that
        made the answers readable at a glance.
      </Body>

      <Screenshot
        src="/work/gia/financial-after.png"
        alt="GIA Platform — Financial / Operational Performance (production)"
        label="Financial / Operational Performance — production"
        hint="Account Deep Dive → 3M Company · Quartile box-plot cards · 12 metrics in a 3×4 grid"
        className="my-[24px]"
      />
    </div>
  );
}

// ── Challenge 3: How we used it was (offshore) ──────────────────────────────

function ExistingForecastChart() {
  return (
    <figure className="my-[20px] flex flex-col gap-[12px]">
      <div className="relative aspect-[16/10] w-full max-w-[640px] overflow-hidden rounded-[8px] border border-[#A0A0A0] bg-[#F4F4F4]">
        <span className="absolute top-[14px] left-[20px] text-[10px] tracking-[0.18em] font-medium text-[#5D5D5D]">
          EXISTING · 4-QUADRANT SCATTER
        </span>
        <span className="absolute bottom-[18px] left-1/2 -translate-x-1/2 text-[10px] tracking-[0.16em] text-[#5D5D5D]">
          GROWTH RATE →
        </span>
        <span className="absolute top-1/2 left-[10px] origin-left -translate-y-1/2 -rotate-90 text-[10px] tracking-[0.16em] text-[#5D5D5D]">
          FUTURE VALUE ↑
        </span>
        <span className="absolute top-[12%] bottom-[18%] left-1/2 w-px bg-[#A0A0A0]/40" />
        <span className="absolute top-1/2 right-[8%] left-[8%] h-px bg-[#A0A0A0]/40" />
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
    </figure>
  );
}

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
  skills: { label: string; level: number }[];
  solution: string;
  why: string;
};

const DESIGNER_TYPES: DesignerType[] = [
  {
    num: "01",
    name: "Foundational Builder",
    skills: [
      { label: "Visual design", level: 2 },
      { label: "Product thinking", level: 2 },
      { label: "Stakeholder", level: 2 },
    ],
    solution:
      "Hand them a low-fi wireframe as scaffolding, then mentor them to extend it.",
    why: "Capable end-to-end, but stalls on articulating process upstream — the scaffold lets them own the flow without losing the thread.",
  },
  {
    num: "02",
    name: "Collaborative Leader",
    skills: [
      { label: "Visual design", level: 3 },
      { label: "Product thinking", level: 3 },
      { label: "Stakeholder", level: 1 },
    ],
    solution:
      "Delegate a full product stream and put them in front of stakeholders.",
    why: "Visual and product muscles are already strong — the only gap is reps owning the room.  Ownership accelerates the last leg.",
  },
  {
    num: "03",
    name: "Visual Specialist",
    skills: [
      { label: "Visual design", level: 3 },
      { label: "Product thinking", level: 1 },
      { label: "Stakeholder", level: 1 },
    ],
    solution:
      "Standalone visual tasks, paired with a Type 01 designer for the UX logic.",
    why: "Forcing UX reasoning solo would underuse the visual strength; pairing lets the visual ship while the product muscle grows on the side.",
  },
  {
    num: "04",
    name: "Strategic Convert",
    skills: [
      { label: "Visual design", level: 0 },
      { label: "Product thinking", level: 1 },
      { label: "Stakeholder", level: 3 },
    ],
    solution:
      "Hands-on training during onshore overlap — tools, fundamentals, applied UX.",
    why: "Business + stakeholder skills are the rare half; teaching the craft turns them into full-stack product designers faster than hiring would.",
  },
];

function TypeCard({ t }: { t: DesignerType }) {
  return (
    <div className="rounded-[12px] bg-[#F4F4F4] p-[20px]">
      <span className="text-[11px] tracking-[0.16em] font-medium text-[#5D5D5D]">
        TYPE {t.num}
      </span>
      <h4 className="mt-[8px] mb-[14px] text-[17px] leading-[1.3] font-medium text-[#1F1F1F]">
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
      <div className="mb-[10px] flex items-baseline gap-[10px]">
        <span className="text-[11px] tracking-[0.16em] font-medium text-[#5D5D5D]">
          TYPE {t.num}
        </span>
        <span className="text-[15px] font-medium text-[#1F1F1F]">
          {t.name}
        </span>
      </div>
      <dl className="grid grid-cols-[110px_1fr] gap-x-[14px] gap-y-[8px]">
        {[
          ["Solution", t.solution],
          ["Why it works", t.why],
        ].map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="text-[11px] tracking-[0.06em] font-medium text-[#5D5D5D]">
              {k}
            </dt>
            <dd className="text-[14px] leading-[1.6] text-[#1F1F1F]">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Challenge3() {
  return (
    <div className="mt-[64px]">
      <div className="mb-[14px]">
        <p className="mb-[8px] text-[12px] tracking-[0.16em] font-medium text-[#5D5D5D]">
          CHALLENGE 03
        </p>
        <h3 className="text-[26px] leading-[1.2] font-medium tracking-[-0.02em] text-[#1F1F1F] min-[560px]:text-[32px]">
          How we used it was.
        </h3>
      </div>

      <Body>
        Onshore / offshore is not a special model.  Everyone runs it.  The
        failure mode is treating offshore as a pair of acting hands —
        context broken, decisions reserved for onshore.{" "}
        <Strong>
          The entire overlap window gets eaten by context transfer — a
          vicious cycle.
        </Strong>{" "}
        The team works long but moves slow.
      </Body>
      <Body>
        I split the designers into four profiles and approached each
        differently — the goal at every desk was{" "}
        <Strong>autonomy and ownership</Strong>, not handouts.
      </Body>

      {/* 2×2 type grid */}
      <div className="my-[28px] grid grid-cols-1 gap-[14px] min-[560px]:grid-cols-2 min-[560px]:gap-[18px]">
        {DESIGNER_TYPES.map((t) => (
          <TypeCard key={t.num} t={t} />
        ))}
      </div>

      {/* Per-type Solution / Why */}
      <div className="my-[28px] flex flex-col gap-[22px]">
        {DESIGNER_TYPES.map((t) => (
          <TypeDetail key={t.num} t={t} />
        ))}
      </div>

      <Body italic>
        Re-evaluating talent instead of re-evaluating cost.  Offshore
        became a velocity-and-talent lever, not a headcount one.
      </Body>
    </div>
  );
}

function SectionChallenges() {
  return (
    <Section id="challenges">
      <Eyebrow>+ Challenges</Eyebrow>
      <SectionHead n="03" title="Challenges." />
      <Lede>
        Three operational problems and three rebuilds.  Each follows the
        same beat — what was broken, the move that fixed it, and what
        held after I stepped back.
      </Lede>
      <Challenge1 />
      <Challenge2 />
      <Challenge3 />
    </Section>
  );
}

// ===========================================================================
// §04 Reflection & Impact
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
      <div className="mb-[10px] text-[44px] leading-[1] font-extrabold tracking-[-0.04em] text-[#1F1F1F] min-[560px]:text-[52px]">
        {num}
      </div>
      <div className="mb-[6px] border-b border-[#A0A0A0] pb-[8px] text-[15px] font-medium text-[#1F1F1F]">
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
        n="04"
        title="What shipped, what didn't, what I'd carry forward."
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
      <Bullets
        items={[
          <Strong key="a">
            Strong design systems are as much about education as
            execution.
          </Strong>,
          <Strong key="b">
            Systems solve what people can&rsquo;t argue through.
          </Strong>,
        ]}
      />
      <Body>
        Focusing on individual performance matters — but system-level
        changes solve the deeper, recurring problems more effectively.
        Frontend implementation inconsistencies got addressed by a design
        QA layer, not more meetings.  Offshore collaboration improved by
        segmenting roles and reshaping the handoff.
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
        <div className="mx-auto flex max-w-[1200px] gap-[32px] px-[24px] pt-[40px] pb-[80px] min-[560px]:px-[32px] tablet:gap-[48px] tablet:pt-[56px] tablet:pb-[96px]">
          <CaseStudyLeftNav
            currentSlug="gia"
            readTime="~7 MIN READ"
            sections={SECTIONS}
          />
          <main className="min-w-0 flex-1">
            <SectionOverview />
            <SectionChallenges />
            <SectionReflection />
          </main>
        </div>
      </div>
    </div>
  );
}
