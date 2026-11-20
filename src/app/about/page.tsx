
"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const stats = [
  { number: "7+", label: "Years of expertise" },
  { number: "100+", label: "Brands amplified" },
  { number: "300K+", label: "Impressions generated" },
];

export default function AboutPage() {
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-image",
        { y: 65, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-gallery",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".about-content",
        { x: 40, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-content",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".about-stat",
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-stats",
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, page);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={pageRef}
      className="w-full overflow-hidden bg-white text-[#030912]"
    >
      <section
        id="who-we-are"
        className="px-5 pb-8 pt-28 sm:px-8 md:px-32 md:pb-10 md:pt-32"
      >
        <div className="mx-auto grid max-w-7xl items-start gap-14 lg:grid-cols-2 lg:gap-20">

          <div>
            <div className="mb-12">
              <h1 className="max-w-lg font-karla text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
                More than a digital agency.
              </h1>
            </div>

            <div className="about-gallery grid grid-cols-2 items-start gap-4 sm:gap-6">
              <div className="about-image relative mt-0 overflow-hidden rounded-2xl sm:rounded-3xl">
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src="/toplink/web-designer.jpg"
                    alt="Toplink Digital project showcase"
                    fill
                    priority
                    sizes="(max-width: 768px) 50vw, 30vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="about-image relative mt-16 overflow-hidden rounded-2xl sm:mt-24 sm:rounded-3xl">
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src="/toplink/digital-marketing.jpg"
                    alt="Toplink Digital creative project"
                    fill
                    sizes="(max-width: 768px) 50vw, 30vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="about-content lg:pt-24">
            <div className="space-y-6">
              <p className="font-karla text-xl font-semibold leading-relaxed sm:text-2xl">
                We bring different parts of the digital journey together to
                create experiences that move businesses forward.
              </p>

              <p className="font-inter text-sm leading-8 text-[#030912]/65 sm:text-base">
                At Toplink Digital, we believe great digital work starts with
                understanding the bigger picture. A strong brand needs more
                than a logo. A website needs more than good visuals. And growth
                requires more than simply being online.
              </p>

              <p className="font-inter text-sm leading-8 text-[#030912]/65 sm:text-base">
                That is why we connect creative thinking, digital design,
                development, and marketing into a more unified approach. Our
                goal is to help businesses communicate clearly, create
                meaningful connections, and build for what comes next.
              </p>
            </div>

            <div className="about-stats mt-12 border-t border-[#1B354D]/15">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="about-stat flex items-center justify-between gap-4 border-b border-[#1B354D]/15 py-5"
                >
                  <p className="font-inter text-xs font-semibold uppercase tracking-[0.12em] text-[#030912]/60 sm:text-sm">
                    {stat.label}
                  </p>

                  <p className="whitespace-nowrap font-karla text-3xl font-bold tracking-tight text-[#030912] sm:text-4xl">
                    {stat.number}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
