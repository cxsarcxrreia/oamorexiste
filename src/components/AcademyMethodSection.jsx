import React, { useState } from "react";

const methodPoints = [
  {
    id: 1,
    title: "Clareza, Resiliência e Visão",
    description:
      "Navegar o futuro com mais clareza, resiliência e visão estratégica.",
  },
  {
    id: 2,
    title: "Liderança com Impacto",
    description:
      "Alinhar o crescimento pessoal com uma liderança mais consciente e transformadora.",
  },
  {
    id: 3,
    title: "Decisões Éticas",
    description:
      "Tomar decisões éticas e sustentáveis com maior segurança e coerência.",
  },
  {
    id: 4,
    title: "Comunicação com Presença",
    description:
      "Comunicar com verdade, presença e intenção em cada contexto.",
  },
  {
    id: 5,
    title: "Propósito e Expansão",
    description:
      "Criar projetos com propósito, direção e potencial de expansão global.",
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

function MethodIconPlaceholder({ rotation }) {
  return (
    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border border-[#E5D2F2] bg-white shadow-[0_10px_24px_rgba(111,58,129,0.10)]">
      <PlusIcon rotation={rotation} />
    </div>
  );
}

function TimelineCard({ item }) {
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
      className="group relative z-10 flex h-full w-full flex-col rounded-[22px] border border-[#EADBF5] bg-white p-4 text-left shadow-[0_14px_40px_rgba(110,30,140,0.08)] transition duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_20px_48px_rgba(110,30,140,0.12)] sm:p-5"
    >
      <div className="flex items-start gap-3">
        <MethodIconPlaceholder rotation={rotation} />

        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#A38AAE]">
            Etapa {item.id}
          </p>

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
            {item.description}
          </p>
        </div>
      </div>
    </button>
  );
}

export default function AcademyMethodSection() {
  return (
    <section
      id="metodo"
      className="scroll-mt-28 px-6 py-10 sm:px-10 sm:py-12 lg:px-16 lg:py-14"
    >
      <div className="mx-auto w-full max-w-[1240px]">
        <div className="mx-auto max-w-[820px] text-center">
          <div className="inline-flex rounded-full border border-[#E5D2F2] bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8E68A4] shadow-[0_10px_24px_rgba(111,58,129,0.08)]">
            O Método Exclusivo
          </div>

          <h2 className="mt-6 text-[34px] font-semibold leading-[1.02] text-[#241A2A] sm:text-[48px] lg:text-[60px]">
            Um método que transforma intenção em direção.
          </h2>

          <p className="mx-auto mt-5 max-w-[720px] text-[16px] leading-[1.75] text-[#5F5F68] sm:text-[18px]">
            Criado para formar líderes e empreendedores conscientes, o método
            #oamorexiste une estratégia, bem estar holístico e desenvolvimento
            de mindset numa experiência prática, coerente e profundamente
            humanizada.
          </p>
        </div>

        <div className="relative mt-14 lg:mt-16">
          <div className="pointer-events-none absolute bottom-0 left-[21px] top-0 w-[2px] bg-gradient-to-b from-[#ffb6f9] via-[#d98cff] to-[#8ee7ff] md:hidden" />

          <div className="pointer-events-none absolute left-0 right-0 top-[34px] hidden h-[2px] bg-gradient-to-r from-[#ffb6f9] via-[#d98cff] to-[#8ee7ff] md:block" />

          <div className="grid gap-5 md:grid-cols-5 md:gap-4 xl:gap-5">
            {methodPoints.map((item) => (
              <div key={item.id} className="relative pl-12 md:pl-0">
                <span className="pointer-events-none absolute left-[13px] top-5 z-20 h-4 w-4 rounded-full border border-white/70 bg-gradient-to-r from-[#ffb6f9] via-[#d98cff] to-[#8ee7ff] shadow-[0_0_0_6px_rgba(255,255,255,0.95)] md:left-1/2 md:top-[27px] md:-translate-x-1/2" />

                <div className="md:pt-16">
                  <TimelineCard item={item} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
