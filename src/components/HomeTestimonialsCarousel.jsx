import React, { useState } from "react";

function StarRow() {
  return (
    <div className="flex items-center gap-1 text-[#D47BFF]">
      <span>★</span>
      <span>★</span>
      <span>★</span>
      <span>★</span>
      <span>★</span>
    </div>
  );
}

function ArrowButton({ direction = "right", onClick }) {
  const isLeft = direction === "left";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isLeft ? "Ver testemunho anterior" : "Ver próximo testemunho"}
      className="group inline-flex h-12 w-12 shrink-0 items-center justify-center self-center rounded-full border border-[#E5D2F2] bg-white text-[#6F3A81] shadow-[0_12px_28px_rgba(111,58,129,0.10)] transition duration-300 hover:scale-[1.04] hover:border-[#D6B0EC] hover:bg-[#FBF6FF]"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        {isLeft ? (
          <>
            <path d="M19 12H5" />
            <path d="M11 18l-6-6 6-6" />
          </>
        ) : (
          <>
            <path d="M5 12h14" />
            <path d="M13 18l6-6-6-6" />
          </>
        )}
      </svg>
    </button>
  );
}

function ClampText({ children, lines, className = "" }) {
  return (
    <p
      className={className}
      style={{
        display: "-webkit-box",
        WebkitLineClamp: lines,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      }}
    >
      {children}
    </p>
  );
}

function TestimonialCard({ item, variant = "center", onClick }) {
  const isCenter = variant === "center";
  const isSide = variant === "side";

  return (
    <article
      onClick={onClick}
      className={`flex !h-[450px] flex-col rounded-[24px] border p-5 text-left transition duration-300 sm:h-[390px] sm:p-6 lg:h-[420px] ${
        isCenter
          ? "border-[#EADBF5] bg-white shadow-[0_18px_42px_rgba(110,30,140,0.10)] hover:scale-[1.02] hover:shadow-[0_24px_52px_rgba(110,30,140,0.14)]"
          : "scale-[0.94] border-[#E6D9EF] bg-[#F1E8F7] opacity-90 shadow-[0_10px_24px_rgba(110,30,140,0.06)] hover:scale-[0.98] hover:opacity-100 hover:shadow-[0_18px_38px_rgba(110,30,140,0.10)]"
      } ${isSide ? "cursor-pointer" : ""}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className={`inline-flex max-w-[70%] rounded-full px-3 py-1.5 text-[11px] font-semibold leading-none ${
            isCenter
              ? "border border-[#DFC6F0] bg-[#FBF6FF] text-[#6F3A81] shadow-[0_10px_22px_rgba(111,58,129,0.08)]"
              : "border border-[#DCCAE8] bg-white/70 text-[#7A5B89]"
          }`}
        >
          <span className="truncate">{item.mentor}</span>
        </div>

        <StarRow />
      </div>

      <ClampText
        lines={isCenter ? 3 : 2}
        className={`mt-5 leading-[1.18] ${
          isCenter
            ? "text-[24px] font-medium text-[#252525] sm:text-[26px]"
            : "text-[18px] font-medium text-[#353535] sm:text-[20px]"
        }`}
      >
        “{item.quote}”
      </ClampText>

      <ClampText
        lines={isCenter ? 7 : 5}
        className={`mt-4 ${
          isCenter
            ? "text-[14px] leading-[1.7] text-[#626262]"
            : "text-[13px] leading-[1.65] text-[#716C74]"
        }`}
      >
        {item.body}
      </ClampText>

      <div className="mt-auto border-t border-[#EADFF1] pt-4">
        <p
          className={`font-semibold ${
            isCenter ? "text-[15px] text-[#2A2A2A]" : "text-[14px] text-[#3B3B3B]"
          }`}
        >
          {item.author}
        </p>

        <p
          className={`mt-1 uppercase tracking-[0.12em] ${
            isCenter
              ? "text-[11px] font-medium text-[#9B8AA5]"
              : "text-[10px] font-medium text-[#A596AE]"
          }`}
        >
          {item.role}
        </p>
      </div>
    </article>
  );
}

export default function HomeTestimonialsCarousel({ testimonials = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!testimonials.length) return null;

  const total = testimonials.length;
  const prevIndex = (currentIndex - 1 + total) % total;
  const nextIndex = (currentIndex + 1) % total;

  const goPrev = () => setCurrentIndex((prev) => (prev - 1 + total) % total);
  const goNext = () => setCurrentIndex((prev) => (prev + 1) % total);

  return (
    <div className="mt-14 lg:mt-16">
      <div className="flex items-center gap-3 lg:gap-5">
        <ArrowButton direction="left" onClick={goPrev} />

        <div className="min-w-0 flex-1">
          {/* Mobile */}
          <div className="md:hidden">
            <TestimonialCard item={testimonials[currentIndex]} variant="center" />
          </div>

          {/* Desktop */}
          <div className="hidden items-center gap-4 md:grid md:grid-cols-[0.86fr_1.15fr_0.86fr] lg:gap-6">
            <TestimonialCard
              item={testimonials[prevIndex]}
              variant="side"
              onClick={goPrev}
            />
            <TestimonialCard
              item={testimonials[currentIndex]}
              variant="center"
            />
            <TestimonialCard
              item={testimonials[nextIndex]}
              variant="side"
              onClick={goNext}
            />
          </div>
        </div>

        <ArrowButton direction="right" onClick={goNext} />
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Ir para testemunho ${index + 1}`}
            onClick={() => setCurrentIndex(index)}
            className={`h-2.5 rounded-full transition ${
              index === currentIndex
                ? "w-8 bg-[#D47BFF]"
                : "w-2.5 bg-[#DCC8E7] hover:bg-[#CFA7E8]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}