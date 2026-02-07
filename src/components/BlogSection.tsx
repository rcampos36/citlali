"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const posts = [
  {
    id: 1,
    image: "/images/blog-image-1.jpg",
    imageAlt: "Open-concept living and dining area with light walls, grey sofa, and elegant decor",
    category: "Interior",
    date: "July 18, 2025",
    title: "How to Make Small Spaces Feel Bigger and Brighter",
  },
  {
    id: 2,
    image: "/images/blog-image-2.jpg",
    imageAlt: "Contemporary interior with abstract art, orange bench, and minimalist aesthetic",
    category: "Information",
    date: "August 20, 2025",
    title: "The Art of Mixing Textures in Your Interior Design",
  },
];

function BlogPostImage({
  src,
  alt,
  inView,
}: {
  src: string;
  alt: string;
  inView: boolean;
}) {
  return (
    <div className="group relative aspect-[647/460] w-full overflow-hidden">
      <Image
        src={src}
        alt={alt}
        width={647}
        height={460}
        className={`object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 ${
          inView ? "animate-reveal-zoom" : "scale-[1.1]"
        }`}
        sizes="(max-width: 767px) 100vw, 647px"
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

export function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
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
      id="blog"
      ref={sectionRef}
      className="w-full py-[75px] font-sans"
      aria-label="Our Blog"
    >
      <div className="mx-auto max-w-[1320px]">
        {/* Header: black square + OUR BLOG + horizontal line (same as testimonials) */}
        <h2 className="mb-16 flex w-full items-center gap-3">
          <span
            className="h-2 w-2 flex-shrink-0 bg-[#171717] sm:h-2.5 sm:w-2.5"
            aria-hidden
          />
          <span className="text-sm font-semibold uppercase tracking-tight text-[#171717] sm:text-base">
            Our Blog
          </span>
          <span
            className="ml-2 flex-1 border-b border-[#e5e5e5]"
            aria-hidden
          />
        </h2>

        {/* Two posts in a row, gap 24px; same space after title as testimonials (mt-32) */}
        <div className="mt-32 grid w-full grid-cols-1 gap-[24px] sm:grid-cols-2">
          {posts.map((post, index) => (
            <article
              key={post.id}
              className="flex flex-col transition-all duration-700 ease-out"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(24px)",
                transitionDelay: inView ? `${200 + index * 150}ms` : "0ms",
              }}
            >
              <BlogPostImage
                src={post.image}
                alt={post.imageAlt}
                inView={inView}
              />
              <p className="mt-4 font-sans text-sm text-[#171717]">
                <span className="font-semibold">{post.category}</span>
                <span className="mx-1.5 text-[#4a4c56]">—</span>
                <span className="text-[#4a4c56]">{post.date}</span>
              </p>
              <h3
                className="mt-2 font-heading font-bold leading-tight text-[#171717]"
                style={{ fontSize: "32px" }}
              >
                {post.title}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
