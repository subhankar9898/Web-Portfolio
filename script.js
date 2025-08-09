document.addEventListener('DOMContentLoaded', function() {
    // --- Animated Headline Logic ---
    const headline = document.getElementById('animated-headline');
    const text = "Subhankar Prusty";
    headline.textContent = "";
    text.split('').forEach((char, index) => {
      const letterSpan = document.createElement('span');
      letterSpan.className = 'letter';
      letterSpan.innerHTML = char === ' ' ? ' ' : char;
      letterSpan.style.animationDelay = `${index * 50}ms`;
      headline.appendChild(letterSpan);
    });
  
    // --- Scroll Animations for general elements ---
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      scrollObserver.observe(el);
    });
  
    // --- Title Letter Animation Trigger ---
    const titleObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const animatedTitle = entry.target;
          if (!animatedTitle.dataset.animated) {
            const titleText = animatedTitle.textContent;
            animatedTitle.textContent = '';
            titleText.split('').forEach((char, index) => {
              const charSpan = document.createElement('span');
              charSpan.className = 'char';
              charSpan.innerHTML = char === ' ' ? ' ' : char;
              charSpan.style.animationDelay = `${index * 30}ms`;
              animatedTitle.appendChild(charSpan);
            });
            animatedTitle.dataset.animated = 'true';
            animatedTitle.classList.add('is-visible');
          }
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('.animated-title').forEach(title => {
      titleObserver.observe(title);
    });
  
    // --- Sidebar Navigation (Improved Logic) ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menu-toggle');
    const openIcon = document.getElementById('menu-open-icon');
    const closeIcon = document.getElementById('menu-close-icon');
  
    // Handle link clicks: only intercept internal links
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          // Internal section link: smooth scroll
          e.preventDefault();
          const targetSection = document.querySelector(href);
          if (targetSection) {
            targetSection.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
            // Close sidebar after click
            sidebar.classList.add('-translate-x-full');
            openIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
          }
        }
        // else: external link, default browser action (opens in new tab if target="_blank")
      });
    });
  
    // Observer to highlight the current section in the nav
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-30% 0px -70% 0px', threshold: 0 });
  
    sections.forEach(section => {
      navObserver.observe(section);
    });
  
    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('-translate-x-full');
      openIcon.classList.toggle('hidden');
      closeIcon.classList.toggle('hidden');
    });
  });
  