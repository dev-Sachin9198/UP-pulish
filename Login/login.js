const homeBtn =
  document.getElementById("homeBtn");

if (homeBtn) {

  homeBtn.addEventListener("click", () => {

    window.location.href =
      "../index.html";

  });

}




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


    /* Remove active class */

    fontButtons.forEach(btn => {

      btn.classList.remove("active");

    });


    /* Add active class */

    button.classList.add("active");

  });

});



const digilockerBtn =
  document.getElementById(
    "digilockerBtn"
  );


const aadhaarBtn =
  document.getElementById(
    "aadhaarBtn"
  );


const accountBtn =
  document.getElementById(
    "accountBtn"
  );




if (digilockerBtn) {

  digilockerBtn.addEventListener(
    "click",
    () => {

      alert(
        "DigiLocker Login\n\nThis is currently a demo button."
      );

      /*
        Future integration:

        window.location.href =
          "./DigiLocker/DigiLocker.html";
      */

    }
  );

}




if (aadhaarBtn) {

  aadhaarBtn.addEventListener(
    "click",
    () => {

      alert(
        "Aadhaar Login\n\nThis is currently a demo button."
      );

      /*
        Future integration:

        window.location.href =
          "./Aadhaar/Aadhaar.html";
      */

    }
  );

}




if (accountBtn) {

  accountBtn.addEventListener(
    "click",
    () => {

      alert(
        "Account Login\n\nThis is currently a demo button."
      );

      /*
        Future integration:

        window.location.href =
          "./AccountLogin/AccountLogin.html";
      */

    }
  );

}




const createAccountLink =
  document.getElementById(
    "createAccountLink"
  );


if (createAccountLink) {

  createAccountLink.addEventListener(
    "click",
    (event) => {

     

    }
  );

}

