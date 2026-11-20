"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const partners = [
  { alt: "VaultPay", src: "/partners/VaultPay.svg" },
  { alt: "Crystal Homes", src: "/partners/Crystal-Homes.svg" },
  { alt: "Treks&Tales", src: "/partners/TreksTales.svg" },
  { alt: "Ade Solar", src: "/partners/Ade-Solar.svg" },
  { alt: "Nova Beach Resort Rubavu", src: "/partners/Nova-Beach-Resort-Rubavu.svg" },
  { alt: "Kigali Drive Car Rentals", src: "/partners/Kigali-Drive-Car-Rentals.svg" },
];

export default function Partners() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const grid = gridRef.current;
    if (!grid) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(".partner-card", grid);
      const mid = (cards.length - 1) / 2;

      // Middle cards on top, like a fanned deck
      cards.forEach((card, i) => {
        gsap.set(card, { zIndex: Math.round(10 - Math.abs(i - mid) * 2) });
      });

      gsap.fromTo(
        cards,
        {
          // Start stacked at the grid's center, slightly fanned so every card is visible
          x: (i, el: HTMLElement) => {
            const gridCenter = grid.offsetWidth / 2;
            const cardCenter = el.offsetLeft + el.offsetWidth / 2;
            return gridCenter - cardCenter + (i - mid) * 28;
          },
        },
        {
          x: 0,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: grid,          // trigger on the cards, not the section
            start: "top 90%",       // cards just entering the viewport
            end: "top 40%",         // finished once they're well into view
            scrub: 1,
            invalidateOnRefresh: true, // re-measure after layout/fonts/images settle
          },
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="w-full overflow-hidden bg-white px-6 py-12 md:px-12 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col items-center justify-center gap-4 text-center">
          <h2 className="max-w-xl font-karla text-4xl font-bold leading-tight tracking-tight text-[#030912] md:text-6xl">
            Meet our Partners
          </h2>
          <p className="max-w-md text-sm leading-8 text-gray-600 md:text-base">
            We believe great things happen when industry leaders come together.
          </p>
        </div>

        <div
          ref={gridRef}
          className="relative grid grid-cols-1 gap-2 md:grid-cols-6 md:gap-3"
        >
          {partners.map((partner) => (
            <div
              key={partner.alt}
              className="partner-card relative flex min-h-[100px] w-full items-center justify-center overflow-hidden rounded-2xl bg-[#F1F2F5] p-4 md:min-h-[110px] md:p-5"
            >
              <div className="relative h-12 w-full max-w-[150px]">
                <Image
                  src={partner.src}
                  alt={partner.alt}
                  fill
                  sizes="(max-width: 768px) 80vw, 15vw"
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}