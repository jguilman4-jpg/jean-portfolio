
/* ==========================================
   JEAN GUILMAN.DEV
   SISTEMA COMPLETO DE ANIMAÇÕES
========================================== */


/* ==========================================
   1. EFEITO DE DIGITAÇÃO DO TÍTULO
========================================== */

const typingElement = document.querySelector(".typing");

const words = [
    "Web Developer",
    "Front-end Developer",
    "Criador de Sites",
    "Desenvolvedor Web"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    if (!typingElement) return;

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
    } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 400;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();


/* ==========================================
   2. MENU MOBILE
========================================== */

const menuToggle = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".nav-link");

function closeMenu() {
    if (!menuToggle || !navbar) return;

    navbar.classList.remove("open");
    menuToggle.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
}

if (menuToggle && navbar) {

    menuToggle.addEventListener("click", () => {
        const isOpen = navbar.classList.toggle("open");

        menuToggle.classList.toggle("active", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Fechar menu" : "Abrir menu"
        );
    });

    navLinks.forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", event => {
        if (
            !navbar.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            closeMenu();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 750) {
            closeMenu();
        }
    });
}


/* ==========================================
   3. ANIMAÇÕES DE ENTRADA
========================================== */

const revealElements = document.querySelectorAll(
    ".reveal, .section, .project-card, .skill-card, .about-card"
);

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (reducedMotion) {

    revealElements.forEach(element => {
        element.classList.add("visible");
    });

} else if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.12
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

} else {

    revealElements.forEach(element => {
        element.classList.add("visible");
    });

}


/* ==========================================
   4. LUZ QUE ACOMPANHA O MOUSE
========================================== */

const cursorGlow = document.querySelector(".cursor-glow");

if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {

    window.addEventListener("mousemove", event => {

        cursorGlow.style.left = `${event.clientX}px`;
        cursorGlow.style.top = `${event.clientY}px`;

    });

}


/* ==========================================
   5. REDE DIGITAL DE PARTÍCULAS
========================================== */

const canvas = document.createElement("canvas");

canvas.id = "particles-bg";
canvas.setAttribute("aria-hidden", "true");

Object.assign(canvas.style, {
    position: "fixed",
    inset: "0",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: "-1"
});

document.body.prepend(canvas);

const ctx = canvas.getContext("2d");

let particles = [];
let width = 0;
let height = 0;
let animationFrame = null;

const mouse = {
    x: null,
    y: null,
    radius: 130
};

function createParticles() {

    particles = [];

    const amount = Math.min(
        Math.floor(width / 13),
        85
    );

    for (let i = 0; i < amount; i++) {

        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1
        });

    }

}

function resizeCanvas() {

    const ratio = Math.min(
        window.devicePixelRatio || 1,
        2
    );

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * ratio;
    canvas.height = height * ratio;

    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    createParticles();

}

function drawParticles() {

    ctx.clearRect(0, 0, width, height);

    // Movimento e desenho dos pontos
    particles.forEach(particle => {

        if (!reducedMotion) {

            particle.x += particle.vx;
            particle.y += particle.vy;

        }

        if (particle.x < 0 || particle.x > width) {
            particle.vx *= -1;
        }

        if (particle.y < 0 || particle.y > height) {
            particle.vy *= -1;
        }

        // Interação com o cursor
        if (
            mouse.x !== null &&
            !reducedMotion
        ) {

            const dx = particle.x - mouse.x;
            const dy = particle.y - mouse.y;
            const distance = Math.hypot(dx, dy);

            if (distance < mouse.radius && distance > 0) {

                particle.x += (dx / distance) * 0.6;
                particle.y += (dy / distance) * 0.6;

            }

        }

        // Desenha cada partícula
        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "rgba(192, 132, 252, 0.8)";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#a855f7";
        ctx.fill();

        ctx.shadowBlur = 0;

    });


    // Linhas conectando partículas próximas
    for (let i = 0; i < particles.length; i++) {

        for (let j = i + 1; j < particles.length; j++) {

            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;

            const distance = Math.hypot(dx, dy);

            if (distance < 125) {

                const opacity = 1 - distance / 125;

                ctx.beginPath();

                ctx.moveTo(
                    particles[i].x,
                    particles[i].y
                );

                ctx.lineTo(
                    particles[j].x,
                    particles[j].y
                );

                ctx.strokeStyle =
                    `rgba(168, 85, 247, ${opacity * 0.35})`;

                ctx.lineWidth = 0.8;
                ctx.stroke();

            }

        }

    }

    if (!reducedMotion) {
        animationFrame = requestAnimationFrame(drawParticles);
    }

}


// Movimento do mouse sobre a rede
window.addEventListener("mousemove", event => {

    mouse.x = event.clientX;
    mouse.y = event.clientY;

});

window.addEventListener("mouseout", event => {

    if (!event.relatedTarget) {
        mouse.x = null;
        mouse.y = null;
    }

});

