document.addEventListener("DOMContentLoaded", () => {
  // ---------Fix nav---------
  const fixesNav = () => {
    const HEADER = document.querySelector(".header"),
          HEADER_hEIGHT = HEADER.getBoundingClientRect().bottom;

    document.addEventListener("scroll", () => {
      let scrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;

      
      if (scrollPosition >= HEADER_hEIGHT) {
        HEADER.classList.add("--fixed");
      } else {
        HEADER.classList.remove("--fixed");
      }
    });
  };
  // ---------Burger menu---------
  const navSlide = () => {
    const BURGER = document.querySelector(".burger"),
          NAV = document.querySelector(".nav"),
          NAV_LINKS = document.querySelectorAll(".nav__link");
    // Toggle nav
    BURGER.addEventListener("click", () => {
      NAV.classList.toggle("--active");
      BURGER.classList.toggle("--active");
      // Animate links
      NAV_LINKS.forEach((item, index) => {
        if (item.style.animation) {
          item.style.animation = "";
        } else {
          item.style.animation = `navLinkFade 0.3s ease forwards ${
            index / 10 + 0.3
          }s`;
        }
      });
    });
  };
  
  const app = () => {
    navSlide();
    fixesNav();
  };

  app();
});
