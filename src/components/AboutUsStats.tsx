"use client";

import { useEffect, useRef, useState } from "react";

const STATS_RAW = [
  { value: "60M+", label: "Savings Money" },
  { value: "10k+", label: "Global Clients" },
  { value: "98%", label: "Clients satisfaction" },
];

function parseStatValue(value: string): { target: number; suffix: string } {
  const match = value.match(/^(\d+)(.+)$/);
  if (!match) return { target: 0, suffix: value };
  return { target: parseInt(match[1], 10), suffix: match[2] };
}

const DURATION_MS = 1400;
const COUNT_UP_DELAY_MS = 1200; /* match fade-in delay so count starts when stat appears */
const EASE_OUT_CUBIC = (t: number) => 1 - Math.pow(1 - t, 3);

function useCountUp(target: number, start: boolean) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!start || target === 0) return;

    setDisplay(0);
    startTimeRef.current = null;

    const runCountUp = () => {
      const tick = (timestamp: number) => {
        if (startTimeRef.current === null) {
          startTimeRef.current = timestamp;
        }
        const elapsed = timestamp - startTimeRef.current;
        const t = Math.min(elapsed / DURATION_MS, 1);
        const eased = EASE_OUT_CUBIC(t);
        const current = Math.round(eased * target);
        setDisplay(current);

        if (t < 1) {
          rafRef.current = requestAnimationFrame(tick);
        }
      };

      rafRef.current = requestAnimationFrame(tick);
    };

    timeoutRef.current = setTimeout(runCountUp, COUNT_UP_DELAY_MS);

    return () => {
      if (timeoutRef.current != null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [target, start]);

  return display;
}

export function AboutUsStats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { rootMargin: "0px 0px -40px 0px", threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const stats = STATS_RAW.map((s) => ({
    ...s,
    ...parseStatValue(s.value),
  }));

  return (
    <div
      ref={containerRef}
      className="flex min-h-[320px] flex-col justify-between gap-8 pr-6 sm:min-h-0 sm:h-full sm:gap-0 sm:pr-8 md:pr-10"
    >
      <div
        className={`inline-block opacity-0 sm:ml-auto sm:self-end ${
          inView ? "animate-fade-in-up" : ""
        }`}
        style={
          inView
            ? { animationDelay: "1.2s" }
            : { transform: "translateY(24px)" }
        }
      >
        <StatBlock stat={stats[0]} inView={inView} />
      </div>
      <div className="flex flex-col gap-10 sm:flex-row sm:justify-end sm:gap-x-12 md:gap-x-16">
        <div
          className={`inline-block w-fit opacity-0 ${
            inView ? "animate-fade-in-up" : ""
          }`}
          style={
            inView
              ? { animationDelay: "1.32s" }
              : { transform: "translateY(24px)" }
          }
        >
          <StatBlock stat={stats[1]} inView={inView} />
        </div>
        <div
          className={`inline-block w-fit opacity-0 ${
            inView ? "animate-fade-in-up" : ""
          }`}
          style={
            inView
              ? { animationDelay: "1.44s" }
              : { transform: "translateY(24px)" }
          }
        >
          <StatBlock stat={stats[2]} inView={inView} />
        </div>
      </div>
    </div>
  );
}

function StatBlock({
  stat,
  inView,
}: {
  stat: { target: number; suffix: string; label: string };
  inView: boolean;
}) {
  const display = useCountUp(stat.target, inView);

  return (
    <>
      <p
        className="font-heading text-[48px] font-bold leading-none text-[#171717] sm:text-[56px] md:text-[72px]"
        aria-label={`${stat.target}${stat.suffix}`}
      >
        {display}
        {stat.suffix}
      </p>
      <p className="mt-2 border-b border-[#e5e5e5] pb-5 font-sans text-sm font-normal text-[#171717] md:mt-2.5">
        {stat.label}
      </p>
    </>
  );
}
