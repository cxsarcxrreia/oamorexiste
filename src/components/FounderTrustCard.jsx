import React, { useState } from "react";

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

function ExpandableBadge({ shortLabel, longLabel }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="inline-flex min-h-[38px] items-center rounded-full border border-[#DFC6F0] bg-[#FBF6FF] px-4 py-2 text-[12px] font-bold leading-[1.25] text-[#6F3A81] shadow-[0_10px_24px_rgba(111,58,129,0.10)] transition-all duration-300 ease-out">
        {shortLabel}
      </span>

      <span
        className={`pointer-events-none absolute left-0 top-full z-20 mt-2 w-[260px] max-w-[min(260px,calc(100vw-48px))] rounded-[16px] border border-[#EADBF5] bg-white px-4 py-3 text-[12px] font-medium leading-[1.5] text-[#5A4564] shadow-[0_14px_30px_rgba(111,58,129,0.14)] transition-all duration-200 ${
          isHovered ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
        }`}
      >
        {longLabel}
      </span>
    </span>
  );
}

export default function FounderTrustCard({
  person,
  ctaLabel = "Saber Mais",
  ctaHref = "/bio",
}) {
  return (
    <article className="rounded-[24px]">
      <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-[360px_1fr] md:gap-8">
        <div className="flex md:items-stretch">
            <div className="w-full p-[6px]">
                <div className="relative w-full rounded-[20px] shadow-[0_18px_45px_rgba(110,30,140,0.16)] transition duration-300">
                <div className="relative w-full overflow-hidden rounded-[24px]">
                    <img
                    src={person.image}
                    alt={person.name}
                    className="h-[420px] w-full scale-[4] object-cover object-[0%_15%] transition duration-500 ease-out hover:scale-[4.1]"
                    />

                    <div className="absolute left-4 top-4 rounded-full border border-white/65 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                    Fundadora
                    </div>
                </div>
                </div>
            </div>
        </div>

        <div className="flex flex-col px-1 pb-2 pt-1 sm:px-2 md:px-0 md:py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#A38AAE]">
            Fundadora
          </p>

          <h2 className="mt-3 text-[30px] font-medium leading-[1.02] text-[#222222] sm:text-[36px]">
            {person.name}
          </h2>

          <p className="mt-3 text-[16px] font-medium leading-[1.55] text-[#4A4A4A]">
            {person.roles}
          </p>

          <p className="mt-4 max-w-[760px] text-[14px] leading-[1.7] text-[#676767]">
            {person.summary}
          </p>

          <div className="mt-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9B8AA5]">
              Reconhecimento
            </p>

            <div className="mt-3 flex flex-wrap gap-2.5">
              {person.credentialBadges?.map((item) => (
                <ExpandableBadge
                  key={item.shortLabel}
                  shortLabel={item.shortLabel}
                  longLabel={item.longLabel}
                />
              ))}
            </div>
          </div>

          <div className="mt-7">
            <a
              href={ctaHref}
              className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[#3C083B] px-5 text-[13px] font-semibold text-white shadow-[0_14px_30px_rgba(60,8,59,0.22)] transition hover:opacity-95"
            >
              {ctaLabel}
              <ArrowIcon />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
