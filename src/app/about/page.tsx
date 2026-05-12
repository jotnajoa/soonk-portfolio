import type { Metadata } from "next";
import AboutPage from "@/components/about/AboutPage";

export const metadata: Metadata = {
  title: "About me — Soonk Paik",
  description:
    "We are all changing slightly over time. Nothing is forever. A timeline of where I've worked, lived, traveled, and what I loved.",
};

export default function Page() {
  return <AboutPage />;
}
