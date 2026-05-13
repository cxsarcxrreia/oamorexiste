import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle,
  Loader2,
  Mail,
} from "lucide-react";
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
  clearStoredBookingIntent,
  getStoredBookingIntent,
  notifyGroupMentorshipRequest,
  notifyMentorOfBookingIntent,
  saveBookingIntent,
} from "../services/bookingIntent";

const MENTOR_STEP_INDEX = 0;
const FORMAT_STEP_INDEX = 1;
const DETAILS_STEP_INDEX = 2;
const CALENDLY_STEP_INDEX = 3;
const CONFIRMATION_STEP_INDEX = 4;

const standardFlowSteps = [
  { id: "mentor", label: "Mentora", stepIndex: MENTOR_STEP_INDEX },
  { id: "format", label: "Formato", stepIndex: FORMAT_STEP_INDEX },
  { id: "details", label: "Dados", stepIndex: DETAILS_STEP_INDEX },
  { id: "calendly", label: "Agenda", stepIndex: CALENDLY_STEP_INDEX },
  {
    id: "confirmation",
    label: "Confirmação",
    stepIndex: CONFIRMATION_STEP_INDEX,
  },
];

const groupFlowSteps = standardFlowSteps.filter(
  (step) => step.stepIndex !== CALENDLY_STEP_INDEX,
);

