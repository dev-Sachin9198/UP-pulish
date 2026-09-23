const aadhaarInput = document.getElementById("aadhaar");
const captchaInput = document.getElementById("captchaInput");
const captchaImage = document.getElementById("captchaImage");
const errorMsg = document.getElementById("errorMsg");

const tryAnother = document.getElementById("tryAnother");
const toggleEye = document.getElementById("toggleEye");
const nextBtn = document.getElementById("nextBtn");

const returnLink = document.getElementById("returnLink");

const confirmModal = document.getElementById("confirmModal");
const modalYes = document.getElementById("modalYes");
const modalNo = document.getElementById("modalNo");




let captchaText = "";


/*
   CAPTCHA characters
   Ambiguous characters jaise I, O, 0, 1 ko remove
   kiya gaya hai taaki user ko read karne mein easy ho.
*/

function randomCaptchaText(length = 6) {

    const chars =
        "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";

    let result = "";

    for (let i = 0; i < length; i++) {

        const randomIndex =
            Math.floor(Math.random() * chars.length);

        result += chars[randomIndex];
    }

    return result;
}




function renderCaptcha() {

    captchaText = randomCaptchaText(6);

    const width = 220;
    const height = 58;

    let svg = `
        <svg
            viewBox="0 0 ${width} ${height}"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="CAPTCHA"
        >
    `;


    /* Background */

    svg += `
        <rect
            width="${width}"
            height="${height}"
            fill="#ffffff"
        />
    `;


    /* Noise Lines */

    for (let i = 0; i < 6; i++) {

        const x1 = Math.random() * width;
        const y1 = Math.random() * height;

        const x2 = Math.random() * width;
        const y2 = Math.random() * height;

        svg += `
            <line
                x1="${x1}"
                y1="${y1}"
                x2="${x2}"
                y2="${y2}"
                stroke="#e57373"
                stroke-width="1"
                opacity="0.6"
            />
        `;
    }


    /* CAPTCHA Characters */

    const charWidth =
        width / (captchaText.length + 1);

    for (let i = 0; i < captchaText.length; i++) {

        const character = captchaText[i];

        const x =
            charWidth * (i + 0.8);

        const y =
            height / 2 +
            (Math.random() * 10 - 5);

        const rotation =
            Math.random() * 30 - 15;

        const fontSize =
            24 + Math.random() * 6;

        svg += `
            <text
                x="${x}"
                y="${y}"
                font-size="${fontSize}"
                font-family="Georgia, serif"
                fill="#e05a5a"
                transform="rotate(${rotation} ${x} ${y})"
                text-anchor="middle"
                dominant-baseline="middle"
            >
                ${character}
            </text>
        `;
    }


    /* Random Dots */

    for (let i = 0; i < 25; i++) {

        const cx = Math.random() * width;
        const cy = Math.random() * height;

        svg += `
            <circle
                cx="${cx}"
                cy="${cy}"
                r="0.8"
                fill="#e57373"
                opacity="0.5"
            />
        `;
    }


    svg += `</svg>`;


    captchaImage.innerHTML = svg;

    captchaInput.value = "";

    clearError();
}



function showError(message) {

    errorMsg.style.color = "#c0392b";

    errorMsg.textContent = message;
}


function showSuccess(message) {

    errorMsg.style.color = "#2e9e4a";

    errorMsg.textContent = message;
}


function clearError() {

    errorMsg.textContent = "";

    errorMsg.style.color = "#c0392b";
}



tryAnother.addEventListener("click", function (event) {

    event.preventDefault();

    renderCaptcha();

    captchaInput.focus();
});




toggleEye.addEventListener("click", function () {

    if (aadhaarInput.type === "password") {

        aadhaarInput.type = "text";

        toggleEye.textContent = "🙈";

        toggleEye.setAttribute(
            "aria-label",
            "Hide Aadhaar"
        );

    } else {

        aadhaarInput.type = "password";

        toggleEye.textContent = "👁️";

        toggleEye.setAttribute(
            "aria-label",
            "Show Aadhaar"
        );
    }

});



aadhaarInput.addEventListener("input", function () {

    clearError();

});


captchaInput.addEventListener("input", function () {

    clearError();

    /*
       CAPTCHA ko uppercase/lowercase dono accept karne ke liye
       input ko trim kiya ja raha hai.
    */

    captchaInput.value =
        captchaInput.value.replace(/\s/g, "");
});




nextBtn.addEventListener("click", function () {

    const aadhaar =
        aadhaarInput.value.trim();

    const enteredCaptcha =
        captchaInput.value.trim();


    /* Aadhaar / VID validation */

    if (!aadhaar) {

        showError(
            "Please enter your Aadhaar or VID number."
        );

        aadhaarInput.focus();

        return;
    }


    /*
       Demo validation:
       Aadhaar = 12 digits
       VID = commonly 16 digits
    */

    if (!/^\d{12}$|^\d{16}$/.test(aadhaar)) {

        showError(
            "Please enter a valid 12-digit Aadhaar or 16-digit VID number."
        );

        aadhaarInput.focus();

        return;
    }


    /* CAPTCHA validation */

    if (!enteredCaptcha) {

        showError(
            "Please enter the text shown in the image."
        );

        captchaInput.focus();

        return;
    }


    /*
       Case-insensitive CAPTCHA comparison
    */

    if (
        enteredCaptcha.toLowerCase() !==
        captchaText.toLowerCase()
    ) {

        showError(
            "The text you entered did not match. Please try again."
        );

        renderCaptcha();

        captchaInput.focus();

        return;
    }


    /* Success */

    showSuccess(
        "Verified successfully. Proceeding..."
    );


    /*
       Demo delay
    */

    nextBtn.disabled = true;

    nextBtn.textContent = "Please wait...";


    setTimeout(function () {

        nextBtn.disabled = false;

        nextBtn.textContent = "Next";

        /*
           Yahan real DigiLocker integration/backend
           ka next step add kiya ja sakta hai.
        */

        alert(
            "CAPTCHA verified successfully.\n\n" +
            "This is currently a frontend demo."
        );

    }, 800);

});




returnLink.addEventListener("click", function (event) {

    event.preventDefault();

    confirmModal.classList.add("active");

    confirmModal.setAttribute(
        "aria-hidden",
        "false"
    );

    modalNo.focus();
});



modalYes.addEventListener("click", function () {

    /*
       Agar Auth.html Login folder ke andar hai
       aur Login.html bhi Login folder ke andar hai:
    */

    window.location.href = "../Login/Login.html";

});




function closeModal() {

    confirmModal.classList.remove("active");

    confirmModal.setAttribute(
        "aria-hidden",
        "true"
    );

    returnLink.focus();
}


modalNo.addEventListener("click", closeModal);




confirmModal.addEventListener("click", function (event) {

    if (event.target === confirmModal) {

        closeModal();

    }

});



document.addEventListener("keydown", function (event) {

    if (
        event.key === "Escape" &&
        confirmModal.classList.contains("active")
    ) {

        closeModal();

    }

});


renderCaptcha();

