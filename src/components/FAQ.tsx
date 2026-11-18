
"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import ContactStepperModal from "@/components/ContactStepperModal";

const questions = [
  {
    qn: "How do we get started?",
    ans: "Send us a message or call us. Tell us your idea and we'll suggest the next step.",
  },
  {
    qn: "Do I have to have a clear idea of what I want?",
    ans: "Not at all! We'll guide you through the process and help refine your vision based on your business goals.",
  },
  {
    qn: "Are there any hidden costs?",
    ans: "No hidden fees! We provide a detailed quote before any work begins.",
  },
  {
    qn: "Which kinds of businesses do you work with?",
    ans: "Any field, from tourism and energy to finance and wellness, and many more.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="w-full bg-white px-6 py-16 text-[#01034F] md:px-12 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">

        <div className="flex flex-col items-start">
          <h2 className="max-w-md font-karla text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            Got questions?
            <span className="text-[#B8A300]"> We've got answers.</span>
          </h2>

          <p className="mt-4 max-w-sm font-inter text-sm leading-7 text-[#01034F]/60 md:text-base">
            Everything you need to know before getting started with Toplink
            Digital. Can't find what you're looking for? Get in touch with us.
          </p>

          <ContactStepperModal
            trigger={
              <button
                type="button"
                className="mt-5 inline-flex items-center gap-3 rounded-full bg-[#01034F] px-7 py-3 font-karla text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#01034F]/85"
              >
                Talk to us
                <span className="text-yellow-400">↗</span>
              </button>
            }
          />
        </div>

        <div className="border-t border-[#01034F]/15">
          {questions.map((item, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={item.qn}
                className="border-b border-[#01034F]/15"
              >
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex(isOpen ? null : index)
                  }
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="flex items-start gap-5">
                    <span className="pt-1 font-inter text-xs font-semibold text-[#B8A300]">
                      0{index + 1}
                    </span>

                    <span className="font-karla text-lg font-semibold leading-snug sm:text-xl">
                      {item.qn}
                    </span>
                  </span>

                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#01034F]/5 text-[#01034F] transition-colors">
                    {isOpen ? (
                      <Minus size={17} />
                    ) : (
                      <Plus size={17} />
                    )}
                  </span>
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-xl pb-5 pl-10 font-inter text-sm leading-7 text-[#01034F]/60 sm:pl-12 sm:text-base">
                      {item.ans}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
