"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";

// Lottie player loaded client-side only so its internal <canvas> mount /
// unmount stays inside the client lifecycle.  Without `ssr: false` the
// player's DOM gets created during SSR/hydration, and the cleanup on a
// route navigation can race with React's reconciler — that's a classic
// "Failed to execute 'removeChild'" trigger.
const DotLottieReact = dynamic(
  () =>
    import("@lottiefiles/dotlottie-react").then((m) => ({
      default: m.DotLottieReact,
    })),
  { ssr: false },
);

// Hero animation — six-phase scroll-triggered timeline.
//
//   1 [rest]   : dark bg, lime rect, line-art portrait visible, NO TEXT
//   2 [t=0.5]  : lime rect slides off-left, portrait dims to 40%
//   3 [t=1.55] : SVG outer face circle traces in, then inner mouth circle
//   4 [t=3.1]  : bg flips dark → soft-white, portrait dissolves
//   5 [t=3.55] : SVG circles cross-fade into Lottie shadow morph
//   6 [t=4.2]  : Soonk/designer/tagline/scroll-for-more fade in
//
// All hero text uses JetBrains Mono per Figma 123:2840 / 162:4106.
// "Scroll for more" stays Archivo Bold per Figma.
//
// Layout breakpoint = `xl:` (1280px), NOT `lg:`.  At lg (1024-1279) the
// horizontal Figma layout (logo+text inline) doesn't fit — text wraps and
// reads broken — so we keep the vertical mobile stack until we have enough
// width for the full Figma sizes (Soonk 128 + designer 32 inline = ~554px,
// plus a 280px logo + 64px gap, demands ~898px content + padding).

// Outer face contour (assets/1_logo_outter_circle.svg, viewBox 177×238).
const OUTER_CIRCLE_D =
  "M88.2041 7.5C109.637 7.50018 129.641 19.1869 144.551 39.2734C159.46 59.3597 168.907 87.4618 168.907 118.827C168.907 150.193 159.46 178.295 144.551 198.381C129.641 218.467 109.637 230.154 88.2041 230.154C66.771 230.154 46.7666 218.468 31.8564 198.381C16.9467 178.295 7.5 150.193 7.5 118.827C7.50001 87.4618 16.9468 59.3597 31.8564 39.2734C46.7666 19.1868 66.771 7.5 88.2041 7.5Z";
const INNER_CIRCLE = { cx: 88.2039, cy: 192.931, r: 38.2229 };

// SVG circles wrapper (over the face).
const SVG_TOP = 20;
const SVG_LEFT = 23;
const SVG_WIDTH = 29;

// Lottie wrapper geometry — body layer's on-screen position MUST match the
// SVG outer-circle center exactly, otherwise the SVG-→-Lottie cross-fade
// looks like the lens visibly jumps.
//
// Two invariants per breakpoint:
//   1. Wrapper aspect == 1.4 (Lottie canvas 630×450).  If it doesn't match,
//      the canvas letterboxes inside the wrapper and the body's pixel
//      position drifts from where the SVG circle traced.
//      Wrapper aspect = (W/H) × container_aspect, so as the container's
//      aspect changes, W/H has to change to keep the product at 1.4.
//   2. Wrapper LEFT/TOP positioned so body's intrinsic (14%, 65.3%) of
//      canvas lands on SVG outer-circle center (37.5%, 42.7% on desktop /
//      37.5%, 53.5% on mobile — the Y% differs because SVG height is
//      derived from container WIDTH but expressed in container HEIGHT).
//
// Container aspects:  desktop xl: 617/529 ≈ 1.166  ·  mobile: 617/360 ≈ 1.71
// Resulting Lottie wrapper sizes (as %s of the container):
//   desktop xl: left 25, top -7,  width 90, height 75
//   mobile:     left 29, top 4.5, width 61, height 75
// Both are applied via responsive Tailwind classes on the wrapper div.

// JetBrains Mono — applied to the hero typeset (matches Figma).
const MONO_STYLE: React.CSSProperties = {
  fontFamily:
    "var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
};

// "Soonk" + "designer" — inline header.  64 / 128 px (mobile / xl).
function NameBlock() {
  return (
    <h1
      className="flex flex-wrap items-baseline gap-x-3 gap-y-1 xl:gap-x-4"
      style={MONO_STYLE}
    >
      <span className="text-[64px] leading-[1.0] font-extrabold text-[#1F1F1F] xl:text-[128px]">
        Soonk
      </span>
      <span className="text-[24px] font-normal text-[#1F1F1F] xl:text-[32px]">
        designer
      </span>
    </h1>
  );
}

// "I'm a Product person" + 2-line tagline.  32/16 mobile · 48/24 xl.
// Mobile applies tighter tracking per Figma 162:4106.
function TaglineBlock() {
  return (
    <div style={MONO_STYLE}>
      <h2 className="text-[32px] leading-tight font-bold tracking-[-0.05em] text-[#1F1F1F] xl:text-[48px] xl:tracking-normal">
        I&rsquo;m a Product person
      </h2>
      <p className="mt-2 text-[16px] leading-snug font-normal tracking-[-0.05em] text-[#1F1F1F] xl:mt-4 xl:text-[24px] xl:tracking-normal">
        Design is one of my tools, not my goal
        <br />
        I build to find out what&rsquo;s true
      </p>
    </div>
  );
}

