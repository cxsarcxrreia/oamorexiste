import "dotenv/config";
import express from "express";
import nodemailer from "nodemailer";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  getBookingMentorBySlug,
  getBookingPlanBySlug,
} from "./bookingCatalog.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, "../dist");

const app = express();
const port = process.env.PORT || 4173;
const archiveEmail = process.env.EMAIL_ARCHIVE || "geral@oamorexiste.com";
const emailFrom =
  process.env.EMAIL_FROM || "Oamorexiste <geral@oamorexiste.com>";

const requestHits = new Map();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 20;

app.disable("x-powered-by");
app.use(express.json({ limit: "20kb" }));

function rateLimitBookingRequests(request, response, next) {
  const now = Date.now();
  const key = request.ip || request.socket.remoteAddress || "unknown";
  const hit = requestHits.get(key) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };

  if (hit.resetAt <= now) {
    hit.count = 0;
    hit.resetAt = now + RATE_LIMIT_WINDOW_MS;
  }

  hit.count += 1;
  requestHits.set(key, hit);

  for (const [hitKey, hitValue] of requestHits.entries()) {
    if (hitValue.resetAt <= now) requestHits.delete(hitKey);
  }

  if (hit.count > RATE_LIMIT_MAX) {
    response.status(429).json({
      ok: false,
      error: "Demasiados pedidos. Tenta novamente dentro de alguns minutos.",
    });
    return;
  }

  next();
}

function cleanText(value, maxLength = 500) {
  return String(value || "").trim().slice(0, maxLength);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getSmtpTransport() {
  const host = process.env.SMTP_HOST || "smtp.zoho.eu";
  const portNumber = Number.parseInt(process.env.SMTP_PORT || "465", 10);
  const secure = (process.env.SMTP_SECURE || "true") !== "false";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    throw new Error("SMTP_USER and SMTP_PASS must be configured on the server.");
  }

  return nodemailer.createTransport({
    host,
    port: portNumber,
    secure,
    auth: {
      user,
      pass,
    },
  });
}

function buildEmailBodies({ mentor, plan, client }) {
  const lines = [
    `Mentora: ${mentor.name}`,
    `Email da mentora: ${mentor.email}`,
    `Formato: ${plan.name}`,
    `Duração: ${plan.duration}`,
    `Valor: ${plan.price}`,
    `Cliente: ${client.name}`,
    `Email da cliente: ${client.email}`,
  ];

  const htmlRows = lines
    .map((line) => {
      const [label, ...rest] = line.split(": ");
      return `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(rest.join(": "))}</p>`;
    })
    .join("");

  const mentorText = [
    `Pedido de sessão recebido - pendente de pagamento: ${plan.name}`,
    "",
    ...lines,
    "",
    "Este pedido ainda não está confirmado.",
    "Agora a mentora fica responsável por enviar o link de pagamento manualmente.",
    "A sessão só deve ser considerada confirmada depois do pagamento estar concluído.",
  ].join("\n");

  const mentorHtml = `
    <h2>Pedido de sessão recebido - pendente de pagamento: ${escapeHtml(plan.name)}</h2>
    ${htmlRows}
    <p><strong>Estado:</strong> pedido recebido, ainda não confirmado.</p>
    <p><strong>Próximo passo:</strong> enviar manualmente o link de pagamento à cliente.</p>
    <p>A sessão só deve ser considerada confirmada depois do pagamento estar concluído.</p>
  `;

  const archiveText = [
    `Pedido de mentoria pendente de pagamento: ${mentor.name} - ${plan.name}.`,
    `A mentora ${mentor.name} fica responsável por enviar o link de pagamento.`,
    "A sessão só deve ser considerada confirmada depois do pagamento estar concluído.",
    "",
    ...lines,
  ].join("\n");

  const archiveHtml = `
    <h2>Pedido de mentoria pendente de pagamento</h2>
    <p>A mentora <strong>${escapeHtml(mentor.name)}</strong> foi solicitada para uma sessão <strong>${escapeHtml(plan.name)}</strong>.</p>
    <p><strong>Estado:</strong> pedido recebido, ainda não confirmado.</p>
    <p><strong>Próximo passo:</strong> a mentora deve enviar manualmente o link de pagamento.</p>
    <p>A sessão só deve ser considerada confirmada depois do pagamento estar concluído.</p>
    ${htmlRows}
  `;

  const clientText = [
    "Recebemos o teu pedido de sessão.",
    "",
    "A tua sessão ainda não está confirmada.",
    "",
    `Mentora: ${mentor.name}`,
    `Formato: ${plan.name}`,
    "",
    "A mentora vai enviar-te o link de pagamento por email.",
    "Só depois do pagamento estar concluído é que a sessão fica confirmada.",
    "",
    "Se receberes um email automático do Calendly, considera-o apenas como a pré-reserva do horário. A confirmação final depende do pagamento.",
    "",
    "Obrigada,",
    "Oamorexiste",
  ].join("\n");

  const clientHtml = `
    <h2>Recebemos o teu pedido de sessão.</h2>
    <p><strong>A tua sessão ainda não está confirmada.</strong></p>
    <p><strong>Mentora:</strong> ${escapeHtml(mentor.name)}</p>
    <p><strong>Formato:</strong> ${escapeHtml(plan.name)}</p>
    <p>A mentora vai enviar-te o link de pagamento por email.</p>
    <p>Só depois do pagamento estar concluído é que a sessão fica confirmada.</p>
    <p>Se receberes um email automático do Calendly, considera-o apenas como a pré-reserva do horário. A confirmação final depende do pagamento.</p>
    <p>Obrigada,<br />Oamorexiste</p>
  `;

  return {
    mentorText,
    mentorHtml,
    archiveText,
    archiveHtml,
    clientText,
    clientHtml,
  };
}

