
document.addEventListener("DOMContentLoaded", () => {

    const menuBtn = document.getElementById("menuBtn");
    const navbar = document.getElementById("navbar");
    const navLinks = document.querySelectorAll(".navbar a");
    const sections = document.querySelectorAll("main section");
    const backToTop = document.querySelector(".back-to-top");
    const contactForm = document.getElementById("contactForm");

    if (menuBtn && navbar) {

        menuBtn.addEventListener("click", () => {
            navbar.classList.toggle("active");

            menuBtn.textContent = navbar.classList.contains("active")
                ? "Close"
                : "Menu";
        });

        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navbar.classList.remove("active");
                menuBtn.textContent = "Menu";
            });
        });

        document.addEventListener("click", (event) => {
            if (
                !navbar.contains(event.target) &&
                !menuBtn.contains(event.target)
            ) {
                navbar.classList.remove("active");
                menuBtn.textContent = "Menu";
            }
        });

    }

    function activeNavigation() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }

        });

    }

    window.addEventListener("scroll", activeNavigation);

    activeNavigation();


    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    }, observerOptions);


    const animatedElements = document.querySelectorAll(
        ".section-title, .about-content, .education-card, .skill-card, .project-card, .contact-content"
    );

    animatedElements.forEach(element => {

        element.classList.add("reveal");

        observer.observe(element);

    });


    const animationStyle = document.createElement("style");

    animationStyle.textContent = `
        .reveal {
            opacity: 0;
            transform: translateY(35px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .reveal.show {
            opacity: 1;
            transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
            .reveal {
                opacity: 1;
                transform: none;
                transition: none;
            }
        }
    `;

    document.head.appendChild(animationStyle);


    window.addEventListener("scroll", () => {

        if (backToTop) {

            if (window.scrollY > 400) {
                backToTop.style.opacity = "1";
                backToTop.style.visibility = "visible";
            } else {
                backToTop.style.opacity = "0";
                backToTop.style.visibility = "hidden";
            }

        }

    });


    if (backToTop) {

        backToTop.style.opacity = "0";
        backToTop.style.visibility = "hidden";
        backToTop.style.transition = "0.3s";

        backToTop.addEventListener("click", event => {
            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });

    }


    if (contactForm) {

        contactForm.addEventListener("submit", event => {

            event.preventDefault();

            const name = contactForm.querySelector('[name="name"]').value.trim();
            const email = contactForm.querySelector('[name="email"]').value.trim();
            const subject = contactForm.querySelector('[name="subject"]').value.trim();
            const message = contactForm.querySelector('[name="message"]').value.trim();

            if (!name || !email || !subject || !message) {
                alert("Iltimos, barcha maydonlarni to'ldiring!");
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {
                alert("Email manzilni to'g'ri kiriting!");
                return;
            }

            alert(
                "Rahmat, " + name + "! Xabaringiz tekshiruvdan o'tdi."
            );

            contactForm.reset();

        });

    }


    const heroContent = document.querySelector(".hero-content");

    if (heroContent) {
        heroContent.classList.add("loaded");
    }


    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach(card => {

        card.addEventListener("mouseenter", () => {
            card.style.transition = "0.4s ease";
        });

    });


    window.addEventListener("resize", () => {

        if (window.innerWidth > 900 && navbar) {
            navbar.classList.remove("active");

            if (menuBtn) {
                menuBtn.textContent = "Menu";
            }

        }

    });

});
