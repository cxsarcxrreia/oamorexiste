import React from "react";

const logisticsItems = [
  {
    id: 1,
    label: "Plataforma",
    title: "Google Meet",
    description:
      "Todas as sessões decorrem online, com acesso simples, direto e confortável a partir de qualquer lugar.",
  },
  {
    id: 2,
    label: "Formato",
    title: "Mentoria Online",
    description:
      "Um acompanhamento pensado para funcionar com clareza, presença e flexibilidade, sem perder profundidade.",
  },
  {
    id: 3,
    label: "Extras",
    title: "TPC e dinâmicas mensais",
    description:
      "Ao longo do processo podem existir exercícios, propostas práticas e dinâmicas complementares para aprofundar a transformação.",
  },
];

function LogisticsCard({ item }) {
  return (
    <div className="rounded-[22px] border border-white/60 bg-white/30 p-5 backdrop-blur-md shadow-[0_10px_24px_rgba(111,58,129,0.08)]">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A38AAE]">
        {item.label}
      </p>

      <h3 className="mt-3 text-[22px] font-medium leading-[1.08] text-[#241A2A]">
        {item.title}
      </h3>

      <p className="mt-4 text-[13px] font-medium leading-[1.8] tracking-[0.02em] text-[#5F5F68]">
        {item.description}
      </p>
    </div>
  );
}

export default function MentorshipLogisticsSection() {
  return (
    <section className="px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto w-full max-w-[1120px]">
        <div className="mx-auto max-w-[760px] text-center">
          <div className="inline-flex rounded-full border border-[#E5D2F2] bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8E68A4] shadow-[0_10px_24px_rgba(111,58,129,0.08)]">
            Logística
          </div>

          <h2 className="mt-6 text-[34px] font-semibold leading-[1.02] tracking-[-0.03em] text-[#241A2A] sm:text-[48px] lg:text-[60px]">
            Tudo preparado para uma experiência simples e consistente.
          </h2>

          <p className="mx-auto mt-5 max-w-[680px] text-[16px] leading-[1.75] text-[#5F5F68] sm:text-[17px]">
            Um enquadramento claro para que a tua energia esteja focada no
            processo e não na logística.
          </p>
        </div>

        <div className="relative mt-14 overflow-hidden rounded-[30px] border border-[#F0DDF5] bg-[#FFF6FB]/70 p-6 shadow-[0_18px_45px_rgba(110,30,140,0.10)] backdrop-blur-md sm:p-8 lg:mt-16 lg:p-10">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[8%] top-[10%] h-[140px] w-[140px] rounded-full bg-[#FFD8EE] opacity-35 blur-3xl" />
            <div className="absolute right-[10%] bottom-[12%] h-[150px] w-[150px] rounded-full bg-[#EAD6FF] opacity-35 blur-3xl" />
          </div>

          <div className="relative grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
            {logisticsItems.map((item) => (
              <LogisticsCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}