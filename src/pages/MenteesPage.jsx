import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MenteeCard from "../components/MenteeCard";
import { mentees } from "../data/mentees";
import logoSymbol from "../assets/Home/oamorexiste-logo.png";
import { sendMentorHelpRequest } from "../services/mentorHelpRequest";

function SoftBadge({ children }) {
  return (
    <span className="inline-flex rounded-full border border-[#E6D1F3] bg-white/70 px-3 py-1.5 text-[12px] font-medium text-[#7B5A8A] backdrop-blur-sm">
      {children}
    </span>
  );
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function MentorHelpRequestSection() {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const isValid =
    clientName.trim().length >= 2 &&
    emailPattern.test(clientEmail.trim()) &&
    message.trim().length >= 10;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isValid || status === "sending") return;

    setStatus("sending");
    setError("");

    try {
      await sendMentorHelpRequest({
        clientName: clientName.trim(),
        clientEmail: clientEmail.trim(),
        message: message.trim(),
        source: "mentees-help-request",
      });
      setStatus("sent");
    } catch (requestError) {
      setStatus("error");
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Não foi possível enviar o pedido. Tenta novamente.",
      );
    }
  };

  if (status === "sent") {
    return (
      <section className="px-6 pb-20 sm:px-10 sm:pb-24 lg:px-16 lg:pb-28">
        <div className="mx-auto max-w-[1120px]">
          <div className="rounded-[28px] border border-[#EADBF5] bg-white px-6 py-10 text-center shadow-[0_16px_40px_rgba(110,30,140,0.06)] sm:px-10">
            <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#FBF6FF] text-[26px] text-[#6F3A81]">
              ✓
            </div>
            <h2 className="mt-5 text-[30px] font-semibold leading-[1.05] text-[#2A2A2A] sm:text-[42px]">
              Pedido enviado.
            </h2>
            <p className="mx-auto mt-4 max-w-[620px] text-[15px] leading-[1.7] text-[#5F5F5F] sm:text-[16px]">
              Obrigada pela tua mensagem. A equipa recebeu o teu pedido e vai
              responder por email assim que possível. Fica atento(a) à tua caixa de
              entrada.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 pb-20 sm:px-10 sm:pb-24 lg:px-16 lg:pb-28">
      <div className="mx-auto max-w-[1120px]">
        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-[28px] border border-[#EADBF5] bg-white px-6 py-8 shadow-[0_16px_40px_rgba(110,30,140,0.06)] sm:px-8 sm:py-10 lg:px-10"
        >
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <h2 className="text-[30px] font-semibold leading-[1.05] text-[#2A2A2A] sm:text-[42px]">
                Não sabes qual mentora escolher?
              </h2>

              <p className="mt-4 max-w-[560px] text-[15px] leading-[1.7] text-[#5F5F5F] sm:text-[16px]">
                Envia-nos uma mensagem a contar em que precisas de ajuda. Vamos
                procurar a mentora mais alinhada com a tua situação e responder-te
                com calma por email.
              </p>
            </div>

            <div className="grid gap-4">
              <label className="block">
                <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#8E68A4]">
                  Nome
                </span>
                <input
                  type="text"
                  value={clientName}
                  onChange={(event) => setClientName(event.target.value)}
                  autoComplete="name"
                  className="mt-3 min-h-[52px] w-full rounded-[18px] border border-[#DFC6F0] bg-white px-4 text-[15px] text-[#241A2A] shadow-[0_10px_24px_rgba(111,58,129,0.06)] outline-none transition focus:border-[#D47BFF] focus:ring-4 focus:ring-[#EADBF5]"
                />
              </label>

              <label className="block">
                <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#8E68A4]">
                  Email
                </span>
                <input
                  type="email"
                  value={clientEmail}
                  onChange={(event) => setClientEmail(event.target.value)}
                  autoComplete="email"
                  className="mt-3 min-h-[52px] w-full rounded-[18px] border border-[#DFC6F0] bg-white px-4 text-[15px] text-[#241A2A] shadow-[0_10px_24px_rgba(111,58,129,0.06)] outline-none transition focus:border-[#D47BFF] focus:ring-4 focus:ring-[#EADBF5]"
                />
              </label>

              <label className="block">
                <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#8E68A4]">
                  Mensagem
                </span>
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  rows={5}
                  className="mt-3 w-full resize-y rounded-[18px] border border-[#DFC6F0] bg-white px-4 py-3 text-[15px] leading-[1.6] text-[#241A2A] shadow-[0_10px_24px_rgba(111,58,129,0.06)] outline-none transition focus:border-[#D47BFF] focus:ring-4 focus:ring-[#EADBF5]"
                />
              </label>

              {status === "error" && (
                <p className="rounded-[16px] border border-[#F0C6D4] bg-[#FFF6F8] px-4 py-3 text-[13px] font-semibold text-[#8A4B63]">
                  {error}
                </p>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!isValid || status === "sending"}
                  className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#3C083B] px-7 text-[15px] font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-55"
                >
                  {status === "sending" ? "A enviar..." : "Enviar email"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default function MenteesPage() {
  return (
    <div className="relative bg-[#F4F4F4]">
      <Header logoSrc={logoSymbol} />

      <main
        style={{ fontFamily: "Inter, sans-serif" }}
        className="bg-[#F4F4F4] text-[#1F1F1F] pt-14 sm:pt-16 lg:pt-18"
      >
        <section className="flex items-center text-center px-6 pb-10 pt-[108px] sm:px-10 lg:px-16 lg:pb-12 lg:pt-[118px]">
          <div className="mx-auto max-w-[1120px]">
            <div className="max-w-[860px]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#AA84BE]">
                Diretório de Mentees
              </p>

              <h1 className="mt-6 text-[36px] font-semibold leading-[0.98] tracking-[-0.03em] text-[#241A2A] sm:text-[54px] lg:text-[64px]">
                Encontra o {""}
                
                <span className="bg-gradient-to-r from-[#D47BFF] to-[#ff0080] bg-clip-text text-transparent">
                    perfil certo
                </span>
                <br />
                  para o teu próximo passo.
            </h1>

              <p className="mt-6 text-center text-[16px] leading-[1.7] text-[#5E5E5E] sm:text-[18px]">
                A Academia reúne mentoria com percursos distintos e complementares, oferecendo um ecossistema de mentoria completo, humano e estratégico.  Cada área foi estruturada para que pessoas, equipas e organizações encontrem exatamente o apoio de que precisam para crescer com clareza e impacto.

              </p>

                { /* <div className="mt-7 flex flex-wrap gap-2.5">
                <SoftBadge>3 perfis especializados</SoftBadge>
                <SoftBadge>Mobile first</SoftBadge>
                <SoftBadge>Componentes reutilizáveis</SoftBadge>
              </div>
                */}
            </div>
          </div>
        </section>

        <section className="px-6 pb-20 sm:px-10 sm:pb-24 lg:px-16 lg:pb-28">
          <div className="mx-auto max-w-[1120px]">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">
              {mentees.map((person) => (
                <MenteeCard key={person.id} person={person} />
              ))}
            </div>
          </div>
        </section>

        <MentorHelpRequestSection />
      </main>

      <Footer logoSrc={logoSymbol} />
    </div>
  );
}
