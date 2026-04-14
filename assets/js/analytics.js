// Keep analytics calls behind one helper so templates do not depend on gtag directly.
window.trackEvent = function trackEvent(name, params) {
    if (!name) {
        return false;
    }

    const eventParams = params && typeof params === "object" ? params : {};
    const gtag = typeof window.gtag === "function"
        ? window.gtag
        : function () {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push(arguments);
        };

    gtag("event", name, eventParams);

    return true;
};

window.guildAnalytics = window.guildAnalytics || {};
window.guildAnalytics.trackEvent = window.trackEvent;
