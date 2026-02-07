"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";

const PROJECT_PANEL_HEIGHT_PX = 718;
const AUTO_ADVANCE_MS = 3000;
const FADE_DURATION_MS = 600;

const projects = [
  {
    id: 1,
    number: "01/04",
    title: "Westwood",
    description: "Anderson Family – Los Angeles, CA",
    image: "/images/project-image-1.webp",
    imageAlt: "Westwood project",
  },
  {
    id: 2,
    number: "02/04",
    title: "Verano Beach",
    description: "Michael Roberts – New York, NY",
    image: "/images/project-image-2.webp",
    imageAlt: "Project two",
  },
  {
    id: 3,
    number: "03/04",
    title: "Hudson Loft",
    description: "Michael Roberts – New York, NY",
    image: "/images/project-image-3.webp",
    imageAlt: "Project three",
  },
  {
    id: 4,
    number: "04/04",
    title: "Bellevue",
    description: "Bellevue Tech Partners – Seattle, WA",
    image: "/images/project-image-4.webp",
    imageAlt: "Project four",
  },
];

function ProjectPanel({
  project,
  isActive,
}: {
  project: (typeof projects)[0];
  isActive: boolean;
}) {
  return (
    <div
      className="absolute inset-0 transition-opacity ease-out"
      style={{
        height: PROJECT_PANEL_HEIGHT_PX,
        opacity: isActive ? 1 : 0,
        zIndex: isActive ? 10 : 0,
        transitionDuration: `${FADE_DURATION_MS}ms`,
      }}
      aria-hidden={!isActive}
    >
      <div className="absolute inset-0">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          className="object-cover"
          sizes="1320px"
          unoptimized
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-8 pt-6 md:px-8">
        <div
          className="mx-auto rounded-none border border-black bg-white px-6 py-5 text-center shadow-[0_4px_24px_rgba(0,0,0,0.08)] md:px-8 md:py-6"
          style={{ width: "595px" }}
        >
          <h3
            className="font-heading font-semibold tracking-tight text-[#171717]"
            style={{ fontSize: "40px" }}
          >
            {project.title}
          </h3>
          <p
            className="mt-2 font-sans text-base text-[#4a4c56]"
            style={{ fontSize: "16px" }}
          >
            {project.number}{" "}
            <span className="text-[#171717]">{project.description}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  }, []);

  const startAutoAdvance = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(goNext, AUTO_ADVANCE_MS);
  }, [goNext]);

  useEffect(() => {
    startAutoAdvance();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAutoAdvance]);

  const handleDot = useCallback(
    (index: number) => {
      setActiveIndex(index);
      startAutoAdvance();
    },
    [startAutoAdvance]
  );

  return (
    <section
      id="projects"
      className="relative w-full py-[75px] font-sans"
      aria-label="Recent Projects"
    >
      <div className="w-screen px-4 md:px-8 ml-[calc(50%-50vw)] mr-[calc(50%-50vw)]">
        <div
          className="mx-auto max-w-[1320px] px-0"
          style={{ height: "195px" }}
        >
          <h2 className="mb-24 flex w-full items-center gap-3">
            <span
              className="h-2 w-2 flex-shrink-0 bg-[#171717] sm:h-2.5 sm:w-2.5"
              aria-hidden
            />
            <span className="text-sm font-semibold uppercase tracking-tight text-[#171717] sm:text-base">
              Recent Projects
            </span>
            <span
              className="ml-2 flex-1 border-b border-[#e5e5e5]"
              aria-hidden
            />
          </h2>
          <div className="flex justify-end">
            <a href="/#contact" className="btn-primary">
              Book Appointment
            </a>
          </div>
        </div>

        <div className="relative mt-16">
          <div
            className="relative mx-auto w-full max-w-[1320px] overflow-hidden"
            style={{ height: PROJECT_PANEL_HEIGHT_PX }}
            aria-roledescription="carousel"
            aria-label="Project gallery"
          >
            {projects.map((project, index) => (
              <ProjectPanel
                key={project.id}
                project={project}
                isActive={index === activeIndex}
              />
            ))}
          </div>

          <div className="mx-auto mt-6 flex max-w-[1320px] justify-center px-2">
            <div className="flex items-center gap-2" role="tablist" aria-label="Project slides">
              {projects.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-label={`Go to project ${index + 1}`}
                  onClick={() => handleDot(index)}
                  className="h-2.5 w-2.5 flex-shrink-0 rounded-full border border-[#1a1a1a] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:ring-offset-2"
                  style={{
                    backgroundColor: index === activeIndex ? "#1a1a1a" : "transparent",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
