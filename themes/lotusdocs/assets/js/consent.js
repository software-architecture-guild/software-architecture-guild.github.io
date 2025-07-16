// 1. Consent mode configuration for Google (must run first, before any Google tags)
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
console.log("Consent default set"); // Add this line
gtag('consent', 'default', {
  'analytics_storage': 'denied',
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied'
});

// 2. Always load the Google Analytics (GA4) script
(function(){
  const gtagScript = document.createElement("script");
  gtagScript.async = true;
  gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-C8MGZDZY1J";
  document.head.appendChild(gtagScript);

  gtag("js", new Date());
  gtag("config", "G-C8MGZDZY1J");
})();

// 3. Helper functions to set/get cookies
function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}
function getCookie(name) {
  return document.cookie.split('; ').find(row => row.startsWith(name + '='))?.split('=')[1];
}

// 4. Consent banner and event handlers
document.addEventListener("DOMContentLoaded", function () {
  const consentBanner = document.getElementById("consent-banner");
  const manageCookiesLink = document.getElementById("manage-cookies-link");
  const consent = getCookie("cookieConsent");

  if (!consent) {
    consentBanner.classList.add("visible");
  }

  document.getElementById("accept-cookies").addEventListener("click", function () {
    setCookie("cookieConsent", "accepted", 365);
    updateConsent("granted");
    consentBanner.classList.remove("visible");
  });

  document.getElementById("decline-cookies").addEventListener("click", function () {
    setCookie("cookieConsent", "declined", 365);
    updateConsent("denied");
    consentBanner.classList.remove("visible");
  });

  manageCookiesLink.addEventListener("click", function (event) {
    event.preventDefault();
    consentBanner.classList.add("visible");
  });

  // On every page load, update consent mode according to the cookie
  if (consent === "accepted") {
    updateConsent("granted");
  } else if (consent === "declined") {
    updateConsent("denied");
  }
});

// 5. Function to update Google Consent Mode based on user's choice
function updateConsent(state) {
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('consent', 'update', {
    'analytics_storage': state,
    'ad_storage': state,
    'ad_user_data': state,
    'ad_personalization': state
  });
}