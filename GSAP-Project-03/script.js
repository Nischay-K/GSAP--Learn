gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const scrollProgress = document.querySelector(".scroll-progress");
document.querySelector("#current-year").textContent = new Date().getFullYear().toString();

function page1Animation() {
    const introTargets = [
        "nav h1",
        ".part2 a:not(.nav-cta)",
        ".center-part1 h1",
        ".center-part1 p",
        ".center-cta",
        ".center-part2 img",
        ".section1bottom li"
    ];
    const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
            gsap.set(introTargets, { clearProps: "transform,opacity,visibility" });
        }
    });

    timeline
        .from("nav h1, .part2 a:not(.nav-cta)", {
            y: -24,
            autoAlpha: 0,
            duration: 0.65,
            stagger: 0.08
        })
        .from(".center-part1 h1", {
            x: -52,
            autoAlpha: 0,
            duration: 0.72
        }, "-=0.2")
        .from(".center-part1 p", {
            y: 18,
            autoAlpha: 0,
            duration: 0.55
        }, "-=0.34")
        .from(".center-cta", {
            y: 16,
            autoAlpha: 0,
            duration: 0.45
        }, "-=0.25")
        .from(".center-part2 img", {
            x: 52,
            autoAlpha: 0,
            duration: 0.75
        }, "<")
        .from(".section1bottom li", {
            y: 16,
            autoAlpha: 0,
            duration: 0.5,
            stagger: 0.08
        }, "-=0.35");
}

if (scrollProgress) {
    gsap.to(".scroll-progress-bar", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate: (trigger) => {
                scrollProgress.setAttribute("aria-valuenow", Math.round(trigger.progress * 100).toString());
            }
        }
    });
}

if (!prefersReducedMotion) {
    page1Animation();

    gsap.fromTo(
        ".services h2, .services p",
        { autoAlpha: 0, y: 20 },
        {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".services",
                start: "top 86%",
                once: true
            },
            onComplete: () => {
                gsap.set(".services h2, .services p", { clearProps: "transform,opacity,visibility" });
            }
        }
    );

    gsap.utils.toArray(".element").forEach((card, index) => {
        gsap.fromTo(
            card,
            {
                autoAlpha: 0,
                x: index % 2 === 0 ? -64 : 64,
                y: 24
            },
            {
                autoAlpha: 1,
                x: 0,
                y: 0,
                duration: 0.85,
                delay: index % 2 === 0 ? 0 : 0.14,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 88%",
                    once: true
                },
                onComplete: () => {
                    gsap.set(card, { clearProps: "transform,opacity,visibility" });
                }
            }
        );
    });

    gsap.fromTo(
        ".process-heading > *",
        { autoAlpha: 0, y: 20 },
        {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".process-heading",
                start: "top 86%",
                once: true
            },
            onComplete: () => {
                gsap.set(".process-heading > *", { clearProps: "transform,opacity,visibility" });
            }
        }
    );

    gsap.utils.toArray(".process-step").forEach((step, index) => {
        gsap.fromTo(
            step,
            { autoAlpha: 0, y: 28 },
            {
                autoAlpha: 1,
                y: 0,
                duration: 0.7,
                delay: index * 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: step,
                    start: "top 88%",
                    once: true
                },
                onComplete: () => {
                    gsap.set(step, { clearProps: "transform,opacity,visibility" });
                }
            }
        );
    });

    gsap.to(".service-illustration", {
        y: -7,
        rotation: 2,
        duration: 2.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: {
            each: 0.25,
            from: "random"
        }
    });

    gsap.utils.toArray(".footer-reveal").forEach((element, index) => {
        gsap.fromTo(
            element,
            { autoAlpha: 0, y: 24 },
            {
                autoAlpha: 1,
                y: 0,
                duration: 0.7,
                delay: index * 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 92%",
                    once: true
                },
                onComplete: () => {
                    gsap.set(element, { clearProps: "transform,opacity,visibility" });
                }
            }
        );
    });

    gsap.fromTo(
        ".footer-orbit",
        { autoAlpha: 0, scale: 0.88, rotation: -12 },
        {
            autoAlpha: 1,
            scale: 1,
            rotation: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".site-footer",
                start: "top 92%",
                once: true
            },
            onComplete: () => {
                gsap.set(".footer-orbit", { clearProps: "transform,opacity,visibility" });
            }
        }
    );
}
