// Mobile nav
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close mobile menu when clicking a nav link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// Scroll reveal animation
const revealElements = document.querySelectorAll(".fade-up, .reveal");

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.88;

  revealElements.forEach((element) => {
    const rect = element.getBoundingClientRect();

    if (rect.top < triggerBottom) {
      element.classList.add("show");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// FAQ glass accordion
const faqGlassItems = document.querySelectorAll(".faq-glass-item");

faqGlassItems.forEach((item) => {
  const button = item.querySelector(".faq-glass-question");
  const answer = item.querySelector(".faq-glass-answer");

  button.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    faqGlassItems.forEach((faq) => {
      faq.classList.remove("active");
      faq.querySelector(".faq-glass-answer").style.maxHeight = null;
    });

    if (!isActive) {
      item.classList.add("active");
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});