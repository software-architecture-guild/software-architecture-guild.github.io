import * as params from "@params";

const gaID = typeof params.gaID === "string" ? params.gaID : "";

window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function gtag() {
  window.dataLayer.push(arguments);
};

window.gtag("consent", "default", {
  analytics_storage: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied"
});

if (gaID) {
  const gtagScript = document.createElement("script");
  gtagScript.async = true;
  gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaID)}`;
  document.head.appendChild(gtagScript);

  window.gtag("js", new Date());
  window.gtag("config", gaID);
}

function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

function getCookie(name) {
  return document.cookie.split("; ").find((row) => row.startsWith(`${name}=`))?.split("=")[1];
}

function updateConsent(state) {
  window.gtag("consent", "update", {
    analytics_storage: state,
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const consentBanner = document.getElementById("consent-banner");
  const manageCookiesLink = document.getElementById("manage-cookies-link");
  const acceptCookiesButton = document.getElementById("accept-cookies");
  const declineCookiesButton = document.getElementById("decline-cookies");
  const consent = getCookie("cookieConsent");

  if (consent === "accepted") {
    updateConsent("granted");
  } else if (consent === "declined") {
    updateConsent("denied");
  }

  if (!consentBanner || !acceptCookiesButton || !declineCookiesButton) {
    return;
  }

  if (!consent) {
    consentBanner.classList.add("visible");
  }

  acceptCookiesButton.addEventListener("click", function () {
    setCookie("cookieConsent", "accepted", 365);
    updateConsent("granted");
    consentBanner.classList.remove("visible");
  });

  declineCookiesButton.addEventListener("click", function () {
    setCookie("cookieConsent", "declined", 365);
    updateConsent("denied");
    consentBanner.classList.remove("visible");
  });

  if (manageCookiesLink) {
    manageCookiesLink.addEventListener("click", function (event) {
      event.preventDefault();
      consentBanner.classList.add("visible");
    });
  }
});
