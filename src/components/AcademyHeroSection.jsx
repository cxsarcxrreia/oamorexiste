import React from "react";

function MagicalButton({ label = "Descobrir o Método", href = "#metodo" }) {
  return (
    <a
      href={href}
      className="group relative inline-flex min-h-[56px] items-center justify-center rounded-full p-[1.5px] shadow-[0_12px_30px_rgba(60,8,59,0.18)] transition hover:scale-[1.02]"
    >
      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ffb6f9] via-[#d98cff] to-[#8ee7ff]" />
      <span className="relative inline-flex min-h-[56px] items-center justify-center overflow-hidden rounded-full bg-[#2e0d3b] px-8 text-[16px] font-semibold text-white">
        <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.26)_0%,rgba(255,255,255,0.08)_32%,rgba(255,255,255,0.02)_100%)]" />
        <span className="absolute left-[8%] top-[10%] h-[42%] w-[38%] rounded-full bg-white/12 blur-md" />
        <span className="relative z-10">{label}</span>
      </span>
    </a>
  );
}

export default function AcademyHeroSection() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden px-6 py-40 sm:px-10 lg:px-16 lg:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-[14%] h-[220px] w-[220px] rounded-full bg-[#F3D4FF] opacity-45 blur-3xl" />
        <div className="absolute right-[8%] top-[24%] h-[260px] w-[260px] rounded-full bg-[#FFD2EA] opacity-35 blur-3xl" />
        <div className="absolute left-1/2 top-[58%] h-[220px] w-[220px] -translate-x-1/2 rounded-full bg-[#E7D8FF] opacity-40 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-[1120px]">
        <div className="mx-auto flex max-w-[900px] flex-col items-center text-center">
          <div className="inline-flex rounded-full border border-[#E5D2F2] bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8E68A4] shadow-[0_10px_24px_rgba(111,58,129,0.08)] backdrop-blur-sm">
            A Academia
          </div>

          <h1 className="mt-6 text-[40px] font-semibold leading-[0.98] tracking-[-0.03em] text-[#241A2A] sm:text-[56px] lg:text-[74px]">
            A Academia #oamorexiste é o lugar onde tudo começa e onde tudo se{" "}
            <span className="bg-gradient-to-r from-[#D47BFF] to-[#ff0080] bg-clip-text text-transparent">
              transforma.
            </span>
          </h1>

          <p className="mt-6 max-w-[700px] text-[16px] leading-[1.75] text-[#5F5F68] sm:text-[18px]">
            Um espaço de evolução estratégica e humana, criado para quem quer
            crescer, transformar-se e fazer a diferença no mundo.
          </p>

          <div className="mt-8 flex justify-center">
            <MagicalButton label="Descobrir o Método" href="#metodo" />
          </div>
        </div>
      </div>
    </section>
  );
}
