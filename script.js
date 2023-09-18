"use strict";

/**
 * ! This is Main section
 * ? This is Sub section
 * * This is Information
 * @param
 */

///////////////////////////////////////
// ! Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((button) => {
  button.addEventListener("click", (e) => openModal(e));
});

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// ! Theory

// * getElementsByTagName returns a live HTMLCollection of all the elements with the name 'button'
// * HTMLCollection unlike NodeList updates automatically

// const allButtons = document.getElementsByTagName("button");
// console.log(allButtons);

// * CREATING ELEMENTS IN DOM

// const message = document.createElement("div");
// message.classList.add("cookie-message");

// message.innerHTML =
//   ' We use cookies for improved functionality and performance. <button class="btn btn--close-cookie">Got it!</button>';

// const header = document.querySelector(".header");

// header.prepend(message); // * adds the element as the last child of header

// header.append(message); // * adds the element as the first child of header

//* the element message is unique, therefore prepending and appending it wont make another copy but will just move its position

// * if we had to make multiple copies, cloneNode(true) must be used

// header.append(message.cloneNode(true));

// header.before(message); // * adds the element before the header as a sibling element
// header.after(message); // * adds the element after the header as a sibling element

// * REMOVING ELEMENTS IN DOM

// document.querySelector(".btn--close-cookie").addEventListener("click", () => {
//   message.remove(); // * Update version
// message.parentElement.removeChild(message);
// });


// ! Smooth Scrolling 

const btnToScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const section2 = document.querySelector('#section--2');
const section3 = document.querySelector('#section--3');

// * Modern method: scrollIntoView({behavior: 'smooth'}) used for smooth scrolling 

btnToScroll.addEventListener(
  'click', () => {
    section1.scrollIntoView({ behavior: 'smooth' });
  }
);

// * Old school way: Calculate the top and left position of the section, use scrollTo()

// btnToScroll.addEventListener(
//   'click', () => {

//     const section1Coords = section1.getBoundingClientRect();

//     window.scrollTo(
//       {
//         left: section1Coords.left + window.scrollX,
//         top: section1Coords.top + window.scrollY,
//         behavior: 'smooth'
//       }
//     )
//   }
// ); 

// const featureNavLink = document.querySelector('.nav__link_features');
// const operationNavLink = document.querySelector('.nav__link_operations');
// const testimonialsNavLink = document.querySelector('.nav__link_testimonials');

// featureNavLink.addEventListener(
//   'click', (e) => {
//     e.preventDefault();
//     section1.scrollIntoView({ behavior: 'smooth' });
//   }
// )

// operationNavLink.addEventListener(
//   'click', (e) => {
//     e.preventDefault();
//     section2.scrollIntoView({ behavior: 'smooth' });
//   }
// )

// testimonialsNavLink.addEventListener(
//   'click', (e) => {
//     e.preventDefault();
//     section3.scrollIntoView({ behavior: 'smooth' });
//   }
// )

// * Optimized

// document.querySelectorAll('.nav__link').forEach((link) => {
//   link.addEventListener(
//     'click', (event) => {
//       event.preventDefault();
//       const id = link.getAttribute('href');

//       document.querySelector(id).scrollIntoView(
//         {
//           behavior: 'smooth'
//         }
//       )
//     }
//   )
// });

// * Above method not optimal when there are large number of elements 
// * Event Delegation to be used 

// * Steps for Event Delegation: 1) Add common listener to common parent 2) Determine which element triggered the event 

document.querySelector('.nav__links').addEventListener(
  'click', (event) => {
    event.preventDefault();
    if (event.target.classList.contains('nav__link')) {
      const id = event.target.getAttribute('href');
      document.querySelector(id).scrollIntoView({
        behavior: 'smooth'
      });
    }
  }
);


// ! STICKY NAV BAR 

// * 1) Scroll property 

const navPanel = document.querySelector('.nav');
const navHeight = navPanel.getBoundingClientRect().height;
const section1Coords = section1.getBoundingClientRect();
const header = document.querySelector('.header');

// window.addEventListener(
//   'scroll', () => {
//     // console.log(`-----${section1Coords.top}-----`)
//     // console.log(window.scrollY);

//     if (window.scrollY > section1Coords.top) {
//       navPanel.classList.add('sticky');
//     }
//     else {
//       navPanel.classList.remove('sticky');
//     }
//   }
// );

// * 2) Intersection Observer API 

// const obsCallback = function (entries, observer) {
// * entries --> array of threshold values
// * observer --> observer object
//   entries.forEach((entry) => {
//     console.log(entry);
//   });
// }

// const obsOptions = {
//   root: null, // * null --> Observes the view port 
//   threshold: [0, 0.2], // * percent of intersection at which the obsCallback function is called 
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// * Intersection Observer takes a call back function and an options object as parameter

// observer.observe(section1);
// * section1 --> target element 
// * whenever the target element intersects the root element by a certain threshold, the obsCallback function is triggered 

const obsCallback = function (entries, observer) {
  entries.forEach((entry) => {
    console.log(entry);
    if (!entry.isIntersecting) {
      navPanel.classList.add('sticky');
    }
    else {
      navPanel.classList.remove('sticky');
    }
  })
}

const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
  // * rootMargin applies Visual margin '-ve --> above' '+ve --> below'
}

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(header);


// ! REVEAL ON SCROLL 

const sectionObsCallback = function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('section--hidden');
    }
  });
}

const sectionObserver = new IntersectionObserver(sectionObsCallback, {
  root: null,
  threshold: 0.20
})

const sections = document.querySelectorAll('.section').forEach(
  (section) => {
    sectionObserver.observe(section);
  }
);


// ! LAZY LOADING 

const featureImgCallback = function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('lazy-img');

      // * replace src with data-src 
      entry.target.src = entry.target.dataset.src;
    }
  })
}

const featureImageObserver = new IntersectionObserver(featureImgCallback, {
  root: null,
  threshold: 0.5
});

const images = document.querySelectorAll('.features__img').forEach((image) => {
  featureImageObserver.observe(image);
});