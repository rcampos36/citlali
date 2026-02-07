"use client";

import React, { useRef, useState, useEffect } from "react";

const processSteps = [
  {
    id: 1,
    title: "Consultation & Discovery",
    description:
      "We start by understanding your needs, style preferences, and lifestyle through an in-depth consultation.",
    icon: "/images/Process%20Icon%201.svg",
  },
  {
    id: 2,
    title: "Concept & Planning",
    description:
      "Our team creates mood boards, layouts, and design concepts tailored to your vision.",
    icon: "/images/Process%20Icon%202.svg",
  },
  {
    id: 3,
    title: "Design Development",
    description:
      "From material selection to detailed 3D visualizations, we refine every aspect for perfection.",
    icon: "/images/Process%20Icon%203.svg",
  },
  {
    id: 4,
    title: "Implementation & Delivery",
    description:
      "We coordinate with contractors and oversee every detail until your vision is brought to life.",
    icon: "/images/Process%20Icon%204.svg",
  },
];

const BOX_HEIGHT_PX = 400;
const STAGGER_OFFSET_PX = BOX_HEIGHT_PX / 2; /* top of each box aligns with middle of previous */
const CONTAINER_HEIGHT_PX = 3 * STAGGER_OFFSET_PX + BOX_HEIGHT_PX; /* 1000px */

const MD_BREAKPOINT_PX = 768;

/** 0 = staggered (box 2–4 below), 1 = all aligned with box 1 */
function useProcessScrollProgress() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    const updateProgress = () => {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.7;
      const end = vh * 0.2;
      const raw = (start - rect.top) / (start - end);
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    const updateDesktop = () => {
      setIsDesktop(window.innerWidth >= MD_BREAKPOINT_PX);
    };

    const handleResize = () => {
      updateProgress();
      updateDesktop();
    };

    updateProgress();
    updateDesktop();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const containerHeight =
    isDesktop
      ? CONTAINER_HEIGHT_PX + (BOX_HEIGHT_PX - CONTAINER_HEIGHT_PX) * progress
      : undefined;

  return { sectionRef, progress, containerHeight, isDesktop };
}

export function WorkingProcessSection() {
  const { sectionRef, progress, containerHeight, isDesktop } = useProcessScrollProgress();

  return (
    <section
      ref={sectionRef}
      id="process"
      className="w-full py-[75px] font-sans"
      aria-label="Our Working Process"
    >
      <div className="mx-auto max-w-[1320px]">
      {/* Header: left = title + line, right = Book Appointment */}
      <div className="mb-16 flex w-full flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="flex w-full items-center gap-3 sm:flex-1">
          <span
            className="h-2 w-2 flex-shrink-0 bg-[#171717] sm:h-2.5 sm:w-2.5"
            aria-hidden
          />
          <span className="text-sm font-semibold uppercase tracking-tight text-[#171717] sm:text-base">
            Our Working Process
          </span>
          <span
            className="ml-2 flex-1 border-b border-[#e5e5e5]"
            aria-hidden
          />
        </h2>
        <a href="/#contact" className="btn-primary flex-shrink-0 sm:ml-4">
          Book Appointment
        </a>
      </div>

      {/* Container: height shrinks from 1000px to 400px as boxes line up; last 3 slide up on scroll */}
      <div
        className="relative flex w-full flex-col md:h-[1000px] md:flex-row md:overflow-hidden"
        style={containerHeight != null ? { height: containerHeight, transition: "height 150ms ease-out" } : undefined}
      >
        {processSteps.map((step, index) => {
          const offsetY = (1 - progress) * index * STAGGER_OFFSET_PX;
          const columnHeight = isDesktop && containerHeight != null ? containerHeight : undefined;
          return (
          <div
            key={step.id}
            className="flex h-[400px] flex-1 flex-col border-t border-[#e5e5e5] first:border-t-0 md:h-[1000px] md:border-t-0 md:border-l md:border-[#e5e5e5] md:last:border-r"
            style={
              columnHeight != null
                ? { height: columnHeight, transition: "height 150ms ease-out" }
                : undefined
            }
          >
            <div
              className="flex flex-col rounded-none p-8 transition-transform duration-100 ease-out md:duration-150"
              style={{
                backgroundColor: "#f8f8f8",
                height: BOX_HEIGHT_PX,
                transform: `translateY(${offsetY}px)`,
              }}
            >
              <div className="mb-6">
                <img
                  src={step.icon}
                  alt=""
                  width={64}
                  height={65}
                  className="h-[60px] w-[60px] object-contain"
                />
              </div>
              <h3 className="mb-4 font-heading text-[20px] font-bold leading-tight text-[#171717]">
                {step.title}
              </h3>
              <p className="font-sans text-[16px] leading-relaxed text-[#171717]">
                {step.description}
              </p>
            </div>
          </div>
          );
        })}
      </div>
      </div>
    </section>
  );
}
