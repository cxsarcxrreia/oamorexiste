const STORAGE_KEY = "oamorexiste.bookingIntent";

export function buildMentorBookingIntentPayload({
  mentor,
  plan,
  client,
  calendly,
  source,
} = {}) {
  return {
    mentorSlug: mentor?.slug || "",
    mentorName: mentor?.name || "",
    mentorEmail: mentor?.email || "",
    planSlug: plan?.slug || "",
    planName: plan?.name || "",
    planDuration: plan?.duration || "",
    planPrice: plan?.price || "",
    clientName: client?.name || "",
    clientEmail: client?.email || "",
    calendlyEventUri: calendly?.eventUri || "",
    calendlyInviteeUri: calendly?.inviteeUri || "",
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

export function clearStoredBookingIntent() {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn("Booking intent could not be cleared locally.", error);
  }
}

export async function notifyMentorOfBookingIntent(payload) {
  const response = await fetch("/api/booking-intent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await response
    .json()
    .catch(() => ({ ok: false, error: "Resposta inesperada do servidor." }));

  if (!response.ok || !result.ok) {
    throw new Error(
      result.error || "Não foi possível enviar os emails de confirmação.",
    );
  }

  return result;
}

export async function notifyGroupMentorshipRequest(payload) {
  const response = await fetch("/api/group-mentorship-request", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await response
    .json()
    .catch(() => ({ ok: false, error: "Resposta inesperada do servidor." }));

  if (!response.ok || !result.ok) {
    throw new Error(
      result.error || "Não foi possível enviar o pedido de grupo.",
    );
  }

  return result;
}
