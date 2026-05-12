import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import ProjectNav from "@/components/ProjectNav";
import TranslateGuard from "@/components/TranslateGuard";
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
  // Tell Google's translation infrastructure to leave the page alone.
  // When auto-translate runs, it wraps every text node in <font> tags
  // and swaps text children — which makes React's reconciler call
  // removeChild on nodes that are no longer where it last saw them,
  // surfacing the classic
  //   "Failed to execute 'removeChild' on 'Node': The node to be removed
  //    is not a child of this node"
  // crash.  Browsers default to offering translate when the page locale
  // doesn't match the user locale (so this site, lang="en", is a prime
  // candidate for any non-English browser).
  other: {
    google: "notranslate",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // `translate="no"` is the in-DOM equivalent of the <meta> above and
    // also covers other translate engines (DeepL, browser-builtins).  The
    // `notranslate` class is honored by some Chrome flows even when the
    // attribute alone doesn't take.
    <html
      lang="en"
      translate="no"
      className={`${archivo.variable} ${archivo.className} ${jetbrainsMono.variable} notranslate h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/* Runtime safety net for browser auto-translate — strips the
            Google Translate injection that would otherwise crash React
            with "Failed to execute 'removeChild' on 'Node'". */}
        <TranslateGuard />
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
