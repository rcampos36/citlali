"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function AboutUsImage() {
  const containerRef = useRef<HTMLDivElement>(null);
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
    <div
      ref={containerRef}
      className="group relative min-h-[320px] w-full overflow-hidden sm:min-h-[400px] md:min-h-[440px]"
    >
      <Image
        src="/images/about-image.jpg"
        alt="Modern minimalist interior with white walls, large windows, and indoor plants"
        fill
        className={`object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 ${
          inView ? "animate-reveal-zoom" : "scale-[1.1]"
        }`}
        sizes="(max-width: 639px) 100vw, 55vw"
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
  );
}
