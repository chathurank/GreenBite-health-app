// Contact & Feedback Form
const contactForm = document.getElementById('contact-form');
contactForm?.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  if (!name || !email.includes('@') || !message) {
    alert('Please fill out all fields with valid information.');
    return;
  }
  // Store feedback in localStorage
  let feedback = JSON.parse(localStorage.getItem('feedbacks') || '[]');
  feedback.push({ name, email, message, date: new Date().toISOString() });
  localStorage.setItem('feedbacks', JSON.stringify(feedback));
  alert('Thank you for your feedback!');
  contactForm.reset();
});

// FAQ Accordion
const faqs = [
  { q: "What is GreenBite?", a: "GreenBite is a wellness brand promoting healthy living." },
  { q: "How do I subscribe to the newsletter?", a: "Use the form at the bottom of the home page." },
  { q: "Is my data safe?", a: "We only store minimal data in your browser's localStorage." }
];
const accordion = document.querySelector('.accordion');
if (accordion) {
  faqs.forEach((faq, idx) => {
    const item = document.createElement('div');
    item.className = 'accordion-item';
    item.innerHTML = `<div class='accordion-title' data-idx='${idx}'>${faq.q}</div><div class='accordion-content'>${faq.a}</div>`;
    accordion.appendChild(item);
  });
  accordion.querySelectorAll('.accordion-title').forEach(title => {
    title.addEventListener('click', function() {
      const content = this.nextElementSibling;
      content.classList.toggle('active');
    });
  });
}