function buildHelpRequestEmailBodies({ client, message, source }) {
  const internalText = [
    "Pedido de ajuda para encontrar mentora",
    "",
    `Nome: ${client.name}`,
    `Email: ${client.email}`,
    `Origem: ${source || "mentees-help-request"}`,
    "",
    "Mensagem:",
    message,
    "",
    "A equipa deve analisar o pedido e responder à cliente com a mentora mais alinhada para a situação descrita.",
  ].join("\n");

  const internalHtml = `
    <h2>Pedido de ajuda para encontrar mentora</h2>
    <p><strong>Nome:</strong> ${escapeHtml(client.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(client.email)}</p>
    <p><strong>Origem:</strong> ${escapeHtml(source || "mentees-help-request")}</p>
    <h3>Mensagem</h3>
    <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
    <p>A equipa deve analisar o pedido e responder à cliente com a mentora mais alinhada para a situação descrita.</p>
  `;

  const clientText = [
    "Recebemos o teu pedido.",
    "",
    "Obrigada por partilhares connosco aquilo em que precisas de ajuda.",
    "A equipa #oamorexiste vai analisar a tua mensagem e responder por email assim que possível com a orientação mais alinhada para a tua situação.",
    "",
    "Obrigada,",
    "Oamorexiste",
  ].join("\n");

  const clientHtml = `
    <h2>Recebemos o teu pedido.</h2>
    <p>Obrigada por partilhares connosco aquilo em que precisas de ajuda.</p>
    <p>A equipa #oamorexiste vai analisar a tua mensagem e responder por email assim que possível com a orientação mais alinhada para a tua situação.</p>
    <p>Obrigada,<br />Oamorexiste</p>
  `;

  return {
    internalText,
    internalHtml,
    clientText,
    clientHtml,
  };
}

function buildGroupMentorshipRequestEmailBodies({
  mentor,
  plan,
  client,
  message,
}) {
  const details = [
    `Mentora: ${mentor.name}`,
    `Email da mentora: ${mentor.email}`,
    `Formato: ${plan.name}`,
    `Valor: ${plan.price}`,
    `Cliente: ${client.name}`,
    `Email da cliente: ${client.email}`,
  ];

  const htmlRows = details
    .map((line) => {
      const [label, ...rest] = line.split(": ");
      return `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(rest.join(": "))}</p>`;
    })
    .join("");

  const internalText = [
    "Pedido de sessao coletiva recebido",
    "",
    "Este pedido nao passou pelo Calendly. Deve ser acompanhado internamente por email.",
    "",
    ...details,
    "",
    "Contexto escrito pela cliente:",
    message,
    "",
    "Proximo passo: alinhar internamente com a mentora e responder a cliente por email.",
  ].join("\n");

  const internalHtml = `
    <h2>Pedido de sessao coletiva recebido</h2>
    <p>Este pedido nao passou pelo Calendly. Deve ser acompanhado internamente por email.</p>
    ${htmlRows}
    <h3>Contexto escrito pela cliente</h3>
    <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
    <p><strong>Proximo passo:</strong> alinhar internamente com a mentora e responder a cliente por email.</p>
  `;

  const mentorText = [
    `Pedido de sessao coletiva: ${client.name}`,
    "",
    `Foi pedido um formato de grupo contigo: ${plan.name}.`,
    "A equipa #oamorexiste tambem recebeu este pedido para acompanhar internamente.",
    "",
    ...details,
    "",
    "Contexto escrito pela cliente:",
    message,
    "",
    "Proximo passo: responder a cliente por email quando o enquadramento estiver alinhado.",
  ].join("\n");

  const mentorHtml = `
    <h2>Pedido de sessao coletiva: ${escapeHtml(client.name)}</h2>
    <p>Foi pedido um formato de grupo contigo: <strong>${escapeHtml(plan.name)}</strong>.</p>
    <p>A equipa #oamorexiste tambem recebeu este pedido para acompanhar internamente.</p>
    ${htmlRows}
    <h3>Contexto escrito pela cliente</h3>
    <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
    <p><strong>Proximo passo:</strong> responder a cliente por email quando o enquadramento estiver alinhado.</p>
  `;

  return {
    internalText,
    internalHtml,
    mentorText,
    mentorHtml,
  };
}

