import React from "react";

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="M13 5l7 7-7 7" />
    </svg>
  );
}

export default function MenteeCard({ person }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-[#EADBF5] bg-white shadow-[0_14px_40px_rgba(110,30,140,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(110,30,140,0.12)]">
      <div className="relative overflow-hidden">
        <img
          src={person.image}
          alt={person.name}
          className={`aspect-[4/4.8] w-full object-cover transition duration-500 ${
            person.imageClassName || "group-hover:scale-[1.02]"
          }`}
        />

        <div className="absolute left-4 top-4 rounded-full border border-white/65 bg-white/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">
          Mentoria
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-5 sm:px-6 sm:pb-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#A38AAE]">
          {person.category}
        </p>

        <h2 className="mt-3 text-[28px] font-medium leading-[1.02] text-[#222222] sm:text-[32px]">
          {person.name}
        </h2>

        <p className="mt-4 text-[15px] leading-[1.65] text-[#4A4A4A]">
          {person.intro}
        </p>

        <p className="mt-3 text-[14px] leading-[1.65] text-[#676767]">
          {person.summary}
        </p>

        <div className="mt-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9B8AA5]">
            Focos principais
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {person.specialties.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#DFC6F0] bg-[#FBF6FF] px-3 py-1.5 text-[12px] font-medium leading-none text-[#6F3A81]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9B8AA5]">
            Formação certificada
          </p>

          <ul className="mt-3 space-y-2">
            {person.certifications.map((item) => (
              <li key={item} className="flex items-start gap-2 text-[13px] leading-[1.55] text-[#4A4A4A]">
                <span className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-[#D47BFF]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 border-t border-[#F0E6F7] pt-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9B8AA5]">
            Experiência transversal
          </p>

          <p className="mt-3 text-[14px] leading-[1.65] text-[#565656]">
            {person.experience}
          </p>
        </div>

        {person.socials?.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3">
            {person.socials.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="text-[13px] font-semibold text-[#6F3A81] transition hover:text-[#3C083B]"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}

        <div className="mt-auto pt-7">
          <a
            href="/#marcar-sessao"
            className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[#3C083B] px-5 text-[13px] font-semibold text-white transition hover:opacity-95"
          >
            Marcar sessão
            <ArrowIcon />
          </a>
        </div>
      </div>
    </article>
  );
}
