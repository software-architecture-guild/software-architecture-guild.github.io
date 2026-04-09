// Menu sticky
function windowScroll() {
    const navbar = document.getElementById("topnav");
    if(navbar!=null){
        if (
            document.body.scrollTop >= 50 ||
            document.documentElement.scrollTop >= 50
        ) {
            navbar.classList.add("nav-sticky");
        } else {
            navbar.classList.remove("nav-sticky");
        }
    }
}

window.addEventListener('scroll', (ev) => {
    ev.preventDefault();
    windowScroll();
})

// Toggle menu
function toggleMenu() {
    document.getElementById('isToggle').classList.toggle('open');
    var isOpen = document.getElementById('navigation')
    if (isOpen.style.display === "block") {
        isOpen.style.display = "none";
    } else {
        isOpen.style.display = "block";
    }
};

// Build course URL with monthly coupon while preserving existing params
function generateCouponUrl(sourceUrl) {
  const now = new Date();
  const month = now.toLocaleString('en-US', { month: 'long' }).toUpperCase();
  const year = now.getFullYear();
  const couponCode = `${month}_${year}`;

  try {
    const url = new URL(sourceUrl);
    url.searchParams.set('couponCode', couponCode);
    return url.toString();
  } catch (error) {
    const hashIndex = sourceUrl.indexOf('#');
    const hash = hashIndex === -1 ? '' : sourceUrl.slice(hashIndex);
    const baseWithoutHash = hashIndex === -1 ? sourceUrl : sourceUrl.slice(0, hashIndex);
    const queryIndex = baseWithoutHash.indexOf('?');
    const path = queryIndex === -1 ? baseWithoutHash : baseWithoutHash.slice(0, queryIndex);
    const query = queryIndex === -1 ? '' : baseWithoutHash.slice(queryIndex + 1);
    const params = new URLSearchParams(query);
    params.set('couponCode', couponCode);
    const nextQuery = params.toString();
    return nextQuery ? `${path}?${nextQuery}${hash}` : `${path}${hash}`;
  }
}

// Expose it globally
window.generateCouponUrl = generateCouponUrl;
