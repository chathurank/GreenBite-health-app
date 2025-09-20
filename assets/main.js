// Navbar hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

navLinks?.addEventListener('click', (e) => {
  const target = e.target;
  if (target && target.tagName === 'A' && navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
    hamburger?.setAttribute('aria-expanded', 'false');
  }
});

// Hero auto-rotating slogans
const slogans = [
  "Eat well, live well!",
  "Healthy habits, happy life.",
  "Nourish your body, nurture your mind.",
  "Small changes, big results.",
  "Wellness starts with you."
];
let sloganIdx = 0;
function rotateSlogan() {
  document.getElementById('hero-quote').textContent = slogans[sloganIdx];
  sloganIdx = (sloganIdx + 1) % slogans.length;
}
setInterval(rotateSlogan, 3000);
rotateSlogan();

// Health tip of the day (date-based)
const tips = [
  "Drink plenty of water.",
  "Take a walk every day.",
  "Eat more fruits and veggies.",
  "Practice mindful breathing.",
  "Get enough sleep."
];
const now = new Date();
const todayTip = tips[now.getDate() % tips.length];
const dateString = now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
document.getElementById('tip-of-the-day').textContent = `${dateString}: ${todayTip}`;

// Newsletter subscription
const newsletterForm = document.getElementById('newsletter-form');
newsletterForm?.addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('newsletter-email').value;
  if (email && email.includes('@')) {
    localStorage.setItem('newsletterEmail', email);
    alert('Thank you for subscribing!');
    newsletterForm.reset();
  } else {
    alert('Please enter a valid email address.');
  }
});
