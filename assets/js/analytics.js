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

const SUBSTACK_HOST_FRAGMENT = "substack.com";
const UDEMY_HOST_FRAGMENT = "udemy.com";

function normalizeTrackParamKey(key) {
    return key
        .replace(/^trackParam/, "")
        .replace(/^[A-Z]/, function (char) {
            return char.toLowerCase();
        })
        .replace(/[A-Z]/g, function (char) {
            return "_" + char.toLowerCase();
        });
}

function getTrackParams(element) {
    const params = {};

    Object.entries(element.dataset).forEach(function ([key, value]) {
        if (!key.startsWith("trackParam") || !value) {
            return;
        }

        const paramKey = normalizeTrackParamKey(key);

        if (paramKey) {
            params[paramKey] = value;
        }
    });

    return params;
}

function getTrackLabel(element) {
    if (element.dataset.trackLabel) {
        return element.dataset.trackLabel;
    }

    return (element.textContent || "").trim().replace(/\s+/g, " ");
}

function getLinkUrl(element) {
    const href = element.getAttribute("href");

    if (!href) {
        return null;
    }

    try {
        return new URL(href, window.location.origin);
    } catch (_error) {
        return null;
    }
}

function buildEventPayload(element, extraParams) {
    const payload = Object.assign({}, getTrackParams(element), extraParams || {});
    const linkUrl = getLinkUrl(element);
    const label = getTrackLabel(element);

    if (element.dataset.trackCategory) {
        payload.event_category = element.dataset.trackCategory;
    }

    if (label) {
        payload.event_label = label;
    }

    if (linkUrl) {
        payload.link_url = linkUrl.toString();
    }

    return payload;
}

function trackElementEvent(element, eventName, extraParams) {
    window.trackEvent(eventName, buildEventPayload(element, extraParams));
}

function trackGuideNavigation(link, navigationSurface, extraParams) {
    const payload = Object.assign({ navigation_surface: navigationSurface }, extraParams || {});
    trackElementEvent(link, "guide_navigation_click", payload);
}

function maybeTrackOutboundDestination(link) {
    const linkUrl = getLinkUrl(link);

    if (!linkUrl) {
        return false;
    }

    const hostname = linkUrl.hostname.toLowerCase();

    if (hostname.includes(SUBSTACK_HOST_FRAGMENT)) {
        trackElementEvent(link, "substack_outbound_click", {
            destination_platform: "substack",
            destination_host: hostname
        });
        return true;
    }

    if (hostname.includes(UDEMY_HOST_FRAGMENT)) {
        trackElementEvent(link, "udemy_outbound_click", {
            destination_platform: "udemy",
            destination_host: hostname
        });
        return true;
    }

    return false;
}

document.addEventListener("click", function (event) {
    const element = event.target.closest("[data-track-event]");

    if (element) {
        trackElementEvent(element, element.dataset.trackEvent);
        return;
    }

    const link = event.target.closest("a[href]");

    if (!link) {
        return;
    }

    if (maybeTrackOutboundDestination(link)) {
        return;
    }

    if (link.matches("#sidebar a.sidebar-root-link, #sidebar a.sidebar-nested-link")) {
        trackGuideNavigation(link, "sidebar");
        return;
    }

    if (link.matches("#doc-nav a")) {
        trackGuideNavigation(link, "doc_nav", {
            nav_direction: link.closest(".doc-prev") ? "next" : "previous"
        });
        return;
    }

    if (link.matches("#breadcrumbs a")) {
        trackGuideNavigation(link, "breadcrumb");
    }
});
