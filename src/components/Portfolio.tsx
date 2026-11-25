
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const portfolio = [
  {
    slug: "pictures-from-a-Far",
    src: "/portfolio/port-1.png",
    name: "Pictures from a Far",
    category: "Featured Project",
    description:
      "A creative project showcasing thoughtful visual direction, composition, and design. Discover how the ideas come together to create a distinctive visual experience.",
  },
  {
    slug: "biomasster",
    src: "/portfolio/port-2(1).jpg",
    name: "Biomasster",
    category: "Featured Project",
    description:
      "A selected project bringing creativity and visual communication together through a considered design approach.",
  },
  {
    slug: "yokigali",
    src: "/portfolio/port-3.png",
    name: "Yokigali",
    category: "Featured Project",
    description:
      "A project highlighting our approach to creating engaging visual experiences through thoughtful design and purposeful execution.",
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const showcase = showcaseRef.current;

    if (!section || !showcase) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".portfolio-card");

      cards.forEach((card, index) => {
        gsap.set(card, {
          yPercent: index === 0 ? 0 : 110,
          scale: 1,
          zIndex: index + 1,
        });
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: showcase,
          start: "top top",
          end: () => `+=${window.innerHeight * (cards.length - 1)}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, index) => {
        if (index === 0) return;

        const previousCard = cards[index - 1];

        timeline.to(
          previousCard,
          {
            scale: 0.96,
            duration: 1,
            ease: "none",
          },
          index - 1
        );

        timeline.to(
          card,
          {
            yPercent: 0,
            duration: 1,
            ease: "none",
          },
          index - 1
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="w-full overflow-hidden bg-[#030912] px-5 py-16 text-white sm:px-8 md:px-12 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col justify-between gap-5 md:mb-12 md:flex-row md:items-end">
          <div>

            <h2 className="font-karla text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Our recent works
              <span className="text-[#FFC400]">.</span>
            </h2>
          </div>

          <p className="max-w-sm font-inter text-sm leading-7 text-white/65 md:text-base">
            A look at some of the ideas we have brought to life through
            creativity, strategy, and thoughtful execution.
          </p>
        </div>

        <div
          ref={showcaseRef}
          className="relative h-[72svh] min-h-135 max-h-190 w-full"
        >
          {portfolio.map((project, index) => (
            <article
              key={project.slug}
              className="portfolio-card absolute inset-0 grid grid-cols-1 overflow-hidden rounded-[24px] bg-white shadow-2xl sm:rounded-[30px] md:grid-cols-[1.15fr_0.85fr]"
            >
              <div className="relative min-h-0 overflow-hidden bg-[#061321]">
                <Image
                  src={project.src}
                  alt={project.name}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#030912]/40 via-transparent to-transparent" />
              </div>

              <div className="flex min-h-0 flex-col justify-center bg-white px-6 py-7 text-[#030912] sm:px-9 sm:py-9 lg:px-12 lg:py-12">
                <p className="mb-4 font-inter text-xs font-bold tracking-[0.2em] text-[#FFC400]">
                  {project.category}
                </p>

                <h3 className="mb-4 font-karla text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                  {project.name}
                </h3>

                <p className="mb-7 max-w-md font-inter text-sm leading-7 text-[#030912]/65 sm:text-base">
                  {project.description}
                </p>

                <Link
                  href="/portfolio"
                  className="group inline-flex w-fit items-center gap-3 border-b border-[#1B354D] pb-2 font-karla text-base font-bold text-[#030912] transition-colors duration-300 hover:border-[#E5AD00] hover:text-[#E5AD00]"
                >
                  Explore More

                  <ArrowUpRight
                    size={19}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center md:mt-14">
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-3 rounded-full border border-[#1B354D] px-7 py-3.5 font-karla text-base font-semibold text-white transition-all duration-300 hover:border-[#FFC400] hover:bg-[#FFC400] hover:text-[#030912]"
          >
            View All Projects

            <ArrowUpRight
              size={19}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
