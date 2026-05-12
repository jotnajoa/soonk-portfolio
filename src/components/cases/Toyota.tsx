"use client";

import { useEffect, useRef, useState } from "react";
import CaseStudyLeftNav, {
  type CaseStudySection,
} from "./CaseStudyLeftNav";

// Toyota Guidehub case study.
//
// Spec source: /Volumes/External/Portfolio_Website_26/Toyota_Guidehub_Spec.md
//
// Visual system: pure monochrome (no chromatic accent).  Structurally the
// page follows the same Intro → Problem(s) → Fix → Impact arc as GIA,
// rebuilt section-by-section to address feedback (no random beat
// dividers, no opinions about other designers, real screenshots instead
// of placeholders).

const MONO: React.CSSProperties = {
  fontFamily:
    "var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
};

const SECTIONS: CaseStudySection[] = [
  { id: "intro", num: "01", label: "Intro" },
  { id: "problem", num: "02", label: "The problems", star: true },
  { id: "fix", num: "03", label: "The fix" },
  { id: "impact", num: "04", label: "Impact" },
];

// ============================================================================
// Reusable atoms
// ============================================================================

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-[18px] text-[12px] tracking-[0.16em] font-medium text-[#5D5D5D]">
      {children}
    </p>
  );
}

function SectionHead({ n, title }: { n: string; title: React.ReactNode }) {
  return (
    <div className="mb-[22px] grid grid-cols-[80px_1fr] items-start gap-[18px] min-[960px]:grid-cols-[110px_1fr] min-[960px]:gap-[24px]">
      <div className="text-[64px] leading-[0.85] font-extrabold tracking-[-0.05em] text-[#1F1F1F] min-[960px]:text-[88px]">
        {n}
      </div>
      <h2 className="max-w-[720px] pt-1 text-[24px] leading-[1.25] font-medium tracking-[-0.02em] text-[#1F1F1F] min-[960px]:pt-[10px] min-[960px]:text-[32px]">
        {title}
      </h2>
    </div>
  );
}

function Lede({ children }: { children: React.ReactNode }) {
  return (
    <p className="my-[18px] max-w-[680px] text-[18px] leading-[1.55] font-medium text-[#1F1F1F]">
      {children}
    </p>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <p className="my-[14px] max-w-[680px] text-[16px] leading-[1.7] text-[#1F1F1F]">
      {children}
    </p>
  );
}

