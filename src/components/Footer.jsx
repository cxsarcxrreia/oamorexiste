import React, { useMemo } from "react";
import { BOOKING_ROUTE } from "../config/booking";

const navItems = [
  { label: "Os nossos mentores", href: "/mentees" },
  { label: "Marcar a sua sessão", href: BOOKING_ROUTE },
  { label: "Testemunhos", href: "/testimonials" },
  { label: "A Academia", href: "/academy" },

];

export default function Footer({ logoSrc, onCookieSettingsClick }) {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="border-t border-[#D9D9D9] bg-[#F4F4F4]">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-14 py-16 sm:py-20 lg:grid-cols-[320px_1fr] lg:gap-10">
          <div className="flex flex-col items-start">
            <a href="#home" aria-label="Ir para o topo" className="inline-flex">
              <img
                src={logoSrc}
                alt="Logo O Amor Existe"
                className="h-[96px] w-[96px] object-contain"
              />
            </a>

            <button
              type="button"
              onClick={onCookieSettingsClick}
              className="mt-6 text-left text-[15px] font-medium text-[#7A7A7A] transition hover:text-[#4E4E4E]"
            >
              Cookie Settings
            </button>

            <p className="mt-5 text-[18px] font-medium text-[#202020]">
              © {year} #oamorexiste🌹
            </p>
          </div>

          <div className="flex items-end lg:justify-end">
            <nav className="w-full lg:w-auto">
              <ul className="flex flex-col gap-5 text-left sm:flex-row sm:flex-wrap sm:gap-x-12 sm:gap-y-5 lg:justify-end lg:text-right">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-[18px] font-medium text-[#262626] transition hover:text-[#8F45E8] tracking-[-0.01em]"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
