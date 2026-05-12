"use client";

// Root-level error boundary.  Next.js App Router invokes this when an
// error escapes the rest of the tree (including the layout) — the most
// common cause on this site is Google Translate's <font> wrap pattern
// breaking React's reconciler with "Failed to execute 'removeChild' on
// 'Node'".  Rendering its own <html>/<body> is required because the
// layout itself may have crashed.
//
// Behavior: show a quiet "Something went wrong" card with two actions —
// reload the page (resets translation state + remounts everything) and
// go back to the home route.  Both are no-deps DOM/native calls so
// they keep working even if React's reconciler is still glitched.

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Best-effort log so this surfaces in browser console + Cloudflare
    // function logs in prod.  We don't ship Sentry/etc.
    console.error("[global-error]", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          background: "#EEEEEE",
          color: "#1F1F1F",
          fontFamily: "Archivo, system-ui, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px",
        }}
      >
        <div style={{ maxWidth: 480, textAlign: "left" }}>
          <p
            style={{
              margin: 0,
              fontSize: 12,
              letterSpacing: "0.16em",
              fontWeight: 500,
              color: "#5D5D5D",
              textTransform: "uppercase",
              fontFamily:
                "var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
            }}
          >
            + Oops
          </p>
          <h1
            style={{
              margin: "12px 0 18px",
              fontSize: 36,
              lineHeight: 1.1,
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}
          >
            Something went wrong.
          </h1>
          <p
            style={{
              margin: "0 0 28px",
              fontSize: 16,
              lineHeight: 1.55,
              color: "#5D5D5D",
              maxWidth: 420,
            }}
          >
            The page got into a state React couldn&rsquo;t recover from —
            usually because the browser&rsquo;s auto-translate or an
            extension is editing the DOM under React&rsquo;s feet.
            Reload to clear, or jump back to the portfolio home.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => {
                // reset() retries the current segment in place; cheap.
                reset();
              }}
              style={{
                cursor: "pointer",
                padding: "10px 18px",
                fontSize: 14,
                fontWeight: 600,
                border: "2px solid #1F1F1F",
                background: "#00FB00",
                color: "#1F1F1F",
                boxShadow: "4px 4px 0 0 #1F1F1F",
                fontFamily: "inherit",
              }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{
                padding: "10px 18px",
                fontSize: 14,
                fontWeight: 500,
                border: "2px solid #1F1F1F",
                background: "transparent",
                color: "#1F1F1F",
                textDecoration: "none",
              }}
            >
              ← Back to portfolio
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
