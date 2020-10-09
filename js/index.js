"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

document.addEventListener("DOMContentLoaded", function () {
  // ---------Fix nav---------
  var fixesNav = function fixesNav() {
    var HEADER = document.querySelector(".header"),
        SLIDER = document.querySelector(".nav"),
        LOGO_HEIGHT = HEADER.getBoundingClientRect().bottom,
        SLIDER_TOP = SLIDER.getBoundingClientRect().top;
    var prevScrollPos = window.pageYOffset;
    document.addEventListener("scroll", function () {
      var currentScrollPosition = window.pageYOffset;

      if (currentScrollPosition > SLIDER_TOP) {
        HEADER.classList.add("--fixed");
        HEADER.style.top = prevScrollPos > currentScrollPosition ? "0" : "-100px"; // if ( (prevScrollPos > currentScrollPosition) ) {
        //   HEADER.style.top = "0";
        // } else {
        //   HEADER.style.top = "-100px";
        // }
      } else {
        HEADER.classList.remove("--fixed");
      }

      prevScrollPos = currentScrollPosition;
    });
  }; // ---------Burger menu---------


  var navSlide = function navSlide() {
    var BURGER = document.querySelector(".burger"),
        NAV = document.querySelector(".nav"),
        NAV_LINKS = document.querySelectorAll(".nav__link"); // Toggle nav

    BURGER.addEventListener("click", function () {
      NAV.classList.toggle("--active");
      BURGER.classList.toggle("--active"); // Animate links

      NAV_LINKS.forEach(function (item, index) {
        if (item.style.animation) {
          item.style.animation = "";
        } else {
          item.style.animation = "navLinkFade 0.3s ease forwards ".concat(index / 10 + 0.3, "s");
        }
      });
    });
  }; // ---------Navigation---------


  var navigationLinks = function navigationLinks() {
    document.addEventListener("click", function (event) {
      event.preventDefault();
      var LINK = event.target,
          NAV = document.querySelector(".nav"),
          BURGER = document.querySelector(".burger"),
          NAV_LINKS = document.querySelectorAll(".nav__link"),
          HEADER_HEIGHT = document.querySelector(".header").offsetHeight;
      if (!LINK.hasAttribute("data-link")) return;
      console.log(".".concat(LINK.dataset.link));
      var DATA_LINK = ".".concat(LINK.dataset.link),
          OFFSET_TOP = document.querySelector(DATA_LINK).offsetTop - HEADER_HEIGHT; // Remove drpdown menu on click

      NAV.classList.remove("--active"); // Remove burger menu animation

      BURGER.classList.remove("--active");
      NAV_LINKS.forEach(function (item, index) {
        if (item.style.animation) {
          item.style.animation = "";
        } else {
          item.style.animation = "navLinkFade 0.3s ease forwards ".concat(index / 10 + 0.3, "s");
        }
      });
      scroll({
        top: OFFSET_TOP,
        behavior: "smooth"
      });
    });
  }; // ---------Slider №1 in section "Hero"---------


  var sliderHero = function sliderHero() {
    var SLIDES = document.querySelectorAll(".hero__slider-item"),
        PAGINATION = document.querySelectorAll(".pagination__item"),
        NUM_SLIDE = document.querySelector(".num-slide__value");
    document.addEventListener("click", function (event) {
      var TAB = event.target,
          SLIDE = document.querySelector(".".concat(TAB.dataset.slider_hero)); // If it isn't the pagination item then exit

      if (!TAB.classList.contains("pagination__item")) return; // When it's clicked, we need to remove all classes "--on"

      removeClass(SLIDES);
      removeClass(PAGINATION); // Then add class "--on" on current target (pagination item)

      TAB.classList.add("--on"); // Then show selected slide

      SLIDE.classList.add("--on"); // Show number of the slide

      var _TAB$dataset$slider_h = TAB.dataset.slider_hero.split("-"),
          _TAB$dataset$slider_h2 = _slicedToArray(_TAB$dataset$slider_h, 2),
          num = _TAB$dataset$slider_h2[1];

      NUM_SLIDE.innerHTML = num;
    });

    function removeClass(array) {
      array.forEach(function (item) {
        item.classList.remove("--on");
      });
    }
  }; // ---------Slider №2 in section "The Latest"---------
  // const sliderLatest= () => {
  //   const SLIDER = document.querySelector(".latest__inner-content"),
  //         PREV = document.querySelector(".latest .arrow__left"),
  //         NEXT = document.querySelector(".latest .arrow__right");
  // }


  var app = function app() {
    navSlide();
    fixesNav();
    navigationLinks();
    sliderHero();
  };

  app();
});