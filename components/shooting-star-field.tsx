"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Star {
  id: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
}

export const ShootingStarField = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 2 + 1,
        delay: Math.random() * 5,
      }));
      setStars(newStars);
    };

    generateStars();
    const interval = setInterval(generateStars, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          initial={{
            opacity: 0,
            x: `${star.x}%`,
            y: `${star.y}%`,
            scale: 0,
          }}
          animate={{
            opacity: [0, 1, 0],
            x: [`${star.x}%`, `${star.x + 20}%`],
            y: [`${star.y}%`, `${star.y + 20}%`],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            ease: "easeInOut",
            times: [0, 0.5, 1],
          }}
          className="absolute w-1 h-1 bg-white rounded-full shadow-lg"
          style={{
            boxShadow: "0 0 20px 2px rgba(255, 255, 255, 0.7)",
          }}
        />
      ))}
    </div>
  );
};
