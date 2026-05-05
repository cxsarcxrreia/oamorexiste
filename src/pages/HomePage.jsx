import React from "react";
//import "./App.css";
import logoSymbol from "../assets/Home/oamorexiste-logo.png";
import Header from "../components/Header";
import Footer from "../components/Footer";
//import heroBackground from "../assets/Home/extended-sandra-w-logo.png";
import teresaFrancoImg from "../assets/Home/teresa-franco-v2.jpg";
import mariaCaeiroImg from "../assets/Home/maria-caeiro.jpg";
import carlaRosaImg from "../assets/Home/carla-rosa-v2.png";
import sandraHeroImg from "../assets/Home/sandra-isabel.jpg";
import FounderTrustCard from "../components/FounderTrustCard";
import HomeTestimonialsCarousel from "../components/HomeTestimonialsCarousel";
import HomeHeroParallax from "../components/HomeHeroParallax";
import LaurelIcon from "../assets/Home/pink-award-sign.png";

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

const mentors = [
  {
    id: 1,
    name: "Teresa Franco",
    role: "BUSINESS EXPERT",
    description:
      "Especialista em organização financeira, a Teresa traz ordem e eficiência aos processos internos. Com 20 anos de experiência, domina o controlo de tesouraria, gestão de fornecedores e logística operacional. É a parceira ideal para empreendedores que precisam de uma base operacional segura e decisões financeiras informadas.",
    image: teresaFrancoImg,
  },
  {
    id: 2,
    name: "Maria Caeiro",
    role: "BUSINESS EXPERT",
    description:
      "Especialista em liderança humanizada e startups, une estratégia e inteligência relacional para transformar equipas. Com foco em planos de negócio e marketing, ajuda empreendedores a criar estruturas organizadas e conscientes. É a escolha ideal para quem procura clareza e evolução humana em contextos de crescimento acelerado.",
    image: mariaCaeiroImg,
  },
  {
    id: 3,
    name: "Carla Rosa",
    role: "BUSINESS EXPERT",
    description:
      "Com mais de 20 anos de experiência em engenharia e consultoria sénior, foca na otimização de processos e liderança ética. Especialista em estruturar sistemas complexos e decisões técnicas, traz o rigor necessário para equipas que procuram máxima eficiência operacional, segurança e clareza na gestão de sistemas integrados.",
    image: carlaRosaImg,
  },
];

function Pill({ children }) {
  return (
    <span className="inline-flex rounded-full border border-white/70 px-3 py-1 text-[11px] font-medium text-white/95 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] backdrop-blur-sm">
      {children}
    </span>
  );
}

const sandraFounder = {
  name: "Sandra Isabel Correia",
  roles: "Mentora, Speaker Motivacional e Mulher de Negócios",
  image: sandraHeroImg,
  summary:
    "Reconhecida nacional e internacionalmente pelo seu contributo para o empreendedorismo e inovação, lidera a Academia #oamorexiste com uma abordagem estratégica, humana e orientada para impacto.",
  credentialBadges: [
    {
      shortLabel: "Melhor Empresária da Europa",
      longLabel:
        "Distinguida como “Melhor Empresária da Europa” pelo Parlamento Europeu em 2011",
    },
    {
      shortLabel: "Melhor Mulher de Negócios Internacional",
      longLabel:
        "Reconhecida como “Melhor Mulher de Negócios Internacional” pelos EUA em 2016",
    },
    {
      shortLabel: "Experiência internacional",
      longLabel:
        "Selecionada para a cimeira internacional “A New Beginning”, criada pelo Presidente Obama, em 2013",
    },
  ],
};

