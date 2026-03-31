import React from "react";

const audienceItems = [
  "Empreendedores",
  "Empresários",
  "Chefias Intermédias",
  "Trabalhadores",
  "Talentos Criativos",
];

function AudiencePill({ children }) {
  return (
    <span className="group relative inline-flex items-center justify-center rounded-full p-[1.5px] shadow-[0_14px_34px_rgba(111,58,129,0.14)] transition duration-300 hover:-translate-y-1 hover:scale-[1.04]">
      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ffb6f9]/10 via-[#d98cff]/10 to-[#8ee7ff]/10" />
      <span className="relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/70 bg-white/20 px-5 py-3 text-[14px] font-semibold text-[#6F3A81] backdrop-blur-sm">
        <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.34)_0%,rgba(255,255,255,0.10)_36%,rgba(255,255,255,0.03)_100%)]" />
        <span className="absolute left-[10%] top-[12%] h-[42%] w-[34%] rounded-full bg-white/20 blur-lg" />
        <span className="relative z-10">{children}</span>
      </span>
    </span>
  );
}

export default function AcademyAudienceSection() {
  return (
    <section className="px-6 py-10 sm:px-10 sm:py-12 lg:px-16 lg:py-14">
      <div className="mx-auto w-full max-w-[1120px]">
        <div className="mx-auto max-w-[820px] text-center">
          <div className="inline-flex rounded-full border border-[#E5D2F2] bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8E68A4] shadow-[0_10px_24px_rgba(111,58,129,0.08)]">
            A quem se destina
          </div>

          <h2 className="mt-6 text-[34px] font-semibold leading-[1.02] text-[#241A2A] sm:text-[48px] lg:text-[60px]">
            Um espaço pensado para quem quer crescer com consciência.
          </h2>

          <p className="mx-auto mt-5 max-w-[720px] text-[16px] leading-[1.75] text-[#5F5F68] sm:text-[17px]">
            A Academia foi desenhada para diferentes perfis, momentos e níveis
            de responsabilidade, sempre com foco em evolução humana,
            estratégica e profissional.
          </p>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-4 sm:gap-5 lg:mt-16">
          {audienceItems.map((item) => (
            <AudiencePill key={item}>{item}</AudiencePill>
          ))}
        </div>
      </div>
    </section>
  );
}