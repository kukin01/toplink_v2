"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Button } from "@base-ui/react";
import WavesBackground from "@/components/WavesBackground";
import Services from "@/components/services";
import PricingSection from "@/components/PricingSection";
import Portfolio from "@/components/Portfolio";
import ContactStepperModal from "@/components/ContactStepperModal";
import Partners from "@/components/Partners";
import ChooseUs from "@/components/ChooseUs";
import Navbar from "@/components/navbar";
import FAQ from "@/components/FAQ";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const services = [
  "Brand Identity",
  "Web development",
  "Content Creation",
  "Ad campaign",
  "SEO services",
  "Social media growth",
];

export default function Home() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from(".nav-wrap", { y: -60, autoAlpha: 0, duration: 0.8 })
          .from(".hero-title", { y: 80, autoAlpha: 0, duration: 1 }, "-=0.4")
          .from(".hero-cta", { y: 30, autoAlpha: 0, duration: 0.7 }, "-=0.6")
          .from(".hero-copy", { x: 40, autoAlpha: 0, duration: 0.8 }, "-=0.7")
          .from(
            ".service-item",
            { x: 40, autoAlpha: 0, duration: 0.6, stagger: 0.1 },
            "-=0.6"
          )
          .from(
            ".service-line",
            {
              scaleX: 0,
              transformOrigin: "left center",
              duration: 0.6,
              stagger: 0.1,
            },
            "<"
          );

        gsap
          .timeline({
            scrollTrigger: {
              trigger: ".about",
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
            defaults: { ease: "power3.out" },
          })
          .from(".about-title", { y: 60, autoAlpha: 0, duration: 0.9 })
          .from(
            ".about-item",
            { y: 40, autoAlpha: 0, duration: 0.7, stagger: 0.15 },
            "-=0.5"
          );

        gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
          gsap.from(el, {
            y: 70,
            autoAlpha: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: container }
  );

  return (
    <main
      ref={container}
      className="flex flex-col justify-center items-center overflow-hidden"
    >
      <div className="nav-wrap absolute top-0 inset-x-0 z-50">
        <Navbar />
      </div>

      <section className="relative h-screen w-full overflow-hidden">
        <WavesBackground />

        <div className="absolute inset-x-0 top-[18%] flex items-start justify-between gap-8 px-6 md:px-12">
          <div className="flex max-w-[540px] flex-col items-start gap-6">
            <h1 className="hero-title font-karla text-[clamp(2.5rem,6vw,5rem)] font-bold uppercase leading-[0.9] tracking-[-0.06em] text-white/90">
              Your <span className="text-yellow-400">Business</span> in One first call.
            </h1>
            <div className="hero-cta">
              <ContactStepperModal
                trigger={
                  <Button
                    type="button"
                    className="rounded-full bg-yellow-400 px-6 py-3 font-karla text-sm font-bold uppercase tracking-wide text-[#01034F] transition-colors hover:bg-yellow-300"
                  >
                    Let&apos;s talk
                  </Button>
                }
              />
            </div>
          </div>

          <div className="hero-copy mt-6 flex w-full max-w-[300px] flex-col items-start gap-7 text-left md:mt-3">
            <p className="font-karla text-sm leading-relaxed text-white/80 md:text-base">
              A Kigali Studio that Builds Brands, Websites and Marketing. Delivered
              fast in one place with personal touch.
            </p>
          
            <div className="mt-5 flex w-full max-w-[260px] flex-col">
              {[
                { number: "7+", label: "Years of expertise" },
                { number: "100+", label: "Brands amplified" },
                { number: "300K+", label: "Impressions generated" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between border-b border-white/15 py-3"
                >
                  <span className="font-karla text-sm text-white/55">
                    {stat.label}
                  </span>
            
                  <span className="font-karla text-xl font-semibold text-white">
                    {stat.number}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* <ol className="absolute bottom-8 right-6 flex w-[calc(100%_-_3rem)] flex-col gap-3 text-white/90 md:bottom-12 md:right-12 md:w-[31rem]">
          {services.map((service, index) => (
            <li
              key={service}
              className="service-item flex items-center justify-between gap-3 font-karla text-sm tracking-wide md:text-base"
            >
              <span className="shrink-0 text-yellow-400">
                //{String(index + 1).padStart(2, "0")}
              </span>
              <span
                aria-hidden="true"
                className="service-line h-px min-w-5 flex-1 bg-white/40"
              />
              <span className="shrink-0 text-right">{service}</span>
            </li>
          ))}
        </ol> */}
      </section>

      <div className="about grid w-full grid-cols-1 gap-8 bg-white p-6 md:grid-cols-2 md:gap-12 md:px-12 md:py-24">
        <h1 className="about-title max-w-2xl font-karla text-3xl font-bold leading-tight tracking-tight text-[#01034F] md:text-6xl">
          We creatively bring your ideas into reality.
        </h1>
        <div className="flex max-w-xl flex-col items-start gap-6">
          <p className="about-item text-sm leading-relaxed text-gray-600 md:text-base">
            We are a team of makers, thinkers, and problem-solvers dedicated to
            bringing creative ideas into the real world with precision and heart.
            We don&apos;t just build your website and walk away. We stay
            responsible for what comes next: the marketing, the ads, the growth.
            Brand, website and marketing, all in one place.
          </p>
          <Link
            href="/about"
            className="about-item rounded-full bg-[#01034F] px-6 py-3 font-karla text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#01034F]/90"
          >
            Discover more
          </Link>
        </div>
      </div>

      <div className="">
        <Services />
      </div>
      <div className="w-full">
        <Partners />
      </div>
      <div className="w-full">
        <Portfolio />
      </div>
      <div className="w-full">
        <ChooseUs />
      </div>
      <div className="reveal w-full">
        <PricingSection />
      </div>
      <div className="w-full">
        <FAQ />
      </div>
    </main>
  );
}