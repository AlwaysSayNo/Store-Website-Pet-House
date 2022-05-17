document.addEventListener("DOMContentLoaded", function () {
    // Slides

    for (const slidesComponent of document.getElementsByClassName("slides")) {
        let storedInterval;
        const wrapper = slidesComponent.getElementsByClassName("slides-wrapper")[0];
        const slidesList = wrapper.children;
        let activeSlide = 0;

        const frwdButton = slidesComponent.getElementsByClassName("slides-forward")[0];
        const prevButton = slidesComponent.getElementsByClassName("slides-previous")[0];

        function toogleActive(el) {
            el.classList.toggle("active");
        }

        function offset(pos) {
            const len = slidesList.length;
            const nextSlide = (len + ((activeSlide + pos) % len)) % len;
            toogleActive(slidesList[nextSlide]);
            toogleActive(slidesList[activeSlide]);
            activeSlide = nextSlide;
        }

        function resetInverval() {
            if (storedInterval !== undefined) {
                clearInterval(storedInterval);
            }
            storedInterval = setInterval(() => {
                offset(1);
            }, 4 * 1000);
        }

        resetInverval();

        frwdButton.addEventListener("click", function () {
            offset(1);
            resetInverval();
        });

        prevButton.addEventListener("click", function () {
            offset(-1);
            resetInverval();
        });
    }

    // Call request

    const dialog = document.getElementById("call-dialog");

    const btn = document.getElementById("call-button");

    const span = document.getElementsByClassName("close")[0];

    function open() {
        document.getElementsByTagName("body")[0].style.overflow = "hidden";
        dialog.style.opacity = 1;
        dialog.style.visibility = "visible";
    }

    function close() {
        document.getElementsByTagName("body")[0].style.overflow = "auto";
        dialog.style.opacity = 0;
        setTimeout(function () {
            dialog.style.visibility = "hidden";
        }, 300);
    }

    btn.onclick = open;
    span.onclick = close;

    window.onclick = function (event) {
        if (event.target === dialog) {
            close();
        }
    };
});
