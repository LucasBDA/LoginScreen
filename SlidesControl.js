//CONTROLE DE SLIDES DE BACKGROUND

let currentSlide = 0;
const slides = document.querySelectorAll('.img-slide');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.classList.remove('inactive');
            slide.style.zIndex = 2; 
        } else {
            slide.classList.add('inactive');
            slide.style.zIndex = 1;
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

showSlide(currentSlide);


const intervalId = setInterval(nextSlide, 7*1000);