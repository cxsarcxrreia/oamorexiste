import React, { useState } from "react";

const CONSENT_COOKIE = "oamorexiste_cookie_consent";
const PRESENCE_COOKIE = "oamorexiste_presence";
const CONSENT_MAX_AGE = 60 * 60 * 24 * 180;

function getCookieValue(name) {
  if (typeof document === "undefined") return "";

  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.split("=").slice(1).join("=")) : "";
}

function getCookieSuffix({ maxAge } = {}) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  const age = Number.isFinite(maxAge) ? `; Max-Age=${maxAge}` : "";

  return `; Path=/; SameSite=Lax${age}${secure}`;
}

function setCookie(name, value, options) {
  document.cookie = `${name}=${encodeURIComponent(value)}${getCookieSuffix(options)}`;
}

function deleteCookie(name) {
  document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax`;
}

export default function CookieConsentBanner() {
  const [consent, setConsent] = useState(() => getCookieValue(CONSENT_COOKIE));

  if (consent) return null;

  const acceptCookies = () => {
    setCookie(CONSENT_COOKIE, "accepted", { maxAge: CONSENT_MAX_AGE });
    setCookie(PRESENCE_COOKIE, "present");
    setConsent("accepted");
  };

  const declineCookies = () => {
    setCookie(CONSENT_COOKIE, "declined", { maxAge: CONSENT_MAX_AGE });
    deleteCookie(PRESENCE_COOKIE);
    setConsent("declined");
  };

  return (
    <section
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-[80] px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="mx-auto max-w-[920px] overflow-hidden rounded-[24px] border border-[#EADBF5] bg-white/95 px-5 py-5 text-[#241A2A] shadow-[0_18px_55px_rgba(60,8,59,0.16)] backdrop-blur-xl sm:flex sm:items-center sm:justify-between sm:gap-6 sm:px-6">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#8E68A4]">
            Cookies
          </p>
          <p className="mt-2 text-[14px] leading-[1.65] text-[#5F5F68] sm:text-[15px]">
            Usamos cookies essenciais para guardar esta escolha. Com a tua
            autorização, guardamos também um cookie de sessão simples para saber
            que estiveste presente no site. Não usamos cookies de publicidade.
          </p>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:mt-0 sm:w-[260px] sm:shrink-0">
          <button
            type="button"
            onClick={acceptCookies}
            className="inline-flex min-h-[46px] items-center justify-center rounded-full bg-[#3C083B] px-5 text-[14px] font-semibold text-white transition hover:bg-[#4E1150]"
          >
            Aceitar
          </button>
          <button
            type="button"
            onClick={declineCookies}
            className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-[#E1CBEF] bg-[#FBF6FF] px-5 text-[14px] font-semibold text-[#6F3A81] transition hover:bg-[#F6EEFC]"
          >
            Recusar
          </button>
        </div>
      </div>
    </section>
  );
}