// Inicializa a rede
resizeCanvas();
drawParticles();

window.addEventListener("resize", resizeCanvas);


/* ==========================================
   6. CÓDIGO APARECENDO NA JANELA DEVELOPER
========================================== */

const codeTyping = document.querySelector("#codeTyping");

if (codeTyping) {

    const codeLines = codeTyping.querySelectorAll(".code-line");

    if (reducedMotion) {

        codeLines.forEach(line => {
            line.style.opacity = "1";
            line.style.transform = "none";
        });

    } else {

        const codeObserver = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    codeTyping.classList.add("is-typing");

                    codeLines.forEach((line, index) => {

                        line.style.setProperty(
                            "--line-delay",
                            `${index * 350}ms`
                        );

                    });

                    codeObserver.unobserve(codeTyping);

                }

            });

        }, {
            threshold: 0.3
        });

        codeObserver.observe(codeTyping);

    }

}


/* ==========================================
   7. INTERAÇÃO NOS CARDS
========================================== */

const interactiveCards = document.querySelectorAll(
    ".project-card, .skill-card, .about-card"
);

interactiveCards.forEach(card => {

    card.addEventListener("mousemove", event => {

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);

    });

});


/* ==========================================
   8. BARRA DE PROGRESSO DA PÁGINA
========================================== */

const progressBar = document.createElement("div");

progressBar.className = "scroll-progress";
progressBar.setAttribute("aria-hidden", "true");

document.body.appendChild(progressBar);

function updateScrollProgress() {

    const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress = scrollable > 0
        ? (window.scrollY / scrollable) * 100
        : 0;

    progressBar.style.width = `${progress}%`;

}

window.addEventListener("scroll", updateScrollProgress, {
    passive: true
});

window.addEventListener("resize", updateScrollProgress);

updateScrollProgress();


/* ==========================================
   9. MENU ATIVO CONFORME A SEÇÃO
========================================== */

const pageSections = document.querySelectorAll(
    "main section[id]"
);

if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const currentId = entry.target.id;

                navLinks.forEach(link => {

                    const isActive =
                        link.getAttribute("href") === `#${currentId}`;

                    link.classList.toggle("active", isActive);

                });

            }

        });

    }, {
        rootMargin: "-35% 0px -55% 0px"
    });

    pageSections.forEach(section => {
        sectionObserver.observe(section);
    });

}


/* ==========================================
   10. ANO AUTOMÁTICO NO RODAPÉ
========================================== */

const yearElement = document.querySelector("#year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* ==========================================
   FIM DO SISTEMA DE ANIMAÇÕES
   JEAN GUILMAN.DEV
========================================== */

console.log(
    "%c JEAN GUILMAN.DEV ",
    "background: #9333ea; color: white; padding: 8px 14px; border-radius: 5px; font-weight: bold;"
);

console.log("Portfólio carregado com sucesso! 💜");

/* =====================================
   PARALLAX - PROFUNDIDADE COM O MOUSE
===================================== */

(() => {
    const codeCard = document.querySelector(".code-card");

    if (!codeCard) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    if (window.matchMedia("(pointer: coarse)").matches) {
        return;
    }

    document.addEventListener("mousemove", (event) => {
        const x = (event.clientX / window.innerWidth - 0.5) * 2;
        const y = (event.clientY / window.innerHeight - 0.5) * 2;

        codeCard.style.setProperty("--parallax-x", `${x * -8}px`);
        codeCard.style.setProperty("--parallax-y", `${y * -8}px`);
    });

    document.addEventListener("mouseleave", () => {
        codeCard.style.setProperty("--parallax-x", "0px");
        codeCard.style.setProperty("--parallax-y", "0px");
    });
})();

/* =====================================
   LUZ ROXA INTERATIVA DO MOUSE
===================================== */

(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    if (window.matchMedia("(pointer: coarse)").matches) {
        return;
    }

    const light = document.createElement("div");

    light.className = "mouse-light";
    document.body.appendChild(light);

    document.addEventListener("mousemove", (event) => {
        light.style.left = `${event.clientX}px`;
        light.style.top = `${event.clientY}px`;
    });

    document.addEventListener("mouseleave", () => {
        light.style.opacity = "0";
    });

    document.addEventListener("mouseenter", () => {
        light.style.opacity = "1";
    });
})();

/* =====================================
   JG - CONTROLE DO PRELOADER
===================================== */

(() => {
    const preloader = document.getElementById("preloader");

    if (!preloader) return;

    const hidePreloader = () => {
        preloader.classList.add("loaded");

        setTimeout(() => {
            preloader.remove();
        }, 900);
    };

    if (document.readyState === "complete") {
        setTimeout(hidePreloader, 900);
    } else {
        window.addEventListener("load", () => {
            setTimeout(hidePreloader, 900);
        }, { once: true });
    }
})();
