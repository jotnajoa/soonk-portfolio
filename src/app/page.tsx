import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import ProjectList from "@/components/ProjectList";
import ProjectNav from "@/components/ProjectNav";

export default function Home() {
  return (
    <>
      <ProjectNav />
      <Hero />
      <Grid />
      <ProjectList />
    </>
  );
}