function SubH({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-[28px] mb-[10px] max-w-[680px] text-[20px] leading-[1.3] font-medium tracking-[-0.01em] text-[#1F1F1F] min-[560px]:text-[22px]">
      {children}
    </h3>
  );
}

function Strong({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold">{children}</strong>;
}

// Section wrapper — first section just sets scroll-margin; subsequent
// sections add a 56-px top spacer + hairline rule.  Matches GIA's pattern,
// drops the "BEAT N · ..." beat-divider chips from the earlier Toyota draft
// (those were the random dividers the feedback called out).
function Section({
  id,
  first = false,
  children,
}: {
  id: string;
  first?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={
        first
          ? "scroll-mt-[80px] pt-[40px] tablet:pt-[56px]"
          : "mt-[56px] scroll-mt-[80px] border-t border-[#A0A0A0] pt-[56px]"
      }
    >
      {children}
    </section>
  );
}

// ============================================================================
// §01 Hero
// ============================================================================

// Inline modal trigger ✦.  Renders the underlined phrase + glyph as a single
// <button>; opens the PCA definition dialog.
function PcaTrigger({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      aria-label="What is PCA approval?"
      className="group inline-flex items-baseline gap-[4px] cursor-help align-baseline"
    >
      <span className="font-medium text-[#1F1F1F] underline decoration-[#5D5D5D] decoration-[0.5px] underline-offset-[2px] transition-all group-hover:font-semibold group-hover:decoration-[#1F1F1F]">
        Combo PCA approval
      </span>
      <span
        className="text-[12px] text-[#1F1F1F] transition-transform duration-200 group-hover:rotate-45"
        aria-hidden
      >
        ✦
      </span>
    </button>
  );
}

function PcaModal({
  dialogRef,
  onClose,
}: {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  onClose: () => void;
}) {
  return (
    <dialog
      ref={dialogRef}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      className="m-auto max-h-[80vh] max-w-[560px] border-2 border-[#1F1F1F] bg-[#EEEEEE] p-0 backdrop:bg-[#1F1F1F]/60"
    >
      <div className="relative flex max-h-[80vh] flex-col overflow-y-auto p-[32px] tablet:p-[48px]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-[16px] right-[16px] flex h-[32px] w-[32px] items-center justify-center text-[24px] leading-none text-[#5D5D5D] transition-colors hover:text-[#1F1F1F]"
        >
          ×
        </button>

        <div className="flex flex-col gap-[16px]">
          <Eyebrow>+ Definition</Eyebrow>
          <h3 className="text-[24px] leading-[1.3] font-medium text-[#1F1F1F] tablet:text-[28px]">
            What is PCA approval?
          </h3>
          <p className="text-[16px] leading-[1.7] text-[#1F1F1F]">
            <Strong>PCA (Product Configuration Approval)</Strong> is
            Toyota&rsquo;s internal validation process for vehicle
            &ldquo;Guides&rdquo; — the master configuration specs that
            downstream operations consume.
          </p>
          <p className="text-[16px] leading-[1.7] text-[#1F1F1F]">
            The <Strong>Combo PCA workflow</Strong> specifically covers the
            multi-persona path from auto-generated PCA codes through DSM
            review, UUU code assignment, and function-kind selection — before
            a Guide is approved and propagates downstream.
          </p>
          <div className="mt-[16px] border-t border-[#1F1F1F]/30 pt-[16px]">
            <p className="text-[12px] leading-[1.5] italic text-[#5D5D5D]">
              This case study is about how the design and PMO teams worked
              together — not about the PCA business logic itself. The
              definition is here for context only.
            </p>
          </div>
        </div>
      </div>
    </dialog>
  );
}

function PcaApprovalFlow() {
  const steps: { num: string; label: string }[] = [
    { num: "01", label: "PC Manager approves" },
    { num: "02", label: "PCA codes auto-generate" },
    { num: "03", label: "DSM reviews & validates" },
    { num: "04", label: "UUU codes + function kind assigned" },
    { num: "05", label: "Guide approved, propagates downstream" },
  ];
  // Left-aligned 5-up flow.  Every box renders at the SAME width — earlier
  // versions had a chevron `›` between cells 1–4 inside the flex item, so
  // cell 5's box grew by the chevron's width and the row read uneven on
  // the right.  Chevrons removed; the grid gap carries the rhythm.
  return (
    <div className="my-[28px] flex flex-col items-start gap-[10px]">
      <div className="grid w-full max-w-[760px] grid-cols-1 gap-[10px] tablet:grid-cols-5 tablet:gap-[12px]">
        {steps.map((s) => (
          <div
            key={s.num}
            className="flex flex-col items-start gap-[6px] border border-[#1F1F1F]/30 px-[12px] py-[10px]"
          >
            <span
              className="text-[12px] tracking-[0.08em] text-[#A0A0A0]"
              style={MONO}
            >
              {s.num}
            </span>
            <span className="text-[12px] leading-[1.3] font-medium text-[#1F1F1F]">
              {s.label}
            </span>
          </div>
        ))}
      </div>
      <p
        className="text-[12px] tracking-[0.04em] text-[#5D5D5D]"
        style={MONO}
      >
        PCA approval flow — where the engagement lived
      </p>
    </div>
  );
}

function SectionHero({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section
      id="intro"
      className="mx-auto max-w-[1200px] px-[32px] pt-[40px] pb-[40px] min-[560px]:pt-[64px] min-[560px]:pb-[48px]"
    >
      <Eyebrow>+ 01 / Intro</Eyebrow>

      {/* Toyota wordmark — SVG logo glyph + plain wordmark, matched to
          the POMEs hero scale (68 / 92 / 128 px, font-semibold,
          tracking -0.05) so every case-study hero anchors on the same
          typographic ramp.  No project number on the wordmark — the
          canonical 01–04 marker lives in the top CaseStudyNav and the
          side rail.  Logo height tracks the wordmark line-height so
          they share a baseline. */}
      <div className="mb-[48px] flex flex-wrap items-end gap-[20px] leading-none min-[560px]:mb-[64px] min-[560px]:gap-[28px] min-[960px]:mb-[72px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/work/toyota/toyota-logo.svg"
          alt="Toyota"
          className="h-[64px] w-auto shrink-0 min-[560px]:h-[82px] min-[960px]:h-[104px]"
        />
        <span className="text-[68px] font-semibold leading-[0.9] tracking-[-0.05em] text-[#1F1F1F] min-[560px]:text-[92px] min-[960px]:text-[128px]">
          Guidehub
        </span>
      </div>

      {/* Tagline — POMEs hero spec (24 / 28 / 36, leading 1.2, max-w 620). */}
      <p className="mb-[36px] max-w-[620px] text-[24px] leading-[1.2] font-medium tracking-[-0.02em] text-[#1F1F1F] min-[560px]:text-[28px] min-[960px]:text-[36px]">
        Brought in as emergency support after an executive escalation —
        diagnosed a broken upstream artifact and restructured the relay
        that produced the surface symptoms.
      </p>

      {/* Meta dl — POMEs spec (110 px label col, 18 gap, 14 py, dt 12 px
          Archivo medium tracked, dd 16 px).  4 rows: role / scope /
          timeline / status. */}
      <dl className="mb-[40px] max-w-[760px] border-t border-[#A0A0A0]">
        {[
          ["Role", "Senior designer"],
          [
            "Impact",
            "Client trust recovery · award reception",
          ],
          ["Timeline", "Sep 2023 – Dec 2023"],
          ["Status", "Shipped"],
        ].map(([l, v]) => (
          <div
            key={l}
            className="grid grid-cols-[110px_1fr] items-baseline gap-[18px] border-b border-[#A0A0A0] py-[14px]"
          >
            <dt className="text-[12px] font-medium tracking-[0.06em] text-[#5D5D5D]">
              {l}
            </dt>
            <dd className="text-[16px] leading-[1.5] text-[#1F1F1F]">{v}</dd>
          </div>
        ))}
      </dl>

      {/* Project context — short paragraph + flow.  Modal trigger on
          "Combo PCA approval" gives the reviewer the business term
          without bloating the body. */}
      <p className="max-w-[760px] text-[16px] leading-[1.7] text-[#1F1F1F]">
        Toyota Guidehub is Toyota&rsquo;s internal supply-chain operations
        platform. This engagement focused on the{" "}
        <PcaTrigger onOpen={onOpenModal} /> workflow — a multi-step flow
        letting Distribution Service Manager personas review vehicle
        configuration codes across linked sub-guides before approvals
        propagated downstream. When I joined, the project had been
        escalated to executive review and the consulting partner had been
        switched mid-engagement. Trust was eroding.{" "}
        <Strong>
          I was brought in as senior emergency support to firefight.
        </Strong>
      </p>

      <PcaApprovalFlow />
    </section>
  );
}

// ============================================================================
// §02 The problems
// ============================================================================

// Image asset frame for the in-the-wild Toyota screenshots.  Light bg, soft
// border, caption underneath — keeps these reading as evidence (not
// product showcase) so they don't compete with the analysis next to them.
function Evidence({
  src,
  alt,
  caption,
  maxWidth = 680,
}: {
  src: string;
  alt: string;
  caption: string;
  maxWidth?: number;
}) {
  return (
    <figure
      className="my-[18px] overflow-hidden rounded-[6px] border border-[#1F1F1F]/15 bg-white"
      style={{ maxWidth }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="block h-auto w-full" />
      <figcaption
        className="border-t border-[#1F1F1F]/15 bg-[#F4F4F4] px-[14px] py-[8px] text-[11px] tracking-[0.06em] text-[#5D5D5D]"
        style={MONO}
      >
        {caption}
      </figcaption>
    </figure>
  );
}

// 3-up summary card grid used at the top of §02.  Short, scannable.  Each
// card is just a numbered title + one-line summary — the detailed analysis
// + screenshots sit below.
function ProblemSummary() {
  const items: { n: string; title: string; body: string }[] = [
    {
      n: "01",
      title: "Action clarity",
      body: "Every CTA was rendered as a primary button. Users couldn't tell which action was the next step.",
    },
    {
      n: "02",
      title: "Color semantics",
      body: "Green / blue / red meant different things on different screens. The user's learned mapping was broken.",
    },
    {
      n: "03",
      title: "Viewport reality",
      body: "Wireframes only worked on an infinite Figma canvas. At the real 1280-px implementation breakpoint, layouts broke.",
    },
  ];
  return (
    <div className="my-[24px] grid grid-cols-1 gap-[14px] min-[560px]:grid-cols-3 min-[560px]:gap-[18px]">
      {items.map((p) => (
        <article
          key={p.n}
          className="flex flex-col gap-[8px] rounded-[8px] border border-[#1F1F1F]/20 bg-[#F4F4F4] px-[18px] py-[16px]"
        >
          <span
            className="text-[12px] tracking-[0.16em] font-medium text-[#A0A0A0]"
            style={MONO}
          >
            {p.n}
          </span>
          <h3 className="text-[18px] leading-[1.3] font-medium text-[#1F1F1F]">
            {p.title}
          </h3>
          <p className="text-[14px] leading-[1.55] text-[#5D5D5D]">{p.body}</p>
        </article>
      ))}
    </div>
  );
}

// BRD relay diagram — current (broken) state.  Used by both Problem 02
// (to show the broken relay) and the Fix section (to contrast against
// the improved version).  Boundary box around UI atoms makes it
// obvious that UI specs are leaking out of the PMO step where they
// shouldn't exist.
function CommunicationBreakdown({
  title,
  caption,
  variant = "broken",
}: {
  title?: string;
  caption: string;
  variant?: "broken" | "fixed";
}) {
  const isBroken = variant === "broken";
  return (
    <figure className="my-[24px] flex flex-col gap-[12px]">
      <svg
        viewBox="0 0 960 320"
        preserveAspectRatio="xMidYMid meet"
        className="w-full"
      >
        {/* CLIENT box */}
        <g>
          <rect
            x={20}
            y={70}
            width={180}
            height={120}
            fill="none"
            stroke="#5D5D5D"
            strokeWidth={0.5}
            rx={8}
          />
          <text
            x={110}
            y={60}
            textAnchor="middle"
            fontSize={11}
            letterSpacing="1.76"
            fill="#5D5D5D"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fontWeight={500}
          >
            REQUIREMENTS
          </text>
          <text
            x={110}
            y={138}
            textAnchor="middle"
            fontSize={20}
            fill="#1F1F1F"
            fontWeight={500}
          >
            CLIENT
          </text>
        </g>

        {/* Arrow CLIENT → PMO */}
        <g>
          <line
            x1={210}
            y1={130}
            x2={285}
            y2={130}
            stroke="#1F1F1F"
            strokeWidth={1.5}
          />
          <polygon points="285,125 295,130 285,135" fill="#1F1F1F" />
        </g>

        {/* PMO box */}
        <g>
          <rect
            x={300}
            y={50}
            width={240}
            height={isBroken ? 200 : 150}
            fill="#F8F8F8"
            stroke="#1F1F1F"
            strokeWidth={1.5}
            rx={8}
          />
          <text
            x={420}
            y={40}
            textAnchor="middle"
            fontSize={11}
            letterSpacing="1.76"
            fill="#1F1F1F"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fontWeight={500}
          >
            {isBroken ? "SPECIFICATION (BROKEN)" : "SPECIFICATION (FIXED)"}
          </text>
          <text
            x={420}
            y={isBroken ? 110 : 130}
            textAnchor="middle"
            fontSize={24}
            fill="#1F1F1F"
            fontWeight={600}
          >
            PMO
          </text>

          {/* Outcome-first label (fix variant) — sits inside the PMO box
              where the UI atoms used to be, signalling that PMO now hands
              over problems, not solutions. */}
          {!isBroken && (
            <text
              x={420}
              y={158}
              textAnchor="middle"
              fontSize={11}
              fill="#5D5D5D"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              letterSpacing="0.08em"
            >
              writes problem statements
            </text>
          )}

          {/* UI atoms (broken variant only) — boxed as "BRD includes UI
              specs" so the reader sees the leak. */}
          {isBroken && (
            <g>
              <rect
                x={314}
                y={150}
                width={212}
                height={88}
                fill="none"
                stroke="#1F1F1F"
                strokeWidth={1}
                strokeDasharray="4 3"
                rx={4}
              />
              <text
                x={420}
                y={166}
                textAnchor="middle"
                fontSize={10}
                fill="#1F1F1F"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                letterSpacing="0.08em"
                fontWeight={500}
              >
                BRD INCLUDES UI SPECS
              </text>
              {/* button */}
              <rect
                x={328}
                y={182}
                width={44}
                height={14}
                fill="#1F1F1F"
                rx={2}
              />
              <text
                x={350}
                y={212}
                textAnchor="middle"
                fontSize={10}
                fill="#5D5D5D"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              >
                button
              </text>
              {/* dropdown */}
              <rect
                x={386}
                y={182}
                width={70}
                height={14}
                fill="none"
                stroke="#1F1F1F"
                strokeWidth={1}
                rx={2}
              />
              <text
                x={448}
                y={192}
                textAnchor="end"
                fontSize={8}
                fill="#1F1F1F"
              >
                ▼
              </text>
              <text
                x={421}
                y={212}
                textAnchor="middle"
                fontSize={10}
                fill="#5D5D5D"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              >
                dropdown
              </text>
              {/* modal */}
              <rect
                x={470}
                y={182}
                width={46}
                height={14}
                fill="none"
                stroke="#1F1F1F"
                strokeWidth={1}
                rx={2}
              />
              <text
                x={493}
                y={212}
                textAnchor="middle"
                fontSize={10}
                fill="#5D5D5D"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              >
                modal
              </text>
            </g>
          )}
        </g>

        {/* Arrow PMO → DESIGNER */}
        <g>
          <line
            x1={550}
            y1={130}
            x2={625}
            y2={130}
            stroke="#1F1F1F"
            strokeWidth={1.5}
          />
          <polygon points="625,125 635,130 625,135" fill="#1F1F1F" />
        </g>

        {/* DESIGNER box */}
        <g>
          <rect
            x={640}
            y={70}
            width={180}
            height={120}
            fill="none"
            stroke="#5D5D5D"
            strokeWidth={0.5}
            rx={8}
          />
          <text
            x={730}
            y={60}
            textAnchor="middle"
            fontSize={11}
            letterSpacing="1.76"
            fill="#5D5D5D"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fontWeight={500}
          >
            {isBroken ? "EXECUTION (CONSTRAINED)" : "DESIGN (OWNS UI)"}
          </text>
          <text
            x={730}
            y={138}
            textAnchor="middle"
            fontSize={20}
            fill="#1F1F1F"
            fontWeight={500}
          >
            DESIGNER
          </text>
        </g>
      </svg>
      {title && (
        <p
          className="text-center text-[12px] tracking-[0.16em] font-medium text-[#1F1F1F]"
          style={MONO}
        >
          {title}
        </p>
      )}
      <figcaption
        className="text-center text-[12px] tracking-[0.04em] text-[#5D5D5D]"
        style={MONO}
      >
        {caption}
      </figcaption>
    </figure>
  );
}

function SectionProblem() {
  return (
    <Section id="problem" first>
      <Eyebrow>+ The problems</Eyebrow>
      <SectionHead
        n="02"
        title="When the surface kept breaking, I traced it upstream."
      />
      <Lede>
        The project was in crisis, so triage came first. I identified the
        three most critical surface symptoms — the ones that were
        objectively wrong, not matters of taste — and traced them to a
        single upstream cause.
      </Lede>

      {/* ───────────── Problem 01 — surface symptoms ───────────── */}
      <div className="mt-[36px]">
        <div className="mb-[14px]">
          <p
            className="mb-[8px] text-[12px] tracking-[0.16em] font-medium text-[#5D5D5D]"
            style={MONO}
          >
            PROBLEM 01
          </p>
          <h3 className="text-[26px] leading-[1.2] font-medium tracking-[-0.02em] text-[#1F1F1F] min-[560px]:text-[32px]">
            Designs were being driven by individual aesthetics, not by
            shared principles.
          </h3>
        </div>

        <Body>
          Across the screens I audited in the first week, the same three
          fundamentals were broken everywhere. Each one is an objective
          rule, not a matter of taste — which is why I led with them.
        </Body>

        <ProblemSummary />

        <SubH>01 · Action clarity — every CTA looked equally important</SubH>
        <Body>
          One primary action per screen. Secondary actions should carry less
          visual weight. Across the platform, almost every interactive
          element was rendered as a filled primary button, leaving users
          with no signal about which step was actually next.
        </Body>
        <Evidence
          src="/work/toyota/everything-is-primary.png"
          alt="Toyota Guidehub screen with every button rendered as a primary action"
          caption="Toyota Guidehub — every action rendered as primary"
        />

        <SubH>
          02 · Color semantics — same color, different meaning across
          screens
        </SubH>
        <Body>
          Color is language, not decoration. Same meaning → same color;
          different meaning → different color. In the platform, success-
          green, info-blue, and error-red each meant something different
          depending on the section — so the user&rsquo;s learned mapping
          broke every time they navigated.
        </Body>
        <Evidence
          src="/work/toyota/color-semantics-problem.png"
          alt="Toyota Guidehub screens showing inconsistent color semantics"
          caption="Toyota Guidehub — green / blue / red carry different meanings per section"
        />

        <SubH>
          03 · Viewport reality — wireframes only worked on an infinite
          canvas
        </SubH>
        <Body>
          A 1440-design that breaks at the real implementation breakpoint
          isn&rsquo;t finished. The form below was specified at full Figma
          canvas width, with all fields visible at once — so the bottom
          actions appeared reachable on paper but were never on screen at
          implementation size.
        </Body>
        <Evidence
          src="/work/toyota/form-exceeding-screen.png"
          alt="Form spec that exceeds a realistic screen size, drawn on infinite Figma canvas"
          caption="Form spec drawn on infinite canvas — fields visible in Figma, hidden at 1280 px"
        />
        <Evidence
          src="/work/toyota/viewport-reality.png"
          alt="Same layout with an unrealistic horizontal scroll at the real implementation breakpoint"
          caption="Same layout at the real implementation breakpoint — horizontal scroll, unusable"
        />
      </div>

      {/* ───────────── Problem 02 — BRD root cause ───────────── */}
      <div className="mt-[56px] border-t border-[#A0A0A0] pt-[40px]">
        <div className="mb-[14px]">
          <p
            className="mb-[8px] text-[12px] tracking-[0.16em] font-medium text-[#5D5D5D]"
            style={MONO}
          >
            PROBLEM 02
          </p>
          <h3 className="text-[26px] leading-[1.2] font-medium tracking-[-0.02em] text-[#1F1F1F] min-[560px]:text-[32px]">
            The hierarchy was breaking because the BRD was pre-deciding
            the UI.
          </h3>
        </div>

        <Body>
          Once the surface symptoms were named, I looked for the cause.
          Tracing the artifact upstream, the breakdown wasn&rsquo;t on
          the design team&rsquo;s side — it was in what the design team
          was being handed.
        </Body>

        <ul className="my-[18px] flex max-w-[680px] flex-col gap-[10px] text-[16px] leading-[1.6] text-[#1F1F1F]">
          <li className="grid grid-cols-[14px_1fr] items-baseline gap-[12px]">
            <span aria-hidden className="text-[#1F1F1F]">
              ·
            </span>
            <span>
              The <Strong>BRD specified UI elements</Strong> — buttons,
              dropdowns, modals — as part of the requirements.
            </span>
          </li>
          <li className="grid grid-cols-[14px_1fr] items-baseline gap-[12px]">
            <span aria-hidden className="text-[#1F1F1F]">
              ·
            </span>
            <span>
              Designers received those UI atoms and placed them all at the
              same hierarchy level, because the BRD asked for them
              equally.
            </span>
          </li>
          <li className="grid grid-cols-[14px_1fr] items-baseline gap-[12px]">
            <span aria-hidden className="text-[#1F1F1F]">
              ·
            </span>
            <span>
              Result: cluttered, undifferentiated interfaces. The design
              spec was being decided by the BRD; designers were
              effectively painting it.
            </span>
          </li>
        </ul>

        <CommunicationBreakdown
          caption="The relay specifies solutions, not problems. Designers receive atoms, not questions."
        />
      </div>
    </Section>
  );
}

// ============================================================================
// §03 The fix
// ============================================================================

function BeforeAfterPair() {
  return (
    <figure className="my-[28px] flex flex-col gap-[16px]">
      <div className="grid gap-[20px] tablet:grid-cols-2 tablet:gap-[24px]">
        <div className="flex flex-col gap-[10px]">
          <span
            className="text-[12px] tracking-[0.16em] font-medium text-[#A0A0A0]"
            style={MONO}
          >
            BEFORE
          </span>
          <div className="overflow-hidden rounded-[6px] border border-[#1F1F1F]/15 bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/work/toyota/everything-is-primary.png"
              alt="Toyota Guidehub before fix — every action rendered as primary"
              className="block h-auto w-full"
            />
          </div>
          <p className="text-[14px] leading-[1.5] text-[#5D5D5D]">
            Every action rendered as primary; no hierarchy signal.
          </p>
        </div>
        <div className="flex flex-col gap-[10px]">
          <span
            className="text-[12px] tracking-[0.16em] font-medium text-[#1F1F1F]"
            style={MONO}
          >
            AFTER
          </span>
          <div className="overflow-hidden rounded-[6px] border border-[#1F1F1F]/15 bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/work/toyota/after.png"
              alt="Toyota Guidehub after fix — primary action carries the screen, secondary actions step back"
              className="block h-auto w-full"
            />
          </div>
          <p className="text-[14px] leading-[1.5] text-[#1F1F1F]">
            One primary action; consistent secondary + tertiary treatment.
          </p>
        </div>
      </div>
    </figure>
  );
}

function BrdFrameworkCard() {
  return (
    <div className="my-[24px] grid max-w-[760px] gap-[20px] rounded-[8px] border border-[#1F1F1F]/20 bg-[#F4F4F4] px-[22px] py-[20px] tablet:grid-cols-2 tablet:gap-[28px] tablet:px-[28px] tablet:py-[24px]">
      <div>
        <p
          className="mb-[10px] text-[12px] tracking-[0.16em] font-medium text-[#5D5D5D]"
          style={MONO}
        >
          ✕ WHAT WAS MISSING IN THE OLD BRD
        </p>
        <ul className="flex flex-col gap-[8px] text-[14px] leading-[1.55] text-[#1F1F1F]">
          <li className="grid grid-cols-[10px_1fr] items-baseline gap-[10px]">
            <span aria-hidden>·</span>
            <span>What the user was trying to accomplish, or why</span>
          </li>
          <li className="grid grid-cols-[10px_1fr] items-baseline gap-[10px]">
            <span aria-hidden>·</span>
            <span>
              Context around who the user is and what scenario they&rsquo;re
              in
            </span>
          </li>
          <li className="grid grid-cols-[10px_1fr] items-baseline gap-[10px]">
            <span aria-hidden>·</span>
            <span>
              Anything that didn&rsquo;t read as a build spec — colors,
              button placement, and interactions were hard-coded
            </span>
          </li>
        </ul>
      </div>
      <div>
        <p
          className="mb-[10px] text-[12px] tracking-[0.16em] font-medium text-[#1F1F1F]"
          style={MONO}
        >
          ✓ WHAT THE NEW BRD FRAMEWORK CAPTURED
        </p>
        <ul className="flex flex-col gap-[8px] text-[14px] leading-[1.55] text-[#1F1F1F]">
          <li className="grid grid-cols-[10px_1fr] items-baseline gap-[10px]">
            <span aria-hidden>·</span>
            <span>
              <Strong>Desired outcome first</Strong>, not the interface
            </span>
          </li>
          <li className="grid grid-cols-[10px_1fr] items-baseline gap-[10px]">
            <span aria-hidden>·</span>
            <span>
              <Strong>Problem context + intent</Strong>, not just feature
              lists
            </span>
          </li>
          <li className="grid grid-cols-[10px_1fr] items-baseline gap-[10px]">
            <span aria-hidden>·</span>
            <span>
              <Strong>UX-option pathways</Strong> that allow discussion and
              choice
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function SectionFix() {
  return (
    <Section id="fix">
      <Eyebrow>+ The fix</Eyebrow>
      <SectionHead
        n="03"
        title="Two moves: clean up the visible damage, then fix the artifact that produced it."
      />
      <Lede>
        I didn&rsquo;t try to fix every screen. I picked the three most
        objectively-evaluable problems on the surface and rebuilt the
        upstream BRD so the same problems stopped getting generated.
      </Lede>

      <SubH>Surface fix — visual hierarchy, restored</SubH>
      <Body>
        For Action clarity specifically, I led a pass that restored a
        single primary action per screen and pulled secondary / tertiary
        actions down a tier in weight. The same logic applied to color
        semantics and viewport audits across the platform — but the
        before / after is clearest on the action-hierarchy fix.
      </Body>
      <BeforeAfterPair />

      <SubH>Upstream fix — a new BRD communication framework</SubH>
      <Body>
        The surface fix would have only held if the BRD kept handing
        designers UI atoms. So I worked with the design and business
        teams to define a new BRD communication framework — one that
        carried outcome and context across the relay, and left the UI
        decision on the design side where it belonged.
      </Body>

      <BrdFrameworkCard />

      <CommunicationBreakdown
        title="THE RELAY, RESTRUCTURED"
        caption="UI specs no longer cross the boundary. PMO hands over problems; design owns the UI."
        variant="fixed"
      />
    </Section>
  );
}

// ============================================================================
// §04 Impact
// ============================================================================

function SectionImpact() {
  return (
    <Section id="impact">
      <Eyebrow>+ Impact</Eyebrow>
      <SectionHead
        n="04"
        title="Earning trust through action."
      />
      <Lede>
        The most concrete result was the project itself — escalated to
        executives when I joined, rescued by the time it shipped. The
        more durable result was what came after.
      </Lede>

      <Body>
        Beyond resolving the tactical issues, I played a core role in
        upskilling and unblocking the design team — and the relationship
        outlived the engagement.
      </Body>

      <Body>
        As a result, I was later asked to lead training initiatives —{" "}
        <Strong>Designers&rsquo; Collective</Strong>,{" "}
        <Strong>Figma Fundamentals</Strong>, and the{" "}
        <Strong>Data Visualization Practicum</Strong> — shaping the next
        generation of internal design talent.
      </Body>

      <figure className="my-[28px] max-w-[680px] overflow-hidden rounded-[8px] border border-[#1F1F1F]/15 bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/work/toyota/award.jpeg"
          alt="S&A Superior Talent Appreciation Reward (STAR) recognition note"
          className="block h-auto w-full"
        />
        <figcaption
          className="border-t border-[#1F1F1F]/15 bg-[#F4F4F4] px-[14px] py-[8px] text-[11px] tracking-[0.06em] text-[#5D5D5D]"
          style={MONO}
        >
          S&amp;A Superior Talent Appreciation Reward (STAR) — Deloitte
          internal recognition
        </figcaption>
      </figure>

      <p
        className="my-[24px] max-w-[680px] border-l-2 border-[#1F1F1F] py-[6px] pl-[20px] text-[18px] leading-[1.4] font-medium italic text-[#1F1F1F] min-[560px]:text-[22px]"
      >
        Surface symptoms are easier to argue about. Structural causes
        are easier to fix. The lesson I&rsquo;d carry into the next
        emergency engagement: ask &ldquo;where does this artifact come
        from?&rdquo; before fixing what it produces.
      </p>
    </Section>
  );
}

// ============================================================================
// Page composition
// ============================================================================

export default function ToyotaCaseStudy() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openModal = () => dialogRef.current?.showModal();
  const closeModal = () => dialogRef.current?.close();

  // Mount-gate the modal: native <dialog> rendered during SSR has been
  // observed to clash with React 19's hydration in turbopack dev mode.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      <SectionHero onOpenModal={openModal} />

      {/* §02–04 — left sticky nav + content column */}
      <div className="mx-auto max-w-[1200px] px-[32px] pb-[80px]">
        <div className="flex tablet:gap-[40px]">
          <CaseStudyLeftNav
            currentSlug="toyota"
            readTime="~3 min read"
            sections={SECTIONS}
          />
          <div className="min-w-0 flex-1">
            <SectionProblem />
            <SectionFix />
            <SectionImpact />
          </div>
        </div>
      </div>

      {mounted && <PcaModal dialogRef={dialogRef} onClose={closeModal} />}
    </>
  );
}
