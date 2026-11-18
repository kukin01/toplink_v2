import { FaInstagram, FaLinkedinIn, FaXTwitter, FaWhatsapp } from "react-icons/fa6";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const footerServices = [
  "Brand Identity",
  "Web Development",
  "Content Creation",
  "Ad Campaigns",
  "SEO Services",
  "Social Media Growth",
];

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/toplink.rw", icon: FaInstagram },
  { label: "LinkedIn", href: "#", icon: FaLinkedinIn },
  { label: "Twitter", href: "#", icon: FaXTwitter },
  { label: "WhatsApp", href: "https://wa.me/250780716326", icon: FaWhatsapp },
];

export default function Footer() {
  return (
    <footer className="relative z-10 w-full bg-[#01034F] p-5 text-white sm:px-8 md:px-20">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <img
            src="/toplink/Logo-2.webp"
            alt="TopLink Digital"
            className="h-24 w-auto sm:h-32 md:h-40"
          />

          <div className="mt-8 break-words text-md sm:text-lg md:text-xl">
            <a
              href="tel:+250780716326"
              className="block text-white/90 transition-colors duration-300 hover:text-[#FFCE3C]"
            >
              +250 780 716 326
            </a>
            <a
              href="mailto:info@toplinkdigital.com"
              className="mt-2 block text-white/90 transition-colors duration-300 hover:text-[#FFCE3C]"
            >
              info@toplinkdigital.com
            </a>

            <div className="mt-6 flex flex-row gap-3">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors duration-300 hover:border-[#FFCE3C] hover:text-[#FFCE3C]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mt-10 md:justify-items-end">
          <div>
            <h3 className="mb-4 text-lg text-inter font-semibold uppercase tracking-wider text-[#FFCE3C]">
              Navigation
            </h3>
            <ul className="flex flex-col gap-1 text-white/70">
              {navigation.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-md transition-colors duration-300 hover:text-white sm:text-lg md:text-xl"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg text-inter font-semibold uppercase tracking-wider text-[#FFCE3C]">
              Services
            </h3>
            <ul className="flex flex-col gap-1 text-white/70">
              {footerServices.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-md transition-colors duration-300 hover:text-white sm:text-lg md:text-xl"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-5 text-center border-t border-white/10 pt-6 text-sm text-white/50">
        © 2026 TopLink Digital. All rights reserved.
      </div>
    </footer>
  );
}