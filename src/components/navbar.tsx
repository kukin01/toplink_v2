
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import ContactStepperModal from "@/components/ContactStepperModal";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // useEffect(() => {
  //   document.body.style.overflow = menuOpen ? "hidden" : "";

  //   return () => {
  //     document.body.style.overflow = "";
  //   };
  // }, [menuOpen]);

  const navSurface = scrolled || !isHomePage;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[100] px-4 pt-4 sm:px-6">
        <nav
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-3 transition-all gap-3 duration-500 sm:px-6 ${
            navSurface
              ? "border-[#1B354D] bg-[#061321]/80 shadow-xl shadow-black/20 backdrop-blur-2xl"
              : "border-white/10 bg-[#030912]/10 backdrop-blur-md"
          }`}
        >
          <Link
            href="/"
            aria-label="Toplink Digital home"
            className="relative z-10 shrink-0"
          >
            <Image
              src="/toplink/Logo-2.webp"
              alt="Toplink Digital"
              width={250}
              height={60}
              priority
              className="h-5 w-25 object-contain sm:h-12"
            />
          </Link>

          <div className="relative hidden md:flex flex-1 items-center justify-end">
            <div
              className={`absolute left-1/2 flex -translate-x-1/2 items-center gap-2 transition-all duration-500 ${
                menuOpen
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-2 opacity-0"
              }`}
              aria-hidden={!menuOpen}
            >
              {links.map((link) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname === link.href ||
                      pathname.startsWith(`${link.href}/`);
          
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    tabIndex={menuOpen ? 0 : -1}
                    className={`relative whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300 ${
                      active
                        ? "text-[#FFC400]"
                        : "text-white/75 hover:text-white"
                    }`}
                  >
                    {link.label}
          
                    {active && (
                      <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#FFC400]" />
                    )}
                  </Link>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              className="relative z-10 inline-flex h-11 items-center justify-center gap-2.5 rounded-full border border-[#1B354D] bg-[#0D2238] px-5 text-white transition-all duration-300 hover:border-[#FFC400]/50 hover:text-[#FFC400]"
            >
              <span className="flex h-5 w-5 items-center justify-center">
                {menuOpen ? <X size={19} strokeWidth={1.8} /> : <Menu size={19} strokeWidth={1.8} />}
              </span>
            
              <span className="text-sm font-medium tracking-wide">
                {menuOpen ? "Close" : "Menu"}
              </span>
            </button>

          </div>


          <ContactStepperModal
            trigger={
              <button
                type="button"
                className="hidden items-center gap-2 rounded-full bg-[#FFC400] px-5 py-2.5 text-sm font-bold text-[#030912] transition-all duration-300 hover:bg-[#E5AD00] hover:shadow-[0_0_22px_rgba(229,173,0,0.18)] md:inline-flex"
              >
                Let's talk
                <ArrowUpRight size={16} />
              </button>
            }
          />

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="relative z-[120] flex h-10 w-10 items-center justify-center rounded-full border border-[#1B354D] bg-[#0D2238] text-white transition-colors hover:text-[#FFC400] md:hidden"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-[90] bg-[#030912]/95 px-6 pb-10 pt-28 backdrop-blur-2xl transition-all duration-500 md:hidden ${
          menuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-4 opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="mx-auto flex h-full max-w-lg flex-col">
          <p className="mb-7 text-xs font-semibold uppercase tracking-[0.25em] text-[#E5AD00]">
            Explore Toplink
          </p>

          <div className="flex flex-col">
            {links.map((link, index) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  tabIndex={menuOpen ? 0 : -1}
                  className="group flex items-center justify-between border-b border-[#1B354D] py-5"
                >
                  <span className="flex items-center gap-4">
                    <span className="text-xs text-[#E5AD00]/70">
                      0{index + 1}
                    </span>

                    <span
                      className={`font-karla text-3xl font-semibold transition-colors ${
                        active
                          ? "text-[#FFC400]"
                          : "text-white group-hover:text-[#FFC400]"
                      }`}
                    >
                      {link.label}
                    </span>
                  </span>

                  <ArrowUpRight
                    className="text-[#E5AD00] opacity-60 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100"
                    size={22}
                  />
                </Link>
              );
            })}
          </div>

          <div className="mt-auto pt-10">
            <ContactStepperModal
              trigger={
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  tabIndex={menuOpen ? 0 : -1}
                  className="flex w-full items-center justify-center gap-3 rounded-full bg-[#FFC400] px-6 py-4 font-bold text-[#030912] transition-colors hover:bg-[#E5AD00]"
                >
                  Start a project
                  <ArrowUpRight size={19} />
                </button>
              }
            />

            <p className="mt-6 text-center text-sm text-white/40">
              Let's build something meaningful.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
