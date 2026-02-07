"use client";

import Image from "next/image";
import Link from "next/link";

export function BottomBanner() {
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
      <div className="relative w-full h-[657px] overflow-hidden">
        <Image
          src="/images/bottom-banner-image.jpg"
          alt="Modern interior with plant, chair, and storage cabinet"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority={false}
        />
        <div className="absolute inset-0 flex items-center pl-[20%] md:pl-[15%]">
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
