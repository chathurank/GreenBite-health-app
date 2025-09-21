// Enhanced Contact & Feedback Form with better validation
const contactForm = document.getElementById('contact-form');
contactForm?.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();
  
  // Reset any previous error styles
  [nameInput, emailInput, messageInput].forEach(input => {
    input.classList.remove('field-error-input');
  });
  
  // Validation
  let hasErrors = false;
  
  if (!name || name.length < 2) {
    showFieldError(nameInput, 'Name must be at least 2 characters long.');
    hasErrors = true;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    showFieldError(emailInput, 'Please enter a valid email address.');
    hasErrors = true;
  }
  
  if (!message || message.length < 10) {
    showFieldError(messageInput, 'Message must be at least 10 characters long.');
    hasErrors = true;
  }
  
  if (hasErrors) {
    return;
  }
  
  // Store feedback in localStorage with enhanced data
  let feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
  const newFeedback = {
    id: Date.now(),
    name: name,
    email: email,
    message: message,
    timestamp: new Date().toISOString(),
    status: 'unread'
  };
  
  feedbacks.push(newFeedback);
  localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
  
  // Show success message with custom alert
  if (typeof window.showCustomAlert === 'function') {
    window.showCustomAlert('Thank you for your feedback! We will get back to you soon.', 'success');
  } else {
    alert('Thank you for your feedback!');
  }
  
  contactForm.reset();
});

// Enhanced error display function
function showFieldError(field, message) {
  field.classList.add('field-error-input');
  
  // Remove existing error messages
  const existingError = field.parentNode.querySelector('.field-error');
  if (existingError) {
    existingError.remove();
  }
  
  // Add new error message
  const errorDiv = document.createElement('div');
  errorDiv.className = 'field-error';
  errorDiv.textContent = message;
  
  field.parentNode.appendChild(errorDiv);
  
  // Remove error on focus
  field.addEventListener('focus', function() {
    field.classList.remove('field-error-input');
    errorDiv.remove();
  }, { once: true });
}

// Enhanced FAQ Accordion with animations
const faqs = [
  { 
    q: "What is GreenBite?", 
    a: "GreenBite is a comprehensive wellness platform that promotes healthy living through balanced nutrition, regular exercise, and mindfulness practices. We provide tools and resources to help you achieve your health and wellness goals." 
  },
  { 
    q: "How do I subscribe to the newsletter?", 
    a: "You can subscribe to our newsletter using the form at the bottom of any page. Simply enter your email address and click 'Subscribe'. You'll receive weekly health tips, recipes, and wellness advice." 
  },
  { 
    q: "Is my data safe with GreenBite?", 
    a: "Yes, your privacy is important to us. We only store minimal data in your browser's localStorage for functionality purposes. We do not collect or share personal information with third parties." 
  },
  {
    q: "Can I use GreenBite on mobile devices?",
    a: "Absolutely! GreenBite is fully responsive and works seamlessly on all devices including smartphones, tablets, and desktops. You can also install it as a Progressive Web App (PWA) for an app-like experience."
  },
  {
    q: "Are the recipes suitable for special diets?",
    a: "Our recipe collection includes options for various dietary preferences. You can use the filter feature to find recipes that match your specific dietary needs and preferences."
  }
];

const accordion = document.querySelector('.accordion');
if (accordion) {
  faqs.forEach((faq, idx) => {
    const item = document.createElement('div');
    item.className = 'accordion-item';
    item.innerHTML = `
      <div class='accordion-title' data-idx='${idx}' role='button' tabindex='0' aria-expanded='false'>
        ${faq.q}
        <span class='accordion-icon'>+</span>
      </div>
      <div class='accordion-content' id='content-${idx}' aria-hidden='true'>${faq.a}</div>
    `;
    accordion.appendChild(item);
  });
  
  // Enhanced accordion functionality with keyboard support
  accordion.querySelectorAll('.accordion-title').forEach(title => {
    title.addEventListener('click', toggleAccordion);
    title.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleAccordion.call(this);
      }
    });
  });
}

function toggleAccordion() {
  const content = this.nextElementSibling;
  const icon = this.querySelector('.accordion-icon');
  const isActive = content.classList.contains('active');
  
  // Close all other accordions
  accordion.querySelectorAll('.accordion-content').forEach(c => {
    c.classList.remove('active');
    c.setAttribute('aria-hidden', 'true');
  });
  
  accordion.querySelectorAll('.accordion-title').forEach(t => {
    t.setAttribute('aria-expanded', 'false');
    const i = t.querySelector('.accordion-icon');
    if (i) i.textContent = '+';
  });
  
  // Toggle current accordion
  if (!isActive) {
    content.classList.add('active');
    content.setAttribute('aria-hidden', 'false');
    this.setAttribute('aria-expanded', 'true');
    icon.textContent = '−';
  }
}

// Contact page functionality
document.addEventListener('DOMContentLoaded', function() {
  // Contact form is already handled above
  console.log('Contact page loaded successfully');
});
