import mariaCaeiroImg from "../assets/Home/maria-caeiro.jpg";
import carlaRosaImg from "../assets/Home/carla-rosa-v2.png";
import teresaFrancoImg from "../assets/Home/teresa-franco-v2.jpg";
import logoSymbol from "../assets/Home/oamorexiste-logo.png";

export const BOOKING_ROUTE = "/selecionar-mentora";
const TEST_MENTOR_SLUG = "test-ranger-cardeal";

function shouldShowTestMentor() {
  if (import.meta.env.VITE_ENABLE_TEST_MENTOR === "true") return true;
  if (typeof window === "undefined") return false;

  return ["localhost", "127.0.0.1"].includes(window.location.hostname);
}

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

const realBookingMentors = [
  {
    slug: "teresa-franco",
    name: "Teresa Franco",
    category: "Mentoria Administrativa e Financeira",
    image: teresaFrancoImg,
    calendlyUrl: "https://calendly.com/teresasfranco785/30min",
    email: "teresa.franco@oamorexiste.com",
  },
  {
    slug: "maria-caeiro",
    name: "Maria Caeiro",
    category: "Liderança Humanizada e Desenvolvimento de Equipas",
    image: mariaCaeiroImg,
    calendlyUrl: "https://calendly.com/mfcaeiro/30min",
    email: "maria.caeiro@oamorexiste.com",
  },
  {
    slug: "carla-rosa",
    name: "Carla Rosa",
    category: "Estratégia Integrada",
    image: carlaRosaImg,
    imageClassName: "scale-[1.06]",
    calendlyUrl: "https://calendly.com/carlamcrrosa/30min",
    email: "carla.rosa@oamorexiste.com",
  },
];

const testBookingMentor = {
  slug: TEST_MENTOR_SLUG,
  name: "Ranger Cardeal",
  category: "Mentora de Teste - desenvolvimento",
  image: logoSymbol,
  imageClassName: "object-contain p-10",
  calendlyUrl: "https://calendly.com/ranger-cardeal/30min",
  email: "rangercardeal@gmail.com",
  isTest: true,
};

const testSandraBookingMentor = {
  slug: "test-sandra-correia",
  name: "Sandra",
  category: "Mentora de Teste - desenvolvimento",
  image: logoSymbol,
  imageClassName: "object-contain p-10",
  calendlyUrl: "https://calendly.com/correia451/30min",
  email: "correia451@gmail.com",
  isTest: true,
};

const testBookingMentors = [testBookingMentor, testSandraBookingMentor];

// Development-only test mentors. Remove this block before production if no longer needed.
export const bookingMentors = shouldShowTestMentor()
  ? [...realBookingMentors, ...testBookingMentors]
  : realBookingMentors;

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
