"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { tiles } from "@/data/tiles";
import { useEffect, useRef, useState } from "react";
import { killGridScrollTriggersIfLeavingPage } from "@/components/FlyingSquares";

// MobileNav — mobile-only (<800px) sticky bar PLUS the fullscreen menu
// overlay.  Lives between <Hero/> and <ProjectList/> in DOM order so its
// natural position is just-below the hero; as the user scrolls past the
// hero the bar slides into view, then `position: sticky; top:0;` pins it
// to the viewport top.
//
// The bar title is dynamic: it reads "WORK" while the user is in the
// ProjectList scroll range, then swaps to "Lecture & Publication" once
// scroll crosses into the LecturePublicationList section below.  Detected
// via getBoundingClientRect on [data-section="publication"] in the same
// scroll handler that flips the sticky-active drop-shadow.
//
// /about route: same bar, title reads "About me", always stuck (no
// scroll-based fade-in — there's no hero on the about page to push it
// down).  Hamburger menu's "About me" entry shows the active treatment.
//
// Two visual states for the bar chrome:
//   162:3935 — bar visible, no shadow (initial / about-to-stick).
//   162:4000 — sticky-active: bottom border + drop-shadow.

export default function MobileNav() {
  const pathname = usePathname();
  const isAbout = pathname === "/about";

  const barRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [inPublication, setInPublication] = useState(false);
  // The clip-path circle for the menu open/close animation emanates from
  // the hamburger button.  Because the bar lives in normal flow until it
  // sticks, the button's viewport position depends on scroll — capture it
  // at click time instead of hard-coding a "calc(100% - 56px) X" value.
  const [clipOrigin, setClipOrigin] = useState("calc(100% - 60px) 32px");

  // Sticky-active detection + section-in-view detection.  Both depend on
  // the same scroll position, so one handler covers both.  The bar sits
  // 80 px tall, so "in publication" means the section's top edge has
  // crossed the bar's bottom edge.
  useEffect(() => {
    const onScroll = () => {
      if (!barRef.current) return;
      setStuck(barRef.current.getBoundingClientRect().top <= 0);
      const pubEl = document.querySelector('[data-section="publication"]');
      if (pubEl) {
        setInPublication(pubEl.getBoundingClientRect().top <= 80);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const openMenu = () => {
    if (buttonRef.current) {
      const r = buttonRef.current.getBoundingClientRect();
      setClipOrigin(`${r.left + r.width / 2}px ${r.top + r.height / 2}px`);
    }
    setOpen(true);
  };
  const close = () => setOpen(false);

  // Section-jump click handlers for the in-drawer "Soonk" / "Work" /
  // "Lecture & Publication" labels.  These render as Links so that on
  // routes WITHOUT the target section (e.g. /about), the browser
  // performs a real navigation back to /#section.  On the home route,
  // we preventDefault and smooth-scroll within the page instead.
  //
  // Two gotchas the in-page version has to handle:
  //   1. Body overflow is locked while the drawer is open — we clear it
  //      synchronously so scrollIntoView/scrollTo can actually move the
  //      page (the useEffect that watches `open` runs on the next tick,
  //      too late for the immediate scroll).
  //   2. close() is async via React state, so wrap the scroll in rAF to
  //      let the clip-path begin animating before the page jumps.
  const handleSectionClick = (id: string) => (e: React.MouseEvent) => {
    if (isAbout) {
      // Let the Link navigate to /#section.  Just close the drawer.
      close();
      return;
    }
    // On the home route the section is right here — short-circuit the
    // navigation and smooth-scroll instead.
    e.preventDefault();
    close();
    document.body.style.overflow = "";
    requestAnimationFrame(() => {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };
  const handleHomeClick = (e: React.MouseEvent) => {
    if (isAbout) {
      close();
      return;
    }
    e.preventDefault();
    close();
    document.body.style.overflow = "";
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  return (
    <>
      {/* Sticky WORK + hamburger bar (mobile only).
          z-30 so it sits above ProjectList content but BELOW the menu
          overlay (z-50). Shadow + border appear only when sticky-active. */}
      <div
        ref={barRef}
        className={`sticky top-0 z-30 bg-[#EEEEEE] tablet:hidden transition-shadow duration-200 ${
          stuck || isAbout
            ? "border-b border-black shadow-[0_2px_1px_rgba(0,0,0,0.25)]"
            : ""
        }`}
      >
        <div className="flex h-[80px] items-center justify-between px-[32px]">
          {/* Title swaps based on which section is in view.  WORK keeps
              its punchy 48 px treatment; "Lecture & Publication" drops to
              28 px and wraps onto two lines so the longer label still
              fits within the same 80 px bar without truncation.  On the
              /about route the bar reads "About me" at the same 48 px
              page-header treatment as WORK. */}
          {isAbout ? (
            <p className="text-[48px] leading-[0.92] font-black text-[#1F1F1F]">
              About me
            </p>
          ) : inPublication ? (
            <p className="text-[28px] leading-[0.92] font-black text-[#1F1F1F]">
              Lecture &amp;<br />Publication
            </p>
          ) : (
            <p className="text-[48px] leading-[0.92] font-black text-[#1F1F1F]">
              WORK
            </p>
          )}
          {/* Hamburger button — HIDDEN while the bar is in-flow.  Only
              slides in once the bar has reached `top:0` (sticky-active).
              This matches Figma 162:4106 (no hamburger) → 162:3935 (sticky
              bar with hamburger).  The combined opacity + translate-x
              transition makes the button feel like it slips in from the
              right edge as the bar lands. */}
          <button
            ref={buttonRef}
            onClick={openMenu}
            aria-label="Open menu"
            aria-hidden={!(stuck || isAbout)}
            tabIndex={stuck || isAbout ? 0 : -1}
            className={`flex size-[56px] cursor-pointer flex-col items-center justify-center gap-[5px] rounded-full bg-[#1F1F1F] shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-[opacity,transform,box-shadow] duration-300 ease-out hover:-translate-y-[2px] hover:shadow-[0_8px_16px_rgba(0,0,0,0.25)] active:translate-y-0 active:shadow-[0_2px_8px_rgba(0,0,0,0.15)] ${
              stuck || isAbout
                ? "pointer-events-auto translate-x-0 opacity-100"
                : "pointer-events-none translate-x-4 opacity-0"
            }`}
          >
            <span className="block h-[3px] w-[30px] bg-[#F4F4F4]" />
            <span className="block h-[3px] w-[30px] bg-[#F4F4F4]" />
            <span className="block h-[3px] w-[30px] bg-[#F4F4F4]" />
          </button>
        </div>
      </div>

      {/* Menu panel — circle-expand clip-path from hamburger position */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-50 bg-[#1F1F1F] text-[#F4F4F4] tablet:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{
          clipPath: open
            ? `circle(150vmax at ${clipOrigin})`
            : `circle(0px at ${clipOrigin})`,
          transition: "clip-path 700ms cubic-bezier(0.65, 0, 0.35, 1)",
        }}
      >
        <div
          className={`flex h-full flex-col gap-[20px] overflow-y-auto p-[20px] transition-opacity duration-200 ${
            open ? "opacity-100 delay-300" : "opacity-0"
          }`}
        >
          {/* Top row: brand mark (clickable → top) + close.  Logo button
              has a generous hit area so a quick tap on the icon counts. */}
          <div className="flex items-start justify-between">
            <Link
              href="/"
              onClick={handleHomeClick}
              aria-label="Soonk — home"
              className="-m-1 flex items-center p-1 no-underline"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hamburger_logo.svg"
                alt=""
                aria-hidden
                className="h-[48px] w-auto shrink-0"
              />
            </Link>
            <button
              onClick={close}
              aria-label="Close menu"
              className="cursor-pointer text-3xl leading-none text-[#F4F4F4]"
            >
              ✕
            </button>
          </div>

          <Link
            href="/"
            onClick={handleHomeClick}
            className="self-start text-[26px] leading-[1] font-normal text-[#8E8E8E] no-underline hover:text-[#F4F4F4]"
          >
            Soonk
          </Link>

          <div className="h-[2px] w-full bg-[#F4F4F4]" />

          <div className="flex flex-col gap-[12px]">
            {/* Section label.  Bold + white when the user is currently
                inside the WORK scroll range AND on the home route, gray
                otherwise (including on the /about route).  NO white dot
                — dots are reserved for "you're on this specific
                project's page" in CaseStudyNav.  Clicking smooth-
                scrolls the home page to the WORK list. */}
            <Link
              href="/#work-list"
              onClick={handleSectionClick("work-list")}
              className={`self-start text-[26px] leading-[1] no-underline ${
                isAbout || inPublication
                  ? "font-normal text-[#8E8E8E] hover:text-[#F4F4F4]"
                  : "font-bold text-[#F4F4F4]"
              }`}
            >
              Work
            </Link>

            {/* Project items — children of the WORK section, so they
                indent under it.  The drawer is always rendered on the
                home page (MobileNav doesn't mount on case-study routes),
                so these links navigate INTO the case-study route.  No
                active state here — that's the case-study CaseStudyNav's
                job. */}
            <ul className="flex flex-col gap-[10px] pl-[20px]">
              {tiles.map((t) => (
                <li key={t.id} className="flex items-center gap-[16px]">
                  <Link
                    href={`/work/${t.slug}`}
                    onClick={close}
                    className="text-left text-[18px] leading-[1] font-normal text-[#8E8E8E] no-underline hover:text-[#F4F4F4]"
                  >
                    {t.brand}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="h-[2px] w-full bg-[#F4F4F4]" />

          {/* Section label — same treatment as Work.  Smooth-scrolls
              to the L&P section on home; no dot indicator (sections
              don't get dots, only project pages do).  On /about it
              falls back to inactive. */}
          <Link
            href="/#publication"
            onClick={handleSectionClick("publication")}
            className={`self-start text-[26px] leading-[1] no-underline ${
              inPublication && !isAbout
                ? "font-bold text-[#F4F4F4]"
                : "font-normal text-[#8E8E8E] hover:text-[#F4F4F4]"
            }`}
          >
            Lecture &amp; Publication
          </Link>

          {/* About me — separate route, not a home-page section.  Bold
              when the user is on /about; no dot (consistent with the
              "sections don't get dots" rule). */}
          <Link
            href="/about"
            onClick={() => {
              killGridScrollTriggersIfLeavingPage("/about");
              close();
            }}
            className={`self-start text-[26px] leading-[1] no-underline ${
              isAbout
                ? "font-bold text-[#F4F4F4]"
                : "font-normal text-[#8E8E8E] hover:text-[#F4F4F4]"
            }`}
          >
            About me
          </Link>
        </div>
      </div>
    </>
  );
}
