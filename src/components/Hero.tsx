"use client";

import Image from "next/image";
import gsap from "gsap";
import { useEffect, useRef } from "react";

// Foreground logo path (assets/2_logo_outterNinner_circle.svg, +11.78 Y to fit viewBox 0 0 411 290).
const MAIN_ELLIPSE_D =
  "M88.2041 19.2783C109.637 19.2785 129.641 30.9652 144.551 51.0518C159.46 71.138 168.907 99.2401 168.907 130.605C168.907 161.971 159.46 190.073 144.551 210.159C129.641 230.246 109.637 241.932 88.2041 241.933C66.771 241.933 46.7666 230.246 31.8564 210.159C16.9467 190.073 7.5 161.971 7.5 130.605C7.50001 99.2401 16.9468 71.138 31.8564 51.0518C46.7666 30.9651 66.771 19.2783 88.2041 19.2783Z";
const SMALL_CIRCLE = { cx: 88.2039, cy: 204.71, r: 38.2229 };

// Shadow keyframes — exact paths from Soonk's source SVGs in /assets/.
// Each lives in its own SVG element with its own viewBox so the logo anchor
// (cx 88.2, cy 166.578 for start/far, cy 130.606 for end) lines up with the
// foreground logo on screen. Crossfading between the 3 SVGs gives the
// "스으윽" pass-of-light effect using Soonk's exact shapes.
const SHADOW_START_BIG =
  "M162.457 27.5246C174.311 31.6268 183.587 46.9128 186.154 73.3296C188.651 99.0309 184.354 132.414 172.319 167.191C160.285 201.968 143.029 230.868 125.18 249.528C106.835 268.708 90.095 274.99 78.2412 270.889C66.3873 266.787 57.1101 251.501 54.5432 225.084C52.0458 199.383 56.3431 165.999 68.3777 131.222C80.4123 96.4449 97.6678 67.5463 115.516 48.8857C133.862 29.7055 150.603 23.4226 162.457 27.5246Z";
const SHADOW_START_SMALL =
  "M107.205 187.189C112.558 189.042 117.144 194.584 119.251 203.99C121.331 213.279 120.663 225.32 116.362 237.749C112.061 250.178 105.144 260.055 97.7671 266.072C90.2977 272.164 83.2669 273.686 77.9142 271.834C72.5616 269.982 67.9754 264.439 65.8691 255.034C63.7889 245.745 64.4561 233.704 68.757 221.275C73.0581 208.846 79.9756 198.968 87.3525 192.951C94.8219 186.859 101.853 185.337 107.205 187.189Z";

const SHADOW_FAR_BIG =
  "M550.255 60.3382C551.051 62.1788 551.29 64.8327 550.027 68.7889C548.744 72.8072 546.041 77.7067 541.642 83.4201C532.848 94.8436 518.245 108.285 498.617 122.858C459.459 151.931 401.668 184.507 334.54 213.535C267.412 242.563 204.095 262.357 156.092 270.976C132.03 275.295 112.234 276.729 97.8866 275.313C90.7109 274.604 85.2897 273.218 81.4834 271.4C77.736 269.611 75.9659 267.619 75.1699 265.778C74.374 263.938 74.1352 261.284 75.398 257.328C76.6806 253.309 79.3836 248.41 83.7824 242.697C92.5771 231.273 107.18 217.83 126.808 203.258C165.966 174.185 223.756 141.609 290.884 112.581C358.013 83.5524 421.331 63.7579 469.334 55.1399C493.395 50.82 513.191 49.3875 527.538 50.8039C534.714 51.5123 540.135 52.8985 543.941 54.7163C547.689 56.5061 549.459 58.4976 550.255 60.3382Z";
