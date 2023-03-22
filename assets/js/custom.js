
//! feature section slider
// Get the slider container element
const slider = document.querySelector('.featured-slider');

// Get the slider arrows and dots
const prevArrow = document.querySelector('.arrow.prev');
const nextArrow = document.querySelector('.arrow.next');
const dots = document.querySelectorAll('.feature-slider-dots .dot');

// Set the autoplay interval in milliseconds
const autoplayInterval = 2000;

// Initialize the current slide index and autoplay interval ID
let currentSlideIndex = 0;
let autoplayIntervalId = null;

// Function to show the current slide
const showSlide = () => {
  // Hide all slides
  const slides = slider.querySelectorAll('.featured-slide');
  slides.forEach((slide) => slide.classList.remove('active'));

  // Show the current slide
  slides[currentSlideIndex].classList.add('active');

  // Update the dots
  dots.forEach((dot, index) => {
    if (index === currentSlideIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
};

// Function to go to the next slide
const nextSlide = () => {
  currentSlideIndex++;
  if (currentSlideIndex >= slider.children.length) {
    currentSlideIndex = 0;
  }
  showSlide();
};

// Function to go to the previous slide
const prevSlide = () => {
  currentSlideIndex--;
  if (currentSlideIndex < 0) {
    currentSlideIndex = slider.children.length - 1;
  }
  showSlide();
};

// Start autoplay
autoplayIntervalId = setInterval(nextSlide, autoplayInterval);

// Add event listeners to the arrows and dots
prevArrow.addEventListener('click', () => {
  clearInterval(autoplayIntervalId);
  prevSlide();
  autoplayIntervalId = setInterval(nextSlide, autoplayInterval);
});

nextArrow.addEventListener('click', () => {
  clearInterval(autoplayIntervalId);
  nextSlide();
  autoplayIntervalId = setInterval(nextSlide, autoplayInterval);
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    clearInterval(autoplayIntervalId);
    currentSlideIndex = index;
    showSlide();
    autoplayIntervalId = setInterval(nextSlide, autoplayInterval);
  });
});






//!testimonials slider
// Get testimonials and testimonial slider container
const testimonials = document.querySelectorAll('.testimonial');
const testimonialSlider = document.querySelector('.testimonial-container');

// Set initial variables
let autoScroll = true;
let mouseDown = false;
let startX;
let scrollLeft;
let activeIndex = Math.floor(testimonials.length / 2);

// Set initial active testimonial and add click event listener
testimonials.forEach((testimonial, index) => {
  if (index === activeIndex) {
    testimonial.classList.add('active');
  }
  
  testimonial.addEventListener('click', () => {
    testimonials.forEach(t => {
      t.classList.remove('active');
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
    testimonial.classList.add('active');
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


