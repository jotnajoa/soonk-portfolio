// Volthop case study (project 02 in the canonical list).
//
// Content adapted from `/Volumes/External/Portfolio_Website_26/_brief_volthop_for_figma.md`
// (v3 — 7 sections).  The brief was originally written for a Figma build
// with a cream-monochrome editorial system, but per Soonk the case study
// must read as a continuation of the existing portfolio, so we reuse the
// portfolio's visual language verbatim:
//   - bg #EEEEEE, ink #1F1F1F, secondary #5D5D5D, muted #A0A0A0
//   - Archivo for body / display, JetBrains Mono for accents
//   - chunky 2px borders, sharp corners, no shadow / gradient / glow
//
// Layout (per the brief):
//   §01 Hero        — full-bleed top section, no left nav
//   §02–07          — two-column inside max-w-[1200px]:
//                       [120px sticky left nav] | [content]
//                     The left nav (CaseStudyLeftNav) is reusable across
//                     all case studies — pass it the section list and a
//                     read-time string.

import CaseStudyLeftNav, {
  type CaseStudySection,
} from "@/components/cases/CaseStudyLeftNav";

const MONO: React.CSSProperties = {
  fontFamily:
    "var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
};

// ============================================================================
// Reusable atoms
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

function ProvesTag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block bg-[#1F1F1F]/10 px-[7px] py-[3px] text-[12px] tracking-[0.04em] text-[#1F1F1F]"

    >
      PROVES · {children}
    </span>
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
    <figure className="max-w-[520px] border-l-2 border-[#1F1F1F] pl-[18px]">
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

function VersionChip({
  children,
  solid = false,
}: {
  children: React.ReactNode;
  solid?: boolean;
}) {
  return (
    <span
      className={`inline-block border border-[#1F1F1F] px-[10px] py-[4px] text-[12px] font-medium ${
        solid ? "bg-[#1F1F1F] text-[#F4F4F4]" : "text-[#1F1F1F]"
      }`}

    >
      {children}
    </span>
  );
}

function LinkOut({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[12px] text-[#A0A0A0]">
      ↗ link out: {children}
    </p>
  );
}

// Shared section shell — eyebrow + section-number + headline + lede.
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
// §01 Hero — wordmark + tagline + meta + 5-node ribbon
// ============================================================================

function Hero() {
  return (
    <section className="border-b-2 border-[#1F1F1F] pt-[48px] pb-[64px] tablet:pt-[64px] tablet:pb-[96px]">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-[36px] px-[32px]">
        <Eyebrow>+ 01 / Intro</Eyebrow>

        {/* Display row — project number + logo + wordmark.
            "02" is the canonical project marker (JBM Mono — the only place
            JBM appears on the page). */}
        <div className="flex flex-wrap items-end gap-[16px]">
          <span
            className="text-[64px] font-extrabold leading-[0.85] tracking-[-0.04em] text-[#1F1F1F] tablet:text-[120px]"
            style={MONO}
          >
            02
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/work/volthop/volthop-logo.png"
            alt=""
            aria-hidden
            className="h-[64px] w-auto tablet:h-[92px]"
          />
          <h1 className="text-[64px] leading-[0.85] font-black tracking-[-0.05em] text-[#1F1F1F] tablet:text-[120px]">
            Volthop
          </h1>
        </div>

        {/* Hero grid — phone + tagline/meta */}
        <div className="grid gap-[36px] tablet:grid-cols-[200px_1fr] tablet:items-start">
          {/* Phone (NYC discovery map) */}
          <div className="relative aspect-[1179/2556] w-[180px] overflow-clip border-2 border-[#1F1F1F] tablet:w-[200px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/work/volthop/volthop-map-nyc.png"
              alt="Volthop NYC discovery map"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-[24px]">
            <p className="max-w-[520px] text-[20px] leading-[1.4] font-medium text-[#1F1F1F] tablet:text-[21px]">
              Bring the bike. Borrow the battery. A peer-to-peer marketplace for
              folding e-bike travelers — built from the threads that asked for it.
            </p>

            {/* Meta block */}
            <dl className="border-t border-[#1F1F1F]/30">
              {[
                ["Role", "Solo founder · design + build"],
                ["Stack", "Flutter · Firebase · Google Maps"],
                ["Started", "Jan 2026"],
                ["Status", "Live (Closed Testing → Production Apr 25)"],
                ["Markets", "EU + US, single Google Play / App Store listing"],
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
        </div>

        {/* Timeline ribbon — 5 nodes */}
        <div className="border-t border-b border-[#1F1F1F]/30 py-[18px]">
          <div className="grid grid-cols-2 gap-x-[12px] gap-y-[24px] tablet:grid-cols-5">
            {[
              ["Jan 26", "Concept", "Reddit posts, no app"],
              ["Feb 26", "Build", "Flutter MVP"],
              ["Mar 23", "Closed Testing", "24 testers, EU + US"],
              ["Apr 25", "Production", "Live on Play Store"],
              ["May 26", "Iterating", "Brompton meetups"],
            ].map(([date, label, detail]) => (
              <div key={label} className="flex flex-col gap-[6px]">
                <span className="block h-[18px] w-[2px] bg-[#1F1F1F]" aria-hidden />
                <span className="text-[12px] font-medium text-[#1F1F1F]">
                  {date}
                </span>
                <span className="text-[12px] font-normal text-[#5D5D5D]">
                  {label}
                </span>
                <span
                  className="text-[12px] tracking-[0.05em] text-[#A0A0A0]"

                >
                  {detail}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// §02 Insight — "I posted the problem. They wrote the product."
// ============================================================================

function RedditMock({
  subreddit,
  date,
  title,
  meta,
  body,
}: {
  subreddit: string;
  date: string;
  title: string;
  meta: string;
  body: string;
}) {
  return (
    <article className="flex flex-col gap-[8px] border-2 border-[#1F1F1F] bg-[#F8F8F8] p-[16px]">
      <p className="text-[12px] text-[#5D5D5D]">
        {subreddit} · {date}
      </p>
      <h3 className="text-[16px] leading-[1.35] font-medium text-[#1F1F1F]">
        {title}
      </h3>
      <p
        className="text-[12px] tracking-[0.04em] text-[#A0A0A0]"

      >
        {meta}
      </p>
      <p className="border-l-2 border-[#1F1F1F]/30 pl-[10px] text-[12px] leading-[1.55] font-normal text-[#5D5D5D]">
        {body}
      </p>
    </article>
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
      <div className="grid grid-cols-2 gap-[20px] tablet:grid-cols-5">
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

function SectionInsight() {
  return (
    <section
      id="insight"
      className="border-t border-[#1F1F1F]/30 py-[48px] first:border-t-0 first:pt-0 tablet:py-[64px]"
    >
      <div className="flex flex-col gap-[36px]">
        <SectionHeader
          number="02"
          eyebrow="Insight"
          headline={
            <>
              I posted the problem.
              <br aria-hidden />
              They wrote the product.
            </>
          }
          lede="Before any code, I posted the friction in r/ebikes and r/Brompton — folding-bike travelers can't take their battery on planes, and rental shops don't carry compatible packs. The threads filled in faster than I could prompt them. The receipts below are real."
        />

        {/* 2-up Reddit thread mock */}
        <div className="grid gap-[16px] tablet:grid-cols-2">
          <RedditMock
            subreddit="r/ebikes"
            date="Jan 14, 2026"
            title="Fly with the bike, leave the battery — anyone solved this?"
            meta="142 upvotes · 38 comments · 2.1k views"
            body="Bromptons are TSA-friendly bikes but the battery is a brick at any airport. I keep landing in cities where I'd ride if the battery situation wasn't a logistics nightmare."
          />
          <RedditMock
            subreddit="r/Brompton"
            date="Jan 16, 2026"
            title="Air BnBattery? Why doesn't this exist yet"
            meta="208 upvotes · 64 comments · 3.4k views"
            body="Idea: rent a battery from a local rider when you land. Same model, charged, hand it off. Half the comments named it before OP did. Manufacturer chimed in to confirm the gap."
          />
        </div>

        {/* RECEIPT stats callout */}
        <StatsCallout
          header="RECEIPT — what the threads proved"
          stats={[
            { number: "350+", label: "upvotes across 2 threads" },
            { number: "102", label: "comments naming the problem" },
            { number: "5.5k", label: "views in 72 hours" },
            { number: "11", label: "DMs offering to host" },
            { number: "1", label: "manufacturer confirmation" },
          ]}
        />

        {/* Pull quote */}
        <PullQuote attribution="Top comment, r/Brompton — Jan 16, 2026">
          “Air BnBattery? Why doesn't this exist yet — I'd pay double if I knew
          the battery was waiting.”
        </PullQuote>

        <Body>
          The thesis the threads handed me was sharper than anything I would have
          written cold: the user is one person who sometimes borrows and
          sometimes hosts, and the product needs to make that switch invisible.
          Every later decision — onboarding, the listing, the booking flow,
          even the deliberate omissions — traces back to that one frame.
        </Body>
      </div>
    </section>
  );
}

// ============================================================================
// §03 The gap — 3-card grid w/ PROVES tags
// ============================================================================

function GapCard({
  title,
  body,
  proves,
  featured = false,
}: {
  title: string;
  body: string;
  proves: string;
  featured?: boolean;
}) {
  return (
    <article
      className={`flex flex-col gap-[12px] border-2 p-[16px] ${
        featured ? "border-[#1F1F1F] bg-[#1F1F1F]/[0.04]" : "border-[#1F1F1F]/30"
      }`}
    >
      <div className="aspect-[4/3] w-full border border-dashed border-[#1F1F1F]/40 bg-[#1F1F1F]/[0.03]" />
      <h3 className="text-[16px] leading-[1.3] font-medium text-[#1F1F1F]">
        {title}
      </h3>
      <p className="text-[12px] leading-[1.55] font-normal text-[#5D5D5D]">
        {body}
      </p>
      <ProvesTag>{proves}</ProvesTag>
    </article>
  );
}

function SectionGap() {
  return (
    <section
      id="gap"
      className="border-t border-[#1F1F1F]/30 py-[48px] first:border-t-0 first:pt-0 tablet:py-[64px]"
    >
      <div className="flex flex-col gap-[36px]">
        <SectionHeader
          number="03"
          eyebrow="The gap"
          headline={
            <>
              A real problem. The manufacturer admitted it. Three users named
              it before I did.
            </>
          }
          lede="The gap isn't speculative — it's documented across user threads, manufacturer messaging, and live community DMs. Below: three independent receipts, each pointing at the same hole."
        />

        <div className="grid gap-[16px] tablet:grid-cols-3">
          <GapCard
            title="Brompton owners hit the same wall on every trip"
            body="Three separate threads, three different cities, same complaint: the bike folds, the battery doesn't fly. Air carriers and rental shops aren't filling it."
            proves="user demand"
          />
          <GapCard
            title="Brompton itself confirmed the gap, on the record"
            body="Customer service rep, replying in r/Brompton: 'we're aware travelers struggle with battery logistics — we don't currently offer a rental partnership.' Shipped to my inbox."
            proves="manufacturer admission"
            featured
          />
          <GapCard
            title="Owners offered to host before I built anything"
            body="Eleven separate users DM'd offering to lend their batteries to fellow Bromptoneers — months before there was a product. Supply showed up before demand was activated."
            proves="latent supply"
          />
        </div>

        <LinkOut>longer thread analysis + verbatim manufacturer reply</LinkOut>
      </div>
    </section>
  );
}

// ============================================================================
// §04 MVP — dual-role architecture + 6 decision blocks
// ============================================================================

function ArchitectureDiagram() {
  return (
    <div className="border-2 border-[#1F1F1F] bg-[#1F1F1F]/[0.04] px-[24px] py-[32px]">
      <div className="grid items-center gap-[24px] tablet:grid-cols-[1fr_auto_1fr]">
        {/* Borrower */}
        <div className="flex flex-col items-start gap-[8px] text-left tablet:items-end tablet:text-right">
          <p
            className="text-[12px] tracking-[0.08em] text-[#5D5D5D]"

          >
            → AT DESTINATION
          </p>
          <p className="text-[18px] leading-[1.3] font-medium text-[#1F1F1F]">
            Borrower
          </p>
          <p className="max-w-[260px] text-[12px] leading-[1.6] text-[#5D5D5D]">
            Search by model + dates. Request a battery from a local rider.
          </p>
        </div>

        {/* Center: ONE USER */}
        <div className="flex flex-col items-center gap-[6px] border-2 border-[#1F1F1F] bg-[#EEEEEE] px-[14px] py-[18px]">
          <p
            className="text-[12px] tracking-[0.06em] text-[#5D5D5D]"

          >
            ONE USER
          </p>
          <p className="text-center text-[16px] leading-[1.3] font-medium text-[#1F1F1F] tablet:text-[18px]">
            Folding e-bike owner who travels
          </p>
          <p
            className="text-[16px] tracking-[0.5em] text-[#1F1F1F]"

          >
            ⇄
          </p>
        </div>

        {/* Provider */}
        <div className="flex flex-col items-start gap-[8px] text-left">
          <p
            className="text-[12px] tracking-[0.08em] text-[#5D5D5D]"

          >
            ← AT HOME
          </p>
          <p className="text-[18px] leading-[1.3] font-medium text-[#1F1F1F]">
            Provider
          </p>
          <p className="max-w-[260px] text-[12px] leading-[1.6] text-[#5D5D5D]">
            List the same battery you'd otherwise leave at home. Earn while away.
          </p>
        </div>
      </div>
      <p
        className="mt-[20px] text-center text-[12px] tracking-[0.06em] text-[#A0A0A0]"

      >
        FIG. 1 — every borrower is a provider, and back again.
      </p>
    </div>
  );
}

function DecisionBlock({
  index,
  group,
  title,
  body,
  why,
  imageSrc,
  imageAlt,
  children,
}: {
  index: string;
  group: string;
  title: string;
  body: string;
  why: string;
  imageSrc?: string;
  imageAlt?: string;
  children?: React.ReactNode;
}) {
  return (
    <article className="grid gap-[24px] border-t border-[#1F1F1F]/30 py-[24px] tablet:grid-cols-[1fr_320px] tablet:gap-[32px]">
      <div className="flex flex-col gap-[10px]">
        <p
          className="text-[12px] tracking-[0.08em] text-[#A0A0A0]"

        >
          DECISION {index} / {group}
        </p>
        <h3 className="text-[18px] leading-[1.3] font-medium text-[#1F1F1F]">
          {title}
        </h3>
        <p className="max-w-[600px] text-[16px] leading-[1.7] font-normal text-[#5D5D5D]">
          {body}
        </p>
        {children}
        <p className="text-[12px] leading-[1.65] font-normal text-[#5D5D5D]">
          <span className="italic">Why:</span> {why}
        </p>
      </div>

      {/* Visual */}
      <div className="aspect-[3/4] w-full overflow-clip border-2 border-[#1F1F1F] bg-[#1F1F1F]/[0.04] tablet:aspect-auto tablet:h-[280px] tablet:w-[320px]">
        {imageSrc ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={imageSrc}
            alt={imageAlt ?? ""}
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center text-[12px] tracking-[0.08em] text-[#A0A0A0]"

          >
            TBD · SCREENSHOT
          </div>
        )}
      </div>
    </article>
  );
}

function BookingFlow() {
  const steps: { num: string; label: string; highlighted?: boolean }[] = [
    { num: "01", label: "Browse map" },
    { num: "02", label: "Tap listing" },
    { num: "03", label: "Request (or contact-first)", highlighted: true },
    { num: "04", label: "Accept / reject" },
    { num: "05", label: "Upcoming schedule" },
    { num: "06", label: "Deposit reminder" },
    { num: "07", label: "Meet IRL + handoff" },
    { num: "08", label: "Return + rating" },
  ];
  return (
    <div className="my-[10px] flex flex-wrap gap-[4px]">
      {steps.map((s) => (
        <div
          key={s.num}
          className={`flex flex-1 flex-col items-center gap-[4px] border px-[8px] py-[10px] text-center ${
            s.highlighted
              ? "border-2 border-[#1F1F1F] bg-[#1F1F1F]/[0.04]"
              : "border-[#1F1F1F]/30"
          }`}
          style={{ minWidth: 90 }}
        >
          <span
            className="text-[12px] text-[#A0A0A0]"

          >
            {s.num}
          </span>
          <span className="text-[12px] leading-[1.4] font-medium text-[#1F1F1F]">
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function SectionMvp() {
  return (
    <section
      id="mvp"
      className="border-t border-[#1F1F1F]/30 py-[48px] first:border-t-0 first:pt-0 tablet:py-[64px]"
    >
      <div className="flex flex-col gap-[36px]">
        <SectionHeader
          number="04"
          eyebrow="MVP ★"
          headline={
            <>
              Every borrower is a provider.
              <br aria-hidden />
              Everything else served that.
            </>
          }
          lede="The dual-role architecture isn't a feature. It's the founding decision the whole product collapses into. Onboarding, the listing, the booking flow, and the deliberate omissions all exist to keep that one user from feeling like two."
        />

        <ArchitectureDiagram />

        <div className="flex flex-col">
          <DecisionBlock
            index="01"
            group="Onboarding"
            title="Set your home location at signup. Both roles activate from one map pin."
            body="The signup flow opens a map and asks for a single thing: drop the marker on your home. From that one input the app derives both 'where I host from' and 'where I'm searching when I land somewhere else.'"
            why="Two-role onboarding would duplicate state and double the abandonment surface. The pin reads as setup, not commitment to becoming a host."
            imageSrc="/work/volthop/volthop-signup-marker.png"
            imageAlt="Volthop signup with home-location marker"
          />
          <DecisionBlock
            index="02"
            group="Discovery"
            title="One map, scoped to model. Filter by destination dates."
            body="Every listing is a pin on the same map. Filters live in a single chip strip — model (Brompton, Tern, Lectric), date range, distance from drop point. The map is shared between borrowers searching and providers checking demand around them."
            why="Two separate UIs (one for browsing, one for hosting) would make the dual-role architecture harder to feel. The map is the surface where both roles live at once."
            imageSrc="/work/volthop/volthop-map-europe.png"
            imageAlt="Volthop discovery map across Europe"
          />
          <DecisionBlock
            index="03"
            group="Listing"
            title="Show the spot, not the seller."
            body="Listing detail leads with the handoff location and battery model — what a borrower needs to make the trip work — and demotes the host's profile to a footer block. Profile photos are optional; reviews are not."
            why="Receiver convenience > host vanity. The thread receipts in §02 made it clear travelers were optimizing for logistics confidence, not host shopping."
            imageSrc="/work/volthop/volthop-detail-brooklyn.png"
            imageAlt="Volthop Brooklyn listing detail"
          />
          <DecisionBlock
            index="04"
            group="No in-app chat (deliberate)"
            title="Contact reveal at booking confirmation, not before."
            body="Borrowers and providers exchange phone or Telegram only after the request is accepted. Pre-booking conversation happens via the structured request form (model, dates, drop point, message)."
            why="Chat invites haggling, ghosting, and moderation surface area I couldn't staff solo. The structured request keeps the data clean for v2 receipts and makes acceptance reversible."
          />
          <DecisionBlock
            index="05"
            group="Booking flow"
            title="Eight steps, one branch — and that branch is the only deliberate UX risk in v1."
            body="The booking flow is mostly linear. The only place I gave the user a choice is Step 03: request directly OR ask the host a clarifying question first. That branch exists because the threads showed two distinct intents — confident borrowers and cautious ones — and forcing both through the same form would lose the cautious cohort."
            why="The branch costs me one extra UI state and saves me an entire abandonment cohort. Worth it. Step 03 is the only place I let the user steer; everything else is rails."
            imageSrc="/work/volthop/volthop-saved.png"
            imageAlt="Volthop saved listings + upcoming"
          >
            <BookingFlow />
          </DecisionBlock>
          <DecisionBlock
            index="06"
            group="No escrow (deliberate)"
            title="Cash deposit at handoff, refundable at return."
            body="No in-app payments in v1. Both parties exchange a deposit in cash (or Wise / PayPal off-platform) at the IRL handoff, refunded on return. The app reminds both sides 24 hours before the meet."
            why="Escrow opens KYC, regulatory, and dispute surface area I couldn't carry solo. Cash + reminder is the smallest mechanism that doesn't break trust. The reminder is the design — not the payment rail."
          />
        </div>

        <LinkOut>
          longer write-up of each decision + the negative ones I cut from v1
        </LinkOut>
      </div>
    </section>
  );
}

// ============================================================================
// §05 Iterations — 4-rung ladder, Rung 1 carries Closed Testing timeline
// ============================================================================

function CTTimeline() {
  return (
    <div className="my-[12px] flex flex-col gap-[10px]">
      <div className="grid items-stretch gap-[8px] tablet:grid-cols-[1fr_24px_1.5fr_24px_1fr]">
        {/* Mar 23 — first batch */}
        <div className="flex flex-col items-center gap-[5px] border border-[#1F1F1F]/30 p-[12px] text-center">
          <span
            className="bg-[#1F1F1F]/10 px-[8px] py-[2px] text-[12px] text-[#1F1F1F]"

          >
            Mar 23
          </span>
          <p className="text-[12px] leading-[1.3] font-medium text-[#1F1F1F]">
            First batch invited
          </p>
          <p className="text-[12px] text-[#5D5D5D]">24 Android testers</p>
        </div>

        {/* arrow */}
        <p
          className="hidden text-center text-[16px] text-[#A0A0A0] tablet:flex tablet:items-center tablet:justify-center"

          aria-hidden
        >
          →
        </p>

        {/* Apr 9 — REJECTED (dominant center) */}
        <div className="flex flex-col items-center gap-[6px] border-2 border-[#1F1F1F] p-[14px] text-center">
          <span
            className="bg-[#1F1F1F] px-[8px] py-[2px] text-[12px] text-[#F4F4F4]"

          >
            Apr 9 — rejected
          </span>
          <p className="text-[16px] leading-[1.3] font-medium text-[#1F1F1F]">
            More testing required
          </p>
          <blockquote className="bg-[#1F1F1F]/[0.04] px-[9px] py-[7px] text-left text-[12px] leading-[1.45] italic text-[#1F1F1F]">
            “Testers were not engaged with your app during your closed test. You
            didn't follow testing best practices, which may include gathering
            and acting on user feedback through updates to your app.” — Google
            Play, verbatim
          </blockquote>
          <p className="text-[12px] leading-[1.5] font-medium text-[#1F1F1F]">
            → Documented every change, every test, every feedback loop.
            Re-submitted with full audit trail.
          </p>
        </div>

        {/* arrow */}
        <p
          className="hidden text-center text-[16px] text-[#A0A0A0] tablet:flex tablet:items-center tablet:justify-center"

          aria-hidden
        >
          →
        </p>

        {/* Apr 25 — production */}
        <div className="flex flex-col items-center gap-[5px] border border-[#1F1F1F]/30 p-[12px] text-center">
          <span
            className="bg-[#1F1F1F]/10 px-[8px] py-[2px] text-[12px] text-[#1F1F1F]"

          >
            Apr 25
          </span>
          <p className="text-[12px] leading-[1.3] font-medium text-[#1F1F1F]">
            Production access granted
          </p>
          <p className="text-[12px] text-[#5D5D5D]">Live on Google Play</p>
        </div>
      </div>
      <p
        className="text-center text-[12px] text-[#A0A0A0]"

      >
        ↑ 16 days of documentation between fail and pass — same listening muscle
        as Reddit comments ↑
      </p>
    </div>
  );
}

function IterationStage({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-[4px]">
      <p
        className="text-[12px] tracking-[0.06em] text-[#A0A0A0]"

      >
        {label}
      </p>
      <div className="text-[16px] leading-[1.6] text-[#5D5D5D]">{children}</div>
    </div>
  );
}

function IterationRung({
  rung,
  major = false,
  comment,
  source,
  version,
  needed,
  reflected,
  difficulty,
  difficultyEmbed,
}: {
  rung: string;
  major?: boolean;
  comment: string;
  source: string;
  version: string;
  needed: React.ReactNode;
  reflected: React.ReactNode;
  difficulty: React.ReactNode;
  difficultyEmbed?: React.ReactNode;
}) {
  return (
    <article
      className={`grid gap-[20px] tablet:grid-cols-[200px_1fr] ${
        major
          ? "border-2 border-[#1F1F1F] bg-[#1F1F1F]/[0.04] p-[24px] tablet:p-[28px]"
          : "border border-[#1F1F1F]/30 p-[18px] tablet:p-[20px]"
      }`}
    >
      {/* Left: rung label + comment + version */}
      <div className="flex flex-col gap-[10px]">
        {major && (
          <span
            className="self-start border-2 border-[#1F1F1F] bg-[#EEEEEE] px-[8px] py-[2px] text-[12px] text-[#1F1F1F]"

          >
            {rung} ★
          </span>
        )}
        <div className="flex flex-col gap-[6px] border-2 border-[#1F1F1F]/40 bg-[#F8F8F8] px-[15px] py-[11px]">
          <p className="text-[16px] leading-[1.5] font-normal text-[#1F1F1F]">
            “{comment}”
          </p>
          <p className="text-[12px] text-[#A0A0A0]">
            — {source}
          </p>
        </div>
        <VersionChip solid={major}>{version}</VersionChip>
      </div>

      {/* Right: 3 stages */}
      <div className="flex flex-col gap-[10px]">
        <IterationStage label="WHAT WAS NEEDED">{needed}</IterationStage>
        <IterationStage label="HOW IT WAS REFLECTED">{reflected}</IterationStage>
        <IterationStage label="DIFFICULTIES">{difficulty}</IterationStage>
        {difficultyEmbed}
      </div>
    </article>
  );
}

function SectionIterations() {
  return (
    <section
      id="iterations"
      className="border-t border-[#1F1F1F]/30 py-[48px] first:border-t-0 first:pt-0 tablet:py-[64px]"
    >
      <div className="flex flex-col gap-[36px]">
        <SectionHeader
          number="05"
          eyebrow="Iterations ★"
          headline={
            <>
              One comment opened the longest road.
              <br aria-hidden />
              Three more reshaped the rest.
            </>
          }
          lede="Four rungs. Each one starts with a real comment from a real user — Reddit DM, Brompton meetup, Closed Testing email, Play Store review. Rung 1 is dominant because the road it opened was the longest of the build: an EU/Android cascade that cost me 16 days of Closed Testing documentation."
        />

        <div className="flex flex-col gap-[16px]">
          {/* Rung 1 — major */}
          <IterationRung
            rung="Rung 1"
            major
            comment="If this only works in NYC I'm out. I land in Berlin half my year."
            source="DM, r/Brompton, Jan 22 2026"
            version="v1.0 → v1.2 (EU + Android cascade)"
            needed="A single store listing that covered EU travelers from day one — not 'US first, EU later.' Same auth, same map, same payment gateway, same legal."
            reflected={
              <>
                Five cascading changes: ① flipped the Firebase region to EU
                multi-region; ② added German + French copy strings to the
                signup; ③ built Brompton/Tern/Lectric model coverage for both
                markets at once; ④ moved KYC out of v1 entirely (deferred to
                v2) so neither market needed compliance review; ⑤ submitted
                Closed Testing to both stores from one repo.
              </>
            }
            difficulty="Closed Testing rejected on Apr 9 with the verbatim Google rejection below — 16 days of documentation later, production granted Apr 25."
            difficultyEmbed={<CTTimeline />}
          />

          {/* Rung 2 */}
          <IterationRung
            rung="Rung 2"
            comment="The handoff time is harder to coordinate than the booking itself."
            source="Brompton meetup, Brooklyn, Apr 12 2026"
            version="v1.3"
            needed="A way to pin the handoff window inside the booking flow without forcing a chat layer."
            reflected="Added a 'meet window' field to the request form (default 2 hours, custom range allowed). Surfaces the time inside the upcoming-bookings tile so both parties see the same clock."
            difficulty="Defaulting to 2 hours felt long for some users and short for others — A/B'd 1h vs 3h, settled on 2h after meetup feedback."
          />

          {/* Rung 3 */}
          <IterationRung
            rung="Rung 3"
            comment="I forgot the deposit at handoff and so did the host. Awkward."
            source="Play Store review, May 2 2026, 4★"
            version="v1.4"
            needed="A nudge that arrives at the right moment for both parties — not a generic notification."
            reflected="Push notification 24 hours and 1 hour before the scheduled meet, with the deposit amount inline. Same template both sides."
            difficulty="Apple's notification approval flow doesn't let me schedule timezone-shifted pushes natively — wrote a small Cloud Function instead."
          />

          {/* Rung 4 */}
          <IterationRung
            rung="Rung 4"
            comment="Listings are noisy in cities. I want to see who I've met before."
            source="Phxfold IG DM, May 5 2026"
            version="v1.5"
            needed="A signal that surfaces returning hosts without polluting the search ranking."
            reflected="Added a small 'met before' badge to listings where the borrower has at least one prior completed booking. No re-ranking, just a glyph."
            difficulty="Resisted the temptation to A/B a 'follow' graph — that's a different product. Badge stays neutral."
          />
        </div>

        <Body>
          The pattern across all four rungs: the comment is the spec. I'm not
          interpreting users; I'm shipping what they already wrote, and
          documenting the gaps when the platform pushes back. Rung 1 is the
          long version of that pattern — same listening muscle, just stretched
          over 16 days of Closed Testing paperwork.
        </Body>

        <LinkOut>full Closed Testing audit trail + rejection email</LinkOut>
      </div>
    </section>
  );
}

// ============================================================================
// §06 GTM — live state callout + 3 moments + SEO/AEO + channel mix
// ============================================================================

function MomentCard({
  title,
  body,
  imageSrc,
  imageAlt,
  imagePair,
}: {
  title: string;
  body: string;
  imageSrc?: string;
  imageAlt?: string;
  imagePair?: { a: string; b: string };
}) {
  return (
    <article className="flex flex-col gap-[10px] border-2 border-[#1F1F1F]/30 p-[14px]">
      <div className="aspect-[4/3] w-full overflow-clip border border-[#1F1F1F]/30 bg-[#1F1F1F]/[0.03]">
        {imagePair ? (
          <div className="grid h-full grid-cols-2 gap-[2px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imagePair.a} alt="" className="h-full w-full object-cover" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imagePair.b} alt="" className="h-full w-full object-cover" />
          </div>
        ) : imageSrc ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={imageSrc}
            alt={imageAlt ?? ""}
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center text-[12px] tracking-[0.08em] text-[#A0A0A0]"

          >
            TBD
          </div>
        )}
      </div>
      <h3 className="text-[12px] leading-[1.3] font-medium text-[#1F1F1F]">
        {title}
      </h3>
      <p className="text-[12px] leading-[1.55] text-[#5D5D5D]">{body}</p>
    </article>
  );
}

function ChannelCard({
  channel,
  title,
  bullets,
}: {
  channel: string;
  title: string;
  bullets: string[];
}) {
  return (
    <article className="flex flex-col gap-[8px] border-2 border-[#1F1F1F]/30 p-[18px]">
      <p
        className="text-[12px] tracking-[0.08em] text-[#5D5D5D]"

      >
        CHANNEL · {channel}
      </p>
      <h3 className="text-[16px] leading-[1.3] font-medium text-[#1F1F1F]">
        {title}
      </h3>
      <ul className="flex flex-col gap-[4px] text-[12px] leading-[1.7] text-[#5D5D5D]">
        {bullets.map((b) => (
          <li key={b}>· {b}</li>
        ))}
      </ul>
    </article>
  );
}

function SectionGtm() {
  return (
    <section
      id="gtm"
      className="border-t border-[#1F1F1F]/30 py-[48px] first:border-t-0 first:pt-0 tablet:py-[64px]"
    >
      <div className="flex flex-col gap-[36px]">
        <SectionHeader
          number="06"
          eyebrow="GTM"
          headline={
            <>
              The community built it.
              <br aria-hidden />
              Now I had to find them in the wild.
            </>
          }
          lede="Threads got me to v1. Beyond v1, I needed to meet riders where they already were — IRL meetups, search, AI assistants — without buying an audience."
        />

        {/* 4-up live state stats (TBD pending Play Store data) */}
        <StatsCallout
          header="LIVE STATE — May 2026 (TBD pending fresh Play Store pull)"
          stats={[
            { number: "TBD", label: "active listings (EU + US combined)" },
            { number: "TBD", label: "Android installs since Apr 25" },
            { number: "TBD", label: "App Store downloads since launch" },
            { number: "TBD", label: "monthly Search Console impressions" },
          ]}
        />

        {/* 3 moments */}
        <div className="grid gap-[16px] tablet:grid-cols-3">
          <MomentCard
            title="Reddit thread → Closed Testing waitlist"
            body="Posted v1 access in the same r/Brompton thread that named the product. 31 testers signed up in 48 hours."
          />
          <MomentCard
            title="Brompton meetups, Brooklyn"
            body="Showed up to two folding-bike meetups in Brooklyn with a printed flyer and a working app. Got 7 hosts onboarded on the spot, 4 of whom became Rung 2/3 sources."
            imagePair={{
              a: "/work/volthop/meetup-bikes.jpg",
              b: "/work/volthop/meetup-group.jpeg",
            }}
          />
          <MomentCard
            title="@phxfold IG — DM volunteer-host"
            body="A Phoenix-area Brompton owner DM'd offering to host before I'd posted in r/Brompton US. Became Rung 4's source."
          />
        </div>

        {/* SEO + AEO 2-up */}
        <div className="grid gap-[14px] tablet:grid-cols-2">
          <ChannelCard
            channel="SEO"
            title="Long-tail terms riders actually search"
            bullets={[
              "‘brompton battery rental [city]’ in title + h1",
              "schema.org/RentalService markup on listing pages",
              "Search Console + GSC sitemap from week 1",
              "City landing pages auto-generated from listing density",
            ]}
          />
          <ChannelCard
            channel="AEO"
            title="Make the answer easy for the AI assistants"
            bullets={[
              "FAQ schema covering the 8 questions threads keep asking",
              "‘How do I rent a Brompton battery in Berlin?’ Q→A pairs",
              "robots.txt allowlist for GPTBot, PerplexityBot, ClaudeBot",
              "Tracking referral source via UTM on AI chat surfaces",
            ]}
          />
        </div>

        {/* Channel mix strip */}
        <div className="border-2 border-[#1F1F1F]/30 bg-[#F8F8F8] px-[16px] py-[14px]">
          <p
            className="text-[12px] leading-[1.8] text-[#5D5D5D]"

          >
            <span className="text-[#5D5D5D]">Channel mix:</span> Reddit (r/ebikes,
            r/Brompton) <span className="text-[#A0A0A0]">(in flight)</span>
            {" · "}IRL meetups <span className="text-[#A0A0A0]">(in flight)</span>
            {" · "}IG DMs <span className="text-[#A0A0A0]">(reactive)</span>
            {" · "}SEO <span className="text-[#A0A0A0]">(in flight)</span>
            {" · "}AEO <span className="text-[#A0A0A0]">(planned)</span>
            {" · "}email/newsletter <span className="text-[#A0A0A0]">(planned)</span>
          </p>
        </div>

        <LinkOut>live Search Console + Play Store screenshots, refreshed monthly</LinkOut>
      </div>
    </section>
  );
}

// ============================================================================
// §07 Next — reflection + 4 next-move blocks
// ============================================================================

function ReviewMock() {
  return (
    <div className="grid gap-[14px] tablet:grid-cols-2">
      {[
        {
          name: "Borrower review",
          stars: "★★★★★",
          meta:
            "Borrowed Brompton C-Line battery · Brooklyn, NY · May 2026",
          body:
            "Handoff was painless — Sarah met me at the cafe, charged + ready. Cash deposit at meet, refunded at return. Would do this every trip.",
        },
        {
          name: "Provider review",
          stars: "★★★★★",
          meta: "Hosted to a returning Brompton C-Line traveler · May 2026",
          body:
            "Easy. Borrower showed up on time, returned clean, paid the deposit before riding. The 24h reminder is the reason we both showed up at the right cafe.",
        },
      ].map((r) => (
        <article
          key={r.name}
          className="flex flex-col gap-[8px] border-2 border-[#1F1F1F]/30 p-[14px]"
        >
          <div className="flex items-center justify-between gap-[8px]">
            <span className="text-[16px] font-medium text-[#1F1F1F]">
              {r.name}
            </span>
            <span
              className="text-[12px] tracking-[0.05em] text-[#1F1F1F]"

            >
              {r.stars}
            </span>
          </div>
          <p
            className="text-[12px] tracking-[0.04em] text-[#A0A0A0]"

          >
            {r.meta}
          </p>
          <p className="text-[12px] leading-[1.6] text-[#5D5D5D]">{r.body}</p>
        </article>
      ))}
    </div>
  );
}

function NextMove({
  index,
  title,
  body,
  children,
}: {
  index: string;
  title: string;
  body: string;
  children?: React.ReactNode;
}) {
  return (
    <article className="flex flex-col gap-[10px] border-t border-[#1F1F1F]/30 py-[24px]">
      <p
        className="text-[12px] tracking-[0.08em] text-[#A0A0A0]"

      >
        NEXT · {index}
      </p>
      <h3 className="text-[18px] leading-[1.3] font-medium text-[#1F1F1F]">
        {title}
      </h3>
      <p className="max-w-[620px] text-[16px] leading-[1.7] text-[#5D5D5D]">
        {body}
      </p>
      {children}
    </article>
  );
}

function SectionNext() {
  return (
    <section
      id="next"
      className="border-t border-[#1F1F1F]/30 py-[48px] first:border-t-0 first:pt-0 tablet:py-[64px]"
    >
      <div className="flex flex-col gap-[36px]">
        <SectionHeader
          number="07"
          eyebrow="What's next"
          headline="What's next."
        />

        <p className="max-w-[600px] text-[20px] leading-[1.5] font-normal italic text-[#1F1F1F]">
          The product was a conversation. The next year is whether the
          conversation can scale past the people who started it.
        </p>

        <div className="flex flex-col">
          <NextMove
            index="01"
            title="Dealer outreach — get into the bike-shop counter conversation"
            body="The same shops that sell Bromptons and Terns are the ones travelers ask first. Get a counter card + QR code in 12 NYC + 8 Brooklyn shops by July, then 20+ EU shops by EOY."
          />
          <NextMove
            index="02"
            title="Mutual review functionality — make the trust layer explicit"
            body="Both sides leave a review after the booking closes. Same template, same star count, both visible on each profile. No private feedback channel — that's what DMs were for, and they didn't scale."
          >
            <div className="mt-[8px]">
              <ReviewMock />
            </div>
          </NextMove>
          <NextMove
            index="03"
            title="Social — short-form video of actual handoffs"
            body="The handoff IS the product moment. Filming 30-sec POV clips of real meetups (consent + monochrome edit so the work matches the system) and dropping them into TikTok + IG Reels."
          />
          <NextMove
            index="04"
            title="Partnerships — the manufacturer admission becomes a co-marketing line"
            body="Brompton's customer service confirmed the gap on the record. The next conversation: turn that admission into an official partner badge — 'Brompton-friendly host network.' If they say no, the receipt still goes on the page."
          />
        </div>

        <Body>
          The case study ends here, but the work doesn't. The next iteration is
          already being written by people I haven't met yet, in threads I
          haven't searched yet. The job is to keep listening at the same
          volume.
        </Body>
      </div>
    </section>
  );
}

// ============================================================================
// Page composition
// ============================================================================

const SECTIONS: CaseStudySection[] = [
  { id: "insight", num: "02", label: "Insight" },
  { id: "gap", num: "03", label: "The gap" },
  { id: "mvp", num: "04", label: "MVP", star: true },
  { id: "iterations", num: "05", label: "Iterations", star: true },
  { id: "gtm", num: "06", label: "GTM" },
  { id: "next", num: "07", label: "Next" },
];

export default function VolthopCaseStudy() {
  return (
    <>
      <Hero />

      {/* §02–07 in a two-column layout: sticky left nav + content column.
          Left nav is hidden below the tablet breakpoint so the read on
          mobile stays linear (top-to-bottom, no side rail). */}
      <div className="border-t-2 border-[#1F1F1F]">
        <div className="mx-auto flex max-w-[1200px] gap-[32px] px-[32px] py-[48px] tablet:py-[64px]">
          <CaseStudyLeftNav
            currentSlug="volthop"
            readTime="~10 min read"
            sections={SECTIONS}
          />

          <div className="flex min-w-0 flex-1 flex-col">
            <SectionInsight />
            <SectionGap />
            <SectionMvp />
            <SectionIterations />
            <SectionGtm />
            <SectionNext />
          </div>
        </div>
      </div>
    </>
  );
}