function CheckBadge() {
  return (
    <div className="absolute bottom-4 right-4 flex h-5 w-5 items-center justify-center rounded-full bg-white/95">
      <svg
        viewBox="0 0 20 20"
        className="h-3.5 w-3.5 text-[#C83BFF]"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-7.2 7.2a1 1 0 01-1.414 0l-3.1-3.1a1 1 0 011.414-1.414l2.393 2.393 6.493-6.493a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}

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

function MentorCard({ mentor, reverse = false }) {
  return (
    <article
      className={`grid items-center gap-8 lg:gap-12 ${
        reverse ? "md:grid-cols-[1fr_440px]" : "md:grid-cols-[440px_1fr]"
      }`}
    >
      <div
        className={`group overflow-hidden rounded-[18px] shadow-[0_18px_45px_rgba(110,30,140,0.16)] transition duration-300 ${
          reverse ? "md:order-2" : ""
        }`}
      >
        <img
          src={mentor.image}
          alt={mentor.name}
          className="h-[420px] w-full object-cover transition duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>

      <div className={`${reverse ? "md:order-1" : ""}`}>
        <h3 className="text-[28px] font-medium leading-none text-[#242424] sm:text-[38px]">
          {mentor.name}
        </h3>

        <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A4A4A4]">
          {mentor.role}
        </p>

        <p className="mt-5 max-w-[470px] text-[13px] font-medium leading-[1.5] text-[#191919]">
          {mentor.description}
        </p>

        <button
          type="button"
          className="mt-6 !inline-flex min-h-[38px] items-center !justify-center !rounded-full !bg-[#3C083B] px-5 !text-[12px] font-semibold text-white shadow-[0_18px_45px_rgba(110,30,140,0.16)] transition-all duration-300 ease-out hover:scale-[1.02] hover:!bg-[#511051] hover:shadow-[0_22px_50px_rgba(110,30,140,0.22)]"
        >
          Marca a tua sessão!
        </button>

        <a
          href="/mentees"
          className="ml-4 !inline-flex min-h-[38px] items-center !rounded-full !border !border-[#DFC6F0] !bg-[#FBF6FF] !px-4 !py-2 !text-[12px] font-bold leading-[1.25] text-[#6F3A81] shadow-[0_10px_24px_rgba(111,58,129,0.10)] transition-all duration-300 ease-out hover:scale-[1.02] hover:!border-[#D3AFE9] hover:!bg-[#F7EEFD] hover:text-[#5E2F73] hover:shadow-[0_14px_30px_rgba(111,58,129,0.14)]"
        >
          Saber Mais!
        </a>
      </div>
    </article>
  );
}

export default function Home() {
  return (
     <div className="relative bg-[#F4F4F4]">
      <Header logoSrc={logoSymbol} />
   
    {/*"mt-6 text-[40px] font-semibold leading-[0.98] tracking-[-0.03em] text-[#241A2A] sm:text-[56px] lg:text-[74px]">*/}
    <main style={{ fontFamily: "Inter, sans-serif" }} className="bg-[#F4F4F4] text-[#1F1F1F]">
      {/* HERO */}
      <HomeHeroParallax />

      <section className="px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-[1120px]">
            <div className="mb-8 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A38AAE]">
                A fundadora
            </p>

            <h2 className="mt-6 text-[36px] font-semibold leading-[0.98] tracking-[-0.03em] text-[#241A2A] sm:text-[54px] lg:text-[64px]">
                Quem está por trás da {" "}
                <span className="bg-gradient-to-r from-[#D47BFF] to-[#ff0080] bg-clip-text text-transparent">
                    visão
                </span>
            </h2>
            
            </div>

            <FounderTrustCard person={sandraFounder} />
        </div>
        </section>

      {/* TESTIMONIALS */}
    <section className="px-6  sm:px-10 lg:px-16 ">
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
        Histórias reais de transformação, clareza e crescimento através de uma mentoria com direção humana e estratégica.
        </p>

        <HomeTestimonialsCarousel testimonials={testimonials} />
    </div>
    </section>

      {/* MENTORS */}
      <section className="px-6 pb-24 sm:px-10 lg:px-16 lg:pb-28 py-36">
        <div className="mx-auto max-w-[1120px]">
          <h2 className="mt-6 text-center text-[36px] font-semibold leading-[0.98] tracking-[-0.03em] text-[#241A2A] sm:text-[54px] lg:text-[64px]">
            Conhece os nossos{" "}
            <span className="bg-gradient-to-r from-[#D47BFF] to-[#ff0080] bg-clip-text text-transparent">
                mentores!
            </span>
          </h2>

          <div className="mt-14 space-y-16 lg:mt-16 lg:space-y-24">
            <MentorCard mentor={mentors[0]} />
            <MentorCard mentor={mentors[1]} reverse />
            <MentorCard mentor={mentors[2]} />
          </div>
        </div>
      </section>      
    </main>
    <Footer logoSrc={logoSymbol} />
    </div>
  );
}
