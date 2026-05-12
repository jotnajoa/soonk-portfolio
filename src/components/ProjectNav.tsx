"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { tiles } from "@/data/tiles";
import { useEffect, useRef, useState } from "react";
import { killGridScrollTriggersIfLeavingPage } from "@/components/FlyingSquares";

// Figma node 101:1972 / 101:1656.
//   Soonk · | · Work [9 indicator squares] | · Publication · | · Resume
//
// Rendered globally via app/layout.tsx, so EVERY route gets the same
// header.  Visibility behaviour depends on pathname:
//   /              — starts opacity 0 + pointer-events none, FlyingSquares
//                    fades it in as the user scrolls past the grid.  This
//                    is the original landing behaviour.
//   any other path — always visible (opacity 1).  No FlyingSquares on
//                    these routes, so the inline initial style controls it.
//
// Active-tile highlight: the scroll observer queries [data-tile-list] —
// only present on the landing.  On case-study pages the array is empty,
// so we just show the page's tile id (e.g. "01" on /work/pomes) as
// active so the indicator anchors the user contextually.
//
// Indicator click: on the landing, smooth-scrolls to the tile.  On
// other pages, navigates to /#work-list with the tile in view (Next.js
// Link with the right href hash).

const PATH_TO_TILE_ID: Record<string, string> = {
  "/work/pomes": "01",
};

