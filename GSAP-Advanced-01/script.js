const svg = document.querySelector("#string svg");
const lines = gsap.utils.toArray("#string .interactive-line");
const restingPath = "M 0 120 Q 500 120 1000 120";
const pointer = svg.createSVGPoint();
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function updateLine(event) {
    const matrix = svg.getScreenCTM();
    if (!matrix) {
        return;
    }

    pointer.x = event.clientX;
    pointer.y = event.clientY;

    const localPoint = pointer.matrixTransform(matrix.inverse());
    const x = gsap.utils.clamp(0, 1000, localPoint.x);
    const y = gsap.utils.clamp(0, 240, localPoint.y);
    const nextPath = `M 0 120 Q ${x.toFixed(1)} ${y.toFixed(1)} 1000 120`;

    gsap.to(lines, {
        attr: { d: nextPath },
        duration: prefersReducedMotion ? 0 : 0.18,
        ease: "power3.out",
        overwrite: "auto"
    });
}

function resetLine() {
    gsap.to(lines, {
        attr: { d: restingPath },
        duration: prefersReducedMotion ? 0 : 1.35,
        ease: prefersReducedMotion ? "none" : "elastic.out(1, 0.25)",
        overwrite: "auto"
    });
}

svg.addEventListener("pointermove", updateLine);
svg.addEventListener("pointerleave", (event) => {
    if (event.pointerType === "mouse") {
        resetLine();
    }
});
svg.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "mouse") {
        svg.setPointerCapture(event.pointerId);
    }
    updateLine(event);
});
svg.addEventListener("pointerup", resetLine);
svg.addEventListener("pointercancel", resetLine);
