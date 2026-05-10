import React, { useMemo } from "react";
import { ArrowRight, Calendar, CheckCircle } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import logoSymbol from "../assets/Home/oamorexiste-logo.png";
import {
  bookingMentors,
  bookingPlans,
  buildCalendlyUrl,
  getBookingMentorBySlug,
  getBookingPlanBySlug,
} from "../config/booking";
import {
  buildMentorBookingIntentPayload,
  getStoredBookingIntent,
  notifyMentorOfBookingIntent,
  saveBookingIntent,
} from "../services/bookingIntent";

function SelectionBadge({ children }) {
  return (
    <span className="inline-flex rounded-full border border-[#E5D2F2] bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8E68A4] shadow-[0_10px_24px_rgba(111,58,129,0.08)]">
      {children}
    </span>
  );
}

function PremiumActionButton({ children, disabled, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="group relative inline-flex min-h-[56px] items-center justify-center rounded-full p-[1.5px] shadow-[0_12px_30px_rgba(60,8,59,0.18)] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-65 disabled:hover:scale-100"
    >
      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ffb6f9] via-[#d98cff] to-[#8ee7ff]" />
      <span className="relative inline-flex min-h-[56px] items-center justify-center gap-2 overflow-hidden rounded-full bg-[#2e0d3b] px-8 text-[16px] font-semibold text-white transition group-hover:bg-[#3C083B] group-disabled:bg-[#4B3D52]">
        <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.26)_0%,rgba(255,255,255,0.08)_32%,rgba(255,255,255,0.02)_100%)]" />
        <span className="absolute left-[8%] top-[10%] h-[42%] w-[38%] rounded-full bg-white/12 blur-md" />
        <span className="relative z-10 inline-flex items-center gap-2">
          {children}
        </span>
      </span>
    </button>
  );
}

function MentorOption({ mentor, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(mentor.slug)}
      aria-pressed={selected}
      className={`group relative h-full overflow-hidden rounded-[26px] p-[1.5px] text-left transition duration-300 hover:-translate-y-1 ${
        selected
          ? "bg-gradient-to-r from-[#ffb6f9] via-[#d98cff] to-[#8ee7ff] shadow-[0_20px_48px_rgba(110,30,140,0.16)]"
          : "bg-[#EADBF5] shadow-[0_14px_40px_rgba(110,30,140,0.08)]"
      }`}
    >
      <span className="flex h-full flex-col overflow-hidden rounded-[24px] bg-white">
        <span className="relative block overflow-hidden">
          <img
            src={mentor.image}
            alt={mentor.name}
            className={`aspect-[4/3.8] w-full object-cover transition duration-500 group-hover:scale-[1.03] ${
              mentor.imageClassName || ""
            }`}
          />

          {selected && (
            <span className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#6F3A81] shadow-[0_12px_28px_rgba(60,8,59,0.18)]">
              <CheckCircle className="h-5 w-5" strokeWidth={2.2} />
            </span>
          )}
        </span>

        <span className="flex flex-1 flex-col px-5 py-5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#A38AAE]">
            Mentora
          </span>

          <span className="mt-3 text-[28px] font-medium leading-[1.02] text-[#222222]">
            {mentor.name}
          </span>

          <span className="mt-3 text-[14px] leading-[1.65] text-[#5F5F68]">
            {mentor.category}
          </span>
        </span>
      </span>
    </button>
  );
}

function PlanOption({ plan, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(plan.slug)}
      aria-pressed={selected}
      className={`group relative h-full rounded-[26px] p-[1.5px] text-left transition duration-300 hover:-translate-y-1 ${
        selected || plan.featured
          ? "bg-gradient-to-r from-[#ffb6f9] via-[#d98cff] to-[#8ee7ff]"
          : "bg-[#EADBF5]"
      }`}
    >
      <span className="relative flex h-full flex-col overflow-hidden rounded-[24px] bg-white px-5 py-5 shadow-[0_14px_40px_rgba(110,30,140,0.08)]">
        <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.34)_0%,rgba(255,255,255,0.10)_36%,rgba(255,255,255,0.02)_100%)]" />

        <span className="relative z-10 flex items-start justify-between gap-4">
          <span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#A38AAE]">
              {plan.subtitle}
            </span>

            <span className="mt-2 block text-[25px] font-medium leading-[1.04] text-[#252525] sm:text-[28px]">
              {plan.name}
            </span>
          </span>

          {selected && (
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FBF6FF] text-[#6F3A81] shadow-[0_10px_22px_rgba(111,58,129,0.10)]">
              <CheckCircle className="h-5 w-5" strokeWidth={2.2} />
            </span>
          )}
        </span>

        <span className="relative z-10 mt-7 flex items-end justify-between gap-4">
          <span>
            <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#9B8AA5]">
              Duração
            </span>
            <span className="mt-2 block text-[34px] font-semibold leading-none text-[#241A2A]">
              {plan.duration}
            </span>
          </span>

          <span className="text-right">
            <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#9B8AA5]">
              Valor
            </span>
            <span className="mt-2 block bg-gradient-to-r from-[#D47BFF] to-[#ff0080] bg-clip-text text-[30px] font-semibold leading-none text-transparent">
              {plan.price}
            </span>
          </span>
        </span>

        <span className="relative z-10 mt-6 text-[14px] leading-[1.72] text-[#666666]">
          {plan.description}
        </span>
      </span>
    </button>
  );
}

