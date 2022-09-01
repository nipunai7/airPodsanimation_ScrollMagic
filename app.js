const intro = document.querySelector('.intro');
const video = intro.querySelector('video');
const image = document.getElementById('testImage')
const imageArea = document.querySelector('.imageArea')
const text = imageArea.querySelector('h1');
const section = document.querySelector('section');

//const end = section.querySelector('h1');

const controller = new ScrollMagic.Controller();

function addLeadingZeros(num, totalLength) {
    return String(num).padStart(totalLength, '0');
  }

let scene = new ScrollMagic.Scene({
    duration: 15000,
    triggerElement: intro,
    triggerHook:0
})

.addIndicators()
.setPin(intro)
.addTo(controller);

const textAnim = TweenMax.fromTo(text, 3, {opacity: 1}, {opacity:0});

let textScene = new ScrollMagic.Scene({
    duration:3200,
    triggerElement: imageArea,
    triggerHook:0
})
.setTween(textAnim)
.addTo(controller)

let scene3 = new ScrollMagic.Scene({
    duration: 3200,
    triggerElement: imageArea,
    triggerHook:0
})

.addIndicators()
.setPin(imageArea)
.addTo(controller);

let accelAmount = 0.1;
let scrollpos = 0;
let delay = 0;
let imageSequence = 1;

scene.on('update', e => {
    scrollpos = (e.scrollPos-3200) / 1000;
});

scene3.on('update', k => {
    imageSequence = parseInt((k.scrollPos) / 20);
    console.log(imageSequence);
});

setInterval(() => {
    delay += (scrollpos - delay) * accelAmount;
    //console.log(delay, scrollpos);
    video.currentTime = delay;
    if (imageSequence > 0){
        image.src = `./images/ezgif-frame-${addLeadingZeros(imageSequence,3)}.jpg`
    }else{
        image.src = `./images/ezgif-frame-001.jpg`
    }
    
    
}, 33.36)