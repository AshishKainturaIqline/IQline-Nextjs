import { HeroBackground } from "@/components/hero-background";
function PageHeroShell({ children }) {
  return <section className="relative overflow-hidden pb-16 pt-10 sm:pb-20 sm:pt-14">
      <div className="absolute inset-0 bg-[oklch(0.09_0.04_240)]" />
      <HeroBackground />
      <div className="relative z-20">{children}</div>
      {
    /* Fade into page body: only in dark theme (light background makes the fade look muddy) */
  }
      <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-32 bg-gradient-to-t from-background to-transparent dark:block" />
    </section>;
}
export {
  PageHeroShell
};
