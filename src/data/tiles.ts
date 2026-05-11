// 9 projects.  IDs match the canonical LIST order (left column of the Figma
// list view, top → bottom) — this is what nav indicators and flying-squares
// indicators reference:
//
//   01 POMEs       — Founder
//   02 Volthop     — Founder
//   03 GIA Platform — Client (with Deloitte)
//   04 Toyota Guidehub — Client
//   05 Alnylam SSOT — Client
//   06 Teachable   — Client
//   07 NYC parking — Personal (Is street parking really free?)
//   08 Word-up     — Personal
//   09 GTM Marketing — Side
//
// The grid view (Figma 55:458, Desktop-4) renders these in a DIFFERENT order
// to match Figma's 3×3 visual layout — Word-up sits at row 2 col 2, etc.
// See Grid.tsx for the visual arrangement.  Each tile keeps its data-tile-id
// matching this list order so flying-squares can map by ID, not index.
//
// Tile content (both grid + list) is hardcoded inside each bespoke component
// because Figma's 9 tiles all have unique layouts.  This file is just the
// metadata registry (id, brand, category) for nav indicators + mobile menu.

export type Tile = {
  id: string;
  /** URL slug — used for the case-study route /work/{slug}. */
  slug: string;
  brand: string;
  /** One-line editorial subtitle.  Surfaced in the CaseStudyNav hover
   *  tooltip; can be reused anywhere a quick "what is this?" line helps. */
  tagline: string;
  category: "Founder" | "Client" | "Personal" | "Side";
};

export const tiles: Tile[] = [
  { id: "01", slug: "pomes",     brand: "POMEs",                          tagline: "Small-scale Social Infrastructure",        category: "Founder" },
  { id: "02", slug: "volthop",   brand: "Volthop",                        tagline: "Peer-to-peer battery rental",              category: "Founder" },
  { id: "03", slug: "gia",       brand: "GIA Platform",                   tagline: "Global enterprise sales intelligence",     category: "Client"  },
  { id: "04", slug: "toyota",    brand: "Toyota Guidehub",                tagline: "Supply-chain operations rescue",           category: "Client"  },
  { id: "05", slug: "alnylam",   brand: "Alnylam SSOT",                   tagline: "Single source of truth, fixed timeline",   category: "Client"  },
  { id: "06", slug: "teachable", brand: "Teachable",                      tagline: "Advanced Reporting — low usage ≠ low value", category: "Client"  },
  { id: "07", slug: "parking",   brand: "Is street parking really free?", tagline: "NYC civic data exploration",               category: "Personal"},
  { id: "08", slug: "wordup",    brand: "Word-up",                        tagline: "Quantitative hip-hop lyrics analysis",     category: "Personal"},
  { id: "09", slug: "gtm",       brand: "GTM Marketing discovery",        tagline: "Marketing channel discovery",              category: "Side"    },
];
