export const bookingPlans = [
  {
    slug: "one-to-one",
    name: "One-to-One",
    subtitle: "Sessão individual",
    duration: "1h",
    price: "60 EUR",
  },
  {
    slug: "estrategica-one-to-one",
    name: "Estratégica One-to-One",
    subtitle: "Sessão premium",
    duration: "1h30",
    price: "70 EUR",
  },
  {
    slug: "grupo",
    name: "Grupo",
    subtitle: "Sessão coletiva",
    duration: "2h",
    price: "Sob orçamento",
  },
];

const realBookingMentors = [
  {
    slug: "teresa-franco",
    name: "Teresa Franco",
    category: "Mentoria Administrativa e Financeira",
    calendlyUrl: "https://calendly.com/teresasfranco785/30min",
    calendlyUrls: {
      "one-to-one": "https://calendly.com/teresasfranco785/new-meeting",
    },
    email: "teresa.franco@oamorexiste.com",
  },
  {
    slug: "maria-caeiro",
    name: "Maria Caeiro",
    category: "Liderança Humanizada e Desenvolvimento de Equipas",
    calendlyUrl: "https://calendly.com/mfcaeiro/30min",
    calendlyUrls: {
      "one-to-one": "https://calendly.com/mfcaeiro/new-meeting",
    },
    email: "maria.caeiro@oamorexiste.com",
  },
  {
    slug: "carla-rosa",
    name: "Carla Rosa",
    category: "Estratégia Integrada",
    calendlyUrl: "https://calendly.com/carlamcrrosa/30min",
    calendlyUrls: {
      "one-to-one": "https://calendly.com/carlamcrrosa/1h-meeting-carla-rosa",
    },
    email: "carla.rosa@oamorexiste.com",
  },
];

const testBookingMentor = {
  slug: "test-ranger-cardeal",
  name: "Ranger Cardeal",
  category: "Mentora de Teste - desenvolvimento",
  calendlyUrl: "https://calendly.com/ranger-cardeal/30min",
  email: "rangercardeal@gmail.com",
  isTest: true,
};

const testSandraBookingMentor = {
  slug: "test-sandra-correia",
  name: "Sandra",
  category: "Mentora de Teste - desenvolvimento",
  calendlyUrl: "https://calendly.com/correia451/30min",
  email: "correia451@gmail.com",
  isTest: true,
};

const testBookingMentors = [testBookingMentor, testSandraBookingMentor];

// Development-only test mentors. Keep ENABLE_TEST_MENTOR unset in production.
export function getBookingMentors({ includeTestMentor = false } = {}) {
  return includeTestMentor
    ? [...realBookingMentors, ...testBookingMentors]
    : realBookingMentors;
}

export function getBookingMentorBySlug(slug, options) {
  return (
    getBookingMentors(options).find((mentor) => mentor.slug === slug) || null
  );
}

export function getBookingPlanBySlug(slug) {
  return bookingPlans.find((plan) => plan.slug === slug) || null;
}
