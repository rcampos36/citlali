"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#service", label: "Service" },
  { href: "#projects", label: "Project" },
  { href: "#blog", label: "Blogs" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 w-full bg-white font-sans">
      {/* Border wrapper: same max-width and padding as layout content so border aligns */}
      <div className="mx-auto w-full max-w-[1320px] border-b border-[#e5e5e5] px-4 md:px-6 lg:px-0">
        <div className="flex h-[80px] items-center justify-between">
        <Link href="#home" className="flex items-center">
          <Image
            src="/images/Citlali%20logo.svg"
            alt="Citlali"
            width={103}
            height={27}
            className="h-[27px] w-[103px]"
            priority
          />
        </Link>

        {/* Desktop nav - show from lg so iPad portrait gets mobile menu */}
        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 font-sans lg:flex xl:gap-12"
          aria-label="Main navigation"
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-base font-semibold text-[#4a4a4a] transition-colors hover:text-black"
              onClick={() => setMobileMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/quote"
            className="btn-primary hidden sm:inline-flex"
          >
            Get A Quote
          </Link>

          {/* Mobile menu button - visible until lg so iPad portrait gets hamburger */}
          <button
            type="button"
            className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md text-[#4a4a4a] hover:bg-[#f5f5f5] hover:text-black lg:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <span className="sr-only">{mobileMenuOpen ? "Close" : "Menu"}</span>
            {mobileMenuOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        </div>
      </div>

      {/* Mobile nav */}
      <div
        id="mobile-nav"
        className={`overflow-hidden bg-white transition-[height] duration-200 ease-out lg:hidden ${
          mobileMenuOpen ? "h-auto" : "h-0"
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <nav
          className="mx-auto flex max-w-[1320px] flex-col gap-0 border-t border-[#e5e5e5] px-4 py-4 font-sans md:px-6 lg:px-0"
          aria-label="Mobile navigation"
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="rounded-md px-3 py-3 text-base font-semibold text-[#4a4a4a] transition-colors hover:bg-[#f5f5f5] hover:text-black"
              onClick={() => setMobileMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/quote"
            className="btn-primary mt-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Get A Quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
