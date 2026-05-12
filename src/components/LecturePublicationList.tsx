import Link from "next/link";
import {
  AFFILIATION_NAME,
  lectures,
  publications,
  type Lecture,
  type Publication,
} from "@/data/publications";

// LecturePublicationList — sits BELOW ProjectList on the home page.  Same
// section-shell pattern (full-bleed bg, inner 1200px column at px-[32px])
// so the left edge of the H2 and the list items line up with the WORK
// section above.
//
// The H2 "Lecture & Publication" renders inline on tablet+ only — mobile
// users see the section title in the sticky <MobileNav/> bar that swaps
// from "WORK" to "Lecture & Publication" once they scroll past the work
// list (see MobileNav's onScroll handler).  This mirrors how WORK is
// handled in ProjectList.
//
// data-section="publication" + id="publication" are the two anchors for
//   - hash-link navigation (Link href="/#publication" from CaseStudyNav)
//   - scroll-position detection in MobileNav + ProjectNav (which one of
//     "Work" / "Lecture & Publication" is currently in view).
//
// Row format is uniform across lectures + publications:
//   [generic icon] [Title]
//                  YEAR · VENUE (mono uppercase)
//                  optional description (gray)
//                                                          [↗ arrow]
// Lectures use /icons/lecture.svg (graduation-cap silhouette); publications
// use /icons/publication.svg (article doc).  Earlier iterations rendered
// the actual school wordmarks (TNS / MICA / Deloitte) — Soonk asked to drop
// them because the wordmarks felt heavier than the title text next to them
// and stole the row's center of gravity.

// Item title size — intentionally lighter than the Work tile TITLE class.
// Soonk: "현재 렉쳐이름이 너무크고 두꺼워" — original was 30/32 px font-black
// which made a long scrollable list visually tiring.  Dialed down to 20/22
// px font-bold so the eye scans the list without each row demanding
// individual attention.
const ITEM_TITLE =
  "text-[20px] leading-[1.25] font-bold text-[#1F1F1F] tablet:text-[22px]";

// External-link arrow.  Same ↗ convention used in Pomes case-study CTAs:
// only the arrow's hit area is clickable, so users don't accidentally
// navigate when they click the title to read it.  Hover micro-interaction:
// arrow lifts up-right and scales up 1.25× (reads as "thicker").
function ArrowLink({ href, label }: { href: string; label: string }) {
  const external = href.startsWith("http");
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={`Open: ${label}`}
      className="group/arrow flex h-[48px] w-[64px] shrink-0 items-center justify-center self-center no-underline tablet:h-[56px] tablet:w-[80px]"
    >
      <span
        aria-hidden
        className="inline-block text-[28px] leading-none font-bold text-[#1F1F1F] transition-transform duration-200 ease-out group-hover/arrow:-translate-y-[3px] group-hover/arrow:translate-x-[3px] group-hover/arrow:scale-[1.25] tablet:text-[32px]"
      >
        ↗
      </span>
    </Link>
  );
}

function RowBody({
  iconSrc,
  iconAlt,
  title,
  meta,
  description,
}: {
  iconSrc: string;
  iconAlt: string;
  title: string;
  meta?: string;
  description?: string;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-[6px]">
      {/* Icon + title inline.  items-center keeps the small icon optically
          centered against the bold title on a single line; if the title
          wraps, flex-wrap drops the title under the icon cleanly. */}
      <div className="flex flex-wrap items-center gap-x-[12px] gap-y-[4px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={iconSrc}
          alt={iconAlt}
          aria-hidden={iconAlt === "" ? true : undefined}
          className="h-[16px] w-auto shrink-0 text-[#1F1F1F] tablet:h-[18px]"
        />
        <h3 className={ITEM_TITLE}>{title}</h3>
      </div>
      {meta && (
        <span
          className="text-[11px] tracking-[0.08em] font-medium text-[#5D5D5D] uppercase tablet:text-[12px]"
          style={{
            fontFamily:
              "var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
          }}
        >
          {meta}
        </span>
      )}
      {description && (
        <span className="text-[14px] leading-[1.45] font-normal text-[#5D5D5D] tablet:text-[15px]">
          {description}
        </span>
      )}
    </div>
  );
}

function Row({
  href,
  ariaLabel,
  children,
}: {
  href?: string;
  ariaLabel: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-[8px] py-[20px] tablet:py-[24px]">
      {children}
      {href ? (
        <ArrowLink href={href} label={ariaLabel} />
      ) : (
        // Reserve same width as the arrow column so rows without a link
        // still align vertically with neighbours.
        <span
          aria-hidden
          className="h-[48px] w-[64px] shrink-0 tablet:h-[56px] tablet:w-[80px]"
        />
      )}
    </div>
  );
}

function LectureRow({ item }: { item: Lecture }) {
  return (
    <Row href={item.href} ariaLabel={item.title}>
      <RowBody
        iconSrc="/icons/lecture.svg"
        iconAlt=""
        title={item.title}
        meta={`${item.period} · ${AFFILIATION_NAME[item.affiliation]}`}
        description={item.description}
      />
    </Row>
  );
}

function PublicationRow({ item }: { item: Publication }) {
  return (
    <Row href={item.href} ariaLabel={item.title}>
      <RowBody
        iconSrc="/icons/publication.svg"
        iconAlt=""
        title={item.title}
        meta={`${item.year} · ${item.venue}`}
        description={item.description}
      />
    </Row>
  );
}

export default function LecturePublicationList() {
  return (
    <section
      id="publication"
      data-section="publication"
      // Full-bleed bg — same approach as ProjectList so the section reads
      // as a sibling to WORK rather than a card.  Inner column caps at
      // 1200 px (matches Hero / Grid / ProjectNav).
      className="flex w-full flex-col items-stretch bg-[#EEEEEE] pt-4 pb-24 tablet:pt-2"
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-4 px-[32px]">
        {/* Section heading matches the WORK title in ProjectList exactly
            (text-[48px] leading-[0.92] font-black, no tablet size bump)
            so the two siblings read at the same visual weight.  Mobile
            users see the title via the sticky <MobileNav/> bar that swaps
            from "WORK" to "Lecture & Publication" once scroll crosses
            into this section, so the inline H2 is desktop-only. */}
        <h2 className="mb-2 hidden text-[48px] leading-[0.92] font-black text-[#1F1F1F] tablet:block">
          Lecture &amp; Publication
        </h2>

        {/* Thick rule separates the section header from the list (same
            visual weight as the 2px row border in ProjectList tiles). */}
        <div className="mt-[16px] border-t-2 border-[#1F1F1F] tablet:mt-[24px]" />

        <ul className="divide-y divide-[#1F1F1F]/20">
          {lectures.map((lecture) => (
            <li key={lecture.id}>
              <LectureRow item={lecture} />
            </li>
          ))}
          {publications.map((pub) => (
            <li key={pub.id}>
              <PublicationRow item={pub} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
