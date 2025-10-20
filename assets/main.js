function setupMobileMenu() {
  const toggle = document.getElementById('mobile-menu-button');
  const menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isHidden = menu.classList.toggle('hidden');
    toggle.setAttribute('aria-expanded', String(!isHidden));
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function setupScrollAnimation() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const prefersReduce =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduce || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('active'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  items.forEach((el) => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  setupMobileMenu();
  setupScrollAnimation();
});
