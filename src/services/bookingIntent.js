const STORAGE_KEY = "oamorexiste.bookingIntent";

export function buildMentorBookingIntentPayload({ mentor, plan, source } = {}) {
  return {
    mentorSlug: mentor?.slug || "",
    mentorName: mentor?.name || "",
    mentorEmail: mentor?.email || "",
    planSlug: plan?.slug || "",
    planName: plan?.name || "",
    planDuration: plan?.duration || "",
    planPrice: plan?.price || "",
    source: source || "booking-flow",
    createdAt: new Date().toISOString(),
  };
}

export function saveBookingIntent(payload) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (error) {
    console.warn("Booking intent could not be saved locally.", error);
  }
}

export function getStoredBookingIntent() {
  if (typeof window === "undefined") return null;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.warn("Booking intent could not be read locally.", error);
    return null;
  }
}

export async function notifyMentorOfBookingIntent(payload) {
  // TODO: replace this mock adapter with a backend, serverless function, or
  // protected third-party email service. Do not send real email from the client
  // because client-side credentials would be exposed in the static bundle.
  console.info("Mock mentor booking intent notification:", payload);

  return {
    ok: true,
    mode: "mock",
  };
}
