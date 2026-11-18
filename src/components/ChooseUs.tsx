
"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ChooseUs() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".choose-reveal", {
        y: 35,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="bg-[#01034F] px-6 py-16 text-white sm:px-10 md:py-20 lg:px-16"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">

        {/* LEFT SIDE */}
        <div className="choose-reveal">
          <h2 className="max-w-xl font-karla text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Good work starts with the right team.
          </h2>

          <div className="mt-12 flex items-end gap-5 lg:mt-20">
            <span className="font-karla text-6xl font-bold leading-none text-[#F5DC38] sm:text-7xl">
              7+
            </span>

            <div className="pb-1">
              <p className="font-karla text-lg font-semibold text-white">
                Years of experience
              </p>
              <p className="mt-1 max-w-[220px] font-inter text-sm leading-relaxed text-white/60">
                Helping businesses build, connect, and grow.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="choose-reveal">
          <p className="max-w-xl font-inter text-base leading-8 text-white/75 sm:text-lg">
            From building memorable brands to creating powerful digital
            experiences, we provide the creative and strategic solutions your
            business needs to grow.
          </p>

          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-3 font-karla text-base font-semibold text-[#F5DC38] transition-colors hover:text-white"
          >
            More about us
            <ArrowUpRight size={19} />
          </Link>
        </div>

      </div>
    </section>
  );
}
