"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // ---------Fix nav---------
  var fixesNav = function fixesNav() {
    var HEADER = document.querySelector(".header"),
        HEADER_hEIGHT = HEADER.getBoundingClientRect().bottom;
    document.addEventListener("scroll", function () {
      var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollPosition >= HEADER_hEIGHT) {
        HEADER.classList.add("--fixed");
      } else {
        HEADER.classList.remove("--fixed");
      }
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
  };

  var app = function app() {
    navSlide();
    fixesNav();
  };

  app();
});