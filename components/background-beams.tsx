"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  const beamsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveBeams = (e: MouseEvent) => {
      if (!beamsRef.current) return;

      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) * 100;
      const y = (clientY / window.innerHeight) * 100;

      beamsRef.current.style.setProperty("--x", `${x}%`);
      beamsRef.current.style.setProperty("--y", `${y}%`);
    };

    window.addEventListener("mousemove", moveBeams);
    return () => window.removeEventListener("mousemove", moveBeams);
  }, []);

  return (
    <div
      ref={beamsRef}
      className={cn(
        "fixed inset-0 opacity-30 translate-z-0 pointer-events-none",
        className
      )}
      style={{
        background:
          "radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.06) 0%, transparent 60%)",
      }}
    >
      <div className="absolute inset-0 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
    </div>
  );
};