import { BackgroundBeams } from "@/components/background-beams";
import { SkillsList } from "@/components/skills-list";
import { SocialLinks } from "@/components/social-links";
import { Typewriter } from "@/components/typewriter";
import { BackgroundBeamsWithCollision } from "@/components/background-beams-with-collision";
import { DotBackground } from "@/components/dot-background";
import { ProjectsGrid } from "@/components/projects-grid";
import { About } from "@/components/about";
import { Services } from "@/components/services";
import { Contact } from "@/components/contact";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PostersCarousel } from "@/components/posters-carousel";
import { HeroParallax } from "@/components/hero-parallax";
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
    <main className="relative min-h-screen w-full overflow-hidden bg-black">
      <Header />
      <section className="relative flex min-h-[90vh] items-center justify-center">
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
        <HeroParallax>
          <div className="relative z-10 text-center space-y-8 py-24 max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ee4242] to-[#F37335] p-2">
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
            <p className="text-xl md:text-2xl text-neutral-200 mx-auto leading-relaxed">
              I build modern, performant web apps and craft elegant UI systems.
            </p>
            <div className="pt-2 w-full flex justify-center">
              <SocialLinks />
            </div>
            <div className="pt-4">
              <SkillsList />
            </div>
          </div>
        </HeroParallax>
      </section>

      <About />
      <Services />
      <ProjectsGrid />
      <PostersCarousel />
      <Contact />
      <Footer />

      <BackgroundBeams />
    </main>
  );
}
