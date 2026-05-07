"use client";

import Image from "next/image";
import gsap from "gsap";
import { useEffect, useRef } from "react";

// SVG paths exported from the source canvas (assets/4_logo_inverse_and_shadow.svg).
// viewBox 0 0 411 290. Logo (big ellipse + small circle) sits on the left of the viewBox;
// the shadow paths extend up-right from the logo.
const MAIN_ELLIPSE_D =
  "M88.2041 19.2783C109.637 19.2785 129.641 30.9652 144.551 51.0518C159.46 71.138 168.907 99.2401 168.907 130.605C168.907 161.971 159.46 190.073 144.551 210.159C129.641 230.246 109.637 241.932 88.2041 241.933C66.771 241.933 46.7666 230.246 31.8564 210.159C16.9467 190.073 7.5 161.971 7.5 130.605C7.50001 99.2401 16.9468 71.138 31.8564 51.0518C46.7666 30.9651 66.771 19.2783 88.2041 19.2783Z";

const SHADOW_BIG_D =
  "M373.765 58.2159C376.395 62.924 376.652 69.9872 372.555 80.0461C368.494 90.0193 360.583 101.756 349.06 114.499C326.069 139.925 289.864 168.083 245.84 192.679C201.816 217.273 158.857 233.342 125.152 239.59C108.26 242.722 94.1184 243.305 83.4963 241.536C72.7827 239.751 66.9027 235.829 64.2723 231.121C61.642 226.413 61.3848 219.349 65.4816 209.29C69.5433 199.317 77.4548 187.581 88.9771 174.838C111.968 149.412 148.172 121.253 192.196 96.658C236.22 72.0629 279.18 55.9953 312.885 49.7468C329.777 46.6153 343.919 46.0308 354.541 47.8005C365.254 49.5855 371.135 53.5077 373.765 58.2159Z";

const SHADOW_SMALL_D =
  "M173.462 170.12C175.727 174.173 174.946 181.844 167.046 192.595C159.524 202.831 146.858 213.835 130.715 222.853C114.573 231.872 98.5609 236.889 85.9009 237.928C72.6047 239.02 65.663 235.662 63.3987 231.609C61.1344 227.557 61.9147 219.885 69.8146 209.135C77.3367 198.899 90.004 187.894 106.146 178.876C122.289 169.858 138.3 164.84 150.96 163.801C164.256 162.71 171.198 166.067 173.462 170.12Z";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.set(
      ".hero-portrait, .hero-name-block, .hero-tag-block, .hero-shadow-group",
      { opacity: 0 },
    );
    gsap.set(".hero-name-block, .hero-tag-block", { y: 16 });

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

    // 6 — shadow eases out sideways
    tl.to(".hero-shadow-group", { opacity: 0.2, duration: 0.4 }, 5.0);
    tl.to(".hero-shadow-big", { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" }, 5.0);
    tl.to(".hero-shadow-small", { strokeDashoffset: 0, duration: 1.0, ease: "power2.inOut" }, 5.2);

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
            <span className="hero-name text-6xl leading-none font-bold text-zinc-100 sm:text-7xl lg:text-8xl">
              Soonk
            </span>
            <span className="hero-designer text-base font-light text-zinc-500 sm:text-lg lg:text-xl">
              designer
            </span>
          </h1>
        </div>

        {/* Portrait + SVG overlay — mobile middle, desktop spans both rows on left */}
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
            style={{ top: "20%", left: "30%", width: "35%", color: "#8E8E8E" }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
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
              cx={88.2039}
              cy={204.71}
              r={38.2229}
              stroke="currentColor"
              strokeWidth={13}
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1}
            />
            <g className="hero-shadow-group">
              <path
                className="hero-shadow-big"
                d={SHADOW_BIG_D}
                stroke="currentColor"
                strokeWidth={15}
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1}
              />
              <path
                className="hero-shadow-small"
                d={SHADOW_SMALL_D}
                stroke="currentColor"
                strokeWidth={13}
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1}
              />
            </g>
          </svg>
        </div>

        {/* Tagline — mobile bottom, desktop middle-right */}
        <div className="hero-tag-block order-3 mt-2 w-full self-start lg:order-3 lg:col-start-2 lg:row-start-2 lg:mt-0">
          <h2 className="hero-tag-main mb-3 text-3xl leading-tight font-bold text-zinc-100 sm:text-4xl lg:text-5xl">
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
