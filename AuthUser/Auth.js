  let captchaText = '';

  function randomCaptchaText(len = 6) {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let s = '';
    for (let i = 0; i < len; i++) s += chars[Math.floor(Math.random() * chars.length)];
    return s;
  }

  function renderCaptcha() {
    captchaText = randomCaptchaText();
    const w = 220, h = 58;
    let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
    svg += `<rect width="${w}" height="${h}" fill="#ffffff"/>`;

    // noisy background lines
    for (let i = 0; i < 6; i++) {
      const y1 = Math.random() * h, y2 = Math.random() * h;
      const x1 = Math.random() * w, x2 = Math.random() * w;
      svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#e57373" stroke-width="1" opacity="0.6"/>`;
    }

    // distorted characters
    const charW = w / (captchaText.length + 1);
    for (let i = 0; i < captchaText.length; i++) {
      const ch = captchaText[i];
      const x = charW * (i + 0.8);
      const y = h / 2 + (Math.random() * 10 - 5);
      const rot = Math.random() * 30 - 15;
      const size = 24 + Math.random() * 6;
      svg += `<text x="${x}" y="${y}" font-size="${size}" font-family="Georgia, serif" fill="#e05a5a"
                transform="rotate(${rot} ${x} ${y})" text-anchor="middle" dominant-baseline="middle">${ch}</text>`;
    }

    // scatter dots
    for (let i = 0; i < 25; i++) {
      const cx = Math.random() * w, cy = Math.random() * h;
      svg += `<circle cx="${cx}" cy="${cy}" r="0.8" fill="#e57373" opacity="0.5"/>`;
    }

    svg += `</svg>`;
    document.getElementById('captchaImage').innerHTML = svg;
    document.getElementById('captchaInput').value = '';
    document.getElementById('errorMsg').textContent = '';
  }

  document.getElementById('tryAnother').addEventListener('click', (e) => {
    e.preventDefault();
    renderCaptcha();
  });

  document.getElementById('toggleEye').addEventListener('click', () => {
    const input = document.getElementById('aadhaar');
    const eye = document.getElementById('toggleEye');
    if (input.type === 'password') {
      input.type = 'text';
      eye.textContent = '🙈';
    } else {
      input.type = 'password';
      eye.textContent = '👁️';
    }
  });

  document.getElementById('nextBtn').addEventListener('click', () => {
    const aadhaar = document.getElementById('aadhaar').value.trim();
    const captchaInput = document.getElementById('captchaInput').value.trim();
    const errorMsg = document.getElementById('errorMsg');

    if (!aadhaar) {
      errorMsg.textContent = 'Please enter your Aadhaar or VID number.';
      return;
    }
    if (!captchaInput) {
      errorMsg.textContent = 'Please enter the text shown in the image.';
      return;
    }
    if (captchaInput !== captchaText) {
      errorMsg.textContent = 'The text you entered did not match. Please try again.';
      renderCaptcha();
      return;
    }
    errorMsg.style.color = '#2e9e4a';
    errorMsg.textContent = 'Verified. Proceeding...';
  });

  const confirmModal = document.getElementById('confirmModal');
  const RETURN_URL = 'http://127.0.0.1:5500/Login/Login.html';

  document.getElementById('returnLink').addEventListener('click', (e) => {
    e.preventDefault();
    confirmModal.classList.add('active');
  });

  document.getElementById('modalYes').addEventListener('click', () => {
    window.location.href = RETURN_URL;
  });

  document.getElementById('modalNo').addEventListener('click', () => {
    confirmModal.classList.remove('active');
  });

  // overlay ke bahar click karne par bhi modal band ho jaye
  confirmModal.addEventListener('click', (e) => {
    if (e.target === confirmModal) confirmModal.classList.remove('active');
  });

  renderCaptcha();
