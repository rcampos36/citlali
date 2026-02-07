"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const heading = "WE BUILD YOUR SUSTAINABLE LIFESTYLE";
const paragraph =
  "Crafting interiors that showcase your individuality, elevate your lifestyle, and infuse timeless beauty into every space.";

export function HeroBanner() {
  const containerRef = useRef<HTMLSectionElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { rootMargin: "0px 0px -50px 0px", threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="w-full font-sans md:min-h-[1097px] md:pb-[75px]"
      aria-label="Hero"
    >
      <div className="hero-bg-lines w-full">
        <div className="grid w-full grid-cols-1 gap-6 pt-11 sm:gap-8 md:grid-cols-[3fr_1fr] md:gap-x-0 md:gap-y-8 lg:gap-y-12">
        {/* Left: spacer pushes h1 down so image stays in place; h1 307px touching image; image 990×493 */}
        <div className="flex min-h-0 flex-col gap-4 sm:gap-6 md:min-h-0 md:gap-0">
          {/* Spacer: moves h1 down so image top stays at 404px (aligned with paragraph) */}
          <div className="hidden shrink-0 md:block md:h-[97px]" aria-hidden />
          <h1 className="flex items-start gap-3 text-xl font-semibold uppercase tracking-tight text-[#4a4c56] sm:text-2xl md:h-[307px] md:text-3xl lg:text-[2rem]">
            <span
              className="mt-1.5 h-2 w-2 flex-shrink-0 bg-[#171717] sm:mt-2 sm:h-2.5 sm:w-2.5"
              aria-hidden
            />
            <span className="tracking-[1px] text-base font-heading font-button">{heading}</span>
          </h1>
          <div className="group relative aspect-[4/3] w-full overflow-hidden sm:aspect-[5/4] md:h-[493px] md:w-full md:aspect-auto">
            <Image
              src="/images/banner-image-1.jpg"
              alt="Modern living room with large windows, city skyline view, light sofas, wooden coffee table, and green plants"
              fill
              className={`object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 ${
                inView ? "animate-reveal-zoom" : "scale-[1.1]"
              }`}
              sizes="(max-width: 767px) 100vw, 990px"
              priority
            />
            <div
              className={`pointer-events-none absolute inset-x-0 top-0 z-10 h-1/2 bg-white ${
                inView ? "animate-reveal-split-top" : ""
              }`}
              aria-hidden
            />
            <div
              className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/2 bg-white ${
                inView ? "animate-reveal-split-bottom" : ""
              }`}
              aria-hidden
            />
          </div>
        </div>

        {/* Right: on md+ content is absolute so this cell contributes 0 height → banner ends at left image bottom */}
        <div className="relative flex flex-col gap-4 sm:gap-6 md:h-0 md:min-h-0">
          <div className="flex flex-col gap-4 sm:gap-6 md:absolute md:left-0 md:top-0 md:right-0">
            <div className="group relative aspect-[33/38] w-full overflow-hidden md:ml-auto md:h-[380px] md:w-[330px] md:flex-shrink-0 md:aspect-auto">
              <Image
                src="/images/banner-image-2.jpg"
                alt="Luxurious living room with high ceilings, arched windows, cream sectional and elegant decor"
                fill
                className={`object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 ${
                  inView ? "animate-reveal-zoom" : "scale-[1.1]"
                }`}
                sizes="(max-width: 767px) 100vw, 330px"
                priority
              />
              <div
                className={`pointer-events-none absolute inset-x-0 top-0 z-10 h-1/2 bg-white ${
                  inView ? "animate-reveal-split-top" : ""
                }`}
                aria-hidden
              />
              <div
                className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/2 bg-white ${
                  inView ? "animate-reveal-split-bottom" : ""
                }`}
                aria-hidden
              />
            </div>
            <p className="mx-[10px] max-w-lg text-base leading-relaxed text-[#171717] sm:text-lg md:max-w-none">
              {paragraph}
            </p>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
