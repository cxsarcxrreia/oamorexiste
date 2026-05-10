import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MenteeCard from "../components/MenteeCard";
import { mentees } from "../data/mentees";
import logoSymbol from "../assets/Home/oamorexiste-logo.png";
import { buildBookingPath } from "../config/booking";

function SoftBadge({ children }) {
  return (
    <span className="inline-flex rounded-full border border-[#E6D1F3] bg-white/70 px-3 py-1.5 text-[12px] font-medium text-[#7B5A8A] backdrop-blur-sm">
      {children}
    </span>
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

        <section className="px-6 pb-20 sm:px-10 sm:pb-24 lg:px-16 lg:pb-28">
          <div className="mx-auto max-w-[1120px]">
            <div className="overflow-hidden rounded-[28px] border border-[#EADBF5] bg-white px-6 py-8 shadow-[0_16px_40px_rgba(110,30,140,0.06)] sm:px-8 sm:py-10 lg:flex lg:items-center lg:justify-between lg:px-10">
              <div className="max-w-[680px]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#A988B8]">
                  Próximo passo
                </p>

                <h2 className="mt-3 text-[30px] font-semibold leading-[1.05] text-[#2A2A2A] sm:text-[42px]">
                  Não sabes qual destes perfis faz mais sentido para ti?
                </h2>

                <p className="mt-4 text-[15px] leading-[1.7] text-[#5F5F5F] sm:text-[16px]">
                  Marca uma sessão e vamos ajudar-te a perceber qual o perfil que melhor se encaixa com as tuas necessidades, objetivos e desafios atuais.
                </p>
              </div>

              <div className="mt-7 lg:mt-0 lg:pl-8">
                <a
                  href={buildBookingPath({ source: "mentees-next-step" })}
                  className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#3C083B] px-7 text-[15px] font-semibold text-white transition hover:opacity-95"
                >
                  Marca a tua sessão!
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer logoSrc={logoSymbol} />
    </div>
  );
}
