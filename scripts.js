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

var images = [];

for (let index = 0; index < 196; index++) {
    images.push(new Image())
    images[index].src = '/images/Image' + index + '.jpg';
}

const controller = new ScrollMagic.Controller();

function addLeadingZeros(num, totalLength) {
    return String(num).padStart(totalLength, '0');
}

for (let index = 0; index < splitText.length; index++) {
    if (splitText[index] == " ") {
        textAnimation.innerHTML += "<span>&nbsp;</span>";
    } else {
        textAnimation.innerHTML += "<span>" + splitText[index] + "</span>";
    }

}

const textAnim = TweenMax.fromTo(text, 3, { opacity: 1 }, { opacity: 0 });
const section2 = TweenMax.to({opacity:1})

let scene2 = new ScrollMagic.Scene({
    duration: 3200,
    triggerElement: imageArea,
    triggerHook: 0
})
    .setTween(textAnim)
    .addTo(controller)

let scene3 = new ScrollMagic.Scene({
    duration: 3200,
    triggerElement: imageArea,
    triggerHook: 0
})

    // .addIndicators()
    .setClassToggle("#section1", "hover")
    .setPin(imageArea)
    .addTo(controller);


let scene4 = new ScrollMagic.Scene({
    duration: 3500,
    triggerElement: textArea,
    triggerHook: 0
})

    .setClassToggle("#section2", "hover") // add class to reveal
    .setTween(section2)
    // .addIndicators()
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
    char = parseInt((e.scrollPos - 3900) / 100);
    scrollDirection = e.target.controller().info("scrollDirection");
    //console.log(char, scrollDirection);
});


setInterval(() => {
    // delay += (scrollpos - delay) * accelAmount;
    // video.currentTime = delay;
    //const span = textAnimation.querySelectorAll('span')[char];

    if (imageSequence > 0 && imageSequence < 190) {
        image.src = `./images/Image${imageSequence}.jpg`
    } else {
        image.src = `./images/Image1.jpg`
    }
    if (char >= 0 && char <= 27) {
        if (scrollDirection == 'FORWARD') {
            for (let index = 0; index <= char; index++) {
                textAnimation.querySelectorAll('span')[index].classList.add('cfade')
            }
        } else if (scrollDirection == 'REVERSE') {
            for (let index = char; index <= splitText.length + 1; index++) {
                textAnimation.querySelectorAll('span')[index].classList.remove('cfade')
            }
        }
    }else if(char > 27){
        for (let index = 0; index <= 27; index++) {
            textAnimation.querySelectorAll('span')[index].classList.add('cfade')
        }
    }


}, 33.36)


new ScrollMagic.Scene({
    triggerElement: "#trigger3",
    triggerHook: 0.9, // show, when scrolled 10% into view
    duration: "80%", // hide 10% before exiting view (80% + 10% from bottom)
    offset: 50 // move trigger to center of element
})
.setClassToggle("#reveal1", "visible") // add class to reveal
// .addIndicators() // add indicators (requires plugin)
.addTo(controller);