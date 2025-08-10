"use client";

import { motion } from "framer-motion";

export const About = () => {
  return (
    <section id="about" className="relative py-20">
      <div className="mx-auto max-w-5xl px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          About
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-white/70 text-lg leading-relaxed"
        >
          I craft fast, accessible interfaces and learnable systems. With a
          hybrid background in frontend engineering, UI design and graphic
          design, I love bridging brand, motion and interaction to ship products
          that feel polished. I enjoy design systems, micro-interactions and
          performance.
        </motion.p>
      </div>
    </section>
  );
};