// (Removed) Inline ScrollForMore — Soonk noticed that the Hero's
// statically-placed "Scroll for more" was being drawn at the same time
// as the fixed <ScrollHint/> floater, so two of them showed up at once
// once the hint kicked in.  The fixed ScrollHint at the bottom of the
// viewport is now the single source of truth; it appears after the
// hero animation's lock expires and follows the user until ProjectNav
// fades in.

export default function Hero() {
  // Lottie is mounted only when the timeline reaches the cross-fade beat —
  // that way the user sees frame 0 (just-logo, no-shadow) at reveal, not
  // somewhere mid-animation while it ran invisibly.
  const [showLottie, setShowLottie] = useState(false);

  // Section ref — used both for `<section>` rendering and as the GSAP
  // context scope so cleanup tracks every animation owned by this Hero.
  const heroRef = useRef<HTMLElement>(null);

  // useGSAP (vs a raw useEffect) ensures the entire animation context is
  // reverted synchronously when this component unmounts — including any
  // lingering tweens on `.hero-text-reveal`, `.hero-lottie-wrap`, etc.
  // Without that, a Next-router navigation away from `/` while the
  // timeline is mid-flight can leave React's reconciler trying to clean
  // up DOM that GSAP has been mutating, surfacing the well-known
  // "Failed to execute 'removeChild' on 'Node'" crash.
  //
  // Returning-from-case-study fast path: when the user clicks "← BACK
  // TO PORTFOLIO" from a /work/{slug} page, the link lands here with a
  // `#work-list-XX` hash.  In that case we skip the 4-second intro
  // timeline entirely — jump every element to its end state, mount
  // Lottie immediately, and DON'T lock body scroll.  That way the
  // browser's native hash scroll can carry the user straight to the
  // matching tile without the dark-phase entry choreography replaying
  // every time they come back to the list.
  useGSAP(
    () => {
      const returningToList =
        typeof window !== "undefined" &&
        /^#work-list-\d{2}$/.test(window.location.hash);

      if (returningToList) {
        gsap.set(".hero-rect", { xPercent: -130, opacity: 0 });
        gsap.set(".hero-portrait", { opacity: 0 });
        gsap.set(".hero-svg-circles", { opacity: 0 });
        gsap.set(".hero-bg", { backgroundColor: "#EEEEEE" });
        gsap.set(".hero-lottie-wrap", { opacity: 1 });
        gsap.set(".hero-text-reveal", { opacity: 1 });
        setShowLottie(true);
        return;
      }

      gsap.set(".hero-rect", { xPercent: 0, opacity: 1 });
      gsap.set(".hero-portrait", { opacity: 1 });
      gsap.set(".hero-svg-circles", { opacity: 1 });
      gsap.set(".hero-lottie-wrap", { opacity: 0 });
      gsap.set(".hero-text-reveal", { opacity: 0 });

      const tl = gsap.timeline({ delay: 0.4 });

      tl.to(".hero-rect", { xPercent: -130, opacity: 0, duration: 1.1, ease: "power3.in" }, 0.5);
      tl.to(".hero-portrait", { opacity: 0.4, duration: 0.9, ease: "power2.inOut" }, 0.7);
      tl.to(".hero-outer-circle", { strokeDashoffset: 0, duration: 1.0, ease: "power2.inOut" }, 1.55);
      tl.to(".hero-inner-circle", { strokeDashoffset: 0, duration: 0.55, ease: "power2.inOut" }, 2.2);
      tl.to(".hero-bg", { backgroundColor: "#EEEEEE", duration: 1.0, ease: "power2.inOut" }, 3.1);
      tl.to(".hero-portrait", { opacity: 0, duration: 0.8 }, 3.1);
      tl.to(".hero-svg-circles", { opacity: 0, duration: 0.5 }, 3.55);
      tl.add(() => setShowLottie(true), 3.55);
      tl.to(".hero-lottie-wrap", { opacity: 1, duration: 0.5 }, 3.6);
      tl.to(".hero-text-reveal", { opacity: 1, duration: 0.7, ease: "power2.out" }, 4.2);

      tl.play(0);

      // Lock scroll for the first ~1.5s of the landing animation so the
      // user can't blast past the dark phase — long enough to keep the
      // rect-slides-out + portrait-fade beat readable, short enough not
      // to feel jammed (Soonk's tuning).  Body-style mutation is outside
      // GSAP's tracking, so we still need an explicit cleanup function
      // below.
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const unlockId = window.setTimeout(() => {
        document.body.style.overflow = prevOverflow;
      }, 1500);

      return () => {
        window.clearTimeout(unlockId);
        document.body.style.overflow = prevOverflow;
      };
    },
    { scope: heroRef },
  );

  return (
    <section
      ref={heroRef}
      className="hero relative min-h-screen w-full overflow-hidden"
    >
      <div className="hero-bg absolute inset-0 bg-[#1F1F1F]" aria-hidden />

      {/* Layout container.
          Mobile (<xl): vertical stack — name → portrait → tagline → scroll.
          Desktop (≥xl): horizontal split — portrait LEFT | name+tagline RIGHT,
          with scroll-for-more absolute-positioned at the bottom-center. */}
      <div className="relative mx-auto flex min-h-screen w-full max-w-[1200px] flex-col items-center justify-center gap-y-3 px-8 py-12 xl:flex-row xl:items-center xl:justify-center xl:gap-y-8 xl:gap-x-16 xl:px-8 xl:py-12">
        {/* Mobile: name above portrait */}
        <div style={{ opacity: 0 }}
          className="hero-text-reveal order-1 xl:hidden">
          <NameBlock />
        </div>

        {/* Portrait / lens-logo container.
            aspect-[617/529] is the original portrait.png aspect AND the
            aspect that makes the inner Lottie wrapper (90% × 75%) match
            the Lottie canvas's 1.4 ratio — so the body renders at full
            natural scale rather than shrinking to fit a mismatched wrapper.
            Desktop xl gets a fixed width of 380px so the logo body is
            visibly comparable to Figma's 176×238 lens.

            IMPORTANT: this is ONE div, not two.  Earlier I had a separate
            outer `<div className="order-2 xl:order-1 xl:shrink-0">` wrapper
            that contained this aspect-ratio div with `w-full` — that
            created a circular sizing reference (outer's auto width depends
            on inner's w-full, which depends on outer's width).  In
            flex-col items-center, browsers resolved this as 0-width on
            mobile, collapsing the entire portrait/rect/lottie area.  Hence
            the all-black mobile dark phase the user reported. */}
        <div className="relative order-2 mx-auto aspect-[617/360] w-full max-w-md xl:order-1 xl:aspect-[617/529] xl:w-[380px] xl:max-w-none xl:shrink-0">
            {/* Lime green rect — slides off in Phase 2 */}
            <div
              className="hero-rect absolute bg-[#00FB00]"
              style={{ left: "-21%", top: "-17%", width: "100%", height: "91%" }}
              aria-hidden
            />
            {/* Portrait line-art (cropped to face/shoulders) */}
            <div className="hero-portrait pointer-events-none absolute inset-0 overflow-hidden">
              <Image
                src="/hero/portrait.png"
                alt="Soonk Paik"
                fill
                priority
                sizes="(min-width: 1280px) 380px, 90vw"
                className="object-cover"
                style={{ objectPosition: "60% 50%" }}
              />
            </div>
            {/* SVG face circles — drawn during dark phase, fade out as Lottie takes over */}
            <svg
              viewBox="0 0 177 238"
              className="hero-svg-circles pointer-events-none absolute"
              style={{
                top: `${SVG_TOP}%`,
                left: `${SVG_LEFT}%`,
                width: `${SVG_WIDTH}%`,
                color: "#8E8E8E",
              }}
              fill="none"
              aria-hidden
            >
              <path
                className="hero-outer-circle"
                d={OUTER_CIRCLE_D}
                stroke="currentColor"
                strokeWidth={15}
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1}
              />
              <circle
                className="hero-inner-circle"
                cx={INNER_CIRCLE.cx}
                cy={INNER_CIRCLE.cy}
                r={INNER_CIRCLE.r}
                stroke="currentColor"
                strokeWidth={13}
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1}
              />
            </svg>
            {/* Lottie shadow morph — see LOTTIE constants comment above for
                why mobile (29 / 4.5 / 61 / 75) and desktop (25 / -7 / 90 /
                75) have different positions.  opacity:0 stays inline so the
                pre-hydration render keeps the lens hidden. */}
            <div
              className="hero-lottie-wrap pointer-events-none absolute left-[29%] top-[4.5%] h-[75%] w-[61%] xl:left-[25%] xl:top-[-7%] xl:w-[90%]"
              style={{ opacity: 0 }}
              aria-hidden
            >
              {showLottie && (
                <DotLottieReact
                  src="/hero/logo_animation.lottie"
                  autoplay
                  loop={false}
                  style={{ width: "100%", height: "100%" }}
                />
              )}
            </div>
        </div>

        {/* Mobile: tagline below portrait */}
        <div style={{ opacity: 0 }}
          className="hero-text-reveal order-3 xl:hidden">
          <TaglineBlock />
        </div>

        {/* Desktop right column: NAME + TAGLINE grouped (gap-4).
            xl:flex-1 + xl:max-w-[662px] makes the column claim the
            available remaining row space (capped at Figma's 662px),
            instead of shrink-to-content which forced the inline name
            to wrap when natural content width edged past the column. */}
        <div style={{ opacity: 0 }}
          className="hero-text-reveal hidden xl:order-2 xl:flex xl:flex-1 xl:max-w-[662px] xl:flex-col xl:gap-4">
          <NameBlock />
          <TaglineBlock />
        </div>

      </div>

      {/* No inline "Scroll for more" here — the fixed <ScrollHint/>
          renders bottom-center for the entire post-hero scroll range
          (see components/ScrollHint.tsx). */}
    </section>
  );
}
