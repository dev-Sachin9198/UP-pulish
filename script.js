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


