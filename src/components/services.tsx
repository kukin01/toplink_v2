"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { services } from "@/lib/services";
import {
  Layers3,
  Code2,
  Clapperboard,
  Megaphone,
  Search,
  TrendingUp,
} from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function getServiceIcon(service: string) {
  const name = service.toLowerCase()

  if (name.includes('brand')) return Layers3;
  if (name.includes('web')) return Code2;
  if (name.includes('content')) return Clapperboard;
  if (name.includes('ad')) return Megaphone;
  if (name.includes('seo')) return Search;
  if (name.includes('social')) return TrendingUp;
}

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
      className="relative z-10 flex w-full flex-col items-center justify-center overflow-hidden bg-[#030912] px-6 py-10 text-white md:px-12 md:py-16"
    >

      <svg
        aria-hidden="true"
        viewBox="0 0 1600 760"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        fill="none"
      >
        <defs>
          <linearGradient id="topFoldOne" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0D2238" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#061321" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#030912" stopOpacity="0" />
          </linearGradient>
      
          <linearGradient id="topFoldTwo" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1B354D" stopOpacity="0.55" />
            <stop offset="50%" stopColor="#0D2238" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#061321" stopOpacity="0.1" />
          </linearGradient>
      
          <linearGradient id="bottomWave" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0D2238" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#061321" stopOpacity="0.05" />
          </linearGradient>
      
          <linearGradient id="goldEdge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#E5AD00" stopOpacity="0" />
            <stop offset="35%" stopColor="#E5AD00" stopOpacity="0.2" />
            <stop offset="70%" stopColor="#E5AD00" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#E5AD00" stopOpacity="0.9" />
          </linearGradient>
      
          <filter id="goldGlow" x="-20%" y="-150%" width="150%" height="400%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
      
          <filter id="blueGlow" x="-20%" y="-100%" width="140%" height="300%">
            <feGaussianBlur stdDeviation="22" />
          </filter>
        </defs>
            
        <path
          d="M-100 -80
             H760
             C650 30 570 130 430 190
             C300 245 180 250 70 330
             C-10 390 -80 420 -130 430
             Z"
          fill="url(#topFoldOne)"
        />
      
        <path
          d="M350 -100
             H1080
             C940 5 850 100 730 165
             C610 230 500 250 390 330
             C510 205 565 95 600 -100
             Z"
          fill="url(#topFoldTwo)"
          opacity="0.8"
        />
      
        <path
          d="M760 -100
             H1300
             C1160 35 1050 120 900 190
             C790 245 680 285 590 365
             C700 240 770 105 760 -100
             Z"
          fill="#061321"
          fillOpacity="0.65"
        />
            
        <path
          d="M-80 350 C120 260 240 260 390 190 C520 130 610 40 700 -30"
          stroke="#1B354D"
          strokeWidth="2"
          opacity="0.65"
        />
      
        <path
          d="M370 325 C500 215 610 210 750 145 C870 85 960 0 1040 -55"
          stroke="#1B354D"
          strokeWidth="2"
          opacity="0.5"
        />
      
        <path
          d="M600 365 C730 245 850 225 980 155 C1100 90 1190 10 1260 -50"
          stroke="#1B354D"
          strokeWidth="2"
          opacity="0.4"
        />
      
        <g transform="translate(0 90)">
          <path
            d="M-100 620
               C120 500 260 510 410 565
               C570 625 680 705 850 700
               C1050 695 1180 585 1320 520
               C1430 470 1530 450 1700 440
               V800 H-100 Z"
            fill="url(#bottomWave)"
          />

          <path
            d="M-100 620
               C120 500 260 510 410 565
               C570 625 680 705 850 700
               C1050 695 1180 585 1320 520
               C1430 470 1530 450 1700 440"
            stroke="#1B354D"
            strokeWidth="26"
            opacity="0.5"
            filter="url(#blueGlow)"
          />

          <path
            d="M-100 620
               C120 500 260 510 410 565
               C570 625 680 705 850 700"
            stroke="#1B354D"
            strokeWidth="2"
            opacity="0.9"
          />

          <path
            d="M850 700
               C1050 695 1180 585 1320 520
               C1430 470 1530 450 1700 440"
            stroke="#E5AD00"
            strokeWidth="12"
            opacity="0.55"
            filter="url(#goldGlow)"
          />

          <path
            d="M850 700
               C1050 695 1180 585 1320 520
               C1430 470 1530 450 1700 440"
            stroke="url(#goldEdge)"
            strokeWidth="2"
          />
        </g>
      </svg>

      <div className="relative z-10 mb-15 flex w-full flex-col justify-between gap-6 md:flex-row md:items-end md:gap-8">
        <div className="flex flex-col gap-0">
          <h2 className="max-w-md font-karla text-white text-4xl font-bold md:text-5xl">
            DIGITAL SOLUTIONS WE <span className="text-[#FFC400]" >OFFER</span>
          </h2>
        </div>
        <div className="flex max-w-sm flex-col items-start gap-5 ">
          <p className="font-karla text-white/80 border-l-2 border-[#FFC400] px-4">
            From brand identity to web development and marketing, we help
            businesses grow with a full suite of digital services.
          </p>
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-full bg-[#FFC400] px-6 py-3 font-karla text-md font-bold tracking-wide text-[#030912] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFC400] hover:bg-[#E5AD00]"
          >
            All services
          </Link>
        </div>
      </div>
      <div className="relative z-10 grid w-full grid-cols-1 gap-15 sm:grid-cols-2 lg:grid-cols-3">
        {services.map(({ service, stat, image, placeholder, description }) => (
          <Link
            key={service}
            href="/services"
            className="service-card flex min-h-48 w-full flex-col items-start gap-5 rounded-3xl p-6 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFC400]"
          >
            <div className="w-full items-center gap-3">
              <h3
                className={`flex min-h-[64px] items-center gap-4 rounded-full border-2 border-[#1B354D] bg-[#061321]/90 px-6 py-3 font-karla text-base font-semibold text-white/95 md:text-xl ${
                  stat ? "shrink-0" : "w-full"
                }`}
              >
                {(() => {
                  const Icon = getServiceIcon(service);

                  return Icon ? (
                    <Icon
                      size={25}
                      strokeWidth={1.8}
                      className="shrink-0 text-[#FFC400]"
                    />
                  ) : null;
                })()}
              
                <span className={stat ? "" : "flex-1 text-center"}>
                  {service}
                </span>
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