const MOCK_OTP = "123456";



const email = document.getElementById("email");
const mobile = document.getElementById("mobile");

const emailOtpBtn = document.getElementById("emailOtpBtn");
const mobileOtpBtn = document.getElementById("mobileOtpBtn");

const emailStatus = document.getElementById("emailStatus");
const mobileStatus = document.getElementById("mobileStatus");

const verifyBtn = document.getElementById("verifyBtn");
const cancelBtn = document.getElementById("cancelBtn");
const homeBtn = document.getElementById("homeBtn");




homeBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});




function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}




function isValidMobile(value) {
  return /^[6-9]\d{9}$/.test(value);
}



function showStatus(element, message, type) {
  element.textContent = message;
  element.className = `status ${type}`;
}



function setupOtpBoxes(containerId) {

  const boxes = Array.from(
    document.querySelectorAll(`#${containerId} input`)
  );

  boxes.forEach((box, index) => {

    /* Only numbers */
    box.addEventListener("input", (event) => {

      event.target.value =
        event.target.value.replace(/\D/g, "").slice(0, 1);

      if (
        event.target.value &&
        index < boxes.length - 1
      ) {
        boxes[index + 1].focus();
      }
    });


    /* Backspace */
    box.addEventListener("keydown", (event) => {

      if (
        event.key === "Backspace" &&
        !box.value &&
        index > 0
      ) {
        boxes[index - 1].focus();
      }
    });


    /* Arrow navigation */
    box.addEventListener("keydown", (event) => {

      if (
        event.key === "ArrowLeft" &&
        index > 0
      ) {
        boxes[index - 1].focus();
      }

      if (
        event.key === "ArrowRight" &&
        index < boxes.length - 1
      ) {
        boxes[index + 1].focus();
      }
    });


    /* Paste 6 digit OTP */
    box.addEventListener("paste", (event) => {

      event.preventDefault();

      const pastedText =
        event.clipboardData
          .getData("text")
          .replace(/\D/g, "")
          .slice(0, boxes.length);

      pastedText
        .split("")
        .forEach((digit, i) => {
          boxes[i].value = digit;
        });

      const nextIndex =
        Math.min(
          pastedText.length,
          boxes.length - 1
        );

      boxes[nextIndex].focus();
    });

  });

  return boxes;
}


const emailBoxes =
  setupOtpBoxes("emailOtpBoxes");

const mobileBoxes =
  setupOtpBoxes("mobileOtpBoxes");



function readOtp(boxes) {

  return boxes
    .map(box => box.value)
    .join("");
}




function clearOtp(boxes) {

  boxes.forEach(box => {
    box.value = "";
  });
}




emailOtpBtn.addEventListener("click", () => {

  const value = email.value.trim();

  if (!value) {

    showStatus(
      emailStatus,
      "Please enter your email address first.",
      "err"
    );

    email.focus();

    return;
  }


  if (!isValidEmail(value)) {

    showStatus(
      emailStatus,
      "Please enter a valid email address.",
      "err"
    );

    email.focus();

    return;
  }


  clearOtp(emailBoxes);

  showStatus(
    emailStatus,
    "Demo OTP sent. Please use 123456.",
    "ok"
  );

  emailBoxes[0].focus();

});




mobileOtpBtn.addEventListener("click", () => {

  const value = mobile.value.trim();

  if (!value) {

    showStatus(
      mobileStatus,
      "Please enter your mobile number first.",
      "err"
    );

    mobile.focus();

    return;
  }


  if (!isValidMobile(value)) {

    showStatus(
      mobileStatus,
      "Enter a valid 10-digit mobile number.",
      "err"
    );

    mobile.focus();

    return;
  }


  clearOtp(mobileBoxes);

  showStatus(
    mobileStatus,
    "Demo OTP sent. Please use 123456.",
    "ok"
  );

  mobileBoxes[0].focus();

});




mobile.addEventListener("input", () => {

  mobile.value =
    mobile.value
      .replace(/\D/g, "")
      .slice(0, 10);

});




verifyBtn.addEventListener("click", () => {

  const emailValue = email.value.trim();
  const mobileValue = mobile.value.trim();

  const emailOtp = readOtp(emailBoxes);
  const mobileOtp = readOtp(mobileBoxes);

  let valid = true;


  /* ---------- Email ---------- */

  if (!isValidEmail(emailValue)) {

    showStatus(
      emailStatus,
      "Please enter a valid email address.",
      "err"
    );

    valid = false;

  } else if (emailOtp !== MOCK_OTP) {

    showStatus(
      emailStatus,
      "Invalid email OTP. Demo OTP is 123456.",
      "err"
    );

    valid = false;

  } else {

    showStatus(
      emailStatus,
      "Email verified successfully.",
      "ok"
    );

  }




  if (!isValidMobile(mobileValue)) {

    showStatus(
      mobileStatus,
      "Please enter a valid 10-digit mobile number.",
      "err"
    );

    valid = false;

  } else if (mobileOtp !== MOCK_OTP) {

    showStatus(
      mobileStatus,
      "Invalid mobile OTP. Demo OTP is 123456.",
      "err"
    );

    valid = false;

  } else {

    showStatus(
      mobileStatus,
      "Mobile number verified successfully.",
      "ok"
    );

  }


  /* ---------- Success ---------- */

  if (valid) {

    alert(
      "Demo verification successful!\n\nProceeding to Personal Information..."
    );

    /*
      Future page:

      window.location.href =
        "./PersonalInformation/PersonalInformation.html";
    */
  }

});




cancelBtn.addEventListener("click", () => {

  email.value = "";
  mobile.value = "";

  clearOtp(emailBoxes);
  clearOtp(mobileBoxes);

  emailStatus.textContent = "";
  emailStatus.className = "status";

  mobileStatus.textContent = "";
  mobileStatus.className = "status";

  email.focus();

});




const fontButtons =
  document.querySelectorAll(
    ".font-size-toggle button"
  );

const fontScales = {
  dec2: 0.85,
  dec: 0.92,
  reset: 1,
  inc: 1.08,
  inc2: 1.18
};


fontButtons.forEach(button => {

  button.addEventListener("click", () => {

    const size =
      button.dataset.size;

    const scale =
      fontScales[size] || 1;

    document.documentElement.style
      .setProperty(
        "--font-scale",
        scale
      );


    /* Active button */

    fontButtons.forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

  });

});

