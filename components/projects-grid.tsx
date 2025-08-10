"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { Badge } from "@/components/ui/badge";

export const ProjectsGrid = () => {
  return (
    <section id="projects" className="relative py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Selected Work
            </h2>
            <p className="text-white/60 mt-2">
              A mix of web, UI and graphic pieces. Real projects can be added
              later.
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.03] backdrop-blur-sm shadow-[0px_10px_40px_rgba(0,0,0,0.25)] hover:shadow-[0px_20px_60px_rgba(0,0,0,0.35)] transition-shadow"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute right-3 top-3 flex items-center gap-2">
                  <span className="rounded-full bg-black/60 px-2 py-1 text-xs text-white/80">
                    {project.year}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold tracking-tight">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-white/70 line-clamp-2">
                  {project.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-white/10 border-white/10 text-white/90"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {project.links && project.links.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-3">
                    {project.links.map((l) => (
                      <Link
                        key={l.url}
                        href={l.url}
                        target="_blank"
                        className="text-sm font-medium text-orange-400 hover:text-orange-300"
                      >
                        {l.label} →
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
