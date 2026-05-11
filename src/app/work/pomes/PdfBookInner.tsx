"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// pdf.js needs a worker URL.  CDN-served against react-pdf's bundled
// pdfjs-dist version keeps us off having to copy the worker .mjs into
// /public on every dependency bump.
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const MONO: React.CSSProperties = {
  fontFamily:
    "var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
};

// PdfBook — minimal paginated PDF viewer for case-study embeds.
//
// Layout:
//   ┌─────────────────────┐
//   │                     │
//   │   PDF page (canvas) │  ← rendered by react-pdf <Page>
//   │                     │
//   ├─────────────────────┤
//   │ TITLE   ◀  3 / 6  ▶ │  ← chunky control bar, INSIDE the card
//   └─────────────────────┘            (dark bg so it reads as chrome,
//                                       not a label below the artifact)
//
// Earlier version put the paginator OUTSIDE the bordered card in a
// thin grey row — testers didn't notice it.  Pulling it inside the
// border with a #1F1F1F bg + bigger touch targets makes it read as
// "this artifact has more pages" at a glance.
//
// Text + annotation layers are turned off — the case study just shows
// the document's visual; no selection/search expected.  Drops the JS
// surface area react-pdf otherwise mounts.
export default function PdfBook({
  src,
  title,
  width = 260,
}: {
  src: string;
  title: string;
  width?: number;
}) {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState<number | null>(null);

  return (
    <div
      className="flex flex-col overflow-hidden rounded-[8px] border-2 border-[#1F1F1F] bg-[#F4F4F4]"
      style={{ width }}
    >
      {/* ---- PDF page ------------------------------------------------- */}
      <div
        className="flex justify-center"
        style={{ minHeight: width * 1.3 }}
      >
        <Document
          file={src}
          onLoadSuccess={({ numPages }) => setTotal(numPages)}
          loading={
            <div
              className="flex items-center justify-center px-[14px] py-[24px] text-[12px] text-[#5D5D5D]"
              style={MONO}
            >
              Loading…
            </div>
          }
          error={
            <div
              className="flex items-center justify-center px-[14px] py-[24px] text-[12px] text-[#5D5D5D]"
              style={MONO}
            >
              Could not load PDF.
            </div>
          }
        >
          <Page
            pageNumber={page}
            width={width}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>

      {/* ---- Control bar — inside the card --------------------------- */}
      <div
        className="flex items-center justify-between gap-[8px] border-t-2 border-[#1F1F1F] bg-[#1F1F1F] px-[12px] py-[10px] text-[#F4F4F4]"
        style={MONO}
      >
        <span className="truncate text-[10px] tracking-[0.08em]">
          {title}
        </span>
        <div className="flex shrink-0 items-center gap-[12px]">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            aria-label="Previous page"
            className="flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-[4px] text-[14px] leading-none transition-colors hover:bg-white/15 disabled:cursor-default disabled:text-[#5D5D5D] disabled:hover:bg-transparent"
          >
            ←
          </button>
          <span className="tabular-nums text-[12px] tracking-[0.04em]">
            {page} / {total ?? "—"}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => (total ? Math.min(total, p + 1) : p))}
            disabled={total !== null && page >= total}
            aria-label="Next page"
            className="flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-[4px] text-[14px] leading-none transition-colors hover:bg-white/15 disabled:cursor-default disabled:text-[#5D5D5D] disabled:hover:bg-transparent"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
