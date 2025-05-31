"use client";

import TypewriterComponent from "typewriter-effect";

interface TypewriterProps {
  words: string[];
}

export const Typewriter = ({ words }: TypewriterProps) => {
  return (
    <TypewriterComponent
      options={{
        strings: words,
        autoStart: true,
        loop: true,
        delay: 75,
        deleteSpeed: 50,
      }}
    />
  );
};
