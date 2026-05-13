import React, { useEffect, useRef, useState } from "react";
import backgroundOnly from "../assets/Home/hero-elements/background-only.png";
import logoOnly from "../assets/Home/hero-elements/logo-only.png";
import characterOnly from "../assets/Home/hero-elements/character-only.png";

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function Pill({ children }) {
  return (
    <span className="inline-flex rounded-full border border-[#DFC6F0] bg-[#FBF6FF] px-3 py-1 text-[11px] font-medium text-[#6F3A81] shadow-[0_10px_22px_rgba(111,58,129,0.08)] backdrop-blur-sm">
      {children}
    </span>
  );
}

export default function HomeHeroParallax() {
  const sectionRef = useRef(null);
  const rafRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isMobileLayout, setIsMobileLayout] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = () => {
      setReduceMotion(media.matches);
    };

    handleChange();

    if (media.addEventListener) {
      media.addEventListener("change", handleChange);
    } else {
      media.addListener(handleChange);
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", handleChange);
      } else {
        media.removeListener(handleChange);
      }
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1099px)");

    const handleChange = () => {
      setIsMobileLayout(media.matches);
    };

    handleChange();

    if (media.addEventListener) {
      media.addEventListener("change", handleChange);
    } else {
      media.addListener(handleChange);
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", handleChange);
      } else {
        media.removeListener(handleChange);
      }
    };
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const updateProgress = () => {
      rafRef.current = 0;

      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const scrolledInside = clamp(-rect.top, 0, rect.height * 0.9);
      const nextProgress = clamp(scrolledInside / (rect.height * 0.34), 0, 1);

      setProgress(nextProgress);
    };

    const requestTick = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();

    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", requestTick);

    return () => {
      window.removeEventListener("scroll", requestTick);
      window.removeEventListener("resize", requestTick);

      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [reduceMotion]);

  const motion = reduceMotion ? 0 : progress;

  const backgroundStyle = {
    transform: `translate3d(0, ${motion * -70}px, 0) scale(${1.06 + motion * 0.14})`,
    transformOrigin: "center center",
  };

  const logoStyle = {
    transform: `translate3d(${motion * 26}px, ${motion * -26}px, 0) rotate(${motion * 42}deg) scale(${1.08 + motion * 0.2})`,
    transformOrigin: "50% 50%",
  };

  const characterStyle = {
    transform: `translate3d(${motion * 18}px, ${motion * -34}px, 0) scale(${1.02 + motion * 0.18})`,
    transformOrigin: "50% 100%",
  };

  const mobileLogoStyle = {
    transform: `translate3d(0, ${motion * -10}px, 0) rotate(${motion * 30}deg) scale(${1.02 + motion * 0.12})`,
    transformOrigin: "50% 50%",
  };

  const mobileCharacterStyle = {
    transform: `translate3d(0, ${motion * -16}px, 0) scale(${1.02 + motion * 0.12})`,
    transformOrigin: "50% 100%",
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[760px] overflow-hidden pt-14 sm:min-h-[820px] sm:pt-16 lg:min-h-[860px]"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundOnly}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center will-change-transform"
          style={backgroundStyle}
        />
        <div className="absolute inset-0 bg-black/28" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/16 via-black/10 to-black/52 sm:to-black/38" />
      </div>

      {/* Mobile figure stack behind overlay and text */}
      {isMobileLayout && (
        <>
          <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
            <div className="absolute left-1/2 top-[8%] h-[420px] w-[420px] -translate-x-1/2 sm:h-[500px] sm:w-[500px]">
              <div className="absolute left-1/2 top-[4%] w-[92%] -translate-x-1/2 opacity-[1] brightness-[0.7]">
                <img
                  src={logoOnly}
                  alt=""
                  aria-hidden="true"
                  className="w-full max-w-none will-change-transform scale-[2.0] translate-y-40 translate-x-[-20px]"
                  style={mobileLogoStyle}
                />
              </div>

              <div className="absolute bottom-0 left-1/2 w-[68%] -translate-x-1/2 opacity-[0.82] brightness-[0.9] sm:w-[64%] scale-[4] translate-y-30 translate-x-[-100px]">
                <img
                  src={characterOnly}
                  alt=""
                  aria-hidden="true"
                  className="w-full max-w-none will-change-transform"
                  style={mobileCharacterStyle}
                />
              </div>
            </div>
          </div>

          <div className="absolute inset-0 z-[2] bg-black/35" />
        </>
      )}

      <div
        className={`relative mx-auto flex max-w-[1400px] px-6 py-12 sm:px-10 sm:py-16 lg:px-16 ${
          isMobileLayout
            ? "z-[3] min-h-[760px] items-end justify-center"
            : "z-10 min-h-[760px] items-end sm:min-h-[820px] md:items-center lg:min-h-[860px]"
        }`}
      >
        {/* Desktop figure stack */}
        {!isMobileLayout && (
          <div className="pointer-events-none absolute inset-y-0 left-6 right-6 z-[2] overflow-hidden sm:left-10 sm:right-10 lg:left-16 lg:right-16">
            <div className="absolute bottom-0 left-0 h-[94%] w-[760px]">
              <img
                src={logoOnly}
                alt=""
                aria-hidden="true"
                className="absolute left-[2%] top-[0%] w-[90%] max-w-none will-change-transform scale-[1.25] translate-y-10 translate-x-[180px]"
                style={logoStyle}
              />

              <img
                src={characterOnly}
                alt=""
                aria-hidden="true"
                className="absolute bottom-0 left-[40%] scale-[2.0] translate-y-20 w-[80%] max-w-none will-change-transform"
                style={characterStyle}
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div
          className={`relative z-[4] w-full text-white ${
            isMobileLayout
              ? "mx-auto max-w-[380px] text-center"
              : "ml-auto max-w-[560px]"
          }`}
        >
          <div
            className={`mb-4 flex items-center gap-3 ${
              isMobileLayout ? "justify-center" : ""
            }`}
          >
            <span className="text-[15px] tracking-[0.28em] text-[#DF97FF]">
              ★★★★★
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/80">
              Confiado pelos clientes
            </span>
          </div>

          <h1 className="mt-6 text-[38px] leading-[0.98] tracking-[-0.03em] text-white sm:text-[56px] lg:text-[74px]">
            <span className="font-semibold">Mentoria</span> que te
            <br />
            ajuda a{" "}
            <span className="bg-gradient-to-r from-[#D47BFF] to-[#ff0080] bg-clip-text font-semibold text-transparent">
              Progredir!
            </span>
          </h1>

          <div className="mt-8">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/75">
              Verified Expert
            </p>

            <h2 className="mt-1 text-[28px] font-medium leading-none tracking-[-0.03em] text-white sm:text-[38px]">
              Sandra Isabel Correia
            </h2>

            <p className="mt-2 text-[14px] text-white/90">
              Fundadora da Pelcor. Criadora do #oamorexiste. Argumentista e realizadora.
            </p>

            <div
              className={`mt-5 flex flex-wrap gap-2 ${
                isMobileLayout ? "justify-center" : ""
              }`}
            >
              <Pill>Brand Building</Pill>
              <Pill>Women&apos;s Entrepreneurship</Pill>
              <Pill>Leadership &amp; Confidence</Pill>
            </div>

            <a
                href="/mentees"
                className="group relative mt-8 inline-flex min-h-[54px] items-center justify-center overflow-hidden rounded-full px-8 tracking-[-0.01em] text-[22px] font-medium !rounded-full border- !border-[#DFC6F0] bg-gradient-to-r from-[#D47BFF] to-[#ff0080] leading-[1.25] text-[#FBF6FF] shadow-[0_10px_24px_rgba(111,58,129,0.10)] transition-all duration-300 ease-out hover:scale-[1.02] hover:!border-[#D3AFE9] hover:bg-gradient-to-r hover:from-[#F7EEFD] hover:to-[#E7C4F5] hover:text-[#5E2F73] hover:shadow-[0_14px_30px_rgba(111,58,129,0.14)]"
                >
                <span className="relative z-10">Explorar Mentorias</span>
                </a>
          </div>
        </div>
      </div>
    </section>
  );
}
