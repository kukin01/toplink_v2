"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import WavesBackground from "@/components/WavesBackground";
import Services from "@/components/services";
import PricingSection from "@/components/PricingSection";
import Portfolio from "@/components/Portfolio";
import ContactStepperModal from "@/components/ContactStepperModal";
import Partners from "@/components/Partners";
import ChooseUs from "@/components/ChooseUs";
import FAQ from "@/components/FAQ";
import { BriefcaseBusiness } from "lucide-react";

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
        const heroTimeline = gsap.timeline({
          defaults: { ease: "power3.out" },
        });
  
        heroTimeline
          .from(".hero-word", {
            y: 70,
            autoAlpha: 0,
            duration: 0.85,
            stagger: 0.2,
            clearProps: "all",
          })
          .from(
            ".hero-copy",
            {
              y: 25,
              autoAlpha: 0,
              duration: 0.7,
              stagger: 0.2,
              clearProps: "all",
            },
            "-=0.2"
          )
          .from(
            ".hero-detail",
            {
              y: 20,
              autoAlpha: 0,
              duration: 0.65,
              clearProps: "all",
            },
            "-=0.2"
          )
          .from(
            ".hero-cta",
            {
              y: 25,
              autoAlpha: 0,
              duration: 0.7,
              clearProps: "all",
            },
            "-=0.2"
          );

        ScrollTrigger.create({
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          onEnterBack: () => heroTimeline.restart(),
        });
  
        gsap
          .timeline({
            scrollTrigger: {
              trigger: ".about",
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
            defaults: { ease: "power3.out" },
          })
          .from(".about-title", {
            y: 60,
            autoAlpha: 0,
            duration: 0.9,
          })
          .from(
            ".about-item",
            {
              y: 40,
              autoAlpha: 0,
              duration: 0.7,
              stagger: 0.15,
            },
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
      <section className="hero-section relative h-[100svh] bg-[#030912] min-h-[44rem] w-full overflow-hidden md:h-screen md:min-h-[40rem]">
        <WavesBackground />


        <div className="absolute inset-0 flex items-center px-5 sm:px-8 lg:px-12">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-4 md:grid-cols-[0.2fr_auto] md:gap-10 lg:gap-20">
            <div className="hero-title">
              <p className="text-white/65 text-[13px] tracking-[0.12em] leading-relaxed text-sm hero-copy">
                [a kigali studio that designs, develop and bring to market your business]
              </p>
              <h1 className="hero-word text-[clamp(3.5rem,8vw,8rem)] font-bold uppercase leading-[0.85] tracking-[-0.075em] text-white">
                Brand
              </h1>
            </div>

            <div className="flex flex-col items-start gap-4 md:items-end md:text-right">        
              <div className=" mt-10 flex flex-col justify-center leading-[0.85] tracking-[-0.075em] text-white">
                <p className="hero-copy mb-3 w-32 text-left text-[10px] leading-relaxed tracking-[0.12em] text-white/65 sm:w-60 sm:text-xs">
                  Bring your ideas to life and build the digital presence to compete and lead in your market.
                </p>
                <h1 className="grid grid-cols-[auto_auto] items-start gap-x-6 text-left font-bold uppercase">
                  <span className="hero-word text-[#FFC400] text-[clamp(3.5rem,7vw,7rem)]">From</span>
                  <span className="hero-word text-[clamp(3.5rem,7vw,7rem)]">First</span>
                  <span className="hero-copy mt-3 max-w-36 whitespace-normal text-[10px] font-normal normal-case leading-relaxed tracking-[0.12em] text-white/65 sm:text-xs">
                    Strategy, innovation and speed in one file
                  </span>
                  <span className="text-[clamp(3.5rem,5vw,5rem)] hero-word">Contact</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 md:bottom-12">
          <Link
            href="/portfolio"
            aria-label="Explore our work"
            className="float-button group flex h-12 w-12 gap-5 items-center justify-start overflow-hidden rounded-full border border-white/30 bg-white/10 px-3 text-sm font-bold uppercase tracking-wide text-white shadow-[0_12px_30px_rgba(0,0,0,0.25)] backdrop-blur-md transition-[width,background-color,border-color] duration-300 hover:w-48 hover:border-white/50 hover:bg-white/20 focus-visible:w-48 focus-visible:border-white/50 focus-visible:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <BriefcaseBusiness aria-hidden="true" className="h-5 w-5 shrink-0" />
            <span className="whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
              Explore works
            </span>
          </Link>
        </div>            
      </section>

      <div className="about grid w-full grid-cols-1 gap-8 bg-white p-6 md:grid-cols-2 md:gap-12 md:px-12 md:py-24">
        <h1 className="about-title max-w-2xl text-3xl font-bold leading-tight tracking-tight text-[#030912] md:text-6xl">
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
            className="about-item rounded-full bg-[#030912] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#061321]"
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