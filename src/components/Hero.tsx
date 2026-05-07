"use client";

import Image from "next/image";
import gsap from "gsap";
import { useEffect, useRef } from "react";

// Main logo path exported from assets/2_logo_outterNinner_circle.svg
// (translated +11.78 on Y to fit a viewBox 0 0 411 290 — same canvas as the shadow source).
const MAIN_ELLIPSE_D =
  "M88.2041 19.2783C109.637 19.2785 129.641 30.9652 144.551 51.0518C159.46 71.138 168.907 99.2401 168.907 130.605C168.907 161.971 159.46 190.073 144.551 210.159C129.641 230.246 109.637 241.932 88.2041 241.933C66.771 241.933 46.7666 230.246 31.8564 210.159C16.9467 190.073 7.5 161.971 7.5 130.605C7.50001 99.2401 16.9468 71.138 31.8564 51.0518C46.7666 30.9651 66.771 19.2783 88.2041 19.2783Z";

const SMALL_CIRCLE = { cx: 88.2039, cy: 204.71, r: 38.2229 };

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.set(
      ".hero-portrait, .hero-name-block, .hero-tag-block, .hero-shadow-group",
      { opacity: 0 },
    );
    gsap.set(".hero-name-block, .hero-tag-block", { y: 16 });
    // Shadow pivots from the logo's left edge so the stretch reads as outward, not centered.
    gsap.set(".hero-shadow-group", {
      transformOrigin: "0% 50%",
      transformBox: "fill-box",
    });

    const tl = gsap.timeline({ delay: 0.4 });

    // 2 — portrait fades in over the dark canvas
    tl.to(".hero-portrait", { opacity: 1, duration: 0.8, ease: "power2.out" }, 0);

    // 3 — big ellipse traces in, small circle follows half-overlapped
    tl.to(".hero-ellipse-big", { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" }, 0.5);
    tl.to(".hero-ellipse-small", { strokeDashoffset: 0, duration: 0.7, ease: "power2.inOut" }, 0.85);

    // 4 — name/designer, then tagline
    tl.to(".hero-name-block", { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 1.8);
    tl.to(".hero-tag-block", { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 2.0);

    // 5 — bg flips dark→white, portrait dissolves, ellipse + text invert
    tl.to(".hero-bg", { backgroundColor: "#FFFFFF", duration: 1.2, ease: "power2.inOut" }, 3.5);
    tl.to(".hero-portrait", { opacity: 0, duration: 1.0 }, 3.5);
    tl.to(".hero-svg", { color: "#1F1F1F", duration: 0.7 }, 3.7);
    tl.to(".hero-name, .hero-tag-main", { color: "#1F1F1F", duration: 0.7 }, 3.7);
    tl.to(".hero-designer, .hero-tag-sub", { color: "#666666", duration: 0.7 }, 3.7);

    // 6 — shadow first lands on top of the logo, holds a beat, then stretches up-right.
    //   The shadow group renders the SAME shape as the logo — so at scale 1 / rotate 0 it
    //   overlaps perfectly. The stretch is pure CSS transform, eased with expo.out for the
    //   "스으윽" feel.
    tl.to(".hero-shadow-group", { opacity: 0.2, duration: 0.35, ease: "power2.out" }, 5.0);
    tl.to(
      ".hero-shadow-group",
      {
        scaleX: 2.3,
        scaleY: 0.85,
        rotation: -14,
        duration: 1.6,
        ease: "expo.out",
      },
      5.55,
    );

    tl.play(0);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden"
    >
      <div className="hero-bg absolute inset-0 bg-[#2A2A2A]" aria-hidden />
      <div className="relative container mx-auto flex min-h-screen flex-col items-center justify-center gap-6 px-6 py-16 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8 lg:px-16">
        {/* Name + designer — mobile top, desktop top-right */}
        <div className="hero-name-block order-1 mb-2 w-full self-start lg:order-2 lg:col-start-2 lg:row-start-1 lg:mb-0 lg:w-auto lg:self-end">
          <h1 className="flex items-baseline gap-2">
            <span className="hero-name text-7xl leading-none font-bold text-zinc-100 sm:text-8xl lg:text-9xl">
              Soonk
            </span>
            <span className="hero-designer text-base font-light text-zinc-500 sm:text-lg lg:text-xl">
              designer
            </span>
          </h1>
        </div>

        {/* Portrait + SVG overlay — mobile middle, desktop spans both rows on left.
            SVG position is tuned so the big ellipse sits over the face. Tweak top/left
            here if the alignment ever drifts. */}
        <div className="relative order-2 w-full max-w-md lg:order-1 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:max-w-none lg:self-center">
          <Image
            src="/hero/portrait.png"
            alt="Soonk Paik"
            width={1366}
            height={768}
            className="hero-portrait h-auto w-full"
            priority
          />
          <svg
            viewBox="0 0 411 290"
            className="hero-svg pointer-events-none absolute"
            style={{ top: "17%", left: "34%", width: "35%", color: "#8E8E8E" }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            {/* Shadow — rendered first so it sits BEHIND the logo. Same shape as logo
                so it overlaps at scale 1; CSS transforms stretch it sideways in step 6. */}
            <g className="hero-shadow-group">
              <path
                d={MAIN_ELLIPSE_D}
                stroke="currentColor"
                strokeWidth={15}
              />
              <circle
                cx={SMALL_CIRCLE.cx}
                cy={SMALL_CIRCLE.cy}
                r={SMALL_CIRCLE.r}
                stroke="currentColor"
                strokeWidth={13}
              />
            </g>

            {/* Main logo — drawn via stroke-dashoffset in step 3. */}
            <path
              className="hero-ellipse-big"
              d={MAIN_ELLIPSE_D}
              stroke="currentColor"
              strokeWidth={15}
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1}
            />
            <circle
              className="hero-ellipse-small"
              cx={SMALL_CIRCLE.cx}
              cy={SMALL_CIRCLE.cy}
              r={SMALL_CIRCLE.r}
              stroke="currentColor"
              strokeWidth={13}
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1}
            />
          </svg>
        </div>

        {/* Tagline — mobile bottom, desktop middle-right */}
        <div className="hero-tag-block order-3 mt-2 w-full self-start lg:order-3 lg:col-start-2 lg:row-start-2 lg:mt-0">
          <h2 className="hero-tag-main mb-3 text-4xl leading-tight font-bold text-zinc-100 sm:text-5xl lg:text-6xl">
            I&apos;m a
            <br />
            Product person
          </h2>
          <p className="hero-tag-sub text-sm leading-relaxed text-zinc-500 sm:text-base">
            Design is one of my tools, not my goal
            <br />
            I build to find out what&apos;s true
          </p>
        </div>
      </div>
    </section>
  );
}
