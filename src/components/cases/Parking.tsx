// NYC Parking case study (project 07 in the canonical list).
//
// Spec source: /Volumes/External/NYC Parking Project/nycproject/portfolio/case-study.md
// (~6 min read, 6 sections — sits between Toyota's 4-section rescue read and
// Volthop's 7-section depth, and is intentionally lighter because it's the
// portfolio's personal/civic side project, not a hire signal).
//
// Visual system mirrors Volthop / Toyota verbatim (mono palette, Archivo body,
// JetBrains Mono accents, 2px borders, sharp corners — no glow / shadow).
//
// Layout split:
//   §01 Hero       — full-bleed, no left nav (max-w-[1200px] internal)
//   §02–06         — left sticky nav (140px) + content column (~960px)

import CaseStudyLeftNav, {
  type CaseStudySection,
} from "@/components/cases/CaseStudyLeftNav";

const MONO: React.CSSProperties = {
  fontFamily:
    "var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
};

const SECTIONS: CaseStudySection[] = [
  { id: "premise", num: "02", label: "Premise" },
  { id: "data", num: "03", label: "The data" },
  { id: "build", num: "04", label: "Build", star: true },
  { id: "findings", num: "05", label: "Findings" },
  { id: "reflection", num: "06", label: "Reflection" },
];

// ============================================================================
// Atoms — same shape as Volthop/Toyota, slightly tuned for this read.
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

function PullQuote({
  children,
  attribution,
}: {
  children: React.ReactNode;
  attribution?: string;
}) {
  return (
    <figure className="max-w-[560px] border-l-2 border-[#1F1F1F] pl-[18px]">
      <blockquote className="text-[20px] leading-[1.45] font-normal italic text-[#1F1F1F]">
        {children}
      </blockquote>
      {attribution && (
        <figcaption className="mt-[10px] text-[12px] font-normal text-[#5D5D5D]">
          {attribution}
        </figcaption>
      )}
    </figure>
  );
}

