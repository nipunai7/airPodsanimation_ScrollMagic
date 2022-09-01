// const intro = document.querySelector('.intro');
// const video = intro.querySelector('video');
const image = document.getElementById('testImage')
const imageArea = document.querySelector('.imageArea')
const text = imageArea.querySelector('h1');
const section = document.querySelector('section');
const textArea = document.querySelector('.textArea')
const textAnimation = textArea.querySelector('.fancy');
const strText = textAnimation.textContent;
const splitText = strText.split("");
textAnimation.textContent = "";

//const end = section.querySelector('h1');

const controller = new ScrollMagic.Controller();

function addLeadingZeros(num, totalLength) {
    return String(num).padStart(totalLength, '0');
  }

  for (let index = 0; index < splitText.length; index++) {
    if (splitText[index] == " "){
        textAnimation.innerHTML += "<span>&nbsp;</span>";
    }else{
        textAnimation.innerHTML += "<span>" + splitText[index] + "</span>";
    }
    
}

// let scene = new ScrollMagic.Scene({
//     duration: 15000,
//     triggerElement: intro,
//     triggerHook:0
// })

// //.addIndicators()
// .setPin(intro)
// .addTo(controller);

const textAnim = TweenMax.fromTo(text, 3, {opacity: 1}, {opacity:0});

let scene2 = new ScrollMagic.Scene({
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

//.addIndicators()
.setPin(imageArea)
.addTo(controller);


let scene4 = new ScrollMagic.Scene({
    duration: 3500,
    triggerElement: textArea,
    triggerHook:0
})

//.addIndicators()
.setPin(textArea)
.addTo(controller);

let accelAmount = 0.1;
let scrollpos = 0;
let delay = 0;
let imageSequence = 1;
let char = 0;
let scrollDirection = 'FORWARD'

// scene.on('update', e => {
//     scrollpos = (e.scrollPos-3200) / 1000;
// });

scene3.on('update', e => {
    imageSequence = parseInt((e.scrollPos) / 20);
});

scene4.on('update', e => {
    char = parseInt((e.scrollPos-3900) / 100);
    scrollDirection = e.target.controller().info("scrollDirection");
    console.log(char, scrollDirection);
});


setInterval(() => {
    // delay += (scrollpos - delay) * accelAmount;
    // video.currentTime = delay;
    //const span = textAnimation.querySelectorAll('span')[char];

    if (imageSequence > 0 && imageSequence < 190){
        image.src = `./images/ezgif-frame-${addLeadingZeros(imageSequence,3)}.jpg`
    }else{
        image.src = `./images/ezgif-frame-001.jpg`
    }
    if (char >= 0 && char <= 27){
        if (scrollDirection == 'FORWARD'){
            for (let index = 0; index <= char; index++) {
                textAnimation.querySelectorAll('span')[index].classList.add('fade')
            }
        } else if (scrollDirection == 'REVERSE'){
            for (let index = char ; index <= splitText.length+1; index++) {
                textAnimation.querySelectorAll('span')[index].classList.remove('fade')
            }
        }
    }
    
    
}, 33.36)