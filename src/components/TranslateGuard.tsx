"use client";

import { useEffect } from "react";

// TranslateGuard — best-effort defense against Chrome / browser auto-
// translate.  When Google Translate runs, it wraps text nodes in
// <font> tags AND adds .translated-ltr / .translated-rtl to <html>;
// the <font> wraps are what break React's reconciler ("Failed to
// execute 'removeChild' on 'Node'") because the children React expected
// at a given fiber are now nested inside the injected <font>.
//
// We already declare notranslate via meta + html attribute + class
// (see layout.tsx), but that's a *request* — manual translate triggers
// and some enterprise browsers ignore it.  This component is the
// runtime safety net:
//
//   1. Re-assert the notranslate hints on mount (in case a hot reload
//      or another script stripped them).
//   2. Watch <html> for the translation signature class.  When it
//      appears, strip it + the injected font wraps and force a single
//      reload (gated by sessionStorage so we don't loop).  After the
//      reload, the page renders fresh without translation; if the
//      browser tries again we land on global-error.tsx instead of a
//      blank crashed page.
//
// Renders nothing.

export default function TranslateGuard() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const html = document.documentElement;

    // Step 1 — re-assert hints.
    html.setAttribute("translate", "no");
    if (!html.classList.contains("notranslate")) {
      html.classList.add("notranslate");
    }
    const meta = document.querySelector(
      'meta[name="google"][content="notranslate"]',
    );
    if (!meta) {
      const m = document.createElement("meta");
      m.setAttribute("name", "google");
      m.setAttribute("content", "notranslate");
      document.head.appendChild(m);
    }

    // Step 2 — watch for the translation signature.
    const isTranslated = () =>
      html.classList.contains("translated-ltr") ||
      html.classList.contains("translated-rtl");

    const recover = () => {
      // Strip Google Translate's classes.
      html.classList.remove("translated-ltr", "translated-rtl");
      // Strip the <font> wraps it injects around translated text.
      // We don't try to be surgical — any <font> in the body is
      // GoogleTranslate-only on this site (we never author <font>).
      document.querySelectorAll("font").forEach((f) => {
        const parent = f.parentNode;
        if (!parent) return;
        while (f.firstChild) parent.insertBefore(f.firstChild, f);
        parent.removeChild(f);
      });
      // One reload to fully reset translation state.  Gated so we
      // never bounce forever — sessionStorage clears with the tab.
      if (!sessionStorage.getItem("translate-guard-reloaded")) {
        sessionStorage.setItem("translate-guard-reloaded", "1");
        window.location.reload();
      }
    };

    if (isTranslated()) recover();

    const observer = new MutationObserver(() => {
      if (isTranslated()) recover();
    });
    observer.observe(html, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return null;
}