const SHADOW_FAR_SMALL =
  "M246.309 191.773C246.856 193.038 247.021 195.667 244.303 200.406C241.658 205.019 236.868 210.515 229.966 216.5C216.221 228.419 195.244 241.297 170.278 252.093C145.311 262.889 121.56 269.353 103.463 271.204C94.3742 272.133 87.0901 271.859 81.9169 270.627C76.6022 269.362 74.7991 267.441 74.252 266.176C73.7049 264.91 73.5404 262.281 76.2586 257.542C78.9045 252.929 83.6934 247.434 90.5955 241.449C104.34 229.53 125.317 216.652 150.283 205.856C175.25 195.06 199.001 188.596 217.099 186.745C226.187 185.815 233.472 186.09 238.645 187.321C243.96 188.587 245.762 190.508 246.309 191.773Z";

const SHADOW_END_BIG =
  "M373.765 58.2159C376.395 62.924 376.652 69.9872 372.555 80.0461C368.494 90.0193 360.583 101.756 349.06 114.499C326.069 139.925 289.864 168.083 245.84 192.679C201.816 217.273 158.857 233.342 125.152 239.59C108.26 242.722 94.1184 243.305 83.4963 241.536C72.7827 239.751 66.9027 235.829 64.2723 231.121C61.642 226.413 61.3848 219.349 65.4816 209.29C69.5433 199.317 77.4548 187.581 88.9771 174.838C111.968 149.412 148.172 121.253 192.196 96.658C236.22 72.0629 279.18 55.9953 312.885 49.7468C329.777 46.6153 343.919 46.0308 354.541 47.8005C365.254 49.5855 371.135 53.5077 373.765 58.2159Z";
