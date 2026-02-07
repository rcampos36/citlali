import { ServiceImage } from "@/components/ServiceImage";

const services = [
  {
    id: 1,
    number: "01",
    image: "/images/service-image-1.jpg",
    imageAlt: "Interior design consultation",
    title: "Interior Design Consultation",
    description:
      "Our experts work with you to define your vision, preferences, and budget. We create a tailored design concept that reflects your lifestyle and enhances your space.",
    cta: "Learn More",
  },
  {
    id: 2,
    number: "02",
    image: "/images/service-image-2.jpg",
    imageAlt: "Space planning and layout",
    title: "Space Planning & Layout",
    description:
      "We optimize flow, function, and aesthetics through thoughtful space planning. From open-concept living to defined zones, we make every square foot count.",
    cta: "Learn More",
  },
  {
    id: 3,
    number: "03",
    image: "/images/service-image-3.jpg",
    imageAlt: "Custom furniture and finishes",
    title: "Custom Furniture & Finishes",
    description:
      "From bespoke pieces to curated finishes, we source and specify materials that elevate your interior. Quality craftsmanship and timeless design in every detail.",
    cta: "Learn More",
  },
  {
    id: 4,
    number: "04",
    image: "/images/service-image-4.jpg",
    imageAlt: "Project management and installation",
    title: "Project Management & Installation",
    description:
      "We coordinate contractors, timelines, and deliveries so your project runs smoothly from concept to completion. One point of contact, seamless execution.",
    cta: "Learn More",
  },
];

export function Services() {
  return (
    <section
      id="service"
      className="w-full py-[75px] font-sans"
      aria-label="Our Services"
    >
      {/* Section header: black square + OUR SERVICES + horizontal line */}
      <h2 className="mb-16 flex w-full items-center gap-3">
        <span
          className="h-2 w-2 flex-shrink-0 bg-[#171717] sm:h-2.5 sm:w-2.5"
          aria-hidden
        />
        <span className="text-sm font-semibold uppercase tracking-tight text-[#171717] sm:text-base">
          Our Services
        </span>
        <span
          className="ml-2 flex-1 border-b border-[#e5e5e5]"
          aria-hidden
        />
      </h2>

      <div className="flex w-full flex-col">
        {services.map((service) => (
          <div
            key={service.id}
            className="grid w-full grid-cols-1 gap-8 border-b border-[#e5e5e5] py-12 first:pt-0 last:border-b-0 md:grid-cols-2 md:items-stretch md:gap-12"
          >
            <div className="min-w-0">
              <ServiceImage src={service.image} alt={service.imageAlt} />
            </div>
            <div className="flex flex-col justify-between">
              <div className="font-heading text-[24px] font-semibold uppercase tracking-tight text-[#4a4c56]">
                {service.number}
              </div>
              <h3 className="font-heading text-2xl font-semibold leading-tight tracking-tight text-[#4a4c56] md:text-3xl lg:text-[40px]">
                {service.title}
              </h3>
              <p className="text-base leading-relaxed text-[#171717]">
                {service.description}
              </p>
              <a href="#" className="btn-outline">
                {service.cta}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
