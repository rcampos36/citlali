"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function BottomBanner() {
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
    <section
      className="relative py-[75px]"
      aria-label="Book an appointment"
      style={{
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
      }}
    >
      <div
        ref={containerRef}
        className="relative w-full h-[657px] overflow-hidden"
      >
        <Image
          src="/images/bottom-banner-image.jpg"
          alt="Modern interior with plant, chair, and storage cabinet"
          fill
          className={`object-cover object-center transition-transform duration-[1.5s] ease-out ${
            inView ? "animate-reveal-zoom" : "scale-[1.1]"
          }`}
          sizes="100vw"
          priority={false}
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
        <div className="absolute inset-0 flex items-center pl-[20%] md:pl-[15%] z-20">
          <Link
            href="/#contact"
            className="btn-white"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </section>
  );
}
