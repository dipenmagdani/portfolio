"use client";

import { motion } from "framer-motion";
import { Paintbrush, Layout, Code2 } from "lucide-react";

const services = [
  {
    title: "Frontend Development",
    description:
      "Modern React/Next.js apps with TypeScript, performance, and a11y.",
    icon: Code2,
  },
  {
    title: "UI/UX Design",
    description:
      "From wireframes to high-fidelity prototypes in Figma with motion.",
    icon: Layout,
  },
  {
    title: "Graphic Design",
    description:
      "Brand assets, posters and visual direction in Photoshop/Illustrator.",
    icon: Paintbrush,
  },
];

export const Services = () => {
  return (
    <section id="services" className="relative py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">What I Do</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm hover:bg-white/10 transition-colors"
            >
              <s.icon className="h-8 w-8 text-orange-400" />
              <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-white/70">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
