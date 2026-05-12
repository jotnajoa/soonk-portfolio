// Lecture + Publication registry for the /publication section on home.
//
// Two surfaces:
//   - Lectures: courses/practicums Soonk has taught.  Every row uses the
//     same generic school icon — affiliation drives only the meta line
//     (year range · institute name in uppercase, mirrors the publication
//     meta format below).
//   - Publications: articles Soonk wrote on Medium / Nightingale.
//
// `href` is optional — items without a public URL render the title with no
// arrow affordance instead of a broken link.

export type LectureAffiliation = "newschool" | "mica" | "deloitte";

export type Lecture = {
  id: string;
  affiliation: LectureAffiliation;
  /** Course / lecture title as printed on the official catalog. */
  title: string;
  /** Display label for the engagement period — e.g., "2022 – Current"
   *  for ongoing courses, "2024" for one-time, "2022 – 2025" for past. */
  period: string;
  /** Optional canonical link (course catalog page). */
  href?: string;
  /** Optional one-line summary.  Renders below the title when present. */
  description?: string;
};

export type Publication = {
  id: string;
  title: string;
  year: number;
  /** Where it was published (e.g., "Bootcamp on Medium"). */
  venue: string;
  /** Optional canonical link to the article. */
  href?: string;
  /** Optional one-line summary.  Renders below the title when present. */
  description?: string;
};

// Affiliation display names — used as readable labels for screen
// readers AND as the venue half of each row's meta line.
export const AFFILIATION_NAME: Record<LectureAffiliation, string> = {
  newschool: "The New School",
  mica: "MICA",
  deloitte: "Deloitte",
};

export const lectures: Lecture[] = [
  {
    id: "ns-infoviz",
    affiliation: "newschool",
    title: "Information Visualization",
    period: "2022 – Current",
    href: "https://courses.newschool.edu/courses/PUDM2700/",
  },
  {
    id: "ns-ai-concepts",
    affiliation: "newschool",
    title: "AI Concepts and Applications for Creatives",
    period: "2023 – Current",
    href: "https://cpe.newschool.edu/search/publicCourseSearchDetails.do?method=load&courseId=6453372",
  },
  {
    id: "ns-harnessing-ai",
    affiliation: "newschool",
    title: "Harnessing AI in Creative Orgs",
    period: "2023 – Current",
    href: "https://cpe.newschool.edu/search/publicCourseSearchDetails.do?method=load&courseId=6454085",
  },
  {
    id: "ns-dataviz-portfolio",
    affiliation: "newschool",
    title: "Data Visualization Portfolio",
    period: "2022 – 2025",
    href: "https://catalog.newschool.edu/courses/PCSP0834",
  },
  {
    id: "ns-infographics",
    affiliation: "newschool",
    title: "Infographics & Visual Storytelling",
    period: "2022 – 2025",
    href: "https://catalog.newschool.edu/courses/PCSP0832",
  },
  {
    id: "mica-interactive-storytelling",
    affiliation: "mica",
    title: "Interactive Data Storytelling",
    period: "2023 – Current",
    href: "https://www.mica.edu/academics/academic-catalog/graduate-curriculum-overview/#mps",
  },
  {
    id: "mica-capstone",
    affiliation: "mica",
    title: "Capstone I",
    period: "2023",
    href: "https://www.mica.edu/academics/academic-catalog/graduate-curriculum-overview/#mps",
  },
  {
    id: "mica-d3",
    affiliation: "mica",
    title: "Fundamentals of D3",
    period: "2025",
  },
  {
    id: "deloitte-dataviz-practicum",
    affiliation: "deloitte",
    title: "Data Visualization for Consultants (Practicum)",
    period: "2024",
  },
];

// For the Medium series, the canonical article title is everything up to the
// em-dash; the part after is editorial subtitle.  Splitting them between
// `title` and `description` lets the row keep title to a single line on
// most viewports without truncating the subtitle.
export const publications: Publication[] = [
  {
    id: "ai-patterns-series-2",
    title: "UI/UX Patterns for AI Products: Series 2",
    description: "Is your AI a Guide, Companion, or Driver?",
    year: 2024,
    venue: "Bootcamp on Medium",
    href: "https://medium.com/design-bootcamp/a-designers-guide-to-ui-ux-patterns-for-ai-products-series-2-is-your-ai-a-guide-companion-or-f81f7d276bc8",
  },
  {
    id: "ai-patterns-series-3",
    title: "UI/UX Patterns for AI Products: Series 3",
    description: "Navigating View-Specific and External Contexts",
    year: 2024,
    venue: "Bootcamp on Medium",
    href: "https://medium.com/design-bootcamp/a-designers-guide-to-ui-ux-patterns-for-ai-products-series-3-navigating-view-specific-and-external-45e1a361e35f",
  },
  {
    id: "ai-patterns-series-5",
    title: "UI/UX Patterns for AI Products: Series 5",
    description: "Navigating the Line Between Search, Prompts, and Chatbots",
    year: 2024,
    venue: "Bootcamp on Medium",
    href: "https://medium.com/design-bootcamp/a-designers-guide-to-ui-ux-patterns-for-ai-products-series-5-navigating-the-line-between-search-73df8b102862",
  },
  {
    id: "chatgpt-dataviz",
    title: "How I Created a Data Visualization With Zero Coding Skills, Thanks to ChatGPT",
    year: 2023,
    venue: "Nightingale",
    href: "https://nightingaledvs.com/data-visualization-using-chatgpt-to-code/",
  },
];