app.get("/api/health", (_request, response) => {
  response.json({ ok: true });
});

function shouldAllowTestMentor(request) {
  if (process.env.ENABLE_TEST_MENTOR === "true") return true;
  return ["localhost", "127.0.0.1"].includes(request.hostname);
}

app.post("/api/booking-intent", rateLimitBookingRequests, async (request, response) => {
  const mentorSlug = cleanText(request.body?.mentorSlug, 80);
  const planSlug = cleanText(request.body?.planSlug, 80);
  const clientName = cleanText(request.body?.clientName, 140);
  const clientEmail = cleanText(request.body?.clientEmail, 254).toLowerCase();
  const source = cleanText(request.body?.source, 160);
  const calendlyEventUri = cleanText(request.body?.calendlyEventUri, 500);
  const calendlyInviteeUri = cleanText(request.body?.calendlyInviteeUri, 500);

  const mentor = getBookingMentorBySlug(mentorSlug, {
    includeTestMentor: shouldAllowTestMentor(request),
  });
  const plan = getBookingPlanBySlug(planSlug);

  if (!mentor) {
    response.status(400).json({ ok: false, error: "Mentora inválida." });
    return;
  }

  if (!plan) {
    response.status(400).json({ ok: false, error: "Formato inválido." });
    return;
  }

  if (plan.slug === "grupo") {
    response.status(400).json({
      ok: false,
      error: "O formato de grupo deve ser pedido pelo fluxo de email.",
    });
    return;
  }

  if (clientName.length < 2) {
    response.status(400).json({ ok: false, error: "Nome inválido." });
    return;
  }

  if (!isValidEmail(clientEmail)) {
    response.status(400).json({ ok: false, error: "Email inválido." });
    return;
  }

  const client = {
    name: clientName,
    email: clientEmail,
  };

  const calendly = {
    eventUri: calendlyEventUri,
    inviteeUri: calendlyInviteeUri,
  };

  const bodies = buildEmailBodies({
    mentor,
    plan,
    client,
    source,
    calendly,
  });

  try {
    const transport = getSmtpTransport();

    await transport.sendMail({
      from: emailFrom,
      to: mentor.email,
      replyTo: client.email,
      subject: `Pedido de sessão pendente de pagamento: ${plan.name} - ${client.name}`,
      text: bodies.mentorText,
      html: bodies.mentorHtml,
    });

    await transport.sendMail({
      from: emailFrom,
      to: archiveEmail,
      replyTo: mentor.email,
      subject: `Pedido de mentoria pendente de pagamento: ${mentor.name} - ${plan.name}`,
      text: bodies.archiveText,
      html: bodies.archiveHtml,
    });

    await transport.sendMail({
      from: emailFrom,
      to: client.email,
      replyTo: mentor.email,
      subject: "Pedido de sessão recebido - pendente de pagamento",
      text: bodies.clientText,
      html: bodies.clientHtml,
    });

    response.json({ ok: true });
  } catch (error) {
    console.error("Booking email delivery failed.", {
      message: error instanceof Error ? error.message : String(error),
    });
    response.status(500).json({
      ok: false,
      error:
        "Não foi possível enviar os emails de confirmação. Tenta novamente ou contacta a equipa.",
    });
  }
});

