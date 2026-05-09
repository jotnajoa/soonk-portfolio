"use client";

import Image from "next/image";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

// Outer face contour (assets/1_logo_outter_circle.svg, viewBox 177×238).
const OUTER_CIRCLE_D =
  "M88.2041 7.5C109.637 7.50018 129.641 19.1869 144.551 39.2734C159.46 59.3597 168.907 87.4618 168.907 118.827C168.907 150.193 159.46 178.295 144.551 198.381C129.641 218.467 109.637 230.154 88.2041 230.154C66.771 230.154 46.7666 218.468 31.8564 198.381C16.9467 178.295 7.5 150.193 7.5 118.827C7.50001 87.4618 16.9468 59.3597 31.8564 39.2734C46.7666 19.1868 66.771 7.5 88.2041 7.5Z";
const INNER_CIRCLE = { cx: 88.2039, cy: 192.931, r: 38.2229 };

// SVG circles wrapper (over the face).  These constants are also reused below
// to compute where the Lottie's "body" layer needs to land so the cross-fade
// is positionally seamless.
const SVG_TOP = 20;
const SVG_LEFT = 23;
const SVG_WIDTH = 29; // % of portrait container width

// Lottie canvas is 630 × 450; the "body" layer lives at (88.2, 293.83) inside
// it (= 14% horizontal, 65.3% vertical of the Lottie viewport).
// We want the body to render at the SAME screen point as the SVG outer ellipse
// center (~37.4%, ~42.7% of the portrait container).  Solving for a wrapper
// whose aspect matches the Lottie aspect (630/450 ≈ 1.4):
//   wrapper width  = 72% of container width
//   wrapper height = 60% of container height (matches Lottie aspect when the
//                    portrait container itself is 617×529)
//   wrapper left   = 27.3%   (so 14% of wrapper width lands at 37.4%)
//   wrapper top    = 3.5%    (so 65.3% of wrapper height lands at 42.7%)
const LOTTIE_TOP = 3.5;
const LOTTIE_LEFT = 27.3;
const LOTTIE_WIDTH = 72;
const LOTTIE_HEIGHT = 60;

function NameBlock() {
  return (
    <h1 className="flex items-baseline gap-3 lg:gap-4">
      <span className="hero-name text-[56px] leading-none font-extrabold text-[#F4F4F4] sm:text-[80px] lg:text-[128px]">
        Soonk
      </span>
      <span className="hero-designer text-base font-normal text-[#E3E3E3] sm:text-xl lg:text-[32px]">
        designer
      </span>
    </h1>
  );
}

