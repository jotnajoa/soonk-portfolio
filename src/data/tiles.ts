// 9 projects ordered to match the Figma grid (3×3, left-to-right, top-to-bottom):
//
//   01 POMEs       02 Volthop      03 GIA Platform
//   04 Toyota      05 Word-up      06 Alnylam
//   07 Teachable   08 NYC parking  09 GTM Marketing
//
// IDs match positions, so list-view numbers (01 through 09) match grid
// indicator order, match nav indicator order — single source of truth.
//
// Each tile's exact GRID content is hardcoded in its bespoke component
// (Grid.tsx) because Figma's 9 tiles all have unique layouts and trying to
// generalize them was hiding intentional per-tile differences.  This file
// keeps the metadata (id · brand · category) plus list-view content/thumbs
// the generic ProjectList still consumes.

export type Tile = {
  id: string;
  brand: string;
  category: "Founder" | "Client" | "Personal" | "Side";

  // List view (full-width row) — kept data-driven for now
  list: {
    tagline?: string;
    description?: string;
    keyword?: string;
    quotes?: string[];
    hashtags?: string[];
    thumbs?: string[];
  };
};

export const tiles: Tile[] = [
  {
    id: "01",
    brand: "POMEs",
    category: "Founder",
    list: {
      tagline: "Small-scale Social Infrastructure",
      description:
        'Trust-based help app for verified small communities, one building at a time. Two design inversions from user research: the feed defaults to "I can help" instead of "help me" (Participation Paradox)',
      thumbs: ["/works/pomes-1.jpg", "/works/pomes-2.jpg"],
    },
  },
  {
    id: "02",
    brand: "Volthop",
    category: "Founder",
    list: {
      tagline: "Peer-to-peer battery rental",
      description:
        "Marketplace for folding e-bike travelers. fly with the bike, borrow a compatible battery from a local at the destination. Validated before build",
      thumbs: ["/works/volthop-1.jpg", "/works/volthop-2.jpg"],
    },
  },
  {
    id: "03",
    brand: "GIA Platform",
    category: "Client",
    list: {
      tagline: "Global enterprise sales intelligence",
      description:
        "When the PM team drowned in scope, I refocused the room on three questions and rebuilt the onshore/offshore handoff. 43% design cost reduction, 2× product launches, 400+ monthly adopters.",
      thumbs: ["/works/gia-1.jpg", "/works/gia-2.jpg"],
    },
  },
  {
    id: "04",
    brand: "Toyota Guidehub",
    category: "Client",
    list: {
      description:
        "Leadership-shaped engagement, not craft-shaped. A stalled Toyota team needed someone to triage, not redesign.",
      quotes: ['"UX bloat"', '"Velocity"', '"Negotiable"'],
      thumbs: ["/works/toyota-1.jpg", "/works/toyota-2.jpg"],
    },
  },
  {
    id: "05",
    brand: "Word-up",
    category: "Personal",
    list: {
      tagline:
        '"How many English words do I actually need to follow a hip-hop song?"',
      description:
        "A personal project as an ESL listener. Separated vocabulary count from raw word count to track diversity by decade.",
      thumbs: ["/works/wordup-1.jpg"],
    },
  },
  {
    id: "06",
    brand: "Alnylam SSOT",
    category: "Client",
    list: {
      tagline: '"Wrong on Purpose"',
      description:
        "A client that didn't know what they wanted—and didn't want to slow down to figure it out. I moved the team forward by sketching quickly, getting things wrong on purpose, and using visual feedback loops to refine direction in real time.",
      thumbs: ["/works/alnylam-1.jpg"],
    },
  },
  {
    id: "07",
    brand: "Teachable",
    category: "Client",
    list: {
      tagline: "Advanced Reporting",
      keyword: '"LOW USAGE ≠ LOW VALUE"',
      description:
        "Built Teachable's first real analytics product for schools. Two unpopular calls early: cut the power-user persona from V1, ship Traffic & Conversion at the school level.",
      thumbs: ["/works/teachable-1.jpg", "/works/teachable-2.jpg"],
    },
  },
  {
    id: "08",
    brand: "Is street parking really free?",
    category: "Personal",
    list: {
      tagline: "Is street parking really free?",
      description:
        'Pulled NYC Open Data\'s parking-ticket dataset — messy, missing rows and all — and weighted ticket risk by expected value. Verdict: on average, the "free" curb spot costs more than a paid garage.',
      hashtags: ["#Daily-life friction", "#small civic pain point"],
      thumbs: ["/works/parking-1.jpg"],
    },
  },
  {
    id: "09",
    brand: "GTM Marketing discovery",
    category: "Side",
    list: {
      tagline: "GTM Marketing discovery",
      hashtags: ["#Daily-life friction", "#small civic pain point"],
    },
  },
];
