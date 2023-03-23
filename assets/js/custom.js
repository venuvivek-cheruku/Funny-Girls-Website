
//! feature section slider
// Get the necessary DOM elements
const fiSlider = document.querySelector('.featured-in-slider');
const fiSlidesContainer = fiSlider.querySelector('.featured-ins-container');
const fiSlides = fiSlider.querySelectorAll('.featuredIn-slide');
const fiDotsContainer = fiSlider.querySelector('.featured-in-dots-container');
const fiDots = fiDotsContainer.querySelectorAll('.featured-in-dot');
const fiPrevArrow = fiSlider.querySelector('.featured-in-arrow.prev');
const fiNextArrow = fiSlider.querySelector('.featured-in-arrow.next');

// Set up the initial state
let fiCurrentSlide = 0;
let isFiAutoPlay = true;
const fiAutoPlayInterval = 5000; // Change this to adjust the auto play speed

// Show the first slide
fiShowSlide(fiCurrentSlide);

// Set up the event listeners
fiPrevArrow.addEventListener('click', () => {
  fiShowSlide(fiCurrentSlide - 1);
  resetAutoPlay();
});

fiNextArrow.addEventListener('click', () => {
  fiShowSlide(fiCurrentSlide + 1);
  resetAutoPlay();
});

fiDotsContainer.addEventListener('click', e => {
  if (e.target.classList.contains('dot')) {
    const index = Array.from(fiDots).indexOf(e.target);
    fiShowSlide(index);
    resetAutoPlay();
  }
});

fiSlider.addEventListener('mouseenter', () => {
  isFiAutoPlay = false;
});

fiSlider.addEventListener('mouseleave', () => {
  isFiAutoPlay = true;
  resetAutoPlay();
});

// Auto play the slides
let fiAutoPlayTimer;

function autoPlay() {
  if (!isFiAutoPlay) return;
  fiAutoPlayTimer = setTimeout(() => {
    fiShowSlide(fiCurrentSlide + 1);
    autoPlay();
  }, fiAutoPlayInterval);
}

function resetAutoPlay() {
  clearTimeout(fiAutoPlayTimer);
  autoPlay();
}

autoPlay();

// Helper function to show a slide
function fiShowSlide(index) {
  // Wrap the index if it goes out of bounds
  if (index < 0) {
    index = fiSlides.length - 1;
  } else if (index >= fiSlides.length) {
    index = 0;
  }

  // Update the current slide index
  fiCurrentSlide = index;

  // Move the fiSlides container to show the current slide
  const slideWidth = fiSlides[0].offsetWidth;
  fiSlidesContainer.style.transform = `translateX(-${slideWidth * index}px)`;

  // Update the active dot
  Array.from(fiDots).forEach(dot => dot.classList.remove('active'));
  fiDots[index].classList.add('active');
}






//!testimonials slider
// Get testimonials and testimonial slider container
const testimonials = document.querySelectorAll('.testimonial');
const testimonialSlider = document.querySelector('.testimonial-container');

// Set initial variables
let autoScroll = true;
let mouseDown = false;
let startX;
let scrollLeft;
let activeIndex = 0;
// let activeIndex = Math.floor(testimonials.length / 2);

// Set initial active testimonial and add click event listener
testimonials.forEach((testimonial, index) => {
  if (index === activeIndex) {
    testimonial.classList.add('active');
  }
  
  testimonial.addEventListener('click', () => {
    testimonials.forEach(t => {
      t.classList.remove('active');
      autoScroll = false;
    });
    testimonial.classList.add('active');
    autoScroll = false;
  });
  

  
  // Add hover event listener to stop autoplay
  testimonial.addEventListener('mouseover', () => {
    autoScroll = false;
  });

  // Add mouse down event listener for dragging
  testimonial.addEventListener('mousedown', e => {
    mouseDown = true;
    startX = e.pageX - testimonial.offsetLeft;
    scrollLeft = testimonial.scrollLeft;
    // testimonial.classList.add('active');
  });

  // Add mouse up and mouse leave event listeners for dragging
  testimonial.addEventListener('mouseup', () => {
    mouseDown = false;
  });

  testimonial.addEventListener('mouseleave', () => {
    mouseDown = false;
    autoScroll = true;

  });

  // Add mouse move event listener for dragging
  testimonial.addEventListener('mousemove', e => {
    if (!mouseDown) return;
    e.preventDefault();
    const x = e.pageX - testimonial.offsetLeft;
    const walk = (x - startX) * 2; // adjust scroll speed here
    testimonial.scrollLeft = scrollLeft - walk;
  });

  // Add scroll event listener for autoplay
  testimonial.addEventListener('scroll', () => {
    if (autoScroll && testimonial.classList.contains('active')) {
      autoScroll = false;
      setTimeout(() => {
        autoScroll = true;
      }, 5000); // adjust slide delay here
      const nextTestimonial = testimonial.nextElementSibling;
      if (nextTestimonial) {
        testimonialSlider.scrollLeft += nextTestimonial.getBoundingClientRect().left - testimonialSlider.getBoundingClientRect().left;
      } else {
        testimonialSlider.scrollLeft = 0;
      }
    }
  });
});

