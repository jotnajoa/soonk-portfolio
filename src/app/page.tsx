import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import ProjectList from "@/components/ProjectList";
import ProjectNav from "@/components/ProjectNav";
import MobileNav from "@/components/MobileNav";
import ScrollHint from "@/components/ScrollHint";
import FlyingSquares from "@/components/FlyingSquares";
import ViewportSync from "@/components/ViewportSync";

export default function Home() {
  return (
    <>
      {/* Desktop sticky nav (≥800px) — fixed full-width bar that fades in
          via FlyingSquares as the grid scrolls into view. */}
      <ProjectNav />

      <Hero />

      {/* Mobile sticky bar (<800px) — WORKS title + hamburger.  Lives
          BETWEEN hero and the works content so its natural position is
          just-below the hero; sticks to the viewport top once scrolled
          past.  Stays out of the hero animation entirely. */}
      <MobileNav />

      {/* Desktop-only: 3×3 grid view that flies into the header */}
      <Grid />

      <ScrollHint />
      <ProjectList />
      <FlyingSquares />

      {/* Resize-aware scroll preservation.  Renders nothing; just keeps
          the user pinned to the same list tile when the viewport crosses
          the mobile↔tablet breakpoint (Grid/pin appearing or disappearing
          would otherwise dump them into white space mid-transition). */}
      <ViewportSync />
    </>
  );
}
