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

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
  // Enable smooth scrolling
  document.documentElement.style.scrollBehavior = 'smooth';
  
  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Reveal on scroll animation
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
      }
    });
  }, observerOptions);

  // Observe elements that should animate on scroll
  document.querySelectorAll('.health-tips, .card, .form-block, .results-block').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
});

// Hero auto-rotating slogans with enhanced animation
const slogans = [
  "Eat well, live well!",
  "Healthy habits, happy life.",
  "Nourish your body, nurture your mind.",
  "Small changes, big results.",
  "Wellness starts with you."
];
let sloganIdx = 0;
function rotateSlogan() {
  const heroQuote = document.getElementById('hero-quote');
  if (heroQuote) {
    heroQuote.style.opacity = '0';
    setTimeout(() => {
      heroQuote.textContent = slogans[sloganIdx];
      heroQuote.style.opacity = '1';
      sloganIdx = (sloganIdx + 1) % slogans.length;
    }, 300);
  }
}

// Start slogan rotation if on homepage
if (document.getElementById('hero-quote')) {
  setInterval(rotateSlogan, 4000);
  rotateSlogan();
}

// Health tip of the day (date-based)
const tips = [
  "Drink plenty of water throughout the day.",
  "Take a 10-minute walk every day.",
  "Eat more colorful fruits and vegetables.",
  "Practice mindful breathing for 5 minutes.",
  "Get 7-9 hours of quality sleep.",
  "Stand up and stretch every hour.",
  "Choose whole grains over refined ones."
];

const tipElement = document.getElementById('tip-of-the-day');
if (tipElement) {
  const now = new Date();
  const todayTip = tips[now.getDate() % tips.length];
  const dateString = now.toLocaleDateString(undefined, { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  tipElement.textContent = `${dateString}: ${todayTip}`;
}

// Enhanced newsletter subscription with better validation and localStorage
const newsletterForm = document.getElementById('newsletter-form');
newsletterForm?.addEventListener('submit', function(e) {
  e.preventDefault();
  const emailInput = document.getElementById('newsletter-email');
  const email = emailInput.value.trim();
  
  // Enhanced email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email) {
    showCustomAlert('Please enter your email address.', 'error');
    return;
  }
  
  if (!emailRegex.test(email)) {
    showCustomAlert('Please enter a valid email address.', 'error');
    return;
  }
  
  // Store in localStorage with timestamp
  const subscriptionData = {
    email: email,
    timestamp: new Date().toISOString(),
    subscribed: true
  };
  
  localStorage.setItem('newsletterSubscription', JSON.stringify(subscriptionData));
  showCustomAlert('Thank you for subscribing to our newsletter!', 'success');
  newsletterForm.reset();
});

// Custom alert function for better UX
function showCustomAlert(message, type = 'info') {
  // Remove existing alerts
  document.querySelectorAll('.custom-alert').forEach(alert => alert.remove());
  
  const alertDiv = document.createElement('div');
  alertDiv.className = `custom-alert alert-${type}`;
  alertDiv.textContent = message;
  
  alertDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#009C4D' : type === 'error' ? '#e74c3c' : '#3498db'};
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1000;
    font-family: var(--font-family, Arial, sans-serif);
    font-weight: 500;
    opacity: 0;
    transform: translateX(100px);
    transition: all 0.3s ease;
    max-width: 300px;
    word-wrap: break-word;
  `;
  
  document.body.appendChild(alertDiv);
  
  // Animate in
  setTimeout(() => {
    alertDiv.style.opacity = '1';
    alertDiv.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 4 seconds
  setTimeout(() => {
    alertDiv.style.opacity = '0';
    alertDiv.style.transform = 'translateX(100px)';
    setTimeout(() => alertDiv.remove(), 300);
  }, 4000);
}

// Export for use in other modules
window.showCustomAlert = showCustomAlert;
