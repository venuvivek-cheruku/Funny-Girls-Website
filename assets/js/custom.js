// Get the mobile-nav-container element and the hamburger button element
const mobileNavContainer = document.querySelector(".mobile-menu-container");
const hamburgerButton = document.querySelector("#humburger-menu");

// Add a click event listener to the hamburger button
hamburgerButton.addEventListener("click", function () {
  // Toggle the "open" class on the mobile-nav-container
  mobileNavContainer.classList.toggle("open");
  hamburgerButton.classList.toggle("open");
});

// Get the element whose background color will change
var element = document.getElementById("nav-container");
var elementmobile = document.getElementById("nav-container-mobile");

// Check the initial scroll position on page load
window.addEventListener("load", function () {
  var scrollPosition = window.scrollY;
  if (scrollPosition > 1) {
    element.style.backgroundColor = "#122045";
    elementmobile.style.backgroundColor = "#122045";
  }
});

// Add a scroll event listener to the window object
window.addEventListener("scroll", function () {
  // Check the current scroll position
  if (window.scrollY > 1) {
    // If the user has scrolled by at least 1 pixel, change the background color
    element.style.backgroundColor = "#122045";
    elementmobile.style.backgroundColor = "#122045";
  } else {
    // Otherwise, revert the background color to its original value
    element.style.backgroundColor = "transparent";
    elementmobile.style.backgroundColor = "transparent";
  }
});

// var customCursor =
//   "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='aquamarine'/%3E%3Ctext x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='blue' font-size='14'>find out more%3C/text%3E%3C/svg%3E\") 50 50, pointer";

// function changeCursor(element) {
//   element.style.cursor = customCursor;
//   element.style.transform = "scale(0.1), transition: all 0.2s ease-in-out";
// }

gsap.registerPlugin(ScrollTrigger);

const cursor = document.querySelector(".cursor");
const cursorOne = document.querySelector(".cursor-one");
const cursorTwo = document.querySelector(".cursor-two");
const cursorThree = document.querySelector(".cursor-three");
const cursorPhone = document.querySelector(".cursor-phone");
const cursorMail = document.querySelector(".cursor-mail");
const gridBoxes = document.querySelector(".grid-box");
const links = document.querySelector(".cursor-pointer");
const btn = document.querySelector(".cursor-eye");
let scale = 1;

function mousemoveHandler(e) {
  const target = e.target;
  const tl = gsap.timeline({
    defaults: {
      x: e.clientX,
      y: e.clientY,
      ease: "power2.out",
    },
  });

  // console.log(e.target);

  if (target.classList.contains("cta")) {
    tl.to(cursorTwo, {
      opacity: 0,
    }).to(
      cursorThree,
      {
        opacity: 0.5,
        scale: 1.5,
      },
      "-=0.5"
    );
    return;
  }

  if (target.classList.contains("tel")) {
    tl.to(cursorTwo, {
      opacity: 0,
    }).to(
      cursorPhone,
      {
        opacity: 0.5,
        scale: 1.5,
      },
      "-=0.5"
    );
    return;
  }

  if (target.classList.contains("email")) {
    tl.to(cursorTwo, {
      opacity: 0,
    }).to(
      cursorMail,
      {
        opacity: 0.5,
        scale: 1.5,
      },
      "-=0.5"
    );
    return;
  }

  if (
    target.tagName.toLowerCase() === "main" ||
    target.tagName.toLowerCase() === "canvas" ||
    target.tagName.toLowerCase() === "nav" ||
    target.classList.contains("footer-container") ||
    target.classList.contains("template-container") ||
    target.classList.contains("contact-details-container")
  ) {
    gsap.to(".cursor", {
      opacity: 0,
    });
    return;
  }

  if (target.closest(".grid-content")) {
    tl.to(cursorOne, {
      opacity: 0,
    }).to(
      cursorTwo,
      {
        opacity: 1,
      },
      "-=0.5"
    );
  } else if (target.classList.contains("cursor-pointer")) {
    tl.to(cursorTwo, {
      opacity: 0,
    }).to(
      cursorOne,
      {
        opacity: 0.5,
        scale: 1.5,
      },
      "-=0.5"
    );
  } else {
    tl.to(cursorThree, {
      opacity: 0,
      scale: scale,
    }).to(
      cursorTwo,
      {
        opacity: 0,
      },
      "-=0.5"
    );
  }
}

function mouseleaveHandler() {
  gsap.to(".cursor", {
    opacity: 0,
  });
}

document.addEventListener("scroll", function (e) {
  gsap.to(".cursor", {
    opacity: 0,
  });
});

document.addEventListener("wheel", function (e) {
  gsap.to(".cursor", {
    opacity: 0,
  });
});

document.addEventListener("mousemove", mousemoveHandler);
document.addEventListener("mouseleave", mouseleaveHandler);

// contact form styles

let inputElements = document.querySelectorAll(".inputClass");

inputElements.forEach((element) => {
  if (element.value !== "" && element.value !== "on") {
    element.parentElement.querySelector(".label").classList.add("has-value");
  }

  element.addEventListener("blur", (event) => {
    if (event.target.value === "") {
      event.target.parentElement
        .querySelector(".label")
        .classList.remove("has-value");
    } else {
      event.target.parentElement
        .querySelector(".label")
        .classList.add("has-value");
    }
  });
});
