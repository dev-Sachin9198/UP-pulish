const sizeButtons = document.querySelectorAll("[data-size]");

let currentScale = 1;

sizeButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const size = button.dataset.size;

        if (size === "dec2") {
            currentScale = 0.85;
        }

        else if (size === "dec") {
            currentScale = 0.93;
        }

        else if (size === "reset") {
            currentScale = 1;
        }

        else if (size === "inc") {
            currentScale = 1.08;
        }

        else if (size === "inc2") {
            currentScale = 1.18;
        }

        document.documentElement.style.fontSize =
            `${currentScale}rem`;

        // Active button
        sizeButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

    });

});




const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});




const marquee = document.querySelector(".marquee");

marquee.addEventListener("mouseenter", () => {
    marquee.classList.add("paused");
});

marquee.addEventListener("mouseleave", () => {
    marquee.classList.remove("paused");
});




const videos = document.querySelectorAll("video");

videos.forEach((video) => {

    video.addEventListener("play", () => {

        videos.forEach((otherVideo) => {

            if (otherVideo !== video) {
                otherVideo.pause();
            }

        });

    });

});



const noticeOverlay =
    document.getElementById("noticeOverlay");

const noticeClose =
    document.getElementById("noticeClose");

const noticeCloseBtn =
    document.getElementById("noticeCloseBtn");


/* =========================================================
   OPEN NOTICE
========================================================= */

function openNotice() {

    if (!noticeOverlay) return;

    noticeOverlay.classList.add("show");

    noticeOverlay.setAttribute(
        "aria-hidden",
        "false"
    );

    /*
       Popup open hone par background page scroll
       temporarily disable hoga.
    */

    document.body.style.overflow = "hidden";

}


/* =========================================================
   CLOSE NOTICE
========================================================= */

function closeNotice() {

    if (!noticeOverlay) return;

    noticeOverlay.classList.remove("show");

    noticeOverlay.setAttribute(
        "aria-hidden",
        "true"
    );

    /*
       Page scrolling wapas enable.
    */

    document.body.style.overflow = "";

}


/* =========================================================
   CLOSE BUTTONS
========================================================= */

if (noticeClose) {

    noticeClose.addEventListener(
        "click",
        closeNotice
    );

}


if (noticeCloseBtn) {

    noticeCloseBtn.addEventListener(
        "click",
        closeNotice
    );

}


/* =========================================================
   CLICK OUTSIDE POPUP
========================================================= */

if (noticeOverlay) {

    noticeOverlay.addEventListener(
        "click",
        (event) => {

            /*
               Sirf dark overlay par click karne par
               popup close hoga.
            */

            if (event.target === noticeOverlay) {

                closeNotice();

            }

        }
    );

}


/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            noticeOverlay &&
            noticeOverlay.classList.contains("show")
        ) {

            closeNotice();

        }

    }
);


/* =========================================================
   SHOW POPUP WHEN HOME PAGE LOADS
========================================================= */

window.addEventListener(
    "DOMContentLoaded",
    () => {

        openNotice();

    }
);



