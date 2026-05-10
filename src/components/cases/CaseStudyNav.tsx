"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { tiles } from "@/data/tiles";
import { TileLogo } from "@/components/TileLogo";

// CaseStudyNav — sticky top bar shared by every /work/[slug] page.
//
// Two layouts share the same sticky bar:
//
//   ≥800px (desktop)
//     Soonk · | · Work [9 indicator squares] · | · Publication · | · Resume
//                                                            ← BACK TO PORTFOLIO
//
//   <800px (mobile)
//     [project number]  [logo]  [project name]                    ☰
//     The hamburger opens the same project picker the home-page MobileNav
//     uses, except items here navigate to /work/{slug} instead of
//     scrolling to data-tile-list anchors (which only exist on /).
//
// "Soonk" + "← BACK TO PORTFOLIO" + the inverted hamburger-menu's "Work"
// row use router.back() when the tab has any prior history, falling back
// to router.push("/") on direct loads.  router.back() lets the browser
// restore the user's scroll position on the home page so they don't have
// to re-watch the hero animation.

export default function CaseStudyNav({ currentSlug }: { currentSlug: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  // The clip-path circle for the menu open/close animation emanates from
  // the hamburger button.  Capture the button's screen position at click
  // time so the animation origin tracks layout shifts (e.g. resize).
  const [clipOrigin, setClipOrigin] = useState("calc(100% - 60px) 32px");

  const tile = tiles.find((t) => t.slug === currentSlug) ?? null;

  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const openMenu = () => {
    if (buttonRef.current) {
      const r = buttonRef.current.getBoundingClientRect();
      setClipOrigin(`${r.left + r.width / 2}px ${r.top + r.height / 2}px`);
    }
    setOpen(true);
  };
  const close = () => setOpen(false);

  // Lock body scroll while menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b-2 border-[#1F1F1F] bg-[#EEEEEE]/95 backdrop-blur">
        {/* ---- Mobile bar (<800) — project number + logo + name + hamburger ---- */}
        <div className="flex h-[64px] items-center justify-between px-[24px] tablet:hidden">
          <button
            type="button"
            onClick={goBack}
            className="flex cursor-pointer items-center gap-[10px]"
            aria-label="Back to portfolio"
          >
            {tile && (
              <span
                className="font-mono text-[14px] font-medium tracking-[0.04em] text-[#1F1F1F]"
                style={{
                  fontFamily:
                    "var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
                }}
              >
                {tile.id}
              </span>
            )}
            {tile && <TileLogo tileId={tile.id} />}
            <span className="text-[16px] leading-[0.92] font-bold text-[#1F1F1F]">
              {tile?.brand ?? "Soonk"}
            </span>
          </button>

          <button
            ref={buttonRef}
            onClick={openMenu}
            aria-label="Open menu"
            className="flex size-[44px] cursor-pointer flex-col items-center justify-center gap-[4px] rounded-full bg-[#1F1F1F] shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-[1px] hover:shadow-[0_8px_16px_rgba(0,0,0,0.25)]"
          >
            <span className="block h-[2px] w-[22px] bg-[#F4F4F4]" />
            <span className="block h-[2px] w-[22px] bg-[#F4F4F4]" />
            <span className="block h-[2px] w-[22px] bg-[#F4F4F4]" />
          </button>
        </div>

        {/* ---- Desktop bar (≥800) — full nav row ---- */}
        <nav className="mx-auto hidden max-w-[1200px] items-center gap-4 px-[32px] py-4 tablet:flex">
          <button
            type="button"
            onClick={goBack}
            className="cursor-pointer text-[16px] leading-[0.92] font-normal whitespace-nowrap text-[#5D5D5D] hover:text-[#1F1F1F]"
          >
            Soonk
          </button>
          <span className="h-6 w-px bg-[#A0A0A0]" aria-hidden />

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goBack}
              className="cursor-pointer text-[16px] leading-[0.92] font-semibold whitespace-nowrap text-[#1F1F1F] hover:underline"
            >
              Work
            </button>
            {tiles.map((t) => {
              const active = t.slug === currentSlug;
              return (
                <Link
                  key={t.id}
                  href={`/work/${t.slug}`}
                  aria-label={`${t.id} · ${t.brand}`}
                  title={`${t.id} · ${t.brand}`}
                  className={`size-4 border border-[#1F1F1F] transition-colors ${
                    active ? "bg-[#1F1F1F]" : "bg-transparent hover:bg-[#D9D9D9]"
                  }`}
                />
              );
            })}
          </div>

          <span className="h-6 w-px bg-[#A0A0A0]" aria-hidden />
          <Link
            href="/#publication"
            className="text-[16px] leading-[0.92] font-normal whitespace-nowrap text-[#5D5D5D] hover:text-[#1F1F1F]"
          >
            Publication
          </Link>
          <span className="h-6 w-px bg-[#A0A0A0]" aria-hidden />
          <Link
            href="/#resume"
            className="text-[16px] leading-[0.92] font-normal whitespace-nowrap text-[#5D5D5D] hover:text-[#1F1F1F]"
          >
            Resume
          </Link>

          <button
            type="button"
            onClick={goBack}
            className="ml-auto cursor-pointer text-[12px] tracking-[0.08em] text-[#5D5D5D] hover:text-[#1F1F1F]"
          >
            ← BACK TO PORTFOLIO
          </button>
        </nav>
      </header>

      {/* ---- Mobile menu overlay (clip-path circle expand from hamburger) ---- */}
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
          className={`flex h-full flex-col gap-[32px] p-[24px] transition-opacity duration-200 ${
            open ? "opacity-100 delay-300" : "opacity-0"
          }`}
        >
          <div className="flex items-start justify-between">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hamburger_logo.svg"
              alt=""
              aria-hidden
              className="h-[48px] w-auto shrink-0"
            />
            <button
              onClick={close}
              aria-label="Close menu"
              className="cursor-pointer text-3xl leading-none text-[#F4F4F4]"
            >
              ✕
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              close();
              goBack();
            }}
            className="self-start text-[32px] leading-[0.92] font-normal text-[#A0A0A0] hover:text-[#F4F4F4]"
          >
            Soonk
          </button>

          <div className="h-[2px] w-full bg-[#F4F4F4]" />

          <div className="flex flex-col gap-[16px]">
            <button
              onClick={() => {
                close();
                goBack();
              }}
              className="flex cursor-pointer items-center gap-[8px] self-start text-[32px] leading-[0.92] font-medium text-[#F4F4F4]"
            >
              <span>Work</span>
            </button>

            <ul className="flex flex-col gap-[16px] pl-1">
              {tiles.map((t) => {
                const active = t.slug === currentSlug;
                return (
                  <li key={t.id} className="flex items-center gap-[16px]">
                    <Link
                      href={`/work/${t.slug}`}
                      onClick={close}
                      className={`text-left text-[24px] leading-[0.92] no-underline ${
                        active
                          ? "font-bold text-[#F4F4F4]"
                          : "font-normal text-[#A0A0A0] hover:text-[#F4F4F4]"
                      }`}
                    >
                      {t.brand}
                    </Link>
                    {active && (
                      <span
                        aria-hidden
                        className="size-3 shrink-0 rounded-full bg-[#F4F4F4]"
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="h-[2px] w-full bg-[#F4F4F4]" />

          <Link
            href="/#publication"
            onClick={close}
            className="self-start text-[32px] leading-[0.92] font-normal text-[#A0A0A0] hover:text-[#F4F4F4] no-underline"
          >
            Publications
          </Link>

          <Link
            href="/#resume"
            onClick={close}
            className="self-start text-[32px] leading-[0.92] font-normal text-[#A0A0A0] hover:text-[#F4F4F4] no-underline"
          >
            Resume
          </Link>
        </div>
      </div>
    </>
  );
}
