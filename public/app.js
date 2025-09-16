// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// Pricing billing toggle
const billingButtons = document.querySelectorAll('[data-billing]');
billingButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const mode = btn.getAttribute('data-billing');
    document.querySelectorAll('.price').forEach((p) => {
      p.textContent = p.getAttribute(mode === 'annual' ? 'data-annual' : 'data-monthly');
    });
    billingButtons.forEach((b) => b.classList.toggle('btn-primary', b === btn));
  });
});

// Feedback form
const form = document.getElementById('feedback-form');
const statusEl = document.getElementById('feedback-status');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    statusEl.textContent = 'Sending...';
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Request failed');
      statusEl.textContent = 'Thank you! Your feedback was sent.';
      form.reset();
    } catch (err) {
      statusEl.textContent = 'Sorry, failed to send feedback. Please try again later.';
      console.error(err);
    }
  });
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

