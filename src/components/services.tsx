"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { services } from "@/lib/services";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Services() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const animateCards = (columns: number) => {
        const cards = gsap.utils.toArray<HTMLElement>(".service-card");
      
        cards.forEach((card, index) => {
          const row = Math.floor(index / columns);
          const column = index % columns;
          const fromLeft = row % 2 === 0;
      
          gsap.fromTo(
            card,
            {
              x: fromLeft ? -120 : 120,
              autoAlpha: 0,
            },
            {
              x: 0,
              autoAlpha: 1,
              duration: 1.35,
              delay: column * 0.18,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reset",
              },
            }
          );
        });
      };

      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => animateCards(3)
      );
      mm.add(
        "(min-width: 640px) and (max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        () => animateCards(2)
      );
      mm.add(
        "(max-width: 639px) and (prefers-reduced-motion: no-preference)",
        () => animateCards(1)
      );
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="services"
      className="relative z-10 flex w-full flex-col items-center justify-center overflow-hidden bg-[#01034F] px-6 py-10 text-white md:px-12 md:py-16"
    >
      <div className="mb-15 flex w-full flex-col justify-between gap-6 md:flex-row md:items-end md:gap-8">
        <h2 className="max-w-md font-karla text-4xl font-bold md:text-5xl">
          DIGITAL SOLUTIONS WE OFFER
        </h2>
        <div className="flex max-w-sm flex-col items-start gap-5">
          <p className="font-karla text-white/80">
            From brand identity to web development and marketing, we help
            businesses grow with a full suite of digital services.
          </p>
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-6 py-3 font-karla text-md font-bold tracking-wide text-[#01034F] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-400"
          >
            All services
          </Link>
        </div>
      </div>
      <div className="grid w-full grid-cols-1 gap-15 sm:grid-cols-2 lg:grid-cols-3">
        {services.map(({ service, stat, image, placeholder, description }) => (
          <Link
            key={service}
            href="/services"
            className="service-card flex min-h-48 w-full flex-col items-start gap-5 rounded-3xl p-6 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <div className="w-full items-center gap-3">
              <h3
                className={`rounded-full border border-white/40 bg-white/15 p-3 font-karla text-base font-semibold text-white/95 md:text-xl ${
                  stat ? "shrink-0" : "flex-1 text-center"
                }`}
              >
                {service}
              </h3>
              {stat && (
                <p className="mt-5 flex flex-col gap-4 font-karla leading-tight">
                  <span className="text-2xl font-bold text-white md:text-3xl">
                    {stat.value}
                  </span>
                  <span className="text-lg text-white/70">{stat.label}</span>
                </p>
              )}
            </div>
            {image && (
              <div className="relative min-h-full w-full flex-1 overflow-hidden rounded-2xl">
                <Image
                  src={image}
                  alt={`${service} example`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            )}
            {placeholder && (
              <div className="flex min-h-24 w-full flex-1 items-center justify-center rounded-2xl p-4 text-center font-karla text-lg text-white/60">
                {description}
              </div>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}