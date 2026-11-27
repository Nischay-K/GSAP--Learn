const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

const progressBar = document.querySelector("#scroll-progress")
const progressFill = progressBar.querySelector("span")
const setProgress = prefersReducedMotion
    ? (value) => gsap.set(progressFill, { scaleX: value })
    : gsap.quickTo(progressFill, "scaleX", { duration: 0.15, ease: "power2.out" })

function updateScrollProgress() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const progress = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0

    setProgress(progress)
    progressBar.setAttribute("aria-valuenow", Math.round(progress * 100).toString())
}

window.addEventListener("scroll", updateScrollProgress, { passive: true })
window.addEventListener("resize", updateScrollProgress)
updateScrollProgress()

if (!prefersReducedMotion) {
    const intro = gsap.timeline({ defaults: { ease: "power3.out" } })

    intro
        .from(".topbar", { y: -16, opacity: 0, duration: 0.6 })
        .from(
            ".project-copy .eyebrow, #feature-title, .project-description, .project-link",
            { y: 28, opacity: 0, duration: 0.7, stagger: 0.12 },
            "-=0.25"
        )
        .from(".project-art", { y: 28, opacity: 0, scale: 0.98, duration: 0.8 }, "-=0.65")

    const details = document.querySelector(".project-details")
    const detailsReveal = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            gsap.from(".project-details > *", {
                y: 30,
                opacity: 0,
                duration: 0.7,
                stagger: 0.12,
                ease: "power3.out"
            })
            detailsReveal.disconnect()
        }
    }, { threshold: 0.25 })

    detailsReveal.observe(details)

    const revealTargets = document.querySelectorAll(".project-card, .about")
    const contentReveal = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                gsap.from(entry.target, {
                    y: 30,
                    opacity: 0,
                    duration: 0.7,
                    ease: "power3.out"
                })
                observer.unobserve(entry.target)
            }
        })
    }, { threshold: 0.15 })

    revealTargets.forEach((target) => contentReveal.observe(target))

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    if (finePointer) {
        const projectArt = document.querySelector(".project-art")
        const artOrbit = document.querySelector(".art-orbit")
        const rotateX = gsap.quickTo(projectArt, "rotationX", { duration: 0.35, ease: "power2.out" })
        const rotateY = gsap.quickTo(projectArt, "rotationY", { duration: 0.35, ease: "power2.out" })
        const orbitX = gsap.quickTo(artOrbit, "x", { duration: 0.5, ease: "power2.out" })
        const orbitY = gsap.quickTo(artOrbit, "y", { duration: 0.5, ease: "power2.out" })

        gsap.set(projectArt, { transformPerspective: 1000 })

        projectArt.addEventListener("pointermove", (event) => {
            const bounds = projectArt.getBoundingClientRect()
            const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
            const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2

            rotateX(-y * 4)
            rotateY(x * 4)
            orbitX(x * 14)
            orbitY(y * 14)
        })

        projectArt.addEventListener("pointerleave", () => {
            rotateX(0)
            rotateY(0)
            orbitX(0)
            orbitY(0)
        })
    }
}