import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#service", label: "Service" },
  { href: "/#projects", label: "Project" },
  { href: "/#blog", label: "Blogs" },
];

const socialLinks = [
  { href: "https://linkedin.com", label: "LinkedIn", letter: "LI" },
  { href: "https://facebook.com", label: "Facebook", letter: "FB" },
  { href: "https://instagram.com", label: "Instagram", letter: "IG" },
  { href: "https://x.com", label: "X", letter: "X" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="bg-white text-[#171717]"
      aria-label="Site footer"
    >
      <div className="mx-auto w-full max-w-[1320px] px-4 py-12 md:px-6 md:py-16 lg:px-0">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <Link href="/#home" className="inline-flex">
              <Image
                src="/images/Citlali%20logo.svg"
                alt="Citlali"
                width={103}
                height={27}
                className="h-[27px] w-[103px]"
              />
            </Link>
            <p className="font-sans text-base text-[#171717] max-w-[280px]">
              Citlali Interiors — It's a fictional firm developed to showcase my skills.
            </p>
            <div className="flex gap-2">
              {socialLinks.map(({ href, label, letter }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-none border border-[#171717] font-sans text-xs font-medium text-[#171717] transition-colors hover:bg-[#171717] hover:text-white"
                  aria-label={label}
                >
                  {letter}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-heading text-[20px] font-bold text-[#171717] mb-4">
              Quick links
            </h3>
            <ul className="flex flex-col gap-3">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-sans text-[16px] text-[#171717] transition-colors hover:underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Address */}
          <div>
            <h3 className="font-heading text-[20px] font-bold text-[#171717] mb-4">
              Address
            </h3>
            <address className="not-italic">
              <a
                href="mailto:info@aurelo.com"
                className="font-sans text-[16px] text-[#171717] block mb-2 transition-colors hover:underline"
              >
                info@citlali.com
              </a>
              <a
                href="tel:+12125550199"
                className="font-sans text-[16px] text-[#171717] block mb-2 transition-colors hover:underline"
              >
                +1 (212) 555-0199
              </a>
              <p className="font-sans text-[16px] text-[#171717]">
                245 Madison Avenue, New York, NY 10016
              </p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#e5e5e5] pt-8 md:flex-row md:gap-0">
          <p className="font-sans text-[16px] text-[#171717]">
            © {year} Citlali Interiors
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 font-sans text-[16px] text-[#171717]">
            <span>
              Designed By:{" "}
              <a href="widflow.com" className="transition-colors hover:underline">
              widflow
              </a>
            </span>
            <span>
              Developed by:{" "}
              <a href="rcdev.me" className="transition-colors hover:underline">
              rcdev
              </a>
            </span>
          </div>
          <p className="font-sans text-[16px] text-[#171717]">
            All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
