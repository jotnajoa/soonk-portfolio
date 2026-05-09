import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import ProjectList from "@/components/ProjectList";
import ProjectNav from "@/components/ProjectNav";
import MobileNav from "@/components/MobileNav";
import ScrollHint from "@/components/ScrollHint";
import FlyingSquares from "@/components/FlyingSquares";

export default function Home() {
  return (
    <>
      {/* Desktop nav (≥800px) */}
      <ProjectNav />
      {/* Mobile header + hamburger menu (<800px) */}
      <MobileNav />

      <Hero />

      {/* Desktop-only: 3×3 grid view that flies into the header */}
      <Grid />

      <ScrollHint />
      <ProjectList />
      <FlyingSquares />
    </>
  );
}