app.post("/api/mentor-help-request", rateLimitBookingRequests, async (request, response) => {
  const clientName = cleanText(request.body?.clientName, 140);
  const clientEmail = cleanText(request.body?.clientEmail, 254).toLowerCase();
  const message = cleanText(request.body?.message, 3000);
  const source = cleanText(request.body?.source, 160);

  if (clientName.length < 2) {
    response.status(400).json({ ok: false, error: "Nome inválido." });
    return;
  }

  if (!isValidEmail(clientEmail)) {
    response.status(400).json({ ok: false, error: "Email inválido." });
    return;
  }

  if (message.length < 10) {
    response.status(400).json({
      ok: false,
      error: "Escreve uma mensagem um pouco mais completa.",
    });
    return;
  }

  const client = {
    name: clientName,
    email: clientEmail,
  };

  const bodies = buildHelpRequestEmailBodies({
    client,
    message,
    source,
  });
  const mentor = {
    name: cleanText(request.body?.mentorName, 140) || "Mentora por definir",
  };
  const plan = {
    name: cleanText(request.body?.planName, 140) || "Formato por definir",
  };

  try {
    const transport = getSmtpTransport();
    const subject = `Pedido de ajuda para encontrar mentora [LEAD]: ${mentor.name} - ${plan.name}`;

    await transport.sendMail({
      from: emailFrom,
      to: archiveEmail,
      replyTo: client.email,
      subject,
      text: bodies.internalText,
      html: bodies.internalHtml,
    });

    await transport.sendMail({
      from: emailFrom,
      to: client.email,
      replyTo: archiveEmail,
      subject: "Recebemos o teu pedido",
      text: bodies.clientText,
      html: bodies.clientHtml,
    });

    response.json({ ok: true });
  } catch (error) {
    console.error("Mentor help request email delivery failed.", {
      message: error instanceof Error ? error.message : String(error),
    });
    response.status(500).json({
      ok: false,
      error:
        "Não foi possível enviar o pedido. Tenta novamente ou contacta a equipa.",
    });
  }
});

app.post("/api/group-mentorship-request", rateLimitBookingRequests, async (request, response) => {
  const mentorSlug = cleanText(request.body?.mentorSlug, 80);
  const planSlug = cleanText(request.body?.planSlug, 80);
  const clientName = cleanText(request.body?.clientName, 140);
  const clientEmail = cleanText(request.body?.clientEmail, 254).toLowerCase();
  const message = cleanText(request.body?.groupContext, 3000);
  const source = cleanText(request.body?.source, 160);

  const mentor = getBookingMentorBySlug(mentorSlug, {
    includeTestMentor: shouldAllowTestMentor(request),
  });
  const plan = getBookingPlanBySlug(planSlug);

  if (!mentor) {
    response.status(400).json({ ok: false, error: "Mentora inválida." });
    return;
  }

  if (!plan || plan.slug !== "grupo") {
    response.status(400).json({
      ok: false,
      error: "Formato de grupo inválido.",
    });
    return;
  }

  if (clientName.length < 2) {
    response.status(400).json({ ok: false, error: "Nome inválido." });
    return;
  }

  if (!isValidEmail(clientEmail)) {
    response.status(400).json({ ok: false, error: "Email inválido." });
    return;
  }

  if (message.length < 10) {
    response.status(400).json({
      ok: false,
      error: "Escreve um pouco mais sobre o contexto da sessão.",
    });
    return;
  }

  const client = {
    name: clientName,
    email: clientEmail,
  };

  const bodies = buildGroupMentorshipRequestEmailBodies({
    mentor,
    plan,
    client,
    message,
    source,
  });

  try {
    const transport = getSmtpTransport();

    await transport.sendMail({
      from: emailFrom,
      to: archiveEmail,
      replyTo: client.email,
      subject: `Pedido de sessao coletiva: ${client.name} - ${mentor.name}`,
      text: bodies.internalText,
      html: bodies.internalHtml,
    });

    await transport.sendMail({
      from: emailFrom,
      to: mentor.email,
      replyTo: client.email,
      subject: `Pedido de sessao coletiva: ${client.name}`,
      text: bodies.mentorText,
      html: bodies.mentorHtml,
    });

    response.json({ ok: true });
  } catch (error) {
    console.error("Group mentorship request email delivery failed.", {
      message: error instanceof Error ? error.message : String(error),
    });
    response.status(500).json({
      ok: false,
      error:
        "Não foi possível enviar o pedido de grupo. Tenta novamente ou contacta a equipa.",
    });
  }
});

app.use(express.static(distPath));

app.use((request, response, next) => {
  if (request.method !== "GET" || request.path.startsWith("/api/")) {
    next();
    return;
  }

  response.sendFile(path.join(distPath, "index.html"));
});

app.listen(port, () => {
  console.log(`Oamorexiste server listening on port ${port}`);
});
