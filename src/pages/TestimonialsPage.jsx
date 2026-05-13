import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import logoSymbol from "../assets/Home/oamorexiste-logo.png";
import LaurelIcon from "../assets/Home/pink-award-sign.png";
import { buildBookingPath } from "../config/booking";

function StarRow() {
  return (
    <div className="flex items-center gap-1 text-[#D47BFF]">
      <span>★</span>
      <span>★</span>
      <span>★</span>
      <span>★</span>
      <span>★</span>
    </div>
  );
}

const testimonials = [
  {
    id: 1,
    mentor: "Sandra Isabel Correia",
    quote: "A Sandra não me ensinou apenas a liderar, ensinou-me a ver.",
    body:
      "A mentoria com a Sandra foi um ponto de viragem. Eu cheguei com dúvidas, cansaço e falta de direção. Saí com clareza, foco e uma visão que nunca tinha conseguido formular sozinha. A forma como ela une estratégia, humanidade e consciência é única. Senti-me vista, ouvida e desafiada a crescer de forma alinhada.",
    author: "Ana M.",
    role: "Empreendedora",
  },
  {
    id: 2,
    mentor: "Sandra Isabel Correia",
    quote:
      "Pela primeira vez, senti que alguém entendia o meu negócio e a minha alma ao mesmo tempo.",
    body:
      "A Sandra tem uma capacidade rara de juntar estratégia prática com profundidade humana. Não é só sobre o que fazer, é sobre quem somos enquanto fazemos. Ajudou-me a reposicionar o meu projeto, a ganhar confiança e a entrar num novo mercado com segurança.",
    author: "Ricardo F.",
    role: "Fundador de Start-up",
  },
  {
    id: 3,
    mentor: "Sandra Isabel Correia",
    quote: "A Sandra abriu portas que eu nem sabia que existiam.",
    body:
      "Eu procurava orientação para internacionalizar o meu trabalho, mas recebi muito mais do que isso. Recebi visão, estrutura, coragem e um plano claro. A Sandra tem uma leitura global e humana que transforma qualquer projeto. Hoje estou presente em dois novos mercados graças ao processo que fiz com ela.",
    author: "Joana L.",
    role: "Criadora e Consultora",
  },
  {
    id: 4,
    mentor: "Maria Caeiro",
    quote: "A Maria ajudou-me a tornar-me a líder que sempre quis ser.",
    body:
      "Eu sabia liderar processos, mas não sabia liderar pessoas. A Maria trouxe-me consciência, ferramentas e uma nova forma de olhar para a minha equipa. Hoje comunico melhor, decido com mais calma e consigo criar um ambiente de trabalho mais leve e produtivo.",
    author: "Joana P.",
    role: "Team Leader",
  },
  {
    id: 5,
    mentor: "Maria Caeiro",
    quote: "A Maria é o equilíbrio perfeito entre firmeza e carinho.",
    body:
      "Ela desafia, mas com amor. Confronta, mas com respeito. Acompanha, mas sem criar dependência. Cresci como profissional e como pessoa.",
    author: "Marta V.",
    role: "Diretora Comercial",
  },
  {
    id: 6,
    mentor: "Carla Rosa",
    quote: "A Carla vê o que está desalinhado em segundos, e resolve.",
    body:
      "Eu estava a lidar com falhas constantes nos processos internos e não sabia por onde começar. A Carla identificou rapidamente os pontos críticos, ajudou-me a reorganizar fluxos e a implementar rotinas que mudaram completamente o desempenho da equipa.",
    author: "Inês R.",
    role: "Gestora de Qualidade",
  },
  {
    id: 7,
    mentor: "Carla Rosa",
    quote: "A Carla é rigor, ética e humanidade, tudo no equilíbrio certo.",
    body:
      "O que mais me marcou foi a forma como ela combina exigência com empatia. Senti-me apoiada, desafiada e valorizada. Cresci como profissional e como líder.",
    author: "Joana C.",
    role: "Diretora de Operações",
  },
  {
    id: 8,
    mentor: "Teresa Franco",
    quote: "A Teresa trouxe ordem, clareza e leveza ao meu negócio.",
    body:
      "Eu estava completamente perdida entre papéis, pagamentos, fornecedores e tarefas que nunca mais acabavam. A Teresa entrou com uma calma e uma organização que me transformaram. Hoje tenho processos claros, controlo financeiro e tempo para me dedicar ao que realmente importa.",
    author: "Mariana F.",
    role: "Empreendedora",
  },
  {
    id: 9,
    mentor: "Teresa Franco",
    quote: "Com a Teresa, finalmente sinto que o meu negócio está sólido.",
    body:
      "Eu sempre tive medo da parte financeira. A Teresa explicou tudo de forma simples, prática e sem julgamentos. Criámos um sistema que me permite tomar decisões com segurança e prever o futuro do meu negócio.",
    author: "Rui P.",
    role: "Proprietário de PME",
  },
];

