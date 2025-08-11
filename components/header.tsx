"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { appConfig } from "@/config/app.config";

const nav = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-colors",
        scrolled ? "bg-black/60 backdrop-blur border-b border-white/10" : ""
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="#" className="font-semibold">
          Dipen Magdani
        </Link>
        <nav className="hidden gap-6 text-sm md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white/70 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href={`${appConfig.CLOUDINARY_URL}dipen_resume_fullstack.pdf`}
          className="rounded-full border border-white/15 px-4 py-1.5 text-sm text-white/90 hover:bg-white/10"
        >
          Resume
        </Link>
      </div>
    </header>
  );
};
