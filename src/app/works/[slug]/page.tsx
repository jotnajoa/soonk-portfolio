import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { tiles } from "@/data/tiles";
import CaseStudyNav from "@/components/cases/CaseStudyNav";
import GiaCaseStudy from "@/components/cases/Gia";
import ComingSoon from "@/components/cases/ComingSoon";

// Pre-render the static list of valid slugs at build time so the case-study
// pages are static-prerendered alongside the portfolio landing.
export function generateStaticParams() {
  return tiles.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tile = tiles.find((t) => t.slug === slug);
  if (!tile) return { title: "Not found · Soonk" };
  return {
    title: `${tile.brand} — Soonk Paik`,
    description: `Case study: ${tile.brand}.  ${tile.category} project from Soonk Paik's portfolio.`,
  };
}

// Dispatch by slug.  Built case studies get their dedicated component;
// everything else lands on the ComingSoon placeholder so the link still
// feels intentional instead of 404-ing.
//
// NOTE: this worktree owns the GIA branch.  Sister worktrees own the other
// case studies (e.g. Volthop) — when branches merge, this dispatch grows
// additional cases.
export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tile = tiles.find((t) => t.slug === slug);
  if (!tile) notFound();

  return (
    <main className="min-h-screen bg-[#EEEEEE] text-[#1F1F1F]">
      <CaseStudyNav currentSlug={slug} />
      {slug === "gia" ? <GiaCaseStudy /> : <ComingSoon tile={tile} />}
    </main>
  );
}
