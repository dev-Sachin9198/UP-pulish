  const otpBoxes = document.querySelectorAll('.otp-box');
  otpBoxes.forEach((box, idx) => {
    box.addEventListener('input', () => {
      box.value = box.value.replace(/[^0-9]/g, '');
      if (box.value && idx < otpBoxes.length - 1) {
        otpBoxes[idx + 1].focus();
      }
    });
    box.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !box.value && idx > 0) {
        otpBoxes[idx - 1].focus();
      }
    });
  });

  document.getElementById('toggleEye').addEventListener('click', () => {
    const input = document.getElementById('phone');
    const eye = document.getElementById('toggleEye');
    if (input.type === 'password') {
      input.type = 'text';
      eye.textContent = '👁️';
    } else {
      input.type = 'password';
      eye.textContent = '🙈';
    }
  });

  document.getElementById('generateOtpBtn').addEventListener('click', () => {
    const phone = document.getElementById('phone').value.trim();
    if (!phone) {
      alert('Please enter your phone number first.');
      return;
    }
    alert('OTP sent to your registered mobile number.');
    otpBoxes[0].focus();
  });

  document.getElementById('loginBtn').addEventListener('click', () => {
    const consent = document.getElementById('consentCheck').checked;
    const otp = Array.from(otpBoxes).map(b => b.value).join('');

    if (!consent) {
      alert('Please accept the authorization checkbox to continue.');
      return;
    }
    if (otp.length < otpBoxes.length) {
      alert('Please enter the complete OTP.');
      return;
    }
    alert('Login successful!');
  });

  document.getElementById('backLink').addEventListener('click', (e) => {
    e.preventDefault();
    window.history.back();
  });
