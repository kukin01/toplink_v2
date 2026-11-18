
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export default function Navbar({
  hideOnHomePage = false,
}: {
  hideOnHomePage?: boolean;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  if (isHomePage && hideOnHomePage) return null;

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Our Services" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#contact", label: "Contact" },
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

  return (
    <nav
      className={`relative z-50 flex w-full items-center justify-between gap-2 p-3 shadow-md transition-colors duration-300 sm:p-4 ${
        isHomePage
          ? "bg-transparent text-white"
          : "bg-[#01034F]/90 text-white backdrop-blur-md"
      }`}
    >
      <Link href="/" className="shrink-0">
        <img
          src="/toplink/Logo-2.webp"
          alt="TopLink Digital"
          className="h-10 w-auto sm:h-12"
        />
      </Link>

      <ul className="hidden space-x-8 md:flex">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={
                !isHomePage && link.href.startsWith("#")
                  ? `/${link.href}`
                  : link.href
              }
              onClick={(e) => handleScroll(e, link.href)}
              className="cursor-pointer transition-colors hover:text-[#F5DC38]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <a
        href={isHomePage ? "#contact" : "/#contact"}
        onClick={(e) => handleScroll(e, "#contact")}
        className="cursor-pointer rounded-[2rem] bg-[#F5DC38] px-4 py-2 text-sm font-semibold text-[#01034F] transition-colors hover:bg-[#FFCE3C] sm:px-6 sm:text-base"
      >
        Contact us
      </a>
    </nav>
  );
}
