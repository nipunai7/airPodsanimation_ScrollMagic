const intro = document.querySelector('.intro');
const video = intro.querySelector('video');
const text = intro.querySelector('h1');

const section = document.querySelector('section');
const end = section.querySelector('h1');

const controller = new ScrollMagic.Controller();

let scene = new ScrollMagic.Scene({
    duration: 15000,
    triggerElement: intro,
    triggerHook:0
})

// .addIndicators()
.setPin(intro)
.addTo(controller);

const textAnim = TweenMax.fromTo(text, 3, {opacity: 1}, {opacity:0});

let textScene = new ScrollMagic.Scene({
    duration:3000,
    triggerElement: intro,
    triggerHook:0
})
.setTween(textAnim)
.addTo(controller)

let accelAmount = 0.1;
let scrollpos = 0;
let delay = 0;

scene.on('update', e => {
    scrollpos = e.scrollPos / 1000;
});

setInterval(() => {
    delay += (scrollpos - delay) * accelAmount;
    console.log(delay, scrollpos);
    video.currentTime = delay;
}, 33.36)