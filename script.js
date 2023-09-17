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
