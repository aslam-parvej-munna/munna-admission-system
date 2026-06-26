// ===============================
// Munna ICT Care - script.js
// ===============================

// Sticky Navbar
window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 50) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
});


// Mobile Menu
const menuBtn = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        menu.classList.toggle("active");
    });
}


// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});


// Back To Top Button
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (!topBtn) return;

    if (window.pageYOffset > 300) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";

    }

});

if (topBtn) {

    topBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}


// Counter Animation
const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const counter = entry.target;

            const target = +counter.dataset.target;

            let count = 0;

            const speed = target / 150;

            const update = () => {

                count += speed;

                if (count < target) {

                    counter.innerText = Math.floor(count);

                    requestAnimationFrame(update);

                } else {

                    counter.innerText = target;

                }

            };

            update();

            counterObserver.unobserve(counter);

        }

    });

});

counters.forEach(counter => {

    counterObserver.observe(counter);

});


// Scroll Reveal Animation
const revealElements = document.querySelectorAll(".reveal");

function reveal() {

    const windowHeight = window.innerHeight;

    revealElements.forEach(el => {

        const top = el.getBoundingClientRect().top;

        if (top < windowHeight - 100) {

            el.classList.add("active");

        }

    });

}

window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);


// Current Year in Footer
const year = document.getElementById("year");

if (year) {

    year.textContent = new Date().getFullYear();

}
