import React, { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/" },
  { label: "A Academia", to: "/academy" },
  { label: "Mentores", to: "/mentees" },
  { label: "Testemunhos", to: "/testimonials" },
  { label: "Marca a tua Sessão", to: "/mentorship", highlight: true },
];

export default function Header({ logoSrc }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = mobileOpen ? "hidden" : previousOverflow || "";

    return () => {
      document.body.style.overflow = previousOverflow || "";
    };
  }, [mobileOpen]);

  const theme = useMemo(() => {
    if (isHomePage) {
      return {
        shell:
          "border-white/20 bg-white/8 backdrop-blur-xl shadow-[0_18px_45px_rgba(20,10,30,0.16)]",
        logoText: "text-white",
        navText: "text-white/72 hover:text-white",
        activeText: "text-white",
        buttonGhost:
          "border-white/20 bg-white/8 text-white hover:bg-white/14",
        buttonPrimary:
          "bg-white text-[#2B1832] hover:bg-[#F7F1FB]",
        mobilePanel:
          "border-white/16 bg-[rgba(34,16,44,0.94)] backdrop-blur-2xl",
        mobileLink: "text-white/82 hover:text-white",
        mobileActive: "text-white",
        divider: "border-white/12",
        burger:
          "border-white/20 bg-white/8 text-white hover:bg-white/14",
      };
    }

    return {
      shell:
        "border-[#EADBF5] bg-white/88 backdrop-blur-xl shadow-[0_18px_45px_rgba(111,58,129,0.10)]",
      logoText: "text-[#161616]",
      navText: "text-black/58 hover:text-black",
      activeText: "text-[#111111]",
      buttonGhost:
        "border-[#E5D2F2] bg-[#FBF6FF] text-[#6F3A81] hover:bg-[#F6EEFC]",
      buttonPrimary:
        "bg-[#3C083B] text-white hover:bg-[#4E1150]",
      mobilePanel:
        "border-[#EADBF5] bg-[rgba(255,255,255,0.96)] backdrop-blur-2xl",
      mobileLink: "text-black/70 hover:text-black",
      mobileActive: "text-[#111111]",
      divider: "border-[#EFE4F6]",
      burger:
        "border-[#E5D2F2] bg-white/80 text-[#3C083B] hover:bg-[#FBF6FF]",
    };
  }, [isHomePage]);

  const primaryNavItems = navItems.filter((item) => !item.highlight);
  const ctaItem = navItems.find((item) => item.highlight);

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50">
        <div className="mx-auto max-w-[1440px] px-4 pt-4 sm:px-6 sm:pt-5 lg:px-10">
          <div
            className={`relative rounded-[30px] border transition-[box-shadow,background-color,border-color] duration-300 sm:rounded-[34px] lg:rounded-full ${theme.shell}`}
          >
            <div className="flex min-h-[74px] items-center justify-between px-4 sm:px-6 lg:min-h-[80px] lg:px-8">
              <Link
                to="/"
                className="flex shrink-0 items-center gap-3 whitespace-nowrap"
                aria-label="Ir para a home"
              >
                <img
                  src={logoSrc}
                  alt="Logo O Amor Existe"
                  className="h-[40px] w-[40px] object-contain sm:h-[44px] sm:w-[44px]"
                />
                <span
                  className={`whitespace-nowrap text-[16px] font-semibold tracking-[-0.02em] sm:text-[19px] ${theme.logoText}`}
                >
                  #oamorexiste🌹
                </span>
              </Link>

              <div className="hidden flex-1 items-center justify-end gap-8 pl-10 lg:flex xl:gap-10 xl:pl-14">
                <nav>
                  <ul className="flex items-center gap-5 xl:gap-8">
                    {primaryNavItems.map((item) => (
                      <li key={item.to}>
                        <NavLink
                          to={item.to}
                          end={item.to === "/"}
                          className={({ isActive }) =>
                            `relative inline-flex items-center text-[15px] leading-none transition-colors duration-300 ${
                              isActive
                                ? `${theme.activeText} font-bold`
                                : `${theme.navText} font-semibold`
                            }`
                          }
                        >
                          {({ isActive }) => (
                            <span className="relative whitespace-nowrap pb-1">
                              {item.label}
                              <span
                                className={`absolute inset-x-0 -bottom-0.5 h-[2px] origin-center rounded-full transition-transform duration-300 ${
                                  isHomePage
                                    ? "bg-white/90"
                                    : "bg-[linear-gradient(90deg,#ffb6f9,#d98cff,#8ee7ff)]"
                                } ${isActive ? "scale-x-100" : "scale-x-0"}`}
                              />
                            </span>
                          )}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </nav>

                {ctaItem && (
                  <NavLink
                    to={ctaItem.to}
                    className={({ isActive }) =>
                      `inline-flex h-[42px] w-[180px] shrink-0 items-center justify-center rounded-full px-5 text-center text-[14px] font-semibold whitespace-nowrap transition-all duration-300 ${
                        isActive
                          ? `${theme.buttonPrimary} scale-[1.02] shadow-[0_16px_34px_rgba(111,58,129,0.20)] font-bold`
                          : `${theme.buttonGhost}`
                      }`
                    }
                  >
                    {ctaItem.label}
                  </NavLink>
                )}
              </div>

              <div className="lg:hidden">
                <button
                  type="button"
                  onClick={() => setMobileOpen((prev) => !prev)}
                  aria-expanded={mobileOpen ? "true" : "false"}
                  aria-controls="mobile-header-dropdown"
                  aria-label="Abrir menu"
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 ${theme.burger}`}
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    {mobileOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 6l12 12M18 6L6 18"
                      />
                    ) : (
                      <>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 7h16"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 12h16"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10 17h10"
                        />
                      </>
                    )}
                  </svg>
                </button>
              </div>
            </div>

            <div
              id="mobile-header-dropdown"
              className={`lg:hidden overflow-hidden transition-[max-height,opacity,padding] duration-300 ease-out ${
                mobileOpen
                  ? "max-h-[460px] opacity-100 px-1 pb-5 pt-1"
                  : "max-h-0 opacity-0 px-0 pb-0 pt-0"
              }`}
            >
              <div className={`mx-3 mt-2 rounded-[26px] border ${theme.mobilePanel}`}>
                <div className="px-4 py-3">
                  <nav>
                    <ul className="space-y-1.5">
                      {navItems.map((item) => (
                        <li key={item.to}>
                          {item.highlight ? (
                            <NavLink
                              to={item.to}
                              className={({ isActive }) =>
                                `mt-2 inline-flex min-h-[46px] w-full items-center justify-center rounded-full px-5 text-[14px] transition-all duration-300 ${
                                  isActive
                                    ? `${theme.buttonPrimary} font-bold shadow-[0_16px_34px_rgba(111,58,129,0.20)]`
                                    : `${theme.buttonGhost} font-semibold`
                                }`
                              }
                            >
                              {item.label}
                            </NavLink>
                          ) : (
                            <NavLink
                              to={item.to}
                              end={item.to === "/"}
                              className={({ isActive }) =>
                                `flex items-center justify-between rounded-[18px] px-3 py-3 text-[15px] transition-colors duration-300 ${
                                  isActive
                                    ? `${theme.mobileActive} font-bold`
                                    : `${theme.mobileLink} font-semibold`
                                }`
                              }
                            >
                              {({ isActive }) => (
                                <>
                                  <span>{item.label}</span>
                                  <span
                                    className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                                      isActive
                                        ? isHomePage
                                          ? "bg-white"
                                          : "bg-[#D47BFF]"
                                        : "bg-transparent"
                                    }`}
                                  />
                                </>
                              )}
                            </NavLink>
                          )}
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 -z-10 bg-black/10 lg:hidden"
          />
        )}
      </header>
    </>
  );
}