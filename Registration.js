// Demo-only mock OTP flow. No real messages are sent anywhere.
// The "correct" code is always 123456, purely for demonstrating the UI.
const MOCK_OTP = '123456';

function setupOtpFlow(triggerBtnId, inputId, boxesId, statusId, label) {
  const triggerBtn = document.getElementById(triggerBtnId);
  const input = document.getElementById(inputId);
  const boxes = document.querySelectorAll(`#${boxesId} input`);
  const status = document.getElementById(statusId);

  // Auto-advance between OTP boxes
  boxes.forEach((box, i) => {
    box.addEventListener('input', () => {
      box.value = box.value.replace(/[^0-9]/g, '');
      if (box.value && i < boxes.length - 1) {
        boxes[i + 1].focus();
      }
    });
    box.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !box.value && i > 0) {
        boxes[i - 1].focus();
      }
    });
  });

  triggerBtn.addEventListener('click', () => {
    if (!input.value.trim()) {
      status.textContent = `Enter your ${label} first.`;
      status.className = 'status err';
      return;
    }

    // Simulate sending an OTP
    status.textContent = `Demo OTP sent for ${label} (use 123456).`;
    status.className = 'status ok';
    boxes[0].focus();
  });
}

setupOtpFlow('emailOtpBtn', 'email', 'emailOtpBoxes', 'emailStatus', 'email');
setupOtpFlow('mobileOtpBtn', 'mobile', 'mobileOtpBoxes', 'mobileStatus', 'mobile number');

function readOtp(boxesId) {
  return Array.from(document.querySelectorAll(`#${boxesId} input`))
    .map((b) => b.value)
    .join('');
}

document.getElementById('verifyBtn').addEventListener('click', () => {
  const emailOtp = readOtp('emailOtpBoxes');
  const mobileOtp = readOtp('mobileOtpBoxes');

  const emailStatus = document.getElementById('emailStatus');
  const mobileStatus = document.getElementById('mobileStatus');

  let ok = true;

  if (emailOtp !== MOCK_OTP) {
    emailStatus.textContent = 'Invalid email OTP (demo code is 123456).';
    emailStatus.className = 'status err';
    ok = false;
  }

  if (mobileOtp !== MOCK_OTP) {
    mobileStatus.textContent = 'Invalid mobile OTP (demo code is 123456).';
    mobileStatus.className = 'status err';
    ok = false;
  }

  if (ok) {
    alert('Demo verification successful. Proceeding...');
  }
});

document.getElementById('cancelBtn').addEventListener('click', () => {
  document.querySelectorAll('input').forEach((el) => (el.value = ''));
  document.querySelectorAll('.status').forEach((el) => {
    el.textContent = '';
    el.className = 'status';
  });
});