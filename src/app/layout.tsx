import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import ProjectNav from "@/components/ProjectNav";
import "./globals.css";

// Archivo — primary type family for everything.  Italic variant included
// for case-study pull quotes (loaded by default in the Google font).
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
});

// JetBrains Mono — accent only.  Used for the giant 01–09 numbers in the
// desktop list view AND for the case-study section markers / stat
// numbers / timeline dates.  Exposed as a CSS var so inline styles can
// opt in.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Soonk Paik — Product person",
  description:
    "Design is one of my tools, not my goal. I build to find out what's true.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${archivo.className} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/* Global desktop header — appears on every route.  On the landing
            it starts at opacity 0 and is faded in by FlyingSquares as the
            grid scrolls into view.  On every other route it renders
            visible immediately (see ProjectNav for the pathname check). */}
        <ProjectNav />
        {children}
      </body>
    </html>
  );
}
