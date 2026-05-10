import Link from "next/link";
import type { Tile } from "@/data/tiles";

const MONO_STYLE: React.CSSProperties = {
  fontFamily:
    "var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
};

// ComingSoon — placeholder for /works/{slug} routes whose case study isn't
// written yet.  Renders the project's index card + a stub message so the
// link still feels intentional (vs. landing on an error page).
export default function ComingSoon({ tile }: { tile: Tile }) {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-[32px] py-[96px]">
      <div className="mx-auto flex max-w-[640px] flex-col items-start gap-[24px] border-2 border-[#1F1F1F] bg-[#F8F8F8] p-[32px] tablet:p-[48px]">
        <p
          className="text-[64px] leading-[0.85] font-extrabold tracking-[-0.04em] text-[#1F1F1F]"
          style={MONO_STYLE}
        >
          {tile.id}
        </p>
        <h1 className="text-[32px] leading-[1.05] font-black text-[#1F1F1F] tablet:text-[40px]">
          {tile.brand}
        </h1>
        <p
          className="text-[12px] tracking-[0.18em] text-[#5D5D5D]"
          style={MONO_STYLE}
        >
          + {tile.category.toUpperCase()} / CASE STUDY IN PROGRESS
        </p>
        <p className="text-[15px] leading-[1.7] text-[#5D5D5D]">
          The full case study for this project is still being written.  In the
          meantime, you can head back to the portfolio for the index view, or
          jump to a completed case study via the indicator dots in the nav.
        </p>
        <Link
          href="/#works-list"
          className="border-2 border-[#1F1F1F] bg-[#1F1F1F] px-[24px] py-[12px] text-[14px] font-medium text-[#F4F4F4] no-underline transition-transform hover:-translate-y-[2px]"
        >
          ← Back to portfolio
        </Link>
      </div>
    </section>
  );
}
