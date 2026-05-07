import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import ProjectNav from "@/components/ProjectNav";
import MobileMenu from "@/components/MobileMenu";

export default function Home() {
  return (
    <>
      <ProjectNav />
      <MobileMenu />
      <Hero />
      <Grid />
    </>
  );
}
