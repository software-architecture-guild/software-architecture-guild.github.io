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

// Udemy 
// Define the function
function generateCouponUrl(baseUrl) {
  const now = new Date();
  const month = now.toLocaleString('en-US', { month: 'long' }).toUpperCase();
  const year = now.getFullYear();
  const couponCode = `${month}_${year}`;
  return `${baseUrl}/?couponCode=${couponCode}`;
}

// Expose it globally
window.generateCouponUrl = generateCouponUrl;