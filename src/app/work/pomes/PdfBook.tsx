"use client";

import dynamic from "next/dynamic";

// PdfBook — public client-side wrapper.
//
// react-pdf transitively imports pdfjs-dist, which references browser-only
// globals (DOMMatrix, Path2D…) at module load.  Even with "use client" the
// module still gets evaluated when Next bundles the server build.  So we
// punt the actual react-pdf import to the browser via next/dynamic with
// ssr:false — only PdfBookInner.tsx pulls in pdfjs, and only on the client.
const PdfBookInner = dynamic(() => import("./PdfBookInner"), {
  ssr: false,
  loading: () => (
    <div
      className="flex items-center justify-center rounded-[8px] border-2 border-[#1F1F1F] bg-[#F4F4F4] px-[14px] py-[24px] text-[12px] text-[#5D5D5D]"
      style={{
        fontFamily:
          "var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
      }}
    >
      Loading…
    </div>
  ),
});

export default function PdfBook(props: {
  src: string;
  title: string;
  width?: number;
}) {
  return <PdfBookInner {...props} />;
}
