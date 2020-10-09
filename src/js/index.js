document.addEventListener("DOMContentLoaded", () => {
  // ---------Fix nav---------
  const fixesNav = () => {
    const HEADER = document.querySelector(".header"),
          LOGO_HEIGHT = HEADER.getBoundingClientRect().bottom;

    let prevScrollPos = window.pageYOffset;

    document.addEventListener("scroll", () => {
      let currentScrollPosition = window.pageYOffset;
  
      if (currentScrollPosition > LOGO_HEIGHT) {
        HEADER.classList.add("--fixed");
      } else {
        HEADER.classList.remove("--fixed");
      }

      if ( (prevScrollPos > currentScrollPosition) ) {
        HEADER.style.top = "0";
      } else {
        HEADER.style.top = "-85px";
      }

      prevScrollPos = currentScrollPosition;
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
  // ---------Navigation---------
  const navigationLinks = () => {
    document.addEventListener("click", (event) => {
      event.preventDefault();

      const LINK = event.target,
            HEADER_HEIGHT = document.querySelector(".header").offsetHeight;
      
      if ( !LINK.hasAttribute("data-link") ) return;

      console.log(`.${LINK.dataset.link}`);
      const DATA_LINK = `.${LINK.dataset.link}`,
            OFFSET_TOP = document.querySelector(DATA_LINK).offsetTop - HEADER_HEIGHT;

      scroll({
        top: OFFSET_TOP,
        behavior: "smooth",
      })
    });
  };
  // ---------Slider №1 in section "hero"---------
  const SliderHero = () => {
    const SLIDES = document.querySelectorAll(".hero__slider-item"),
          PAGINATION = document.querySelectorAll(".pagination__item");

    document.addEventListener("click", (event) => {
      const TAB = event.target,
            SLIDE = document.querySelector(`.${TAB.dataset.slider_hero}`);
      // If it isn't the pagination item then exit
      if (!TAB.classList.contains("pagination__item")) return;
      // When it's clicked, we need to remove all classes "--on"
      removeClass(SLIDES);
      removeClass(PAGINATION);
      // Then add class "--on" on current target (pagination item)
      TAB.classList.add("--on");
      // Then show selected slide
      SLIDE.classList.add("--on");
    });

    function removeClass (array) {
      array.forEach( (item) => {
        item.classList.remove("--on");
      });
    }
  }

  const app = () => {
    navSlide();
    fixesNav();
    navigationLinks();
    SliderHero();
  };

  app();
});
