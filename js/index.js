/**
 * Created by vladimir on 7/31/16.
 */
(function () {
    "use strict";

  var burgerBtn = document.querySelector(".header__menu-icon");
  var modalMenu = document.querySelector(".header__menu-list");



  initMenu();
  addListeners();

  function initMenu() {
    toggleMenu();
  }


  function addListeners() {
    burgerBtn.addEventListener("click", function(ev) {
      ev.preventDefault();
      toggleMenu();
    });
  }

  function toggleMenu() {
    burgerBtn.classList.toggle("header__menu-icon--close");
    modalMenu.classList.toggle("header__menu-list--closed");
  }

})();
