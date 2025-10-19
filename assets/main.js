const translations = Object.freeze({
  ja: {},
  "zh-TW": {},
  "zh-CN": {},
  ko: {},
  sg: {
    navAbout: "About Us Lah",
    navContact: "Contact Us",
    heroSubtitle: "Your East Asian Community in Brisbane, lah",
    heroBtnFacebook: "Check on Facebook one!",
    heroBtnInstagram: "Follow on Instagram can?",
    aboutTitle: "About Us Lah",
    aboutText: "Lounge Asia is a casual networking event for people with Asian roots to gather and chit-chat in Brisbane. It's a warm space where anyone can feel safe and just be themselves, no matter where you from or what language you speak.",
    missionTitle: "Our Mission",
    missionText: "Our goal is not just to hold events, you know. It's to build connections and make the East Asian community in Brisbane stronger. Through these connections, we want to make your daily life here more shiok and easy-going. We are here to help create chances that make your life better, from meeting new kakis to finding business opportunities and a place where you feel you belong.",
    eventTitle: "Our Monthly Meetup",
    eventDescription: "Lounge Asia got regular event! Good chance to meet new people, very chill. Join us every 4th Tuesday of the month.",
    eventRsvpAction: "No need book, just come only! Check our socials for latest news.",
    galleryBtnFollow: "Follow us for more lah!",
    testimonial1: "I came alone then left with 10 new friends. The vibe so friendly and open, damn good!",
    testimonial2: "A unique place where no need to worry about language. I could finally practice my Korean with real people.",
    collabTitle: "Let's Start a Movement Together!",
    collabIntro: "Lounge Asia is always looking for passionate people, companies, and groups to help us make the East Asian community in Brisbane more happening. Our activities can only succeed with your support.",
    collabInfluencersText: "Want to feature our event? We welcome anyone who can help us grow our community with their platform. We can invite you to our events, so just let us know.",
    collabVenuesText: "Lounge Asia is always looking for new places to lepak. Interested in hosting an event at a unique spot like a BBQ place, a restaurant, or a cafe? We would love to hear from venue partners.",
    collabSponsorsText: "We are open to all kinds of collaboration, from cultural performances and DJ sets that make our events lively, to drink and food sponsorships that make our attendees happy.",
    collabCallToAction: "Come, let's work together to make the East Asian community in Brisbane more exciting and welcoming!",
    galleryTitle: "Our Moments",
    testimonialsTitle: "What Our Friends Say",
    collabBtnContact: "Contact Us",
    eventSchedule: "<strong>When:</strong> Every 4th Tuesday of the month",
    eventTime: "<strong>Time:</strong> 6:00 PM onwards",
    eventVenue: "<strong>Where:</strong> Criterion Tavern, Brisbane City",
    eventBtnFacebook: "Check on Facebook",
    eventBtnInstagram: "Follow on Instagram",
    speedDatingTitle: "Speed Dating Asia",
    speedDatingTagline: "Finding Comfort and Romance",
    speedDatingDescription: "Discover Lounge Asia's Speed Dating series crafted for Brisbane's Asian singles. Enjoy curated conversations, balanced pairings, and a relaxed vibe that makes meeting new people feel natural.",
    speedDatingButton: "Learn More",
    speedDatingCtaTitle: "Curious About Speed Dating Asia?",
    speedDatingCtaText: "Jump over to our dedicated Speed Dating page to see upcoming rounds, how matching works, and what makes the experience feel safe and relaxed.",
    speedDatingCtaButton: "Explore Speed Dating Asia",
    contactTitle: "Get In Touch",
    contactText: "Got questions or want to collaborate? Send us an email! Click the button below to open your email client.",
    contactBtn: "Send an Email",
    footerOrganizer: "Organizer: Brisbane Japanese Bridge"
  }
});

const fallbackTexts = new Map();
const languageNodes = new Map();
const localeMap = Object.freeze({
  en: "en",
  ja: "ja",
  "zh-TW": "zh-Hant",
  "zh-CN": "zh-Hans",
  ko: "ko",
  sg: "en-SG"
});

function collectLanguageNodes() {
  document.querySelectorAll('[data-lang-key]').forEach((node) => {
    const key = node.dataset.langKey;
    if (!key) return;
    if (!languageNodes.has(key)) languageNodes.set(key, []);
    languageNodes.get(key).push(node);
    if (!fallbackTexts.has(key)) fallbackTexts.set(key, node.innerHTML);
  });
}

function setActiveLanguage(lang) {
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    const isActive = btn.dataset.lang === lang;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });
  document.documentElement.lang = localeMap[lang] || 'en';
}

function applyLanguage(lang = 'en') {
  const dictionary = translations[lang];
  languageNodes.forEach((nodes, key) => {
    const fallback = fallbackTexts.get(key) ?? '';
    const nextValue = dictionary && Object.prototype.hasOwnProperty.call(dictionary, key) ? dictionary[key] : fallback;
    nodes.forEach((node) => {
      node.innerHTML = nextValue;
    });
  });
  setActiveLanguage(dictionary ? lang : 'en');
}

function setupLanguageSwitcher() {
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
  });
}

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
  const prefersReduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduce || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('active'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  items.forEach((el) => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  collectLanguageNodes();
  setupLanguageSwitcher();
  setupMobileMenu();
  setupScrollAnimation();
  applyLanguage('en');
});
