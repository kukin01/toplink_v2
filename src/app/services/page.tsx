
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    slug: "brand-identity",
    service: "Brand Identity",
    description:
      "A logo, colors and voice that make your business instantly recognizable.",
    image: "/toplink-services/brand-identity.jpg",
    details: [
      {
        title: "Logo Design",
        explanation:
          "We create distinctive logos that communicate your brand personality and make your business recognizable.",
      },
      {
        title: "Brand Strategy",
        explanation:
          "We establish your brand positioning, personality and visual direction to help your business stand out.",
      },
      {
        title: "Visual Identity",
        explanation:
          "We develop consistent color palettes, typography and visual elements that bring your brand to life.",
      },
    ],
  },
  {
    slug: "web-development",
    service: "Web Development",
    description:
      "Fast, modern websites and web apps built to turn visitors into customers.",
    image: "/toplink-services/web-design.jpg",
    details: [
      {
        title: "Website Design",
        explanation:
          "Beautiful, responsive website designs tailored to your business goals and audience.",
      },
      {
        title: "Website Development",
        explanation:
          "We build fast, functional and scalable websites using modern technologies.",
      },
      {
        title: "Web Applications",
        explanation:
          "Custom web applications designed to simplify operations and improve customer experiences.",
      },
    ],
  },
  {
    slug: "content-creation",
    service: "Content Creation",
    description:
      "Blogs, photos and reels that tell your story and give your brand something to say.",
    image: "/toplink-services/content-creation.jpg",
    details: [
      {
        title: "Social Media Content",
        explanation:
          "Creative graphics, videos and posts that communicate your brand message.",
      },
      {
        title: "Photography & Videography",
        explanation:
          "Professional visual content that captures your products, services and brand story.",
      },
      {
        title: "Copywriting",
        explanation:
          "Compelling written content that connects with your audience and encourages action.",
      },
    ],
  },
  {
    slug: "ad-campaign",
    service: "Ad Campaign",
    description:
      "Get strategic and data-driven ad campaigns that put your business in front of the right audience.",
    image: "/toplink-services/ad-campaign.jpg",
    details: [
      {
        title: "Paid Advertising",
        explanation:
          "Targeted advertising campaigns designed to increase visibility and generate leads.",
      },
      {
        title: "Campaign Strategy",
        explanation:
          "We develop advertising strategies based on your business objectives and target audience.",
      },
      {
        title: "Performance Tracking",
        explanation:
          "We monitor campaign performance and optimize advertising efforts for better results.",
      },
    ],
  },
  {
    slug: "seo-services",
    service: "SEO Services",
    description:
      "We optimize your website to rank higher and attract organic traffic that matters.",
    image: "/toplink-services/seo-services.jpg",
    details: [
      {
        title: "On-Page SEO",
        explanation:
          "We optimize website content, headings, metadata and structure for search engines.",
      },
      {
        title: "Technical SEO",
        explanation:
          "We improve website performance, indexing, mobile usability and technical structure.",
      },
      {
        title: "Keyword Research",
        explanation:
          "We identify relevant search terms that help your business reach the right audience.",
      },
    ],
  },
  {
    slug: "social-media-growth",
    service: "Social Media Growth",
    description:
      "Regular posting, community management and engagement that turn followers into customers.",
    image: "/toplink-services/social-media-growth.jpg",
    details: [
      {
        title: "Social Media Management",
        explanation:
          "We manage your social platforms, maintain consistency and keep your audience engaged.",
      },
      {
        title: "Community Management",
        explanation:
          "We build meaningful relationships with your audience through comments, messages and interactions.",
      },
      {
        title: "Growth Strategy",
        explanation:
          "We use strategic content and performance insights to grow your online presence.",
      },
    ],
  },
];