export default function BookMentorPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const storedIntent = useMemo(() => getStoredBookingIntent(), []);
  const selectedMentorSlug =
    searchParams.get("mentor") || storedIntent?.mentorSlug || "";
  const selectedPlanSlug = searchParams.get("plan") || storedIntent?.planSlug || "";
  const source = searchParams.get("source") || storedIntent?.source || "selecionar-mentora";

  const selectedMentor = getBookingMentorBySlug(selectedMentorSlug);
  const selectedPlan = getBookingPlanBySlug(selectedPlanSlug);
  const calendlyUrl = buildCalendlyUrl({
    mentor: selectedMentor,
    plan: selectedPlan,
    source,
  });

  const updateSelection = (key, value) => {
    const nextParams = new URLSearchParams(searchParams);
    const nextMentorSlug = key === "mentor" ? value : selectedMentorSlug;
    const nextPlanSlug = key === "plan" ? value : selectedPlanSlug;

    if (nextMentorSlug) {
      nextParams.set("mentor", nextMentorSlug);
    } else {
      nextParams.delete("mentor");
    }

    if (nextPlanSlug) {
      nextParams.set("plan", nextPlanSlug);
    } else {
      nextParams.delete("plan");
    }

    nextParams.set("source", source);
    setSearchParams(nextParams, { replace: true });
  };

  const handleContinue = async () => {
    if (!selectedMentor || !selectedPlan) return;

    const payload = buildMentorBookingIntentPayload({
      mentor: selectedMentor,
      plan: selectedPlan,
      source,
    });

    saveBookingIntent(payload);
    await notifyMentorOfBookingIntent(payload);

    if (calendlyUrl) {
      window.location.href = calendlyUrl;
    }
  };

  return (
    <div className="relative bg-[#F4F4F4] pt-14 sm:pt-16 lg:pt-18">
      <Header logoSrc={logoSymbol} />

      <main
        style={{ fontFamily: "Inter, sans-serif" }}
        className="bg-[#F4F4F4] text-[#1F1F1F]"
      >
        <section className="px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
          <div className="mx-auto w-full max-w-[1120px]">
            <div className="mx-auto max-w-[820px] text-center">
              <SelectionBadge>Selecionar Mentora</SelectionBadge>

              <h1 className="mt-6 text-[38px] font-semibold leading-[0.98] tracking-[-0.03em] text-[#241A2A] sm:text-[56px] lg:text-[70px]">
                A mentoria certa começa com a{" "}
                <span className="bg-gradient-to-r from-[#D47BFF] to-[#ff0080] bg-clip-text text-transparent">
                  escolha certa.
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-[720px] text-[16px] leading-[1.75] text-[#5F5F68] sm:text-[18px]">
                Diz-nos quem queres ter ao teu lado e que tipo de apoio procuras.
                Depois escolhes o horário no Calendly e a tua mentora recebe o
                contexto para preparar uma sessão mais alinhada contigo.
              </p>
            </div>

            <section className="mt-16">
              <div className="flex items-end justify-between gap-5">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A38AAE]">
                    Passo 1
                  </p>
                  <h2 className="mt-2 text-[30px] font-semibold leading-[1.05] text-[#241A2A] sm:text-[42px]">
                    Escolhe a mentora
                  </h2>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                {bookingMentors.map((mentor) => (
                  <MentorOption
                    key={mentor.slug}
                    mentor={mentor}
                    selected={selectedMentorSlug === mentor.slug}
                    onSelect={(slug) => updateSelection("mentor", slug)}
                  />
                ))}
              </div>
            </section>

            <section className="mt-16">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A38AAE]">
                  Passo 2
                </p>
                <h2 className="mt-2 text-[30px] font-semibold leading-[1.05] text-[#241A2A] sm:text-[42px]">
                  Escolhe o formato
                </h2>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {bookingPlans.map((plan) => (
                  <PlanOption
                    key={plan.slug}
                    plan={plan}
                    selected={selectedPlanSlug === plan.slug}
                    onSelect={(slug) => updateSelection("plan", slug)}
                  />
                ))}
              </div>
            </section>

            <section className="mt-16 overflow-hidden rounded-[28px] border border-[#EADBF5] bg-white px-6 py-8 shadow-[0_16px_40px_rgba(110,30,140,0.08)] sm:px-8 sm:py-10 lg:flex lg:items-center lg:justify-between lg:px-10">
              <div className="max-w-[680px]">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#DFC6F0] bg-[#FBF6FF] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6F3A81]">
                  <Calendar className="h-4 w-4" strokeWidth={2} />
                  Passo 3
                </div>

                <h2 className="mt-4 text-[30px] font-semibold leading-[1.05] text-[#2A2A2A] sm:text-[42px]">
                  Continuar para o Calendly
                </h2>

                <p className="mt-4 text-[15px] leading-[1.7] text-[#5F5F5F] sm:text-[16px]">
                  {selectedMentor && selectedPlan
                    ? `${selectedMentor.name} vai receber a intenção: ${selectedPlan.name}.`
                    : "Seleciona uma mentora e um formato para ativar o agendamento."}
                </p>

                {selectedMentor && !selectedMentor.calendlyUrl && (
                  <p className="mt-3 text-[13px] font-semibold text-[#8A4B63]">
                    Calendly por configurar para esta mentora.
                  </p>
                )}
              </div>

              <div className="mt-7 lg:mt-0 lg:pl-8">
                <PremiumActionButton
                  onClick={handleContinue}
                  disabled={!selectedMentor || !selectedPlan || !calendlyUrl}
                >
                  Continuar
                  <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                </PremiumActionButton>
              </div>
            </section>
          </div>
        </section>
      </main>

      <Footer logoSrc={logoSymbol} />
    </div>
  );
}
