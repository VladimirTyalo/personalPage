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
    burgerBtn.addEventListener("click", function (ev) {
      ev.preventDefault();
      toggleMenu();
    });
  }

  function toggleMenu() {
    burgerBtn.classList.toggle("header__menu-icon--close");
    modalMenu.classList.toggle("header__menu-list--closed");
  }
})();

// certificates module
(function () {
  "use strict";

  var ICON_CLASS = "education__icon-show";
  var NEW_WINDOW_CLASS = 'new-window';
  var undercover = document.querySelector(".undercover");
  var education = document.querySelector(".education");
  var oldPdfElement;

  education.addEventListener("click", function iconClickHandler(ev) {
    ev.preventDefault();
    var target = ev.target;
    // if it contains new-window class open link in a new window
    if(target.classList.contains(NEW_WINDOW_CLASS)) {
      var url = target.getAttribute('data-provider-pdf');
      window.open(url, '_blank');
      return;
    }
    // if click was not on an icon return
    if (!target.classList.contains(ICON_CLASS)) return;
    if (oldPdfElement && !oldPdfElement.classList.contains("hidden")) {
      oldPdfElement.classList.add("hidden");
    }
    var id = target.getAttribute("for");
    var pdfElem = document.getElementById(id);

    oldPdfElement = pdfElem;
    pdfElem.classList.remove("hidden");
    undercover.classList.remove("hidden");

    window.addEventListener("keydown", function keyHandler(ev) {
      var key = ev.keyCode;
      // when esc pressed hide undercover and pdf itself
      if (key === 27) {
        closeModal();
        window.removeEventListener("keydown", keyHandler);
      }
    });

    undercover.addEventListener("click", function disablePdf(ev) {
      var target = ev.target;
      if (target === undercover) {
        closeModal();
        undercover.removeEventListener("click", disablePdf);
      }
    });

    function fireClick(elem) {
      if (typeof elem == "string") elem = document.getElementById(objID);
      if (!elem) return;

      if (document.dispatchEvent) {   // W3C
        var oEvent = document.createEvent("MouseEvents");
        oEvent.initMouseEvent("click", true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, elem);
        elem.dispatchEvent(oEvent);
      }
      else if (document.fireEvent) {   // IE
        elem.click();
      }
    }

    function closeModal() {
      if (!pdfElem.classList.contains("hidden")) {
        pdfElem.classList.add("hidden");
      }
      if (!undercover.classList.contains("hidden")) {
        undercover.classList.add("hidden");
      }
    }
  })();
})();
