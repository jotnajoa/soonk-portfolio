// About-me timeline data.
//
// Four parallel timelines (work, home, travel, love), each rendered as a
// 4×4 grid spanning 2012-2027.  The active category switch on the page
// swaps which timeline is shown.  Cards in the grid show a short glyph
// (a wordmark / icon for the entry active that year); hover surfaces a
// tooltip with key info; click opens a modal with the full sentence
// (e.g. "I worked... at GS Engineering and Construction 2012-2015 as PM").
//
// The grid years array is also the source of truth for the grid layout —
// every column header reads from YEARS[i], so adding 2028 here adds a row.

export const YEARS = [
  2012, 2013, 2014, 2015,
  2016, 2017, 2018, 2019,
  2020, 2021, 2022, 2023,
  2024, 2025, 2026, 2027,
] as const;

export type Category = "work" | "home" | "travel" | "love";

export type AboutEntry = {
  id: string;
  // Years (inclusive) this entry occupies in the grid.  An entry can be
  // a single year ([2020]) or a span ([2012, 2013, 2014, 2015]).  Years
  // outside YEARS are ignored.
  years: number[];
  // What renders inside the grid cell.
  //   "text" — draw the string as a wordmark (used for short labels and
  //            emoji glyphs in home/travel/love).
  //   "icon" — render an inline SVG from /icons (used for the SCAD years
  //            which reuse the graduation-cap glyph from the Lecture &
  //            Publication section).
  //   "img"  — render a real logo asset from /public/about (the company
  //            PNGs Soonk delivered for the work timeline).
  glyph:
    | { kind: "text"; value: string }
    | { kind: "icon"; src: string; alt: string }
    | { kind: "img"; src: string; alt: string };
  // Header shown in the modal — varies per category to read naturally:
  //   work   → "I worked… at"
  //   home   → "I lived in"  (or "I live in" for the current location)
  //   travel → "I love trips to"
  //   love   → "My favorite thing to do was"
  modalLabel: string;
  // Main name in the modal + tooltip (e.g. "GS Engineering and Construction").
  title: string;
  // Period string (e.g. "2012–2015", "2018–Current").
  period: string;
  // Optional third line in the modal (e.g. "as PM").  Tooltip never
  // shows this — it's reserved for the full-info modal.
  detail?: string;
};

