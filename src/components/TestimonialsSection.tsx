"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const testimonials = [
  {
    id: 1,
    quote:
      "Aurelo turned our apartment into a space we never want to leave. From the first consultation, they truly listened to our ideas and understood our lifestyle. Every corner feels intentional — from the way the light moves through the rooms to the carefully chosen textures and colors. The end result is not just beautiful, but deeply personal, making it feel completely ours in every sense. It's more than interior design; it's a space that tells our story.",
    name: "Sarah Meri",
    title: "Residential Client",
    image: "/images/Slide-Image-1.jpg",
    imageAlt: "Sarah Meri, residential client",
  },
  {
    id: 2,
    quote:
      "Working with Aurelo was a game-changer for our office. They transformed a dull corporate space into an inspiring environment that our team actually enjoys. The attention to detail and understanding of how we work made every decision feel right. We've had countless compliments from clients and visitors.",
    name: "James Chen",
    title: "Commercial Client",
    image: "/images/Slide-Image-2.jpg",
    imageAlt: "James Chen, commercial client",
  },
  {
    id: 3,
    quote:
      "From concept to completion, Aurelo exceeded our expectations. Our home now reflects who we are — refined, warm, and full of character. They guided us through every choice without ever overpowering our vision. We couldn't be happier with the result.",
    name: "Elena Rodriguez",
    title: "Residential Client",
    image: "/images/Slide-Image-3.jpg",
    imageAlt: "Elena Rodriguez, residential client",
  },
];

function TestimonialImage({
  src,
  alt,
  inView,
}: {
  src: string;
  alt: string;
  inView: boolean;
}) {
  return (
    <div
      className="group relative overflow-hidden"
      style={{
        aspectRatio: "545/560",
        height: 560,
        maxWidth: "100%",
        width: 545,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 ${
          inView ? "animate-reveal-zoom" : "scale-[1.1]"
        }`}
        sizes="(max-width: 767px) 100vw, 545px"
        unoptimized
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

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { rootMargin: "0px 0px -50px 0px", threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const current = testimonials[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="w-full py-[75px] font-sans"
      aria-label="Testimonials"
    >
      <div className="mx-auto max-w-[1320px]">
        {/* Header: black square + TESTIMONIALS + horizontal line */}
        <h2 className="mb-16 flex w-full items-center gap-3">
          <span
            className="h-2 w-2 flex-shrink-0 bg-[#171717] sm:h-2.5 sm:w-2.5"
            aria-hidden
          />
          <span className="text-sm font-semibold uppercase tracking-tight text-[#171717] sm:text-base">
            Testimonials
          </span>
          <span
            className="ml-2 flex-1 border-b border-[#e5e5e5]"
            aria-hidden
          />
        </h2>

        {/* Two-column: left = quote + author + nav; right = image (paragraph lines up with top of image) */}
        <div className="mt-32 grid w-full grid-cols-1 items-start gap-8 md:grid-cols-[1fr_auto] md:gap-12 lg:gap-16">
          <div
            className="flex min-h-[560px] flex-col transition-all duration-700 ease-out"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(-24px)",
              transitionDelay: inView ? "400ms" : "0ms",
            }}
          >
            <blockquote className="mb-8">
              <p className="font-heading text-lg leading-relaxed text-[#171717] sm:text-xl">
                &ldquo;{current.quote}&rdquo;
              </p>
            </blockquote>
            <div className="mt-auto flex w-full flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-heading font-bold text-[#171717]" style={{ fontSize: "20px" }}>
                  {current.name}
                </p>
                <p className="mt-1 font-sans text-sm text-[#4a4c56]">
                  {current.title}
                </p>
              </div>
              <div className="flex items-center gap-2" role="group" aria-label="Testimonial navigation">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous testimonial"
                className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-none border border-[#1a1a1a] bg-transparent text-[#1a1a1a] transition-colors duration-300 ease-out hover:bg-[#1a1a1a] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:ring-offset-2"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next testimonial"
                className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-none border border-[#1a1a1a] bg-transparent text-[#1a1a1a] transition-colors duration-300 ease-out hover:bg-[#1a1a1a] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:ring-offset-2"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              </div>
            </div>
          </div>

          <div
            className="relative"
            style={{
              aspectRatio: "545/560",
              height: 560,
              maxWidth: "100%",
              width: 545,
            }}
          >
            <TestimonialImage
              key={activeIndex}
              src={current.image}
              alt={current.imageAlt}
              inView={inView}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
