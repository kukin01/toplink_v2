
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Menu, X } from "lucide-react";

gsap.registerPlugin(ScrollToPlugin);

export default function Navbar({
  hideOnHomePage = false,
}: {
  hideOnHomePage?: boolean;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);

  if (isHomePage && hideOnHomePage) return null;

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Our Services" },
    { href: "/portfolio", label: "Portfolio" },
  ];

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    if (!isHomePage || !targetId.startsWith("#")) return;

    e.preventDefault();

    const target = document.querySelector(targetId);
    if (!target) return;

    const y = target.getBoundingClientRect().top + window.scrollY;

    gsap.to(window, {
      duration: 1,
      scrollTo: { y, autoKill: false },
      ease: "power3.inOut",
    });
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav
      className={`relative z-50 w-full p-3 shadow-md transition-colors duration-300 sm:p-4 ${
        isHomePage
          ? "bg-transparent text-white"
          : "bg-[#01034F]/90 text-white backdrop-blur-md"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <Link href="/" className="shrink-0" onClick={closeMenu}>
          <img
            src="/toplink/Logo-2.webp"
            alt="TopLink Digital"
            className="h-10 w-auto sm:h-12"
          />
        </Link>

        {/* Desktop navigation */}
        <ul className="hidden items-center space-x-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="cursor-pointer transition-colors hover:text-[#F5DC38]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href={isHomePage ? "#contact" : "/#contact"}
            onClick={(e) => {
              handleScroll(e, "#contact");
              closeMenu();
            }}
            className="cursor-pointer rounded-[2rem] bg-[#F5DC38] px-4 py-2 text-sm font-semibold text-[#01034F] transition-colors hover:bg-[#FFCE3C] sm:px-6 sm:text-base"
          >
            Contact us
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 transition-colors hover:bg-white/10 md:hidden"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation dropdown */}
      {menuOpen && (
        <div className="absolute left-0 top-full z-50 w-full border-t border-white/10 bg-[#01034F] px-5 py-5 shadow-xl md:hidden">
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.href} className="border-b border-white/10">
                <Link
                  href={link.href}
                  onClick={(e) => {
                    handleScroll(e, link.href);
                    closeMenu();
                  }}
                  className="block py-4 text-base text-white/90 transition-colors hover:text-[#F5DC38]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