export default function ServicesPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const mainRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const introTimeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      introTimeline
        .fromTo(
          headlineRef.current,
          {
            x: -100,
            autoAlpha: 0,
          },
          {
            x: 0,
            autoAlpha: 1,
            duration: 1.2,
          }
        )
        .fromTo(
          subheadlineRef.current,
          {
            y: 65,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1.1,
          },
          "-=0.65"
        )
        .fromTo(
          buttonRef.current,
          {
            y: 35,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
          },
          "-=0.65"
        );

      const serviceCards =
        gsap.utils.toArray<HTMLElement>(".service-card");

      serviceCards.forEach((card) => {
        const image = card.querySelector(".service-image");
        const content = card.querySelector(".service-content");

        const revealTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
          defaults: {
            ease: "power3.out",
          },
        });

        revealTimeline
          .fromTo(
            image,
            {
              y: 85,
              autoAlpha: 0,
            },
            {
              y: 0,
              autoAlpha: 1,
              duration: 1.1,
            }
          )
          .fromTo(
            content,
            {
              y: 65,
              autoAlpha: 0,
            },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.95,
            },
            "-=0.75"
          );
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const toggleItem = (
    serviceIndex: number,
    detailIndex: number
  ) => {
    const key = `${serviceIndex}-${detailIndex}`;

    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <main ref={mainRef} className="bg-white">
      <section className="px-6 pt-28 pb-24 text-white md:px-16 md:pt-32 lg:px-24 lg:pb-36">
        <div className="mx-auto grid max-w-7xl items-end gap-12 md:grid-cols-2">
          <h1
            ref={headlineRef}
            className="text-6xl font-bold leading-[0.95] tracking-tight text-[#030912] sm:text-7xl lg:text-[100px]"
          >
            Our Company
            <span className="mt-3 block text-[#030912]">
              Services
            </span>
          </h1>

          <div className="pb-2 md:pl-12">
            <p
              ref={subheadlineRef}
              className="mt-6 max-w-md text-base leading-8 text-[#030912]"
            >
              From building memorable brands to creating powerful digital
              experiences, we provide the creative and strategic solutions
              your business needs to grow.
            </p>

            <div ref={buttonRef}>
              <Link
                href="/contact"
                className="mt-9 inline-flex items-center gap-3 rounded-full border border-[#1B354D] bg-[#FFC400] px-7 py-4 text-sm font-semibold text-[#030912] transition hover:bg-[#E5AD00]"
              >
                Let's work together
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:px-10 lg:px-24 lg:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="space-y-28 lg:space-y-36">
            {services.map((service, index) => (
              <article
                key={service.slug}
                className="service-card grid items-start gap-10 lg:grid-cols-2 lg:gap-20"
              >
                <div
                  className={`service-image group relative overflow-hidden rounded-[28px] bg-[#030912] ${
                    index % 2 !== 0 ? "lg:order-2" : ""
                  }`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.service}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="service-content">
                  <h3 className="mb-5 text-4xl font-bold tracking-tight text-[#030912] sm:text-5xl text-inter">
                    {service.service}
                  </h3>

                  <p className="mb-9 max-w-xl text-base leading-8 text-gray-500 text-karla">
                    {service.description}
                  </p>

                  <div className="border-t border-[#1B354D]/20">
                    {service.details.map((detail, detailIndex) => {
                      const key = `${index}-${detailIndex}`;
                      const isOpen = !!openItems[key];

                      return (
                        <div
                          key={detail.title}
                          className="border-b border-[#1B354D]/20"
                        >
                          <button
                            type="button"
                            onClick={() =>
                              toggleItem(index, detailIndex)
                            }
                            aria-expanded={isOpen}
                            className="flex w-full items-center justify-between gap-5 py-5 text-left"
                          >
                            <span className="text-xl font-semibold text-[#030912] transition text-inter">
                              {detail.title}
                            </span>

                            <Plus
                              size={20}
                              className={`shrink-0 text-blue-700 transition-transform duration-300 ${
                                isOpen ? "rotate-45" : ""
                              }`}
                            />
                          </button>

                          <div
                            className={`grid transition-all duration-300 ${
                              isOpen
                                ? "grid-rows-[1fr] opacity-100"
                                : "grid-rows-[0fr] opacity-0"
                            }`}
                          >
                            <div className="overflow-hidden">
                              <p className="max-w-lg pb-6 text-sm leading-7 text-gray-500 text-karla">
                                {detail.explanation}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
