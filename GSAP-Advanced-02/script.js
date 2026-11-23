const main = document.querySelector("#main");
const cursor = document.querySelector("#cursor");
const image = document.querySelector("#image");
const overlay = document.querySelector("#overlay");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const moveX = gsap.quickTo(cursor, "x", { duration: 0.12, ease: "power2.out" });
const moveY = gsap.quickTo(cursor, "y", { duration: 0.12, ease: "power2.out" });
const imageX = gsap.quickTo(image, "x", { duration: 0.35, ease: "power2.out" });
const imageY = gsap.quickTo(image, "y", { duration: 0.35, ease: "power2.out" });
const rotateX = gsap.quickTo(image, "rotationX", { duration: 0.35, ease: "power2.out" });
const rotateY = gsap.quickTo(image, "rotationY", { duration: 0.35, ease: "power2.out" });

const hoverTimeline = gsap.timeline({ paused: true })
    .to(image, {
        scale: 1.015,
        duration: reduceMotion ? 0 : 0.35,
        ease: "power2.out"
    }, 0)
    .to(overlay, {
        opacity: 1,
        duration: reduceMotion ? 0 : 0.25,
        ease: "power2.out"
    }, 0)
    .to(cursor, {
        scale: 1.5,
        backgroundColor: "rgba(255, 255, 255, 0.35)",
        duration: reduceMotion ? 0 : 0.22,
        ease: "power2.out"
    }, 0);

main.addEventListener("pointermove", (event) => {
    moveX(event.clientX - cursor.offsetWidth / 2);
    moveY(event.clientY - cursor.offsetHeight / 2);
});

image.addEventListener("pointermove", (event) => {
    const bounds = image.getBoundingClientRect();
    const x = gsap.utils.clamp(0, 100, ((event.clientX - bounds.left) / bounds.width) * 100);
    const y = gsap.utils.clamp(0, 100, ((event.clientY - bounds.top) / bounds.height) * 100);

    overlay.style.setProperty("--light-x", `${x}%`);
    overlay.style.setProperty("--light-y", `${y}%`);

    if (!reduceMotion && event.pointerType !== "touch") {
        const offsetX = (x - 50) / 50;
        const offsetY = (y - 50) / 50;
        imageX(offsetX * 5);
        imageY(offsetY * 5);
        rotateX(offsetY * -2);
        rotateY(offsetX * 2);
    }
});

image.addEventListener("pointerenter", () => hoverTimeline.play());
image.addEventListener("pointerleave", () => {
    hoverTimeline.reverse();
    overlay.style.setProperty("--light-x", "50%");
    overlay.style.setProperty("--light-y", "50%");
    imageX(0);
    imageY(0);
    rotateX(0);
    rotateY(0);
});