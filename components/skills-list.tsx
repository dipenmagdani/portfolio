"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFigma,
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiFramer,
  SiGit,
  SiJavascript,
  SiRemix,
} from "react-icons/si";

const skills = [
  { name: "React", icon: SiReact, color: "text-[#61DAFB]" },
  { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
  { name: "Remix", icon: SiRemix, color: "text-purple-600" },
  { name: "TypeScript", icon: SiTypescript, color: "text-[#3178C6]" },
  { name: "JavaScript", icon: SiJavascript, color: "text-[#F7DF1E]" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-[#38B2AC]" },
  { name: "Framer Motion", icon: SiFramer, color: "text-[#FF0055]" },
  { name: "Git", icon: SiGit, color: "text-[#F05032]" },
  { name: "Figma", icon: SiFigma, color: "text-[#F24E1E]" },
  { name: "Photoshop", icon: SiAdobephotoshop, color: "text-[#31A8FF]" },
  { name: "Illustrator", icon: SiAdobeillustrator, color: "text-[#FF9A00]" },
];

export const SkillsList = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="flex flex-wrap gap-3 justify-center max-w-3xl mx-auto items-center"
    >
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.1 * index,
            type: "spring",
            stiffness: 100,
          }}
        >
          <Badge
            variant="secondary"
            className="bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/10 px-4 py-2 text-base flex items-center gap-2 transition-all duration-300 hover:scale-110"
          >
            <skill.icon className={`w-4 h-4 ${skill.color}`} />
            {skill.name}
          </Badge>
        </motion.div>
      ))}
    </motion.div>
  );
};
