"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // ---------Fix nav---------
  var fixesNav = function fixesNav() {
    var HEADER = document.querySelector(".header"),
        LOGO_HEIGHT = HEADER.getBoundingClientRect().bottom;
    var prevScrollPos = window.pageYOffset;
    document.addEventListener("scroll", function () {
      var currentScrollPosition = window.pageYOffset;

      if (currentScrollPosition > LOGO_HEIGHT) {
        HEADER.classList.add("--fixed");
      } else {
        HEADER.classList.remove("--fixed");
      }

      if (prevScrollPos > currentScrollPosition) {
        HEADER.style.top = "0";
      } else {
        HEADER.style.top = "-85px";
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
          HEADER_HEIGHT = document.querySelector(".header").offsetHeight;
      if (!LINK.hasAttribute("data-link")) return;
      console.log(".".concat(LINK.dataset.link));
      var DATA_LINK = ".".concat(LINK.dataset.link),
          OFFSET_TOP = document.querySelector(DATA_LINK).offsetTop - HEADER_HEIGHT;
      scroll({
        top: OFFSET_TOP,
        behavior: "smooth"
      });
    });
  }; // ---------Slider №1 in section "hero"---------


  var SliderHero = function SliderHero() {
    var SLIDES = document.querySelectorAll(".hero__slider-item"),
        PAGINATION = document.querySelectorAll(".pagination__item");
    document.addEventListener("click", function (event) {
      var TAB = event.target,
          SLIDE = document.querySelector(".".concat(TAB.dataset.slider_hero)); // If it isn't the pagination item then exit

      if (!TAB.classList.contains("pagination__item")) return; // When it's clicked, we need to remove all classes "--on"

      removeClass(SLIDES);
      removeClass(PAGINATION); // Then add class "--on" on current target (pagination item)

      TAB.classList.add("--on"); // Then show selected slide

      SLIDE.classList.add("--on");
    });

    function removeClass(array) {
      array.forEach(function (item) {
        item.classList.remove("--on");
      });
    }
  };

  var app = function app() {
    navSlide();
    fixesNav();
    navigationLinks();
    SliderHero();
  };

  app();
});