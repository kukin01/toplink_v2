
"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const categories = ["Web Development", "Marketing", "Brand Identity"];

const projects = [
  {
    name: "Pictures from a fal",
    link: "https://picturesfromafar.rw",
    categories,
    src: "/portfolio/port-1.png",
    description:
      "A creative project showcasing thoughtful visual direction, composition, and design.",
    layout: "large",
  },
  {
    name: "Biomasster",
    link: "https://biomassters.co",
    categories,
    src: "/portfolio/port-2(1).jpg",
    description:
      "A project bringing visual communication and a considered design approach together.",
    layout: "small",
  },
  {
    name: "Yokigali",
    link: "https://yokigali.com",
    categories,
    src: "/portfolio/port-3.png",
    description:
      "An engaging visual experience developed through creativity and purposeful execution.",
    layout: "small",
  },
  {
    name: "Peal",
    link: "https://peal.rw/cooko/",
    categories,
    src: "/portfolio/port4(1).jpg",
    description:
      "A selected project that brings an idea to life through thoughtful creative execution.",
    layout: "large",
  },
];

export default function PortfolioPage() {
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      gsap.from(".portfolio-intro", {
        y: 45,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
      });

      const projectCards =
        gsap.utils.toArray<HTMLElement>(".portfolio-project");

      projectCards.forEach((card) => {
        gsap.fromTo(
          card,
          {
            y: 65,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, page);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={pageRef}
      className="min-h-screen w-full overflow-hidden bg-white text-[#01034F]"
    >
      {/* Page introduction */}
      <section className="px-5 pb-8 pt-12 sm:px-8 md:px-12 md:pb-10 md:pt-16">
        <div className="portfolio-intro mx-auto max-w-6xl">
          <p className="mb-5 font-inter text-xs font-bold uppercase tracking-[0.25em] text-[#01034F]/65">
            Our portfolio
          </p>

          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
            <h1 className="max-w-3xl font-karla text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Ideas brought
              <br />
              to <span className="text-yellow-400">life.</span>
            </h1>

            <p className="max-w-md font-inter text-sm leading-8 text-[#01034F]/65 md:justify-self-end md:text-base">
              Every project is an opportunity to create something meaningful.
              Explore a selection of work shaped by creativity, strategy, and
              attention to detail.
            </p>
          </div>

          <div className="mt-8 h-px w-full bg-[#01034F]/15 md:mt-10" />
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8 md:px-12 md:pb-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-center justify-between">
            <p className="font-inter text-xs font-semibold uppercase tracking-[0.2em] text-[#01034F]/50">
              Selected work
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-12 md:gap-y-24">
            {projects.map((project, index) => {
              const isLarge = project.layout === "large";

              return (
                <article
                  key={project.name}
                  className={`portfolio-project group ${
                    index === 0
                      ? "md:col-span-7"
                      : index === 1
                        ? "md:col-span-5 md:mt-28"
                        : index === 2
                          ? "md:col-span-5"
                          : "md:col-span-7 md:mt-28"
                  }`}
                >
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div
                      className={`relative w-full overflow-hidden bg-[#F0F0F0] ${
                        isLarge
                          ? "aspect-[5/4]"
                          : "aspect-[4/5] md:aspect-[4/5]"
                      }`}
                    >
                      <Image
                        src={project.src}
                        alt={project.name}
                        fill
                        sizes={
                          isLarge
                            ? "(max-width: 768px) 100vw, 60vw"
                            : "(max-width: 768px) 100vw, 40vw"
                        }
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />

                      <div className="absolute inset-0 bg-[#01034F]/0 transition-colors duration-500 group-hover:bg-[#01034F]/10" />

                      <div className="absolute bottom-5 right-5 flex h-11 w-11 translate-y-3 items-center justify-center rounded-full bg-white text-[#01034F] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <ArrowUpRight size={21} />
                      </div>
                    </div>

                    <div className="mt-5 flex items-start justify-between gap-4">
                      <div>
                        <div className="mb-3 flex flex-wrap gap-2">
                          {project.categories.map((category) => (
                            <span
                              key={category}
                              className="rounded-full border border-[#01034F]/25 px-3 py-1 font-inter text-[10px] font-bold uppercase tracking-[0.12em] text-[#01034F]/70"
                            >
                              {category}
                            </span>
                          ))}
                        </div>

                        <h2 className="font-karla text-2xl font-bold transition-colors duration-300 sm:text-3xl">
                          {project.name}
                        </h2>

                        <p className="mt-3 max-w-md font-inter text-sm leading-7 text-[#01034F]/60">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

    </main>
  );
}
