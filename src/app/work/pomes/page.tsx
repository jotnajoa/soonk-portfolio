import type { Metadata } from "next";
import Link from "next/link";
import CaseStudyNav from "@/components/cases/CaseStudyNav";
import CaseStudyLeftNav, {
  type CaseStudySection,
} from "@/components/cases/CaseStudyLeftNav";

// POMEs case study — single long-scroll page, light-mode editorial.
// Aligned with the landing's design system: Archivo (display + body) +
// JetBrains Mono (numerical accents).  An earlier draft followed the
// HTML preview's Manrope + Lora cream-warm palette but it diverged from
// the rest of the portfolio, so we kept only the structural decisions
// (section flow, sticky nav layout, three signature diagrams) and
// rebuilt the surface in the portfolio's light-mode B/W/grey vocabulary.
//
// Design tokens — ALL exist already on the landing (ProjectList /
// PhonesPair / Grid):
//   bg          #EEEEEE   (matches ProjectList section bg)
//   surface     #F4F4F4   (subtle lift for cells / callouts)
//   tile        #D9D9D9   (mid-grey fill — same as PhonesPair thumb bg)
//   text        #1F1F1F   (primary)
//   muted       #5D5D5D   (body)
//   tertiary    #A0A0A0   (caption, eyebrow)
//
// Accent (originally teal in the HTML preview) collapses to solid black
// #1F1F1F on the #EEEEEE base — emphasis via inversion (dark fill +
// light text), same vocabulary as the landing's ProjectNav active dot
// and Grid tile arrows.
//
// Breakpoints (matches HTML preview):
//   default    < 960px   single column, hero phones 2-up
//   min-[960]  ≥ 960px   2-col grid (sticky left nav + body)
//   min-[560]  ≥ 560px   slightly more relaxed hero typography
//
// Section IDs (match PomesNav):
//   pomes-intro · pomes-hunch · pomes-scan · pomes-research ·
//   pomes-design · pomes-build · pomes-engage · pomes-pivot ·
//   pomes-reflection

export const metadata: Metadata = {
  title: "POMEs — Soonk Paik",
  description:
    "A neighbor app where you brag about what you can offer, not beg for help.",
};

// JetBrains Mono — reserved for the canonical project number (01–09)
// only.  Per the design rule, every other text-element on the case study
// uses Archivo (the default).  Section numbers, stat numbers, eyebrow
// tags, and timeline dates all stay Archivo.
const MONO =
  "var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, Menlo, monospace";

const SECTIONS: CaseStudySection[] = [
  { id: "intro", num: "01", label: "Intro" },
  { id: "hunch", num: "02", label: "The hunch" },
  { id: "scan", num: "03", label: "Market scan" },
  { id: "research", num: "04", label: "Research → inversion" },
  { id: "design", num: "05", label: "Design v1" },
  { id: "build", num: "06", label: "Built & shipped" },
  { id: "engage", num: "07", label: "Engaging" },
  { id: "pivot", num: "08", label: "The pivot" },
  { id: "reflection", num: "09", label: "Reflection" },
];

// ---- Shared atoms ----------------------------------------------------------
//
// Type scale follows Soonk's locked hierarchy:
//   caption        12px / 0.75rem   — eyebrows, meta labels, fine print
//   body           16px / 1rem      — Lede + Body, never below 16
//   sub-heading    24px / 1.5rem    — SubH inside a section
//   heading        32px / 2rem      — SectionHead title (display)
// Color floor: #A0A0A0 is the lightest text allowed (anything fainter
// reads as ineligible for the page).
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
    <p className="mb-[18px] max-w-[620px] text-[16px] leading-[1.7] text-[#5D5D5D]">
      {children}
    </p>
  );
}

