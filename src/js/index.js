document.addEventListener("DOMContentLoaded", () => {
  // ---------Fix nav---------
  const fixesNav = () => {
    const NAV = document.querySelector(".nav"),
          FIXED =  NAV.getBoundingClientRect().top,
          HERO = document.querySelector(".hero"),
          HEADER = document.querySelector(".header"),
          HEADER_HEIGHT = HEADER.getBoundingClientRect().bottom - 
                          HEADER.getBoundingClientRect().top;

    let prevScrollPos = window.pageYOffset;

    document.addEventListener("scroll", () => {
      let currentScrollPosition = window.pageYOffset;

      let windowWidth = Math.max(
        document.body.scrollWidth, document.documentElement.scrollWidth,
        document.body.offsetWidth, document.documentElement.offsetWidth,
        document.body.clientWidth, document.documentElement.clientWidth
      );

      if (windowWidth > 768) {
        if (currentScrollPosition >= FIXED) {
          HEADER.classList.add("--fixed");
          HERO.style.paddingTop = `${40 + HEADER_HEIGHT}px`;
        } else {
          HEADER.classList.remove("--fixed");
          HERO.style.paddingTop = "40px";
        }
      } else {
        HERO.style.paddingTop = "10.1vh";
      }

      if (currentScrollPosition <= HERO.getBoundingClientRect().top) {
        HEADER.classList.remove("--fixed");
        HERO.style.paddingTop = "40px";
      }

      if (currentScrollPosition > HEADER_HEIGHT) {
        HEADER.style.top = prevScrollPos > currentScrollPosition ? "0" : "-100px";
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
    const NAV = document.querySelector(".nav"),
          BURGER = document.querySelector(".burger"),
          NAV_LINKS = document.querySelectorAll(".nav__link"),
          HEADER_HEIGHT = document.querySelector(".header").offsetHeight;

    document.addEventListener("click", (event) => {
      event.preventDefault();
      
      const LINK = event.target;

      if ( !LINK.hasAttribute("data-link") ) return;

      const DATA_LINK = `.${LINK.dataset.link}`,
            OFFSET_TOP = document.querySelector(DATA_LINK).offsetTop - HEADER_HEIGHT;
  
      let windowWidth = Math.max(
        document.body.scrollWidth, document.documentElement.scrollWidth,
        document.body.offsetWidth, document.documentElement.offsetWidth,
        document.body.clientWidth, document.documentElement.clientWidth
      );

      if (windowWidth <= 768) {
        // Remove drpdown menu on click
        if (!LINK.classList.contains("footer__link")) {
          NAV.classList.remove("--active");
          // Remove burger menu animation
          BURGER.classList.remove("--active");
          NAV_LINKS.forEach((item, index) => {
            if (item.style.animation) {
              item.style.animation = "";
            } else {
              item.style.animation = `navLinkFade 0.3s ease forwards ${
                index / 10 + 0.3
              }s`;
            }
          });
        } 
      }
      
      scroll({
        top: OFFSET_TOP,
        behavior: "smooth",
      })
    });
  };
  // ---------Slider №1 in section "Hero"---------
  const sliderHero = () => {
    const SLIDES = document.querySelectorAll(".hero__slider-item"),
          PAGINATION = document.querySelectorAll(".pagination__item"),
          NUM_SLIDE = document.querySelector(".num-slide__value");

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
      // Show number of the slide
      let [ , num] = TAB.dataset.slider_hero.split("-");
      NUM_SLIDE.innerHTML = num;
    });

    function removeClass (array) {
      array.forEach( (item) => {
        item.classList.remove("--on");
      });
    }
  }
  // ---------Slider №2 in section "The Latest"---------
  const sliderLatest = () => {
    const SLIDER_WIDTH = document.querySelector(".latest__slider").offsetWidth,
          SLIDES = document.querySelectorAll(".latest__slider-item"),
          SLIDER_CONT = document.querySelector(".latest__slider-container"),
          PREV = document.querySelector(".latest .arrow__left"),
          NEXT = document.querySelector(".latest .arrow__right");

    let slidesWidth = [],
        slidesWidthSum = 0,
        offset = 0,
        step = 1,
        rest = 0;

  // Calculate width of each slide
  SLIDES.forEach( (item) => {
    slidesWidth.push(item.offsetWidth);
    slidesWidthSum += item.offsetWidth;
  });

  offset = slidesWidth[0];
  
  NEXT.addEventListener("click", () => {
    
    rest = slidesWidthSum - SLIDER_WIDTH - (offset + slidesWidth[step]);
    
    if (rest >= 0) {
      offset += slidesWidth[step];
      SLIDER_CONT.style.marginLeft = `-${offset}px`;
    } else {
      SLIDER_CONT.style.marginLeft = `-${slidesWidthSum - SLIDER_WIDTH}px`;
    }
    
    if (step + 1 == SLIDES.length) {
      step = 0;
      offset = 0;
      SLIDER_CONT.style.marginLeft = `0px`;
    } else {
      step++;
    }
  });

  PREV.addEventListener("click", () => {
    // Demo (very ugly realisation) (--need to fix that sht--)
    if (step == 1) {
      SLIDER_CONT.style.marginLeft = `${0}px`;
      step = 0;
      offset = 0;
    } else if (step == 2) {
      SLIDER_CONT.style.marginLeft = `-${slidesWidth[0]}px`;
      step = 1;
    }
    else {
      SLIDER_CONT.style.marginLeft = `-${slidesWidthSum - SLIDER_WIDTH}px`;
      step = 2;
    }
  });
  }
  // ---------Infinity slider---------
  const infinitySlider = (enumarate, slider, carousel, prev, next, num, offset) => {
    let direction = 1,
        numSlide = 1;

    prev.addEventListener("click", () => {
      if (direction == 1) {
        slider.appendChild(slider.firstElementChild);
        direction = -1;
      }
      carousel.style.justifyContent = `flex-end`; // If we don't do this, first that we will see is a white space
      slider.style.transform = `translate(${offset}%)`;    
      numSlide--;
    });

    next.addEventListener("click", () => {
      if (direction == -1) {
        slider.prepend(slider.lastElementChild);
        direction = 1;
      }
      carousel.style.justifyContent = `flex-start`;
      slider.style.transform = `translate(-${offset}%)`;
      numSlide++;
    });

    slider.addEventListener("transitionend", () => {
      if (direction == 1) {
        // When transition ends, append first element to the end
        slider.appendChild(slider.firstElementChild);
      } else if (direction == -1) {
        // When transition ends, insert last element to the beginning
        slider.prepend(slider.lastElementChild);
      }

      slider.style.transition = `none`;
      slider.style.transform = `translate(0)`;
      setTimeout( () => {
        slider.style.transition = `transform 1s`;
      })

      if (enumarate == true) {
        if (numSlide > 4) {
          numSlide = 1;
        } else if (numSlide < 1) {
          numSlide = 4;
        }
        num.innerHTML = `0${numSlide}`;
      }
    });
  }
  // ---------Slider №3 in section "The Latest Articles"---------
  const sliderLatestArticles = () => {
    const SLIDER = document.querySelector(".articles__slider-inner"), // All slides are stored here
          CAROUSEL = document.querySelector(".articles__slider-carousel"), // Need fo flex position
          PREV = document.querySelector(".articles__slider-carousel .arrow__left"), // Arrow left
          NEXT = document.querySelector(".articles__slider-carousel .arrow__right"), // Arrow right
          NUM_SLIDE = document.querySelector(".articles__slider-content .num-slide__value");

    infinitySlider(true, SLIDER, CAROUSEL, PREV, NEXT, NUM_SLIDE, 25);
  }
  // ---------Slider №4 in section "The Latest Articles"---------
  const sliderFullscreen = () => {
    const SLIDER = document.querySelector(".fullscreen__slider"), // All slides are stored here
          CAROUSEL = document.querySelector(".fullscreen__inner"), // Need fo flex position
          PREV = document.querySelector(".fullscreen__inner .arrow__left"), // Arrow left
          NEXT = document.querySelector(".fullscreen__inner .arrow__right"); // Arrow right

    infinitySlider(false, SLIDER, CAROUSEL, PREV, NEXT, null, 33.333);
  }

  const app = () => {
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
