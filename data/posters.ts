export type Poster = {
  id: string;
  title: string;
  thumb: string; // small/medium preview
  full: string; // high quality image
  year?: string;
  tools?: string[]; // e.g., Photoshop, Illustrator
};

export const posters: Poster[] = [
  {
    id: "ravaan",
    title: "Ravaan",
    thumb: "/app/assets/posters/yash_raavan.jpg",
    full: "/app/assets/posters/yash_raavan.jpg",
    year: "2025",
    tools: ["Photoshop"],
  },
  {
    id: "neon-nights-02",
    title: "Neon Nights 02",
    thumb: "/grid.svg",
    full: "/grid.svg",
    year: "2023",
    tools: ["Photoshop", "Illustrator"],
  },
  {
    id: "typography-rhythm",
    title: "Typography Rhythm",
    thumb: "/grid.svg",
    full: "/grid.svg",
    year: "2022",
    tools: ["Photoshop"],
  },
  {
    id: "color-waves",
    title: "Color Waves",
    thumb: "/grid.svg",
    full: "/grid.svg",
    year: "2022",
    tools: ["Photoshop"],
  },
];
