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
    "A neighbor app where you brag about what you can offer — not beg for help.",
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
    <div className="mb-[18px] text-[12px] tracking-[0.16em] text-[#A0A0A0]">
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
        className="mx-auto max-w-[1080px] px-[20px] pt-[40px] pb-[40px] min-[560px]:px-[32px] min-[560px]:pt-[64px] min-[560px]:pb-[48px]"
      >
        <Eyebrow>+ 01 / Intro</Eyebrow>

        {/* Project number (canonical 01-09 marker, JBM Mono) + Logo +
            giant POMEs wordmark — mirrors the landing list view's giant
            mono number anchoring each tile. */}
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
        </div>

        <p className="mb-[40px] max-w-[820px] text-[24px] leading-[1.18] font-medium tracking-[-0.02em] text-[#1F1F1F] min-[560px]:text-[28px] min-[960px]:mb-[48px] min-[960px]:text-[36px]">
          A neighbor app where you brag about what you can offer — not beg for
          help.
        </p>

        {/* 4-phone row.  Real screenshots stand in for the GIF placeholders
            specified in the HTML — Soonk's brief explicitly prefers real
            screenshots over mocks where they exist (assets_manifest §
            "Already provided / from project drive"). */}
        <div className="mb-[48px] grid grid-cols-2 gap-x-[18px] gap-y-[28px] min-[960px]:mb-[56px] min-[960px]:grid-cols-4">
          {[
            { src: "/work/pomes/pomes-home-thriving.png", label: "Home", sub: "Seed tree" },
            { src: "/work/pomes/pomes-home-feed.png", label: "Feed", sub: "Serendipity" },
            { src: "/work/pomes/pomes-favor-offers.png", label: "Favor", sub: "Offer-first" },
            { src: "/work/pomes/pomes-event-calendar.png", label: "Events", sub: "Trust spine" },
          ].map((p) => (
            <div key={p.label} className="text-center">
              <div className="mx-auto mb-[14px] max-w-[180px]">
                <Phone image={p.src} alt={`POMEs ${p.label}`} />
              </div>
              <div className="text-[16px] font-medium tracking-[0.04em] text-[#1F1F1F]">
                {p.label}
              </div>
              <div className="mt-[2px] text-[12px] text-[#A0A0A0]">{p.sub}</div>
            </div>
          ))}
        </div>

        {/* Meta dl */}
        <dl className="mb-[32px] border-t border-[#A0A0A0]">
          {[
            ["Role", "Solo · end-to-end"],
            ["Scope", "Research → design → vibe-coded engineering → GTM"],
            ["Timeline", "Mar 15 — Apr 30, 2026 (~7 weeks)"],
            ["Status", "Live on App Store · Google Play"],
            ["Stack", "iOS · Android · React Native · Firebase"],
          ].map(([l, v]) => (
            <div
              key={l}
              className="grid grid-cols-[110px_1fr] items-baseline gap-[18px] border-b border-[#A0A0A0] py-[14px]"
            >
              <dt className="text-[12px] font-medium tracking-[0.06em] text-[#A0A0A0]">
                {l}
              </dt>
              <dd className="text-[16px] leading-[1.5] text-[#1F1F1F]">{v}</dd>
            </div>
          ))}
        </dl>

        {/* Timeline ribbon — vertical bar markers (not dots).  Per brief: 5
            nodes, dates above labels, hairline rule connecting them. */}
        <div className="mb-[24px] pt-[8px]">
          <div className="relative grid grid-cols-1 gap-[12px] min-[560px]:grid-cols-5 min-[560px]:gap-0">
            {/* hairline rule — only on tablet+ where the ribbon is horizontal */}
            <span
              aria-hidden
              className="absolute top-[7px] right-[10%] left-[10%] hidden h-px bg-[#A0A0A0] min-[560px]:block"
            />
            {[
              ["Mar 15", "Concept", "First idea, brain dumps"],
              ["Mar 16–26", "Research", "8 interviews, AI synthesis"],
              ["Mar 25 – Apr 20", "Design + build", "Vibe-coded MVP"],
              ["Apr 25", "GTM", "97 signups · 10.2% peak"],
              ["Apr 30", "Live", "App Store + Google Play"],
            ].map(([d, l, x], i) => (
              <div
                key={i}
                className="relative z-[1] border-b border-[#A0A0A0] py-3 text-left min-[560px]:border-0 min-[560px]:px-2 min-[560px]:py-0 min-[560px]:text-center"
              >
                <span className="block h-[14px] w-[2px] bg-[#1F1F1F] min-[560px]:mx-auto" />
                <div className="mt-[8px] text-[12px] tracking-[0.04em] text-[#A0A0A0] min-[560px]:mt-[14px]">
                  {d}
                </div>
                <div className="mt-[4px] text-[16px] leading-[1.3] font-medium text-[#1F1F1F] min-[560px]:mt-[6px]">
                  {l}
                </div>
                <div className="mt-[4px] text-[12px] leading-[1.4] text-[#A0A0A0]">
                  {x}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 border-y border-[#A0A0A0] py-[22px] text-center text-[12px] tracking-[0.18em] text-[#A0A0A0]">
          ↓ Scroll for case study
        </div>
      </section>

      {/* ---------- Body grid: sticky nav + content ---------- */}
      <div className="bg-[#EEEEEE]">
        <div className="mx-auto flex max-w-[1080px] gap-[32px] px-[20px] pt-[40px] pb-[80px] min-[560px]:px-[32px] tablet:gap-[48px] tablet:pt-[56px] tablet:pb-[96px]">
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
              <Body italic>So I set out to prove it.</Body>
            </Section>

            {/* ===== 03 Market scan ===== */}
            <Section id="scan">
              <Eyebrow>+ Method 1 — what already exists</Eyebrow>
              <SectionHead
                n="03"
                title="I split the work — AI took scale, interviews surfaced experience."
              />
              <Lede>
                Information hunting at scale is what AI is built for. So I
                delegated the broad competitive scan — seven platforms across
                three tiers: direct competitors (Favorhood, Favrs, Gesture),
                adjacent community networks (Nextdoor, MyNabes), and timebanking
                systems (TimeBanks, hOurworld). Three I deep-dived for what I
                could learn. The rest of what I needed surfaced naturally during
                interviews.
              </Lede>

              <SubH>What AI researched</SubH>
              <ScanGrid
                cells={[
                  {
                    name: "Favorhood",
                    badge: "ai",
                    body: "Closest competitor. Berkeley, founded 2020 (COVID era). 0.5-mile radius neighbor matching, simple post-help-get-matched UX. No currency system; basic address verification only. The opening: building-level trust beats zip-code radius, and a currency mechanic adds reciprocity that pure matching can't.",
                  },
                  {
                    name: "Nextdoor",
                    badge: "ai",
                    body: "The vulnerable giant. 1.7★ on Trustpilot across 3,045 reviews. Top complaints: arbitrary account suspensions, political moderation bias, can't block users who make you feel unsafe, excessive ads after the B2B pivot. The decline of the giant = clear opening for small, trusted, ad-free communities.",
                  },
                  {
                    name: "TimeBanks",
                    badge: "ai",
                    body: "3M+ hours exchanged globally — concept works. But operational pitfalls: funding dependency collapses when grants end, manager burnout from no financial reward, member activity decays into core/periphery split, complex categories overwhelm users, desktop-first. The mechanics inspired Seeds; the failures shaped what NOT to repeat.",
                  },
                ]}
              />

              <SubH>What interviews surfaced</SubH>
              <ScanGrid
                cells={[
                  {
                    name: "Buy Nothing",
                    badge: "iv",
                    body: "Multiple interviewees used it. Solves the gift loop — extra coffee, baby clothes, an old chair. But there's no relationship layer; you don't know the person you're picking up from. It scales gifts, not trust.",
                  },
                  {
                    name: "BuildingLink",
                    badge: "iv",
                    body: "Exists in my own building. Half my interviewees had logins. Almost nobody used it for anything but maintenance tickets. It's a portal you open to file a complaint, not to meet a neighbor.",
                  },
                  {
                    name: "WhatsApp building groups",
                    badge: "iv",
                    body: "Every building has one. Hundreds of give-posts. Two structural problems: messages disappear (no inventory, no memory), and the loudest personalities dominate. Quiet neighbors with offers stay invisible.",
                  },
                ]}
              />

              <p
                className="mt-[18px] max-w-[620px] text-[17px] leading-[1.45] text-[#1F1F1F]"
                style={{ fontStyle: "italic" }}
              >
                Each tool solved a slice. None was built for a single 60-unit
                building where the same 60 people live next to each other for
                years.
              </p>
            </Section>

            {/* ===== 04 Research → Inversion ===== */}
            <Section id="research">
              <Eyebrow>+ Method 2 — what neighbors actually wanted</Eyebrow>
              <SectionHead
                n="04"
                title="I watched, asked, and built a game to find where the friction was."
              />
              <Lede>
                Two weeks of WhatsApp lurking before I reached out. Then 8
                in-depth interviews. Then a custom card-sorting game I built
                with Claude Code in an afternoon and ran live with neighbors.
                Three angles on the same question: where do neighbors freeze up?
              </Lede>

              <SubH>What I saw on WhatsApp</SubH>
              <Body>
                The asymmetry was loud. People posted give-aways constantly —
                extra coffee, old IKEA chairs, baked cookies — and got many
                responses. People posted asks for help{" "}
                <em className="italic">almost never</em>. When asks did appear,
                they were for kids (&ldquo;can someone watch my daughter for an
                hour?&rdquo;), never for adult needs.
              </Body>
              <Body>
                I also heard stories — &ldquo;Jenna&rsquo;s husband helped me
                carry up groceries last week&rdquo; — but those stories were
                about <em className="italic">unsolicited</em> help. Nobody had
                asked. The favor happened, then a story circulated.{" "}
                <Strong>Helping was happening; asking wasn&rsquo;t.</Strong>
              </Body>
              <Body>
                People were eager to look like good people. That part was
                obvious from the scroll.
              </Body>

              <SubH>What I asked in interviews</SubH>
              <Body>
                8 interviews — owners, renters, parents, professionals — across
                the building. Two questions did most of the heavy lifting:
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

              <Body>The themes came back fast.</Body>

              <div className="my-[18px] flex max-w-[620px] flex-col gap-[6px]">
                {[
                  ["I could do it on the app. Face-to-face damages my image.", "— Charlton, 6F"],
                  ["I won't ask while I can still do it myself.", "— Peter, 6A"],
                  ["I can do it directly, so I won't have someone do it for me.", "— Anya, 3E"],
                  [
                    "I love helping people in that situation. I don't have family in the area, and I've been there myself.",
                    "— Kate, 3B",
                  ],
                ].map(([q, c]) => (
                  <blockquote
                    key={c}
                    className="border-l-2 border-[#5D5D5D] py-[8px] pl-[20px]"
                  >
                    <p
                      className="text-[16px] leading-[1.5] text-[#1F1F1F]"
                      style={{ fontStyle: "italic" }}
                    >
                      &ldquo;{q}&rdquo;
                    </p>
                    <cite className="mt-[4px] block text-[12px] font-medium not-italic text-[#A0A0A0]">
                      {c}
                    </cite>
                  </blockquote>
                ))}
              </div>

              <Body>
                Three of eight said the same thing in different words:{" "}
                <Strong>they wouldn&rsquo;t ask while they could still do it.</Strong>{" "}
                The cost wasn&rsquo;t the favor itself — it was the social cost
                of asking.
              </Body>

              <SubH>
                <span
                  className="mr-2 text-[#1F1F1F]"
                  style={{ fontStyle: "italic" }}
                >
                  ★
                </span>
                I built a card-sorting game to test where the friction lines
                were.
              </SubH>
              <Body>
                I needed to test where the friction was — not in the abstract,
                in specific tasks. Building this in Figjam would have taken
                three days, plus session scheduling. So I built a real
                card-sorting web app in an afternoon. Claude Code wrote 90% of
                the React; I designed the cards from interview prep. Neighbors
                sorted 12 hypothetical asks into &ldquo;would ask&rdquo; /
                &ldquo;wouldn&rsquo;t ask&rdquo; while I watched.
              </Body>

              {/* Card-sorting feature card.  Real screenshot would replace
                  the SVG placeholder — assets_manifest still flags this as
                  a TBD capture, so we keep the stylised SVG mock. */}
              <div className="my-[18px] grid grid-cols-1 items-center gap-[24px] rounded-[12px] border-[1.5px] border-[#1F1F1F] bg-[#F4F4F4] p-[20px] min-[560px]:grid-cols-[280px_1fr]">
                <div className="flex aspect-[16/10] items-center justify-center rounded-[6px] bg-[#D9D9D9] p-[14px]">
                  <CardSortingMockSvg />
                </div>
                <div>
                  <span className="mb-[8px] inline-block rounded-[3px] bg-[#D9D9D9] px-[7px] py-[2px] text-[12px] font-medium tracking-[0.08em] text-[#1F1F1F]">
                    ★ VIBE-CODED IN AN AFTERNOON
                  </span>
                  <div className="mb-[6px] text-[16px] font-medium text-[#1F1F1F]">
                    Card-sorting web app
                  </div>
                  <div className="text-[16px] leading-[1.65] text-[#5D5D5D]">
                    Real card-sorting tool, not a Figjam board. Each card was a
                    hypothetical ask; neighbors dragged them into &ldquo;would
                    ask&rdquo; or &ldquo;wouldn&rsquo;t&rdquo; while I watched.
                  </div>
                  <div
                    className="mt-[6px] text-[16px] text-[#1F1F1F]"
                    style={{ fontStyle: "italic" }}
                  >
                    AI as research multiplier.
                  </div>
                </div>
              </div>

              <Body>The findings sharpened the picture:</Body>
              <ul className="my-[12px] mb-[22px] flex max-w-[620px] flex-col">
                {[
                  ["Universal “would ask”:", " pet sitting, watering plants, dog walking"],
                  ["Universal “wouldn’t ask”:", " picking up groceries (3 of 4 wouldn’t)"],
                  ["Polarizing tasks:", " kid watching, helping with a move, furniture assembly"],
                  ["Kate’s principle:", " one-off = OK to ask a neighbor; regular = hire someone"],
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
                Putting all three together — observation, interviews, sorting —
                the answer was the same. Posting an ask costs face. Posting an
                offer earns it. Both kinds of help could happen; only one was
                being initiated.
              </Body>

              {/* Fig. 1 — The inversion */}
              <figure className="my-[28px] rounded-[12px] bg-[#F4F4F4] px-[28px] pt-[40px] pb-[22px]">
                <InversionDiagramSvg />
                <figcaption className="mt-[14px] text-right text-[12px] tracking-[0.08em] text-[#A0A0A0]">
                  FIG. 1 OF 3 · THE INVERSION
                </figcaption>
              </figure>

              <Body>
                So I flipped the default. The app doesn&rsquo;t start with
                &ldquo;request help.&rdquo; It starts with &ldquo;I can help
                with X.&rdquo; Posting an offer feels generous. Receiving a
                request feels invited.
              </Body>
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

              {/* Strip — 5 mini phones overview */}
              <div className="mt-[28px] grid grid-cols-2 gap-[18px] border-y border-[#A0A0A0] py-[26px] min-[560px]:grid-cols-5 min-[560px]:gap-[16px]">
                {[
                  ["Home", "Seed tree", "/work/pomes/pomes-home-thriving.png"],
                  ["Feed", "Serendipity", "/work/pomes/pomes-home-feed.png"],
                  ["Borrow", "Persistent", "/work/pomes/pomes-borrow.png"],
                  ["Favor", "Offer-first", "/work/pomes/pomes-favor-offers.png"],
                  ["Events", "Trust spine", "/work/pomes/pomes-event-calendar.png"],
                ].map(([n, t, src]) => (
                  <div key={n} className="text-center">
                    <div className="mx-auto mb-[12px] max-w-[92px]">
                      <Phone image={src} alt={n} />
                    </div>
                    <div className="text-[16px] font-medium text-[#1F1F1F]">{n}</div>
                    <div className="text-[12px] leading-[1.4] text-[#A0A0A0]">{t}</div>
                  </div>
                ))}
              </div>

              {/* Block 1 — Home (2 phones) */}
              <ScrBlock
                eyebrow="HOME / SEED TREE"
                heading="A living visualization, no score in sight."
                phones={[
                  "/work/pomes/pomes-home-thriving.png",
                  "/work/pomes/pomes-intro-02-top.png",
                ]}
                phoneAlts={["POMEs home seed tree", "POMEs onboarding — explainer"]}
                paras={[
                  <>
                    Multiple interviewees pushed back on points. Charlton:
                    &ldquo;if my points run low I&rsquo;d feel embarrassed.&rdquo;
                    Peter: &ldquo;earning points to help isn&rsquo;t really
                    helping.&rdquo; So I removed scoring entirely. The home
                    screen is a tree that grows from monthly building activity
                    — ambient signal over explicit metric. People log in to see
                    how the community is doing, not how they&rsquo;re ranked.
                  </>,
                  <>
                    A second screen — shown the first time a neighbor opens the
                    app — explains what the tree responds to without ever
                    showing a number.
                  </>,
                ]}
                finding="Points feel transactional and threatening; they shame the people who need most."
                decision="Replace scores with an ambient building life signal. Explain via guide, not numbers."
              />

              {/* Block 2 — Feed (1 phone, reverse) */}
              <ScrBlock
                reverse
                eyebrow="FEED / SERENDIPITY"
                heading="What WhatsApp groups should have been."
                phones={["/work/pomes/pomes-home-feed.png"]}
                phoneAlts={["POMEs feed"]}
                paras={[
                  <>
                    Mixed activity — borrows, favors, events — with offers
                    leading. No chitchat. No &ldquo;did anyone hear that loud
                    noise last night?&rdquo; The decision: serendipity drives
                    engagement. Show me a neighbor&rsquo;s free coffee before I
                    knew I wanted one, and I&rsquo;ll come back tomorrow to see
                    what else surfaced.
                  </>,
                ]}
                finding="WhatsApp updates were the main reason to feel connected — but messages buried each other and the loudest dominated."
                decision="Strip the noise; surface only the offers, equal weight to every neighbor."
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

              {/* Block 5 — Events (1 phone) */}
              <ScrBlock
                eyebrow="EVENTS / THE TRUST SPINE"
                heading="The screen that pulls people out of the app."
                phones={["/work/pomes/pomes-event-calendar.png"]}
                phoneAlts={["POMEs events"]}
                paras={[
                  <>
                    Every interviewee — without exception — said the same
                    thing: trust comes from face time, not from messaging. So
                    Events is the only screen designed to pull people out of
                    the app and into the building. It&rsquo;s the spine.
                  </>,
                  <>
                    Originally family-oriented (kid pickup, parents&rsquo;
                    night out); later rebuilt for young professionals when the
                    audience shifted. You&rsquo;ll see why in Section 08.
                  </>,
                ]}
                finding="Trust comes from face time. Digital interactions don't substitute. (8 of 8 said this.)"
                decision="Events as the only screen that pulls people offline. The spine of the system."
              />

              {/* Signature decision — callout + Trust loop diagram */}
              <div className="my-[26px] mt-[56px] text-center text-[12px] tracking-[0.18em] text-[#A0A0A0]">
                — THE SIGNATURE DECISION —
              </div>
              <div className="mb-[24px] grid grid-cols-1 items-stretch gap-[20px] min-[960px]:grid-cols-[1fr_320px]">
                <div className="flex flex-col justify-center rounded-[12px] bg-[#F4F4F4] px-[28px] py-[32px]">
                  <h3 className="mb-[16px] text-[24px] leading-[1.2] font-medium tracking-[-0.01em] text-[#1F1F1F]">
                    What&rsquo;s not in the app: messaging.
                  </h3>
                  <p className="mb-[14px] text-[16px] leading-[1.65] text-[#5D5D5D]">
                    Group chat would let users rebuild their inner circle inside
                    the app. The five friends I already trust would form a
                    private thread, do their borrows and favors there, and the
                    rest of the building would never see it. The system would
                    die from inside.
                  </p>
                  <p className="mb-[14px] text-[16px] leading-[1.65] text-[#5D5D5D]">
                    Instead, Events is the spine. Real face time builds trust.
                    Trust drives engagement. Engagement drives more events. Chat
                    would short-circuit that loop entirely.
                  </p>
                  <p
                    className="mt-1 border-t border-[#A0A0A0] pt-[14px] text-[16px] text-[#1F1F1F]"
                    style={{ fontStyle: "italic" }}
                  >
                    Restraint as a design decision.
                  </p>
                </div>
                <figure className="flex flex-col rounded-[12px] bg-[#F4F4F4] p-[18px]">
                  <TrustLoopDiagramSvg />
                  <div className="mt-2 text-right text-[12px] tracking-[0.08em] text-[#A0A0A0]">
                    FIG. 2 OF 3 · THE TRUST LOOP
                  </div>
                </figure>
              </div>
            </Section>

            {/* ===== 06 Built & shipped ===== */}
            <Section id="build">
              <Eyebrow>+ From design to working app</Eyebrow>
              <SectionHead
                n="06"
                title="I couldn't read the vibe-coded backend well enough to trust it."
              />
              <Lede>
                Frontend I knew — I&rsquo;d built React components before, the
                patterns were familiar. Backend was unfamiliar territory, so I
                let Claude vibe-code most of it. The problem: vibe coding
                writes a lot of code; reading it well enough to know
                what&rsquo;s broken is its own skill.
              </Lede>
              <Body>
                So I built a different kind of validation. I user-story-mapped
                every interaction, turned each story into a row in a Notion
                table, and used that table as a test plan. Then I broke the
                backend on purpose — four phones, four accounts, racing to
                write to the same Firestore document — and fixed whatever
                desynced or crashed. Test and fix, in the same pass.
              </Body>

              <div className="my-[24px] grid grid-cols-1 items-start gap-[24px] min-[560px]:grid-cols-[1fr_240px]">
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[12px] bg-[#F4F4F4]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/work/pomes/4phone-building.jpg"
                      alt="Backend stress test — four phones racing to write to the same Firestore document"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                  <div
                    className="mt-[10px] text-center text-[12px] text-[#A0A0A0]"
                    style={{ fontStyle: "italic" }}
                  >
                    Backend stress test · 4 phones, 4 accounts, same building.
                  </div>
                </div>
                <div className="flex flex-col gap-[12px]">
                  <div className="rounded-[10px] bg-[#F4F4F4] px-[18px] py-[16px]">
                    <div className="mb-[8px] text-[12px] font-medium tracking-[0.06em] text-[#A0A0A0]">
                      Stack
                    </div>
                    <div className="text-[16px] leading-[1.6] text-[#5D5D5D]">
                      React Native · Firebase · Firestore · Twilio · Apple
                      Sign-In · Expo
                    </div>
                  </div>
                  <div className="flex items-center gap-[10px] rounded-[10px] border border-[#A0A0A0] bg-[#F4F4F4] px-[16px] py-[14px] text-[16px] font-medium text-[#1F1F1F]">
                    <span className="h-[8px] w-[8px] rounded-full bg-[#4A8E5C]" />
                    Live · App Store + Google Play
                  </div>
                  <div className="rounded-[10px] bg-[#F4F4F4] px-[18px] py-[16px]">
                    <div className="mb-[8px] text-[12px] font-medium tracking-[0.06em] text-[#A0A0A0]">
                      Bridge
                    </div>
                    <div className="text-[16px] leading-[1.6] text-[#5D5D5D]">
                      User-story map → Notion backend table → Firestore calls.
                    </div>
                  </div>
                </div>
              </div>
            </Section>

            {/* ===== 07 Engaging ===== */}
            <Section id="engage">
              <Eyebrow>+ Engaging the building</Eyebrow>
              <SectionHead
                n="07"
                title="I started weekly updates before TestFlight existed."
              />
              <Lede>
                I didn&rsquo;t want to disappear into a build and drop a
                finished app on my neighbors&rsquo; heads. So from week 2 —
                long before there was anything to install — I sent weekly
                WhatsApp updates: sketches, decisions, what I was wrestling
                with. Later I recorded a personal demo video. The point was to
                make neighbors feel like they were{" "}
                <em className="italic">part of</em> the build, not the audience
                for it.
              </Lede>

              <div className="my-[24px] grid grid-cols-1 gap-[14px] min-[560px]:grid-cols-2">
                <div>
                  <div className="flex aspect-[4/3] items-center justify-center rounded-[12px] bg-[#F4F4F4] p-[28px]">
                    <WeeklyUpdatePlaceholderSvg />
                  </div>
                  <div
                    className="mt-[10px] text-center text-[12px] text-[#A0A0A0]"
                    style={{ fontStyle: "italic" }}
                  >
                    Weekly community update.
                  </div>
                </div>
                <div>
                  <div className="flex aspect-[4/3] items-center justify-center rounded-[12px] bg-[#F4F4F4] p-[28px]">
                    <DemoVideoPlaceholderSvg />
                  </div>
                  <div
                    className="mt-[10px] text-center text-[12px] text-[#A0A0A0]"
                    style={{ fontStyle: "italic" }}
                  >
                    Personal demo video.
                  </div>
                </div>
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
                className="my-[24px] max-w-[580px] text-[19px] text-[#1F1F1F]"
                style={{ fontStyle: "italic" }}
              >
                I&rsquo;d built the right product for the wrong audience.
              </p>
            </Section>

            {/* ===== 08 The pivot ===== */}
            <Section id="pivot">
              <Eyebrow>+ Right product, right audience</Eyebrow>
              <SectionHead
                n="08"
                title="It's not the building owners who need this. It's the renters."
              />
              <Lede>
                Stable owner-heavy buildings don&rsquo;t need scaffolding for
                trust — they&rsquo;ve had years to build it. The buildings
                that need it are the ones the app was built for in the first
                place: renter-heavy, 80+ units, young professionals churning
                every 1–2 years. They never get the time owners had. The app
                gives it to them.
              </Lede>
              <Body>
                So I switched targets — and ran fresh research to find them.
                Audited 60+ buildings across 4 New York neighborhoods (LIC,
                Williamsburg, Greenpoint, Downtown Brooklyn). Filtered by four
                criteria: 80+ units, doorman or hybrid concierge, renter-heavy,
                multi-elevator. Leafletted 9 in three weeks.
              </Body>

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
                Events was originally family-oriented. Young professionals
                don&rsquo;t have kids and won&rsquo;t be there long enough to
                need a regular sitter. So Events shifted: same mechanics,
                rebuilt categories.
              </Body>

              <div className="my-[18px] grid grid-cols-1 gap-[14px] min-[560px]:grid-cols-2">
                <div className="rounded-[12px] bg-[#F4F4F4] px-[20px] py-[22px]">
                  <div className="mb-[14px] text-[12px] font-medium tracking-[0.06em] text-[#A0A0A0]">
                    v1 — Family-oriented
                  </div>
                  <div className="text-[16px] leading-[2] text-[#5D5D5D]">
                    Kid drop-off
                    <br />
                    School pickup
                    <br />
                    Parents&rsquo; night out
                    <br />
                    Babysitting swap
                  </div>
                </div>
                <div className="rounded-[12px] border-[1.5px] border-[#1F1F1F] bg-[#F4F4F4] px-[20px] py-[22px]">
                  <div className="mb-[14px] text-[12px] font-medium tracking-[0.06em] text-[#1F1F1F]">
                    v2 — Young professional
                  </div>
                  <div className="text-[16px] leading-[2] text-[#5D5D5D]">
                    Wellness sessions
                    <br />
                    Hobby groups
                    <br />
                    Building runs
                    <br />
                    Weeknight dinners
                  </div>
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
        <div className="mx-auto flex max-w-[1080px] items-center justify-between px-[20px] text-[12px] text-[#A0A0A0] min-[560px]:px-[32px]">
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

type ScanCell = { name: string; badge: "ai" | "iv"; body: string };
function ScanGrid({ cells }: { cells: ScanCell[] }) {
  return (
    <div className="my-[18px] mb-[22px] grid grid-cols-1 gap-[14px] min-[560px]:grid-cols-3">
      {cells.map((c) => (
        <div key={c.name} className="rounded-[12px] bg-[#F4F4F4] px-[22px] py-[24px]">
          <div className="mb-[14px] flex items-start gap-[14px]">
            <div className="flex h-[40px] w-[60px] shrink-0 items-center justify-center rounded-[6px] bg-[#D9D9D9] text-[12px] font-medium text-[#A0A0A0]">
              {c.name.split(" ")[0].slice(0, 9)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-[4px] text-[16px] font-medium text-[#1F1F1F]">
                {c.name}
              </div>
              <span
                className={`inline-block rounded-[3px] px-[7px] py-[2px] text-[12px] font-medium tracking-[0.06em] ${
                  c.badge === "ai"
                    ? "bg-[#D9D9D9] text-[#1F1F1F]"
                    : "bg-[#D9D9D9] text-[#5D5D5D]"
                }`}
              >
                {c.badge === "ai" ? "AI research" : "Interview-surfaced"}
              </span>
            </div>
          </div>
          <div className="text-[16px] leading-[1.7] text-[#5D5D5D]">{c.body}</div>
        </div>
      ))}
    </div>
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

function CardSortingMockSvg() {
  // Stylized representation of the card-sorting tool — kept as illustrative
  // SVG until Soonk captures the real screenshot (assets_manifest TBD).
  return (
    <svg viewBox="0 0 280 160" xmlns="http://www.w3.org/2000/svg" className="h-auto max-h-full w-full">
      <rect x="2" y="2" width="276" height="156" fill="#F4F4F4" rx="4" />
      <rect x="2" y="2" width="276" height="22" fill="#D9D9D9" rx="4" />
      <circle cx="14" cy="13" r="2.5" fill="#A0A0A0" opacity="0.5" />
      <circle cx="22" cy="13" r="2.5" fill="#A0A0A0" opacity="0.5" />
      <circle cx="30" cy="13" r="2.5" fill="#A0A0A0" opacity="0.5" />
      <text x="140" y="46" textAnchor="middle" fontSize="10" fill="#A0A0A0" letterSpacing="0.06em" fontFamily="Archivo">
        SORT 12 HYPOTHETICAL ASKS
      </text>
      <text x="60" y="68" textAnchor="middle" fontSize="9" fill="#1F1F1F" fontFamily="Archivo" fontWeight="600">
        WOULD ASK
      </text>
      {[74, 92, 110, 128].map((y) => (
        <rect key={y} x="20" y={y} width="80" height="14" fill="#1F1F1F" rx="2" />
      ))}
      <text x="220" y="68" textAnchor="middle" fontSize="9" fill="#A0A0A0" fontFamily="Archivo" fontWeight="600">
        WOULDN&rsquo;T
      </text>
      {[74, 92, 110, 128].map((y) => (
        <rect key={y} x="180" y={y} width="80" height="14" fill="#A0A0A0" opacity="0.4" rx="2" />
      ))}
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

function WeeklyUpdatePlaceholderSvg() {
  return (
    <svg viewBox="0 0 100 75" xmlns="http://www.w3.org/2000/svg" className="h-auto w-full">
      <rect x="10" y="6" width="80" height="63" fill="#D9D9D9" rx="3" />
      <rect x="14" y="14" width="50" height="6" fill="#A0A0A0" opacity="0.4" rx="1" />
      <rect x="14" y="24" width="60" height="4" fill="#A0A0A0" opacity="0.3" rx="1" />
      <rect x="14" y="32" width="55" height="4" fill="#A0A0A0" opacity="0.3" rx="1" />
      <rect x="14" y="40" width="40" height="4" fill="#A0A0A0" opacity="0.3" rx="1" />
      <rect x="14" y="50" width="50" height="6" fill="#A0A0A0" opacity="0.4" rx="1" />
      <rect x="14" y="60" width="35" height="4" fill="#A0A0A0" opacity="0.3" rx="1" />
    </svg>
  );
}

function DemoVideoPlaceholderSvg() {
  return (
    <svg viewBox="0 0 100 75" xmlns="http://www.w3.org/2000/svg" className="h-auto w-full">
      <rect x="10" y="10" width="80" height="55" fill="#1F1F1F" rx="3" />
      <polygon points="44,28 44,48 60,38" fill="#D9D9D9" />
    </svg>
  );
}

