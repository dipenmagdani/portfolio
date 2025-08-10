import { SocialLinks } from "./social-links";

export const Footer = () => {
  return (
    <footer className="relative border-t border-white/10 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 text-sm text-white/60 md:flex-row">
        <p>© {new Date().getFullYear()} Dipen Magdani. All rights reserved.</p>
        <SocialLinks />
      </div>
    </footer>
  );
};
