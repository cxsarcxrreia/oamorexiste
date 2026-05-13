import React from "react";
import {
  User,
  FileText,
  Calendar,
  CreditCard,
  CheckCircle,
} from "lucide-react";
import googleMeetLogo from "../assets/Home/google-meets-logo.png";
import calendlyLogo from "../assets/Home/calendly-logo.png";

const bookingSteps = [
  {
    id: 1,
    title: "Selecionar Mentora",
    description: "Escolhe a mentora ou o formato mais alinhado com o teu momento.",
    Icon: User,
  },
  {
    id: 2,
    title: "Inscrição",
    description: "Preenche os dados essenciais de forma simples e rápida.",
    Icon: FileText,
  },
  {
    id: 3,
    title: "Agendamento",
    description: "Marca o horário disponível através do Calendly.",
    Icon: Calendar,
  },
  {
    id: 4,
    title: "Pagamento",
    description: "Conclui o pagamento para garantir a tua sessão.",
    Icon: CreditCard,
  },
  {
    id: 5,
    title: "Confirmação",
    description: "Recebes a confirmação final com os detalhes da marcação.",
    Icon: CheckCircle,
  },
];

function StepNumberPill({ number }) {
  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/55 text-[14px] font-semibold text-[#6F3A81] shadow-[0_10px_24px_rgba(111,58,129,0.10)] backdrop-blur-sm">
      {number}
    </span>
  );
}

function StepCard({ step }) {
  const Icon = step.Icon;

  return (
    <div className="relative flex flex-col items-center text-center">
      <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-[18px] border border-[#E5D2F2] bg-white shadow-[0_12px_28px_rgba(111,58,129,0.10)]">
        <Icon className="h-6 w-6 text-[#D47BFF]" strokeWidth={2} />
      </div>

      <div className="mt-4">
        <StepNumberPill number={step.id} />
      </div>

      <h3 className="mt-4 text-[20px] font-medium leading-[1.15] text-[#252525]">
        {step.title}
      </h3>

      <p className="mt-3 max-w-[220px] text-[14px] leading-[1.7] text-[#666666]">
        {step.description}
      </p>
    </div>
  );
}

export default function BookingFlowSection() {
  return (
    <section className="px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto w-full max-w-[1120px]">
        <div className="mx-auto max-w-[820px] text-center">
          <div className="inline-flex rounded-full border border-[#E5D2F2] bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8E68A4] shadow-[0_10px_24px_rgba(111,58,129,0.08)]">
            Como Marcar
          </div>

          <h2 className="mt-6 text-[34px] font-semibold leading-[1.02] tracking-[-0.03em] text-[#241A2A] sm:text-[48px] lg:text-[60px]">
            Um processo simples, claro e rápido.
          </h2>

          <p className="mx-auto mt-5 max-w-[720px] text-[16px] leading-[1.75] text-[#5F5F68] sm:text-[17px]">
            Cinco passos para passares da intenção à sessão marcada, sem ruído e
            com clareza em cada etapa.
          </p>
        </div>

        {/* Mobile */}
        <div className="relative mx-auto mt-14 max-w-[520px] md:hidden">
          <div className="absolute bottom-8 left-7 top-8 border-l border-dashed border-[#DCC8E7]" />

          <div className="space-y-8">
            {bookingSteps.map((step) => {
              const Icon = step.Icon;

              return (
                <div key={step.id} className="relative flex gap-5">
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-[18px] border border-[#E5D2F2] bg-white shadow-[0_12px_28px_rgba(111,58,129,0.10)]">
                      <Icon className="h-6 w-6 text-[#D47BFF]" strokeWidth={2} />
                    </div>

                    <div className="mt-3">
                      <StepNumberPill number={step.id} />
                    </div>
                  </div>

                  <div className="pt-1">
                    <h3 className="text-[20px] font-medium leading-[1.15] text-[#252525]">
                      {step.title}
                    </h3>

                    <p className="mt-3 max-w-[320px] text-[14px] leading-[1.7] text-[#666666]">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop */}
        <div className="relative mt-16 hidden md:block">
          <div className="absolute left-[10%] right-[10%] top-7 border-t border-dashed border-[#DCC8E7]" />

          <div className="grid grid-cols-5 gap-6">
            {bookingSteps.map((step) => (
              <StepCard key={step.id} step={step} />
            ))}
          </div>
        </div>

        {/* Visual logistics row */}
        <div className="mt-12 lg:mt-14">
          <div className="mx-auto max-w-[760px] rounded-[24px] border border-[#EADBF5] bg-[linear-gradient(180deg,rgba(251,246,255,0.96)_0%,rgba(255,255,255,0.98)_100%)] px-5 py-5 shadow-[0_14px_36px_rgba(111,58,129,0.08)] sm:px-6 sm:py-6">
            <div className="flex flex-col items-center justify-center gap-4 sm:gap-5 md:flex-row md:gap-6">
              <div className="inline-flex items-center gap-3 rounded-full border border-[#E5D2F2] bg-white px-4 py-3 shadow-[0_10px_24px_rgba(111,58,129,0.08)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(111,58,129,0.12)]">
                <img
                  src={calendlyLogo}
                  alt="Calendly"
                  className="h-[34px] w-auto object-contain sm:h-[38px]"
                />
                <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#6F3A81] sm:text-[13px]">
                  Agendamento
                </span>
              </div>
              
              <div className="hidden h-[1px] w-10 bg-gradient-to-r from-[#ffb6f9] via-[#d98cff] to-[#8ee7ff] md:block" />
              <div className="h-8 w-[1px] bg-gradient-to-b from-[#ffb6f9] via-[#d98cff] to-[#8ee7ff] md:hidden" />
              
              
              <div className="inline-flex items-center gap-3 rounded-full border border-[#E5D2F2] bg-white px-4 py-3 shadow-[0_10px_24px_rgba(111,58,129,0.08)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(111,58,129,0.12)]">
                <img
                  src={googleMeetLogo}
                  alt="Google Meet"
                  className="h-[34px] w-auto object-contain sm:h-[38px]"
                />
                <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#6F3A81] sm:text-[13px]">
                  Sessão Online
                </span>
              </div>

              

              
            </div>

            <p className="mt-4 text-center text-[12px] leading-[1.7] text-[#7B7482] sm:text-[13px]">
              As sessões decorrem via Google Meet e a marcação é feita através do Calendly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
