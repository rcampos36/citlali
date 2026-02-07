import { AboutUsImage } from "@/components/AboutUsImage";
import { AboutUsStats } from "@/components/AboutUsStats";

export function AboutUs() {
  return (
    <section
      id="about"
      className="w-full pb-[75px] font-sans"
      aria-label="About Us"
    >
      {/* Section header: black square + ABOUT US + horizontal line */}
      <h2 className="mb-16 flex w-full items-center gap-3">
        <span
          className="h-2 w-2 flex-shrink-0 bg-[#171717] sm:h-2.5 sm:w-2.5"
          aria-hidden
        />
        <span className="text-sm font-semibold uppercase tracking-tight text-[#171717] sm:text-base">
          About Us
        </span>
        <span
          className="ml-2 flex-1 border-b border-[#e5e5e5]"
          aria-hidden
        />
      </h2>

      {/* Paragraph + button in same column */}
      <div className="mb-8 flex w-full flex-col gap-6 sm:mb-10 sm:gap-8">
        <p className="font-heading w-full max-w-full text-2xl font-normal leading-[1.2] tracking-[1px] text-[#171717] sm:text-[32px] md:text-[40px]">
          In 2010, a passionate team of designers founded Citlali with a simple
          mission to transform bold visions into timeless interiors. We&apos;re
          known for more than just designing spaces. We craft experiences that
          inspire, comfort, and endure.
        </p>
        <a href="/quote" className="btn-primary mt-8 mb-16">
          Book Appointment
        </a>
      </div>

      {/* Stats (~40–45%) + image (~55–60%) side by side, no gap */}
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-[2fr_3fr] sm:gap-0 sm:items-stretch">
        <AboutUsStats />
        <AboutUsImage />
      </div>
    </section>
  );
}
