"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SiGithub, SiLinkedin, SiGmail } from "react-icons/si";
import { SlSocialTwitter } from "react-icons/sl";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/dipenmagdani",
    icon: SiGithub,
    color: "hover:text-[#333]",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/dipenmagdani",
    icon: SiLinkedin,
    color: "hover:text-[#0A66C2]",
  },
  {
    name: "Twitter",
    href: "https://twitter.com/vajratheastra",
    icon: SlSocialTwitter,
    color: "hover:text-[#1DA1F2]",
  },
  {
    name: "Email",
    href: "mailto:dipenmagdani@gmail.com",
    icon: SiGmail,
    color: "hover:text-[#EA4335]",
  },
];

export const SocialLinks = () => {
  return (
    <div className="flex items-center gap-6">
      {socialLinks.map((link, index) => (
        <motion.div
          key={link.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.1 * index,
            type: "spring",
            stiffness: 100,
          }}
        >
          <Link
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-white/50 ${link.color} transition-all duration-300 hover:scale-125`}
          >
            <link.icon className="w-6 h-6" />
          </Link>
        </motion.div>
      ))}
    </div>
  );
};
