export type ProjectLink = {
  label: "Live" | "GitHub" | "Figma" | "Case Study";
  url: string;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  role: string[];
  year: string;
  image: string; // public path
  links?: ProjectLink[];
};

export const projects: Project[] = [
  {
    slug: "aurora-ui-system",
    title: "Aurora UI System",
    description:
      "A polished design system in Figma and React with accessible components, tokens, and motion guidelines.",
    tags: ["Figma", "Design System", "React", "Accessibility"],
    role: ["UI/UX", "Frontend"],
    year: "2024",
    image: "/grid.svg",
    links: [
      { label: "Figma", url: "https://www.figma.com" },
      { label: "GitHub", url: "https://github.com/dipenmagdani" },
    ],
  },
  {
    slug: "folio-studio",
    title: "Folio Studio Website",
    description:
      "High-performance marketing site with animated sections, optimized Core Web Vitals, and CMS integration.",
    tags: ["Next.js", "TypeScript", "SEO", "Framer Motion"],
    role: ["Frontend"],
    year: "2024",
    image: "/images/logo.png",
    links: [
      { label: "Live", url: "https://dipen.live" },
      { label: "GitHub", url: "https://github.com/dipenmagdani" },
    ],
  },
  {
    slug: "poster-campaign",
    title: "Poster Campaign – Neon Nights",
    description:
      "A graphic design series exploring neon palettes, typography rhythm, and print-ready compositions.",
    tags: ["Photoshop", "Illustrator", "Print"],
    role: ["Graphic Design"],
    year: "2023",
    image: "/grid.svg",
    links: [{ label: "Case Study", url: "https://behance.net" }],
  },
  {
    slug: "dashboard-x",
    title: "Dashboard X",
    description:
      "Analytics dashboard with modular charts, dark mode, and real-time interactions.",
    tags: ["Next.js", "Recharts", "Tailwind"],
    role: ["Frontend"],
    year: "2023",
    image: "/grid.svg",
  },
  {
    slug: "micro-animations",
    title: "Micro-interactions Library",
    description:
      "A library of reusable micro-interactions built with Framer Motion for product teams.",
    tags: ["Framer Motion", "TypeScript"],
    role: ["UI/UX", "Frontend"],
    year: "2022",
    image: "/grid.svg",
  },
  {
    slug: "remix-shop",
    title: "Remix Shop",
    description:
      "E-commerce prototype focused on delightful UX, optimistic UI, and accessibility.",
    tags: ["Remix", "Tailwind", "A11y"],
    role: ["Frontend"],
    year: "2022",
    image: "/grid.svg",
  },
];
