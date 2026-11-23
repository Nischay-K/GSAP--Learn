// to and from is used here

// Animations is cause of the journey between the initial and the final state
// When we take/move the object from initial to the final position we use -> {.to}
// When we take/move the object from final to initial position we use -> {.from}

// gsap.to("#box" , {
    // x : 1000,
    // rotate : 360,
    // duration : 2,
    // delay : 1,
    // Repeat -> always runs for the repeat + 1 times -> for the below it runs 2 times!!
    // repeat : 3,
    // repeat : -1 -> Runs infinite times 
    // yoyo -> makes the element to come back and go again that is it results in the back and forth movement
    // yoyo : true,
    // backgroundColor : "violet",
    // borderRadius : "50%",
    // scale: 2
// })

// gsap.from("#box2" , {
    // x : 1000,
    // duration : 5,
    // delay : 2,
    // y : 500
// })

// gsap.from("h1", {
    // opacity : 0,
    // color : "blue",
    // y : 40,
    // duration : 3,
    // delay : 1,
    // scale : 1,
    // It displays the first h1 and following h1 with the duration that is alloted!! -> important!!!
    // Stagger allow one after the other that is the properties that we use
    // stagger : -1 -> Reverse the order of the h1 
    // stagger : 0.6
    // 
// })

// Timeline concepts -> here we need to make it synchronous type so that after one move the other more with respect to the first element!!

// var tl = gsap.timeline()
// With the timeline 
// tl.to("#box" , {            
    // x : 1500,                  
    // duration : 1.5,            
    // backgroundColor : "yellow",
    // borderRadius : "50%",      
    // delay : 1                
// })                             

// Without timeline
// gsap.to("#box" , {
    // x : 1500,
    // rotate : 360,
    // duration : 1.5,
    // delay : 1
// })

// With timeline
// tl.to("#box2" , {            
    // x : 1500,                  
    // duration : 1.5,            
    // backgroundColor : "yellow",
    // borderRadius : "50%",      
    // delay : 2.5       No need of delay while using the timelines         
// })                             

// Without timeline
// gsap.to("#box2" , {
    // x : 1500,
    // duration : 1.5,
    // backgroundColor : "yellow",
    // borderRadius : "50%",
    // delay : 2.5
// })

// With timeline
// tl.to("#box3" , {            
    // x : 1500,                  
    // duration : 1.5,            
    // backgroundColor : "yellow",
    // borderRadius : "50%",      
    // delay : 2.5                
// })                             
// 
// Without Timeline
// gsap.to("#box3" , {            
    // x : 1500,                  
    // duration : 1.5,            
    // backgroundColor : "lightgreen",
    // borderRadius : "50%",      
    // delay : 4                
// })                             
// 
// var til = gsap.timeline()
// 
// til.from("h2" , {
    // y : -20,
    // opacity : 0,
    // duration : 2,
    // delay : 0.5
// })
// 
// til.from("h4" , {
    // y : -20,
    // opacity : 0,
    // duration : 2,
    // delay : 0.5
    // stagger : 0.6
// })
// 
// til.from("h1" , {
    // y : -20,
    // opacity : 0,
    // duration : 2,
    // delay : 0.5
    // scale : 0.2
// })
// 

// Scroll Trigger -> Concept
// Important things!!!

gsap.registerPlugin(ScrollTrigger);

const heading = document.querySelector("#page2 h1");
const getTravelDistance = () => Math.max(0, heading.scrollWidth - window.innerWidth);

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.fromTo(heading, {
        x: 0,
        y: 30,
        opacity: 0.4,
        scale: 0.97
    }, {
        x: () => -getTravelDistance(),
        y: 0,
        opacity: 1,
        scale: 1,
        ease: "none",
        scrollTrigger: {
            trigger: "#page2",
            start: "top top",
            end: () => `+=${getTravelDistance() * 0.75}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true
        }
    });
}