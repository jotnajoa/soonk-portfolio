"use client";

import { useEffect, useRef, useState } from "react";
import CaseStudyLeftNav, {
  type CaseStudySection,
} from "./CaseStudyLeftNav";

// Toyota Guidehub case study (project 04 in the canonical list).
//
// Spec source: /Volumes/External/Portfolio_Website_26/Toyota_Guidehub_Spec.md
// (v2 — 4-section rescue-led narrative, intentionally tighter than POMEs/
// VoltHop/GIA which sit at full 8-section depth).
//
// Visual system mirrors Volthop (pure monochrome, no chromatic accent), but
// the structural differentiators are deliberate page-pacing signals:
//   - 4 sections instead of 7
//   - No timeline ribbon in §01 (its absence flags "shorter case" upfront)
//   - Only 2 figures (Fig. 1 communication breakdown · Fig. 2 BRD pair)
//   - No external linked-out pages
//
// Layout split:
//   §01 Hero       — full-bleed, no left nav (max-w-[1200px] internal)
//   §02–04         — left sticky nav (140px) + content column (~960px)

const MONO: React.CSSProperties = {
  fontFamily:
    "var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
};

// Dark warm-gray fill used for the self-policing banner + the §02 close
// callout.  Per spec, this is the only non-monochrome fill on the page —
// it carries the "hire signal" beats.
const DARK = "#3A342E";

const SECTIONS: CaseStudySection[] = [
  { id: "intro", num: "01", label: "Intro" },
  { id: "diagnosis", num: "02", label: "Diagnosis & rescue", star: true },
  { id: "what-held", num: "03", label: "What held" },
  { id: "next", num: "04", label: "What's next" },
];

// ============================================================================
// Reusable atoms — Toyota-specific weights/sizes per spec (lighter than
// Volthop's atoms; the lighter feel is part of the editorial pacing).
// ============================================================================

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[11px] tracking-[0.16em] font-medium text-[#5D5D5D]"
      style={MONO}
    >
      {children}
    </p>
  );
}