const SHADOW_END_SMALL =
  "M173.462 170.12C175.727 174.173 174.946 181.844 167.046 192.595C159.524 202.831 146.858 213.835 130.715 222.853C114.573 231.872 98.5609 236.889 85.9009 237.928C72.6047 239.02 65.663 235.662 63.3987 231.609C61.1344 227.557 61.9147 219.885 69.8146 209.135C77.3367 198.899 90.004 187.894 106.146 178.876C122.289 169.858 138.3 164.84 150.96 163.801C164.256 162.71 171.198 166.067 173.462 170.12Z";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.set(
      ".hero-portrait, .hero-name-block, .hero-tag-block, .hero-shadow-svg-start, .hero-shadow-svg-far, .hero-shadow-svg-end",
      { opacity: 0 },
    );
    gsap.set(".hero-name-block, .hero-tag-block", { y: 16 });

    const tl = gsap.timeline({ delay: 0.5 });

    // 2 — portrait fades in over the dark canvas
    tl.to(".hero-portrait", { opacity: 1, duration: 1.2, ease: "power2.out" }, 0);

    // 3 — big ellipse traces in, small circle follows half-overlapped
    tl.to(".hero-ellipse-big", { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" }, 1.0);
    tl.to(".hero-ellipse-small", { strokeDashoffset: 0, duration: 1.0, ease: "power2.inOut" }, 1.5);

    // 4 — name/designer, then tagline
    tl.to(".hero-name-block", { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, 3.0);
    tl.to(".hero-tag-block", { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, 3.3);

    // 5 — bg flips dark→soft-white, portrait dissolves, ellipse + text invert
    tl.to(".hero-bg", { backgroundColor: "#EEEEEE", duration: 1.4, ease: "power2.inOut" }, 5.5);
    tl.to(".hero-portrait", { opacity: 0, duration: 1.0 }, 5.5);
    tl.to(".hero-svg", { color: "#1F1F1F", duration: 0.9 }, 5.7);
    tl.to(".hero-name, .hero-tag-main", { color: "#5D5D5D", duration: 0.9 }, 5.7);
    tl.to(".hero-designer, .hero-tag-sub", { color: "#888888", duration: 0.9 }, 5.7);

    // 6 — shadow passes through 3 of Soonk's exact shapes:
    //     start (overlapping logo) → farthest (super-extended right) → end (resting tilt).
    //     Crossfade between the 3 SVGs with overlapping eases gives the "스으윽" feel
    //     of light passing across.
    tl.to(".hero-shadow-svg-start", { opacity: 0.2, duration: 0.5, ease: "power2.out" }, 7.0);
    // hold start state for a beat
    tl.to(".hero-shadow-svg-start", { opacity: 0, duration: 1.3, ease: "power2.in" }, 7.8);
    tl.to(".hero-shadow-svg-far", { opacity: 0.2, duration: 1.3, ease: "power2.out" }, 7.8);
    // settle to end
    tl.to(".hero-shadow-svg-far", { opacity: 0, duration: 0.7, ease: "power2.inOut" }, 9.1);
    tl.to(".hero-shadow-svg-end", { opacity: 0.2, duration: 0.7, ease: "power2.inOut" }, 9.1);

    tl.play(0);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen w-full overflow-hidden">
      <div className="hero-bg absolute inset-0 bg-[#2A2A2A]" aria-hidden />
      <div className="relative container mx-auto flex min-h-screen flex-col items-center justify-center gap-6 px-6 py-16 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8 lg:px-16">
        {/* Name + designer — mobile top, desktop top-right */}
        <div className="hero-name-block order-1 mb-2 w-full self-start lg:order-2 lg:col-start-2 lg:row-start-1 lg:mb-0 lg:w-auto lg:self-end">
          <h1 className="flex items-baseline gap-2">
            <span className="hero-name text-7xl leading-none font-black text-zinc-100 sm:text-8xl lg:text-9xl">
              Soonk
            </span>
            <span className="hero-designer text-base font-light text-zinc-500 sm:text-lg lg:text-xl">
              designer
            </span>
          </h1>
        </div>

        {/* Portrait + 4 stacked SVGs (3 shadow keyframes + foreground logo).
            Each SVG positioned so its logo anchor lines up on screen. */}
        <div className="relative order-2 w-full max-w-md lg:order-1 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:max-w-none lg:self-center">
          <Image
            src="/hero/portrait.png"
            alt="Soonk Paik"
            width={1366}
            height={768}
            className="hero-portrait h-auto w-full"
            priority
          />

          {/* Shadow STATE A — start (overlapping the logo). viewBox 224×299. */}
          <svg
            viewBox="0 0 224 299"
            className="hero-shadow-svg-start pointer-events-none absolute"
            style={{ top: "15.5%", left: "36%", width: "19.07%", color: "#1F1F1F" }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            aria-hidden
          >
            <path d={SHADOW_START_BIG} stroke="currentColor" strokeWidth={15} />
            <path d={SHADOW_START_SMALL} stroke="currentColor" strokeWidth={13} />
          </svg>

          {/* Shadow STATE B — farthest (super-extended). viewBox 582×327. */}
          <svg
            viewBox="0 0 582 327"
            className="hero-shadow-svg-far pointer-events-none absolute"
            style={{ top: "15.5%", left: "36%", width: "49.53%", color: "#1F1F1F" }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            aria-hidden
          >
            <path d={SHADOW_FAR_BIG} stroke="currentColor" strokeWidth={15} />
            <path d={SHADOW_FAR_SMALL} stroke="currentColor" strokeWidth={13} />
          </svg>

          {/* Shadow STATE C — ending rest position. viewBox 411×290. */}
          <svg
            viewBox="0 0 411 290"
            className="hero-shadow-svg-end pointer-events-none absolute"
            style={{ top: "21%", left: "36%", width: "35%", color: "#1F1F1F" }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            aria-hidden
          >
            <path d={SHADOW_END_BIG} stroke="currentColor" strokeWidth={15} />
            <path d={SHADOW_END_SMALL} stroke="currentColor" strokeWidth={13} />
          </svg>

          {/* Foreground logo — drawn in step 3 via stroke-dashoffset. viewBox 411×290. */}
          <svg
            viewBox="0 0 411 290"
            className="hero-svg pointer-events-none absolute"
            style={{ top: "21%", left: "36%", width: "35%", color: "#8E8E8E" }}
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
