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
    var undercover = document.querySelector(".undercover");
    var education = document.querySelector(".education");
    var oldPdfElement;


    if (!undercover || !education) return;

    education.addEventListener("click", function iconClickHandler(ev) {
      ev.preventDefault();
      var target = ev.target;

      // if click was not on an icon return
      if (!target.classList.contains(ICON_CLASS)) return;
      // hide previously opened element
      if (oldPdfElement && !oldPdfElement.classList.contains("hidden")) {
        oldPdfElement.classList.add("hidden");
      }
      var id = target.getAttribute("for");
      var pdfElem = document.getElementById(id);
      var courseProviderPdf = target.getAttribute("data-provider-pdf");
      var localPdf = target.getAttribute("data-local-pdf");

      console.log(courseProviderPdf);
      console.log(localPdf);

      // make anchor tag and trigger click event to open in separate window;

      var element = document.createElement("a");
      element.setAttribute("target","_blank");
      //element.setAttribute("download", "pdf");
      element.setAttribute("href", courseProviderPdf);


      fireClick(element);

      return;

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


      function closeModal() {
        if (!pdfElem.classList.contains("hidden")) {
          pdfElem.classList.add("hidden");
        }
        if (!undercover.classList.contains("hidden")) {
          undercover.classList.add("hidden");
        }
      }
    });


    function fireClick(elem) {
      if(typeof elem == "string") elem = document.getElementById(objID);
      if(!elem) return;

      if(document.dispatchEvent) {   // W3C
        var oEvent = document.createEvent( "MouseEvents" );
        oEvent.initMouseEvent("click", true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, elem);
        elem.dispatchEvent(oEvent);
      }
      else if(document.fireEvent) {   // IE
        elem.click();
      }
    }

  })();




