// Making the stuffs move according to our needs !!!
// Method -> 1
const tl = gsap.timeline({ paused: true });

var menu = document.querySelector("#nav i")
var cross = document.querySelector("#full i")

tl.to("#full" , {
    right : 0,
    duration : 0.5
})

tl.from("#full h4" , {
    x : 100,
    duration : 0.5,
    stagger : 0.25,
    ease : 'power1.in',
    opacity : 0
})

tl.from("#full i" , {
    opacity : 0
})

// Method -> 2
tl.pause()

menu.addEventListener("click" , () => {
    tl.play() 
    // The above code runs or animates only when we click the menu button
})

cross.addEventListener("click" , () => {
    tl.reverse()
    // Reverse the process!!
})