function TestimonialCard({ item }) {
  return (
    <article className="group flex h-full flex-col rounded-[24px] border border-[#EADBF5] bg-white p-5 text-left shadow-[0_12px_30px_rgba(110,30,140,0.06)] transition duration-300 hover:-translate-y-1 hover:scale-[1.015] hover:shadow-[0_18px_42px_rgba(110,30,140,0.12)] sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="inline-flex rounded-full border border-[#DFC6F0] bg-[#FBF6FF] px-3 py-1.5 text-[11px] font-semibold leading-none text-[#6F3A81] shadow-[0_10px_24px_rgba(111,58,129,0.08)]">
          {item.mentor}
        </div>

        <div className="shrink-0">
          <StarRow />
        </div>
      </div>

      <h3 className="mt-5 text-[22px] font-medium leading-[1.15] text-[#252525] sm:text-[24px]">
        “{item.quote}”
      </h3>

      <p className="mt-4 flex-1 text-[14px] leading-[1.72] text-[#656565]">
        {item.body}
      </p>

      <div className="mt-6 border-t border-[#F0E6F7] pt-4">
        <p className="text-[15px] font-semibold text-[#2A2A2A]">{item.author}</p>
        <p className="mt-1 text-[12px] font-medium uppercase tracking-[0.12em] text-[#9B8AA5]">
          {item.role}
        </p>
      </div>
    </article>
  );
}

export default function TestimonialsPage() {
  return (
      <div className="relative bg-[#F4F4F4] pt-14 sm:pt-16 lg:pt-18">
        <Header logoSrc={logoSymbol} />
  
        <main
          style={{ fontFamily: "Inter, sans-serif" }}
          className="bg-[#F4F4F4] text-[#1F1F1F]"
        >
        {/* TESTIMONIALS */}
        <section className="px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-[1120px] text-center">
            <img src={LaurelIcon} alt="Laurel Icon" className="mx-auto h-[72px] w-[110px]" />

            <div className="mt-3 text-[18px] tracking-[0.35em] text-[#DD9CFF]">
            ★★★★★
            </div>

            <h2 className="mt-6 text-[36px] font-semibold leading-[0.98] tracking-[-0.03em] text-[#241A2A] sm:text-[54px] lg:text-[64px]">
            Qual é a experiência 
            <br />
            dos nossos{" "}
            <span className="bg-gradient-to-r from-[#D47BFF] to-[#ff0080] bg-clip-text text-transparent">
                mentees?
            </span>
            </h2>

            <p className="mx-auto mt-5 max-w-[760px] text-[15px] leading-[1.75] text-[#6B6B6B] sm:text-[16px]">
            Testemunhos reais de pessoas e projetos acompanhados com estratégia,
            clareza, humanidade e direção.
            </p>

            <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 lg:mt-16 lg:gap-6">
            {testimonials.map((item) => (
                <TestimonialCard key={item.id} item={item} />
            ))}
            </div>
        </div>
        </section>     

        <section className="px-6 pb-20 sm:px-10 sm:pb-24 lg:px-16 lg:pb-28">
            <div className="mx-auto max-w-[1120px]">
                <div
                className="
                    relative /* Required for background positioning */
                    overflow-hidden rounded-[28px] border border-[#EADBF5] bg-white
                    px-6 py-8 shadow-[0_16px_40px_rgba(110,30,140,0.06)]
                    sm:px-8 sm:py-10
                    lg:flex lg:items-center lg:justify-between lg:px-10
                    /* Expandable/Elevation Hover Effects */
                    transition-all duration-300 ease-in-out
                    hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(110,30,140,0.12)]
                "
                >
                {/* The Very Slight Pink Radial Blur Element
                    Offset heavily bottom-left, large blur radius, low opacity.
                    pointer-events-none ensures it doesn't interfere with mouse interaction.
                */}
                <div
                    className="
                    pointer-events-none absolute -bottom-1/2 -left-1/2
                    h-[120%] w-[120%]
                    rounded-full
                    bg-[radial-gradient(circle_at_center,rgba(233,208,245,0.7)_0%,transparent_70%)]
                    blur-[100px]
                    opacity-80
                    z-0
                    "
                />

                {/* Content wrapper to ensure it stays above the glow */}
                <div className="relative z-10 max-w-[680px]">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#A988B8]">
                    Próximo passo
                    </p>

                    <h2 className="mt-3 text-[30px] font-semibold leading-[1.05] text-[#2A2A2A] sm:text-[42px]">
                    Queres viver esta experiência na primeira pessoa?
                    </h2>

                    <p className="mt-4 text-[15px] leading-[1.7] text-[#5F5F5F] sm:text-[16px]">
                    Marca a tua sessão de mentoria e junta-te à comunidade de pessoas,
                    equipas e organizações que estão a crescer com consciência, clareza e
                    impacto.
                    </p>
                </div>

                <div className="relative z-10 mt-7 lg:mt-0 lg:pl-8">
                    <a
                    href={buildBookingPath({ source: "testimonials-next-step" })}
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