function StatsCallout({
  header,
  stats,
}: {
  header: string;
  stats: { number: string; label: string }[];
}) {
  return (
    <div className="border-2 border-[#1F1F1F] bg-[#F8F8F8] p-[20px] tablet:p-[24px]">
      <p
        className="mb-[14px] text-[12px] tracking-[0.12em] text-[#5D5D5D]"

      >
        {header}
      </p>
      <div
        className="grid grid-cols-2 gap-[20px] tablet:grid-cols-3"
        style={{ gridAutoFlow: "row" }}
      >
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col gap-[4px]">
            <span className="text-[24px] leading-[1] font-medium tracking-[-0.02em] text-[#1F1F1F]">
              {s.number}
            </span>
            <span className="text-[12px] leading-[1.4] text-[#5D5D5D]">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LinkOut({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[12px] text-[#A0A0A0]">
      ↗ link out: {children}
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

// ============================================================================
// §01 Hero — wordmark + tagline + meta + 4-view ribbon
// ============================================================================

const VIEW_RIBBON: {
  src: string;
  bold: string;
  sub: string;
}[] = [
  { src: "/work/parking/boroughs.gif", bold: "Boroughs", sub: "Scale at a glance" },
  { src: "/work/parking/precincts.gif", bold: "Precincts", sub: "Drill down" },
  { src: "/work/parking/years.gif", bold: "Years", sub: "The rhythm" },
  { src: "/work/parking/types.gif", bold: "Types", sub: "97 ways to lose" },
];

function Hero() {
  return (
    <section className="border-b-2 border-[#1F1F1F] px-[32px] pt-[48px] pb-[64px] tablet:px-[64px] tablet:pt-[64px] tablet:pb-[96px]">
      <div className="flex flex-col gap-[36px]">
        <Eyebrow>+ 01 / Intro</Eyebrow>

        {/* Display — project number + wordmark.  "07" is JBM Mono (the
            only place JBM appears).  No glyph logo here — the question is
            the brand. */}
        <div className="flex flex-wrap items-baseline gap-[16px]">
          <span
            className="text-[64px] font-extrabold leading-[0.85] tracking-[-0.04em] text-[#1F1F1F] tablet:text-[120px]"
            style={MONO}
          >
            07
          </span>
          <h1 className="max-w-[1100px] text-[40px] leading-[0.95] font-black tracking-[-0.03em] text-[#1F1F1F] tablet:text-[88px]">
            Is street parking
            <br aria-hidden />
            really free?
          </h1>
        </div>

        {/* Hero grid — tagline + meta */}
        <div className="grid gap-[36px] tablet:grid-cols-[1fr_320px] tablet:items-start">
          <p className="max-w-[520px] text-[20px] leading-[1.4] font-medium text-[#1F1F1F] tablet:text-[21px]">
            A self-initiated investigation into 60,000 NYC parking tickets.
            <br aria-hidden />
            Spoiler in the title.
          </p>

          <dl className="border-t border-[#1F1F1F]/30">
            {[
              ["Role", "Solo · research, design, build"],
              ["Stack", "Vue 3 · Vite · Pinia · Mapbox · Three.js · D3"],
              ["Data", "NYC Open Data — Parking Violations Issued"],
              ["Years", "2021 → 2025 (5y, 60k records)"],
              ["Started", "2021 · rebuilt with current data, 2026"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex border-b border-[#1F1F1F]/30 py-[9px]"
              >
                <dt
                  className="w-[90px] shrink-0 text-[12px] font-normal text-[#5D5D5D]"

                >
                  {label}
                </dt>
                <dd className="text-[12px] text-[#1F1F1F]">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* 4-view ribbon — same role as Volthop's timeline, here it's the
            project's four scenes. Each frame is a GIF preview captured from
            the live app; labels follow the case-study.md spec. */}
        <div className="border-t border-b border-[#1F1F1F]/30 py-[18px]">
          <div className="grid grid-cols-2 gap-x-[12px] gap-y-[24px] tablet:grid-cols-4">
            {VIEW_RIBBON.map((v) => (
              <div key={v.bold} className="flex flex-col gap-[10px]">
                <div className="aspect-[16/10] w-full overflow-clip border-2 border-[#1F1F1F] bg-[#1F1F1F]/[0.04]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={v.src}
                    alt={`${v.bold} — ${v.sub}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col gap-[2px]">
                  <span className="text-[16px] leading-[1.2] font-medium text-[#1F1F1F]">
                    {v.bold}
                  </span>
                  <span
                    className="text-[12px] tracking-[0.05em] text-[#A0A0A0]"

                  >
                    {v.sub}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// §02 Premise — the receipt under my wiper
// ============================================================================

function SectionPremise() {
  return (
    <section
      id="premise"
      className="border-t border-[#1F1F1F]/30 py-[48px] first:border-t-0 first:pt-0 tablet:py-[64px]"
    >
      <div className="flex flex-col gap-[36px]">
        <SectionHeader
          number="02"
          eyebrow="The receipt under my wiper"
          headline={
            <>
              I came back from a trip and found
              <br aria-hidden />
              four tickets fanned out under my wiper.
            </>
          }
          lede="I'd been gone two weeks. $405 in parking violations. I sat in the driver's seat and did the math: a covered garage four blocks away was $310 a month."
        />

        <div className="grid gap-[28px] tablet:grid-cols-[1fr_320px] tablet:items-start">
          <div className="flex flex-col gap-[18px]">
            <Body>
              Wait.
            </Body>
            <Body>
              If even <em>I</em> — a careful-ish person who'd lived in NYC for
              years — had managed to lose $400 to street parking in fourteen
              days, the city was clearly running a much larger operation than
              I'd appreciated. So I did the only reasonable thing.
            </Body>
            <PullQuote attribution="The premise, in one sentence">
              I downloaded every parking violation NYC has issued in the last
              five years and started counting.
            </PullQuote>
          </div>

          {/* Right column — "evidence, exhibit A" stub. Three placeholder
              cards approximate the polaroid collage spec; swap with real
              photos when available. */}
          <aside className="flex flex-col gap-[12px]">
            <p
              className="text-[12px] tracking-[0.16em] text-[#A0A0A0]"

            >
              EVIDENCE — EXHIBIT A
            </p>
            <div className="flex flex-col gap-[14px]">
              {[
                {
                  label: "Four tickets, one windshield",
                  meta: "FA · 11 Oct 2021",
                  rotate: "rotate-[1.5deg]",
                },
                {
                  label: "Covered garage, four blocks away",
                  meta: "$310 / month — search receipt",
                  rotate: "-rotate-[2deg]",
                },
                {
                  label: "Spreadsheet, row 1",
                  meta: "Subtotal — $405",
                  rotate: "rotate-[0.8deg]",
                },
              ].map((p) => (
                <div
                  key={p.label}
                  className={`${p.rotate} flex aspect-[4/3] flex-col justify-end border-2 border-[#1F1F1F] bg-[#F8F8F8] p-[10px]`}
                >
                  <p className="text-[12px] leading-[1.35] font-medium text-[#1F1F1F]">
                    {p.label}
                  </p>
                  <p
                    className="text-[12px] tracking-[0.04em] text-[#A0A0A0]"

                  >
                    {p.meta}
                  </p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// §03 The data — what the city actually publishes + flow + 3 stats
// ============================================================================

function FlowDiagram() {
  const NODES: { label: string; sub?: string }[] = [
    { label: "NYC Open Data", sub: "Issued violations" },
    { label: "Fetcher", sub: "6 FY datasets · monthly pagination" },
    { label: "Code → fine", sub: "DOF code map · MN-below-96 rate" },
    { label: "Vue + Mapbox + 3JS + D3", sub: "Four scenes" },
  ];
  return (
    <div className="border-2 border-[#1F1F1F] bg-[#1F1F1F]/[0.04] px-[20px] py-[28px] tablet:px-[28px] tablet:py-[32px]">
      <div className="flex flex-col items-stretch gap-[14px] tablet:flex-row tablet:items-center tablet:gap-[10px]">
        {NODES.map((n, i) => (
          <div
            key={n.label}
            className="flex flex-1 items-center gap-[10px] tablet:flex-col tablet:items-start tablet:gap-[10px]"
          >
            <div className="flex w-full flex-col gap-[4px] border-2 border-[#1F1F1F] bg-[#EEEEEE] px-[12px] py-[10px]">
              <p className="text-[12px] leading-[1.25] font-medium text-[#1F1F1F]">
                {n.label}
              </p>
              {n.sub && (
                <p
                  className="text-[12px] tracking-[0.04em] text-[#5D5D5D]"

                >
                  {n.sub}
                </p>
              )}
            </div>
            {i < NODES.length - 1 && (
              <span
                className="text-[16px] text-[#5D5D5D] tablet:hidden"

                aria-hidden
              >
                ↓
              </span>
            )}
            {i < NODES.length - 1 && (
              <span
                className="hidden text-[16px] text-[#5D5D5D] tablet:inline"

                aria-hidden
              >
                →
              </span>
            )}
          </div>
        ))}
      </div>
      <p
        className="mt-[20px] text-center text-[12px] tracking-[0.06em] text-[#A0A0A0]"

      >
        FIG. 1 — pipeline. NYC FYs run Jul → Jun, so each calendar year stitches two datasets.
      </p>
    </div>
  );
}

function SectionData() {
  return (
    <section
      id="data"
      className="border-t border-[#1F1F1F]/30 py-[48px] first:border-t-0 first:pt-0 tablet:py-[64px]"
    >
      <div className="flex flex-col gap-[36px]">
        <SectionHeader
          number="03"
          eyebrow="What the city actually publishes"
          headline={
            <>
              Every ticket the city writes.
              <br aria-hidden />
              Plate, precinct, time, code, fine.
            </>
          }
          lede="Five years × millions of records a year. The trick was that you can't just hit one endpoint — NYC organizes parking tickets by fiscal year, not calendar year (Jul → Jun), so each calendar year I cared about lived across two datasets. To get 2021 – 2025 I had to stitch six of them."
        />

        <Body>
          The other trick: the issued data only stores a violation code (a
          number from 1 to 99), not the price. Manhattan below 96th Street has
          its own higher fine schedule. I cross-referenced a separate dataset
          — DOF Parking Violation Codes — to hydrate every record with the
          right amount based on the precinct.
        </Body>

        <FlowDiagram />

        <StatsCallout
          header="WHAT I ENDED UP WITH"
          stats={[
            { number: "5", label: "calendar years (2021 → 2025)" },
            { number: "60,000", label: "violations sampled, balanced monthly" },
            { number: "97", label: "distinct violation codes" },
          ]}
        />

        <LinkOut>
          fetcher script + DOF code map (open-source, on GitHub)
        </LinkOut>
      </div>
    </section>
  );
}

// ============================================================================
// §04 The build — 4 view cards
// ============================================================================

function ViewBlock({
  index,
  group,
  title,
  body,
  insight,
  imageSrc,
  imageAlt,
}: {
  index: string;
  group: string;
  title: string;
  body: string;
  insight: string;
  imageSrc: string;
  imageAlt: string;
}) {
  return (
    <article className="grid gap-[24px] border-t border-[#1F1F1F]/30 py-[28px] tablet:grid-cols-[1fr_360px] tablet:gap-[32px]">
      <div className="flex flex-col gap-[10px]">
        <p
          className="text-[12px] tracking-[0.08em] text-[#A0A0A0]"

        >
          VIEW {index} / {group}
        </p>
        <h3 className="text-[18px] leading-[1.3] font-medium text-[#1F1F1F]">
          {title}
        </h3>
        <p className="max-w-[600px] text-[16px] leading-[1.7] font-normal text-[#5D5D5D]">
          {body}
        </p>
        <p className="mt-[6px] max-w-[560px] border-l-2 border-[#1F1F1F] pl-[14px] text-[16px] leading-[1.5] italic text-[#1F1F1F]">
          {insight}
        </p>
      </div>

      <div className="aspect-[16/10] w-full overflow-clip border-2 border-[#1F1F1F] bg-[#1F1F1F]/[0.04] tablet:aspect-auto tablet:h-[230px] tablet:w-[360px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
    </article>
  );
}

function SectionBuild() {
  return (
    <section
      id="build"
      className="border-t border-[#1F1F1F]/30 py-[48px] first:border-t-0 first:pt-0 tablet:py-[64px]"
    >
      <div className="flex flex-col gap-[36px]">
        <SectionHeader
          number="04"
          eyebrow="Where, what, when ★"
          headline={
            <>
              Three questions.
              <br aria-hidden />
              Four scenes a non-technical friend could play with.
            </>
          }
          lede="Where does NYC make the most? What are people getting hit for? When does it spike? Each question got its own scene — none of them a dashboard. Dashboards are for analysts; I wanted something that opened on a phone and held attention for two minutes."
        />

        <div className="flex flex-col">
          <ViewBlock
            index="01"
            group="Boroughs"
            title="Pick a borough. Each sphere is its annual fine total."
            body="Three.js renders the four boroughs as physical objects you can size up at a glance. Click a sphere and it collapses into the individual tickets that built it — every dot is a real summons in the data."
            insight="In 2024, NYC ticketed Manhattan precincts for roughly 3× what it ticketed Bronx precincts. Population's nearly the same."
            imageSrc="/work/parking/boroughs.gif"
            imageAlt="Boroughs view — four spheres sized by annual fines"
          />
          <ViewBlock
            index="02"
            group="Precincts"
            title="NYPD precinct boundaries, click to drill in."
            body="Mapbox layer with real precinct geometry. Clicking surfaces a side panel: the precinct's average ticket cost, monthly trend, and a comparison line to its borough mean."
            insight="NYPD's 18th Precinct — Midtown North, including Times Square — had the highest average ticket value in the dataset."
            imageSrc="/work/parking/precincts.gif"
            imageAlt="Precincts view — Mapbox precinct drilldown"
          />
          <ViewBlock
            index="03"
            group="Years"
            title="Five years, side by side, five different metrics."
            body="Force-layout bubbles for the borough split. Monthly line graph. Stacked bars for share-over-time. The metric switcher cycles total cost, cost-per-plate, ticket count, tickets-per-plate, and cost-per-ticket — same data, five framings."
            insight="The post-pandemic recovery in ticketing is visible to the naked eye. 2020 dipped. By 2023 the city was issuing more per month than 2019."
            imageSrc="/work/parking/years.gif"
            imageAlt="Years view — bubbles + line + stacked bars"
          />
          <ViewBlock
            index="04"
            group="Types"
            title="97 distinct violation codes, grouped by borough."
            body="The treemap groups every code under the borough that wrote it most. Bar chart shows price-vs-frequency. Below, top-10 lists per borough — useful, weirdly, for spotting which code each neighborhood seems to specialize in."
            insight="Brooklyn, Queens, and the Bronx are most often ticketed for FIRE HYDRANT. Manhattan's #1 is NO STANDING — DAY/TIME LIMITS. That's a borough personality test."
            imageSrc="/work/parking/types.gif"
            imageAlt="Types view — treemap + bar + top 10"
          />
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// §05 Findings — six numbers I didn't expect
// ============================================================================

const FINDINGS: { label: string; value: string }[] = [
  { label: "Total fines in our 5-year sample", value: "$5.97M" },
  { label: "Avg. fine, Manhattan below 96th", value: "$93" },
  { label: "Avg. fine, everywhere else", value: "$67" },
  { label: "Most common ticket city-wide", value: "Fire Hydrant" },
  { label: "Most expensive common ticket", value: "No Standing" },
  { label: "Boroughs where Fire Hydrant is #1", value: "3 of 4" },
];

function SectionFindings() {
  return (
    <section
      id="findings"
      className="border-t border-[#1F1F1F]/30 py-[48px] first:border-t-0 first:pt-0 tablet:py-[64px]"
    >
      <div className="flex flex-col gap-[36px]">
        <SectionHeader
          number="05"
          eyebrow="Six numbers I didn't expect"
          headline={
            <>
              Sample of 60,000 tickets.
              <br aria-hidden />
              Real money.
            </>
          }
          lede="Some of these surprised me. None of them made me park better."
        />

        <div className="border-2 border-[#1F1F1F] bg-[#F8F8F8]">
          <ul>
            {FINDINGS.map((f, i) => (
              <li
                key={f.label}
                className={`grid grid-cols-[1fr_auto] items-baseline gap-[16px] px-[18px] py-[14px] tablet:px-[24px] tablet:py-[18px] ${
                  i < FINDINGS.length - 1
                    ? "border-b border-[#1F1F1F]/15"
                    : ""
                }`}
              >
                <span className="text-[16px] leading-[1.5] text-[#5D5D5D] tablet:text-[16px]">
                  {f.label}
                </span>
                <span
                  className="text-[20px] leading-[1] font-medium tracking-[-0.02em] text-[#1F1F1F] tablet:text-[24px]"

                >
                  {f.value}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <Body>
          Scale this sample to the city's actual issuance volume and you're
          looking at billions in fines a year. Just from people parking.
        </Body>

        <p className="text-[12px] leading-[1.6] text-[#A0A0A0]">
          ↗ note: some of these are charged, some get paid, some get contested.
          NYC publishes both — I built this off the issued side, because the
          paid side runs ~12 months behind reality.
        </p>
      </div>
    </section>
  );
}

// ============================================================================
// §06 Reflection — five years later + closing punch
// ============================================================================

function SectionReflection() {
  return (
    <section
      id="reflection"
      className="border-t border-[#1F1F1F]/30 py-[48px] first:border-t-0 first:pt-0 tablet:py-[64px]"
    >
      <div className="flex flex-col gap-[32px]">
        <SectionHeader
          number="06"
          eyebrow="I came back to it five years later"
          headline={
            <>
              I built this in 2021.
              <br aria-hidden />
              I rebuilt it in 2026 because I was curious if anything changed.
            </>
          }
        />

        <Body>
          The first version was a student project. Vue 2 era. Vue CLI, Vuex,
          jQuery still hanging around. Data was a one-time export I couldn't
          update.
        </Body>

        <Body>
          Five years later I came back, gutted the build (Vite, Pinia, ESM,
          mobile-first responsive, properly typed stores) and rewrote the
          data pipeline so it pulls current records from NYC Open Data on
          demand. Same project, current numbers, runs on a phone. The
          findings shifted in interesting ways — Manhattan stayed dominant,
          Fire Hydrant stayed #1 in three boroughs, but the average ticket
          cost rose. Fine schedules updated in 2023.
        </Body>

        <p className="max-w-[600px] text-[24px] leading-[1.4] font-medium text-[#1F1F1F] tablet:text-[28px]">
          So. Is street parking really free?
          <br aria-hidden />
          <span className="font-black">It is not.</span>
        </p>

        <p className="max-w-[600px] text-[16px] leading-[1.6] font-normal italic text-[#5D5D5D]">
          And yet I'm still parking on the street. Some answers don't change
          behavior — they just give you better metaphors.
        </p>

        {/* Footer credit — single mono line, restrained per the system */}
        <div className="mt-[16px] flex flex-col gap-[6px] border-t border-[#1F1F1F]/30 pt-[16px]">
          <p
            className="text-[12px] leading-[1.7] tracking-[0.04em] text-[#5D5D5D]"

          >
            Built with Vue 3 · Vite · Pinia · Mapbox GL · Three.js · D3.
          </p>
          <p
            className="text-[12px] leading-[1.7] tracking-[0.04em] text-[#A0A0A0]"

          >
            Data: NYC Open Data — Parking Violations Issued FY2021 → FY2026 ·
            DOF Parking Violation Codes.
          </p>
          <p
            className="text-[12px] leading-[1.7] tracking-[0.04em] text-[#A0A0A0]"

          >
            <a
              href="https://github.com/jotnajoa/nycproject"
              target="_blank"
              rel="noreferrer"
              className="underline-offset-[3px] hover:underline"
            >
              GitHub ↗
            </a>
            {"   ·   "}
            <a
              href="https://www.soonkdesign.com/personal-1/project-two-ky966-lnbgh-smsgj-fxf46"
              target="_blank"
              rel="noreferrer"
              className="underline-offset-[3px] hover:underline"
            >
              The original 2021 version ↗
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// Page composition
// ============================================================================

export default function ParkingCaseStudy() {
  return (
    <>
      <Hero />

      <div className="border-t-2 border-[#1F1F1F] px-[32px] tablet:px-[64px]">
        <div className="mx-auto flex max-w-[1200px] gap-[32px] py-[48px] tablet:py-[64px]">
          <CaseStudyLeftNav
            currentSlug="parking"
            readTime="~6 min read"
            sections={SECTIONS}
          />

          <div className="flex min-w-0 flex-1 flex-col">
            <SectionPremise />
            <SectionData />
            <SectionBuild />
            <SectionFindings />
            <SectionReflection />
          </div>
        </div>
      </div>
    </>
  );
}