function SectionNumber({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[64px] leading-[0.85] font-medium text-[#1F1F1F] tablet:text-[76px]"
      style={MONO}
    >
      {children}
    </p>
  );
}

function Headline({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="max-w-[720px] text-[20px] leading-[1.4] font-medium text-[#1F1F1F] tablet:text-[22px]">
      {children}
    </h2>
  );
}

function Lede({ children }: { children: React.ReactNode }) {
  return (
    <p className="max-w-[720px] text-[16px] leading-[1.7] font-medium text-[#1F1F1F]">
      {children}
    </p>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <p className="max-w-[720px] text-[16px] leading-[1.7] font-normal text-[#1F1F1F]">
      {children}
    </p>
  );
}

function SectionHeader({
  number,
  eyebrow,
  headline,
}: {
  number: string;
  eyebrow: string;
  headline: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-[18px]">
      <Eyebrow>+ {eyebrow}</Eyebrow>
      <div className="flex flex-col gap-[24px]">
        <SectionNumber>{number}</SectionNumber>
        <Headline>{headline}</Headline>
      </div>
    </div>
  );
}

// Beat divider: horizontal hairline with a centered eyebrow chip.  Used to
// segment the three beats inside §02.
function BeatDivider({ label }: { label: string }) {
  return (
    <div className="relative flex items-center py-[8px]">
      <div className="absolute inset-x-0 top-1/2 h-px bg-[#1F1F1F]/30" />
      <span
        className="relative mx-auto bg-[#EEEEEE] px-[24px] py-[8px] text-[11px] tracking-[0.16em] font-medium text-[#1F1F1F]"
        style={MONO}
      >
        {label}
      </span>
    </div>
  );
}

// ============================================================================
// §01 Hero — full-bleed, no left nav
// ============================================================================

// Composition diagram fallback for the hero anchor visual.  Used when no
// product screenshot is available (spec allows this fallback explicitly).
// Top half = misaligned shapes at low opacity (the "before" — opinion-led
// chaos); bottom half = aligned shapes solid (the "after" — principle-led
// clarity), separated by a "PRINCIPLE APPLIED" chip.
function HeroCompositionFallback() {
  return (
    <div className="relative aspect-[16/10] w-full overflow-clip border border-[#1F1F1F]/30 bg-[#F8F8F8]">
      {/* TOP half — BEFORE (misaligned, low-opacity) */}
      <div className="absolute inset-x-0 top-0 h-1/2 overflow-clip">
        <svg
          viewBox="0 0 580 200"
          preserveAspectRatio="xMidYMid meet"
          className="h-full w-full text-[#1F1F1F]/30"
        >
          <rect x={28} y={36} width={92} height={14} fill="currentColor" />
          <rect x={140} y={28} width={140} height={22} fill="currentColor" />
          <rect x={300} y={48} width={68} height={18} fill="currentColor" />
          <rect
            x={386}
            y={32}
            width={120}
            height={28}
            fill="none"
            stroke="currentColor"
            strokeWidth={1}
          />
          <rect x={32} y={80} width={210} height={12} fill="currentColor" />
          <rect
            x={264}
            y={78}
            width={170}
            height={16}
            fill="none"
            stroke="currentColor"
            strokeWidth={1}
          />
          <rect x={460} y={84} width={60} height={28} fill="currentColor" />
          <rect x={42} y={120} width={68} height={28} fill="currentColor" />
          <rect x={130} y={124} width={92} height={20} fill="currentColor" />
          <rect
            x={240}
            y={118}
            width={84}
            height={32}
            fill="none"
            stroke="currentColor"
            strokeWidth={1}
          />
        </svg>
      </div>

      {/* Center divider chip */}
      <div className="absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 items-center">
        <div className="h-px flex-1 bg-[#1F1F1F]/30" />
        <span
          className="bg-[#F8F8F8] px-[16px] py-[6px] text-[11px] tracking-[0.16em] font-medium text-[#1F1F1F]"
          style={MONO}
        >
          PRINCIPLE APPLIED
        </span>
        <div className="h-px flex-1 bg-[#1F1F1F]/30" />
      </div>

      {/* BOTTOM half — AFTER (aligned, solid) */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 overflow-clip">
        <svg
          viewBox="0 0 580 200"
          preserveAspectRatio="xMidYMid meet"
          className="h-full w-full text-[#1F1F1F]"
        >
          <rect x={28} y={28} width={92} height={14} fill="currentColor" />
          <rect x={140} y={28} width={140} height={14} fill="currentColor" />
          <rect
            x={300}
            y={28}
            width={68}
            height={14}
            fill="none"
            stroke="currentColor"
            strokeWidth={1}
          />
          <rect
            x={388}
            y={28}
            width={120}
            height={14}
            fill="none"
            stroke="currentColor"
            strokeWidth={1}
          />
          <rect x={28} y={64} width={210} height={12} fill="currentColor" />
          <rect x={258} y={64} width={170} height={12} fill="currentColor" />
          <rect x={448} y={64} width={104} height={12} fill="currentColor" />
          <rect x={28} y={96} width={120} height={28} fill="currentColor" />
          <rect
            x={168}
            y={96}
            width={120}
            height={28}
            fill="none"
            stroke="currentColor"
            strokeWidth={1}
          />
        </svg>
      </div>

      {/* Annotation overlay (top-right corner) */}
      <div className="absolute top-[12px] right-[12px] flex flex-col gap-[2px] bg-[#F8F8F8]/85 px-[10px] py-[6px]">
        <p
          className="text-[10px] tracking-[0.08em] text-[#5D5D5D]"
          style={MONO}
        >
          ⊘ before — opinion-led
        </p>
        <p
          className="text-[10px] tracking-[0.08em] text-[#1F1F1F]"
          style={MONO}
        >
          ✓ after — principle-led
        </p>
      </div>
    </div>
  );
}

function SectionHero() {
  return (
    <section
      id="intro"
      className="border-b-2 border-[#1F1F1F] px-[32px] pt-[48px] pb-[64px] tablet:px-[64px] tablet:pt-[64px] tablet:pb-[96px]"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col gap-[36px]">
        <Eyebrow>+ 01 / Intro</Eyebrow>

        {/* Display: logo + wordmark + subtitle */}
        <div className="flex flex-col gap-[12px]">
          <div className="flex flex-wrap items-end gap-[22px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/work/logos/toyotalogo.png"
              alt=""
              aria-hidden
              className="h-[64px] w-auto object-contain tablet:h-[92px]"
            />
            <h1 className="text-[64px] leading-[0.85] font-medium tracking-[-0.05em] text-[#1F1F1F] tablet:text-[120px]">
              Toyota Guidehub
            </h1>
          </div>
          <p
            className="text-[14px] tracking-[0.04em] font-normal text-[#5D5D5D]"
            style={MONO}
          >
            Combo PCA Approval Workflow · supply-chain operations · emergency
            rescue
          </p>
        </div>

        {/* Two-column row: anchor visual LEFT 50% + meta block RIGHT 50% */}
        <div className="grid gap-[36px] tablet:grid-cols-2 tablet:gap-[60px]">
          {/* Hero anchor visual — composition diagram fallback */}
          <HeroCompositionFallback />

          {/* Meta block */}
          <dl className="border-t border-[#1F1F1F]/30">
            {[
              [
                "ROLE",
                "Senior designer · brought in as emergency support after executive escalation",
              ],
              [
                "SCOPE",
                "Diagnose downstream symptoms → restructure the upstream artifact",
              ],
              ["TIMELINE", "TBD — engagement dates"],
              [
                "STATUS",
                "Shipped · client trust restored · award-recognized (TBD)",
              ],
              ["TEAM", "TBD — # designers + # PMs/PMO led/supported"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex flex-wrap items-baseline gap-[16px] border-b border-[#1F1F1F]/30 py-[12px]"
              >
                <dt
                  className="w-[90px] shrink-0 text-[11px] tracking-[0.16em] font-medium text-[#5D5D5D]"
                  style={MONO}
                >
                  {label}
                </dt>
                <dd className="flex-1 text-[15px] leading-[1.5] font-medium text-[#1F1F1F] tablet:text-[16px]">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Footer cue — promises the reviewer the case length up front */}
        <p
          className="text-[12px] tracking-[0.04em] font-normal text-[#5D5D5D]"
          style={MONO}
        >
          ↓ Two symptoms, one cause, one fix — in 3 minutes
        </p>
      </div>
    </section>
  );
}

// ============================================================================
// §02 Diagnosis & rescue — the whole case
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
      <span className="font-normal text-[#1F1F1F] underline decoration-[#5D5D5D] decoration-[0.5px] underline-offset-[2px] transition-all group-hover:font-medium group-hover:decoration-[#1F1F1F]">
        Combo PCA approval
      </span>
      <span
        className="text-[10px] text-[#1F1F1F] transition-transform duration-200 group-hover:rotate-45"
        aria-hidden
      >
        ✦
      </span>
    </button>
  );
}

// PCA definition modal — native <dialog>.  Esc / overlay click / × close.
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
        // Close when clicking the dialog backdrop (the dialog element itself
        // is the backdrop layer; the inner <div> stops propagation so clicks
        // on the card don't dismiss).
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
          <p className="text-[15px] leading-[1.7] text-[#1F1F1F] tablet:text-[16px]">
            <strong className="font-semibold">
              PCA (Product Configuration Approval)
            </strong>{" "}
            is Toyota&rsquo;s internal validation process for vehicle
            &ldquo;Guides&rdquo; — the master configuration specs that
            downstream operations consume.
          </p>
          <p className="text-[15px] leading-[1.7] text-[#1F1F1F] tablet:text-[16px]">
            The <strong className="font-semibold">Combo PCA workflow</strong>{" "}
            specifically covers the multi-persona path from auto-generated PCA
            codes through DSM review, UUU code assignment, and function-kind
            selection — before a Guide is approved and propagates downstream.
          </p>

          <div className="mt-[16px] border-t border-[#1F1F1F]/30 pt-[16px]">
            <p className="text-[12px] leading-[1.5] italic font-normal text-[#5D5D5D]">
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

// 5-step horizontal process flow.  Auxiliary, NOT a signature figure — sits
// between the project context paragraph and the thesis lede so reviewers
// who don't know Toyota's internal vocabulary can keep up.
function PcaApprovalFlow() {
  const steps: { num: string; label: string }[] = [
    { num: "01", label: "PC Manager approves" },
    { num: "02", label: "PCA codes auto-generate" },
    { num: "03", label: "DSM reviews & validates" },
    { num: "04", label: "UUU codes + function kind assigned" },
    { num: "05", label: "Guide approved, propagates downstream" },
  ];
  return (
    <div className="flex flex-col items-center gap-[10px]">
      <div className="grid w-full max-w-[720px] grid-cols-1 gap-[10px] tablet:grid-cols-5">
        {steps.map((s, i) => (
          <div key={s.num} className="flex items-center gap-[6px]">
            <div className="flex flex-1 flex-col items-start gap-[6px] border border-[#1F1F1F]/30 px-[12px] py-[10px]">
              <span
                className="text-[10px] tracking-[0.08em] text-[#A0A0A0]"
                style={MONO}
              >
                {s.num}
              </span>
              <span className="text-[11px] leading-[1.3] font-medium text-[#1F1F1F]">
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <span
                className="hidden text-[10px] text-[#A0A0A0] tablet:inline"
                style={MONO}
                aria-hidden
              >
                ›
              </span>
            )}
          </div>
        ))}
      </div>
      <p
        className="text-[11px] tracking-[0.16em] font-normal text-[#5D5D5D]"
        style={MONO}
      >
        PCA approval flow — where the engagement lived
      </p>
    </div>
  );
}

// Three non-negotiables — 3-cell horizontal grid, stacks to 1-col on mobile.
function NonNegotiableCard({
  num,
  title,
  body,
  example,
}: {
  num: string;
  title: string;
  body: string;
  example: string;
}) {
  return (
    <article className="flex flex-col gap-[12px] border border-[#1F1F1F]/30 bg-[#F8F8F8] p-[24px] tablet:p-[28px]">
      <span
        className="text-[11px] tracking-[0.16em] font-medium text-[#A0A0A0]"
        style={MONO}
      >
        {num}
      </span>
      <h3 className="text-[20px] leading-[1.3] font-medium text-[#1F1F1F] tablet:text-[22px]">
        {title}
      </h3>
      <p className="text-[14px] leading-[1.55] font-normal text-[#1F1F1F]">
        {body}
      </p>
      <p className="mt-auto text-[12px] leading-[1.6] italic font-normal text-[#5D5D5D]">
        &ldquo;{example}&rdquo;
      </p>
    </article>
  );
}

// Fig. 1 of 2 — Communication breakdown SVG.  Per spec, this is the case's
// signature visual: Client → PMO (dominant) → Designer, with UI atoms
// "leaking" out the bottom of the PMO box.
function CommunicationBreakdown() {
  return (
    <figure className="flex flex-col gap-[12px]">
      <svg
        viewBox="0 0 960 360"
        preserveAspectRatio="xMidYMid meet"
        className="w-full"
      >
        {/* CLIENT box */}
        <g>
          <rect
            x={20}
            y={80}
            width={180}
            height={120}
            fill="none"
            stroke="#5D5D5D"
            strokeWidth={0.5}
            rx={8}
          />
          <text
            x={110}
            y={70}
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
            y={148}
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
            y1={140}
            x2={285}
            y2={140}
            stroke="#1F1F1F"
            strokeWidth={1.5}
          />
          <polygon points="285,135 295,140 285,145" fill="#1F1F1F" />
        </g>

        {/* PMO box — visually dominant */}
        <g>
          <rect
            x={300}
            y={60}
            width={240}
            height={160}
            fill="#F8F8F8"
            stroke="#1F1F1F"
            strokeWidth={1.5}
            rx={8}
          />
          <text
            x={420}
            y={50}
            textAnchor="middle"
            fontSize={11}
            letterSpacing="1.76"
            fill="#1F1F1F"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fontWeight={500}
          >
            SPECIFICATION (BROKEN)
          </text>
          <text
            x={420}
            y={130}
            textAnchor="middle"
            fontSize={24}
            fill="#1F1F1F"
            fontWeight={600}
          >
            PMO
          </text>
        </g>

        {/* UI atoms popping out of PMO bottom */}
        <g>
          {/* button — solid */}
          <rect
            x={320}
            y={185}
            width={44}
            height={14}
            fill="#1F1F1F"
            rx={2}
          />
          <text
            x={342}
            y={213}
            textAnchor="middle"
            fontSize={10}
            fill="#A0A0A0"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          >
            button
          </text>

          {/* dropdown — outlined w/ chevron */}
          <rect
            x={380}
            y={185}
            width={70}
            height={14}
            fill="none"
            stroke="#1F1F1F"
            strokeWidth={1}
            rx={2}
          />
          <text
            x={442}
            y={195}
            textAnchor="end"
            fontSize={8}
            fill="#1F1F1F"
          >
            ▼
          </text>
          <text
            x={415}
            y={213}
            textAnchor="middle"
            fontSize={10}
            fill="#A0A0A0"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          >
            dropdown
          </text>

          {/* modal — outlined */}
          <rect
            x={470}
            y={185}
            width={46}
            height={14}
            fill="none"
            stroke="#1F1F1F"
            strokeWidth={1}
            rx={2}
          />
          <text
            x={493}
            y={213}
            textAnchor="middle"
            fontSize={10}
            fill="#A0A0A0"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          >
            modal
          </text>
        </g>

        {/* Arrow PMO → DESIGNER */}
        <g>
          <line
            x1={550}
            y1={140}
            x2={625}
            y2={140}
            stroke="#1F1F1F"
            strokeWidth={1.5}
          />
          <polygon points="625,135 635,140 625,145" fill="#1F1F1F" />
        </g>

        {/* DESIGNER box */}
        <g>
          <rect
            x={640}
            y={80}
            width={180}
            height={120}
            fill="none"
            stroke="#5D5D5D"
            strokeWidth={0.5}
            rx={8}
          />
          <text
            x={730}
            y={70}
            textAnchor="middle"
            fontSize={11}
            letterSpacing="1.76"
            fill="#5D5D5D"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fontWeight={500}
          >
            EXECUTION (CONSTRAINED)
          </text>
          <text
            x={730}
            y={148}
            textAnchor="middle"
            fontSize={20}
            fill="#1F1F1F"
            fontWeight={500}
          >
            DESIGNER
          </text>
        </g>

        {/* Diagnostic annotation — italic, centered */}
        <text
          x={480}
          y={290}
          textAnchor="middle"
          fontSize={11}
          letterSpacing="1.76"
          fontStyle="italic"
          fill="#5D5D5D"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        >
          ⊘ The relay is specifying solutions, not problems. Designer receives
          atoms, not questions.
        </text>
      </svg>
      <figcaption
        className="text-center text-[11px] tracking-[0.16em] font-normal text-[#5D5D5D]"
        style={MONO}
      >
        Fig. 1 of 2 · The relay that produced the symptoms
      </figcaption>
    </figure>
  );
}

// Fig. 2 of 2 — BRD before/after pair.  Real screenshots TBD; until then
// each frame renders a labelled placeholder with the spec's annotations.
function BrdPair() {
  return (
    <figure className="flex flex-col gap-[12px]">
      <div className="grid gap-[16px] tablet:grid-cols-2 tablet:gap-[32px]">
        {/* BEFORE */}
        <div className="flex flex-col gap-[12px]">
          <div className="relative aspect-[4/3] w-full overflow-clip border border-[#1F1F1F]/30 bg-[#F8F8F8]">
            <div
              className="flex h-full w-full items-center justify-center text-[10px] tracking-[0.16em] text-[#A0A0A0]"
              style={MONO}
            >
              TBD · BEFORE BRD SCREENSHOT
            </div>
            <div className="absolute top-[10px] right-[10px] max-w-[60%] bg-[#F8F8F8]/85 px-[10px] py-[6px]">
              <p
                className="text-[10px] tracking-[0.08em] italic font-normal text-[#5D5D5D]"
                style={MONO}
              >
                ⊘ solution-first language · mixed problem + current-state · no
                validation criteria
              </p>
            </div>
          </div>
          <p
            className="text-center text-[11px] tracking-[0.16em] font-normal text-[#5D5D5D]"
            style={MONO}
          >
            BEFORE — solution-first BRD
          </p>
        </div>

        {/* AFTER */}
        <div className="flex flex-col gap-[12px]">
          <div className="relative aspect-[4/3] w-full overflow-clip border border-[#1F1F1F]/30 bg-[#F8F8F8]">
            <div
              className="flex h-full w-full items-center justify-center text-[10px] tracking-[0.16em] text-[#A0A0A0]"
              style={MONO}
            >
              TBD · AFTER BRD SCREENSHOT
            </div>
            <div className="absolute top-[10px] right-[10px] max-w-[60%] bg-[#F8F8F8]/85 px-[10px] py-[6px]">
              <p
                className="text-[10px] tracking-[0.08em] font-medium text-[#1F1F1F]"
                style={MONO}
              >
                ✓ 5-section problem-first structure · validation rules per
                section
              </p>
            </div>
          </div>
          <p
            className="text-center text-[11px] tracking-[0.16em] font-medium text-[#1F1F1F]"
            style={MONO}
          >
            AFTER — problem-first structure
          </p>
        </div>
      </div>
      <figcaption
        className="text-center text-[11px] tracking-[0.16em] font-normal text-[#5D5D5D]"
        style={MONO}
      >
        Fig. 2 of 2 · The artifact, restructured
      </figcaption>
    </figure>
  );
}

function SelfPolicingBanner() {
  return (
    <div
      className="flex flex-col items-center gap-[8px] px-[28px] py-[36px] text-center tablet:px-[48px]"
      style={{ backgroundColor: DARK }}
    >
      <p
        className="font-serif text-[20px] leading-[1.45] italic text-[#F4F4F4] tablet:text-[22px]"
        style={{ fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif" }}
      >
        &ldquo;If the user story describes a solution instead of a problem,
        it should be rejected.&rdquo;
      </p>
      <p
        className="text-[11px] tracking-[0.16em] font-normal text-[#F4F4F4]/80"
        style={MONO}
      >
        — Self-policing rule. Forged here. Carried into GIA later.
      </p>
    </div>
  );
}

function BigCallout() {
  return (
    <div
      className="flex flex-col gap-[18px] px-[32px] py-[48px] tablet:px-[60px] tablet:py-[60px]"
      style={{ backgroundColor: DARK }}
    >
      <p
        className="text-[11px] tracking-[0.16em] font-medium text-[#F4F4F4]/80"
        style={MONO}
      >
        THE TOYOTA SIGNAL
      </p>
      <p className="text-[24px] leading-[1.3] font-medium text-[#F4F4F4] tablet:text-[28px]">
        When the surface keeps breaking, fix the system that produces it.
      </p>
      <p className="text-[15px] leading-[1.6] font-normal text-[#F4F4F4]/80 tablet:text-[16px]">
        I diagnosed two problems — design fundamentals and a broken relay. I
        solved one — the upstream one — and watched the surface fix itself.
      </p>
      <p className="text-[13px] leading-[1.5] italic font-normal text-[#F4F4F4]/70 tablet:text-[14px]">
        Two symptoms. One artifact. The leverage was always upstream.
      </p>
    </div>
  );
}

function SectionDiagnosis({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section
      id="diagnosis"
      className="flex flex-col gap-[36px] py-[64px] tablet:py-[96px]"
    >
      <SectionHeader
        number="02"
        eyebrow="The rescue"
        headline={
          <>
            When the surface kept breaking,
            <br aria-hidden />
            I fixed the system that produced it.
          </>
        }
      />

      {/* Project context — with inline ✦ modal trigger */}
      <p className="max-w-[720px] text-[16px] leading-[1.7] font-normal text-[#1F1F1F]">
        Toyota Guidehub is Toyota&rsquo;s internal supply-chain operations
        platform. This engagement focused on the{" "}
        <PcaTrigger onOpen={onOpenModal} /> workflow — a multi-step flow
        letting Distribution Service Manager personas review vehicle
        configuration codes across linked sub-guides before approvals
        propagated downstream. When I joined, the project had been escalated
        to executive review and the consulting partner had been switched
        mid-engagement. Trust was eroding. I was brought in as senior
        emergency support to firefight.
      </p>

      <PcaApprovalFlow />

      <Lede>
        Within the first week, the design team was treating two surface
        problems as separate fights. From a different angle, both were the
        same problem — the artifact that fed them. So I stopped trying to fix
        surface symptoms and rebuilt the artifact instead.
      </Lede>

      {/* ─── BEAT 1 ─── */}
      <div className="flex flex-col gap-[24px]">
        <BeatDivider label="BEAT 1 · SURFACE SYMPTOM" />
        <Body>
          In the first design review I sat in on, the team was iterating on
          visuals without a shared rubric. Senior gave an opinion, junior
          wrote it down, the next senior gave a different opinion — screens
          kept changing without a decision. The same component looked
          different on every page. Two specific failures were everywhere:
        </Body>

        <div className="grid gap-[16px] tablet:grid-cols-3 tablet:gap-[24px]">
          <NonNegotiableCard
            num="01"
            title="Action clarity"
            body="One primary button per screen. Secondary actions carry less visual weight. The team was rendering every CTA as primary."
            example="Two equally weighted blue buttons asking the user to do two different things — the user can't decide which is the next step."
          />
          <NonNegotiableCard
            num="02"
            title="Color semantics"
            body="Same meaning, same color. Different meaning, different color. Color is language, not decoration. The same blue meant different things on different screens."
            example="Success-green on one screen meant 'confirm.' On another, it meant 'disabled.' The user's learned mapping was broken."
          />
          <NonNegotiableCard
            num="03"
            title="Viewport reality"
            body="Fitting on Figma canvas ≠ fitting at the real implementation breakpoint. A 1440 design that breaks at 1280 isn't finished."
            example="The spec said 'stack on mobile' but no actual breakpoint was tested. Hand-off was incomplete."
          />
        </div>

        <Body>
          When the team did try to fix these, they reached for taste.
          Subjective aesthetic adjustments. Each version &ldquo;looked
          better,&rdquo; but the structural issues weren&rsquo;t being fixed
          — they were being rearranged. The team kept hitting the same wall.
        </Body>
      </div>

      {/* ─── BEAT 2 ─── */}
      <div className="flex flex-col gap-[24px]">
        <BeatDivider label="BEAT 2 · A DIFFERENT ANGLE" />
        <Body>
          I asked a different question — not <em>which fix is right</em> but{" "}
          <em>where do these errors originate?</em> Tracing the artifact
          upstream, the breakdown wasn&rsquo;t on the design team&rsquo;s
          surface. It was in the relay between the client and design.
        </Body>

        <CommunicationBreakdown />

        <Body>
          The PMO was receiving business requirements from the client and
          translating them into UI specifications — buttons, dropdowns,
          modals — <em>before the design team ever saw the work</em>.
          Designers received UI atoms, not problems. They had no entry point
          to question whether the dropdown was the right answer. So when
          something looked wrong, the only tool they had was visual
          adjustment. The fundamentals problems were a downstream effect.
        </Body>
      </div>

      {/* ─── BEAT 3 ─── */}
      <div className="flex flex-col gap-[24px]">
        <BeatDivider label="BEAT 3 · THE FIX" />
        <Body>
          The leverage point was the <strong className="font-semibold">
            BRD itself
          </strong>{" "}
          — the artifact that crossed the boundary between PMO and design
          team. If the BRD specified problems instead of UI, the relay would
          invert. PMO would write problem statements; designers would respond
          with UI. The team would have agency.
        </Body>

        <Body>
          I rebuilt the BRD format around a 5-section, problem-first structure
          with a self-policing rule per section. The same structural rule I
          would later apply at GIA — but this engagement was where it was
          forged.
        </Body>

        <BrdPair />

        <SelfPolicingBanner />

        <Body>
          Once the BRDs migrated to problem-first, the surface symptoms
          dissolved. PMO couldn&rsquo;t specify a dropdown without first
          specifying the user question that justified it. Designer reviews
          became professional rather than personal. The three non-negotiables
          stopped being a corrective tool and became part of the team&rsquo;s
          default vocabulary.{" "}
          <strong className="font-semibold">
            The team didn&rsquo;t need me telling them which screen was
            broken — they could see it themselves.
          </strong>
        </Body>
      </div>

      <BigCallout />
    </section>
  );
}

// ============================================================================
// §03 What held — 3-stat outcome row + closing body
// ============================================================================

function StatOutcome({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div className="flex flex-col gap-[8px]">
      <span
        className="text-[48px] leading-[0.9] font-medium text-[#1F1F1F] tablet:text-[56px]"
        style={MONO}
      >
        {number}
      </span>
      <span
        className="text-[11px] tracking-[0.16em] font-medium leading-[1.4] text-[#5D5D5D]"
        style={MONO}
      >
        {label}
      </span>
    </div>
  );
}

function SectionWhatHeld() {
  return (
    <section
      id="what-held"
      className="flex flex-col gap-[36px] py-[64px] tablet:py-[96px]"
    >
      <SectionHeader
        number="03"
        eyebrow="Result"
        headline="What the upstream fix pulled back."
      />

      <div className="grid gap-[24px] border-y border-[#1F1F1F]/30 py-[32px] tablet:grid-cols-3">
        <StatOutcome
          number="1"
          label="industry award won — engagement rescued from executive escalation (TBD: confirm name + year)"
        />
        <StatOutcome
          number="All"
          label="BRDs migrated to problem-first format (TBD: exact count)"
        />
        <StatOutcome
          number="Within weeks"
          label="team self-policed without my prompts"
        />
      </div>

      <Body>
        The most concrete result: the project — escalated to executives when
        I joined — was rescued. Client trust was restored. The engagement won
        an industry award (TBD). But the most durable result was upstream:
        the BRD restructure outlived the engagement, and the three
        non-negotiables were carried into onboarding for new designers.{" "}
        <strong className="font-semibold">
          More than the screen fixes I made, what stayed was the subjectivity
          I cut out.
        </strong>
      </Body>
    </section>
  );
}

// ============================================================================
// §04 What's next — narrow column reflection
// ============================================================================

function SectionNext() {
  return (
    <section
      id="next"
      className="flex flex-col gap-[36px] py-[64px] tablet:py-[96px]"
    >
      <SectionHeader
        number="04"
        eyebrow="Reflection"
        headline="What's next."
      />
      <p
        className="max-w-[640px] text-[20px] leading-[1.5] italic font-normal text-[#1F1F1F] tablet:text-[24px]"
        style={{
          fontFamily:
            "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
        }}
      >
        Surface symptoms are easier to argue about. Structural causes are
        easier to fix. What I&rsquo;d carry into the next emergency
        engagement: ask &ldquo;where does this artifact come from?&rdquo;
        before fixing what it produces.
      </p>
    </section>
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
  // observed to clash with React 19's hydration in turbopack dev mode
  // ("Failed to execute 'removeChild' on 'Node'").  Delaying the dialog
  // node until after the first client commit keeps the SSR markup simple
  // and avoids the reconciler walking over it twice.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      <SectionHero />

      {/* §02–04 — left sticky nav + content column */}
      <div className="mx-auto max-w-[1200px] px-[32px] tablet:px-[64px]">
        <div className="flex tablet:gap-[40px]">
          <CaseStudyLeftNav
            currentSlug="toyota"
            readTime="~3 min read"
            sections={SECTIONS}
          />
          <div className="min-w-0 flex-1">
            <SectionDiagnosis onOpenModal={openModal} />
            <SectionWhatHeld />
            <SectionNext />
          </div>
        </div>
      </div>

      {mounted && <PcaModal dialogRef={dialogRef} onClose={closeModal} />}
    </>
  );
}
