import { BackgroundBeams } from "@/components/background-beams";
import { SkillsList } from "@/components/skills-list";
import { SocialLinks } from "@/components/social-links";
import { Typewriter } from "@/components/typewriter";
import { BackgroundBeamsWithCollision } from "@/components/background-beams-with-collision";
import { DotBackground } from "@/components/dot-background";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dipen Magdani - Coming Soon...",
  description:
    "A passionate Frontend Developer and Graphic Designer crafting beautiful, user-friendly experiences. Skilled in web development, UI/UX design, and creating engaging digital solutions.",
  keywords: [
    "Dipen Magdani",
    "Vajratheastra",
    "Frontend Developer",
    "Graphic Designer",
    "UI/UX Designer",
    "Web Development",
    "React",
    "Next.js",
    "Visual Design",
    "Creative Design",
  ],
  authors: [{ name: "Dipen Magdani (Vajratheastra)" }],
  metadataBase: new URL("https://dipen.live"),
  openGraph: {
    title:
      "Dipen Magdani | Vajratheastra - Frontend Developer & Graphic Designer",
    description:
      "A passionate Frontend Developer and Graphic Designer crafting beautiful, user-friendly experiences.",
    type: "website",
    locale: "en_US",
    url: "https://dipen.live",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Dipen Magdani | Vajratheastra - Frontend Developer & Graphic Designer",
    description:
      "A passionate Frontend Developer and Graphic Designer crafting beautiful, user-friendly experiences.",
    creator: "@Vajratheastra",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0">
        <DotBackground>
          <div />
        </DotBackground>
      </div>
      <div className="absolute inset-0">
        <BackgroundBeamsWithCollision>
          <div />
        </BackgroundBeamsWithCollision>
      </div>
      <div className="relative z-10 text-center space-y-12 py-8 max-w-4xl mx-auto">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ee4242] to-[#F37335]  bg-opacity-50 p-4 flex items-center justify-center h-[120px] underline">
            <Typewriter
              words={[
                "Dipen Magdani",
                "Vajratheastra",
                "Frontend Developer",
                "Graphic Designer",
                "UI/UX Designer",
              ]}
            />
          </h1>

          <p className="text-xl md:text-2xl text-neutral-200  mx-auto leading-relaxed p-2">
            A passionate Frontend Developer and Graphic Designer crafting
            beautiful, user-friendly digital experiences.
          </p>
        </div>

        <SkillsList />

        <div className="space-y-6">
          <div className="inline-block rounded-full border border-white/20 bg-black/30 backdrop-blur-sm px-8 py-3">
            <p className="text-lg text-neutral-200 animate-pulse">
              Portfolio Coming Soon
            </p>
          </div>
        </div>

        <div className="pt-4 w-full flex justify-center">
          <SocialLinks />
        </div>
      </div>
    </main>
  );
}