function TaglineBlock() {
  return (
    <div>
      <h2 className="hero-tag-main text-[34px] leading-[1.1] font-bold text-[#F4F4F4] sm:text-5xl lg:text-[64px]">
        I&rsquo;m a
        <br />
        Product person
      </h2>
      <p className="hero-tag-sub mt-5 text-sm leading-relaxed font-normal text-[#E3E3E3] sm:text-base lg:mt-7 lg:text-[24px]">
        Design is one of my tools, not my goal
        <br />
        I build to find out what&rsquo;s true
      </p>
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  // Lottie is mounted only when the timeline reaches the BG-flip beat — that
  // way the user sees frame 0 (just-logo, no-shadow) at reveal, not somewhere
  // mid-animation while it was running invisibly.
  const [showLottie, setShowLottie] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    gsap.set(".hero-rect", { xPercent: 0, opacity: 1 });
    gsap.set(".hero-portrait", { opacity: 1 });
    gsap.set(".hero-svg-circles", { opacity: 1 });
    gsap.set(".hero-lottie-wrap", { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.4 });

    // Phase 1 [rest]   — everything visible, hold a beat.
    // Phase 2 [t=0.5]  — rect slides off-left, portrait dims to 40%.
    tl.to(".hero-rect", { xPercent: -130, opacity: 0, duration: 1.1, ease: "power3.in" }, 0.5);
    tl.to(".hero-portrait", { opacity: 0.4, duration: 0.9, ease: "power2.inOut" }, 0.7);

    // Phase 3 [t=1.55] — outer face circle traces in, then inner mouth circle.
    tl.to(".hero-outer-circle", { strokeDashoffset: 0, duration: 1.0, ease: "power2.inOut" }, 1.55);
    tl.to(".hero-inner-circle", { strokeDashoffset: 0, duration: 0.55, ease: "power2.inOut" }, 2.2);

    // Phase 4 [t=3.1]  — bg flips dark → soft-white, portrait dissolves, text inverts.
    tl.to(".hero-bg", { backgroundColor: "#EEEEEE", duration: 1.0, ease: "power2.inOut" }, 3.1);
    tl.to(".hero-portrait", { opacity: 0, duration: 0.8 }, 3.1);
    tl.to(".hero-name, .hero-tag-main", { color: "#1F1F1F", duration: 0.8 }, 3.1);
    tl.to(".hero-designer, .hero-tag-sub", { color: "#5D5D5D", duration: 0.8 }, 3.1);

    // Phase 5 [t=3.55] — cross-fade SVG circles → Lottie shadow morph.
    tl.to(".hero-svg-circles", { opacity: 0, duration: 0.5 }, 3.55);
    tl.add(() => setShowLottie(true), 3.55);
    tl.to(".hero-lottie-wrap", { opacity: 1, duration: 0.5 }, 3.6);

    tl.play(0);
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={ref} className="hero relative min-h-screen w-full overflow-hidden">
      <div className="hero-bg absolute inset-0 bg-[#1F1F1F]" aria-hidden />

      <div className="relative mx-auto grid min-h-screen w-full max-w-[1440px] grid-cols-1 items-center gap-y-8 px-6 py-12 lg:grid-cols-2 lg:gap-x-12 lg:px-16">
        {/* PORTRAIT — order 2 on mobile, left col on desktop */}
        <div className="order-2 lg:order-1 lg:col-start-1 lg:row-start-1 lg:self-center">
          <div className="relative mx-auto aspect-[617/529] w-full max-w-md lg:max-w-none">
            {/* Lime green rect — slides left out (Phase 2) */}
            <div
              className="hero-rect absolute bg-[#00FB00]"
              style={{ left: "-21%", top: "-17%", width: "100%", height: "91%" }}
              aria-hidden
            />

            {/* Portrait line-art, cropped to face/shoulders */}
            <div className="hero-portrait pointer-events-none absolute inset-0 overflow-hidden">
              <Image
                src="/hero/portrait.png"
                alt="Soonk Paik"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 90vw"
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

            {/* Lottie shadow morph — wrapper geometry computed so the Lottie's
                "body" layer (which lives at 14%, 65.3% of the 630×450 canvas)
                renders at the same screen point as the SVG outer ellipse center. */}
            <div
              className="hero-lottie-wrap pointer-events-none absolute"
              style={{
                top: `${LOTTIE_TOP}%`,
                left: `${LOTTIE_LEFT}%`,
                width: `${LOTTIE_WIDTH}%`,
                height: `${LOTTIE_HEIGHT}%`,
              }}
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
        </div>

        {/* NAME — order 1 on mobile (above portrait), top of right col on desktop */}
        <div className="order-1 lg:order-2 lg:col-start-2 lg:row-start-1 lg:hidden">
          <NameBlock />
        </div>

        {/* TAGLINE — order 3 on mobile (below portrait), hidden on desktop */}
        <div className="order-3 lg:hidden">
          <TaglineBlock />
        </div>

        {/* DESKTOP RIGHT COLUMN — name + tagline grouped, vertically centered */}
        <div className="hidden lg:order-2 lg:col-start-2 lg:row-start-1 lg:flex lg:flex-col lg:gap-12 lg:self-center">
          <NameBlock />
          <TaglineBlock />
        </div>
      </div>
    </section>
  );
}
