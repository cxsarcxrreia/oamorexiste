import React, { useMemo, useState } from "react";

const mentoringAreas = [
  {
    id: 1,
    title: "Liderança Humanizada",
    eyebrow: "Área de Mentoria",
    summary:
      "Desenvolvimento de liderança centrada nas pessoas, comunicação consciente, gestão emocional e decisões éticas para ambientes de trabalho mais saudáveis e produtivos.",
    accent: "Destaque",
    featured: true,
  },
  {
    id: 2,
    title: "Internacionalização",
    eyebrow: "Área de Mentoria",
    summary:
      "Apoio à expansão de projetos, carreiras e negócios para novos mercados com visão estratégica, adaptação cultural e presença global.",
    accent: "Expansão",
  },
  {
    id: 3,
    title: "Estratégia Integrada",
    eyebrow: "Área de Mentoria",
    summary:
      "Construção de visão, objetivos, planos de ação e processos que alinham pessoas, recursos e propósito para crescer com direção e estrutura.",
    accent: "Direção",
  },
  {
    id: 4,
    title: "Mentoria Administrativa e Financeira",
    eyebrow: "Área de Mentoria",
    summary:
      "Organização interna, gestão financeira, processos administrativos e decisões baseadas em dados para trazer estabilidade e clareza operacional.",
    accent: "Estrutura",
  },
  {
    id: 5,
    title: "Comunicação e Posicionamento",
    eyebrow: "Área de Mentoria",
    summary:
      "Trabalho de identidade, narrativa, presença digital e comunicação assertiva para comunicar com verdade, consistência e impacto.",
    accent: "Presença",
  },
  {
    id: 6,
    title: "Desenvolvimento de Talentos",
    eyebrow: "Área de Mentoria",
    summary:
      "Identificação de competências, desbloqueio de potencial e evolução pessoal e profissional alinhada com a essência de cada pessoa.",
    accent: "Potencial",
  },
  {
    id: 7,
    title: "Empreendedorismo e Start-ups",
    eyebrow: "Área de Mentoria",
    summary:
      "Acompanhamento para criar, lançar ou escalar negócios com estruturação de ideias, validação, estratégia, operação e crescimento.",
    accent: "Criação",
  },
];

function PlusIcon({ rotation = 0 }) {
  return (
    <div
      className="relative h-5 w-5 transition-transform duration-500 ease-in-out"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <span className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#D47BFF] to-[#ff0080]" />
      <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rounded-full bg-gradient-to-r from-[#D47BFF] to-[#ff0080]" />
    </div>
  );
}

function MethodStyleIcon({ rotation }) {
  return (
    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border border-[#E5D2F2] bg-white shadow-[0_10px_24px_rgba(111,58,129,0.10)]">
      <PlusIcon rotation={rotation} />
    </div>
  );
}

function MentoringAreaCard({ item }) {
  const [isOpen, setIsOpen] = useState(false);
  const [rotation, setRotation] = useState(0);

  const handleToggle = () => {
    setRotation((prev) => prev + (isOpen ? -360 : 360));
    setIsOpen((prev) => !prev);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-expanded={isOpen}
      className={`group mb-5 inline-block w-full break-inside-avoid rounded-[22px] border border-[#EADBF5] bg-white p-4 text-left shadow-[0_14px_40px_rgba(110,30,140,0.08)] transition duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_20px_48px_rgba(110,30,140,0.12)] sm:p-5 ${
        item.featured ? "md:col-span-2 xl:col-span-2" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border border-[#E5D2F2] bg-white shadow-[0_10px_24px_rgba(111,58,129,0.10)]">
          <PlusIcon rotation={rotation} />
        </div>

         <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
           {/* <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#A38AAE]">
              {item.eyebrow}
            </p>
          */}
            <span className="inline-flex rounded-full border border-[#EADBF5] bg-[#FBF7FE] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8E68A4]">
              {item.accent}
            </span>
          </div>

          <h3 className="mt-2 text-[18px] font-medium leading-[1.12] text-[#252525] sm:text-[19px]">
            {item.title}
          </h3>
        </div>
      </div>

      <div
        className={`grid transition-all duration-500 ease-in-out ${
          isOpen ? "mt-4 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-[14px] leading-[1.65] text-[#666666]">
            {item.summary}
          </p>
        </div>
      </div>
    </button>
  );
}

export default function AcademyMentoringAreasSection() {
  const [showAllMobile, setShowAllMobile] = useState(false);

  const mobileVisibleAreas = useMemo(() => {
    return showAllMobile ? mentoringAreas : mentoringAreas.slice(0, 3);
  }, [showAllMobile]);

  return (
    <section className="px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto w-full max-w-[1120px]">
        <div className="mx-auto max-w-[820px] text-center">
          <div className="inline-flex rounded-full border border-[#E5D2F2] bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8E68A4] shadow-[0_10px_24px_rgba(111,58,129,0.08)]">
            Áreas de Mentoria
          </div>

          <h2 className="mt-6 text-[34px] font-semibold leading-[1.02] text-[#241A2A] sm:text-[48px] lg:text-[60px]">
            Sete áreas para crescer com direção e impacto.
          </h2>

          <p className="mx-auto mt-5 max-w-[720px] text-[16px] leading-[1.75] text-[#5F5F68] sm:text-[18px]">
            Da liderança à estrutura financeira, da comunicação ao crescimento internacional, a Academia organiza a mentoria em áreas complementares para apoiar pessoas, equipas e negócios em diferentes fases.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:hidden">
          {mobileVisibleAreas.map((item) => (
            <MentoringAreaCard key={item.id} item={item} />
          ))}

          <div className="flex justify-center pt-2">
            <button
              type="button"
              onClick={() => setShowAllMobile((prev) => !prev)}
              className="inline-flex items-center justify-center rounded-full border border-[#E5D2F2] bg-white px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#8E68A4] shadow-[0_10px_24px_rgba(111,58,129,0.08)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(111,58,129,0.12)]"
            >
              {showAllMobile ? "Ver Menos" : "Ver Mais"}
            </button>
          </div>
        </div>

        <div className="mt-14 hidden md:block md:columns-2 md:gap-4 xl:columns-3 xl:gap-5">
          {mentoringAreas.map((item) => (
            <MentoringAreaCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}