document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. Font size adjuster (A--, A-, A, A+, A++) ---------- */
  const root = document.documentElement;
  const BASE_SIZE = 16;
  const STEP = 2;
  const MIN_SIZE = 12;
  const MAX_SIZE = 24;

  function setFontSize(px) {
    const clamped = Math.min(MAX_SIZE, Math.max(MIN_SIZE, px));
    root.style.fontSize = clamped + 'px';
    localStorage.removeItem; // no-op, storage APIs unused per artifact rules
  }

  document.querySelectorAll('.bottom [data-size]').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = parseFloat(getComputedStyle(root).fontSize);
      switch (btn.dataset.size) {
        case 'dec2': setFontSize(current - STEP * 2); break;
        case 'dec': setFontSize(current - STEP); break;
        case 'reset': setFontSize(BASE_SIZE); break;
        case 'inc': setFontSize(current + STEP); break;
        case 'inc2': setFontSize(current + STEP * 2); break;
      }
    });
  });

  /* ---------- 2. Pause the scrolling notice on hover/tap ---------- */
  const marquee = document.querySelector('.marquee');
  if (marquee) {
    marquee.addEventListener('mouseenter', () => marquee.classList.add('paused'));
    marquee.addEventListener('mouseleave', () => marquee.classList.remove('paused'));
    marquee.addEventListener('click', () => marquee.classList.toggle('paused'));
  }

  /* ---------- 3. Back-to-top button ---------- */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- 4. Fade-in-on-scroll for key sections ---------- */
  const revealTargets = document.querySelectorAll(
    '#security .section, #security .section2, #security .section3, #security .video1, #security .vi1, .privacy, #footer'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(el => observer.observe(el));

  /* ---------- 5. Auto-scrolling partner-logo strip (pauses on hover) ---------- */
  const strip = document.getElementById('imgbhandara');
  if (strip) {
    let autoScroll = true;
    let dir = 1;

    strip.addEventListener('mouseenter', () => (autoScroll = false));
    strip.addEventListener('mouseleave', () => (autoScroll = true));

    setInterval(() => {
      if (!autoScroll) return;
      const maxScroll = strip.scrollWidth - strip.clientWidth;
      if (strip.scrollLeft >= maxScroll) dir = -1;
      if (strip.scrollLeft <= 0) dir = 1;
      strip.scrollLeft += dir * 1.5;
    }, 30);
  }

  /* ---------- 6. Countdown to the application end date ---------- */
  const noticeBox = document.querySelector('.section3 .img p');
  if (noticeBox) {
    const deadline = new Date('2025-09-11T23:59:59');
    const countdownEl = document.createElement('p');
    countdownEl.style.marginTop = '10px';
    countdownEl.style.fontWeight = 'bold';
    countdownEl.style.color = '#bc3636';
    noticeBox.parentElement.appendChild(countdownEl);

    function updateCountdown() {
      const diff = deadline - new Date();
      if (diff <= 0) {
        countdownEl.textContent = 'Applications are now closed.';
        return;
      }
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      countdownEl.textContent = `Closing in: ${days}d ${hours}h`;
    }
    updateCountdown();
    setInterval(updateCountdown, 60000);
  }

});
