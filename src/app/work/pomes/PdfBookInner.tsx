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
//   │   PDF page (canvas) │  ← rendered by react-pdf <Page>
//   ├─────────────────────┤
//   │ ← 02 / 05 →   label │  ← chrome we draw, not pdf.js
//   └─────────────────────┘
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
    <div className="flex flex-col gap-[10px]">
      <div
        className="flex justify-center overflow-hidden rounded-[8px] border-2 border-[#1F1F1F] bg-[#F4F4F4]"
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

      <div className="flex items-center justify-between gap-[8px] text-[12px] text-[#5D5D5D]">
        <span style={MONO}>{title}</span>
        <div className="flex items-center gap-[10px]">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            aria-label="Previous page"
            className="cursor-pointer text-[16px] leading-none text-[#1F1F1F] disabled:cursor-default disabled:text-[#A0A0A0]"
          >
            ←
          </button>
          <span style={MONO} className="tabular-nums">
            {page} / {total ?? "—"}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => (total ? Math.min(total, p + 1) : p))}
            disabled={total !== null && page >= total}
            aria-label="Next page"
            className="cursor-pointer text-[16px] leading-none text-[#1F1F1F] disabled:cursor-default disabled:text-[#A0A0A0]"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
