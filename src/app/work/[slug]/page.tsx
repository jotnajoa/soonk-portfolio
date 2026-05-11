import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { tiles } from "@/data/tiles";
import CaseStudyNav from "@/components/cases/CaseStudyNav";
import VolthopCaseStudy from "@/components/cases/Volthop";
import ToyotaCaseStudy from "@/components/cases/Toyota";
import ParkingCaseStudy from "@/components/cases/Parking";
import GiaCaseStudy from "@/components/cases/Gia";
import TeachableCaseStudy from "@/components/cases/Teachable";
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
      {slug === "volthop" ? (
        <VolthopCaseStudy />
      ) : slug === "toyota" ? (
        <ToyotaCaseStudy />
      ) : slug === "parking" ? (
        <ParkingCaseStudy />
      ) : slug === "gia" ? (
        <GiaCaseStudy />
      ) : slug === "teachable" ? (
        <TeachableCaseStudy />
      ) : (
        <ComingSoon tile={tile} />
      )}
    </main>
  );
}