function Body({
  children,
  italic = false,
}: {
  children: React.ReactNode;
  italic?: boolean;
}) {
  return (
    <p
      className="my-[18px] max-w-[620px] text-[16px] leading-[1.7] text-[#5D5D5D]"
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

// PullQuote — Medium-style call-out: thick black left bar, oversized
// italic, dark ink.  Used for the case study's biggest narrative beats
// (e.g. "So I set out to prove it") so the reader's eye actually stops.
function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-[32px] max-w-[680px] border-l-[6px] border-[#1F1F1F] pl-[24px] text-[28px] leading-[1.25] font-black italic tracking-[-0.01em] text-[#1F1F1F] min-[560px]:text-[36px]">
      {children}
    </blockquote>
  );
}

// AnonymousQuote — interview citation with anonymized neighbor label,
// visually distinct from body text.  Left-bar block with the quote
// (italic, primary ink) and an arrow → implication line below.
function AnonymousQuote({
  speaker,
  quote,
  implies,
}: {
  speaker: string;
  quote: string;
  implies: string;
}) {
  return (
    <blockquote className="border-l-2 border-[#1F1F1F] py-[10px] pl-[20px]">
      <p
        className="text-[18px] leading-[1.5] font-medium text-[#1F1F1F]"
        style={{ fontStyle: "italic" }}
      >
        &ldquo;{quote}&rdquo;
        <cite className="ml-[8px] text-[12px] font-normal not-italic text-[#5D5D5D]">
          — {speaker}
        </cite>
      </p>
      <p className="mt-[6px] text-[14px] leading-[1.5] text-[#5D5D5D]">
        → {implies}
      </p>
    </blockquote>
  );
}

// Pale-teal "Research → Design" callout used in every Section 05 block.
function ResearchLink({ finding, decision }: { finding: string; decision: string }) {
  return (
    <div className="mt-[18px] flex flex-col gap-2 rounded-lg bg-[#D9D9D9] px-[18px] py-[14px] text-[16px] leading-[1.5] text-[#1F1F1F]">
      <div className="flex items-start gap-[10px]">
        <span className="mt-px shrink-0 rounded-[3px] bg-white/60 px-[7px] py-[3px] text-[12px] font-bold tracking-[0.1em] text-[#1F1F1F]">
          FINDING
        </span>
        <span className="flex-1">{finding}</span>
      </div>
      <div className="flex items-start gap-[10px]">
        <span className="mt-px shrink-0 rounded-[3px] bg-white/60 px-[7px] py-[3px] text-[12px] font-bold tracking-[0.1em] text-[#1F1F1F]">
          DECISION
        </span>
        <span className="flex-1">{decision}</span>
      </div>
    </div>
  );
}

// Phone-frame wrapper — dark bezel, cream inner, 9:19 ratio (matches the
// HTML preview).  Children are rendered ABOVE the inner area; if `image`
// is passed we render the screenshot full-bleed inside the bezel.
function Phone({
  image,
  alt,
  className = "",
}: {
  image?: string;
  alt?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[9/19] rounded-[16px] bg-[#1F1F1F] p-[4px] ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[12px] bg-[#F4F4F4]">
        {image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={image}
            alt={alt ?? ""}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}
      </div>
    </div>
  );
}

// ---- The page -------------------------------------------------------------
export default function PomesCaseStudy() {
  return (
    <div className="min-h-screen bg-[#EEEEEE] text-[#1F1F1F]">
      <CaseStudyNav currentSlug="pomes" />

      {/* ---------- HERO (Variant B — 4-phone row) ---------- */}
      <section
        id="intro"
        className="mx-auto max-w-[1200px] px-[32px] pt-[40px] pb-[40px] min-[560px]:pt-[64px] min-[560px]:pb-[48px]"
      >
        <Eyebrow>+ 01 / Intro</Eyebrow>

        {/* Project number (canonical 01-09 marker, JBM Mono) + Logo +
            giant POMEs wordmark — mirrors the landing list view's giant
            mono number anchoring each tile.  Live store links sit on the
            same row, anchored to the right, so the case opens with the
            answer to "is it real?" before the read begins. */}
        <div className="mb-[28px] flex flex-wrap items-end gap-[20px] leading-none min-[560px]:mb-[36px] min-[560px]:gap-[28px]">
          <span
            className="text-[64px] font-extrabold leading-[0.9] tracking-[-0.04em] text-[#1F1F1F] min-[560px]:text-[88px] min-[960px]:text-[120px]"
            style={{ fontFamily: MONO }}
          >
            01
          </span>
          <PomesLogoSvg className="h-[80px] w-auto shrink-0 text-[#1F1F1F] min-[560px]:h-[100px] min-[960px]:h-[124px]" />
          <span className="text-[80px] font-black leading-[0.9] tracking-[-0.05em] text-[#1F1F1F] min-[560px]:text-[110px] min-[960px]:text-[152px]">
            POMEs
          </span>

          {/* Live-link chips — TBD store URLs; placeholders link to "#" so
              the visual lands now, swap href later. */}
          <div className="flex flex-wrap items-center gap-[8px] self-end min-[960px]:ml-auto">
            <Link
              href="#"
              className="inline-flex items-center gap-[6px] border-2 border-[#1F1F1F] bg-[#1F1F1F] px-[12px] py-[6px] text-[12px] font-medium tracking-[0.04em] text-[#F4F4F4] no-underline hover:bg-[#5D5D5D]"
            >
              ↗ App Store
            </Link>
            <Link
              href="#"
              className="inline-flex items-center gap-[6px] border-2 border-[#1F1F1F] px-[12px] py-[6px] text-[12px] font-medium tracking-[0.04em] text-[#1F1F1F] no-underline hover:bg-[#1F1F1F] hover:text-[#F4F4F4]"
            >
              ↗ Google Play
            </Link>
          </div>
        </div>

        {/* Hero 2-column: phone-shaped autoplay video (left) + tagline +
            meta (right).  Replaces the earlier 4-phone screenshot row —
            small thumbnails read as unreadable mocks; one looped video of
            the live app reads as the product itself.

            Below 960px the column stacks vertically (video on top). */}
        <div className="mb-[40px] grid gap-[32px] min-[960px]:mb-[48px] min-[960px]:grid-cols-[auto_1fr] min-[960px]:items-start min-[960px]:gap-[48px]">
          {/* Left: phone video — 1206×2622 source aspect, 2px bezel matches
              the landing list view's PhonesPair frames. */}
          <div className="relative mx-auto aspect-[1206/2622] w-full max-w-[260px] overflow-clip rounded-[24px] border-2 border-[#1F1F1F] bg-[#1F1F1F] min-[960px]:mx-0 min-[960px]:max-w-[320px]">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="POMEs app — landing flow"
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src="/work/pomes/landing.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Right: tagline + meta block */}
          <div className="flex flex-col gap-[28px] min-[960px]:gap-[36px]">
            <p className="max-w-[620px] text-[24px] leading-[1.2] font-medium tracking-[-0.02em] text-[#1F1F1F] min-[560px]:text-[28px] min-[960px]:text-[36px]">
              A neighbor app where you brag about what you can offer, not
              beg for help.
            </p>

            <dl className="border-t border-[#A0A0A0]">
              {[
                ["Role", "Solo · end-to-end"],
                ["Scope", "Research → design → vibe-coded engineering → GTM"],
                ["Timeline", "Mar 15 – Apr 30, 2026 (~7 weeks)"],
                ["Stack", "iOS · Android · React Native · Firebase"],
              ].map(([l, v]) => (
                <div
                  key={l}
                  className="grid grid-cols-[110px_1fr] items-baseline gap-[18px] border-b border-[#A0A0A0] py-[14px]"
                >
                  <dt className="text-[12px] font-medium tracking-[0.06em] text-[#5D5D5D]">
                    {l}
                  </dt>
                  <dd className="text-[16px] leading-[1.5] text-[#1F1F1F]">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Timeline ribbon — vertical tick markers, dates above labels.
            Mobile: each step is a stacked row (date over label, hairline
            divider below).  Desktop ≥560: 5-column horizontal ribbon with
            a single hairline rule running across the ticks. */}
        <div className="mb-[24px] pt-[8px]">
          <div className="relative grid grid-cols-1 min-[560px]:grid-cols-5 min-[560px]:gap-0">
            {/* hairline rule — tablet+ only, runs through the tick marks */}
            <span
              aria-hidden
              className="absolute top-[7px] right-[10%] left-[10%] hidden h-px bg-[#A0A0A0] min-[560px]:block"
            />
            {[
              ["Mar 15", "Concept"],
              ["Mar 16–26", "Research"],
              ["Mar 25 – Apr 20", "Design + build"],
              ["Apr 25", "GTM"],
              ["Apr 30", "Live"],
            ].map(([d, l], i) => (
              <div
                key={i}
                className="relative z-[1] border-b border-[#A0A0A0] py-[14px] text-left min-[560px]:border-0 min-[560px]:px-2 min-[560px]:py-0 min-[560px]:text-center"
              >
                <span className="block h-[14px] w-[2px] bg-[#1F1F1F] min-[560px]:mx-auto" />
                <div className="mt-[8px] text-[12px] tracking-[0.04em] text-[#5D5D5D] min-[560px]:mt-[14px]">
                  {d}
                </div>
                <div className="mt-[4px] text-[16px] leading-[1.3] font-medium text-[#1F1F1F] min-[560px]:mt-[6px]">
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* ---------- Body grid: sticky nav + content ---------- */}
      <div className="bg-[#EEEEEE]">
        <div className="mx-auto flex max-w-[1200px] gap-[32px] px-[32px] pt-[40px] pb-[80px] tablet:gap-[48px] tablet:pt-[56px] tablet:pb-[96px]">
          <CaseStudyLeftNav
            currentSlug="pomes"
            readTime="~10 min read"
            sections={SECTIONS}
          />

          <main className="min-w-0 flex-1">
            {/* ===== 02 The hunch ===== */}
            <Section id="hunch" first>
              <Eyebrow>+ The premise</Eyebrow>
              <SectionHead
                n="02"
                title="What if a single building had its own social infrastructure?"
              />
              <Lede>
                I lived in a 60-unit DUMBO building. Everyone said hi in the
                elevator. Almost nobody actually knew each other.
              </Lede>
              <Body>
                I had a hunch — small, verified communities (one building, one
                workplace) might be where neighborly help could actually scale.
                Not Nextdoor&rsquo;s 10,000 strangers. Just the people who share
                a wall.
              </Body>
              <PullQuote>So I set out to prove it.</PullQuote>
            </Section>

            {/* ===== 03 Market scan ===== */}
            <Section id="scan">
              <Eyebrow>+ Method 1 — what already exists</Eyebrow>
              <SectionHead
                n="03"
                title="I split the work — AI took scale, interviews surfaced experience."
              />

              {/* AI / Me split — the headline visible at a glance */}
              <ResearchSplit />

              {/* What AI researched — 3 competitors, logo + bullets */}
              <SubH>What AI researched</SubH>
              <ReferenceGrid
                cards={[
                  {
                    name: "Favorhood",
                    logo: { char: "F", bg: "#FF6B35" },
                    bullets: [
                      "Berkeley, est. 2020 — closest direct competitor",
                      "0.5-mile-radius matching · address verification only",
                      "Opening: building-level trust beats zip-code radius; currency mechanic adds reciprocity",
                    ],
                  },
                  {
                    name: "Nextdoor",
                    logo: { char: "N", bg: "#00BB66" },
                    bullets: [
                      "1.7★ on Trustpilot across 3,045 reviews — vulnerable giant",
                      "Top complaints: arbitrary suspensions, political bias, ad-heavy after B2B pivot",
                      "Opening: small, trusted, ad-free communities",
                    ],
                  },
                  {
                    name: "TimeBanks",
                    logo: { char: "T", bg: "#3A5B7A" },
                    bullets: [
                      "3M+ hours exchanged globally — the concept itself works",
                      "Pitfalls: grant dependency, manager burnout, core/periphery activity decay",
                      "Mechanics inspired Seeds; failures shaped what NOT to repeat",
                    ],
                  },
                ]}
              />

              {/* Other AI-driven reports — title + link only */}
              <SubH>Other AI-driven reports</SubH>
              <OtherReports />
            </Section>

            {/* ===== 04 Research → Inversion ===== */}
            <Section id="research">
              <Eyebrow>+ Method 2 — what neighbors actually wanted</Eyebrow>
              <SectionHead
                n="04"
                title="I watched, asked, and built a game to find where the friction was."
              />
              <Lede>
                Two weeks of WhatsApp lurking, 8 scheduled interviews + 12+
                hallway 1-min interviews, and a custom card-sorting game I ran
                live with neighbors. Three angles on the same question: where
                do neighbors freeze up?
              </Lede>

              <SubH>What I saw on WhatsApp</SubH>
              <Body>
                People posted give-aways constantly and got many responses.
                People posted asks <em className="italic">almost never</em>.
                When asks did appear, they were for kids — never for adult
                needs. <Strong>Helping was happening; asking wasn&rsquo;t.</Strong>
              </Body>

              <SubH>Tools neighbors already used</SubH>
              <ReferenceGrid
                cards={[
                  {
                    name: "Buy Nothing",
                    logo: { char: "B", bg: "#6F4A28" },
                    bullets: [
                      "Used by multiple interviewees",
                      "Solves the gift loop (coffee, baby clothes, old chair)",
                      "No relationship layer — scales gifts, not trust",
                    ],
                  },
                  {
                    name: "BuildingLink",
                    logo: { char: "B", bg: "#3F66A8" },
                    bullets: [
                      "Half of interviewees had a login",
                      "Used only for maintenance tickets",
                      "A portal for complaints, not a way to meet a neighbor",
                    ],
                  },
                  {
                    name: "WhatsApp groups",
                    logo: { char: "W", bg: "#25D366" },
                    bullets: [
                      "Every building has one; hundreds of give-posts",
                      "Messages disappear — no inventory, no memory",
                      "Loudest personalities dominate; quiet neighbors stay invisible",
                    ],
                  },
                ]}
              />
              <p className="mt-[8px] mb-[18px] max-w-[620px] text-[16px] leading-[1.7] italic text-[#5D5D5D]">
                Each tool solved a slice. None was built for a single 60-unit
                building where the same 60 people live next to each other for
                years.
              </p>

              <SubH>What I asked in interviews</SubH>
              <Body>
                Two questions did most of the heavy lifting across 8 scheduled
                30-min sessions:
              </Body>

              <div className="my-[24px] flex max-w-[660px] flex-col gap-[10px]">
                {[
                  [
                    "Q1",
                    "Tell me about the last time you needed help from a neighbor — even something tiny. What happened?",
                  ],
                  [
                    "Q2",
                    "If you had a neighbor who was happy to help with X, would you ask? What would make it easy or hard?",
                  ],
                ].map(([q, t]) => (
                  <div
                    key={q}
                    className="grid grid-cols-[36px_1fr] items-start gap-[14px] rounded-[10px] bg-[#F4F4F4] px-[20px] py-[16px]"
                  >
                    <span
                      className="pt-px text-[16px] font-medium text-[#1F1F1F]"
                      style={{ fontStyle: "italic" }}
                    >
                      {q}
                    </span>
                    <span className="text-[16px] leading-[1.55] text-[#1F1F1F]">
                      {t}
                    </span>
                  </div>
                ))}
              </div>

              <Body>
                The themes came back fast. Three of eight said the same thing
                about asking; the fourth voice flipped that on its head about
                offering. The pattern is the case study.
              </Body>

              <div className="my-[18px] flex max-w-[680px] flex-col gap-[14px]">
                <AnonymousQuote
                  speaker="Neighbor A"
                  quote="I could do it on the app. Face-to-face damages my image."
                  implies="Asking in person feels exposing; a digital layer makes it bearable."
                />
                <AnonymousQuote
                  speaker="Neighbor B"
                  quote="I won't ask while I can still do it myself."
                  implies="Self-reliance is performed — the bar for 'I need help' is set too high."
                />
                <AnonymousQuote
                  speaker="Neighbor C"
                  quote="I can do it directly, so I won't have someone do it for me."
                  implies="Independence is the default; receiving help reads as dependency."
                />
                <AnonymousQuote
                  speaker="Neighbor D"
                  quote="I love helping people in that situation. I've been there myself."
                  implies="The offer side has no embarrassment cost. People want to give."
                />
              </div>

              <Body>
                The cost wasn&rsquo;t the favor itself — it was the social cost
                of asking. Offering had no such cost.
              </Body>

              {/* Card-sorting — inline mention, not its own headline.
                  Embedded as an iframe so the reader can actually try the
                  tool; jotnajoa.github.io is a static GitHub Pages site so
                  session-local interaction has no global side-effects. */}
              <Body>
                Mid-way through interviews I built a small card-sorting web
                app — Claude Code wrote 90% of the React; I designed the cards
                from interview prep. Neighbors dragged 12 hypothetical asks
                into &ldquo;would ask&rdquo; / &ldquo;wouldn&rsquo;t&rdquo;
                while I watched. (Try it below — it&rsquo;s live.)
              </Body>

              <figure className="my-[22px]">
                <div className="overflow-clip rounded-[8px] border-2 border-[#1F1F1F] bg-[#F4F4F4]">
                  <iframe
                    src="https://jotnajoa.github.io/pbn-card-sorting/"
                    title="POMEs interview card-sorting game"
                    loading="lazy"
                    className="block h-[520px] w-full"
                  />
                </div>
                <figcaption className="mt-[10px] flex flex-wrap items-baseline justify-between gap-[12px] text-[12px] tracking-[0.08em] text-[#5D5D5D]">
                  <span>FIG. 1 OF 3 · CARD-SORTING TOOL (LIVE)</span>
                  <a
                    href="https://jotnajoa.github.io/pbn-card-sorting/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#1F1F1F]"
                  >
                    ↗ Open in new tab
                  </a>
                </figcaption>
              </figure>

              <Body>The findings sharpened the picture:</Body>
              <ul className="my-[12px] mb-[22px] flex max-w-[620px] flex-col">
                {[
                  ["Universal “would ask”:", " pet sitting, watering plants, dog walking"],
                  ["Universal “wouldn’t ask”:", " picking up groceries (3 of 4 wouldn’t)"],
                  ["Polarizing tasks:", " kid watching, helping with a move, furniture assembly"],
                  ["A clean principle:", " one-off = OK to ask a neighbor; regular = hire someone"],
                ].map(([h, t]) => (
                  <li
                    key={h}
                    className="relative py-[6px] pl-[22px] text-[16px] leading-[1.65] text-[#5D5D5D] before:absolute before:left-0 before:text-[#A0A0A0] before:content-['—']"
                  >
                    <Strong>{h}</Strong>
                    {t}
                  </li>
                ))}
              </ul>

              <SubH>The synthesis: an inversion</SubH>
              <Body>
                People <Strong>love publicly showing their generosity</Strong>{" "}
                — but feel uncomfortable asking for things. So I let the app
                lead with what neighbors <em>can offer</em> (lend, help with,
                host) rather than what they <em>need</em>. Others see those
                offers and request — the request becomes the easy half of the
                exchange, not the heavy half.
              </Body>

              {/* Fig. 2 — The inversion */}
              <figure className="my-[28px] rounded-[12px] bg-[#F4F4F4] px-[28px] pt-[40px] pb-[22px]">
                <InversionDiagramSvg />
                <figcaption className="mt-[14px] text-right text-[12px] tracking-[0.08em] text-[#5D5D5D]">
                  FIG. 2 OF 3 · THE INVERSION
                </figcaption>
              </figure>
            </Section>

            {/* ===== 05 Design v1 ===== */}
            <Section id="design">
              <Eyebrow>+ From insight to product</Eyebrow>
              <SectionHead
                n="05"
                title="Each screen is the answer to a specific finding."
              />
              <Lede>
                Five screens, five decisions — and the most important decision
                isn&rsquo;t a screen at all. The research from Section 04 is in
                every one. Let me show you.
              </Lede>

              {/* Nav-strip reference — the app has 5 tabs.  Home and Feed
                  are one screen, not two; the strip clarifies that up front
                  so the read below doesn't double back on terminology. */}
              <div className="mt-[28px] grid grid-cols-5 border-y border-[#A0A0A0]">
                {["Home", "Borrow", "Favor", "Event", "Chat"].map((tab, i) => (
                  <div
                    key={tab}
                    className={`flex items-center justify-center py-[18px] text-[14px] font-medium tracking-[0.04em] text-[#1F1F1F] min-[560px]:text-[16px] ${
                      i > 0 ? "border-l border-[#A0A0A0]" : ""
                    }`}
                  >
                    {tab}
                  </div>
                ))}
              </div>
              <p className="mb-[18px] text-[12px] tracking-[0.04em] text-[#5D5D5D]">
                The five bottom-nav tabs. Home and Feed are one screen; the rest
                follow below. Chat is covered in §06.
              </p>

              {/* Block 1 — HOME (which IS the feed).  Four-screenshot flow
                  showing the four roles the single home screen plays:
                    (i)  Feed — small neighbor interactions, serendipity
                    (ii) Seed Tree — 3D ambient growth visualization
                    (iii) Seed detail modal — encouragement explainer
                    (iv) Tap-through — items navigate to their section
                  Screenshots TBD per Soonk; placeholders sized to match
                  Phone bezel below. */}
              <SubH>Home · One screen, four roles</SubH>
              <Body>
                Home and Feed are not separate tabs — they&rsquo;re the same
                screen. Small interactions surface as a feed at the top; a
                living seed-tree visualization sits below; tapping any item
                deep-links into its section. Four roles, one place.
              </Body>

              <div className="my-[24px] grid grid-cols-1 gap-[20px] min-[560px]:grid-cols-2 min-[960px]:grid-cols-4 min-[960px]:gap-[18px]">
                {[
                  {
                    src: "/work/pomes/pomes-home-feed.png",
                    label: "01 · Feed",
                    sub: "Serendipity",
                    body: "Small neighbor interactions — borrows, favors, events — surface in a single feed. Offers lead. No chit-chat, no noise.",
                  },
                  {
                    src: "/work/pomes/pomes-home-thriving.png",
                    label: "02 · Seed Tree",
                    sub: "Ambient growth",
                    body: "3D visualization of monthly community activity. The tree grows as helps stack up — building life made legible without a leaderboard.",
                  },
                  {
                    src: "/work/pomes/pomes-intro-02-top.png",
                    label: "03 · Seed Detail",
                    sub: "Modal",
                    body: "Tap the tree to open a detail modal explaining what it responds to. No score; encouragement instead of ranking.",
                  },
                  {
                    src: "/work/pomes/pomes-intro-03-three.png",
                    label: "04 · Tap-through",
                    sub: "Section jump",
                    body: "Any feed item deep-links into its section — a borrow item opens in Borrow, a favor in Favor. Home becomes a router.",
                  },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col gap-[10px]">
                    <div className="mx-auto w-full max-w-[180px]">
                      <Phone image={s.src} alt={s.label} />
                    </div>
                    <p
                      className="text-[12px] tracking-[0.08em] font-medium text-[#5D5D5D]"
                      style={{ fontFamily: MONO }}
                    >
                      {s.label}
                    </p>
                    <p className="text-[16px] leading-[1.3] font-medium text-[#1F1F1F]">
                      {s.sub}
                    </p>
                    <p className="text-[14px] leading-[1.55] text-[#5D5D5D]">
                      {s.body}
                    </p>
                  </div>
                ))}
              </div>

              <ResearchLink
                finding="Points feel transactional and threatening; they shame the people who need most. (Multiple interviewees pushed back.)"
                decision="No leaderboard. Tree grows from collective activity — ambient signal, never a ranking."
              />

              {/* Block 3 — Borrow (1 real phone — second still TBD) */}
              <ScrBlock
                eyebrow="BORROW / PERSISTENT INVENTORY"
                heading="Borrow what neighbors have, not what they're saying right now."
                phones={["/work/pomes/pomes-borrow.png"]}
                phoneAlts={["POMEs borrow inventory"]}
                paras={[
                  <>
                    One of the loudest WhatsApp findings: messages disappear.
                    Someone offered a portable AC last summer; nobody remembered
                    when they needed one this June. So Borrow is structured the
                    way the chat couldn&rsquo;t be — every offered item stays
                    browsable, with availability status and lending history.
                    Neighbors can see what&rsquo;s actually around them, when
                    it&rsquo;s free, and who else has used it.
                  </>,
                  <span key="bonus" className="text-[16px] text-[#A0A0A0]">
                    (Bonus: categories grow from a flexible &ldquo;Other&rdquo;
                    bucket. When 5+ items pile in, that&rsquo;s the system
                    telling me a new category is overdue.)
                  </span>,
                ]}
                finding="WhatsApp loses memory. Neighbors don't know what's been offered before, so they don't know what's possible."
                decision="Persistent, browsable inventory with availability status and history."
              />

              {/* Block 4 — Favor (★ 2 phones, both tab states, reverse) */}
              <ScrBlock
                reverse
                eyebrow="FAVOR / DEFAULT TO OFFERING"
                heading="The generous action is the default tap."
                phones={[
                  "/work/pomes/pomes-favor-offers.png",
                  "/work/pomes/pomes-favor-asks.png",
                ]}
                phoneAlts={[
                  "POMEs favor — “I can help” default tab",
                  "POMEs favor — “I need” toggle tab",
                ]}
                paras={[
                  <>
                    The direct UX expression of Section 04&rsquo;s inversion.
                    The Favor tab opens to &ldquo;I can help with X&rdquo; —
                    never &ldquo;I need help.&rdquo; Both tabs exist; only one
                    is the default. When a neighbor opens the tab, they see
                    what others are <em className="italic">offering</em> first.
                    The &ldquo;I need&rdquo; view is one tap away — there if
                    you genuinely need it, but never the front door.
                  </>,
                  <>
                    Why? Because every default the app sets shapes behavior. If
                    asking is hard (which all eight interviewees confirmed),
                    don&rsquo;t make it the home of this section. Make the easy
                    action — the offer — the default, and the hard action a
                    deliberate choice.
                  </>,
                ]}
                finding="Asking costs face. Offering earns it. (3 of 8 said it explicitly; WhatsApp behavior confirmed it.)"
                decision={'Default tab = "I can help." "I need" exists as a deliberate one-tap-away choice.'}
              />

              {/* Block 5 — Event (singular, per nav rename) */}
              <ScrBlock
                eyebrow="EVENT / THE TRUST SPINE"
                heading="The screen that pulls people out of the app."
                phones={["/work/pomes/pomes-event-calendar.png"]}
                phoneAlts={["POMEs event calendar"]}
                paras={[
                  <>
                    Every interviewee — without exception — said the same
                    thing: trust comes from face time, not from messaging. So
                    Event is the only screen designed to pull people out of the
                    app and into the building. It&rsquo;s the spine.
                  </>,
                  <>
                    Originally family-oriented; later rebuilt for young
                    professionals when the audience shifted. You&rsquo;ll see
                    why in Section 08.
                  </>,
                ]}
                finding="Trust comes from face time. Digital interactions don't substitute. (8 of 8 said this.)"
                decision="Event as the only screen that pulls people offline. The spine of the system."
              />

              {/* Trust-loop figure — Event → trust → engagement → more events */}
              <figure className="my-[28px] rounded-[12px] bg-[#F4F4F4] p-[18px]">
                <TrustLoopDiagramSvg />
                <figcaption className="mt-2 text-right text-[12px] tracking-[0.08em] text-[#5D5D5D]">
                  FIG. 3 · THE TRUST LOOP
                </figcaption>
              </figure>
            </Section>

            {/* ===== 06 Built & shipped ===== */}
            <Section id="build">
              <Eyebrow>+ From design to working app</Eyebrow>
              <SectionHead
                n="06"
                title="I couldn't read the vibe-coded backend well enough to trust it."
              />
              <Lede>
                Frontend I knew. Backend was unfamiliar, so I let Claude
                vibe-code most of it. The problem: vibe coding writes a lot of
                code; reading it well enough to know what&rsquo;s broken is
                its own skill. So I built a different kind of validation —
                user-story-mapped every interaction, turned each story into a
                Notion-table test row, then broke the backend on purpose with
                four phones racing to write to the same Firestore document.
                Test and fix in one pass.
              </Lede>

              <div className="my-[24px]">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[12px] bg-[#F4F4F4]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/work/pomes/4phone-building.jpg"
                    alt="Backend stress test — four phones, four accounts, same Firestore document"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <p
                  className="mt-[10px] text-center text-[12px] text-[#5D5D5D]"
                  style={{ fontStyle: "italic" }}
                >
                  Backend stress test · 4 phones, 4 accounts, same building.
                </p>
              </div>

              {/* Stack + Bridge — plain list view (no highlighted card; the
                  Live status moved to the hero so the layout reads clean). */}
              <div className="my-[24px] grid grid-cols-1 gap-[24px] min-[560px]:grid-cols-2">
                <div>
                  <p
                    className="mb-[10px] border-b border-[#A0A0A0] pb-[8px] text-[12px] tracking-[0.16em] font-medium text-[#5D5D5D]"
                    style={{ fontFamily: MONO }}
                  >
                    TECH STACK
                  </p>
                  <ul className="flex flex-col gap-[6px] text-[16px] leading-[1.55] text-[#1F1F1F]">
                    {[
                      "React Native",
                      "Firebase",
                      "Firestore",
                      "Twilio",
                      "Apple Sign-In",
                      "Expo",
                    ].map((s) => (
                      <li key={s}>· {s}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p
                    className="mb-[10px] border-b border-[#A0A0A0] pb-[8px] text-[12px] tracking-[0.16em] font-medium text-[#5D5D5D]"
                    style={{ fontFamily: MONO }}
                  >
                    DATA-SCHEMA BUILDING STRATEGY
                  </p>
                  <ol className="flex flex-col gap-[10px] text-[16px] leading-[1.55] text-[#1F1F1F]">
                    <li>
                      <span className="font-medium">01</span> User-story map of
                      every interaction
                    </li>
                    <li>
                      <span className="font-medium">02</span> Convert each
                      story to a row in a Notion backend table
                    </li>
                    <li>
                      <span className="font-medium">03</span> Translate each
                      row to Firestore calls (Claude vibe-coded)
                    </li>
                    <li>
                      <span className="font-medium">04</span> Stress-test with
                      4 phones racing the same document; fix what desyncs
                    </li>
                  </ol>
                </div>
              </div>

              {/* ----- Chat — the item-tied messaging surface ----- */}
              <SubH>Chat · Item-tied, not direct messaging.</SubH>
              <Body>
                Chat in POMEs follows the Airbnb pattern, not the WhatsApp
                pattern: every conversation is{" "}
                <Strong>scoped to a specific item, favor, or event</Strong> —
                never an open DM stream. The chat opens when a request happens
                and closes when the action completes. Three flavors below.
              </Body>

              <ChatFlow
                title="BORROW · CHAT ACTIONS"
                steps={[
                  {
                    label: "Request to borrow",
                    note: "Borrower taps Request on the item; chat hasn't opened yet.",
                  },
                  {
                    label: "Chat opens",
                    note: "Both parties enter the item-scoped thread.",
                  },
                  {
                    label: "Owner marks loan",
                    note: "Item shifts to On loan — visible but unbookable.",
                  },
                  {
                    label: "Borrower returns",
                    note: "Marks the item returned; owner asked to confirm.",
                  },
                  {
                    label: "Owner confirms · thank-you",
                    note: "Loop closes. Borrower can leave a thank-you note → tier bump.",
                  },
                ]}
              />

              <ChatFlow
                title="FAVOR · CHAT ACTIONS"
                steps={[
                  {
                    label: "Offer or request favor",
                    note: "Either side can initiate; the offer side is the default.",
                  },
                  {
                    label: "Favor exchanged",
                    note: "Time / place agreed inside the thread.",
                  },
                  {
                    label: "Marked complete · thank-you",
                    note: "Helper bumps tier when the helped party leaves a note.",
                  },
                ]}
              />

              <ChatFlow
                title="EVENT · CHAT ACTIONS"
                steps={[
                  {
                    label: "Event created",
                    note: "Host opens the event with time, place, capacity.",
                  },
                  {
                    label: "Neighbors RSVP · join",
                    note: "Joining surfaces a small event-scoped thread.",
                  },
                  {
                    label: "Event happens",
                    note: "Thread closes the morning after.",
                  },
                ]}
              />

              <SubH>Tiers — the only public signal of past help.</SubH>
              <Body>
                After a Borrow or a Favor wraps, the helped party can leave a
                thank-you note. Notes accumulate and bump the helper&rsquo;s
                tier badge — Bronze · Silver · Gold. No leaderboard. The badge
                is the only place a number ever surfaces.
              </Body>

              <TierBadgeRow />
            </Section>

            {/* ===== 07 Engaging ===== */}
            <Section id="engage">
              <Eyebrow>+ Engagement</Eyebrow>
              <SectionHead
                n="07"
                title="How I kept neighbors part of the build, not the audience for it."
              />
              <Lede>
                I didn&rsquo;t want to disappear into a build and drop a
                finished app on my neighbors&rsquo; heads. From week 2 — long
                before TestFlight existed — engagement ran on two tracks:
              </Lede>

              {/* Two engagement tracks — bullets up front, evidence below */}
              <ul className="my-[16px] flex max-w-[680px] flex-col gap-[8px] text-[16px] leading-[1.6] text-[#1F1F1F]">
                <li>
                  <Strong>Weekly progress report → the apt group chat.</Strong>{" "}
                  Sketches, decisions, what I was wrestling with — straight
                  into the WhatsApp thread the building already used.
                </li>
                <li>
                  <Strong>Demo video of the app → the neighbors.</Strong> A
                  personal walkthrough so the app didn&rsquo;t feel like a
                  cold install — they&rsquo;d already watched me use it.
                </li>
              </ul>

              {/* Weekly progress report — 3 placeholder thumbnails until Soonk
                  drops the actual report screenshots into /work/pomes/. */}
              <SubH>Weekly progress report</SubH>
              <div className="my-[18px] grid grid-cols-1 gap-[14px] min-[560px]:grid-cols-3">
                {["Week 02", "Week 04", "Week 06"].map((wk) => (
                  <div key={wk}>
                    <div className="relative flex aspect-[3/4] items-center justify-center overflow-clip rounded-[12px] border-2 border-[#1F1F1F] bg-[#F4F4F4]">
                      <div
                        className="text-center text-[12px] tracking-[0.08em] text-[#5D5D5D]"
                        style={{ fontFamily: MONO }}
                      >
                        TBD · {wk}
                        <br />
                        REPORT SCREENSHOT
                      </div>
                    </div>
                    <p
                      className="mt-[8px] text-center text-[12px] tracking-[0.04em] text-[#5D5D5D]"
                      style={{ fontStyle: "italic" }}
                    >
                      {wk} update to the apt group chat.
                    </p>
                  </div>
                ))}
              </div>

              {/* Demo video — placeholder until the external file lands at
                  /work/pomes/demo.mp4 (or an embed URL). */}
              <SubH>Personal demo video</SubH>
              <div className="my-[18px]">
                <div className="relative aspect-[16/9] overflow-clip rounded-[12px] border-2 border-[#1F1F1F] bg-[#F4F4F4]">
                  <div
                    className="flex h-full w-full flex-col items-center justify-center gap-[10px] text-center text-[12px] tracking-[0.08em] text-[#5D5D5D]"
                    style={{ fontFamily: MONO }}
                  >
                    <span className="text-[40px] leading-none">▶</span>
                    TBD · DEMO VIDEO
                  </div>
                </div>
                <p
                  className="mt-[10px] text-center text-[12px] tracking-[0.04em] text-[#5D5D5D]"
                  style={{ fontStyle: "italic" }}
                >
                  Personal walkthrough — sent to the building before launch.
                </p>
              </div>

              <Body>
                Over the weeks, the response told me something. People liked
                the concept. But &ldquo;app&rdquo; itself triggered resistance
                — read as a monetization scheme, especially in a building where
                most owners had been there 8+ years and didn&rsquo;t see what
                would change for them. Stable inner circles + small unit count
                meant the network effect couldn&rsquo;t compound.
              </Body>

              <p
                className="my-[24px] max-w-[580px] text-[20px] text-[#1F1F1F]"
                style={{ fontStyle: "italic" }}
              >
                I&rsquo;d built the right product for the wrong audience.
              </p>
            </Section>

            {/* ===== 08 The pivot ===== */}
            <Section id="pivot">
              <Eyebrow>+ Pivot</Eyebrow>
              <SectionHead
                n="08"
                title="It's not the building owners who need this. It's the renters."
              />

              {/* What was wrong / How I switched — two short blocks, no
                  card outlines (chunky cards read as clickable; this is
                  prose, not a CTA). */}
              <div className="my-[18px] grid grid-cols-1 gap-[24px] tablet:grid-cols-2 tablet:gap-[32px]">
                <div>
                  <p
                    className="mb-[10px] text-[12px] tracking-[0.16em] font-medium text-[#5D5D5D]"
                    style={{ fontFamily: MONO }}
                  >
                    WHAT WAS WRONG
                  </p>
                  <p className="text-[16px] leading-[1.65] text-[#1F1F1F]">
                    Stable owner-heavy buildings already had years of trust;
                    they didn&rsquo;t need scaffolding for it. The app
                    couldn&rsquo;t compound a network effect inside a
                    pre-existing community.
                  </p>
                </div>
                <div>
                  <p
                    className="mb-[10px] text-[12px] tracking-[0.16em] font-medium text-[#5D5D5D]"
                    style={{ fontFamily: MONO }}
                  >
                    HOW I SWITCHED
                  </p>
                  <p className="text-[16px] leading-[1.65] text-[#1F1F1F]">
                    Pivoted to <Strong>renter-heavy, 80+ unit, multi-elevator</Strong>{" "}
                    buildings — young professionals churning every 1–2 years.
                    They never get the time owners had. The app gives it to
                    them.
                  </p>
                </div>
              </div>

              <div className="my-[28px] grid grid-cols-2 gap-[18px] border-y border-[#A0A0A0] py-[26px] min-[560px]:grid-cols-4">
                {[
                  ["60+", "buildings audited"],
                  ["9", "leafletted"],
                  ["97", "signups in 3 weeks"],
                  ["10.2%", "peak (Tower 77)"],
                ].map(([n, l]) => (
                  <div key={l}>
                    <div className="mb-[8px] text-[40px] leading-none font-extrabold tracking-[-0.02em] text-[#1F1F1F]">
                      {n}
                    </div>
                    <div className="text-[12px] leading-[1.4] tracking-[0.04em] text-[#A0A0A0]">
                      {l}
                    </div>
                  </div>
                ))}
              </div>

              {/* Fig. 3 — GTM evidence */}
              <figure className="mb-[24px] rounded-[12px] bg-[#F4F4F4] p-[24px]">
                <div className="grid grid-cols-1 gap-[24px] min-[560px]:grid-cols-2">
                  <NycMapSvg />
                  <ConversionBarSvg />
                </div>
                <figcaption className="mt-[14px] text-right text-[12px] tracking-[0.08em] text-[#A0A0A0]">
                  FIG. 3 OF 3 · GTM EVIDENCE — 4 NEIGHBORHOODS, 1 WINNER
                </figcaption>
              </figure>

              <Body>
                Greenpoint converted 88 of the 97 sign-ups. Tower 77 alone hit
                10.2% — twice the next-best building. The channel learning was
                the surprise: 95 of 97 conversions came from elevators, not
                lobbies or mailrooms. People are alone, captive, and bored for
                30 seconds in an elevator. That&rsquo;s the QR scan window.
              </Body>

              <SubH>When the audience changed, the design changed.</SubH>
              <Body>
                Event categories shifted from{" "}
                <Strong>kid / family-oriented</Strong> (Kid drop-off, School
                pickup, Parents&rsquo; night out, Babysitting swap) to{" "}
                <Strong>wellness / hobby</Strong> (Wellness sessions, Hobby
                groups, Weeknight dinners). Same mechanics, rebuilt
                categories.
              </Body>

              {/* Plain before/after rows — no card outline (chunky borders
                  read as clickable, which these aren't). */}
              <div className="my-[18px] grid grid-cols-1 gap-[24px] tablet:grid-cols-2 tablet:gap-[32px]">
                <div className="border-t border-[#A0A0A0] pt-[14px]">
                  <p
                    className="mb-[10px] text-[12px] tracking-[0.08em] font-medium text-[#5D5D5D]"
                    style={{ fontFamily: MONO }}
                  >
                    BEFORE · v1 family-oriented
                  </p>
                  <ul className="flex flex-col gap-[6px] text-[16px] leading-[1.55] text-[#5D5D5D]">
                    <li>Kid drop-off</li>
                    <li>School pickup</li>
                    <li>Parents&rsquo; night out</li>
                    <li>Babysitting swap</li>
                  </ul>
                </div>
                <div className="border-t border-[#A0A0A0] pt-[14px]">
                  <p
                    className="mb-[10px] text-[12px] tracking-[0.08em] font-medium text-[#1F1F1F]"
                    style={{ fontFamily: MONO }}
                  >
                    AFTER · v2 young-professional
                  </p>
                  <ul className="flex flex-col gap-[6px] text-[16px] leading-[1.55] text-[#1F1F1F]">
                    <li>Wellness sessions</li>
                    <li>Hobby groups</li>
                    <li>Weeknight dinners</li>
                  </ul>
                </div>
              </div>

              <p
                className="mt-[22px] border-t border-[#A0A0A0] pt-[18px] text-[16px] text-[#5D5D5D]"
                style={{ fontStyle: "italic" }}
              >
                Full GTM breakdown — neighborhood selection, building audit,
                channel learnings →{" "}
                <Link
                  href="/work/gtm"
                  className="text-[#1F1F1F] underline decoration-[#A0A0A0] underline-offset-4"
                >
                  GTM page
                </Link>
              </p>
            </Section>

            {/* ===== 09 Reflection ===== */}
            <Section id="reflection">
              <Eyebrow>+ Reflection</Eyebrow>
              <SectionHead n="09" title="What's next." />

              <p
                className="my-[18px] mb-[30px] max-w-[620px] border-l-2 border-[#5D5D5D] pl-[22px] text-[22px] leading-[1.45] text-[#1F1F1F]"
                style={{ fontStyle: "italic" }}
              >
                What I&rsquo;d change: validate target{" "}
                <em className="font-medium not-italic">segment</em>, not just{" "}
                <em className="font-medium not-italic">concept</em>, before
                building.
              </p>

              <ul className="flex max-w-[580px] flex-col gap-[14px]">
                {[
                  "Verified user identity (post-MVP).",
                  "Time-invested seed earning — effort-based karma.",
                  "Greenpoint vs LIC community-affinity validation in next campaign.",
                ].map((b) => (
                  <li
                    key={b}
                    className="relative pl-[22px] text-[16px] leading-[1.6] text-[#5D5D5D] before:absolute before:top-[12px] before:left-0 before:h-px before:w-[12px] before:bg-[#A0A0A0]"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </Section>
          </main>
        </div>
      </div>

      {/* ---------- Footer ---------- */}
      <footer className="border-t border-[#A0A0A0] py-[36px]">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-[32px] text-[12px] text-[#A0A0A0]">
          <span>© 2026 Soonk Paik</span>
          <span>POMEs Case Study · v3</span>
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

// LogoBadge — small circular badge with a brand-colored initial.  Stands
// in for an actual competitor logo file (Favorhood/Nextdoor/TimeBanks
// don't ship a public SVG kit) so the cards land visually now; can be
// swapped for a real <img> per company later.
function LogoBadge({ char, bg }: { char: string; bg: string }) {
  return (
    <span
      aria-hidden
      className="inline-flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full text-[16px] font-bold text-[#F4F4F4]"
      style={{ backgroundColor: bg }}
    >
      {char}
    </span>
  );
}

type RefCard = {
  name: string;
  logo?: { char: string; bg: string };
  bullets: string[];
};

// CompetitorGrid / ReferenceGrid — replaces the older ScanGrid.  Same
// 3-column shape, but drops the redundant "AI research"/"Interview-
// surfaced" pill (the section heading already says which is which) and
// converts the prose body to a bullet list so the read is actually
// scannable.
function ReferenceGrid({ cards }: { cards: RefCard[] }) {
  return (
    <div className="my-[18px] mb-[22px] grid grid-cols-1 gap-[14px] min-[560px]:grid-cols-3">
      {cards.map((c) => (
        <div
          key={c.name}
          className="flex flex-col gap-[14px] rounded-[12px] bg-[#F4F4F4] px-[22px] py-[24px]"
        >
          <div className="flex items-center gap-[12px]">
            {c.logo && <LogoBadge char={c.logo.char} bg={c.logo.bg} />}
            <div className="min-w-0 text-[18px] font-medium leading-[1.2] text-[#1F1F1F]">
              {c.name}
            </div>
          </div>
          <ul className="flex flex-col gap-[8px]">
            {c.bullets.map((b, i) => (
              <li
                key={i}
                className="relative pl-[14px] text-[14px] leading-[1.55] text-[#5D5D5D] before:absolute before:left-0 before:text-[#A0A0A0] before:content-['—']"
              >
                {b}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// ResearchSplit — the AI/Me split diagram that opens §03.  Two columns
// side by side, separated by a vertical "⇄" rule on tablet+.  Makes the
// "I split the work" headline visible at a glance instead of buried in
// prose.
function ResearchSplit() {
  return (
    <div className="my-[24px] rounded-[12px] bg-[#F4F4F4] px-[24px] py-[28px] tablet:px-[32px] tablet:py-[36px]">
      <div className="grid gap-[28px] tablet:grid-cols-[1fr_auto_1fr] tablet:items-start tablet:gap-[28px]">
        {/* AI column */}
        <div className="flex flex-col gap-[12px]">
          <p
            className="text-[12px] tracking-[0.16em] font-medium text-[#5D5D5D]"
            style={{ fontFamily: MONO }}
          >
            AI · SCALE
          </p>
          <p className="text-[20px] leading-[1.25] font-medium text-[#1F1F1F]">
            Wide competitive scan + synthesis
          </p>
          <ul className="mt-[4px] flex flex-col gap-[8px] text-[14px] leading-[1.6] text-[#5D5D5D]">
            <li>↳ Mapped 7+ direct, adjacent, and timebanking platforms</li>
            <li>↳ Synthesized public reviews, complaints, decline patterns</li>
            <li>↳ Compiled DUMBO demographics + community-trust research</li>
          </ul>
        </div>

        {/* divider */}
        <div className="hidden h-full items-center justify-center text-[14px] text-[#A0A0A0] tablet:flex">
          <span aria-hidden className="block h-full w-px bg-[#A0A0A0]" />
        </div>

        {/* Human column */}
        <div className="flex flex-col gap-[12px]">
          <p
            className="text-[12px] tracking-[0.16em] font-medium text-[#5D5D5D]"
            style={{ fontFamily: MONO }}
          >
            ME · EXPERIENCE
          </p>
          <p className="text-[20px] leading-[1.25] font-medium text-[#1F1F1F]">
            First-person interviews
          </p>
          <ul className="mt-[4px] flex flex-col gap-[8px] text-[14px] leading-[1.6] text-[#5D5D5D]">
            <li>↳ 8 scheduled 30-min interviews, structured script</li>
            <li>↳ 12+ hallway / elevator 1-min interviews (3 focus questions)</li>
            <li>↳ Script sections: Context · Help patterns · Friction · Wishes</li>
            <li>↳ Card-sorting game to surface mental models (see below)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// ChatFlow — one row of chat-action steps (5 phone-shaped placeholders,
// each with a label).  Used to show what happens INSIDE a Borrow / Favor
// / Event chat after it opens — the point being that chat in POMEs is
// item-tied (Airbnb pattern), not a generic DM stream.
function ChatFlow({
  title,
  steps,
}: {
  title: string;
  steps: { label: string; note?: string }[];
}) {
  return (
    <div className="my-[18px] rounded-[12px] bg-[#F4F4F4] p-[20px] tablet:p-[24px]">
      <p
        className="mb-[16px] text-[12px] tracking-[0.16em] font-medium text-[#5D5D5D]"
        style={{ fontFamily: MONO }}
      >
        {title}
      </p>
      <div
        className="grid gap-[14px]"
        style={{
          gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))`,
        }}
      >
        {steps.map((s, i) => (
          <div key={i} className="flex flex-col gap-[8px]">
            <div className="relative aspect-[1206/2622] w-full overflow-clip rounded-[8px] border-2 border-[#1F1F1F] bg-[#D9D9D9]">
              <div className="flex h-full w-full items-center justify-center px-[6px] text-center text-[10px] tracking-[0.06em] text-[#5D5D5D]">
                TBD
              </div>
            </div>
            <p
              className="text-[12px] tracking-[0.06em] text-[#5D5D5D]"
              style={{ fontFamily: MONO }}
            >
              {String(i + 1).padStart(2, "0")}
            </p>
            <p className="text-[14px] leading-[1.3] font-medium text-[#1F1F1F]">
              {s.label}
            </p>
            {s.note && (
              <p className="text-[12px] leading-[1.4] text-[#5D5D5D]">{s.note}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// TierBadgeRow — three escalating tiers (Bronze / Silver / Gold), threshold
// labels beneath.  The thank-you note from a Borrow or Favor closes the
// loop and bumps the helper's tier.
function TierBadgeRow() {
  const tiers: { name: string; threshold: string; fill: string }[] = [
    { name: "Bronze", threshold: "1 help", fill: "#9D7754" },
    { name: "Silver", threshold: "5 helps", fill: "#7E7E7E" },
    { name: "Gold", threshold: "15 helps", fill: "#1F1F1F" },
  ];
  return (
    <div className="my-[18px] rounded-[12px] bg-[#F4F4F4] p-[24px]">
      <div className="grid grid-cols-3 items-end gap-[14px]">
        {tiers.map((t, i) => (
          <div key={t.name} className="flex flex-col items-center gap-[10px]">
            <span
              aria-hidden
              className="inline-flex h-[48px] w-[48px] items-center justify-center rounded-full text-[16px] font-bold text-[#F4F4F4]"
              style={{ backgroundColor: t.fill }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="text-[16px] font-medium text-[#1F1F1F]">{t.name}</p>
            <p className="text-[12px] tracking-[0.04em] text-[#5D5D5D]">
              {t.threshold}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-[16px] border-t border-[#A0A0A0] pt-[14px] text-[14px] leading-[1.5] text-[#5D5D5D]">
        After a Borrow or a Favor, the helped party can leave a thank-you note
        — that note bumps the helper&rsquo;s tier. Tiers are the only public
        signal of past contribution; everything else (Seed Tree, feed) stays
        community-scoped.
      </p>
    </div>
  );
}

// OtherReports — small list of report titles + ↗ link.  Treated as
// footnotes rather than feature cards so they don't compete with the
// main competitor grid.
function OtherReports() {
  const reports: { title: string; href: string }[] = [
    { title: "DUMBO demographics + renter churn 2024", href: "#" },
    { title: "Trust formation in residential buildings — academic synthesis", href: "#" },
    { title: "Building-scale community dynamics — case-study reviews", href: "#" },
  ];
  return (
    <ul className="my-[14px] flex flex-col border-t border-[#A0A0A0]">
      {reports.map((r) => (
        <li
          key={r.title}
          className="flex items-baseline justify-between gap-[12px] border-b border-[#A0A0A0] py-[12px]"
        >
          <span className="text-[16px] leading-[1.4] text-[#1F1F1F]">
            {r.title}
          </span>
          <a
            href={r.href}
            className="shrink-0 text-[12px] tracking-[0.08em] text-[#5D5D5D] hover:text-[#1F1F1F]"
          >
            ↗ Open
          </a>
        </li>
      ))}
    </ul>
  );
}

function ScrBlock({
  eyebrow,
  heading,
  phones,
  phoneAlts,
  paras,
  finding,
  decision,
  reverse = false,
}: {
  eyebrow: string;
  heading: string;
  phones: string[];
  phoneAlts: string[];
  paras: React.ReactNode[];
  finding: string;
  decision: string;
  reverse?: boolean;
}) {
  // Layout: phones col + text col.  On mobile, phones first regardless of
  // reverse (matches HTML preview's `.scr-block.reverse .scr-phones { order: 0 }`
  // breakdown at <960).  On desktop, reverse swaps the column order.
  const phonesEl = (
    <div className={`flex gap-[14px] ${phones.length === 1 ? "justify-start" : ""}`}>
      {phones.map((p, i) => (
        <div
          key={i}
          className={`flex-1 ${phones.length === 1 ? "max-w-[200px]" : "max-w-[150px]"}`}
        >
          <Phone image={p} alt={phoneAlts[i]} />
        </div>
      ))}
    </div>
  );

  const textEl = (
    <div className="min-w-0">
      <div className="mb-[8px] text-[12px] tracking-[0.16em] text-[#A0A0A0]">
        {eyebrow}
      </div>
      <h3 className="mb-[14px] text-[22px] leading-[1.25] font-medium tracking-[-0.01em] text-[#1F1F1F]">
        {heading}
      </h3>
      {paras.map((p, i) => (
        <p
          key={i}
          className="mb-[12px] text-[16px] leading-[1.7] text-[#5D5D5D]"
        >
          {p}
        </p>
      ))}
      <ResearchLink finding={finding} decision={decision} />
    </div>
  );

  return (
    <div
      className={`my-[48px] grid grid-cols-1 items-start gap-[24px] min-[560px]:gap-[40px] ${
        reverse
          ? "min-[560px]:grid-cols-[1fr_320px]"
          : "min-[560px]:grid-cols-[320px_1fr]"
      }`}
    >
      {reverse ? (
        <>
          {textEl}
          {phonesEl}
        </>
      ) : (
        <>
          {phonesEl}
          {textEl}
        </>
      )}
    </div>
  );
}

// ---- SVG diagrams ---------------------------------------------------------

function PomesLogoSvg({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M2.6338 0.5H44.6729C45.8514 0.5 46.8075 1.45531 46.8076 2.63379V60.4424C46.8075 61.6209 45.8514 62.5762 44.6729 62.5762H2.6338C1.45538 62.5761 0.500099 61.6208 0.500011 60.4424V2.63379L0.510754 2.41602C0.619916 1.33989 1.5289 0.500098 2.6338 0.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        fill="none"
      />
      <line x1="0.5" y1="15.27" x2="46.81" y2="15.27" stroke="currentColor" strokeLinecap="round" />
      <line x1="0.5" y1="31.04" x2="46.81" y2="31.04" stroke="currentColor" strokeLinecap="round" />
      <line x1="0.5" y1="46.81" x2="46.81" y2="46.81" stroke="currentColor" strokeLinecap="round" />
      <line x1="32.23" y1="0.5" x2="32.23" y2="62.58" stroke="currentColor" strokeLinecap="round" />
      <line x1="16.46" y1="0.5" x2="16.46" y2="62.58" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}

function InversionDiagramSvg() {
  return (
    <svg
      viewBox="0 0 600 240"
      xmlns="http://www.w3.org/2000/svg"
      className="block h-auto max-h-[280px] w-full"
    >
      <text
        x="300"
        y="42"
        textAnchor="middle"
        fontSize="20"
        fontWeight="400"
        fill="#A0A0A0"
        textDecoration="line-through"
        fontFamily="Archivo, sans-serif"
      >
        &ldquo;Help me with X&rdquo;
      </text>
      <text x="300" y="70" textAnchor="middle" fontSize="13" fill="#A0A0A0" fontFamily="Archivo, sans-serif">
        → kills the app
      </text>
      <line x1="300" y1="92" x2="300" y2="124" stroke="#1F1F1F" strokeWidth="2" />
      <polygon points="300,124 292,114 308,114" fill="#1F1F1F" />
      <rect x="40" y="142" width="520" height="84" fill="#1F1F1F" rx="4" />
      <text
        x="300"
        y="184"
        textAnchor="middle"
        fontSize="26"
        fontWeight="500"
        fill="#EEEEEE"
        fontFamily="Archivo, sans-serif"
      >
        &ldquo;I can help with X&rdquo;
      </text>
      <text x="300" y="210" textAnchor="middle" fontSize="14" fill="#A0A0A0" fontFamily="Archivo, sans-serif">
        → grows the app
      </text>
    </svg>
  );
}

function TrustLoopDiagramSvg() {
  return (
    <svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg" className="block h-auto w-full">
      <defs>
        <marker
          id="arrLoop"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto"
        >
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#1F1F1F" />
        </marker>
      </defs>
      <rect x="100" y="20" width="80" height="40" fill="#1F1F1F" rx="4" />
      <text x="140" y="44" textAnchor="middle" fontSize="14" fontWeight="500" fill="#EEEEEE" fontFamily="Archivo">
        Events
      </text>
      <rect x="185" y="120" width="80" height="42" fill="#D9D9D9" rx="4" />
      <text x="225" y="143" textAnchor="middle" fontSize="11" fontWeight="500" fill="#5D5D5D" fontFamily="Archivo">
        IRL
      </text>
      <text x="225" y="156" textAnchor="middle" fontSize="11" fontWeight="500" fill="#5D5D5D" fontFamily="Archivo">
        interaction
      </text>
      <rect x="100" y="222" width="80" height="40" fill="#D9D9D9" rx="4" />
      <text x="140" y="246" textAnchor="middle" fontSize="14" fontWeight="500" fill="#5D5D5D" fontFamily="Archivo">
        Trust
      </text>
      <rect x="15" y="120" width="80" height="42" fill="#D9D9D9" rx="4" />
      <text x="55" y="145" textAnchor="middle" fontSize="11" fontWeight="500" fill="#5D5D5D" fontFamily="Archivo">
        Engagement
      </text>
      <path d="M 180 40 Q 220 40, 220 118" fill="none" stroke="#1F1F1F" strokeWidth="1" markerEnd="url(#arrLoop)" />
      <path d="M 220 164 Q 220 240, 180 240" fill="none" stroke="#1F1F1F" strokeWidth="1" markerEnd="url(#arrLoop)" />
      <path d="M 100 240 Q 60 240, 60 164" fill="none" stroke="#1F1F1F" strokeWidth="1" markerEnd="url(#arrLoop)" />
      <path d="M 60 118 Q 60 40, 100 40" fill="none" stroke="#1F1F1F" strokeWidth="1" markerEnd="url(#arrLoop)" />
      <text
        x="140"
        y="138"
        textAnchor="middle"
        fontSize="10"
        fill="#A0A0A0"
        letterSpacing="0.06em"
        fontFamily="Archivo"
      >
        The loop
      </text>
      <text
        x="140"
        y="158"
        textAnchor="middle"
        fontSize="11"
        fill="#5D5D5D"
        fontStyle="italic"
        fontFamily="Archivo"
      >
        events build trust.
      </text>
      <text
        x="140"
        y="176"
        textAnchor="middle"
        fontSize="11"
        fill="#5D5D5D"
        fontStyle="italic"
        fontFamily="Archivo"
      >
        chat would skip it.
      </text>
    </svg>
  );
}

function NycMapSvg() {
  return (
    <svg viewBox="0 0 300 280" xmlns="http://www.w3.org/2000/svg" className="block h-auto w-full">
      <path
        d="M 35 20 Q 20 100, 40 180 T 35 270"
        fill="none"
        stroke="#A0A0A0"
        strokeWidth="0.5"
        strokeDasharray="3 3"
      />
      <text x="22" y="155" fontSize="9" fill="#A0A0A0" transform="rotate(80 22 155)" letterSpacing="0.05em" fontFamily="Archivo">
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

function ConversionBarSvg() {
  return (
    <svg viewBox="0 0 300 280" xmlns="http://www.w3.org/2000/svg" className="block h-auto w-full">
      <text x="0" y="14" fontSize="10" fill="#A0A0A0" letterSpacing="0.05em" fontFamily="Archivo">
        Conversion rate · top buildings
      </text>
      <text x="0" y="48" fontSize="11" fill="#1F1F1F" fontWeight="500" fontFamily="Archivo">
        Tower 77 (Greenpoint)
      </text>
      <rect x="0" y="54" width="235" height="18" fill="#1F1F1F" rx="2" />
      <text x="240" y="67" fontSize="12" fill="#1F1F1F" fontWeight="500" fontFamily="Archivo">
        10.2%
      </text>
      <text x="0" y="100" fontSize="11" fill="#5D5D5D" fontFamily="Archivo">
        Greenpoint Central
      </text>
      <rect x="0" y="106" width="115" height="14" fill="#A0A0A0" opacity="0.5" rx="2" />
      <text x="120" y="116" fontSize="10" fill="#5D5D5D" fontFamily="Archivo">
        5.0%
      </text>
      <text x="0" y="142" fontSize="11" fill="#5D5D5D" fontFamily="Archivo">
        1 Bell Slip
      </text>
      <rect x="0" y="148" width="111" height="14" fill="#A0A0A0" opacity="0.5" rx="2" />
      <text x="116" y="158" fontSize="10" fill="#5D5D5D" fontFamily="Archivo">
        4.8%
      </text>
      <text x="0" y="184" fontSize="11" fill="#A0A0A0" fontFamily="Archivo">
        LIC buildings (combined)
      </text>
      <rect x="0" y="190" width="23" height="14" fill="#A0A0A0" opacity="0.3" rx="2" />
      <text x="28" y="200" fontSize="10" fill="#A0A0A0" fontFamily="Archivo">
        ~1%
      </text>
      <text x="0" y="226" fontSize="11" fill="#A0A0A0" fontFamily="Archivo">
        Atelier (Williamsburg)
      </text>
      <rect x="0" y="232" width="10" height="14" fill="#A0A0A0" opacity="0.3" rx="2" />
      <text x="15" y="242" fontSize="10" fill="#A0A0A0" fontFamily="Archivo">
        ~0.4%
      </text>
      <text x="0" y="270" fontSize="9" fill="#A0A0A0" letterSpacing="0.04em" fontFamily="Archivo">
        95 of 97 conversions came from elevators.
      </text>
    </svg>
  );
}

