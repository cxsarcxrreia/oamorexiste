import React from "react";

const mentorshipTiers = [
  {
    id: 1,
    name: "One-to-One",
    subtitle: "Sessão individual",
    duration: "1h",
    price: "60€",
    description:
      "Um formato direto e focado para trabalhar clareza, direção e próximos passos com acompanhamento individual.",
    cta: "Escolher sessão",
    featured: false,
  },
  {
    id: 2,
    name: "Estratégica One-to-One",
    subtitle: "Sessão premium",
    duration: "1h30",
    price: "70€",
    description:
      "Uma sessão mais profunda para desbloquear decisões, alinhar estratégia e trabalhar desafios com maior profundidade.",
    cta: "Escolher sessão",
    featured: true,
  },
  {
    id: 3,
    name: "Grupo",
    subtitle: "Sessão coletiva",
    duration: "2h",
    price: "Sob Orçamento",
    description:
      "Formato pensado para equipas, grupos e contextos colaborativos que pedem alinhamento, facilitação e visão partilhada.",
    cta: "Pedir proposta",
    featured: false,
  },
];

function TierCard({ item }) {
  const inner = (
    <div
      className={`relative h-full overflow-hidden rounded-[26px] px-6 pb-6 pt-6 shadow-[0_18px_45px_rgba(110,30,140,0.16)] transition duration-300 hover:-translate-y-2 ${
        item.featured ? "bg-white" : "bg-white"
      }`}
    >
      {item.featured && (
        <>
          <span className="pointer-events-none absolute inset-0 rounded-[26px] bg-[linear-gradient(180deg,rgba(255,255,255,0.34)_0%,rgba(255,255,255,0.12)_34%,rgba(255,255,255,0.02)_100%)]" />
          <span className="pointer-events-none absolute left-[10%] top-[10%] h-[34%] w-[34%] rounded-full bg-white/20 blur-2xl" />
        </>
      )}

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#A38AAE]">
              {item.subtitle}
            </p>

            <h3 className="mt-2 text-[28px] font-medium leading-[1.02] text-[#252525] sm:text-[32px]">
              {item.name}
            </h3>
          </div>

          {item.featured && (
            <span className="inline-flex rounded-full border border-[#DFC6F0] bg-[#FBF6FF] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6F3A81] shadow-[0_10px_22px_rgba(111,58,129,0.08)]">
              Premium
            </span>
          )}
        </div>

        <div className="mt-8 flex items-end justify-between gap-5">
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-[#9B8AA5]">
              Duração
            </p>
            <p className="mt-2 text-[42px] font-semibold leading-none text-[#241A2A] sm:text-[48px]">
              {item.duration}
            </p>
          </div>

          <div className="text-right">
            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-[#9B8AA5]">
              Valor
            </p>
            <p className="mt-2 text-[34px] font-semibold leading-none bg-gradient-to-r from-[#D47BFF] to-[#ff0080] bg-clip-text text-transparent sm:text-[40px]">
              {item.price}
            </p>
          </div>
        </div>

        <p className="mt-8 text-[14px] leading-[1.72] text-[#666666]">
          {item.description}
        </p>

        <div className="mt-auto pt-8">
          <a
            href="/#marcar-sessao"
            className={`inline-flex min-h-[48px] items-center justify-center rounded-full px-5 text-[14px] font-semibold transition ${
              item.featured
                ? "bg-[#2E0D3B] text-white shadow-[0_12px_30px_rgba(60,8,59,0.22)] hover:opacity-95"
                : "border border-[#DFC6F0] bg-[#FBF6FF] text-[#6F3A81] shadow-[0_10px_22px_rgba(111,58,129,0.08)] hover:bg-white"
            }`}
          >
            {item.cta}
          </a>
        </div>
      </div>
    </div>
  );

  if (item.featured) {
    return (
      <article className="group h-full rounded-[28px] p-[1.5px]">
        <div className="absolute" />
        <div className="relative h-full rounded-[28px] bg-gradient-to-r from-[#ffb6f9] via-[#d98cff] to-[#8ee7ff] p-[1.5px]">
          {inner}
        </div>
      </article>
    );
  }

  return <article className="group h-full rounded-[28px]">{inner}</article>;
}

export default function MentorshipTiersSection() {
  return (
    <section className="px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto w-full max-w-[1120px]">
        <div className="mx-auto max-w-[820px] text-center">
          <div className="inline-flex rounded-full border border-[#E5D2F2] bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8E68A4] shadow-[0_10px_24px_rgba(111,58,129,0.08)]">
            Escolhe a tua mentoria
          </div>

          <h2 className="mt-6 text-[34px] font-semibold  leading-[0.98] tracking-[-0.03em] text-[#241A2A] sm:text-[48px] lg:text-[60px]">
            Escolhe o formato certo para {" "}
                <span className="bg-gradient-to-r from-[#D47BFF] to-[#ff0080] bg-clip-text text-transparent">
                    o teu momento.
                </span>
          </h2>

          <p className="mx-auto mt-5 max-w-[720px] text-[16px] leading-[1.75] text-[#5F5F68] sm:text-[17px]">
            Três formatos de mentoria para diferentes níveis de profundidade,
            contexto e acompanhamento.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 lg:mt-16">
          {mentorshipTiers.map((item) => (
            <TierCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}