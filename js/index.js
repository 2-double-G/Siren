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
    var NAV = document.querySelector(".nav"),
        FIXED = NAV.getBoundingClientRect().top,
        HERO = document.querySelector(".hero"),
        HEADER = document.querySelector(".header"),
        HEADER_HEIGHT = HEADER.getBoundingClientRect().bottom - HEADER.getBoundingClientRect().top;
    var prevScrollPos = window.pageYOffset;
    document.addEventListener("scroll", function () {
      var currentScrollPosition = window.pageYOffset;
      var windowWidth = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth, document.body.offsetWidth, document.documentElement.offsetWidth, document.body.clientWidth, document.documentElement.clientWidth);

      if (windowWidth > 768) {
        if (currentScrollPosition >= FIXED) {
          HEADER.classList.add("--fixed");
          HERO.style.paddingTop = "".concat(40 + HEADER_HEIGHT, "px");
        } else {
          HEADER.classList.remove("--fixed");
          HERO.style.paddingTop = "40px";
        }
      } else {
        HERO.style.paddingTop = "10.1vh";
      }

      if (currentScrollPosition > HEADER_HEIGHT) {
        HEADER.style.top = prevScrollPos > currentScrollPosition ? "0" : "-100px";
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
    var NAV = document.querySelector(".nav"),
        BURGER = document.querySelector(".burger"),
        NAV_LINKS = document.querySelectorAll(".nav__link"),
        HEADER_HEIGHT = document.querySelector(".header").offsetHeight;
    document.addEventListener("click", function (event) {
      event.preventDefault();
      var LINK = event.target;
      if (!LINK.hasAttribute("data-link")) return;
      console.log(".".concat(LINK.dataset.link));
      var DATA_LINK = ".".concat(LINK.dataset.link),
          OFFSET_TOP = document.querySelector(DATA_LINK).offsetTop - HEADER_HEIGHT;
      var windowWidth = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth, document.body.offsetWidth, document.documentElement.offsetWidth, document.body.clientWidth, document.documentElement.clientWidth);

      if (windowWidth <= 768) {
        // Remove drpdown menu on click
        NAV.classList.remove("--active"); // Remove burger menu animation

        BURGER.classList.remove("--active");
        NAV_LINKS.forEach(function (item, index) {
          if (item.style.animation) {
            item.style.animation = "";
          } else {
            item.style.animation = "navLinkFade 0.3s ease forwards ".concat(index / 10 + 0.3, "s");
          }
        });
      }

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


  var sliderLatest = function sliderLatest() {
    var SLIDER_WIDTH = document.querySelector(".latest__slider").offsetWidth,
        SLIDES = document.querySelectorAll(".latest__slider-item"),
        SLIDER_CONT = document.querySelector(".latest__slider-container"),
        PREV = document.querySelector(".latest .arrow__left"),
        NEXT = document.querySelector(".latest .arrow__right");
    var slidesWidth = [],
        slidesWidthSum = 0,
        offset = 0,
        step = 1,
        rest = 0; // Calculate width of each slide

    SLIDES.forEach(function (item) {
      slidesWidth.push(item.offsetWidth);
      slidesWidthSum += item.offsetWidth;
    });
    offset = slidesWidth[0];
    NEXT.addEventListener("click", function () {
      rest = slidesWidthSum - SLIDER_WIDTH - (offset + slidesWidth[step]);

      if (rest >= 0) {
        offset += slidesWidth[step];
        SLIDER_CONT.style.marginLeft = "-".concat(offset, "px");
      } else {
        SLIDER_CONT.style.marginLeft = "-".concat(slidesWidthSum - SLIDER_WIDTH, "px");
      }

      if (step + 1 == SLIDES.length) {
        step = 0;
        offset = 0;
        SLIDER_CONT.style.marginLeft = "0px";
      } else {
        step++;
      }
    });
    PREV.addEventListener("click", function () {
      // Demo (very ugly realisation) (--need to fix that sht--)
      if (step == 1) {
        SLIDER_CONT.style.marginLeft = "".concat(0, "px");
        step = 0;
        offset = 0;
      } else if (step == 2) {
        SLIDER_CONT.style.marginLeft = "-".concat(slidesWidth[0], "px");
        step = 1;
      } else {
        SLIDER_CONT.style.marginLeft = "-".concat(slidesWidthSum - SLIDER_WIDTH, "px");
        step = 2;
      }
    });
  }; // ---------Infinity slider---------


  var infinitySlider = function infinitySlider(enumarate, slider, carousel, prev, next, num, offset) {
    var direction = 1,
        numSlide = 1;
    prev.addEventListener("click", function () {
      if (direction == 1) {
        slider.appendChild(slider.firstElementChild);
        direction = -1;
      }

      carousel.style.justifyContent = "flex-end"; // If we don't do this, first that we will see is a white space

      slider.style.transform = "translate(".concat(offset, "%)");
      numSlide--;
    });
    next.addEventListener("click", function () {
      if (direction == -1) {
        slider.prepend(slider.lastElementChild);
        direction = 1;
      }

      carousel.style.justifyContent = "flex-start";
      slider.style.transform = "translate(-".concat(offset, "%)");
      numSlide++;
    });
    slider.addEventListener("transitionend", function () {
      if (direction == 1) {
        // When transition ends, append first element to the end
        slider.appendChild(slider.firstElementChild);
      } else if (direction == -1) {
        // When transition ends, insert last element to the beginning
        slider.prepend(slider.lastElementChild);
      }

      slider.style.transition = "none";
      slider.style.transform = "translate(0)";
      setTimeout(function () {
        slider.style.transition = "transform 1s";
      });

      if (enumarate == true) {
        if (numSlide > 4) {
          numSlide = 1;
        } else if (numSlide < 1) {
          numSlide = 4;
        }

        num.innerHTML = "0".concat(numSlide);
      }
    });
  }; // ---------Slider №3 in section "The Latest Articles"---------


  var sliderLatestArticles = function sliderLatestArticles() {
    var SLIDER = document.querySelector(".articles__slider-inner"),
        // All slides are stored here
    CAROUSEL = document.querySelector(".articles__slider-carousel"),
        // Need fo flex position
    PREV = document.querySelector(".articles__slider-carousel .arrow__left"),
        // Arrow left
    NEXT = document.querySelector(".articles__slider-carousel .arrow__right"),
        // Arrow right
    NUM_SLIDE = document.querySelector(".articles__slider-content .num-slide__value");
    infinitySlider(true, SLIDER, CAROUSEL, PREV, NEXT, NUM_SLIDE, 25);
  }; // ---------Slider №4 in section "The Latest Articles"---------


  var sliderFullscreen = function sliderFullscreen() {
    var SLIDER = document.querySelector(".fullscreen__slider"),
        // All slides are stored here
    CAROUSEL = document.querySelector(".fullscreen__inner"),
        // Need fo flex position
    PREV = document.querySelector(".fullscreen__inner .arrow__left"),
        // Arrow left
    NEXT = document.querySelector(".fullscreen__inner .arrow__right"); // Arrow right

    infinitySlider(false, SLIDER, CAROUSEL, PREV, NEXT, null, 33.333);
  };

  var app = function app() {
    navSlide();
    fixesNav();
    navigationLinks();
    sliderHero();
    sliderLatest();
    sliderLatestArticles();
    sliderFullscreen();
  };

  app();
});