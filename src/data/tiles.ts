// 9 projects for the Works page (Figma Opening section, Desktop-4 onward).
// HELLO + READ ME removed — they live elsewhere (header / footer / contact).
//
// Two slightly different presentations exist in Figma:
//   - Grid view (3×3 tiles, 280h):       compact summary, tagline-driven
//   - List view (full-width rows, 280h):  number + content + thumbnails
//
// This file is the single source of truth for both.  Logos and thumbnails
// are referenced by file path inside /public/works/ (TBD; placeholders OK
// for first pass until images are imported).

export type Tile = {
  id: string; // "01" .. "09" — used for nav indicator + URL slug
  brand: string;
  category: "Founder" | "Client" | "Personal" | "Side";

  // Grid view (compact 280px tile)
  grid: {
    tagline: string; // bold subtitle
    taglineWeight?: "black" | "normal"; // default "black"; Word-up uses "normal"
    blurb?: string; // optional secondary text (Archivo Medium 20px in Figma)
    callout?: { strike?: string; arrow?: boolean; final?: string }; // POMEs-style "Help me → I can help"
    quotes?: string[]; // Toyota-style trio of quoted phrases
    keyword?: string; // big keyword (Battery-bnb rotated, “Wrong on Purpose”, etc.)
    keywordRotated?: boolean;
    description?: string; // longer paragraph (regular 16px)
    hashtags?: string[]; // NYC parking style
  };

  // List view (full-width row)
  list: {
    tagline: string; // 20px subtitle
    description: string; // 16px body
    keyword?: string; // optional accent quote ("LOW USAGE ≠ LOW VALUE")
    quotes?: string[];
    hashtags?: string[];
    thumbs?: string[]; // image paths in /public/works/
  };
};

export const tiles: Tile[] = [
  {
    id: "01",
    brand: "POMEs",
    category: "Founder",
    grid: {
      tagline: "Small-scale Social Infrastructure",
      blurb: "Falsified the first hypothesis\nSolo founder — field marketing",
      callout: { strike: "Help me", arrow: true, final: "I can help" },
    },
    list: {
      tagline: "Small-scale Social Infrastructure",
      description:
        'Trust-based help app for verified small communities, one building at a time. Two design inversions from user research: the feed defaults to "I can help" instead of "help me" (Participation Paradox)',
      thumbs: [
        "/works/pomes-1.jpg",
        "/works/pomes-2.jpg",
      ],
    },
  },
  {
    id: "02",
    brand: "Volthop",
    category: "Founder",
    grid: {
      tagline: "Peer-to-peer battery rental",
      description:
        'Reddit Marketing: Problem post (no solution mentioned) → engagement → "now released" announcement. Demand manufactured, then delivered',
      keyword: "Battery-bnb",
      keywordRotated: true,
    },
    list: {
      tagline: "Peer-to-peer battery rental",
      description:
        "Marketplace for folding e-bike travelers. fly with the bike, borrow a compatible battery from a local at the destination. Validated before build",
      thumbs: [
        "/works/volthop-1.jpg",
        "/works/volthop-2.jpg",
      ],
    },
  },
  {
    id: "03",
    brand: "GIA Platform",
    category: "Client",
    grid: {
      tagline: "Global enterprise sales intelligence",
      description:
        "Leading UX strategy and design operations for a global enterprise sales intelligence platform.",
    },
    list: {
      tagline: "Global enterprise sales intelligence",
      description:
        "When the PM team drowned in scope, I refocused the room on three questions and rebuilt the onshore/offshore handoff. 43% design cost reduction, 2× product launches, 400+ monthly adopters.",
      thumbs: [
        "/works/gia-1.jpg",
        "/works/gia-2.jpg",
      ],
    },
  },
  {
    id: "04",
    brand: "Toyota Guidehub",
    category: "Client",
    grid: {
      tagline: "",
      quotes: ['"Trimmed UX bloat"', '"Team velocity"', '"Non-negotiable"'],
    },
    list: {
      tagline: "",
      description:
        "Leadership-shaped engagement, not craft-shaped. A stalled Toyota team needed someone to triage, not redesign.",
      quotes: ['"UX bloat"', '"Velocity"', '"Negotiable"'],
      thumbs: [
        "/works/toyota-1.jpg",
        "/works/toyota-2.jpg",
      ],
    },
  },
  {
    id: "05",
    brand: "Alnylam SSOT",
    category: "Client",
    grid: {
      tagline: '"Wrong on Purpose"',
      description:
        "Two-month fixed timeline + fixed budget. No room for traditional UX process.",
    },
    list: {
      tagline: '"Wrong on Purpose"',
      description:
        "A client that didn't know what they wanted—and didn't want to slow down to figure it out. I moved the team forward by sketching quickly, getting things wrong on purpose, and using visual feedback loops to refine direction in real time.",
      thumbs: ["/works/alnylam-1.jpg"],
    },
  },
  {
    id: "06",
    brand: "Teachable",
    category: "Client",
    grid: {
      tagline: '"LOW USAGE ≠ LOW VALUE"',
      description:
        "Segmented users by data literacy and explicitly cut the power-user persona from V1, chose Traffic & Conversion at the school level. Designed measurable success criteria upfront (engagement score + NPS)",
    },
    list: {
      tagline: "Advanced Reporting",
      keyword: '"LOW USAGE ≠ LOW VALUE"',
      description:
        "Built Teachable's first real analytics product for schools. Two unpopular calls early: cut the power-user persona from V1, ship Traffic & Conversion at the school level.",
      thumbs: [
        "/works/teachable-1.jpg",
        "/works/teachable-2.jpg",
      ],
    },
  },
  {
    id: "07",
    brand: "Is street parking really free?",
    category: "Personal",
    grid: {
      tagline: "",
      hashtags: ["#Daily-life friction", "#small civic pain point"],
    },
    list: {
      tagline: "Is street parking really free?",
      description:
        'Pulled NYC Open Data\'s parking-ticket dataset — messy, missing rows and all — and weighted ticket risk by expected value. Verdict: on average, the "free" curb spot costs more than a paid garage.',
      hashtags: ["#Daily-life friction", "#small civic pain point"],
      thumbs: ["/works/parking-1.jpg"],
    },
  },
  {
    id: "08",
    brand: "Word-up",
    category: "Personal",
    grid: {
      tagline:
        "How Many Words Does a Hip-Hop Song Need?\nA Quantitative Analysis of Hip-Hop Lyrics",
      taglineWeight: "normal",
    },
    list: {
      tagline: '"How many English words do I actually need to follow a hip-hop song?"',
      description:
        "A personal project as an ESL listener. Separated vocabulary count from raw word count to track diversity by decade.",
      thumbs: ["/works/wordup-1.jpg"],
    },
  },
  {
    id: "09",
    brand: "GTM Marketing discovery",
    category: "Side",
    grid: {
      tagline: "",
      hashtags: ["#Daily-life friction", "#small civic pain point"],
    },
    list: {
      tagline: "GTM Marketing discovery",
      description: "",
      hashtags: ["#Daily-life friction", "#small civic pain point"],
    },
  },
];
