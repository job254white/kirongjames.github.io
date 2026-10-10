(() => {
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-nav');

  // Mobile menu
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
    }));
  }

  // Footer year
  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();

  // Header gets a hairline once the page scrolls
  const onScroll = () => header && header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Highlight the nav link for the section in view
  const links = [...document.querySelectorAll('.site-nav a[href^="#"]')];
  const byId = new Map(links.map(link => [link.getAttribute('href').slice(1), link]));
  const sections = [...byId.keys()].map(id => document.getElementById(id)).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(link => link.removeAttribute('aria-current'));
        const active = byId.get(entry.target.id);
        if (active) active.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(section => observer.observe(section));
  }

  // Portrait: show assets/portrait.jpg when it exists, otherwise keep the monogram
  const portrait = document.querySelector('.portrait');
  const photo = portrait && portrait.querySelector('img');
  if (photo) {
    const show = () => portrait.classList.add('has-photo');
    if (photo.complete && photo.naturalWidth > 0) show();
    else photo.addEventListener('load', show, { once: true });
  }
})();