const CALENDLY_SCRIPT_ID = "calendly-widget-script";
const CALENDLY_LOAD_TIMEOUT_MS = 10000;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function loadCalendlyWidget() {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (window.Calendly) {
    return Promise.resolve();
  }

  const existingScript = document.getElementById(CALENDLY_SCRIPT_ID);

  if (existingScript) {
    return new Promise((resolve, reject) => {
      existingScript.addEventListener("load", resolve, { once: true });
      existingScript.addEventListener("error", reject, { once: true });
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.id = CALENDLY_SCRIPT_ID;
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

function isCalendlyEvent(event) {
  return (
    event.origin === "https://calendly.com" &&
    typeof event.data?.event === "string" &&
    event.data.event.startsWith("calendly.")
  );
}

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

function SecondaryActionButton({ children, disabled, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-[#E1CBEF] bg-white px-6 text-[15px] font-semibold text-[#6F3A81] shadow-[0_10px_24px_rgba(111,58,129,0.08)] transition hover:-translate-y-0.5 hover:bg-[#FBF6FF] disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0"
    >
      {children}
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
  const showDuration = plan.slug !== "grupo";

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
          {showDuration ? (
            <span>
              <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#9B8AA5]">
                Duração
              </span>
              <span className="mt-2 block text-[34px] font-semibold leading-none text-[#241A2A]">
                {plan.duration}
              </span>
            </span>
          ) : (
            <span aria-hidden="true" />
          )}

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

function StepProgress({ currentStep, steps }) {
  const activePosition = Math.max(
    steps.findIndex((step) => step.stepIndex === currentStep),
    0,
  );

  return (
    <div className="mx-auto mt-12 w-full max-w-[920px]">
      <div className="mb-4 text-center text-[12px] font-semibold uppercase tracking-[0.16em] text-[#8E68A4] md:hidden">
        Passo {activePosition + 1} de {steps.length}
      </div>

      <ol className="flex items-center justify-between gap-2 rounded-full border border-[#E5D2F2] bg-white/80 px-3 py-3 shadow-[0_12px_30px_rgba(111,58,129,0.08)] backdrop-blur-sm">
        {steps.map((step, index) => {
          const isActive = step.stepIndex === currentStep;
          const isDone = index < activePosition;

          return (
            <li key={step.id} className="flex min-w-0 flex-1 items-center gap-2">
              <span
                className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold transition ${
                  isActive
                    ? "bg-[#2e0d3b] text-white shadow-[0_10px_24px_rgba(60,8,59,0.18)]"
                    : isDone
                      ? "bg-[#FBF6FF] text-[#6F3A81]"
                      : "bg-[#F4F4F4] text-[#A38AAE]"
                }`}
              >
                {isDone ? <CheckCircle className="h-4 w-4" strokeWidth={2.2} /> : index + 1}
              </span>

              <span
                className={`hidden truncate text-[12px] font-semibold uppercase tracking-[0.12em] md:block ${
                  isActive ? "text-[#241A2A]" : "text-[#9B8AA5]"
                }`}
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function ContactField({ id, label, type = "text", value, onChange, autoComplete }) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#8E68A4]">
        {label}
      </span>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        className="mt-3 min-h-[56px] w-full rounded-[18px] border border-[#DFC6F0] bg-white px-4 text-[16px] text-[#241A2A] shadow-[0_10px_24px_rgba(111,58,129,0.06)] outline-none transition placeholder:text-[#A38AAE] focus:border-[#D47BFF] focus:ring-4 focus:ring-[#EADBF5]"
      />
    </label>
  );
}

function StepHeader({ eyebrow, title, description }) {
  return (
    <div className="mx-auto max-w-[760px] text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A38AAE]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-[32px] font-semibold leading-[1.05] text-[#241A2A] sm:text-[44px]">
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-[640px] text-[15px] leading-[1.75] text-[#5F5F68] sm:text-[16px]">
          {description}
        </p>
      )}
    </div>
  );
}

function FlowActions({ canGoBack, canContinue, continueLabel, onBack, onContinue }) {
  return (
    <div className="mt-10 flex flex-col-reverse items-stretch justify-between gap-4 sm:flex-row sm:items-center">
      <SecondaryActionButton onClick={onBack} disabled={!canGoBack}>
        <ArrowLeft className="h-4 w-4" strokeWidth={2.2} />
        Voltar
      </SecondaryActionButton>

      <PremiumActionButton onClick={onContinue} disabled={!canContinue}>
        {continueLabel}
        <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
      </PremiumActionButton>
    </div>
  );
}

export default function BookMentorPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const storedIntent = useMemo(() => getStoredBookingIntent(), []);
  const mentorParam = searchParams.get("mentor");
  const planParam = searchParams.get("plan");
  const defaultPlanSlug =
    bookingPlans.find((plan) => plan.featured)?.slug || bookingPlans[0]?.slug || "";

  const selectedMentorSlug =
    mentorParam || storedIntent?.mentorSlug || "";
  const selectedPlanSlug =
    planParam || (mentorParam ? defaultPlanSlug : storedIntent?.planSlug || "");
  const source =
    searchParams.get("source") || storedIntent?.source || "selecionar-mentora";

  const selectedMentor = getBookingMentorBySlug(selectedMentorSlug);
  const selectedPlan = getBookingPlanBySlug(selectedPlanSlug);
  const isGroupPlan = selectedPlan?.slug === "grupo";
  const activeFlowSteps = useMemo(
    () => (isGroupPlan ? groupFlowSteps : standardFlowSteps),
    [isGroupPlan],
  );
  const calendlyUrl = buildCalendlyUrl({
    mentor: selectedMentor,
    plan: selectedPlan,
    source,
  });

  const initialStep = useMemo(() => {
    if (mentorParam && !planParam) return FORMAT_STEP_INDEX;
    if (selectedMentor && selectedPlan) return DETAILS_STEP_INDEX;
    if (selectedMentor) return FORMAT_STEP_INDEX;
    return MENTOR_STEP_INDEX;
  }, [mentorParam, planParam, selectedMentor, selectedPlan]);

  const [currentStep, setCurrentStep] = useState(initialStep);
  const [clientName, setClientName] = useState(storedIntent?.clientName || "");
  const [clientEmail, setClientEmail] = useState(storedIntent?.clientEmail || "");
  const [groupContext, setGroupContext] = useState(
    storedIntent?.groupContext || "",
  );
  const [isCalendlyReady, setIsCalendlyReady] = useState(false);
  const [calendlyLoadError, setCalendlyLoadError] = useState("");
  const [notificationStatus, setNotificationStatus] = useState("idle");
  const [notificationError, setNotificationError] = useState("");
  const [scheduledEvent, setScheduledEvent] = useState(null);
  const calendlyContainerRef = useRef(null);
  const notificationSentRef = useRef(false);

  const trimmedClientName = clientName.trim();
  const trimmedClientEmail = clientEmail.trim();
  const trimmedGroupContext = groupContext.trim();
  const isContactValid =
    trimmedClientName.length >= 2 && emailPattern.test(trimmedClientEmail);
  const isGroupContextValid = trimmedGroupContext.length >= 10;

  const canContinue =
    notificationStatus !== "sending" &&
    ((currentStep === MENTOR_STEP_INDEX && Boolean(selectedMentor)) ||
      (currentStep === FORMAT_STEP_INDEX && Boolean(selectedPlan)) ||
      (currentStep === DETAILS_STEP_INDEX &&
        isContactValid &&
        (!isGroupPlan || isGroupContextValid)));

  const continueLabel =
    currentStep === DETAILS_STEP_INDEX
      ? isGroupPlan
        ? notificationStatus === "sending"
          ? "A enviar..."
          : "Enviar pedido"
        : "Abrir agenda"
      : "Continuar";

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
    setNotificationStatus("idle");
    setNotificationError("");
    setScheduledEvent(null);
    notificationSentRef.current = false;
  };

  const buildNotificationPayload = useCallback(
    (calendlyData = {}) =>
      buildMentorBookingIntentPayload({
        mentor: selectedMentor,
        plan: selectedPlan,
        client: {
          name: trimmedClientName,
          email: trimmedClientEmail,
        },
        calendly: calendlyData,
        source,
      }),
    [
      selectedMentor,
      selectedPlan,
      source,
      trimmedClientEmail,
      trimmedClientName,
    ],
  );

  const submitBookingNotification = useCallback(
    async (calendlyData = scheduledEvent || {}) => {
      if (!selectedMentor || !selectedPlan || !isContactValid) return;

      notificationSentRef.current = true;
      setNotificationStatus("sending");
      setNotificationError("");

      const payload = buildNotificationPayload(calendlyData);
      saveBookingIntent(payload);

      try {
        await notifyMentorOfBookingIntent(payload);
        setNotificationStatus("sent");
        setCurrentStep(CONFIRMATION_STEP_INDEX);
      } catch (error) {
        notificationSentRef.current = false;
        setNotificationStatus("error");
        setNotificationError(
          error instanceof Error
            ? error.message
            : "Não foi possível enviar os emails de confirmação.",
        );
      }
    },
    [
      buildNotificationPayload,
      isContactValid,
      scheduledEvent,
      selectedMentor,
      selectedPlan,
    ],
  );

  const submitGroupMentorshipRequest = useCallback(async () => {
    if (
      !selectedMentor ||
      !selectedPlan ||
      !isContactValid ||
      !isGroupContextValid
    ) {
      return;
    }

    notificationSentRef.current = true;
    setNotificationStatus("sending");
    setNotificationError("");

    const payload = {
      mentorSlug: selectedMentor.slug,
      mentorName: selectedMentor.name,
      mentorEmail: selectedMentor.email,
      planSlug: selectedPlan.slug,
      planName: selectedPlan.name,
      planDuration: selectedPlan.duration,
      planPrice: selectedPlan.price,
      clientName: trimmedClientName,
      clientEmail: trimmedClientEmail,
      groupContext: trimmedGroupContext,
      source,
      createdAt: new Date().toISOString(),
    };

    saveBookingIntent(payload);

    try {
      await notifyGroupMentorshipRequest(payload);
      setNotificationStatus("sent");
      setCurrentStep(CONFIRMATION_STEP_INDEX);
    } catch (error) {
      notificationSentRef.current = false;
      setNotificationStatus("error");
      setNotificationError(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar o pedido de grupo.",
      );
    }
  }, [
    isContactValid,
    isGroupContextValid,
    selectedMentor,
    selectedPlan,
    source,
    trimmedClientEmail,
    trimmedClientName,
    trimmedGroupContext,
  ]);

  useEffect(() => {
    if (currentStep !== CALENDLY_STEP_INDEX || !calendlyUrl) return undefined;

    let cancelled = false;
    const parentElement = calendlyContainerRef.current;

    if (!parentElement) return undefined;

    parentElement.innerHTML = "";

    const loadTimeout = window.setTimeout(() => {
      if (cancelled || window.Calendly) return;
      setCalendlyLoadError(
        "O Calendly está a demorar a aparecer neste navegador.",
      );
    }, CALENDLY_LOAD_TIMEOUT_MS);

    loadCalendlyWidget()
      .then(() => {
        if (cancelled || !window.Calendly) return;

        window.clearTimeout(loadTimeout);
        parentElement.innerHTML = "";
        window.Calendly.initInlineWidget({
          url: calendlyUrl,
          parentElement,
          prefill: {
            name: trimmedClientName,
            email: trimmedClientEmail,
          },
          resize: true,
        });
        setIsCalendlyReady(true);
      })
      .catch(() => {
        if (cancelled) return;
        window.clearTimeout(loadTimeout);
        setCalendlyLoadError(
          "Não foi possível carregar o Calendly neste navegador.",
        );
        setNotificationStatus("error");
        setNotificationError(
          "Não foi possível carregar o Calendly. Atualiza a página e tenta novamente.",
        );
      });

    return () => {
      cancelled = true;
      window.clearTimeout(loadTimeout);
      parentElement.innerHTML = "";
    };
  }, [calendlyUrl, currentStep, trimmedClientEmail, trimmedClientName]);

  useEffect(() => {
    if (currentStep !== CALENDLY_STEP_INDEX) return undefined;

    const handleCalendlyMessage = (event) => {
      if (!isCalendlyEvent(event)) return;
      if (event.data.event !== "calendly.event_scheduled") return;
      if (notificationSentRef.current) return;

      const calendlyData = {
        eventUri: event.data.payload?.event?.uri || "",
        inviteeUri: event.data.payload?.invitee?.uri || "",
      };

      setScheduledEvent(calendlyData);
      void submitBookingNotification(calendlyData);
    };

    window.addEventListener("message", handleCalendlyMessage);
    return () => window.removeEventListener("message", handleCalendlyMessage);
  }, [currentStep, submitBookingNotification]);

  const handleBack = () => {
    if (currentStep <= MENTOR_STEP_INDEX || notificationStatus === "sending") return;
    setCurrentStep((step) => Math.max(MENTOR_STEP_INDEX, step - 1));
  };

  const handleContinue = () => {
    if (!canContinue) return;

    if (currentStep === DETAILS_STEP_INDEX) {
      if (isGroupPlan) {
        void submitGroupMentorshipRequest();
        return;
      }

      const payload = buildNotificationPayload();
      saveBookingIntent(payload);
      setIsCalendlyReady(false);
      setCalendlyLoadError("");
      setNotificationStatus("idle");
      setNotificationError("");
      setScheduledEvent(null);
      notificationSentRef.current = false;
      setCurrentStep(CALENDLY_STEP_INDEX);
      return;
    }

    setCurrentStep((step) => Math.min(CALENDLY_STEP_INDEX, step + 1));
  };

  const handleStartAgain = () => {
    const nextParams = new URLSearchParams();
    nextParams.set("source", source);
    setSearchParams(nextParams, { replace: true });
    clearStoredBookingIntent();
    setClientName("");
    setClientEmail("");
    setGroupContext("");
    setIsCalendlyReady(false);
    setCalendlyLoadError("");
    setNotificationStatus("idle");
    setNotificationError("");
    setScheduledEvent(null);
    notificationSentRef.current = false;
    setCurrentStep(MENTOR_STEP_INDEX);
  };

  return (
    <div className="relative bg-[#F4F4F4] pt-14 sm:pt-16 lg:pt-18">
      <Header logoSrc={logoSymbol} />

      <main
        style={{ fontFamily: "Inter, sans-serif" }}
        className="min-h-screen bg-[#F4F4F4] text-[#1F1F1F]"
      >
        <section className="px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
          <div className="mx-auto w-full max-w-[1120px]">
            <div className="mx-auto max-w-[820px] text-center">
              <SelectionBadge>Marca a tua sessão</SelectionBadge>

              <h1 className="mt-6 text-[38px] font-semibold leading-[0.98] tracking-[-0.03em] text-[#241A2A] sm:text-[56px] lg:text-[70px]">
                A mentoria certa começa com a{" "}
                <span className="bg-gradient-to-r from-[#D47BFF] to-[#ff0080] bg-clip-text text-transparent">
                  escolha certa.
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-[720px] text-[16px] leading-[1.75] text-[#5F5F68] sm:text-[18px]">
                Escolhe a mentora e o formato. Nas sessões individuais agendas
                no Calendly; nas sessões de grupo, a equipa acompanha o pedido
                por email.
              </p>
            </div>

            <StepProgress currentStep={currentStep} steps={activeFlowSteps} />

            <div className="mt-12">
              {currentStep === MENTOR_STEP_INDEX && (
                <section>
                  <StepHeader
                    eyebrow="Passo 1"
                    title="Escolhe a mentora"
                    description="Seleciona a pessoa mais alinhada com o momento em que estás."
                  />

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

                  <FlowActions
                    canGoBack={false}
                    canContinue={canContinue}
                    continueLabel={continueLabel}
                    onBack={handleBack}
                    onContinue={handleContinue}
                  />
                </section>
              )}

              {currentStep === FORMAT_STEP_INDEX && (
                <section>
                  <StepHeader
                    eyebrow="Passo 2"
                    title="Escolhe o formato"
                    description={
                      selectedMentor
                        ? `${selectedMentor.name} vai receber o pedido com o formato escolhido.`
                        : "Escolhe o formato que melhor encaixa no teu objetivo."
                    }
                  />

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

                  <p className="mt-5 text-center text-[13px] font-medium leading-[1.6] text-[#7B7482]">
                    Preços dispostos são{" "}
                    <span className="bg-gradient-to-r from-[#D47BFF] to-[#ff0080] bg-clip-text font-semibold text-transparent">
                      acrescidos de IVA
                    </span>
                    .
                  </p>

                  <FlowActions
                    canGoBack
                    canContinue={canContinue}
                    continueLabel={continueLabel}
                    onBack={handleBack}
                    onContinue={handleContinue}
                  />
                </section>
              )}

              {currentStep === DETAILS_STEP_INDEX && (
                <section className="mx-auto max-w-[760px]">
                  <div className="overflow-hidden rounded-[28px] border border-[#EADBF5] bg-white px-6 py-8 shadow-[0_16px_40px_rgba(110,30,140,0.08)] sm:px-8 sm:py-10">
                    <StepHeader
                      eyebrow="Passo 3"
                      title={
                        isGroupPlan
                          ? "Enquadramento da sessão"
                          : "Como falamos contigo?"
                      }
                      description={
                        isGroupPlan
                          ? "Partilha os teus dados de contacto e uma breve descrição do objetivo, do contexto do grupo e do tipo de apoio pretendido."
                          : "Deixa o teu nome e email para receberes a confirmação pendente e o link de pagamento da mentora."
                      }
                    />

                    <div className="mt-8 grid gap-5">
                      <ContactField
                        id="client-name"
                        label="Nome"
                        value={clientName}
                        onChange={setClientName}
                        autoComplete="name"
                      />

                      <ContactField
                        id="client-email"
                        label="Email"
                        type="email"
                        value={clientEmail}
                        onChange={setClientEmail}
                        autoComplete="email"
                      />

                      {isGroupPlan && (
                        <label htmlFor="group-context" className="block">
                          <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#8E68A4]">
                            Enquadramento do pedido
                          </span>
                          <textarea
                            id="group-context"
                            rows={6}
                            value={groupContext}
                            onChange={(event) => setGroupContext(event.target.value)}
                            placeholder="Descreve brevemente o contexto, o número aproximado de participantes, o principal desafio e o resultado que gostarias de alcançar."
                            className="mt-3 w-full resize-y rounded-[18px] border border-[#DFC6F0] bg-white px-4 py-4 text-[16px] leading-[1.6] text-[#241A2A] shadow-[0_10px_24px_rgba(111,58,129,0.06)] outline-none transition placeholder:text-[#A38AAE] focus:border-[#D47BFF] focus:ring-4 focus:ring-[#EADBF5]"
                          />
                        </label>
                      )}
                    </div>

                    <div className="mt-6 rounded-[20px] border border-[#EADBF5] bg-[#FBF6FF] px-5 py-4 text-[14px] leading-[1.7] text-[#5F5F68]">
                      {isGroupPlan
                        ? "Depois da submissão, a equipa #oamorexiste fará a triagem com a mentora selecionada e responderá por email com a proposta e próximos passos."
                        : "A reserva fica registada depois do Calendly. A sessão só fica confirmada quando o pagamento for concluído."}
                    </div>

                    {notificationStatus === "error" && (
                      <div
                        className="mt-5 rounded-[20px] border border-[#F0C6D4] bg-[#FFF6F8] px-5 py-4 text-[14px] leading-[1.7] text-[#8A4B63]"
                        aria-live="polite"
                      >
                        <p className="font-semibold">
                          Não conseguimos enviar o pedido automaticamente.
                        </p>
                        <p className="mt-1">{notificationError}</p>
                      </div>
                    )}

                    <FlowActions
                      canGoBack
                      canContinue={canContinue}
                      continueLabel={continueLabel}
                      onBack={handleBack}
                      onContinue={handleContinue}
                    />
                  </div>
                </section>
              )}

              {currentStep === CALENDLY_STEP_INDEX && (
                <section className="mx-auto max-w-[980px]">
                  <div className="overflow-hidden rounded-[28px] border border-[#EADBF5] bg-white px-4 py-5 shadow-[0_16px_40px_rgba(110,30,140,0.08)] sm:px-6 sm:py-7">
                    <div className="flex flex-col gap-5 px-2 sm:px-3 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#DFC6F0] bg-[#FBF6FF] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6F3A81]">
                          <Calendar className="h-4 w-4" strokeWidth={2} />
                          Passo 4
                        </div>

                        <h2 className="mt-4 text-[30px] font-semibold leading-[1.05] text-[#2A2A2A] sm:text-[42px]">
                          Escolhe o horário
                        </h2>

                        <p className="mt-3 max-w-[660px] text-[15px] leading-[1.7] text-[#5F5F5F] sm:text-[16px]">
                          {selectedMentor && selectedPlan
                            ? `${selectedMentor.name} - ${selectedPlan.name}. Quando terminares o Calendly, enviamos os emails automaticamente.`
                            : "Completa os passos anteriores para abrir a agenda."}
                        </p>
                      </div>

                      <SecondaryActionButton
                        onClick={handleBack}
                        disabled={notificationStatus === "sending"}
                      >
                        <ArrowLeft className="h-4 w-4" strokeWidth={2.2} />
                        Voltar
                      </SecondaryActionButton>
                    </div>

                    <div className="relative mt-6 min-h-[720px] overflow-hidden rounded-[22px] border border-[#EADBF5] bg-[#FBF6FF]">
                      {!isCalendlyReady && !calendlyLoadError && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#FBF6FF]">
                          <div className="inline-flex items-center gap-3 rounded-full border border-[#DFC6F0] bg-white px-5 py-3 text-[14px] font-semibold text-[#6F3A81] shadow-[0_10px_24px_rgba(111,58,129,0.08)]">
                            <Loader2
                              className="h-4 w-4 animate-spin"
                              strokeWidth={2.2}
                            />
                            A carregar Calendly
                          </div>
                        </div>
                      )}

                      {calendlyLoadError && (
                        <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#FBF6FF] px-5 text-center">
                          <div className="max-w-[440px] rounded-[24px] border border-[#EADBF5] bg-white px-6 py-7 shadow-[0_14px_34px_rgba(111,58,129,0.10)]">
                            <p className="text-[18px] font-semibold text-[#241A2A]">
                              {calendlyLoadError}
                            </p>
                            <p className="mt-3 text-[14px] leading-[1.7] text-[#5F5F68]">
                              Pode acontecer em browsers com bloqueio de scripts
                              externos ou restrições de preview local.
                            </p>
                            <a
                              href={calendlyUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-5 inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#2e0d3b] px-6 text-[14px] font-semibold text-white transition hover:bg-[#3C083B]"
                            >
                              Abrir agenda no Calendly
                            </a>
                          </div>
                        </div>
                      )}

                      <div
                        ref={calendlyContainerRef}
                        className="h-[720px] w-full"
                      />
                    </div>

                    {!calendlyLoadError && (
                      <p className="mt-4 text-center text-[13px] leading-[1.7] text-[#7B7482]">
                        Se o Calendly não aparecer,{" "}
                        <a
                          href={calendlyUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="font-semibold text-[#6F3A81] underline decoration-[#DCC8E7] underline-offset-4"
                        >
                          abre a agenda numa nova janela
                        </a>
                        .
                      </p>
                    )}

                    {notificationStatus === "sending" && (
                      <div
                        className="mt-5 flex items-center gap-3 rounded-[20px] border border-[#EADBF5] bg-[#FBF6FF] px-5 py-4 text-[14px] font-semibold text-[#6F3A81]"
                        aria-live="polite"
                      >
                        <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.2} />
                        A enviar os emails de seguimento...
                      </div>
                    )}

                    {notificationStatus === "error" && (
                      <div
                        className="mt-5 rounded-[20px] border border-[#F0C6D4] bg-[#FFF6F8] px-5 py-4 text-[14px] leading-[1.7] text-[#8A4B63]"
                        aria-live="polite"
                      >
                        <p className="font-semibold">
                          Não conseguimos enviar os emails automaticamente.
                        </p>
                        <p className="mt-1">{notificationError}</p>
                        {scheduledEvent && (
                          <button
                            type="button"
                            onClick={() => submitBookingNotification(scheduledEvent)}
                            className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#2e0d3b] px-5 text-[14px] font-semibold text-white transition hover:bg-[#3C083B]"
                          >
                            Tentar enviar novamente
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </section>
              )}

              {currentStep === CONFIRMATION_STEP_INDEX && (
                <section className="mx-auto max-w-[760px]">
                  <div className="overflow-hidden rounded-[28px] border border-[#EADBF5] bg-white px-6 py-10 text-center shadow-[0_16px_40px_rgba(110,30,140,0.08)] sm:px-10">
                    <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#FBF6FF] text-[#6F3A81] shadow-[0_12px_28px_rgba(111,58,129,0.10)]">
                      <CheckCircle className="h-8 w-8" strokeWidth={2.2} />
                    </div>

                    <h2 className="mt-6 text-[34px] font-semibold leading-[1.05] text-[#241A2A] sm:text-[46px]">
                      {isGroupPlan ? "Pedido recebido." : "Reserva recebida."}
                    </h2>

                    <p className="mx-auto mt-5 max-w-[600px] text-[16px] leading-[1.75] text-[#5F5F68]">
                      {isGroupPlan
                        ? "A equipa #oamorexiste e a mentora selecionada vão analisar o teu pedido de sessão coletiva. Os próximos passos seguem por email."
                        : "A tua mentora vai enviar-te o link de pagamento por email. A sessão fica confirmada apenas depois do pagamento estar concluído."}
                    </p>

                    <div className="mx-auto mt-7 grid max-w-[560px] gap-3 rounded-[22px] border border-[#EADBF5] bg-[#FBF6FF] px-5 py-5 text-left text-[14px] leading-[1.7] text-[#5F5F68]">
                      <p>
                        <strong className="text-[#241A2A]">Mentora:</strong>{" "}
                        {selectedMentor?.name}
                      </p>
                      <p>
                        <strong className="text-[#241A2A]">Formato:</strong>{" "}
                        {selectedPlan?.name}
                      </p>
                      <p>
                        <strong className="text-[#241A2A]">Email:</strong>{" "}
                        {trimmedClientEmail}
                      </p>
                      {isGroupPlan && (
                        <p>
                          <strong className="text-[#241A2A]">
                            Acompanhamento:
                          </strong>{" "}
                          por email
                        </p>
                      )}
                    </div>

                    <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                      <SecondaryActionButton onClick={handleStartAgain}>
                        <Mail className="h-4 w-4" strokeWidth={2.2} />
                        {isGroupPlan ? "Fazer outro pedido" : "Marcar outra sessão"}
                      </SecondaryActionButton>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer logoSrc={logoSymbol} />
    </div>
  );
}
