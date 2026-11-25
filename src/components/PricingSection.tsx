"use client";

import { useState } from "react";
import ContactStepperModal from "@/components/ContactStepperModal";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Basic",
    description: "Perfect for small businesses getting started.",
  },
  {
    name: "Starter",
    description: "The essentials for growing your business.",
  },
  {
    name: "Professional",
    description: "More support for businesses ready to scale.",
  },
  {
    name: "Enterprise",
    description: "A tailored solution for complex business needs.",
  },
];

const features = [
  "Feature placeholder 1",
  "Feature placeholder 2",
  "Feature placeholder 3",
  "Feature placeholder 4",
];

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="w-full bg-white px-6 py-5 md:px-12 md:py-15">
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <span className="py-3 px-5 border  border-[#1B354D] rounded-[2rem]">Pricing plan</span>
          <h2 className="mt-4 font-karla text-3xl font-bold leading-tight tracking-tight text-[#030912] md:text-4xl">
            Explore Our Plans and Pricing
          </h2>
          <p className="mt-2 font-karla text-base text-gray-600 md:text-lg">
            Choose a plan that&apos;s right for you.
          </p>

          <div
            aria-label="Billing period"
            className="mt-3 flex items-center justify-center gap-4 font-karla inter text-sm font-semibold"
          >
            <span className={!isYearly ? "text-[#030912]" : "text-gray-500"}>
              Monthly
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={isYearly}
              aria-label="Yearly billing"
              onClick={() => setIsYearly((yearly) => !yearly)}
              className="relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full p-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#030912]"
            >
              <span
                className={`h-5 w-5 rounded-full bg-[#FFC400] transition-transform ${
                  isYearly ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            <span className={isYearly ? "text-[#030912]" : "text-gray-500"}>
              Yearly
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 items-stretch gap-2 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className="flex h-full rounded-2xl flex-col border border-[#1B354D] bg-[#030912] p-3 text-white"
            >
              <div className="rounded-2xl bg-white/10 p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="shrink-0 font-karla text-md font-semibold text-white/80">
                    {plan.name}
                  </h3>
                  <p className="flex items-baseline gap-2 whitespace-nowrap font-karla">
                    <span className="text-3xl font-bold tracking-tight xl:text-4xl">
                      $--
                    </span>
                    <span className="text-sm text-white/70">
                      / {isYearly ? "year" : "month"}
                    </span>
                  </p>
                </div>
                <p className="mt-4 min-h-12 font-karla text-sm leading-relaxed text-white/75">
                  {plan.description}
                </p>
              </div>

              <div className="px-3 pt-5">
                <ContactStepperModal
                  trigger={
                    <Button className="w-full rounded-lg bg-[#FFC400] px-5 py-3 font-karla text-sm font-bold uppercase tracking-wide text-[#030912] transition-colors hover:bg-[#E5AD00]">
                      Get started
                    </Button>
                  }
                />
              </div>

              <div className="mt-6 flex-1 border-t border-[#1B354D] px-3 pt-5 pb-3">
                <h4 className="font-karla text-sm font-semibold uppercase tracking-wide text-center text-white/80">
                  — Features —
                </h4>
                <ol className="mt-5 flex flex-col gap-3 font-karla text-sm items-center text-white/75">
                  {features.map((feature) => (
                    <li key={`${plan.name}-${feature}`}>{feature}</li>
                  ))}
                </ol>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
