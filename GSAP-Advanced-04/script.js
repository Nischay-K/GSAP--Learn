const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

function breakTheText(){
    var h1 = document.querySelector("h1")
    var h1Text = h1.textContent          
                                                                                
    var splittedText = h1Text.split("")  
    var halfValue = Math.floor(splittedText.length / 2)   

    var clutter = ""                     
                                                                        
    splittedText.forEach((e , i) => {
        if (i < halfValue){
            clutter += `<span class = "a">${e}</span>`
        }else {
            clutter += `<span class = "b">${e}</span>`
        }
    })                                   
                                                                             
    h1.innerHTML = clutter               
}

breakTheText()

// gsap.from("h1 span" , {
    // y : 75,
    // opacity : 0,
    // stagger : 0.15,
    // duration : 0.8,
    // delay : 0.5
// })

if (!prefersReducedMotion) {
    gsap.from("#page1 h1 .a" , {
        y : 80,
        opacity : 0,
        duration : 1,
        delay : 0.5,
        stagger : 0.15
    })

    gsap.from("#page1 h1 .b" , {
        y : 80,
        opacity : 0,
        duration : 1,
        delay : 0.5,
        stagger : -0.15
    })
}

// Scroll animations of page -> 2

document.querySelectorAll(".marque").forEach((marque) => {
    const label = marque.querySelector("h1")

    while (marque.scrollWidth < window.innerWidth) {
        const copy = label.cloneNode(true)
        copy.setAttribute("aria-hidden", "true")
        marque.appendChild(copy)
    }

    Array.from(marque.children).forEach((item) => {
        const copy = item.cloneNode(true)
        copy.setAttribute("aria-hidden", "true")
        marque.appendChild(copy)
    })
})

function wheelAnimation() {
    window.addEventListener("wheel" , (event) => {
        gsap.to(".marque", {
            xPercent: event.deltaY > 0 ? -50 : 0,
            ease: "none",
            duration: document.querySelector(".marque").scrollWidth / 160,
            repeat: -1,
            overwrite: "auto"
        })
    })                                            
}

if (!prefersReducedMotion) {
    wheelAnimation()

    const ticker = document.querySelector("#move")
    const tickerReveal = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            gsap.from(ticker, {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            })
            tickerReveal.disconnect()
        }
    }, { threshold: 0.25 })

    tickerReveal.observe(ticker)

    const finale = document.querySelector(".finale-content")
    const finaleReveal = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            gsap.from(".final-line", {
                yPercent: 110,
                opacity: 0,
                duration: 0.9,
                stagger: 0.18,
                ease: "power3.out"
            })
            gsap.from(".finale-kicker", {
                y: 12,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out"
            })
            finaleReveal.disconnect()
        }
    }, { threshold: 0.35 })

    finaleReveal.observe(finale)
}

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

const cursorGlow = document.querySelector("#cursor-glow")
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches

if (!prefersReducedMotion && finePointer) {
    gsap.set(cursorGlow, { xPercent: -50, yPercent: -50 })
    const moveCursorX = gsap.quickTo(cursorGlow, "x", { duration: 0.18, ease: "power3.out" })
    const moveCursorY = gsap.quickTo(cursorGlow, "y", { duration: 0.18, ease: "power3.out" })

    window.addEventListener("pointermove", (event) => {
        cursorGlow.classList.add("is-visible")
        moveCursorX(event.clientX)
        moveCursorY(event.clientY)
    })

    document.querySelectorAll(".scroll-cue, #move").forEach((target) => {
        target.addEventListener("pointerenter", () => {
            gsap.to(cursorGlow, { scale: 1.7, duration: 0.2, overwrite: true })
        })
        target.addEventListener("pointerleave", () => {
            gsap.to(cursorGlow, { scale: 1, duration: 0.2, overwrite: true })
        })
    })
}