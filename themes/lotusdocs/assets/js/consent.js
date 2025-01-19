// Set a cookie
function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  }
  
  // Get a cookie
  function getCookie(name) {
    return document.cookie.split('; ').find(row => row.startsWith(name + '='))?.split('=')[1];
  }
  
  // Initialize the consent banner
  document.addEventListener("DOMContentLoaded", function () {
    const consentBanner = document.getElementById("consent-banner");
    const consent = getCookie("cookieConsent");
  
    if (consent === "accepted") {
      enableAnalytics();
    } else if (!consent) {
      consentBanner.classList.add("visible"); // Show the banner only if no consent is stored
    }
  
    document.getElementById("accept-cookies").addEventListener("click", function () {
      setCookie("cookieConsent", "accepted", 365);
      enableAnalytics();
      consentBanner.classList.remove("visible"); // Hide the banner
    });
  
    document.getElementById("decline-cookies").addEventListener("click", function () {
      setCookie("cookieConsent", "declined", 365);
      consentBanner.classList.remove("visible"); // Hide the banner
    });
  });
  
  // Enable Google Analytics
  function enableAnalytics() {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "G-C8MGZDZY1J");
  
    const gtagScript = document.createElement("script");
    gtagScript.async = true;
    gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-C8MGZDZY1J";
    document.head.appendChild(gtagScript);
  }
  