export const ABOUT: Record<Category, AboutEntry[]> = {
  // Work + study — the schooling years (SCAD 2016-2017 in the grid) are
  // included in this timeline because the user thinks of them as "what
  // I was doing" the same way as a job.  The modal label flips to
  // "I studied at" for the SCAD entry.
  work: [
    {
      id: "gs",
      years: [2012, 2013, 2014, 2015],
      glyph: { kind: "img", src: "/about/gs.png", alt: "GS Engineering & Construction logo" },
      modalLabel: "I worked at",
      title: "GS Engineering & Construction",
      period: "2012–2015",
      detail: "as PM",
    },
    {
      id: "scad",
      years: [2016, 2017],
      glyph: {
        kind: "icon",
        src: "/icons/lecture.svg",
        alt: "Graduation cap",
      },
      modalLabel: "I studied at",
      title: "SCAD",
      period: "2015–2018",
      detail: "Bachelor of Interior Design",
    },
    {
      id: "ks",
      years: [2018, 2019],
      glyph: { kind: "img", src: "/about/krause-sawyer.png", alt: "Krause Sawyer logo" },
      modalLabel: "I worked at",
      title: "Krause Sawyer",
      period: "2018–2020",
      detail: "as Designer",
    },
    {
      id: "dmk",
      years: [2020],
      glyph: { kind: "img", src: "/about/dmk.png", alt: "DMK logo" },
      modalLabel: "I worked at",
      title: "DMK",
      period: "2020",
      detail: "as Sr. Data Viz Designer",
    },
    {
      id: "teachable",
      years: [2021],
      glyph: { kind: "img", src: "/about/teachable.png", alt: "Teachable logo" },
      modalLabel: "I worked at",
      title: "Teachable",
      period: "2021–2022",
      detail: "as Data Viz Designer",
    },
    {
      id: "pepsico",
      years: [2022],
      glyph: { kind: "img", src: "/about/pepsico.png", alt: "PepsiCo logo" },
      modalLabel: "I worked at",
      title: "PepsiCo",
      period: "2022",
      detail: "as Sr. Product Designer",
    },
    {
      id: "deloitte",
      years: [2023, 2024, 2025, 2026],
      glyph: { kind: "img", src: "/about/deloitte.png", alt: "Deloitte logo" },
      modalLabel: "I work at",
      title: "Deloitte",
      period: "2023–Current",
      detail: "as UX Lead",
    },
  ],

  home: [
    // Korea claims 2012-2014; Italy gets 2015 on its own so the grid
    // shows the move year clearly (the original sketch had Korea +
    // Italy both covering 2015, which made 2015 read as ambiguous).
    {
      id: "korea",
      years: [2012, 2013, 2014],
      glyph: { kind: "text", value: "🇰🇷" },
      modalLabel: "I lived in",
      title: "Korea",
      period: "2012–2014",
    },
    {
      id: "italy",
      years: [2015],
      glyph: { kind: "text", value: "🇮🇹" },
      modalLabel: "I lived in",
      title: "Italy",
      period: "2015",
    },
    // Atlanta + Savannah collapse into one Georgia peach glyph in the
    // grid — both cities are in Georgia, so the years read as a single
    // visual stretch.  Modals still distinguish the two.
    {
      id: "atlanta",
      years: [2016],
      glyph: { kind: "text", value: "🍑" },
      modalLabel: "I lived in",
      title: "Atlanta",
      period: "2016",
    },
    {
      id: "savannah",
      years: [2017],
      glyph: { kind: "text", value: "🍑" },
      modalLabel: "I lived in",
      title: "Savannah",
      period: "2017",
    },
    {
      id: "newyork",
      years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026],
      glyph: { kind: "text", value: "🗽" },
      modalLabel: "I live in",
      title: "New York",
      period: "2018–Current",
    },
  ],

  travel: [
    {
      id: "spain",
      years: [2012],
      glyph: { kind: "text", value: "🇪🇸" },
      modalLabel: "I loved my trip to",
      title: "Spain",
      period: "2012",
    },
    {
      id: "taiwan",
      years: [2013],
      glyph: { kind: "text", value: "🇹🇼" },
      modalLabel: "I loved my trip to",
      title: "Taiwan",
      period: "2013",
    },
    {
      id: "china",
      years: [2014],
      glyph: { kind: "text", value: "🇨🇳" },
      modalLabel: "I loved my trip to",
      title: "China",
      period: "2014",
    },
    {
      id: "italy-trip",
      years: [2015],
      glyph: { kind: "text", value: "🇮🇹" },
      modalLabel: "I loved my trip to",
      title: "Italy",
      period: "2015",
    },
    {
      id: "korea-trip",
      years: [2021],
      glyph: { kind: "text", value: "🇰🇷" },
      modalLabel: "I loved my trip to",
      title: "Korea",
      period: "2021",
    },
    {
      id: "japan",
      years: [2022],
      glyph: { kind: "text", value: "🇯🇵" },
      modalLabel: "I loved my trip to",
      title: "Japan",
      period: "2022",
    },
    {
      id: "peru",
      years: [2023],
      glyph: { kind: "text", value: "🇵🇪" },
      modalLabel: "I loved my trip to",
      title: "Peru",
      period: "2023",
    },
    {
      id: "morocco",
      years: [2024],
      glyph: { kind: "text", value: "🇲🇦" },
      modalLabel: "I loved my trip to",
      title: "Morocco",
      period: "2024",
    },
    {
      id: "indonesia",
      years: [2025],
      glyph: { kind: "text", value: "🇮🇩" },
      modalLabel: "I loved my trip to",
      title: "Indonesia",
      period: "2025",
    },
    {
      id: "newzealand",
      years: [2026],
      glyph: { kind: "text", value: "🇳🇿" },
      modalLabel: "I loved my trip to",
      title: "New Zealand",
      period: "2026",
    },
  ],

  love: [
    {
      id: "reading",
      years: [2012, 2013, 2014],
      glyph: { kind: "text", value: "📖" },
      modalLabel: "My favorite thing to do was",
      title: "Reading",
      period: "2012–2014",
    },
    {
      id: "art-craft",
      years: [2015, 2016, 2017],
      glyph: { kind: "text", value: "🎨" },
      modalLabel: "My favorite thing to do was",
      title: "Art & Craft",
      period: "2015–2017",
    },
    {
      id: "raving",
      years: [2018, 2019],
      glyph: { kind: "text", value: "🪩" },
      modalLabel: "My favorite thing to do was",
      title: "Raving + Clubbing",
      period: "2018–2019",
    },
    {
      id: "hiking",
      years: [2020, 2021, 2024],
      glyph: { kind: "text", value: "🥾" },
      modalLabel: "My favorite thing to do was",
      title: "Hiking",
      period: "2020–2021, 2024",
    },
    {
      id: "tennis",
      years: [2022, 2023],
      glyph: { kind: "text", value: "🎾" },
      modalLabel: "My favorite thing to do was",
      title: "Tennis",
      period: "2022–2023",
    },
    {
      id: "camping",
      years: [2025],
      glyph: { kind: "text", value: "⛺" },
      modalLabel: "My favorite thing to do was",
      title: "Camping",
      period: "2025",
    },
    {
      id: "cycling",
      years: [2026],
      glyph: { kind: "text", value: "🚲" },
      modalLabel: "My favorite thing to do is",
      title: "Cycling",
      period: "2026–Current",
    },
  ],
};

// Helper: for a given category + year, find the entry covering that year.
// Returns undefined for empty cells (rendered as a dashed-border future tile).
export function entryAt(category: Category, year: number): AboutEntry | undefined {
  return ABOUT[category].find((e) => e.years.includes(year));
}

export const CATEGORY_META: Record<
  Category,
  { id: Category; label: string; ariaLabel: string }
> = {
  work: { id: "work", label: "Work", ariaLabel: "Show work timeline" },
  home: { id: "home", label: "Home", ariaLabel: "Show home timeline" },
  travel: {
    id: "travel",
    label: "Travel",
    ariaLabel: "Show travel timeline",
  },
  love: {
    id: "love",
    label: "Loves",
    ariaLabel: "Show favorite-thing timeline",
  },
};

export const CATEGORIES: Category[] = ["work", "home", "travel", "love"];