// Handle dragging with the mouse
const row = document.querySelector(".testimonial-container");
let isDragging = false;

row.addEventListener("mousedown", (event) => {
  isDragging = true;
  event.preventDefault();
  startX = event.pageX - row.offsetLeft;
  scrollLeft = row.scrollLeft;
});

row.addEventListener("mouseleave", (event) => {
  event.preventDefault();
  isDragging = false;
});

row.addEventListener("mouseup", (event) => {
  event.preventDefault();
  isDragging = false;
});

row.addEventListener("mousemove", (event) => {
  if (!isDragging) return;
  event.preventDefault();
  const x = event.pageX - row.offsetLeft;
  const walk = (x - startX) * 3; // Scroll 3x faster than the mouse movement
  row.scrollLeft = scrollLeft - walk;
});

// Automatically scroll to the next testimonial every 5 seconds (adjustable)
setInterval(() => {
  const activeTestimonial = document.querySelector('.testimonial.active');
  if (activeTestimonial && autoScroll) {
    const nextTestimonial = activeTestimonial.nextElementSibling || testimonials[0];
    testimonials.forEach(t => {
      t.classList.remove('active');
    });
    nextTestimonial.classList.add('active');
    testimonialSlider.scrollLeft += nextTestimonial.getBoundingClientRect().left - testimonialSlider.getBoundingClientRect().left;
  }
}, 5000);


// !our stars sliders
const imagesWrapper = document.querySelector('.our-stars-images');
const images = imagesWrapper.querySelectorAll('.our-stars-image-wrapper');
const contents = document.querySelectorAll('.our-stars-content');
const numImages = images.length;
const numContents = contents.length;
let activeIndexS = 0;

function navigateSlider(direction) {
  // Calculate the new active index based on the direction (1 for right, -1 for left)
  activeIndexS = (activeIndexS + direction + numImages) % numImages;

  // Calculate the new translateX value based on the active index
  const translateX = 180 * activeIndexS;

  // Set the display and active classes for each image and content element
  images.forEach((image, i) => {
    const content = contents[i % numContents];
   
    if (i === activeIndexS) {
      content.classList.add('active');
      image.classList.add('active');
    } else {
      image.classList.remove('active');
      content.classList.remove('active');
    }

    // Apply the new translateX value as a transform
    image.style.transform = `translateX(${translateX}px)`;
  });
}

// Attach click event handlers to left and right arrows
document.querySelector('.left-arrow').addEventListener('click', () => {
  navigateSlider(-1);
});

document.querySelector('.right-arrow').addEventListener('click', () => {
  navigateSlider(1);
});

// !our stars sliders mobile
const mobileImagesWrapper = document.querySelector('.our-stars-images.mobile-stars');
const mobileImages = mobileImagesWrapper.querySelectorAll('.our-stars-image-wrapper.mobile-stars');
const mobileContents = document.querySelectorAll('.our-stars-content.mobile-stars');
const mobileNumImages = mobileImages.length;
const mobileNumContents = mobileContents.length;
let mobileActiveIndex = 0;

function mobileNavigateSlider(direction) {
  // Calculate the new active index based on the direction (1 for right, -1 for left)
  mobileActiveIndex = (mobileActiveIndex + direction + mobileNumImages) % mobileNumImages;

  // Calculate the new translateX value based on the active index
  const translateX = 180 * mobileActiveIndex;

  // Set the display and active classes for each image and content element
  mobileImages.forEach((image, i) => {
    const content = mobileContents[i % mobileNumContents];
   
    if (i === mobileActiveIndex) {
      content.classList.add('active');
      image.classList.add('active');
    } else {
      image.classList.remove('active');
      content.classList.remove('active');
    }

    // Apply the new translateX value as a transform
    image.style.transform = `translateX(${translateX}px)`;
  });
}

// Attach click event handlers to left and right arrows
document.querySelector('.mobile-left-arrow').addEventListener('click', () => {
  mobileNavigateSlider(-1);
});

document.querySelector('.mobile-right-arrow').addEventListener('click', () => {
  mobileNavigateSlider(1);
});


// !GSAP animations

gsap.registerPlugin(ScrollTrigger);



const reavealTL = gsap.timeline({
  scrollTrigger: {
    trigger: ".reveal-item",
    start: "top bottom", // when the top of the trigger hits the top of the viewport
    end: "bottom bottom", // end after scrolling 500px beyond the start
    markers: false,
    once: true,
  },
});

reavealTL.to(".reveal-item .char", {
  y: 0,
  opacity: 1,
  stagger: 0.03,
  duration: 0.01,
  ease: "power4.out",
});


//!  hamburger button
const mobileNavContainer = document.querySelector(".mobile-menu-container");
const hamburgerButton = document.querySelector("#humburger-menu");

// Add a click event listener to the hamburger button
hamburgerButton.addEventListener("click", function () {
  // Toggle the "open" class on the mobile-nav-container
  mobileNavContainer.classList.toggle("open");
  hamburgerButton.classList.toggle("open");
});
