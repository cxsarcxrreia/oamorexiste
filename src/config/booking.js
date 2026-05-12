import mariaCaeiroImg from "../assets/Home/maria-caeiro.jpg";
import carlaRosaImg from "../assets/Home/carla-rosa-v2.png";
import teresaFrancoImg from "../assets/Home/teresa-franco-v2.jpg";

export const BOOKING_ROUTE = "/selecionar-mentora";

export const bookingPlans = [
  {
    slug: "one-to-one",
    name: "One-to-One",
    subtitle: "Sessão individual",
    duration: "1h",
    price: "60€",
    cta: "Escolher sessão",
    calendlyAnswerLabel: "One-to-One",
    description:
      "Um formato direto e focado para trabalhar clareza, direção e próximos passos com acompanhamento individual.",
  },
  {
    slug: "estrategica-one-to-one",
    name: "Estratégica One-to-One",
    subtitle: "Sessão premium",
    duration: "1h30",
    price: "70€",
    cta: "Escolher sessão",
    calendlyAnswerLabel: "Estratégica One-to-One",
    featured: true,
    description:
      "Uma sessão mais profunda para desbloquear decisões, alinhar estratégia e trabalhar desafios com maior profundidade.",
  },
  {
    slug: "grupo",
    name: "Grupo",
    subtitle: "Sessão coletiva",
    duration: "2h",
    price: "Sob Orçamento",
    cta: "Pedir proposta",
    calendlyAnswerLabel: "Grupo",
    description:
      "Formato pensado para equipas, grupos e contextos colaborativos que pedem alinhamento, facilitação e visão partilhada.",
  },
];

export const bookingMentors = [
  {
    slug: "teresa-franco",
    name: "Teresa Franco",
    category: "Mentoria Administrativa e Financeira",
    image: teresaFrancoImg,
    calendlyUrl: "https://calendly.com/teresasfranco785/30min",
    email: "teresasfranco785@gmail.com",
  },
  {
    slug: "maria-caeiro",
    name: "Maria Caeiro",
    category: "Liderança Humanizada e Desenvolvimento de Equipas",
    image: mariaCaeiroImg,
    calendlyUrl: "https://calendly.com/mfcaeiro/30min",
    email: "mfcaeiro@gmail.com",
  },
  {
    slug: "carla-rosa",
    name: "Carla Rosa",
    category: "Estratégia Integrada",
    image: carlaRosaImg,
    imageClassName: "scale-[1.06]",
    calendlyUrl: "https://calendly.com/carlamcrrosa/30min",
    email: "carlamcrrosa@gmail.com",
  },
];

export function getBookingMentorBySlug(slug) {
  return bookingMentors.find((mentor) => mentor.slug === slug) || null;
}

export function getBookingPlanBySlug(slug) {
  return bookingPlans.find((plan) => plan.slug === slug) || null;
}

export function buildBookingPath({ mentorSlug, planSlug, source } = {}) {
  const params = new URLSearchParams();

  if (mentorSlug) params.set("mentor", mentorSlug);
  if (planSlug) params.set("plan", planSlug);
  if (source) params.set("source", source);

  const query = params.toString();
  return query ? `${BOOKING_ROUTE}?${query}` : BOOKING_ROUTE;
}

export function buildCalendlyUrl({ mentor, plan, source } = {}) {
  if (!mentor?.calendlyUrl) return "";

  const url = new URL(mentor.calendlyUrl);

  if (plan?.calendlyAnswerLabel) {
    url.searchParams.set("a1", plan.calendlyAnswerLabel);
  }

  if (mentor?.slug) {
    url.searchParams.set("utm_content", mentor.slug);
  }

  if (plan?.slug) {
    url.searchParams.set("utm_campaign", plan.slug);
  }

  if (source) {
    url.searchParams.set("utm_source", source);
  }

  return url.toString();
}
