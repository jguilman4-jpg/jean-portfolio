
// ======================================
// JEAN GUILMAN.DEV
// INTERAÇÕES E ANIMAÇÕES
// ======================================


// 1. EFEITO DE DIGITAÇÃO

const typingElement = document.querySelector(".typing");

const words = [
    "Web Developer",
    "Front-end Developer",
    "Creative Developer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];

    if (deleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typingElement.textContent = currentWord.substring(0, charIndex);

    let speed = deleting ? 45 : 90;

    if (!deleting && charIndex === currentWord.length) {
        deleting = true;
        speed = 1600;
    }

    if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 400;
    }

    setTimeout(typeEffect, speed);
}

if (typingElement) {
    typeEffect();
}


// 2. MENU MOBILE

const menuToggle = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navbar.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});


// 3. ANIMAÇÃO AO ROLAR A PÁGINA

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

revealElements.forEach(element => {
    observer.observe(element);
});


// 4. EFEITO DE LUZ SEGUINDO O MOUSE

const cursorGlow = document.querySelector(".cursor-glow");

if (window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener("mousemove", (event) => {
        cursorGlow.style.left = event.clientX + "px";
        cursorGlow.style.top = event.clientY + "px";
    });
}


// 5. MENU ATIVO CONFORME A SEÇÃO

const sections = document.querySelectorAll("main section[id]");

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.remove("active");

                if (link.getAttribute("href") === "#" + entry.target.id) {
                    link.classList.add("active");
                }
            });
        }
    });
}, {
    rootMargin: "-35% 0px -55% 0px"
});

sections.forEach(section => {
    sectionObserver.observe(section);
});


// 6. ANO AUTOMÁTICO NO RODAPÉ

document.querySelector("#year").textContent =
    new Date().getFullYear();


// 7. EFEITO 3D NOS CARDS

const cards = document.querySelectorAll(
    ".skill-card, .project-card"
);

cards.forEach(card => {

    card.addEventListener("mousemove", (event) => {

        if (window.matchMedia("(pointer: coarse)").matches) {
            return;
        }

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (centerY - y) / 30;
        const rotateY = (x - centerX) / 30;

        card.style.transform =
            `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "";
    });

});

console.log(
    "%c JEAN GUILMAN.DEV ",
    "background: #9333ea; color: white; padding: 10px; font-weight: bold;"
);

console.log("Welcome to my portfolio! 🚀");
