// 16 tiles for the 4×4 main-body grid.
// Source of truth: Raw_Material/portfolio-content-v1.md.
// HELLO + READ ME are intentionally NOT tiles — they live in the header/footer.

export type TileLayout = "A" | "B" | "C" | "D";

export type Tile = {
  id: string; // "01" .. "16" — used for nav indicator + URL slug
  number: string; // display label
  category: "Client" | "Founder" | "Personal" | "Publication" | "Teaching";
  keyword: string; // primary main keyword (renders biggest)
  keywordQuoted?: boolean; // wrap in quotes (the "FLIPPED THE ASK" style)
  secondary?: string; // smaller word-cloud companion
  tertiary?: string; // optional sideways word
  body?: string; // paragraph variant (Layout C)
  subtitle?: string; // small caption shown on hover/detail
  role?: string;
  link?: string;
  layout: TileLayout;
};

export const tiles: Tile[] = [
  // Row 1 — Client / Enterprise
  {
    id: "01",
    number: "01",
    category: "Client",
    keyword: "CUT THE RITUAL",
    secondary: "velocity > process",
    tertiary: "enterprise scale",
    subtitle: "GIA · Deloitte's enterprise platform",
    role: "UX Lead",
    layout: "A",
  },
  {
    id: "02",
    number: "02",
    category: "Client",
    keyword: "WRONG ON PURPOSE",
    keywordQuoted: true,
    secondary: "fixed scope",
    tertiary: "earned the expansion",
    subtitle: "Alnylam SSOT",
    role: "Operator / strategist",
    layout: "B",
  },
  {
    id: "03",
    number: "03",
    category: "Client",
    keyword: "NON-NEGOTIABLE",
    secondary: "senior team",
    tertiary: "principled critique",
    subtitle: "Toyota Guide Hub",
    role: "Acting design lead",
    layout: "D",
  },
  {
    id: "04",
    number: "04",
    category: "Client",
    keyword: "LOW USAGE ≠ LOW VALUE",
    keywordQuoted: true,
    secondary: "scoped persona",
    tertiary: "87% engagement",
    subtitle: "Advanced Reporting · Teachable",
    role: "Solo IC designer",
    link: "https://www.soonkdesign.com/portfolio-1-2/project-one-f5w4d-yblp2",
    layout: "C",
  },

  // Row 2 — Solo Founder
  {
    id: "05",
    number: "05",
    category: "Founder",
    keyword: "FLIPPED THE ASK",
    keywordQuoted: true,
    secondary: "behavior > brief",
    subtitle: "POMEs · neighborhood karma app",
    role: "Solo founder",
    layout: "A",
  },
  {
    id: "06",
    number: "06",
    category: "Founder",
    keyword: "ELEVATOR ONLY",
    secondary: "distribution ceiling",
    tertiary: "NYC ground game",
    subtitle: "POMEs · go-to-market",
    role: "Solo founder",
    layout: "D",
  },
  {
    id: "07",
    number: "07",
    category: "Founder",
    keyword: "AirBnBattery",
    keywordQuoted: true,
    secondary: "users named it",
    tertiary: "iOS App Store live",
    subtitle: "VoltHop · P2P e-bike battery rentals",
    role: "Solo founder",
    layout: "B",
  },
  {
    id: "08",
    number: "08",
    category: "Founder",
    keyword: "AEO",
    secondary: "Brompton meetups",
    tertiary: "subreddit playbook",
    subtitle: "VoltHop · go-to-market",
    role: "Solo founder",
    layout: "C",
  },

  // Row 3 — Personal experiments
  {
    id: "09",
    number: "09",
    category: "Personal",
    keyword: "CIVIC",
    secondary: "NYC",
    tertiary: "personal",
    subtitle: "Parking Ticket Tracker",
    link: "https://www.soonkdesign.com/personal-1/project-two-ky966-lnbgh-smsgj-fxf46",
    layout: "A",
  },
  {
    id: "10",
    number: "10",
    category: "Personal",
    keyword: "LEARN",
    secondary: "vocab",
    tertiary: "daily",
    subtitle: "Word Up — vocabulary experiment",
    link: "https://www.soonkdesign.com/personal-1/project-two-ky966-lnbgh-smsgj",
    layout: "B",
  },
  {
    id: "11",
    number: "11",
    category: "Personal",
    keyword: "SUSTAIN",
    secondary: "food",
    tertiary: "waste",
    subtitle: "Save My Leftover — sustainability behavior design",
    link: "https://www.soonkdesign.com/personal-1/project-two-ky966-lnbgh-smsgj-fxf46-scgsd",
    layout: "D",
  },

  // Row 4 — Publications & teaching
  {
    id: "12",
    number: "12",
    category: "Publication",
    keyword: "AI UX",
    secondary: "3-part series",
    tertiary: "Bootcamp",
    subtitle: "A Designer's Guide to UI/UX Patterns for AI Products",
    layout: "C",
  },
  {
    id: "13",
    number: "13",
    category: "Publication",
    keyword: "TEARDOWN",
    secondary: "physical",
    tertiary: "everyday",
    subtitle: "Product Experience Journal",
    layout: "A",
  },
  {
    id: "14",
    number: "14",
    category: "Teaching",
    keyword: "PARSONS",
    secondary: "teach",
    tertiary: "dataviz",
    subtitle: "Information Visualization · The New School",
    link: "https://courses.newschool.edu/courses/PUDM2700/",
    layout: "B",
  },
  {
    id: "15",
    number: "15",
    category: "Teaching",
    keyword: "MICA",
    secondary: "teach",
    tertiary: "storytelling",
    subtitle: "Interactive Data Storytelling · MICA",
    link: "https://mica.instructure.com/courses/39637/assignments/syllabus",
    layout: "D",
  },
  {
    id: "16",
    number: "16",
    category: "Publication",
    keyword: "KEYNOTE",
    secondary: "AI",
    tertiary: "creative ops",
    subtitle: "Harnessing AI in Creative Org. — speaker session",
    layout: "A",
  },
];