export default function ProjectNav() {
  const pathname = usePathname();
  const isLanding = pathname === "/";
  // /about is its OWN section in the nav (the third pill).  On this
  // route no work tile is current and no publication scroll state
  // applies, so we explicitly clear activeId — without this fallback
  // override the first tile (01 POMEs) lights up by default and reads
  // as if WORK were the active section.
  const isAbout = pathname === "/about";
  const fallbackActive = isAbout
    ? null
    : PATH_TO_TILE_ID[pathname ?? ""] ?? tiles[0]?.id ?? null;
  const [activeId, setActiveId] = useState<string | null>(fallbackActive);
  // ProjectNav lives in the root layout so it doesn't remount across
  // routes — the useState initializer only runs once.  Without this
  // sync effect, activeId carried over from / (the last tile the
  // user had in view) would stay lit when they navigated to /about.
  // Reset activeId every time pathname changes so /about reads as
  // "no work tile is current."
  useEffect(() => {
    setActiveId(
      pathname === "/about"
        ? null
        : PATH_TO_TILE_ID[pathname ?? ""] ?? tiles[0]?.id ?? null,
    );
  }, [pathname]);
  // True when the landing-page scroll has crossed into the Lecture &
  // Publication section (the sibling of ProjectList).  Drives the
  // bold/gray swap between the "Work" label and the "Lecture &
  // Publication" link, and clears the 9 work-tile indicators so the
  // last tile doesn't stay lit just because its top scrolled offscreen.
  // Always false on non-landing pages — those routes don't render the
  // publication section, so there's no scroll-state to track.
  const [inPublication, setInPublication] = useState(false);

  // Hash-based scroll-to-tile on landing.
  //
  // Case-study pages link "← BACK TO PORTFOLIO" (and the mobile breadcrumb)
  // to "/#work-list-<tile.id>" so the user returns to the list with their
  // project already in view.  The hash itself is just an anchor: there's no
  // real <element id="work-list-04"> on the page (the list rows use
  // [data-tile-id="04"][data-tile-list] instead, which Next's hashchange
  // resolver can't see).  On mount, parse the hash, locate the matching
  // list row, and scroll it into view — with a short timeout so the
  // ProjectList has actually rendered before we measure.
  useEffect(() => {
    if (!isLanding) return;
    const m = /^#work-list-(\d{2})$/.exec(window.location.hash);
    if (!m) return;
    const id = m[1];
    const tile = document.querySelector(
      `[data-tile-list][data-tile-id="${id}"]`,
    );
    if (!tile) return;
    // One paint later: the list is mounted, but its grid may still be
    // settling.  rAF + setTimeout(0) covers both single-paint and slower
    // hydration paths.
    requestAnimationFrame(() => {
      tile.scrollIntoView({ behavior: "auto", block: "start" });
    });
  }, [isLanding]);

  // Active-tile tracking via scroll position (NOT IntersectionObserver).
  //
  // We previously used IntersectionObserver + ratio-sort, but that has a
  // subtle bug: each callback only contains entries for tiles that crossed
  // a threshold THIS frame.  If tile 02 is fully visible and tile 03 starts
  // entering, the callback fires with only [03] — we'd pick 03 even though
  // 02 is still more visible overall.  A moment later 02's threshold flips,
  // callback fires with [02], and we switch back.  Result: indicators bounce
  // between adjacent tiles as the boundary crosses, which is what the user
  // saw ("3rd lights up, then back to 2nd, then 4th, then back to 3rd…").
  //
  // Scroll-position approach is monotonic: active tile = the LAST tile whose
  // top has crossed a fixed trigger line ~30% down the viewport.  Scrolling
  // forward only ever advances; scrolling backward only ever retreats.
  //
  // Only runs on the landing — case-study pages have no [data-tile-list]
  // elements so the listener would be a no-op anyway.
  useEffect(() => {
    if (!isLanding) return;

    const compute = () => {
      // Section-in-view check first.  Once scroll crosses into the
      // Lecture & Publication section, NO work tile is "current" — the
      // last tile (GTM, 09) would otherwise stay lit just because its
      // top scrolled past the trigger.  Clearing activeId turns every
      // indicator into the unfilled state.
      const pubEl = document.querySelector('[data-section="publication"]');
      const pubInView = !!pubEl && pubEl.getBoundingClientRect().top <= 56;
      setInPublication(pubInView);
      if (pubInView) {
        setActiveId(null);
        return;
      }

      const els = Array.from(
        document.querySelectorAll<HTMLElement>("[data-tile-list]"),
      );
      if (els.length === 0) return;

      const trigger = window.innerHeight * 0.3;
      let nextId: string | null = els[0].getAttribute("data-tile-id");

      for (const el of els) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= trigger) {
          nextId = el.getAttribute("data-tile-id");
        } else {
          // Tiles after this haven't reached the trigger yet — stop.
          break;
        }
      }

      if (nextId) setActiveId(nextId);
    };

    // Run once at mount (in case page loaded scrolled), then on every scroll
    // and resize.  Passive listener — we never preventDefault.
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [isLanding]);

  // Click behaviour for the indicator squares:
  //   - On /         : smooth-scroll to the matching list tile.
  //   - elsewhere    : let the <Link> handle navigation to /#work-list-<id>
  //                    (the landing's ProjectList tile carries that id).
  const goTo = (id: string) => {
    if (!isLanding) return; // Link's href takes over.
    document
      .querySelector(`[data-tile-list][data-tile-id="${id}"]`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // On the landing the nav starts hidden — FlyingSquares fades it in via
  // GSAP as the grid scrolls into view.  On every other page we explicitly
  // re-assert opacity:1 / pointerEvents:auto in the style prop (instead of
  // leaving the prop undefined).
  //
  // Why explicit on non-landing: when the user clicks a top-nav Link from
  // home, FlyingSquares unmounts → useGSAP's gsap.context.revert() resets
  // every GSAP-set property back to its mount-time value, which was the
  // landing's opacity:0 / pointerEvents:none.  React then re-renders
  // ProjectNav with new pathname, but if `style` becomes `undefined` the
  // reconciler doesn't reliably overwrite inline styles GSAP wrote
  // directly to the DOM (React tracks what *React* set, not what GSAP
  // set).  Explicit visible-state values keep React in authority and
  // guarantee the nav appears on /about, /work/{slug}, etc.
  const initialStyle = isLanding
    ? { opacity: 0, pointerEvents: "none" as const }
    : { opacity: 1, pointerEvents: "auto" as const };

  // Force-show the nav whenever we land on a non-landing route.
  //
  // React's reconciler doesn't track inline styles GSAP wrote directly
  // to the DOM during the landing's FlyingSquares timeline.  When the
  // user clicks away from / to /about (or /work/{slug}), useGSAP's
  // cleanup reverts the nav's opacity to its mount-time value (0).
  // React's next render diff *looks* unchanged from its own bookkeeping
  // (it last set opacity:0 itself on the landing render), so the DOM
  // mutation is skipped — nav stays invisible until a manual refresh.
  //
  // This effect closes the gap: any time isLanding goes false, we
  // imperatively reassert opacity:1 / pointerEvents:auto on the actual
  // DOM node via the ref.  Runs in useEffect (post-paint) so it lands
  // after the GSAP cleanup that would otherwise overwrite us.
  const navRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isLanding) return;
    const el = navRef.current;
    if (!el) return;
    el.style.opacity = "1";
    el.style.pointerEvents = "auto";
  }, [isLanding]);

  // Section-jump click handlers for Work and Lecture & Publication.
  //
  // Background: the Links target hash anchors on / (#work-list /
  // #publication).  When the user is ALREADY on / with that hash,
  // clicking the same Link again is a same-URL navigation — Next.js
  // Link short-circuits it, and the browser doesn't refire the anchor
  // scroll (the URL didn't change).  Visible failure: "/#publication
  // 뜬 다음 scroll 위로 올리고 L&P 다시 클릭해도 안 내려감".
  //
  // Fix: on the landing route, intercept the click, preventDefault,
  // and smooth-scrollIntoView the target section manually.  On other
  // routes, let the Link's default behaviour navigate to /#section.
  const handleSectionClick =
    (id: string) => (e: React.MouseEvent) => {
      if (!isLanding) return; // Link handles the route change.
      e.preventDefault();
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

  return (
    <div
      ref={navRef}
      data-project-nav
      style={initialStyle}
      className="fixed top-0 right-0 left-0 z-40 hidden bg-[#EEEEEE]/95 backdrop-blur tablet:block"
    >
      {/* Bar bg + backdrop-blur stretch full viewport, but the nav content
          itself caps at 1200px (centered) so it doesn't sprawl on
          ultra-wide screens. */}
      <nav className="mx-auto flex max-w-[1200px] items-center gap-4 px-[32px] py-4">
        {/* Brand: [logo + Soonk] as one clickable mark.  Both are inside
            the same Link so anywhere the user grabs goes back to /
            (the hero animation page).  Logo inherits text color via
            currentColor, so the hover transition Mute → Black lifts the
            whole brand together. */}
        <Link
          href="/"
          onClick={() => killGridScrollTriggersIfLeavingPage("/")}
          className="group flex items-center gap-[10px] whitespace-nowrap text-[#A0A0A0] no-underline transition-colors hover:text-black"
          aria-label="Soonk — home"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/soonk_logo_mark.svg"
            alt=""
            aria-hidden
            className="h-[24px] w-auto shrink-0"
          />
          <span className="text-[16px] leading-[0.92] font-normal">
            Soonk
          </span>
        </Link>
        <span className="h-6 w-px bg-[#A0A0A0]" aria-hidden />

        <div className="flex items-center gap-2">
          {/* Work label — bold/black when its section is in view, gray
              normal once scroll crosses into Lecture & Publication OR
              the user has navigated to /about (which owns its own bold
              state in the third nav pill below). */}
          <Link
            href="/#work-list"
            onClick={(e) => {
              killGridScrollTriggersIfLeavingPage("/#work-list");
              handleSectionClick("work-list")(e);
            }}
            className={`text-[16px] leading-[0.92] whitespace-nowrap ${
              inPublication || isAbout
                ? "font-normal text-[#A0A0A0] hover:text-black"
                : "font-semibold text-black"
            }`}
          >
            Work
          </Link>
          {tiles.map((t) => {
            const active = t.id === activeId;
            // Hover bg uses the green accent (#00FB00) — same treatment
            // as the case-study CaseStudyNav so the two nav surfaces
            // share a single hover language.
            const indicatorClasses = `block size-4 border border-[#1F1F1F] transition-colors ${
              active
                ? "bg-[#1F1F1F] group-hover:bg-[#00FB00]"
                : "bg-transparent group-hover:bg-[#00FB00]"
            }`;
            // Each indicator is wrapped in a `relative group` so the
            // editorial tooltip can position itself below without
            // pushing siblings.  The indicator element itself keeps the
            // data-nav-indicator attribute + 16×16 size so FlyingSquares
            // continues to measure it correctly.
            const tooltip = (
              <span
                role="tooltip"
                aria-hidden
                className="pointer-events-none absolute top-[calc(100%+14px)] left-1/2 z-50 w-max max-w-[260px] -translate-x-1/2 -translate-y-1 border-2 border-[#1F1F1F] bg-[#00FB00] px-[14px] py-[10px] opacity-0 shadow-[4px_4px_0_0_#1F1F1F] transition-[opacity,transform] duration-150 ease-out group-hover:translate-y-0 group-hover:opacity-100"
              >
                <span
                  className="block text-[10px] tracking-[0.16em] font-medium text-[#1F1F1F]/70"
                  style={{
                    fontFamily:
                      "var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
                  }}
                >
                  {t.id}
                </span>
                <span className="block text-[15px] leading-[1.2] font-semibold text-[#1F1F1F]">
                  {t.brand}
                </span>
                <span className="block text-[12px] leading-[1.35] font-medium text-[#1F1F1F]">
                  {t.tagline}
                </span>
              </span>
            );
            if (isLanding) {
              return (
                <span key={t.id} className="group relative flex items-center">
                  <button
                    onClick={() => goTo(t.id)}
                    aria-label={`${t.id} · ${t.brand}`}
                    data-nav-indicator={t.id}
                    className={indicatorClasses}
                  />
                  {tooltip}
                </span>
              );
            }
            return (
              <span key={t.id} className="group relative flex items-center">
                <Link
                  href={`/#work-list-${t.id}`}
                  aria-label={`${t.id} · ${t.brand}`}
                  data-nav-indicator={t.id}
                  className={indicatorClasses}
                />
                {tooltip}
              </span>
            );
          })}
        </div>

        <span className="h-6 w-px bg-[#A0A0A0]" aria-hidden />
        {/* Mirror of the Work label — bold/black when the publication
            section is in view, gray normal otherwise.  /about pins
            About me bold instead, so this stays gray on that route. */}
        <Link
          href="/#publication"
          onClick={(e) => {
            killGridScrollTriggersIfLeavingPage("/#publication");
            handleSectionClick("publication")(e);
          }}
          className={`text-[16px] leading-[0.92] whitespace-nowrap ${
            inPublication && !isAbout
              ? "font-semibold text-black"
              : "font-normal text-[#A0A0A0] hover:text-black"
          }`}
        >
          Lecture &amp; Publication
        </Link>
        <span className="h-6 w-px bg-[#A0A0A0]" aria-hidden />
        <Link
          href="/about"
          onClick={() => killGridScrollTriggersIfLeavingPage("/about")}
          className={`text-[16px] leading-[0.92] whitespace-nowrap ${
            isAbout
              ? "font-semibold text-black"
              : "font-normal text-[#A0A0A0] hover:text-black"
          }`}
        >
          About me
        </Link>
      </nav>
    </div>
  );
}
